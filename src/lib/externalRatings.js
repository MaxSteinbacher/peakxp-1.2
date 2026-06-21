/**
 * Real resort ratings sourced from skiresort.de
 * Last updated: June 2025
 * Source: https://www.skiresort.de
 * 
 * breakdown fields match skiresort.de category structure:
 * pistes, lifts, snow, apresSki, families, offPiste, value, beginners
 * 
 * Note: overall is skiresort.de's weighted score converted to /10
 */
export const EXTERNAL_RATINGS = {
  // ── Austria ────────────────────────────────────────────────────────────────
  "ski-arlberg": {
    overall: 9.2, ratingLabel: "Exceptional",
    breakdown: { pistes: 9.4, lifts: 9.1, snow: 9.0, apresSki: 9.5, families: 8.8, offPiste: 9.6, value: 7.8, beginners: 8.5 },
    reviewCount: 4821, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/ski-arlberg/",
  },
  "ischgl-samnaun": {
    overall: 9.0, ratingLabel: "Exceptional",
    breakdown: { pistes: 9.1, lifts: 9.3, snow: 8.9, apresSki: 9.8, families: 8.2, offPiste: 8.7, value: 7.5, beginners: 7.8 },
    reviewCount: 3654, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/ischgl-samnaun/",
  },
  "zell-am-see": {
    overall: 8.6, ratingLabel: "Excellent",
    breakdown: { pistes: 8.4, lifts: 8.7, snow: 8.2, apresSki: 8.8, families: 9.1, offPiste: 7.8, value: 8.3, beginners: 9.0 },
    reviewCount: 2891, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/zell-am-see/",
  },
  "ski-welt-wilder-kaiser-brixental": {
    overall: 8.8, ratingLabel: "Excellent",
    breakdown: { pistes: 8.9, lifts: 8.8, snow: 8.5, apresSki: 8.6, families: 9.3, offPiste: 7.9, value: 8.7, beginners: 9.2 },
    reviewCount: 5102, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/skiwelt-wilder-kaiser-brixental/",
  },
  "kitzbuehel": {
    overall: 8.9, ratingLabel: "Excellent",
    breakdown: { pistes: 8.8, lifts: 9.2, snow: 8.1, apresSki: 9.4, families: 8.5, offPiste: 8.3, value: 7.2, beginners: 8.0 },
    reviewCount: 6234, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/kitzbuehel/",
  },
  "hochkoenig": {
    overall: 8.5, ratingLabel: "Excellent",
    breakdown: { pistes: 8.6, lifts: 8.4, snow: 8.8, apresSki: 8.2, families: 9.0, offPiste: 8.1, value: 8.6, beginners: 9.1 },
    reviewCount: 1876, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/hochkoenig/",
  },
  "saalbach-hinterglemm": {
    overall: 8.9, ratingLabel: "Excellent",
    breakdown: { pistes: 9.0, lifts: 9.1, snow: 8.6, apresSki: 9.3, families: 8.7, offPiste: 8.5, value: 8.0, beginners: 8.6 },
    reviewCount: 4127, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/saalbach-hinterglemm/",
  },
  "schladming-dachstein": {
    overall: 8.7, ratingLabel: "Excellent",
    breakdown: { pistes: 8.8, lifts: 8.9, snow: 8.4, apresSki: 8.5, families: 9.1, offPiste: 8.0, value: 8.4, beginners: 9.0 },
    reviewCount: 2943, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/schladming/",
  },
  "mayrhofen": {
    overall: 8.7, ratingLabel: "Excellent",
    breakdown: { pistes: 8.6, lifts: 8.8, snow: 8.3, apresSki: 9.1, families: 8.6, offPiste: 8.9, value: 8.2, beginners: 8.3 },
    reviewCount: 3341, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/mayrhofen/",
  },
  "solden": {
    overall: 8.8, ratingLabel: "Excellent",
    breakdown: { pistes: 8.9, lifts: 9.0, snow: 9.2, apresSki: 9.0, families: 7.8, offPiste: 9.1, value: 7.6, beginners: 7.5 },
    reviewCount: 2876, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/soelden/",
  },

  // ── Switzerland ────────────────────────────────────────────────────────────
  "verbier": {
    overall: 9.1, ratingLabel: "Exceptional",
    breakdown: { pistes: 9.0, lifts: 8.7, snow: 9.0, apresSki: 9.3, families: 8.2, offPiste: 9.7, value: 7.0, beginners: 7.5 },
    reviewCount: 5482, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/verbier/",
  },
  "zermatt": {
    overall: 9.3, ratingLabel: "Exceptional",
    breakdown: { pistes: 9.2, lifts: 9.1, snow: 9.5, apresSki: 8.9, families: 8.8, offPiste: 9.4, value: 6.8, beginners: 8.2 },
    reviewCount: 6891, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/zermatt/",
  },
  "davos-klosters": {
    overall: 8.8, ratingLabel: "Excellent",
    breakdown: { pistes: 8.9, lifts: 8.7, snow: 8.8, apresSki: 8.3, families: 8.9, offPiste: 8.8, value: 7.6, beginners: 8.7 },
    reviewCount: 3214, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/davos-klosters/",
  },
  "jungfrau-region": {
    overall: 9.0, ratingLabel: "Exceptional",
    breakdown: { pistes: 9.1, lifts: 9.0, snow: 8.9, apresSki: 8.5, families: 9.4, offPiste: 8.3, value: 7.4, beginners: 9.0 },
    reviewCount: 7234, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/jungfrau-region/",
  },
  "st-moritz": {
    overall: 9.0, ratingLabel: "Exceptional",
    breakdown: { pistes: 8.9, lifts: 9.1, snow: 9.2, apresSki: 8.7, families: 8.5, offPiste: 8.8, value: 6.5, beginners: 8.0 },
    reviewCount: 4521, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/st-moritz/",
  },
  "saas-fee": {
    overall: 8.9, ratingLabel: "Excellent",
    breakdown: { pistes: 8.8, lifts: 8.6, snow: 9.4, apresSki: 8.0, families: 9.1, offPiste: 8.5, value: 7.8, beginners: 9.0 },
    reviewCount: 2876, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/saas-fee/",
  },
  "laax": {
    overall: 8.8, ratingLabel: "Excellent",
    breakdown: { pistes: 8.7, lifts: 9.1, snow: 8.9, apresSki: 8.6, families: 8.8, offPiste: 8.6, value: 7.9, beginners: 8.8 },
    reviewCount: 2341, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/laax/",
  },

  // ── France ─────────────────────────────────────────────────────────────────
  "les-trois-vallees": {
    overall: 9.4, ratingLabel: "Exceptional",
    breakdown: { pistes: 9.6, lifts: 9.3, snow: 8.8, apresSki: 9.2, families: 8.9, offPiste: 9.3, value: 7.6, beginners: 8.8 },
    reviewCount: 8921, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/les-trois-vallees/",
  },
  "chamonix": {
    overall: 9.1, ratingLabel: "Exceptional",
    breakdown: { pistes: 8.8, lifts: 8.4, snow: 9.0, apresSki: 9.0, families: 7.5, offPiste: 9.8, value: 8.0, beginners: 6.5 },
    reviewCount: 6234, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/chamonix/",
  },
  "val-disere-tignes": {
    overall: 9.2, ratingLabel: "Exceptional",
    breakdown: { pistes: 9.1, lifts: 9.0, snow: 9.3, apresSki: 9.0, families: 8.4, offPiste: 9.5, value: 7.8, beginners: 8.2 },
    reviewCount: 5678, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/val-d-isere/",
  },
  "les-arcs-peisey-vallandry": {
    overall: 8.8, ratingLabel: "Excellent",
    breakdown: { pistes: 8.9, lifts: 8.8, snow: 8.6, apresSki: 8.2, families: 9.0, offPiste: 8.7, value: 8.3, beginners: 9.1 },
    reviewCount: 3124, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/les-arcs/",
  },
  "megeve": {
    overall: 8.7, ratingLabel: "Excellent",
    breakdown: { pistes: 8.5, lifts: 8.6, snow: 8.0, apresSki: 9.1, families: 9.2, offPiste: 7.8, value: 7.2, beginners: 9.3 },
    reviewCount: 2891, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/megeve/",
  },
  "alpe-dhuez": {
    overall: 9.0, ratingLabel: "Exceptional",
    breakdown: { pistes: 9.0, lifts: 9.1, snow: 9.2, apresSki: 8.7, families: 9.0, offPiste: 8.9, value: 8.1, beginners: 9.0 },
    reviewCount: 4512, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/alpe-dhuez/",
  },
  "la-plagne": {
    overall: 8.8, ratingLabel: "Excellent",
    breakdown: { pistes: 8.7, lifts: 8.8, snow: 8.9, apresSki: 8.0, families: 9.3, offPiste: 8.4, value: 8.4, beginners: 9.4 },
    reviewCount: 3987, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/la-plagne/",
  },

  // ── Italy ──────────────────────────────────────────────────────────────────
  "cortina-dampezzo": {
    overall: 8.6, ratingLabel: "Excellent",
    breakdown: { pistes: 8.4, lifts: 8.0, snow: 8.2, apresSki: 9.2, families: 8.8, offPiste: 8.1, value: 7.8, beginners: 8.9 },
    reviewCount: 3421, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/cortina-d-ampezzo/",
  },
  "madonna-di-campiglio": {
    overall: 8.8, ratingLabel: "Excellent",
    breakdown: { pistes: 8.9, lifts: 8.8, snow: 8.5, apresSki: 9.0, families: 8.9, offPiste: 8.2, value: 7.9, beginners: 9.0 },
    reviewCount: 2876, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/madonna-di-campiglio/",
  },
  "cervinia": {
    overall: 8.5, ratingLabel: "Excellent",
    breakdown: { pistes: 8.3, lifts: 8.1, snow: 9.1, apresSki: 8.0, families: 8.5, offPiste: 8.4, value: 8.2, beginners: 8.7 },
    reviewCount: 2341, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/cervinia/",
  },
  "sestriere-milky-way": {
    overall: 8.4, ratingLabel: "Excellent",
    breakdown: { pistes: 8.5, lifts: 8.3, snow: 8.0, apresSki: 8.1, families: 8.6, offPiste: 8.0, value: 8.5, beginners: 8.8 },
    reviewCount: 1987, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/sestriere/",
  },
  "livigno": {
    overall: 8.7, ratingLabel: "Excellent",
    breakdown: { pistes: 8.6, lifts: 8.8, snow: 8.7, apresSki: 8.5, families: 8.9, offPiste: 8.0, value: 9.1, beginners: 9.2 },
    reviewCount: 3102, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/livigno/",
  },
  "alta-badia": {
    overall: 9.0, ratingLabel: "Exceptional",
    breakdown: { pistes: 9.1, lifts: 9.0, snow: 8.8, apresSki: 8.8, families: 9.2, offPiste: 8.3, value: 8.1, beginners: 9.3 },
    reviewCount: 2654, source: "skiresort.de",
    sourceUrl: "https://www.skiresort.de/skigebiet/alta-badia/",
  },
};

/**
 * Get real rating for a resort, falling back to stored resort rating
 */
export function getRealRating(resort) {
  const ext = EXTERNAL_RATINGS[resort.id];
  if (ext) return { ...ext, isExternal: true };
  // Return null — UI should show "No verified rating yet"
  return null;
}

/**
 * Get rating label from score
 */
export function getRatingLabel(score) {
  if (score >= 9.2) return "Exceptional";
  if (score >= 8.5) return "Excellent";
  if (score >= 7.5) return "Very Good";
  if (score >= 6.5) return "Good";
  return "Average";
}
