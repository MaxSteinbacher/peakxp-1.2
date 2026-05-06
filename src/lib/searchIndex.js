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

export function searchDestinations(query, index = searchIndex) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const q = query.toLowerCase();

  // Filter and score
  const scored = index
    .map((item) => {
      const label = item.label.toLowerCase();
      const sublabel = item.sublabel.toLowerCase();

      let score = 0;
      if (label === q) score = 1000; // Exact match
      else if (label.startsWith(q)) score = 100; // Starts with
      else if (label.includes(q)) score = 10; // Contains in label
      else if (sublabel.includes(q)) score = 5; // Contains in sublabel
      else return null;

      return { ...item, score };
    })
    .filter((item) => item !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  // Group by type
  const grouped = {
    region: [],
    country: [],
    resort: [],
  };

  scored.forEach((item) => {
    if (grouped[item.type]) {
      grouped[item.type].push(item);
    }
  });

  return [
    ...grouped.region,
    ...grouped.country,
    ...grouped.resort,
  ];
}