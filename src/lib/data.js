import { austrianResorts } from './austrianResorts.js';
import { austrianResorts2 } from './austrianResorts2.js';
import { austrianResorts3 } from './austrianResorts3.js';
import { austrianResorts4 } from './austrianResorts4.js';
import { austrianResorts5 } from './austrianResorts5.js';
import { swissResorts } from './swissResorts.js';
import { swissResorts2 } from './swissResorts2.js';
import { swissResorts3 } from './swissResorts3.js';
import { italianResorts } from './italianResorts.js';
import { italianResorts2 } from './italianResorts2.js';
import { italianResorts3 } from './italianResorts3.js';
import { frenchResorts } from './frenchResorts.js';
import { frenchResorts2 } from './frenchResorts2.js';
import { RESORT_PHOTOS } from './resortImages.js';

// Checks whether an image URL is a generic picsum placeholder
function isPicsum(url) {
  return typeof url === 'string' && url.includes('picsum.photos');
}

// Replaces picsum image(s) with real resort photos, rotating by resort index
function applyRealImages(resort, index) {
  if (!isPicsum(resort.image) && !isPicsum((resort.images || [])[0])) return resort;
  const base = index % RESORT_PHOTOS.length;
  const img0 = RESORT_PHOTOS[base % RESORT_PHOTOS.length];
  const img1 = RESORT_PHOTOS[(base + 1) % RESORT_PHOTOS.length];
  const img2 = RESORT_PHOTOS[(base + 2) % RESORT_PHOTOS.length];
  return {
    ...resort,
    image: isPicsum(resort.image) ? img0 : resort.image,
    images: (resort.images || []).map((img, i) => isPicsum(img) ? RESORT_PHOTOS[(base + i) % RESORT_PHOTOS.length] : img),
  };
}

