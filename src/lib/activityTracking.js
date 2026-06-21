/**
 * PeakXP Activity Tracking
 * 
 * Data sources:
 * 1. GPX file import (works in browser today)
 * 2. Strava OAuth sync (future — structure ready)
 * 
 * All activity data stored in localStorage keyed by userId.
 * Structure is designed to migrate to a real backend.
 */

// ── GPX Parser ────────────────────────────────────────────────────────────────

export function parseGPX(gpxText) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(gpxText, "text/xml");
    const trkpts = Array.from(doc.querySelectorAll("trkpt"));

    if (trkpts.length < 2) throw new Error("Not enough track points");

    const points = trkpts.map(pt => ({
      lat: parseFloat(pt.getAttribute("lat")),
      lon: parseFloat(pt.getAttribute("lon")),
      ele: parseFloat(pt.querySelector("ele")?.textContent || 0),
      time: pt.querySelector("time")?.textContent || null,
    }));

    // Calculate stats
    let distanceKm = 0, totalDescent = 0, totalAscent = 0;
    let maxSpeed = 0;
    for (let i = 1; i < points.length; i++) {
      const d = haversineKm(points[i-1], points[i]);
      distanceKm += d;
      const elevDiff = points[i].ele - points[i-1].ele;
      if (elevDiff < 0) totalDescent += Math.abs(elevDiff);
      else totalAscent += elevDiff;

      // Rough speed calc
      if (points[i].time && points[i-1].time) {
        const dt = (new Date(points[i].time) - new Date(points[i-1].time)) / 1000 / 3600;
        if (dt > 0 && dt < 0.01) { // only short intervals
          const spd = d / dt;
          if (spd < 200) maxSpeed = Math.max(maxSpeed, spd); // sanity check
        }
      }
    }

    const startTime = points[0].time ? new Date(points[0].time) : new Date();
    const endTime = points[points.length-1].time ? new Date(points[points.length-1].time) : new Date();
    const durationMin = (endTime - startTime) / 1000 / 60;

    // Extract activity name from GPX metadata
    const name = doc.querySelector("name")?.textContent || "Ski day";
    const desc = doc.querySelector("desc")?.textContent || "";

    // Auto-detect resort from coords (simple bbox check)
    const centerLat = (Math.min(...points.map(p=>p.lat)) + Math.max(...points.map(p=>p.lat))) / 2;
    const centerLon = (Math.min(...points.map(p=>p.lon)) + Math.max(...points.map(p=>p.lon))) / 2;

    return {
      id: `gpx_${Date.now()}`,
      name,
      description: desc,
      date: startTime.toISOString().split("T")[0],
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationMin: Math.round(durationMin),
      distanceKm: Math.round(distanceKm * 10) / 10,
      totalDescentM: Math.round(totalDescent),
      totalAscentM: Math.round(totalAscent),
      maxSpeedKmh: Math.round(maxSpeed),
      verticalM: Math.round(totalDescent), // primary metric
      points: points.length,
      centerLat, centerLon,
      source: "gpx",
      verified: true, // GPX imports count as verified activity
    };
  } catch(e) {
    throw new Error("Invalid GPX file: " + e.message);
  }
}

function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lon - a.lon) * Math.PI / 180;
  const s = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1-s));
}

// ── Activity storage ──────────────────────────────────────────────────────────

