const STORAGE_KEY = "peakxp_activities";

export function saveActivity(activity) {
  const all = getAllActivities();
  const existing = all.findIndex(a => a.id === activity.id);
  if (existing >= 0) {
    all[existing] = activity;
  } else {
    all.unshift(activity);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return activity;
}

export function getAllActivities() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

export function getUserActivities(userId) {
  return getAllActivities().filter(a => !userId || a.userId === userId);
}

export function getActivityById(id) {
  return getAllActivities().find(a => a.id === id) || null;
}

export function deleteActivity(id) {
  const all = getAllActivities().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function exportActivityAsGPX(activity) {
  const points = (activity.trackPoints || []).map(p =>
    `    <trkpt lat="${p.lat}" lon="${p.lon}">\n      <ele>${p.altitude || 0}</ele>\n      <time>${p.timestamp || new Date().toISOString()}</time>\n      <extensions><speed>${p.speed || 0}</speed></extensions>\n    </trkpt>`
  ).join("\n");

  const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="PeakXP" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${activity.name || "Activity"}</name>
    <time>${activity.date || new Date().toISOString()}</time>
  </metadata>
  <trk>
    <name>${activity.name || "Activity"}</name>
    <type>${activity.type || "skiing"}</type>
    <trkseg>
${points}
    </trkseg>
  </trk>
</gpx>`;

  const blob = new Blob([gpx], { type: "application/gpx+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const date = (activity.date || new Date().toISOString()).slice(0, 10);
  a.download = `peakxp-activity-${date}-${activity.id}.gpx`;
  a.click();
  URL.revokeObjectURL(url);
}

export function createActivityId() {
  return `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// Classify a GPS segment based on elevation change and speed
export function classifySegment(prev, curr) {
  if (!prev) return "idle";
  const dt = (new Date(curr.timestamp) - new Date(prev.timestamp)) / 1000;
  if (dt <= 0) return "idle";
  const dAlt = (curr.altitude || 0) - (prev.altitude || 0);
  const speed = curr.speed || 0;
  if (speed < 1) return "idle";
  if (dAlt < -1 && speed > 5) return "skiing";
  if (dAlt > 0.5 || (speed < 3 && dAlt >= 0)) return "lift";
  return "idle";
}

// Calculate distance between two lat/lon points in km
export function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Build stats from a trackPoints array
export function computeStats(trackPoints) {
  let distanceDownhill = 0, verticalDescent = 0, verticalAscent = 0;
  let maxSpeed = 0, totalSpeedSki = 0, skiSpeedCount = 0;
  let durationTotal = 0, durationSkiing = 0, durationLift = 0, durationIdle = 0;
  let runs = 0, turns = 0;
  let maxAlt = -Infinity, minAlt = Infinity;
  let inRun = false;

  for (let i = 1; i < trackPoints.length; i++) {
    const prev = trackPoints[i - 1];
    const curr = trackPoints[i];
    const dt = (new Date(curr.timestamp) - new Date(prev.timestamp)) / 1000;
    if (dt <= 0 || dt > 300) continue;
    durationTotal += dt;
    const cls = curr.classification || "idle";
    if (cls === "skiing") { durationSkiing += dt; if (!inRun) { runs++; inRun = true; } }
    else { if (inRun) inRun = false; if (cls === "lift") durationLift += dt; else durationIdle += dt; }
    const dist = haversineKm(prev.lat, prev.lon, curr.lat, curr.lon);
    if (cls === "skiing") distanceDownhill += dist;
    const dAlt = (curr.altitude || 0) - (prev.altitude || 0);
    if (dAlt < 0) verticalDescent += Math.abs(dAlt);
    else verticalAscent += dAlt;
    const spd = curr.speed || 0;
    if (spd > maxSpeed) maxSpeed = spd;
    if (cls === "skiing") { totalSpeedSki += spd; skiSpeedCount++; }
    if ((curr.altitude || 0) > maxAlt) maxAlt = curr.altitude;
    if ((curr.altitude || 0) < minAlt) minAlt = curr.altitude;
    // Turn detection
    if (cls === "skiing" && i >= 3) {
      const headingDiff = Math.abs((curr.heading || 0) - (prev.heading || 0));
      if (headingDiff > 45 && headingDiff < 315) turns++;
    }
  }

  return {
    durationTotal: Math.round(durationTotal),
    durationSkiing: Math.round(durationSkiing),
    durationLift: Math.round(durationLift),
    durationIdle: Math.round(durationIdle),
    distanceDownhill: Math.round(distanceDownhill * 10) / 10,
    verticalDescent: Math.round(verticalDescent),
    verticalAscent: Math.round(verticalAscent),
    maxSpeed: Math.round(maxSpeed * 10) / 10,
    avgSpeed: skiSpeedCount > 0 ? Math.round((totalSpeedSki / skiSpeedCount) * 10) / 10 : 0,
    runs,
    turns,
    maxAltitude: maxAlt === -Infinity ? 0 : Math.round(maxAlt),
    minAltitude: minAlt === Infinity ? 0 : Math.round(minAlt),
    startAltitude: trackPoints[0]?.altitude || 0,
  };
}