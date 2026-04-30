export const austrianResorts5 = [
  {
    id: "kuehtai",
    name: "Kuehtai",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.21, lng: 11.01,
    minAltitude: 2000, maxAltitude: 2520,
    verticalDrop: 520,
    pisteKm: 44, runs: 18, lifts: 12,
    gondolas: 3, chairlifts: 6, dragLifts: 3,
    longestRun: 7,
    difficultyBlue: 28, difficultyRed: 50, difficultyBlack: 22,
    snowCannons: 35, snowCannonKm: 14,
    seasonStart: "2024-11-23", seasonEnd: "2025-04-27",
    openStatus: "Open", roadStatus: "chains",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "23 Nov 2024 - 27 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "High altitude"],
    description: "Austrias highest village resort at 2000m guaranteeing excellent snow from November through April. Small and intimate, popular with day visitors from Innsbruck seeking uncrowded slopes at genuine high altitude.",
    image: "https://picsum.photos/seed/kuehtai/800/500",
    images: ["https://picsum.photos/seed/kuehtai-1/1200/700", "https://picsum.photos/seed/kuehtai-2/1200/700", "https://picsum.photos/seed/kuehtai-3/1200/700"],
    weather: { temp: -8, snowDepth: 190, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 110, snowDepthMid: 160, snowDepthTop: 205, snowType: "Packed powder",
    liftsOpen: 11, liftsTotal: 12, pistesOpen: 16, pistesTotal: 18,
    ecoRating: 3, ecoRenewable: 44, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["44% renewable electricity", "High altitude natural snow advantage"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "45m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Innsbruck Hauptbahnhof - 30km bus",
    shuttle: false, shuttleDesc: "Bus from Innsbruck",
    parking: { capacity: 900, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Dortmunder Hutte", zone: "2230m", cuisine: "Austrian", price: "€€" },
        { name: "Kuehtai Alm", zone: "Village 2000m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 160, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Kuehtai sits in a high plateau in the Stubai Alps just 30 minutes from Innsbruck. The surrounding terrain is excellent for winter walks and snowshoeing.",
      nearbyTowns: [
        { name: "Innsbruck", distance: "30km", desc: "Tyrolean capital with rail connections" },
        { name: "Oetz", distance: "15km", desc: "Inn valley village at the foot of the Oetztal" }
      ],
      activities: ["Snowshoeing", "Winter hiking"],
      touristBoard: "Kuehtai Tourismus",
      touristBoardUrl: "https://www.kuehtai.info",
      emergency: "112",
      hospital: "Innsbruck University Hospital (45m drive)"
    },
    webcams: [
      { name: "Gaiskogel 2520m", seed: "kuehtai-cam1" },
      { name: "Village 2000m", seed: "kuehtai-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Kuehtai Night Race", type: "Competition", desc: "Annual night slalom event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 46, child: 23, senior: 37, badge: null },
      { type: "3-day", adult: 126, child: 63, senior: 101, badge: null },
      { type: "6-day", adult: 236, child: 118, senior: 189, badge: "Best value" },
      { type: "Season", adult: 1060, child: 530, senior: 848, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.4,
      breakdown: { pistes: 8.4, lifts: 8.3, apresSki: 7.8, value: 9.2, beginners: 8.8 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "partial" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "open" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "schlick-2000",
    name: "Schlick 2000 Fulpmes",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.15, lng: 11.35,
    minAltitude: 1000, maxAltitude: 2136,
    verticalDrop: 1136,
    pisteKm: 40, runs: 22, lifts: 10,
    gondolas: 3, chairlifts: 5, dragLifts: 2,
    longestRun: 7,
    difficultyBlue: 28, difficultyRed: 52, difficultyBlack: 20,
    snowCannons: 45, snowCannonKm: 18,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.2, ratingLabel: "Excellent", priceFrom: 43,
    seasonDates: "14 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Easy access from Innsbruck and a relaxed family atmosphere in the Stubaital. Varied terrain suits all ability levels with stunning views of the Stubai Alps and a friendly local atmosphere.",
    image: "https://picsum.photos/seed/schlick-2000/800/500",
    images: ["https://picsum.photos/seed/schlick-2000-1/1200/700", "https://picsum.photos/seed/schlick-2000-2/1200/700", "https://picsum.photos/seed/schlick-2000-3/1200/700"],
    weather: { temp: -4, snowDepth: 130, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 105, snowDepthTop: 150, snowType: "Packed powder",
    liftsOpen: 9, liftsTotal: 10, pistesOpen: 20, pistesTotal: 22,
    ecoRating: 3, ecoRenewable: 50, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["50% renewable electricity", "Stubaital bus integration"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "35m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 15m" }
    ],
    trainStation: "Innsbruck Hauptbahnhof - 28km Stubai valley bus",
    shuttle: false, shuttleDesc: "Stubai valley bus from Innsbruck",
    parking: { capacity: 1000, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Kreuzjoch Restaurant", zone: "Summit 2136m", cuisine: "Austrian", price: "€€" },
        { name: "Starkenburger Hutte", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 2, groupLessonFrom: 37, privateLessonFrom: 93,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 45,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 250, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: false,
      medicalCentre: true, medicalLocation: "Fulpmes village",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Fulpmes is the main village in the lower Stubai valley with a long metalworking tradition. The Stubai glacier is visible from the upper slopes.",
      nearbyTowns: [
        { name: "Fulpmes", distance: "2km", desc: "Traditional Stubai valley craftsman village" },
        { name: "Neustift im Stubaital", distance: "8km", desc: "Main Stubaital village near the glacier" },
        { name: "Innsbruck", distance: "28km", desc: "Tyrolean capital" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating"],
      touristBoard: "Stubai Tourismus",
      touristBoardUrl: "https://www.stubai.at",
      emergency: "112",
      hospital: "Innsbruck University Hospital (35m drive)"
    },
    webcams: [
      { name: "Kreuzjoch 2136m", seed: "schlick-cam1" },
      { name: "Fulpmes base", seed: "schlick-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Schlick Family Race", type: "Competition", desc: "Annual family fun race" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 43, child: 22, senior: 34, badge: null },
      { type: "3-day", adult: 118, child: 59, senior: 94, badge: null },
      { type: "6-day", adult: 221, child: 111, senior: 177, badge: "Best value" },
      { type: "Season", adult: 990, child: 495, senior: 792, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.2,
      breakdown: { pistes: 8.2, lifts: 8.1, apresSki: 7.9, value: 9.4, beginners: 9.3 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "partial" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "hochkar",
    name: "Hochkar",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Lower Austria, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.79, lng: 14.96,
    minAltitude: 1350, maxAltitude: 1808,
    verticalDrop: 458,
    pisteKm: 22, runs: 12, lifts: 6,
    gondolas: 2, chairlifts: 3, dragLifts: 1,
    longestRun: 5,
    difficultyBlue: 25, difficultyRed: 50, difficultyBlack: 25,
    snowCannons: 25, snowCannonKm: 11,
    seasonStart: "2024-12-21", seasonEnd: "2025-03-16",
    openStatus: "Open", roadStatus: "chains",
    rating: 7.8, ratingLabel: "Very good", priceFrom: 38,
    seasonDates: "21 Dec 2024 - 16 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Day trip"],
    description: "The main ski resort of Lower Austria and a favourite day trip from Vienna. Compact layout and efficient lifts mean excellent time on snow for day trippers and the area is accessible for less experienced skiers.",
    image: "https://picsum.photos/seed/hochkar/800/500",
    images: ["https://picsum.photos/seed/hochkar-1/1200/700", "https://picsum.photos/seed/hochkar-2/1200/700", "https://picsum.photos/seed/hochkar-3/1200/700"],
    weather: { temp: -3, snowDepth: 100, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -1, low: -7, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -2, low: -8, condition: "clear" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 80, snowDepthTop: 110, snowType: "Machine-groomed",
    liftsOpen: 6, liftsTotal: 6, pistesOpen: 11, pistesTotal: 12,
    ecoRating: 3, ecoRenewable: 48, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["48% renewable electricity", "70% snowmaking coverage"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Vienna", iata: "VIE", driveTime: "2h" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h 30m" }
    ],
    trainStation: "Goestling - 8km bus",
    shuttle: false, shuttleDesc: "Bus from Goestling",
    parking: { capacity: 1200, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Hochkar Gipfelrestaurant", zone: "Summit 1808m", cuisine: "Austrian", price: "€€" },
        { name: "Hochkar Bergrestaurant", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 34, privateLessonFrom: 85,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 42,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 180, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Base station",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Hochkar is in the Otscher-Tormauer nature park in Lower Austria, popular as an easy day trip destination from Vienna. The Otscher peak is a recognisable landmark.",
      nearbyTowns: [
        { name: "Goestling an der Ybbs", distance: "8km", desc: "Small Lower Austrian market town" },
        { name: "Gaming", distance: "20km", desc: "Historic Carthusian monastery town" },
        { name: "Wien", distance: "160km", desc: "Austrian capital" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Tobogganing"],
      touristBoard: "Hochkar Tourismus",
      touristBoardUrl: "https://www.hochkar.at",
      emergency: "112",
      hospital: "LKH Amstetten (40km)"
    },
    webcams: [
      { name: "Hochkar 1808m", seed: "hochkar-cam1" },
      { name: "Base station", seed: "hochkar-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Hochkar Night Race", type: "Competition", desc: "Illuminated night slalom" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 38, child: 19, senior: 30, badge: null },
      { type: "3-day", adult: 104, child: 52, senior: 83, badge: null },
      { type: "6-day", adult: 194, child: 97, senior: 155, badge: "Best value" },
      { type: "Season", adult: 870, child: 435, senior: 696, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 7.8,
      breakdown: { pistes: 7.8, lifts: 7.7, apresSki: 7.5, value: 9.4, beginners: 9.2 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "partial" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "partial" }, { month: "Apr", status: "closed" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "wurzeralm",
    name: "Wurzeralm",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Upper Austria, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.72, lng: 14.27,
    minAltitude: 950, maxAltitude: 1870,
    verticalDrop: 920,
    pisteKm: 32, runs: 15, lifts: 7,
    gondolas: 2, chairlifts: 3, dragLifts: 2,
    longestRun: 7,
    difficultyBlue: 26, difficultyRed: 54, difficultyBlack: 20,
    snowCannons: 35, snowCannonKm: 14,
    seasonStart: "2024-12-21", seasonEnd: "2025-03-23",
    openStatus: "Open", roadStatus: "open",
    rating: 7.9, ratingLabel: "Very good", priceFrom: 40,
    seasonDates: "21 Dec 2024 - 23 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "A quieter alternative to nearby Hinterstoder with 32km of family-friendly slopes above Spital am Pyhrn. Good value lift passes and a relaxed local atmosphere popular in Upper Austria.",
    image: "https://picsum.photos/seed/wurzeralm/800/500",
    images: ["https://picsum.photos/seed/wurzeralm-1/1200/700", "https://picsum.photos/seed/wurzeralm-2/1200/700", "https://picsum.photos/seed/wurzeralm-3/1200/700"],
    weather: { temp: -3, snowDepth: 105, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 45, snowDepthMid: 85, snowDepthTop: 125, snowType: "Machine-groomed",
    liftsOpen: 7, liftsTotal: 7, pistesOpen: 14, pistesTotal: 15,
    ecoRating: 3, ecoRenewable: 46, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["46% renewable electricity", "Pyhrn-Priel natural park stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Spital am Pyhrn - 5km bus",
    shuttle: false, shuttleDesc: "Bus from Spital am Pyhrn station",
    parking: { capacity: 900, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Wurzeralm Gipfelrestaurant", zone: "Summit 1870m", cuisine: "Austrian", price: "€€" },
        { name: "Mitterstationshutte", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 35, privateLessonFrom: 88,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 160, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Spital am Pyhrn (5km)",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "The Wurzeralm is in the Pyhrn-Priel region of Upper Austria, a protected natural landscape of high limestone plateaus and forested valleys.",
      nearbyTowns: [
        { name: "Spital am Pyhrn", distance: "5km", desc: "Small Upper Austrian village on the Pyhrn pass route" },
        { name: "Kirchdorf an der Krems", distance: "30km", desc: "Upper Austrian market town with train station" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Cross-country skiing"],
      touristBoard: "Pyhrn-Priel Tourismus",
      touristBoardUrl: "https://www.pyhrn-priel.net",
      emergency: "112",
      hospital: "LKH Kirchdorf (30km)"
    },
    webcams: [
      { name: "Wurzeralm 1870m", seed: "wurzeralm-cam1" },
      { name: "Base station", seed: "wurzeralm-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Wurzeralm Family Day", type: "Festival", desc: "Ski carnival and family activities" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 40, child: 20, senior: 32, badge: null },
      { type: "3-day", adult: 110, child: 55, senior: 88, badge: null },
      { type: "6-day", adult: 205, child: 103, senior: 164, badge: "Best value" },
      { type: "Season", adult: 920, child: 460, senior: 736, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 7.9,
      breakdown: { pistes: 8.0, lifts: 7.9, apresSki: 7.5, value: 9.5, beginners: 9.3 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "partial" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "partial" }, { month: "Apr", status: "closed" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "tauplitz",
    name: "Tauplitz-Bad Mitterndorf",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Styria, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.57, lng: 14.00,
    minAltitude: 900, maxAltitude: 1868,
    verticalDrop: 968,
    pisteKm: 40, runs: 20, lifts: 9,
    gondolas: 2, chairlifts: 5, dragLifts: 2,
    longestRun: 8,
    difficultyBlue: 30, difficultyRed: 50, difficultyBlack: 20,
    snowCannons: 35, snowCannonKm: 14,
    seasonStart: "2024-12-14", seasonEnd: "2025-03-30",
    openStatus: "Open", roadStatus: "open",
    rating: 8.0, ratingLabel: "Very good", priceFrom: 40,
    seasonDates: "14 Dec 2024 - 30 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort", "Nordic"],
    description: "Gentle slopes with a charming lakeside setting in the Styrian Salzkammergut. Also famous for its cross-country skiing network and the Tauplitzalm plateau offers easy scenic touring terrain.",
    image: "https://picsum.photos/seed/tauplitz/800/500",
    images: ["https://picsum.photos/seed/tauplitz-1/1200/700", "https://picsum.photos/seed/tauplitz-2/1200/700", "https://picsum.photos/seed/tauplitz-3/1200/700"],
    weather: { temp: -3, snowDepth: 115, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -1, low: -7, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -2, low: -8, condition: "clear" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 50, snowDepthMid: 90, snowDepthTop: 130, snowType: "Machine-groomed",
    liftsOpen: 8, liftsTotal: 9, pistesOpen: 18, pistesTotal: 20,
    ecoRating: 3, ecoRenewable: 50, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["50% renewable electricity", "Salzkammergut lake ecosystem protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Bad Mitterndorf - 6km bus",
    shuttle: false, shuttleDesc: "Bus from Bad Mitterndorf station",
    parking: { capacity: 1000, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Tauplitzalm Restaurant", zone: "Plateau 1640m", cuisine: "Austrian", price: "€€" },
        { name: "Loserseehutte", zone: "1380m", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 36, privateLessonFrom: 90,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 180, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Bad Mitterndorf (6km)",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Tauplitz sits in the Styrian Salzkammergut lake district surrounded by the Dead Mountains limestone range. Bad Mitterndorf is a traditional spa village.",
      nearbyTowns: [
        { name: "Bad Mitterndorf", distance: "6km", desc: "Traditional Styrian spa and cross-country ski village" },
        { name: "Bad Aussee", distance: "15km", desc: "Salzkammergut market town" },
        { name: "Bad Ischl", distance: "40km", desc: "Former Habsburg summer residence" }
      ],
      activities: ["Cross-country skiing", "Snowshoeing", "Winter hiking", "Spa & wellness"],
      touristBoard: "Tauplitz Tourismus",
      touristBoardUrl: "https://www.tauplitz.at",
      emergency: "112",
      hospital: "LKH Bad Aussee (15km)"
    },
    webcams: [
      { name: "Lawinenstein 1868m", seed: "tauplitz-cam1" },
      { name: "Tauplitzalm plateau", seed: "tauplitz-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Tauplitz Nordic Weekend", type: "Festival", desc: "Cross-country ski festival on the plateau" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 40, child: 20, senior: 32, badge: null },
      { type: "3-day", adult: 110, child: 55, senior: 88, badge: null },
      { type: "6-day", adult: 205, child: 103, senior: 164, badge: "Best value" },
      { type: "Season", adult: 920, child: 460, senior: 736, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.0,
      breakdown: { pistes: 8.0, lifts: 7.9, apresSki: 7.8, value: 9.4, beginners: 9.4 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "partial" }, { month: "Apr", status: "closed" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "fieberbrunn",
    name: "Fieberbrunn",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.47, lng: 12.55,
    minAltitude: 800, maxAltitude: 2020,
    verticalDrop: 1220,
    pisteKm: 43, runs: 24, lifts: 14,
    gondolas: 4, chairlifts: 7, dragLifts: 3,
    longestRun: 8,
    difficultyBlue: 24, difficultyRed: 52, difficultyBlack: 24,
    snowCannons: 40, snowCannonKm: 16,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 47,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["snowcard-tirol", "superski"],
    resortTypes: ["Alpine", "Freeride"],
    description: "An authentic Tyrolean village with a world-famous freeride scene hosting the Freeride World Tour. Connected to the Skicircus Saalbach via the Reckmoos gondola forming part of one of Austrias largest ski areas.",
    image: "https://picsum.photos/seed/fieberbrunn/800/500",
    images: ["https://picsum.photos/seed/fieberbrunn-1/1200/700", "https://picsum.photos/seed/fieberbrunn-2/1200/700", "https://picsum.photos/seed/fieberbrunn-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 110, snowDepthTop: 155, snowType: "Packed powder",
    liftsOpen: 13, liftsTotal: 14, pistesOpen: 22, pistesTotal: 24,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Train access promotion"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "Fieberbrunn - 1km, Salzburg-Innsbruck line",
    shuttle: true, shuttleDesc: "Trains on the Salzburg-Innsbruck line stop at Fieberbrunn",
    parking: { capacity: 1500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Lärchfilzkogel Restaurant", zone: "Summit 2020m", cuisine: "Austrian", price: "€€" },
        { name: "Doischberg Alm", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 300, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: true, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Fieberbrunn is a genuine Tyrolean farming village in the Pillersee valley that hosts the annual Freeride World Tour stop at the Wildseeloder face.",
      nearbyTowns: [
        { name: "Fieberbrunn", distance: "0km", desc: "Authentic Tyrolean village with freeride heritage" },
        { name: "Kitzbuehel", distance: "20km", desc: "World-famous luxury ski resort" },
        { name: "St. Johann in Tirol", distance: "10km", desc: "Lively market town" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating", "Freeride tours"],
      touristBoard: "Fieberbrunn Tourismus",
      touristBoardUrl: "https://www.fieberbrunn.com",
      emergency: "112",
      hospital: "Kufstein hospital (35km)"
    },
    webcams: [
      { name: "Lärchfilzkogel 2020m", seed: "fieberbrunn-cam1" },
      { name: "Fieberbrunn village", seed: "fieberbrunn-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Freeride World Tour Fieberbrunn", type: "Competition", desc: "Annual Freeride World Tour stop on the Wildseeloder" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 47, child: 24, senior: 38, badge: null },
      { type: "3-day", adult: 129, child: 65, senior: 103, badge: null },
      { type: "6-day", adult: 241, child: 121, senior: 193, badge: "Best value" },
      { type: "Season", adult: 1080, child: 540, senior: 864, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.3,
      breakdown: { pistes: 8.3, lifts: 8.2, apresSki: 8.3, value: 9.0, beginners: 8.8 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "partial" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "ramsau-dachstein",
    name: "Ramsau am Dachstein",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Styria, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.43, lng: 13.64,
    minAltitude: 1000, maxAltitude: 1870,
    verticalDrop: 870,
    pisteKm: 25, runs: 16, lifts: 10,
    gondolas: 3, chairlifts: 5, dragLifts: 2,
    longestRun: 6,
    difficultyBlue: 40, difficultyRed: 45, difficultyBlack: 15,
    snowCannons: 20, snowCannonKm: 9,
    seasonStart: "2024-12-07", seasonEnd: "2025-03-30",
    openStatus: "Open", roadStatus: "open",
    rating: 8.1, ratingLabel: "Excellent", priceFrom: 39,
    seasonDates: "7 Dec 2024 - 30 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Nordic", "Family resort"],
    description: "Internationally renowned for 200km of cross-country ski trails under the dramatic Dachstein glacier hosting regular World Cup events. The alpine ski area offers gentle family terrain with the glacier as a stunning backdrop.",
    image: "https://picsum.photos/seed/ramsau-dachstein/800/500",
    images: ["https://picsum.photos/seed/ramsau-dachstein-1/1200/700", "https://picsum.photos/seed/ramsau-dachstein-2/1200/700", "https://picsum.photos/seed/ramsau-dachstein-3/1200/700"],
    weather: { temp: -3, snowDepth: 110, condition: "Sunny", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "clear" },
      { day: "Thu", high: -4, low: -10, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 50, snowDepthMid: 85, snowDepthTop: 120, snowType: "Machine-groomed",
    liftsOpen: 9, liftsTotal: 10, pistesOpen: 14, pistesTotal: 16,
    ecoRating: 4, ecoRenewable: 55, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["55% renewable electricity", "Green Globe certified", "Cross-country trails protect biodiversity"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Schladming - 12km bus",
    shuttle: false, shuttleDesc: "Bus from Schladming",
    parking: { capacity: 1200, pricePerDay: 7, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Dachstein Restaurant", zone: "1870m", cuisine: "Austrian", price: "€€" },
        { name: "Ramsau Alm", zone: "Village plateau", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 34, privateLessonFrom: 86,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 42,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 180, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol", "Fischer"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Schladming (12km)",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Ramsau am Dachstein is a high plateau village beneath the Dachstein massif offering outstanding Nordic skiing and views across the Enns valley.",
      nearbyTowns: [
        { name: "Ramsau am Dachstein", distance: "0km", desc: "World Cup cross-country skiing village" },
        { name: "Schladming", distance: "12km", desc: "Major Styrian ski resort with World Cup downhill" },
        { name: "Filzmoos", distance: "15km", desc: "Quiet family resort with balloon festival" }
      ],
      activities: ["Cross-country skiing", "Snowshoeing", "Winter hiking", "Dachstein glacier tours"],
      touristBoard: "Ramsau am Dachstein Tourismus",
      touristBoardUrl: "https://www.ramsau.com",
      emergency: "112",
      hospital: "LKH Schladming (12km)"
    },
    webcams: [
      { name: "Dachstein 1870m", seed: "ramsau-cam1" },
      { name: "Ramsau plateau", seed: "ramsau-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Ramsau Nordic World Cup", type: "Competition", desc: "FIS Cross-Country World Cup event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 39, child: 20, senior: 31, badge: null },
      { type: "3-day", adult: 107, child: 54, senior: 86, badge: null },
      { type: "6-day", adult: 200, child: 100, senior: 160, badge: "Best value" },
      { type: "Season", adult: 900, child: 450, senior: 720, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.1,
      breakdown: { pistes: 8.0, lifts: 8.0, apresSki: 7.9, value: 9.5, beginners: 9.5 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "partial" }, { month: "Apr", status: "closed" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "loser-altaussee",
    name: "Loser Altaussee",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Styria, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.64, lng: 13.77,
    minAltitude: 800, maxAltitude: 1838,
    verticalDrop: 1038,
    pisteKm: 22, runs: 14, lifts: 7,
    gondolas: 2, chairlifts: 4, dragLifts: 1,
    longestRun: 6,
    difficultyBlue: 30, difficultyRed: 48, difficultyBlack: 22,
    snowCannons: 20, snowCannonKm: 9,
    seasonStart: "2024-12-21", seasonEnd: "2025-03-23",
    openStatus: "Open", roadStatus: "open",
    rating: 7.9, ratingLabel: "Very good", priceFrom: 37,
    seasonDates: "21 Dec 2024 - 23 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "A compact family ski area above the famous Altaussee salt lake in the Salzkammergut. Stunning lake views and relaxed atmosphere make it a favourite weekend escape for visitors from Salzburg and Graz.",
    image: "https://picsum.photos/seed/loser-altaussee/800/500",
    images: ["https://picsum.photos/seed/loser-altaussee-1/1200/700", "https://picsum.photos/seed/loser-altaussee-2/1200/700", "https://picsum.photos/seed/loser-altaussee-3/1200/700"],
    weather: { temp: -2, snowDepth: 90, condition: "Clear", forecast: [
      { day: "Today", high: 0, low: -6, condition: "clear" },
      { day: "Tomorrow", high: -1, low: -7, condition: "partly_cloudy" },
      { day: "Thu", high: -3, low: -9, condition: "snow" }
    ]},
    snowDepthBase: 40, snowDepthMid: 75, snowDepthTop: 110, snowType: "Machine-groomed",
    liftsOpen: 6, liftsTotal: 7, pistesOpen: 12, pistesTotal: 14,
    ecoRating: 3, ecoRenewable: 50, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["50% renewable electricity", "Altaussee lake water quality protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Bad Aussee - 8km bus",
    shuttle: false, shuttleDesc: "Bus from Bad Aussee station",
    parking: { capacity: 800, pricePerDay: 7, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Loser Panoramarestaurant", zone: "Summit 1838m", cuisine: "Austrian", price: "€€" },
        { name: "Loserhof", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 33, privateLessonFrom: 83,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 40,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 150, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Bad Aussee (8km)",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "The Altaussee lake is one of the most beautiful in the Salzkammergut and is visible from the upper slopes of the Loser. The village is famous for its salt mine history.",
      nearbyTowns: [
        { name: "Altaussee", distance: "3km", desc: "Famous salt lake village with historic mine" },
        { name: "Bad Aussee", distance: "8km", desc: "Salzkammergut market town" },
        { name: "Bad Ischl", distance: "30km", desc: "Former Habsburg summer residence" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Salt mine tours", "Cross-country skiing"],
      touristBoard: "Altaussee Tourismus",
      touristBoardUrl: "https://www.altaussee.at",
      emergency: "112",
      hospital: "LKH Bad Aussee (8km)"
    },
    webcams: [
      { name: "Loser summit 1838m", seed: "loser-cam1" },
      { name: "Altaussee lake view", seed: "loser-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Loser Family Winter Day", type: "Festival", desc: "Family ski carnival with prizes" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 37, child: 19, senior: 30, badge: null },
      { type: "3-day", adult: 101, child: 51, senior: 81, badge: null },
      { type: "6-day", adult: 189, child: 95, senior: 151, badge: "Best value" },
      { type: "Season", adult: 850, child: 425, senior: 680, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 7.9,
      breakdown: { pistes: 7.9, lifts: 7.8, apresSki: 7.7, value: 9.5, beginners: 9.4 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "partial" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "partial" }, { month: "Apr", status: "closed" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "ankogel",
    name: "Ankogel-Mallnitz",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Carinthia, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.02, lng: 13.18,
    minAltitude: 1190, maxAltitude: 2638,
    verticalDrop: 1448,
    pisteKm: 26, runs: 13, lifts: 6,
    gondolas: 2, chairlifts: 3, dragLifts: 1,
    longestRun: 9,
    difficultyBlue: 12, difficultyRed: 57, difficultyBlack: 31,
    snowCannons: 20, snowCannonKm: 7,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.0, ratingLabel: "Very good", priceFrom: 40,
    seasonDates: "14 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["alpin-card"],
    resortTypes: ["Alpine", "Freeride"],
    description: "One of the most pristine and uncrowded ski areas in Austria accessible via the Tauernbahn railway through the mountain tunnel. Long descents from 2638m and lack of crowds make it a hidden gem for experienced skiers.",
    image: "https://picsum.photos/seed/ankogel/800/500",
    images: ["https://picsum.photos/seed/ankogel-1/1200/700", "https://picsum.photos/seed/ankogel-2/1200/700", "https://picsum.photos/seed/ankogel-3/1200/700"],
    weather: { temp: -7, snowDepth: 165, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 130, snowDepthTop: 195, snowType: "Powder",
    liftsOpen: 6, liftsTotal: 6, pistesOpen: 12, pistesTotal: 13,
    ecoRating: 3, ecoRenewable: 42, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["42% renewable electricity", "Hohe Tauern national park buffer zone"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Klagenfurt", iata: "KLU", driveTime: "2h" },
      { airport: "Salzburg", iata: "SZG", driveTime: "2h" }
    ],
    trainStation: "Mallnitz - 2km, Tauernbahn through mountain tunnel",
    shuttle: true, shuttleDesc: "Tauernbahn trains stop at Mallnitz which is accessible only by train through the tunnel",
    parking: { capacity: 400, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Ankogel Gipfelrestaurant", zone: "2300m", cuisine: "Austrian", price: "€€" },
        { name: "Mallnitz Bergrestaurant", zone: "1600m", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 38, privateLessonFrom: 95,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: false, crecheAgeMin: 0, crecheAgeMax: 0, crecheFrom: 0,
      kidsGarden: false, kidsGardenAge: "", babysitting: false,
      lockerCount: 100, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 1, rentalBrands: ["Atomic"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Mallnitz village (2km)",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "Mallnitz is one of the few car-free villages in Austria accessible only by the historic Tauernbahn railway tunnel. The Hohe Tauern national park surrounds the village.",
      nearbyTowns: [
        { name: "Mallnitz", distance: "0km", desc: "Car-free national park village on Tauernbahn" },
        { name: "Spittal an der Drau", distance: "40km", desc: "Carinthian town with broader rail connections" }
      ],
      activities: ["Snowshoeing", "Freeride tours", "National park winter walks"],
      touristBoard: "Mallnitz Tourismus",
      touristBoardUrl: "https://www.mallnitz.at",
      emergency: "112",
      hospital: "LKH Spittal an der Drau (40km)"
    },
    webcams: [
      { name: "Ankogel 2638m", seed: "ankogel-cam1" },
      { name: "Mallnitz village 1190m", seed: "ankogel-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Ankogel Powder Weekend", type: "Festival", desc: "Freeride and powder skiing celebration" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 40, child: 20, senior: 32, badge: null },
      { type: "3-day", adult: 110, child: 55, senior: 88, badge: null },
      { type: "6-day", adult: 205, child: 103, senior: 164, badge: "Best value" },
      { type: "Season", adult: 920, child: 460, senior: 736, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.0,
      breakdown: { pistes: 8.2, lifts: 7.9, apresSki: 7.2, value: 9.3, beginners: 7.5 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "partial" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "mariazell",
    name: "Mariazeller Bürgeralpe",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Styria, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.77, lng: 15.32,
    minAltitude: 870, maxAltitude: 1267,
    verticalDrop: 397,
    pisteKm: 25, runs: 12, lifts: 7,
    gondolas: 2, chairlifts: 3, dragLifts: 2,
    longestRun: 5,
    difficultyBlue: 36, difficultyRed: 50, difficultyBlack: 14,
    snowCannons: 30, snowCannonKm: 14,
    seasonStart: "2024-12-21", seasonEnd: "2025-03-16",
    openStatus: "Open", roadStatus: "open",
    rating: 7.6, ratingLabel: "Very good", priceFrom: 35,
    seasonDates: "21 Dec 2024 - 16 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort", "Day trip"],
    description: "The Bürgeralpe above the famous pilgrimage town of Mariazell offers gentle family skiing with excellent snowmaking. Easily reached by the famous Mariazellerbahn heritage railway from St. Polten, it is an ideal introduction to skiing for beginners from Vienna.",
    image: "https://picsum.photos/seed/mariazell/800/500",
    images: ["https://picsum.photos/seed/mariazell-1/1200/700", "https://picsum.photos/seed/mariazell-2/1200/700", "https://picsum.photos/seed/mariazell-3/1200/700"],
    weather: { temp: -2, snowDepth: 80, condition: "Clear", forecast: [
      { day: "Today", high: 0, low: -6, condition: "clear" },
      { day: "Tomorrow", high: -1, low: -7, condition: "partly_cloudy" },
      { day: "Thu", high: -3, low: -9, condition: "snow" }
    ]},
    snowDepthBase: 40, snowDepthMid: 65, snowDepthTop: 90, snowType: "Machine-groomed",
    liftsOpen: 7, liftsTotal: 7, pistesOpen: 11, pistesTotal: 12,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Mariazellerbahn heritage train promotion"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Vienna", iata: "VIE", driveTime: "2h" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Mariazell - 2km, Mariazellerbahn narrow gauge from St. Polten",
    shuttle: true, shuttleDesc: "Mariazellerbahn narrow gauge railway connects St. Polten to Mariazell",
    parking: { capacity: 1000, pricePerDay: 7, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Bürgeralpe Restaurant", zone: "Summit 1267m", cuisine: "Austrian", price: "€€" },
        { name: "Mariazell Bergcafe", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 30, privateLessonFrom: 76,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 38,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 170, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 5, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Mariazell town (2km)",
      pharmacy: true, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Mariazell is the most important pilgrimage town in Austria, visited by over one million pilgrims annually. The baroque basilica dominates the town centre.",
      nearbyTowns: [
        { name: "Mariazell", distance: "0km", desc: "Austrias most important pilgrimage town with baroque basilica" },
        { name: "St. Polten", distance: "80km", desc: "Lower Austrian capital with Mariazellerbahn terminus" },
        { name: "Vienna", distance: "130km", desc: "Austrian capital" }
      ],
      activities: ["Snowshoeing", "Pilgrimage basilica visit", "Winter hiking", "Ice skating"],
      touristBoard: "Mariazell Tourismus",
      touristBoardUrl: "https://www.mariazell.at",
      emergency: "112",
      hospital: "LKH Lilienfeld (40km)"
    },
    webcams: [
      { name: "Bürgeralpe 1267m", seed: "mariazell-cam1" },
      { name: "Mariazell town", seed: "mariazell-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Mariazell Christmas Market", type: "Festival", desc: "Traditional advent market in the pilgrim town" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 35, child: 18, senior: 28, badge: null },
      { type: "3-day", adult: 96, child: 48, senior: 77, badge: null },
      { type: "6-day", adult: 179, child: 90, senior: 143, badge: "Best value" },
      { type: "Season", adult: 800, child: 400, senior: 640, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 7.6,
      breakdown: { pistes: 7.6, lifts: 7.6, apresSki: 7.8, value: 9.6, beginners: 9.7 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "partial" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "partial" }, { month: "Apr", status: "closed" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  }
];