/**
 * PeakXP Badge System
 * 
 * Two types:
 * 1. INFRASTRUCTURE badges — auto-awarded from resort data fields
 * 2. COMMUNITY badges — awarded by verified visitors via vote system
 * 
 * Community badge visibility:
 *   threshold = max(30, totalReviews * 0.05)
 *   A badge shows only when it's in the top 10% by vote-share within its category
 *   vote_share = votes_for_badge / total_community_votes_for_resort
 *   A badge shows if: votes >= threshold AND vote_share >= category_top10_cutoff
 */

// ── Infrastructure badge definitions ─────────────────────────────────────────
// Auto-derived from resort data fields
export const INFRASTRUCTURE_BADGES = [
  // Terrain & Snow
  { id: "glacier",        label: "Glacier skiing",     icon: "🏔️", color: "#60A5FA", desc: "Glacier access for year-round skiing",        check: r => r.maxAltitude >= 3000 || r.glacier },
  { id: "night_skiing",   label: "Night skiing",       icon: "🌙", color: "#818CF8", desc: "Lit runs available after dark",               check: r => !!r.nightSkiing || !!(r.facilities?.nightSkiing) },
  { id: "snowpark",       label: "Snowpark",           icon: "🛹", color: "#FB923C", desc: "Dedicated freestyle park",                    check: r => !!(r.skiAreas || [r]).some(a => a.snowpark) || r.snowpark },
  { id: "skicross",       label: "Skicross track",     icon: "🏁", color: "#F87171", desc: "Official skicross or race course",           check: r => !!(r.skiAreas || [r]).some(a => a.skicross) || r.skicross },
  { id: "high_altitude",  label: "High altitude",      icon: "⛰️", color: "#A78BFA", desc: "Summit above 3,000m",                       check: r => r.maxAltitude >= 3000 },
  { id: "snow_sure",      label: "Snow-sure",          icon: "❄️", color: "#BAE6FD", desc: "Reliable natural snow record",               check: r => r.maxAltitude >= 2500 && r.pisteKm >= 100 },
  { id: "snow_cannons",   label: "Snow-making",        icon: "💨", color: "#7DD3FC", desc: "Extensive artificial snow infrastructure",   check: r => (r.snowCannons || 0) >= 100 || (r.snowCannonKm || 0) >= 30 },

  // Family & Beginners
  { id: "family",         label: "Family friendly",    icon: "👨‍👩‍👧", color: "#34D399", desc: "Dedicated kids areas and family services",  check: r => !!(r.facilities?.kidsGarden) && !!(r.facilities?.creche) },
  { id: "creche",         label: "Crèche on-site",    icon: "🍼", color: "#6EE7B7", desc: "On-mountain childcare facility",              check: r => !!(r.facilities?.creche) },
  { id: "beginner_zone",  label: "Beginner zone",      icon: "🟢", color: "#4ADE80", desc: "Dedicated gentle learning area",             check: r => (r.difficultyBlue || 0) >= 25 || (r.facilities?.kidsGarden) },

  // Access & Connectivity  
  { id: "direct_train",   label: "Direct train",       icon: "🚆", color: "#38BDF8", desc: "Ski-to-train direct connection",             check: r => typeof r.trainStation === "string" && (r.trainStation.toLowerCase().includes("slope") || r.trainStation.toLowerCase().includes("direct") || r.trainStation.toLowerCase().includes("im Ort") || r.trainStation.toLowerCase().includes("station at")) },
  { id: "train_access",   label: "Train access",       icon: "🚂", color: "#7DD3FC", desc: "Rail connection available",                  check: r => !!r.trainStation },
  { id: "car_free",       label: "Car-free village",   icon: "🚷", color: "#A3E635", desc: "Vehicle-free resort village",               check: r => (r.bookingVillages || []).some(v => v.carFree) || r.carFree },
  { id: "free_parking",   label: "Free parking",       icon: "🅿️", color: "#FCD34D", desc: "Complimentary parking available",           check: r => r.parking?.includedInPass || r.parking?.pricePerDay === 0 },
  { id: "shuttle",        label: "Resort shuttle",     icon: "🚌", color: "#86EFAC", desc: "Free shuttle between lifts/villages",       check: r => !!r.shuttle },

  // Infrastructure & Services
  { id: "ski_depot",      label: "Ski depots",         icon: "🎿", color: "#FB923C", desc: "Secure ski and boot storage on-mountain",   check: r => !!(r.facilities?.skiStorage) || !!r.skiDepotNote },
  { id: "lockers",        label: "Lockers",            icon: "🔐", color: "#C4B5FD", desc: "Day-use locker facilities",                 check: r => (r.facilities?.lockerCount || 0) >= 200 },
  { id: "medical",        label: "Medical centre",     icon: "🏥", color: "#FCA5A5", desc: "On-resort medical or first-aid facility",   check: r => !!(r.facilities?.medicalCentre) },
  { id: "multi_area",     label: "Multi-area pass",    icon: "🗺️", color: "#F9A8D4", desc: "One pass, multiple connected ski areas",    check: r => !!(r.isMultiAreaRegion) || !!(r.liftPassCoversAllAreas) },

  // Prestige & Events
  { id: "world_cup",      label: "World Cup venue",    icon: "🏆", color: "#FBBF24", desc: "Hosts FIS Alpine World Cup races",          check: r => (r.events || []).some(e => e.name?.toLowerCase().includes("world cup") || e.name?.toLowerCase().includes("lauberhorn")) },
  { id: "unesco",         label: "UNESCO heritage",    icon: "🌍", color: "#6EE7B7", desc: "UNESCO World Heritage designation",          check: r => (r.ecoRenewable >= 80 && (r.ecoCertifications || []).some(c => c.toLowerCase().includes("unesco"))) },
  { id: "eco_certified",  label: "Eco certified",      icon: "🌿", color: "#86EFAC", desc: "Holds environmental certification",         check: r => (r.ecoCertifications || []).length > 0 },

  // Experience
  { id: "large_area",     label: "100km+ domain",      icon: "📏", color: "#FDE68A", desc: "Over 100km of marked pistes",               check: r => (r.pisteKm || 0) >= 100 },
  { id: "mega_area",      label: "200km+ domain",      icon: "🗻", color: "#FCD34D", desc: "Over 200km of marked pistes",               check: r => (r.pisteKm || 0) >= 200 },
  { id: "expert_terrain", label: "Expert terrain",     icon: "⚫", color: "#94A3B8", desc: "Significant black/expert run percentage",   check: r => (r.difficultyBlack || 0) >= 20 },
  { id: "apres_ski",      label: "Vibrant après-ski",  icon: "🎉", color: "#F472B6", desc: "Well-known après-ski scene",               check: r => (r.reviews?.breakdown?.apresSki || 0) >= 8.5 },
];

