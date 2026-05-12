export function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10;
}

export function sortByProximity(items, targetLat, targetLon) {
  return [...items]
    .map(item => ({
      ...item,
      distanceKm: haversineKm(targetLat, targetLon, item.coordinates?.lat || 0, item.coordinates?.lon || 0),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

export function filterByRadius(items, targetLat, targetLon, radiusKm) {
  return sortByProximity(items, targetLat, targetLon).filter(item => item.distanceKm <= radiusKm);
}

export function getNearestResorts(resorts, targetResortId, count) {
  const target = resorts.find(r => r.id === targetResortId);
  if (!target || !target.coordinates) return [];
  const { lat, lon } = target.coordinates;
  return resorts
    .filter(r => r.id !== targetResortId)
    .map(r => ({ ...r, distanceKm: haversineKm(lat, lon, r.coordinates?.lat || 0, r.coordinates?.lon || 0) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, count);
}

export function getResortsInDestination(resorts, destination) {
  if (!destination) return resorts;
  let filtered;
  const label = (destination.label || "").toLowerCase();

  if (destination.type === "resort") {
    const main = resorts.find(r => r.id === destination.id || r.name.toLowerCase() === label);
    filtered = main ? [main] : resorts;
  } else if (destination.type === "region") {
    const words = label.split(/[\s,]+/).filter(w => w.length > 2);
    filtered = resorts.filter(r => words.some(w => (r.region || "").toLowerCase().includes(w)));
    if (!filtered.length) filtered = resorts;
  } else if (destination.type === "country") {
    filtered = resorts.filter(r => {
      const country = Array.isArray(r.country) ? r.country.join(" ").toLowerCase() : (r.country || "").toLowerCase();
      return country.includes(label) || label.includes(country);
    });
    if (!filtered.length) filtered = resorts;
  } else {
    filtered = resorts;
  }

  const withCoords = filtered.filter(r => r.coordinates?.lat && r.coordinates?.lon);
  if (!withCoords.length) return filtered;
  const centerLat = withCoords.reduce((s, r) => s + r.coordinates.lat, 0) / withCoords.length;
  const centerLon = withCoords.reduce((s, r) => s + r.coordinates.lon, 0) / withCoords.length;

  return filtered
    .map(r => ({ ...r, distanceKm: haversineKm(centerLat, centerLon, r.coordinates?.lat || centerLat, r.coordinates?.lon || centerLon) }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}