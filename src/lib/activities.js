import { persist, retrieve, KEYS } from './persistence.js';

export function saveActivity(activity, userId) {
  const existing = getAllActivities(userId);
  const idx = existing.findIndex(a => a.id === activity.id);
  if (idx >= 0) existing[idx] = activity;
  else existing.unshift(activity);
  persist(KEYS.ACTIVITIES, existing, userId);
  return activity;
}

function getAllActivities(userId) {
  return retrieve(KEYS.ACTIVITIES, userId, []);
}

export function getUserActivities(userId) {
  return getAllActivities(userId);
}

export function getActivityById(id, userId) {
  return getAllActivities(userId).find(a => a.id === id) || null;
}

export function deleteActivity(id, userId) {
  const filtered = getAllActivities(userId).filter(a => a.id !== id);
  persist(KEYS.ACTIVITIES, filtered, userId);
}

export function exportActivityAsGPX(activity) {
  const points = (activity.trackPoints || []).map(p => `    <trkpt lat="${p.lat}" lon="${p.lon}">
      ${p.altitude != null ? `<ele>${p.altitude}</ele>` : ""}
      <time>${p.timestamp}</time>
      ${p.speed != null ? `<extensions><speed>${p.speed}</speed></extensions>` : ""}
    </trkpt>`).join("\n");

  const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="PeakXP" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${activity.name}</name>
    <time>${activity.date}</time>
  </metadata>
  <trk>
    <name>${activity.name}</name>
    <type>${activity.type}</type>
    <trkseg>
${points}
    </trkseg>
  </trk>
</gpx>`;

  const date = activity.date ? activity.date.split("T")[0] : "unknown";
  const blob = new Blob([gpx], { type: "application/gpx+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `peakxp-activity-${date}-${activity.id}.gpx`;
  a.click();
  URL.revokeObjectURL(url);
}

export function createActivityId() {
  return `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function formatDuration(seconds) {
  if (!seconds) return "0m";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function calcStatsFromTrackPoints(points) {
  if (!points || points.length < 2) return {};
  let verticalDescent = 0, verticalAscent = 0, distanceDownhill = 0;
  let maxSpeed = 0, speedSum = 0, speedCount = 0;
  let maxAlt = -Infinity, minAlt = Infinity;
  let durationTotal = 0, durationSkiing = 0, durationLift = 0, durationIdle = 0;
  let runs = 0, turns = 0;
  let inRun = false;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const dt = (new Date(cur.timestamp) - new Date(prev.timestamp)) / 1000;
    if (dt <= 0 || dt > 300) continue;
    durationTotal += dt;

    const dAlt = (cur.altitude || 0) - (prev.altitude || 0);
    if (dAlt < 0) verticalDescent += Math.abs(dAlt);
    else verticalAscent += dAlt;

    const spd = cur.speed || 0;
    if (spd > maxSpeed) maxSpeed = spd;
    if (spd > 0) { speedSum += spd; speedCount++; }

    if (cur.altitude != null) {
      if (cur.altitude > maxAlt) maxAlt = cur.altitude;
      if (cur.altitude < minAlt) minAlt = cur.altitude;
    }

    const cls = cur.classification;
    if (cls === "skiing") {
      durationSkiing += dt;
      distanceDownhill += haversine(prev.lat, prev.lon, cur.lat, cur.lon);
      if (!inRun) { inRun = true; runs++; }
    } else {
      if (inRun && cls !== "skiing") inRun = false;
      if (cls === "lift") durationLift += dt;
      else durationIdle += dt;
    }
  }

  return {
    durationTotal: Math.round(durationTotal),
    durationSkiing: Math.round(durationSkiing),
    durationLift: Math.round(durationLift),
    durationIdle: Math.round(durationIdle),
    distanceDownhill: Math.round(distanceDownhill * 10) / 10,
    maxSpeed: Math.round(maxSpeed * 10) / 10,
    avgSpeed: speedCount > 0 ? Math.round((speedSum / speedCount) * 10) / 10 : 0,
    verticalDescent: Math.round(verticalDescent),
    verticalAscent: Math.round(verticalAscent),
    runs,
    turns,
    maxAltitude: maxAlt === -Infinity ? null : Math.round(maxAlt),
    minAltitude: minAlt === Infinity ? null : Math.round(minAlt),
    startAltitude: points[0]?.altitude ? Math.round(points[0].altitude) : null,
  };
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function classifySegment(prev, cur) {
  if (!prev || !cur) return "idle";
  const dAlt = (cur.altitude || 0) - (prev.altitude || 0);
  const spd = cur.speed || 0;
  const dt = (new Date(cur.timestamp) - new Date(prev.timestamp)) / 1000 || 1;
  const dist = haversine(prev.lat, prev.lon, cur.lat, cur.lon) * 1000;
  const slopeAngle = dist > 0 ? Math.atan2(Math.abs(dAlt), dist) * (180 / Math.PI) : 0;

  if (dAlt < 0 && slopeAngle > 5 && spd > 5 / 3.6) return "skiing";
  if (dAlt > 0 && spd < 3 / 3.6) return "lift";
  if (spd < 0.5 / 3.6) return "idle";
  return "idle";
}