// ── Community badge definitions ───────────────────────────────────────────────
// Awarded by verified visitors via vote system
export const COMMUNITY_BADGES = [
  // Snow & Terrain quality
  { id: "best_grooming",     label: "Best grooming",       icon: "✨", color: "#60A5FA", category: "terrain",    desc: "Perfectly prepared pistes every morning" },
  { id: "powder_heaven",     label: "Powder heaven",       icon: "❄️", color: "#BAE6FD", category: "terrain",    desc: "Consistently exceptional powder conditions" },
  { id: "best_offpiste",     label: "Best off-piste",      icon: "⛷️", color: "#818CF8", category: "terrain",    desc: "Outstanding off-piste terrain and access" },
  { id: "best_views",        label: "Best views",          icon: "🏔️", color: "#A78BFA", category: "terrain",    desc: "Breathtaking panoramic scenery" },
  { id: "hidden_gem",        label: "Hidden gem",          icon: "💎", color: "#34D399", category: "terrain",    desc: "Underrated resort that over-delivers" },

  // Family & Social
  { id: "family_pick",       label: "Family pick",         icon: "👨‍👩‍👧", color: "#6EE7B7", category: "family",     desc: "Top choice for families with children" },
  { id: "best_ski_school",   label: "Best ski school",     icon: "🎓", color: "#4ADE80", category: "family",     desc: "Outstanding instruction quality" },
  { id: "beginner_friendly", label: "Beginner friendly",   icon: "🟢", color: "#86EFAC", category: "family",     desc: "Welcoming and well-suited for first-timers" },

  // Lifestyle & Après
  { id: "best_apres",        label: "Best après-ski",      icon: "🎉", color: "#F472B6", category: "lifestyle",  desc: "Legendary après-ski atmosphere" },
  { id: "best_food",         label: "Best mountain food",  icon: "🍽️", color: "#FB923C", category: "lifestyle",  desc: "Exceptional on-mountain dining" },
  { id: "best_village",      label: "Best village",        icon: "🏘️", color: "#FCD34D", category: "lifestyle",  desc: "Most charming and authentic resort village" },
  { id: "luxury_pick",       label: "Luxury pick",         icon: "⭐", color: "#FBBF24", category: "lifestyle",  desc: "Premium luxury experience" },
  { id: "best_value",        label: "Best value",          icon: "💰", color: "#34D399", category: "value",      desc: "Exceptional quality for the price" },
  { id: "budget_friendly",   label: "Budget friendly",     icon: "🤑", color: "#6EE7B7", category: "value",      desc: "Great skiing without breaking the bank" },

  // Operational
  { id: "no_queues",         label: "No queues",           icon: "⚡", color: "#F59E0B", category: "operations", desc: "Minimal lift queues even in peak season" },
  { id: "best_lifts",        label: "Best lifts",          icon: "🚡", color: "#38BDF8", category: "operations", desc: "Modern, fast and well-maintained lift system" },
  { id: "best_snow_making",  label: "Best snow-making",    icon: "💨", color: "#7DD3FC", category: "operations", desc: "Reliable artificial snow coverage" },
  { id: "best_patrol",       label: "Best ski patrol",     icon: "🦺", color: "#FCA5A5", category: "operations", desc: "Outstanding safety and rescue service" },

  // Special
  { id: "powder_alert",      label: "Powder alert",        icon: "🌨️", color: "#BAE6FD", category: "special",    desc: "Voted best resort after a big snowfall" },
  { id: "friendliest",       label: "Friendliest resort",  icon: "🤝", color: "#C4B5FD", category: "special",    desc: "Most welcoming locals and staff" },
  { id: "most_scenic",       label: "Most scenic",         icon: "📸", color: "#F9A8D4", category: "special",    desc: "Most photographed and visually stunning" },
  { id: "best_for_experts",  label: "Best for experts",    icon: "⚫", color: "#94A3B8", category: "special",    desc: "Premier destination for advanced skiers" },
];