const _rawResorts = [...[
  {
    id: "verbier",
    name: "Verbier",
    country: "Switzerland",
    countryCode: "CH",
    flag: "🇨🇭",
    rating: 9.1,
    ratingLabel: "Exceptional",
    priceFrom: 62,
    pisteKm: 412,
    maxAltitude: 3330,
    minAltitude: 1500,
    runs: 94,
    lifts: 38,
    difficulty: ["intermediate", "expert"],
    facilities: ["terrain_park", "night_skiing"],
    image: "https://picsum.photos/seed/verbier/800/500",
    images: [
      "https://picsum.photos/seed/verbier1/1200/600",
      "https://picsum.photos/seed/verbier2/1200/600",
      "https://picsum.photos/seed/verbier3/1200/600",
    ],
    description: "Verbier is one of the premier freeride destinations in the world, set in the heart of the Swiss Alps. Known for its challenging off-piste terrain, vibrant après-ski scene, and breathtaking panoramic views of Mont Blanc and the Grand Combin. The resort offers a perfect blend of extreme skiing and luxurious mountain living.",
    weather: { temp: -8, snowDepth: 185, condition: "Snowy", forecast: [
      { day: "Today", high: -6, low: -12, condition: "snow" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -7, low: -14, condition: "snow" },
    ]},
    reviews: {
      overall: 9.1,
      breakdown: { pistes: 9.2, lifts: 8.8, apresSki: 9.4, value: 8.5, beginners: 7.2 },
      items: [
        { id: 1, name: "Marcus Lindqvist", avatar: "https://picsum.photos/seed/user1/100/100", flag: "🇸🇪", date: "Feb 2026", rating: 9.5, text: "Absolutely world-class freeride terrain. The Mont Fort descent is something every advanced skier needs to experience. Après-ski scene is electric." },
        { id: 2, name: "Sophie Müller", avatar: "https://picsum.photos/seed/user2/100/100", flag: "🇩🇪", date: "Jan 2026", rating: 8.8, text: "Beautiful resort with incredible views. Lifts can get crowded on weekends but the skiing makes up for it. The new Médran gondola is fantastic." },
        { id: 3, name: "James Harrison", avatar: "https://picsum.photos/seed/user3/100/100", flag: "🇬🇧", date: "Mar 2026", rating: 9.0, text: "Our family's favourite resort. While it's known for expert terrain, there are great intermediate runs too. Kids loved the ski school." },
      ]
    },
    liftPasses: [
      { type: "1-day", adult: 62, child: 31, senior: 50, badge: null },
      { type: "3-day", adult: 168, child: 84, senior: 135, badge: "Best value" },
      { type: "6-day", adult: 310, child: 155, senior: 248, badge: null },
      { type: "Season", adult: 1450, child: 725, senior: 1160, badge: null },
    ],
    instructors: [
      { id: 1, name: "Pierre Dubois", avatar: "https://picsum.photos/seed/inst1/200/200", languages: ["French", "English", "German"], rating: 4.9, speciality: "Freeride · Expert", aiMatch: true },
      { id: 2, name: "Elena Rossi", avatar: "https://picsum.photos/seed/inst2/200/200", languages: ["Italian", "English", "French"], rating: 4.7, speciality: "Freestyle · Advanced", aiMatch: false },
      { id: 3, name: "Thomas Keller", avatar: "https://picsum.photos/seed/inst3/200/200", languages: ["German", "English"], rating: 4.8, speciality: "Technique · Intermediate", aiMatch: false },
    ]
  },
  {
    id: "val-thorens",
    name: "Val Thorens",
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    rating: 8.8,
    ratingLabel: "Excellent",
    priceFrom: 54,
    pisteKm: 600,
    maxAltitude: 3230,
    minAltitude: 1800,
    runs: 78,
    lifts: 32,
    difficulty: ["beginner", "intermediate"],
    facilities: ["terrain_park", "kids_area"],
    image: "https://picsum.photos/seed/valthorens/800/500",
    images: [
      "https://picsum.photos/seed/valthorens1/1200/600",
      "https://picsum.photos/seed/valthorens2/1200/600",
      "https://picsum.photos/seed/valthorens3/1200/600",
    ],
    description: "As the highest resort in Europe, Val Thorens guarantees exceptional snow conditions throughout the season. Part of the massive Trois Vallées ski area — the largest linked ski domain in the world.",
    weather: { temp: -11, snowDepth: 220, condition: "Clear", forecast: [
      { day: "Today", high: -9, low: -15, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -10, low: -16, condition: "snow" },
    ]},
    reviews: { overall: 8.8, breakdown: { pistes: 9.0, lifts: 8.5, apresSki: 8.8, value: 8.9, beginners: 9.0 }, items: [] },
    liftPasses: [
      { type: "1-day", adult: 54, child: 27, senior: 43, badge: null },
      { type: "3-day", adult: 145, child: 73, senior: 116, badge: "Best value" },
      { type: "6-day", adult: 270, child: 135, senior: 216, badge: null },
      { type: "Season", adult: 1200, child: 600, senior: 960, badge: null },
    ],
    instructors: []
  },
  {
    id: "zermatt",
    name: "Zermatt",
    country: "Switzerland",
    countryCode: "CH",
    flag: "🇨🇭",
    rating: 9.3,
    ratingLabel: "Exceptional",
    priceFrom: 71,
    pisteKm: 360,
    maxAltitude: 3883,
    minAltitude: 1620,
    runs: 72,
    lifts: 52,
    difficulty: ["beginner", "intermediate", "expert"],
    facilities: ["kids_area"],
    image: "https://picsum.photos/seed/zermatt/800/500",
    images: [
      "https://picsum.photos/seed/zermatt1/1200/600",
      "https://picsum.photos/seed/zermatt2/1200/600",
      "https://picsum.photos/seed/zermatt3/1200/600",
    ],
    description: "Dominated by the iconic Matterhorn, Zermatt offers year-round skiing in a car-free village setting. One of the highest and most snow-sure resorts in the Alps with cross-border skiing into Cervinia, Italy.",
    weather: { temp: -10, snowDepth: 200, condition: "Snowy", forecast: [
      { day: "Today", high: -8, low: -14, condition: "snow" },
      { day: "Tomorrow", high: -6, low: -12, condition: "partly_cloudy" },
      { day: "Thu", high: -9, low: -15, condition: "clear" },
    ]},
    reviews: { overall: 9.3, breakdown: { pistes: 9.4, lifts: 9.2, apresSki: 8.8, value: 8.0, beginners: 8.5 }, items: [] },
    liftPasses: [
      { type: "1-day", adult: 71, child: 36, senior: 57, badge: null },
      { type: "3-day", adult: 195, child: 98, senior: 156, badge: "Best value" },
      { type: "6-day", adult: 365, child: 183, senior: 292, badge: null },
      { type: "Season", adult: 1600, child: 800, senior: 1280, badge: null },
    ],
    instructors: []
  },
  {
    id: "cortina",
    name: "Cortina d'Ampezzo",
    country: "Italy",
    countryCode: "IT",
    flag: "🇮🇹",
    rating: 8.4,
    ratingLabel: "Very Good",
    priceFrom: 48,
    pisteKm: 140,
    maxAltitude: 2930,
    minAltitude: 1224,
    runs: 65,
    lifts: 28,
    difficulty: ["beginner", "intermediate"],
    facilities: ["kids_area", "night_skiing"],
    image: "https://picsum.photos/seed/cortina/800/500",
    images: [
      "https://picsum.photos/seed/cortina1/1200/600",
      "https://picsum.photos/seed/cortina2/1200/600",
      "https://picsum.photos/seed/cortina3/1200/600",
    ],
    description: "The 'Queen of the Dolomites', Cortina d'Ampezzo combines world-class skiing with Italian glamour. Host of the 2026 Winter Olympics, the resort features stunning Dolomite scenery and excellent cuisine.",
    weather: { temp: -3, snowDepth: 130, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: 0, low: -6, condition: "clear" },
      { day: "Thu", high: -3, low: -9, condition: "partly_cloudy" },
    ]},
    reviews: { overall: 8.4, breakdown: { pistes: 8.2, lifts: 7.8, apresSki: 8.8, value: 8.8, beginners: 9.0 }, items: [] },
    liftPasses: [
      { type: "1-day", adult: 48, child: 24, senior: 38, badge: null },
      { type: "3-day", adult: 130, child: 65, senior: 104, badge: "Best value" },
      { type: "6-day", adult: 245, child: 123, senior: 196, badge: null },
      { type: "Season", adult: 1100, child: 550, senior: 880, badge: null },
    ],
    instructors: []
  },
  {
    id: "courchevel",
    name: "Courchevel",
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    rating: 8.9,
    ratingLabel: "Excellent",
    priceFrom: 66,
    pisteKm: 600,
    maxAltitude: 2738,
    minAltitude: 1300,
    runs: 102,
    lifts: 58,
    difficulty: ["beginner", "intermediate", "expert"],
    facilities: ["terrain_park", "kids_area", "night_skiing"],
    image: "https://picsum.photos/seed/courchevel/800/500",
    images: [
      "https://picsum.photos/seed/courchevel1/1200/600",
      "https://picsum.photos/seed/courchevel2/1200/600",
      "https://picsum.photos/seed/courchevel3/1200/600",
    ],
    description: "Part of the world's largest ski area, Les 3 Vallées, Courchevel offers unmatched variety across its five villages. From luxury Courchevel 1850 to family-friendly Le Praz, there's something for every skier.",
    weather: { temp: -6, snowDepth: 175, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" },
    ]},
    reviews: { overall: 8.9, breakdown: { pistes: 9.1, lifts: 9.0, apresSki: 8.7, value: 7.8, beginners: 9.2 }, items: [] },
    liftPasses: [
      { type: "1-day", adult: 66, child: 33, senior: 53, badge: null },
      { type: "3-day", adult: 180, child: 90, senior: 144, badge: "Best value" },
      { type: "6-day", adult: 335, child: 168, senior: 268, badge: null },
      { type: "Season", adult: 1500, child: 750, senior: 1200, badge: null },
    ],
    instructors: []
  },
  {
    id: "chamonix",
    name: "Chamonix",
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    rating: 9.0,
    ratingLabel: "Exceptional",
    priceFrom: 60,
    pisteKm: 170,
    maxAltitude: 3842,
    minAltitude: 1035,
    runs: 49,
    lifts: 49,
    difficulty: ["intermediate", "expert"],
    facilities: ["terrain_park", "night_skiing"],
    image: "https://picsum.photos/seed/chamonix/800/500",
    images: [
      "https://picsum.photos/seed/chamonix1/1200/600",
      "https://picsum.photos/seed/chamonix2/1200/600",
      "https://picsum.photos/seed/chamonix3/1200/600",
    ],
    description: "The adventure capital of the Alps, Chamonix sits beneath Mont Blanc — Europe's highest peak. World-famous for its extreme off-piste routes, the Vallée Blanche, and buzzing town atmosphere.",
    weather: { temp: -7, snowDepth: 195, condition: "Snowy", forecast: [
      { day: "Today", high: -5, low: -11, condition: "snow" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -7, low: -13, condition: "snow" },
    ]},
    reviews: { overall: 9.0, breakdown: { pistes: 8.8, lifts: 8.5, apresSki: 9.3, value: 8.4, beginners: 6.5 }, items: [] },
    liftPasses: [
      { type: "1-day", adult: 60, child: 30, senior: 48, badge: null },
      { type: "3-day", adult: 162, child: 81, senior: 130, badge: "Best value" },
      { type: "6-day", adult: 305, child: 153, senior: 244, badge: null },
      { type: "Season", adult: 1380, child: 690, senior: 1104, badge: null },
    ],
    instructors: []
  },
  {
    id: "davos",
    name: "Davos Klosters",
    country: "Switzerland",
    countryCode: "CH",
    flag: "🇨🇭",
    rating: 8.5,
    ratingLabel: "Excellent",
    priceFrom: 63,
    pisteKm: 300,
    maxAltitude: 2844,
    minAltitude: 1124,
    runs: 65,
    lifts: 55,
    difficulty: ["beginner", "intermediate", "expert"],
    facilities: ["terrain_park", "night_skiing", "kids_area"],
    image: "https://picsum.photos/seed/davos/800/500",
    images: [
      "https://picsum.photos/seed/davos1/1200/600",
      "https://picsum.photos/seed/davos2/1200/600",
      "https://picsum.photos/seed/davos3/1200/600",
    ],
    description: "Europe's highest town and one of Switzerland's largest ski resorts, Davos Klosters spans six different ski areas. A favourite with the British royal family, it offers excellent variety and reliable snow.",
    weather: { temp: -9, snowDepth: 178, condition: "Clear", forecast: [
      { day: "Today", high: -7, low: -13, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "partly_cloudy" },
      { day: "Thu", high: -8, low: -14, condition: "snow" },
    ]},
    reviews: { overall: 8.5, breakdown: { pistes: 8.6, lifts: 8.4, apresSki: 8.2, value: 8.0, beginners: 8.8 }, items: [] },
    liftPasses: [
      { type: "1-day", adult: 63, child: 32, senior: 50, badge: null },
      { type: "3-day", adult: 170, child: 85, senior: 136, badge: "Best value" },
      { type: "6-day", adult: 320, child: 160, senior: 256, badge: null },
      { type: "Season", adult: 1450, child: 725, senior: 1160, badge: null },
    ],
    instructors: []
  },
  {
    id: "cervinia",
    name: "Cervinia",
    country: "Italy",
    countryCode: "IT",
    flag: "🇮🇹",
    rating: 8.3,
    ratingLabel: "Very Good",
    priceFrom: 46,
    pisteKm: 360,
    maxAltitude: 3883,
    minAltitude: 2050,
    runs: 26,
    lifts: 19,
    difficulty: ["beginner", "intermediate"],
    facilities: ["kids_area"],
    image: "https://picsum.photos/seed/cervinia/800/500",
    images: [
      "https://picsum.photos/seed/cervinia1/1200/600",
      "https://picsum.photos/seed/cervinia2/1200/600",
      "https://picsum.photos/seed/cervinia3/1200/600",
    ],
    description: "Linked to Zermatt via the Matterhorn glacier, Cervinia offers high-altitude skiing in an Italian setting. Renowned for long, sunny runs and excellent value compared to its Swiss neighbour.",
    weather: { temp: -8, snowDepth: 205, condition: "Clear", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "partly_cloudy" },
    ]},
    reviews: { overall: 8.3, breakdown: { pistes: 8.5, lifts: 7.8, apresSki: 7.9, value: 9.0, beginners: 9.1 }, items: [] },
    liftPasses: [
      { type: "1-day", adult: 46, child: 23, senior: 37, badge: null },
      { type: "3-day", adult: 124, child: 62, senior: 99, badge: "Best value" },
      { type: "6-day", adult: 234, child: 117, senior: 187, badge: null },
      { type: "Season", adult: 1050, child: 525, senior: 840, badge: null },
    ],
    instructors: []
  },
  {
    id: "meribel",
    name: "Méribel",
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    rating: 8.8,
    ratingLabel: "Excellent",
    priceFrom: 61,
    pisteKm: 600,
    maxAltitude: 2952,
    minAltitude: 1400,
    runs: 165,
    lifts: 64,
    difficulty: ["beginner", "intermediate", "expert"],
    facilities: ["terrain_park", "kids_area", "night_skiing"],
    image: "https://picsum.photos/seed/meribel/800/500",
    images: [
      "https://picsum.photos/seed/meribel1/1200/600",
      "https://picsum.photos/seed/meribel2/1200/600",
      "https://picsum.photos/seed/meribel3/1200/600",
    ],
    description: "At the heart of Les 3 Vallées, Méribel is a charming resort built in traditional chalet style. Its central position gives skiers easy access to the entire Trois Vallées domain — the world's largest.",
    weather: { temp: -5, snowDepth: 168, condition: "Snowy", forecast: [
      { day: "Today", high: -3, low: -9, condition: "snow" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" },
    ]},
    reviews: { overall: 8.8, breakdown: { pistes: 9.0, lifts: 8.8, apresSki: 8.6, value: 8.1, beginners: 9.0 }, items: [] },
    liftPasses: [
      { type: "1-day", adult: 61, child: 31, senior: 49, badge: null },
      { type: "3-day", adult: 165, child: 83, senior: 132, badge: "Best value" },
      { type: "6-day", adult: 310, child: 155, senior: 248, badge: null },
      { type: "Season", adult: 1400, child: 700, senior: 1120, badge: null },
    ],
    instructors: []
  }
], ...austrianResorts, ...austrianResorts2, ...austrianResorts3, ...austrianResorts4, ...austrianResorts5, ...swissResorts, ...swissResorts2, ...swissResorts3, ...italianResorts, ...italianResorts2, ...italianResorts3, ...frenchResorts, ...frenchResorts2];

