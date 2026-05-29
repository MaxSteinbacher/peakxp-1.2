import { resorts } from "./data.js";

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

function getCountryName(code) {
  const countryMap = {
    CH: "Switzerland",
    AT: "Austria",
    FR: "France",
    IT: "Italy",
    DE: "Germany",
    ES: "Spain",
    US: "United States",
    CA: "Canada",
  };
  return countryMap[code] || code;
}

export function buildSearchIndex(resortsArray) {
  const results = [];
  const regionMap = {};
  const countryMap = {};

  // Build resort entries and collect regions/countries
  resortsArray.forEach((resort) => {
    results.push({
      type: "resort",
      id: resort.id,
      label: resort.name,
      sublabel: `${resort.region || resort.country}, ${resort.country}`,
      countryCode: [resort.countryCode],
      region: resort.region || resort.country,
      flag: resort.flag,
      pisteKm: resort.pisteKm,
      lat: resort.lat ?? null,
      lng: resort.lng ?? null,
    });

    // Collect unique regions
    if (resort.region) {
      const key = resort.region;
      if (!regionMap[key]) {
        regionMap[key] = {
          countries: new Set(),
          resorts: 0,
        };
      }
      regionMap[key].countries.add(resort.countryCode);
      regionMap[key].resorts += 1;
    }

    // Collect unique countries
    if (resort.countryCode) {
      const key = resort.countryCode;
      if (!countryMap[key]) {
        countryMap[key] = {
          name: getCountryName(resort.countryCode),
          resorts: 0,
        };
      }
      countryMap[key].resorts += 1;
    }
  });

  // Add region entries
  Object.entries(regionMap).forEach(([regionName, data]) => {
    const countryCodes = Array.from(data.countries);
    const countryNames = countryCodes
      .map((c) => getCountryName(c))
      .join("/");

    results.push({
      type: "region",
      id: `region-${slugify(regionName)}`,
      label: regionName,
      sublabel: `Region — ${countryNames}`,
      countryCode: countryCodes,
      region: regionName,
      resortCount: data.resorts,
      flag: resortsArray.find((r) => r.region === regionName)?.flag || "🏔️",
    });
  });

  // Add country entries
  Object.entries(countryMap).forEach(([code, data]) => {
    results.push({
      type: "country",
      id: `country-${code}`,
      label: data.name,
      sublabel: `Country — ${data.resorts} resort${data.resorts !== 1 ? "s" : ""}`,
      countryCode: [code],
      region: null,
      resortCount: data.resorts,
      flag: resortsArray.find((r) => r.countryCode === code)?.flag || "🏔️",
    });
  });

  return results;
}

export const searchIndex = buildSearchIndex(resorts);

function distKm(lat1, lng1, lat2, lng2) {
  const dLat = (lat2 - lat1) * 111;
  const dLng = (lng2 - lng1) * 111 * Math.cos((lat1 * Math.PI) / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

export function searchDestinations(query, index = searchIndex) {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase();

  // Score all index items
  const scored = index
    .map((item) => {
      const label = item.label.toLowerCase();
      const sublabel = item.sublabel.toLowerCase();
      let score = 0;
      if (label === q) score = 1000;
      else if (label.startsWith(q)) score = 100;
      else if (label.includes(q)) score = 10;
      else if (sublabel.includes(q)) score = 5;
      else return null;
      return { ...item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  // If the top match is a specific resort, inject nearby resorts into the results
  const topResort = scored.find(i => i.type === "resort" && i.score >= 100);
  const nearbyToInject = [];

  if (topResort && topResort.lat != null && topResort.lng != null) {
    // Find all resorts within ~100km from the resorts array in the index
    const resortItems = index.filter(i => i.type === "resort" && i.lat != null && i.lng != null);
    const nearby = resortItems
      .filter(r => r.id !== topResort.id)
      .map(r => ({ ...r, _distKm: Math.round(distKm(topResort.lat, topResort.lng, r.lat, r.lng)) }))
      .filter(r => r._distKm <= 80)
      .sort((a, b) => a._distKm - b._distKm)
      .slice(0, 5)
      .map(r => ({ ...r, sublabel: `${r._distKm}km from ${topResort.label}`, score: 50 }));
    nearbyToInject.push(...nearby);
  }

  // Merge, deduplicate
  const all = [...scored];
  nearbyToInject.forEach(n => {
    if (!all.find(x => x.id === n.id)) all.push(n);
  });

  // Group by type
  const grouped = { region: [], country: [], resort: [] };
  all.forEach(item => { if (grouped[item.type]) grouped[item.type].push(item); });

  return [
    ...grouped.region,
    ...grouped.country,
    ...grouped.resort.slice(0, 8),
  ];
}