// ── User/Community badges (given by friends or earned via activity) ───────────
export const USER_BADGES = [
  // Peer-awarded (friend-to-friend)
  { id: "powder_hound",    label: "Powder hound",      icon: "🌨️", color: "#60A5FA", type: "peer", desc: "Always first in the fresh snow" },
  { id: "speed_demon",     label: "Speed demon",       icon: "⚡", color: "#F59E0B", type: "peer", desc: "Fastest on the mountain" },
  { id: "freestyle_king",  label: "Freestyle king",    icon: "🛹", color: "#FB923C", type: "peer", desc: "Parks and tricks master" },
  { id: "mountain_guide",  label: "Mountain guide",    icon: "🗺️", color: "#34D399", type: "peer", desc: "Always knows the best lines" },
  { id: "apres_legend",    label: "Après legend",      icon: "🎉", color: "#F472B6", type: "peer", desc: "The life of the après-ski" },
  { id: "safety_first",    label: "Safety first",      icon: "🦺", color: "#6EE7B7", type: "peer", desc: "Always looks out for the group" },
  { id: "sensei",          label: "The Sensei",        icon: "🎓", color: "#818CF8", type: "peer", desc: "Incredible ski instructor" },
  { id: "adventure_seeker",label: "Adventure seeker",  icon: "🌍", color: "#A78BFA", type: "peer", desc: "Always finding new terrain" },
  { id: "early_bird",      label: "Early bird",        icon: "🌅", color: "#FCD34D", type: "peer", desc: "First on the lifts every day" },
  { id: "photographer",    label: "Mountain photographer",icon:"📸", color: "#F9A8D4", type: "peer", desc: "Captures the best moments" },

  // Lifetime activity badges (auto-earned from tracked data)
  { id: "vert_10k",     label: "10k Vertical",      icon: "📏", color: "#60A5FA", type: "lifetime", desc: "10,000m total vertical descent", threshold: 10000 },
  { id: "vert_100k",    label: "100k Vertical",     icon: "🏔️", color: "#818CF8", type: "lifetime", desc: "100,000m total vertical descent", threshold: 100000 },
  { id: "vert_500k",    label: "500k Vertical",     icon: "⛰️", color: "#A78BFA", type: "lifetime", desc: "500,000m total vertical descent", threshold: 500000 },
  { id: "vert_1m",      label: "One Million Metres", icon: "🚀", color: "#FBBF24", type: "lifetime", desc: "1,000,000m lifetime vertical", threshold: 1000000 },
  { id: "days_10",      label: "10 Ski Days",        icon: "🎿", color: "#34D399", type: "lifetime", desc: "10 days on snow", threshold: 10 },
  { id: "days_50",      label: "50 Ski Days",        icon: "⛷️", color: "#6EE7B7", type: "lifetime", desc: "50 days on snow", threshold: 50 },
  { id: "days_100",     label: "Century Club",       icon: "💯", color: "#F59E0B", type: "lifetime", desc: "100 lifetime ski days", threshold: 100 },
  { id: "days_500",     label: "Ski Legend",         icon: "🏆", color: "#FBBF24", type: "lifetime", desc: "500 lifetime ski days", threshold: 500 },
  { id: "resorts_5",    label: "5 Resorts",          icon: "🗺️", color: "#38BDF8", type: "lifetime", desc: "Skied at 5 different resorts", threshold: 5 },
  { id: "resorts_20",   label: "World Traveller",    icon: "✈️", color: "#7DD3FC", type: "lifetime", desc: "Skied at 20 different resorts", threshold: 20 },
  { id: "resorts_50",   label: "Resort Connoisseur", icon: "🌍", color: "#BAE6FD", type: "lifetime", desc: "Skied at 50 different resorts", threshold: 50 },

  // Seasonal awards (reset each season)
  { id: "seasonal_10k",  label: "10k This Season",   icon: "📅", color: "#86EFAC", type: "seasonal", desc: "10,000m descent this season" },
  { id: "seasonal_50k",  label: "50k This Season",   icon: "🌟", color: "#4ADE80", type: "seasonal", desc: "50,000m descent this season" },
  { id: "seasonal_centurion", label: "Centurion",    icon: "💎", color: "#60A5FA", type: "seasonal", desc: "100 days on snow this season" },
  { id: "most_days_region", label: "Region King",    icon: "👑", color: "#FBBF24", type: "seasonal", desc: "Most days skied in your region this season" },
];