// Apply real photos to all resorts that still have picsum placeholders
export const resorts = _rawResorts.map((r, i) => applyRealImages(r, i));

export const trendingCards = [
  { id: "zermatt", resort: "Zermatt", tag: "Best powder in the Alps", image: RESORT_PHOTOS[10] },
  { id: "val-thorens", resort: "Val Thorens", tag: "Top-rated for progression", image: RESORT_PHOTOS[3] },
  { id: "courchevel", resort: "Courchevel", tag: "Ultimate luxury skiing", image: RESORT_PHOTOS[0] },
];

export const dashboardData = {
  userName: "Alex",
  totalDays: 14,
  resortsVisited: 4,
  runsLogged: 187,
  verticalMetres: 142800,
  lastSeasonVertical: 98500,
  upcomingTrip: {
    resort: "Verbier",
    dates: "Mar 15 – Mar 21, 2026",
    passType: "6-day pass",
    daysAway: 14,
  },
  savedResorts: ["zermatt", "courchevel", "val-thorens"],
  recentActivity: [
    { action: "Booked Verbier 6-day lift pass", time: "2 hours ago", icon: "ticket" },
    { action: "Saved Zermatt to favourites", time: "1 day ago", icon: "heart" },
    { action: "Logged 3 runs via GPS tracking", time: "3 days ago", icon: "map" },
    { action: "Left a review for St. Anton", time: "5 days ago", icon: "star" },
  ]
};