export function getActivities(userId) {
  try {
    const stored = localStorage.getItem(`activities:${userId}`);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function saveActivity(userId, activity) {
  const activities = getActivities(userId);
  const existing = activities.findIndex(a => a.id === activity.id);
  if (existing >= 0) activities[existing] = activity;
  else activities.unshift(activity);
  localStorage.setItem(`activities:${userId}`, JSON.stringify(activities));
  // Update aggregate stats
  updateStats(userId);
  return activity;
}

export function deleteActivity(userId, activityId) {
  const activities = getActivities(userId).filter(a => a.id !== activityId);
  localStorage.setItem(`activities:${userId}`, JSON.stringify(activities));
  updateStats(userId);
}

// ── Aggregate stats ───────────────────────────────────────────────────────────

export function getStats(userId) {
  try {
    const stored = localStorage.getItem(`stats:${userId}`);
    return stored ? JSON.parse(stored) : getDefaultStats();
  } catch { return getDefaultStats(); }
}

function getDefaultStats() {
  return {
    lifetimeVertical: 0, lifetimeDays: 0, lifetimeResorts: 0,
    lifetimeDistanceKm: 0, lifetimeDurationHours: 0,
    seasonVertical: 0, seasonDays: 0, seasonDistanceKm: 0,
    currentSeason: getCurrentSeason(),
    lastUpdated: new Date().toISOString(),
  };
}

function getCurrentSeason() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12
  return month >= 8 ? `${year}/${year+1}` : `${year-1}/${year}`;
}

function isCurrentSeason(dateStr) {
  const season = getCurrentSeason();
  const [startYear] = season.split("/").map(Number);
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return (year === startYear && month >= 8) || (year === startYear + 1 && month <= 7);
}

function updateStats(userId) {
  const activities = getActivities(userId);
  const verifiedActivities = activities.filter(a => a.verified);

  const resortSet = new Set(verifiedActivities.filter(a => a.resortId).map(a => a.resortId));

  const stats = {
    lifetimeVertical: verifiedActivities.reduce((s, a) => s + (a.verticalM || 0), 0),
    lifetimeDays: verifiedActivities.length,
    lifetimeResorts: resortSet.size,
    lifetimeDistanceKm: verifiedActivities.reduce((s, a) => s + (a.distanceKm || 0), 0),
    lifetimeDurationHours: verifiedActivities.reduce((s, a) => s + (a.durationMin || 0), 0) / 60,
    seasonVertical: verifiedActivities.filter(a => isCurrentSeason(a.date)).reduce((s, a) => s + (a.verticalM || 0), 0),
    seasonDays: verifiedActivities.filter(a => isCurrentSeason(a.date)).length,
    seasonDistanceKm: verifiedActivities.filter(a => isCurrentSeason(a.date)).reduce((s, a) => s + (a.distanceKm || 0), 0),
    currentSeason: getCurrentSeason(),
    lastUpdated: new Date().toISOString(),
  };

  localStorage.setItem(`stats:${userId}`, JSON.stringify(stats));
  return stats;
}

// ── Challenges ────────────────────────────────────────────────────────────────

export const SYSTEM_CHALLENGES = [
  // Season challenges
  { id: "centurion_2526",   name: "2025/26 Centurion",       desc: "Ski 100 days this season",                       type: "season",   metric: "seasonDays",     target: 100, icon: "💯", difficulty: "legendary" },
  { id: "fifty_days",       name: "Fifty Days",               desc: "50 days on snow this season",                    type: "season",   metric: "seasonDays",     target: 50,  icon: "⭐", difficulty: "hard" },
  { id: "season_million",   name: "Season Million",           desc: "1,000,000m vertical descent in a season",        type: "season",   metric: "seasonVertical", target: 1000000, icon: "🚀", difficulty: "legendary" },
  { id: "season_100k",      name: "100k Season",             desc: "100,000m vertical this season",                  type: "season",   metric: "seasonVertical", target: 100000, icon: "🏔️", difficulty: "hard" },
  { id: "season_50k",       name: "50k Season",              desc: "50,000m vertical this season",                   type: "season",   metric: "seasonVertical", target: 50000,  icon: "⛰️", difficulty: "medium" },

  // Monthly challenges
  { id: "jan_surge",        name: "January Surge",           desc: "4 days on snow in January",                      type: "monthly",  metric: "monthDays",      target: 4,   icon: "❄️", month: 1, difficulty: "easy" },
  { id: "christmas_10",     name: "Christmas 10",            desc: "Ski 10 times before Christmas",                  type: "custom",   metric: "preDec25Days",   target: 10,  icon: "🎄", difficulty: "medium" },
  { id: "march_madness",    name: "March Madness",           desc: "15 ski days in March",                           type: "monthly",  metric: "monthDays",      target: 15,  icon: "🌞", month: 3, difficulty: "hard" },

  // Weekly challenges
  { id: "week_10k",         name: "10k Week",                desc: "10,000m vertical in a single week",              type: "weekly",   metric: "weekVertical",   target: 10000, icon: "⚡", difficulty: "medium" },
  { id: "week_30k",         name: "30k Week",                desc: "30,000m vertical in a single week",              type: "weekly",   metric: "weekVertical",   target: 30000, icon: "🔥", difficulty: "hard" },
  { id: "five_days_week",   name: "5-Day Week",             desc: "Ski 5 days in a single week",                    type: "weekly",   metric: "weekDays",       target: 5,   icon: "🎿", difficulty: "medium" },

  // Lifetime / milestone
  { id: "first_million",    name: "One Million Metres",      desc: "1,000,000m lifetime vertical descent",           type: "lifetime", metric: "lifetimeVertical", target: 1000000, icon: "🏆", difficulty: "legendary" },
  { id: "ten_resorts",      name: "Resort Explorer",         desc: "Ski at 10 different resorts",                    type: "lifetime", metric: "lifetimeResorts", target: 10, icon: "🌍", difficulty: "medium" },
  { id: "fifty_resorts",    name: "World Nomad",             desc: "Ski at 50 different resorts",                    type: "lifetime", metric: "lifetimeResorts", target: 50, icon: "✈️", difficulty: "legendary" },
  { id: "early_bird",       name: "Early Bird",              desc: "First run before 8:30am, 5 times",               type: "custom",   metric: "earlyMornings",  target: 5,   icon: "🌅", difficulty: "easy" },
  { id: "vertical_500",     name: "Vertical 500",            desc: "500m vertical in a single run",                  type: "custom",   metric: "maxSingleVertical", target: 500, icon: "📏", difficulty: "easy" },
  { id: "speed_100",        name: "Speed Demon",             desc: "Record a GPS speed over 100 km/h",               type: "custom",   metric: "maxSpeed",       target: 100, icon: "💨", difficulty: "hard" },
];

export function getUserChallenges(userId) {
  try {
    const stored = localStorage.getItem(`challenges:${userId}`);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function saveUserChallenge(userId, challenge) {
  const challenges = getUserChallenges(userId);
  const idx = challenges.findIndex(c => c.id === challenge.id);
  if (idx >= 0) challenges[idx] = challenge;
  else challenges.unshift(challenge);
  localStorage.setItem(`challenges:${userId}`, JSON.stringify(challenges));
}

/**
 * Calculate current progress for all system challenges from activity data
 */
export function getChallengeProgress(userId) {
  const stats = getStats(userId);
  const activities = getActivities(userId).filter(a => a.verified);
  const now = new Date();
  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(now.getDate() - now.getDay());
  currentWeekStart.setHours(0,0,0,0);

  const thisWeek = activities.filter(a => new Date(a.date) >= currentWeekStart);
  const thisMonth = activities.filter(a => {
    const d = new Date(a.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const preDec25 = activities.filter(a => {
    const d = new Date(a.date);
    const season = getCurrentSeason();
    const startYear = parseInt(season.split("/")[0]);
    const dec25 = new Date(startYear, 11, 25);
    return d >= new Date(startYear, 7, 1) && d <= dec25;
  });
  const earlyMornings = activities.filter(a => {
    if (!a.startTime) return false;
    const h = new Date(a.startTime).getHours();
    return h < 9;
  });
  const maxSpeed = Math.max(0, ...activities.map(a => a.maxSpeedKmh || 0));
  const maxSingleVertical = Math.max(0, ...activities.map(a => a.verticalM || 0));

  return SYSTEM_CHALLENGES.map(ch => {
    let progress = 0;
    switch(ch.metric) {
      case "seasonDays":       progress = stats.seasonDays; break;
      case "seasonVertical":   progress = stats.seasonVertical; break;
      case "weekVertical":     progress = thisWeek.reduce((s,a)=>s+(a.verticalM||0),0); break;
      case "weekDays":         progress = thisWeek.length; break;
      case "monthDays":        progress = thisMonth.length; break;
      case "lifetimeVertical": progress = stats.lifetimeVertical; break;
      case "lifetimeResorts":  progress = stats.lifetimeResorts; break;
      case "preDec25Days":     progress = preDec25.length; break;
      case "earlyMornings":    progress = earlyMornings.length; break;
      case "maxSpeed":         progress = maxSpeed; break;
      case "maxSingleVertical":progress = maxSingleVertical; break;
      default: progress = 0;
    }
    const pct = Math.min(100, Math.round((progress / ch.target) * 100));
    return { ...ch, progress, pct, completed: progress >= ch.target };
  });
}

/**
 * Create a user-defined challenge
 */
export function createCustomChallenge(userId, { name, desc, metric, target, icon, isPublic, friendGroupId }) {
  const challenge = {
    id: `custom_${userId}_${Date.now()}`,
    name, desc, metric, target, icon,
    type: "custom", difficulty: "custom",
    createdBy: userId,
    isPublic: isPublic || false,
    friendGroupId: friendGroupId || null,
    createdAt: new Date().toISOString(),
    participants: [userId],
  };
  const challenges = getUserChallenges(userId);
  challenges.unshift(challenge);
  localStorage.setItem(`challenges:${userId}`, JSON.stringify(challenges));
  return challenge;
}

/**
 * Leaderboard — aggregates stats across users
 * In MVP: uses data from current user + mock friends data
 * Real version: API call to backend
 */
export function getLeaderboard({ metric = "lifetimeVertical", homeCountry = null, region = null, skiedRegion = null } = {}) {
  // For MVP: current user's real data + seeded friends
  const mockEntries = [
    { userId: "friend_1", name: "Marco R.", homeCountry: "IT", region: "Lombardy", avatar: "MR", lifetimeVertical: 2840000, lifetimeDays: 312, lifetimeResorts: 28, seasonVertical: 84000, seasonDays: 22 },
    { userId: "friend_2", name: "Sophie M.", homeCountry: "DE", region: "Bavaria",  avatar: "SM", lifetimeVertical: 1920000, lifetimeDays: 198, lifetimeResorts: 19, seasonVertical: 62000, seasonDays: 18 },
    { userId: "friend_3", name: "James K.",  homeCountry: "GB", region: "London",   avatar: "JK", lifetimeVertical: 890000,  lifetimeDays: 87,  lifetimeResorts: 12, seasonVertical: 28000, seasonDays: 8 },
    { userId: "friend_4", name: "Elena V.",  homeCountry: "CH", region: "Zurich",   avatar: "EV", lifetimeVertical: 4100000, lifetimeDays: 451, lifetimeResorts: 43, seasonVertical: 110000, seasonDays: 31 },
    { userId: "friend_5", name: "Thomas S.", homeCountry: "AT", region: "Vienna",   avatar: "TS", lifetimeVertical: 3200000, lifetimeDays: 356, lifetimeResorts: 35, seasonVertical: 95000, seasonDays: 27 },
    { userId: "friend_6", name: "Anna L.",   homeCountry: "FR", region: "Paris",    avatar: "AL", lifetimeVertical: 1400000, lifetimeDays: 145, lifetimeResorts: 21, seasonVertical: 41000, seasonDays: 12 },
    { userId: "friend_7", name: "Luca F.",   homeCountry: "IT", region: "Veneto",   avatar: "LF", lifetimeVertical: 760000,  lifetimeDays: 82,  lifetimeResorts: 9,  seasonVertical: 22000, seasonDays: 6 },
    { userId: "friend_8", name: "Nina S.",   homeCountry: "DE", region: "Hamburg",  avatar: "NS", lifetimeVertical: 590000,  lifetimeDays: 61,  lifetimeResorts: 7,  seasonVertical: 18000, seasonDays: 5 },
  ];

  let entries = [...mockEntries];
  if (homeCountry) entries = entries.filter(e => e.homeCountry === homeCountry);
  if (region) entries = entries.filter(e => e.region?.toLowerCase().includes(region.toLowerCase()));

  return entries
    .sort((a, b) => (b[metric] || 0) - (a[metric] || 0))
    .map((e, i) => ({ ...e, rank: i + 1 }));
}