// ── Badge engine ──────────────────────────────────────────────────────────────

/**
 * Get all infrastructure badges a resort qualifies for
 */
export function getInfrastructureBadges(resort) {
  return INFRASTRUCTURE_BADGES.filter(b => {
    try { return b.check(resort); } catch { return false; }
  });
}

/**
 * Dynamic threshold for community badge visibility
 * Sophisticated version: uses total community votes + review count
 */
export function getCommunityBadgeThreshold(resort) {
  const totalReviews = resort.reviews?.items?.length || 0;
  const communityVotes = getCommunityVotes(resort.id);
  const totalVotes = Object.values(communityVotes).reduce((s, v) => s + v, 0);
  // Base threshold: higher of 30 or 5% of total reviews
  const base = Math.max(30, Math.round(totalReviews * 0.05));
  // Scale: if many community votes exist, raise bar slightly (prevents gaming)
  const scaled = totalVotes > 500 ? Math.round(base * 1.2) : base;
  return Math.min(scaled, 150); // cap at 150
}

/**
 * Get community badges that qualify for display
 * Only shows top 10% by vote-share within each category
 */
export function getActiveCommunityBadges(resortId) {
  const votes = getCommunityVotes(resortId);
  const totalVotes = Object.values(votes).reduce((s, v) => s + v, 0);
  if (totalVotes === 0) return [];

  // Group by category
  const byCategory = {};
  COMMUNITY_BADGES.forEach(b => {
    if (!byCategory[b.category]) byCategory[b.category] = [];
    byCategory[b.category].push({ ...b, votes: votes[b.id] || 0 });
  });

  const threshold = getCommunityBadgeThreshold({ id: resortId, reviews: { items: [] } });
  const result = [];

  Object.values(byCategory).forEach(group => {
    // Sort by votes desc
    group.sort((a, b) => b.votes - a.votes);
    const groupTotal = group.reduce((s, b) => s + b.votes, 0);
    if (groupTotal === 0) return;

    // Top 10% cutoff: only show if vote-share is in top 10% of the category
    // For small categories (≤3 items), only show #1
    const maxShow = Math.max(1, Math.ceil(group.length * 0.10));

    group.slice(0, maxShow).forEach(b => {
      const shareInCategory = groupTotal > 0 ? b.votes / groupTotal : 0;
      const shareOfAll = totalVotes > 0 ? b.votes / totalVotes : 0;

      // Must meet threshold AND have meaningful share (>15% of category)
      if (b.votes >= threshold && shareInCategory >= 0.15) {
        result.push({ ...b, voteShare: shareOfAll, categoryShare: shareInCategory });
      }
    });
  });

  return result.sort((a, b) => b.votes - a.votes);
}