// Extended data merged into resort objects
const extendedData = {
  verbier: {
    lat: 46.0967, lng: 7.2282,
    countries: ["Switzerland"],
    region: "Valais, Switzerland",
    openStatus: "Open",
    seasonDates: "29 Nov 2025 – 27 Apr 2026",
    snowDepthBase: 95, snowDepthMid: 155, snowDepthTop: 210,
    snowType: "Packed powder",
    liftsOpen: 32, liftsTotal: 38,
    pistesOpen: 81, pistesTotal: 94,
    snowCannons: 180, snowCannonKm: 40,
    longestRun: 12, verticalDrop: 1830,
    gondolas: 8, chairlifts: 18, dragLifts: 12,
    difficultyBlue: 36, difficultyRed: 42, difficultyBlack: 22,
    roadStatus: "clear",
    seasonPasses: ["magic-pass", "ikon-pass"],
    ecoRating: 4,
    ecoRenewable: 82,
    ecoCertifications: ["ISO 14001", "Flocon Vert"],
    ecoInitiatives: ["Electric snowcat fleet", "Wildlife corridor zones", "Recycled water snowmaking", "EV charging at base stations", "Zero single-use plastics on mountain"],
    ecoOffsetProgram: true,
    webcams: [
      { name: "Summit — 3330m", seed: "webcam1" },
      { name: "Mid-station — 2200m", seed: "webcam2" },
      { name: "Village centre", seed: "webcam3" },
    ],
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h" },
      { airport: "Zurich", iata: "ZRH", driveTime: "3h" },
      { airport: "Turin", iata: "TRN", driveTime: "3h 30m" },
    ],
    trainStation: "Le Châble (cable car link) · Martigny (20min bus)",
    shuttle: true, shuttleDesc: "Direct shuttle from Geneva airport · Daily departures",
    parking: { capacity: 4500, pricePerDay: 15, includedInPass: false },
    resortTypes: ["Alpine", "Freeride", "Après-ski", "Luxury"],
    surroundings: {
      description: "Verbier sits at the heart of the Val de Bagnes, a stunning Alpine valley in the Swiss canton of Valais. The surrounding area is characterised by traditional mountain villages, artisan cheese producers, and dramatic high-Alpine scenery stretching to Mont Blanc.",
      nearbyTowns: [
        { name: "Martigny", distance: "30km", desc: "Gateway city with Roman ruins and art museums" },
        { name: "Le Châble", distance: "10km", desc: "Charming valley village with cable car link" },
        { name: "Sion", distance: "50km", desc: "Historic cantonal capital with medieval chateau" },
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Paragliding", "Dog sledding", "Winter hiking", "Museum", "Wine & gastronomy"],
      touristBoard: "Verbier-St-Bernard Tourism",
      touristBoardUrl: "https://www.verbier.ch",
      emergency: "112",
      hospital: "Hôpital du Valais — Martigny (35km)",
    },
    events: [
      { date: "15 Mar 2026", name: "Verbier Freeride Open", type: "Competition", desc: "Elite freeride competition on the iconic Bec des Rosses face" },
      { date: "22 Mar 2026", name: "Verbier Festival Winter Edition", type: "Concert", desc: "Classical music performances in an Alpine setting" },
      { date: "5 Apr 2026", name: "Easter Family Weekend", type: "Family", desc: "Special kids' activities, egg hunts on the slopes" },
    ],
    promotions: [
      { headline: "Spring skiing from €49/day", validity: "1 Apr – 27 Apr", discount: "20% off", code: "SPRING26", image: "https://picsum.photos/seed/promo1/400/200" },
      { headline: "Stay & Ski package — 5 nights from €690", validity: "Feb 2026", discount: "Bundle deal", code: null, image: "https://picsum.photos/seed/promo2/400/200" },
    ],
    facilities: {
      restaurants: [
        { name: "Le Rouge", zone: "Summit — 3000m", cuisine: "Alpine", price: "€€€" },
        { name: "Chez Dany", zone: "Mid-mountain — 2200m", cuisine: "Swiss", price: "€€" },
        { name: "Chalet Carlsberg", zone: "Village", cuisine: "International", price: "€€" },
      ],
      skiSchools: 5, groupLessonFrom: 45, privateLessonFrom: 120,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪", "🇮🇹"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 65,
      kidsGarden: true, kidsGardenAge: "3–12",
      babysitting: true,
      lockerCount: 800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 12, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Dynastar"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Médran base station",
      pharmacy: true, atm: true, atmCount: 6,
    },
    seasonCalendar: [
      { month: "Nov", status: "partial" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "partial" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" },
    ],
  },
};

const defaultExtended = {
  lat: 46.5, lng: 8.0,
  countries: [],
  region: "",
  openStatus: "Open",
  seasonDates: "Dec 2025 – Apr 2026",
  snowDepthBase: 80, snowDepthMid: 140, snowDepthTop: 190,
  snowType: "Packed powder",
  liftsOpen: 0, liftsTotal: 0,
  pistesOpen: 0, pistesTotal: 0,
  snowCannons: 80, snowCannonKm: 20,
  longestRun: 8, verticalDrop: 1000,
  gondolas: 5, chairlifts: 15, dragLifts: 10,
  difficultyBlue: 35, difficultyRed: 40, difficultyBlack: 25,
  roadStatus: "clear",
  seasonPasses: ["ikon-pass"],
  ecoRating: 3,
  ecoRenewable: 65,
  ecoCertifications: ["ISO 14001"],
  ecoInitiatives: ["LED lighting on all lifts", "Electric shuttles at base"],
  ecoOffsetProgram: false,
  webcams: [
    { name: "Summit view", seed: "wcam1" },
    { name: "Base station", seed: "wcam2" },
  ],
  airports: [
    { airport: "Geneva", iata: "GVA", driveTime: "2–3h" },
    { airport: "Zurich", iata: "ZRH", driveTime: "3h" },
  ],
  trainStation: "Nearest station — transfer by bus",
  shuttle: true, shuttleDesc: "Shuttle service available from main train station",
  parking: { capacity: 2000, pricePerDay: 12, includedInPass: false },
  resortTypes: ["Alpine"],
  surroundings: {
    description: "A scenic Alpine region with traditional mountain culture and year-round outdoor activities.",
    nearbyTowns: [
      { name: "Valley Town", distance: "15km", desc: "Traditional market town with local shops" },
    ],
    activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking"],
    touristBoard: "Regional Tourism Office",
    touristBoardUrl: "#",
    emergency: "112",
    hospital: "Regional hospital (30km)",
  },
  events: [
    { date: "15 Feb 2026", name: "Ski Race Weekend", type: "Competition", desc: "Annual resort race series" },
    { date: "20 Mar 2026", name: "Spring Festival", type: "Festival", desc: "End of season celebrations" },
  ],
  promotions: [
    { headline: "Early booking discount — 15% off", validity: "Valid through Feb 2026", discount: "15% off", code: "EARLY15", image: "https://picsum.photos/seed/promoa/400/200" },
  ],
  facilities: {
    restaurants: [
      { name: "Mountain Restaurant", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" },
      { name: "Village Café", zone: "Base", cuisine: "International", price: "€" },
    ],
    skiSchools: 3, groupLessonFrom: 40, privateLessonFrom: 100,
    languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
    creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 55,
    kidsGarden: true, kidsGardenAge: "3–12",
    babysitting: false,
    lockerCount: 400, lockerSizes: ["S", "M", "L"],
    skiStorage: true, skiStorageFrom: 7, bootDryers: true,
    rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
    skiTuning: true, clothingShop: true, supermarket: true,
    medicalCentre: true, medicalLocation: "Base station",
    pharmacy: false, atm: true, atmCount: 3,
  },
  seasonCalendar: [
    { month: "Nov", status: "partial" }, { month: "Dec", status: "open" },
    { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
    { month: "Mar", status: "open" }, { month: "Apr", status: "partial" },
    { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
    { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
    { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" },
  ],
};

export const SEASON_PASSES = {
  "magic-pass": { name: "Magic Pass", color: "#8B5CF6", regions: 120, priceFrom: 499 },
  "ikon-pass": { name: "Ikon Pass", color: "#1E40AF", regions: 50, priceFrom: 949 },
  "epic-pass": { name: "Epic Pass", color: "#065F46", regions: 40, priceFrom: 849 },
  "snowcard-tirol": { name: "Snowcard Tirol", color: "#0891B2", regions: 14, priceFrom: 699 },
  "superski": { name: "SuperSki Card", color: "#EA580C", regions: 28, priceFrom: 589 },
  "salzburg-super-ski-card": { name: "Salzburg Super Ski Card", color: "#c0392b", regions: 25, priceFrom: 699 },
  "lungo": { name: "LUNGO Pass", color: "#8e44ad", regions: 3, priceFrom: 0 },
};

export function getResortById(id) {
  const resort = resorts.find(r => r.id === id);
  if (!resort) return null;
  // Austrian resorts already have all extended fields inline
  if (resort.lat !== undefined && resort.countries !== undefined && resort.openStatus !== undefined) {
    if (!resort.liftsOpen) resort.liftsOpen = Math.round(resort.lifts * 0.85);
    if (!resort.liftsTotal) resort.liftsTotal = resort.lifts;
    if (!resort.pistesOpen) resort.pistesOpen = Math.round(resort.runs * 0.85);
    if (!resort.pistesTotal) resort.pistesTotal = resort.runs;
    return resort;
  }
  const ext = extendedData[id] || defaultExtended;
  if (!ext.liftsOpen) ext.liftsOpen = Math.round(resort.lifts * 0.85);
  if (!ext.liftsTotal) ext.liftsTotal = resort.lifts;
  if (!ext.pistesOpen) ext.pistesOpen = Math.round(resort.runs * 0.85);
  if (!ext.pistesTotal) ext.pistesTotal = resort.runs;
  if (!ext.countries.length) ext.countries = [resort.country];
  return { ...resort, ...ext };
}