/**
 * Get community votes from localStorage
 */
export function getCommunityVotes(resortId) {
  try {
    const stored = localStorage.getItem(`community_votes:${resortId}`);
    return stored ? JSON.parse(stored) : {};
  } catch { return {}; }
}

/**
 * Get a user's vote for a resort
 */
export function getUserVote(resortId, userId) {
  try {
    const stored = localStorage.getItem(`user_vote:${userId}:${resortId}`);
    return stored ? JSON.parse(stored) : null; // { badgeIds: [], timestamp, verified: bool }
  } catch { return null; }
}

/**
 * Cast a vote — user can select up to 5 badges per resort
 * Requires verified visit flag
 */
export function castVote(resortId, userId, badgeIds, verified = false) {
  if (!verified) return { success: false, error: "Visit not verified" };
  if (badgeIds.length > 5) return { success: false, error: "Maximum 5 badges per resort" };

  // Remove previous vote from counts
  const prevVote = getUserVote(resortId, userId);
  const votes = getCommunityVotes(resortId);

  if (prevVote) {
    prevVote.badgeIds.forEach(id => {
      if (votes[id]) votes[id] = Math.max(0, votes[id] - 1);
    });
  }

  // Add new vote
  badgeIds.forEach(id => { votes[id] = (votes[id] || 0) + 1; });

  localStorage.setItem(`community_votes:${resortId}`, JSON.stringify(votes));
  localStorage.setItem(`user_vote:${userId}:${resortId}`, JSON.stringify({
    badgeIds, timestamp: Date.now(), verified
  }));

  return { success: true };
}

/**
 * Compute earned user badges from activity stats
 */
export function getEarnedUserBadges(stats) {
  const { lifetimeVertical = 0, lifetimeDays = 0, lifetimeResorts = 0, seasonVertical = 0, seasonDays = 0 } = stats;
  const earned = [];

  USER_BADGES.filter(b => b.type === "lifetime").forEach(b => {
    const val = b.id.startsWith("vert") ? lifetimeVertical : b.id.startsWith("days") ? lifetimeDays : lifetimeResorts;
    if (val >= b.threshold) earned.push(b);
  });

  USER_BADGES.filter(b => b.type === "seasonal").forEach(b => {
    const val = b.id.includes("k") ? seasonVertical : seasonDays;
    if (b.id === "seasonal_10k" && seasonVertical >= 10000) earned.push(b);
    else if (b.id === "seasonal_50k" && seasonVertical >= 50000) earned.push(b);
    else if (b.id === "seasonal_centurion" && seasonDays >= 100) earned.push(b);
  });

  return earned;
}
