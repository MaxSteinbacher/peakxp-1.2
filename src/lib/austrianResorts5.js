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
    gondolas: 3, chairlifts: 7, dragLifts: 2,
    longestRun: 7,
    difficultyBlue: 28, difficultyRed: 50, difficultyBlack: 22,
    snowCannons: 35, snowCannonKm: 14,
    seasonStart: "2024-11-23", seasonEnd: "2025-04-27",
    openStatus: "Open", roadStatus: "chains",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "23 Nov 2024 - 27 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "High-altitude"],
    description: "Austrias highest village resort at 2000m guaranteeing excellent snow from November through April. Small and intimate, popular with day visitors from Innsbruck seeking uncrowded slopes at genuine high altitude.",
    image: "https://picsum.photos/seed/kuehtai/800/500",
    images: ["https://picsum.photos/seed/kuehtai-1/1200/700", "https://picsum.photos/seed/kuehtai-2/1200/700", "https://picsum.photos/seed/kuehtai-3/1200/700"],
    weather: { temp: -7, snowDepth: 160, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 100, snowDepthMid: 145, snowDepthTop: 185, snowType: "Packed powder",
    liftsOpen: 11, liftsTotal: 12, pistesOpen: 16, pistesTotal: 18,
    ecoRating: 3, ecoRenewable: 44, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["44% renewable electricity", "High-altitude snowpack preservation"],
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
        { name: "Kuehtai Restaurant", zone: "Village 2000m", cuisine: "Austrian", price: "€€" },
        { name: "Dortmunder Hutte", zone: "Mid-mountain 2300m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 180, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Kuehtai is Austrias highest resort village, sitting in a high glacial basin in the Otztal Alps. The panoramic views extend to the Stubai and Ortler Alps.",
      nearbyTowns: [
        { name: "Innsbruck", distance: "30km", desc: "Tyrolean capital with cultural attractions" },
        { name: "Oetz", distance: "20km", desc: "Gateway village to the Otztal" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Cross-country skiing"],
      touristBoard: "Kuehtai Tourismus",
      touristBoardUrl: "https://www.kuehtai.info",
      emergency: "112",
      hospital: "Innsbruck University Hospital (30km)"
    },
    webcams: [
      { name: "Kuehtai village 2000m", seed: "kuehtai-cam1" },
      { name: "Hochoetz summit 2520m", seed: "kuehtai-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Kuehtai Nocturne", type: "Competition", desc: "Night slalom race under floodlights" }
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
      breakdown: { pistes: 8.5, lifts: 8.3, apresSki: 7.8, value: 9.2, beginners: 8.8 },
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
    longestRun: 8,
    difficultyBlue: 30, difficultyRed: 52, difficultyBlack: 18,
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
    snowDepthBase: 55, snowDepthMid: 100, snowDepthTop: 145, snowType: "Packed powder",
    liftsOpen: 9, liftsTotal: 10, pistesOpen: 20, pistesTotal: 22,
    ecoRating: 3, ecoRenewable: 50, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["50% renewable electricity", "Stubaital valley bus integration"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "35m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 15m" }
    ],
    trainStation: "Innsbruck Hauptbahnhof - 28km Stubai valley bus",
    shuttle: false, shuttleDesc: "Stubai valley bus from Innsbruck",
    parking: { capacity: 1200, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Kreuzjoch Restaurant", zone: "Summit 2136m", cuisine: "Austrian", price: "€€" },
        { name: "Froneben Alm", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 2, groupLessonFrom: 38, privateLessonFrom: 95,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 46,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 280, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: false,
      medicalCentre: true, medicalLocation: "Fulpmes village",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Fulpmes is a traditional village in the Stubaital with a strong crafts tradition. The valley leads up to the Stubai Glacier at its head and has excellent bus connections to Innsbruck.",
      nearbyTowns: [
        { name: "Fulpmes", distance: "2km", desc: "Traditional Stubaital village" },
        { name: "Innsbruck", distance: "28km", desc: "Tyrolean capital" },
        { name: "Neustift", distance: "8km", desc: "Village at the foot of the Stubai Glacier" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating"],
      touristBoard: "Stubaital Tourismus",
      touristBoardUrl: "https://www.stubai.at",
      emergency: "112",
      hospital: "Innsbruck University Hospital (28km)"
    },
    webcams: [
      { name: "Kreuzjoch 2136m", seed: "schlick-cam1" },
      { name: "Fulpmes base", seed: "schlick-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Schlick Family Race", type: "Competition", desc: "Annual family giant slalom race" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 43, child: 22, senior: 34, badge: null },
      { type: "3-day", adult: 118, child: 59, senior: 94, badge: null },
      { type: "6-day", adult: 220, child: 110, senior: 176, badge: "Best value" },
      { type: "Season", adult: 990, child: 495, senior: 792, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.2,
      breakdown: { pistes: 8.2, lifts: 8.1, apresSki: 8.0, value: 9.4, beginners: 9.3 },
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
    longestRun: 6,
    difficultyBlue: 25, difficultyRed: 50, difficultyBlack: 25,
    snowCannons: 25, snowCannonKm: 12,
    seasonStart: "2024-12-21", seasonEnd: "2025-03-16",
    openStatus: "Open", roadStatus: "chains",
    rating: 7.8, ratingLabel: "Very good", priceFrom: 38,
    seasonDates: "21 Dec 2024 - 16 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "The main ski resort of Lower Austria and a favourite day trip from Vienna. Compact layout and efficient lifts mean excellent time on snow for day trippers and the area is accessible for less experienced skiers.",
    image: "https://picsum.photos/seed/hochkar/800/500",
    images: ["https://picsum.photos/seed/hochkar-1/1200/700", "https://picsum.photos/seed/hochkar-2/1200/700", "https://picsum.photos/seed/hochkar-3/1200/700"],
    weather: { temp: -3, snowDepth: 100, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 90, snowDepthTop: 120, snowType: "Machine-groomed",
    liftsOpen: 6, liftsTotal: 6, pistesOpen: 11, pistesTotal: 12,
    ecoRating: 3, ecoRenewable: 48, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["48% renewable electricity", "Otscher nature park stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Vienna", iata: "VIE", driveTime: "2h" },
      { airport: "Linz", iata: "LNZ", driveTime: "1h 30m" }
    ],
    trainStation: "Gostling - 8km bus",
    shuttle: false, shuttleDesc: "Bus from Gostling",
    parking: { capacity: 800, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Hochkar Restaurant", zone: "Summit 1808m", cuisine: "Austrian", price: "€€" },
        { name: "Berghutte Hochkar", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 35, privateLessonFrom: 90,
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
      description: "Hochkar sits above the Otscher massif in Lower Austria, a short drive from the Erlauf valley. Vienna day trippers make up a large share of visitors at weekends.",
      nearbyTowns: [
        { name: "Gostling an der Ybbs", distance: "8km", desc: "Small Lower Austrian market village" },
        { name: "Gaming", distance: "20km", desc: "Monastery town in the Otscher region" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Tobogganing"],
      touristBoard: "Hochkar Tourismus",
      touristBoardUrl: "https://www.hochkar.at",
      emergency: "112",
      hospital: "Scheibbs hospital (25km)"
    },
    webcams: [
      { name: "Hochkar summit 1808m", seed: "hochkar-cam1" },
      { name: "Hochkar base 1350m", seed: "hochkar-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Hochkar Sprungschanzen", type: "Competition", desc: "Lower Austria ski jumping event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 38, child: 19, senior: 30, badge: null },
      { type: "3-day", adult: 104, child: 52, senior: 83, badge: null },
      { type: "6-day", adult: 195, child: 98, senior: 156, badge: "Best value" },
      { type: "Season", adult: 870, child: 435, senior: 696, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 7.8,
      breakdown: { pistes: 7.8, lifts: 7.9, apresSki: 7.5, value: 9.5, beginners: 9.4 },
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
    gondolas: 2, chairlifts: 4, dragLifts: 1,
    longestRun: 7,
    difficultyBlue: 28, difficultyRed: 52, difficultyBlack: 20,
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
    weather: { temp: -4, snowDepth: 120, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 95, snowDepthTop: 135, snowType: "Machine-groomed",
    liftsOpen: 7, liftsTotal: 7, pistesOpen: 13, pistesTotal: 15,
    ecoRating: 3, ecoRenewable: 46, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["46% renewable electricity", "Pyhrn-Priel nature park awareness"],
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
        { name: "Wurzeralm Restaurant", zone: "Summit 1870m", cuisine: "Austrian", price: "€€" },
        { name: "Mittelstation Alm", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 36, privateLessonFrom: 92,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 200, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Spital am Pyhrn (5km)",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "The Wurzeralm rises above Spital am Pyhrn in the Totes Gebirge foothills. The Pyhrn-Priel nature park surrounds the ski area with pristine limestone scenery.",
      nearbyTowns: [
        { name: "Spital am Pyhrn", distance: "5km", desc: "Small Upper Austrian town with baroque church" },
        { name: "Windischgarsten", distance: "10km", desc: "Traditional spa and market village" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Cross-country skiing"],
      touristBoard: "Pyhrn-Priel Tourismus",
      touristBoardUrl: "https://www.pyhrn-priel.net",
      emergency: "112",
      hospital: "Kirchdorf hospital (20km)"
    },
    webcams: [
      { name: "Wurzeralm 1870m", seed: "wurzeralm-cam1" },
      { name: "Spital am Pyhrn base", seed: "wurzeralm-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Wurzeralm Snowboard Cup", type: "Competition", desc: "Regional snowboard competition" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 40, child: 20, senior: 32, badge: null },
      { type: "3-day", adult: 110, child: 55, senior: 88, badge: null },
      { type: "6-day", adult: 206, child: 103, senior: 165, badge: "Best value" },
      { type: "Season", adult: 920, child: 460, senior: 736, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 7.9,
      breakdown: { pistes: 8.0, lifts: 7.8, apresSki: 7.6, value: 9.4, beginners: 9.3 },
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
    longestRun: 9,
    difficultyBlue: 32, difficultyRed: 48, difficultyBlack: 20,
    snowCannons: 35, snowCannonKm: 14,
    seasonStart: "2024-12-14", seasonEnd: "2025-03-30",
    openStatus: "Open", roadStatus: "open",
    rating: 8.0, ratingLabel: "Very good", priceFrom: 40,
    seasonDates: "14 Dec 2024 - 30 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Gentle slopes with a charming lakeside setting in the Styrian Salzkammergut. Also famous for its cross-country skiing network and the Tauplitzalm plateau offers easy scenic touring terrain.",
    image: "https://picsum.photos/seed/tauplitz/800/500",
    images: ["https://picsum.photos/seed/tauplitz-1/1200/700", "https://picsum.photos/seed/tauplitz-2/1200/700", "https://picsum.photos/seed/tauplitz-3/1200/700"],
    weather: { temp: -3, snowDepth: 115, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -1, low: -7, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -2, low: -8, condition: "clear" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 50, snowDepthMid: 90, snowDepthTop: 130, snowType: "Packed powder",
    liftsOpen: 8, liftsTotal: 9, pistesOpen: 18, pistesTotal: 20,
    ecoRating: 3, ecoRenewable: 50, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["50% renewable electricity", "Salzkammergut lake protection"],
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
        { name: "Tauplitzalm Restaurant", zone: "1650m plateau", cuisine: "Austrian", price: "€€" },
        { name: "Stoderzinken Hutte", zone: "Summit area", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 36, privateLessonFrom: 92,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 220, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Bad Mitterndorf (6km)",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "The Tauplitzalm is a wide alpine plateau in the Styrian Salzkammergut with frozen lakes and forest scenery. Bad Mitterndorf is a traditional spa town in the valley.",
      nearbyTowns: [
        { name: "Bad Mitterndorf", distance: "6km", desc: "Traditional Styrian spa town" },
        { name: "Bad Aussee", distance: "15km", desc: "Salzkammergut market town" },
        { name: "Schladming", distance: "30km", desc: "Major Styrian ski resort town" }
      ],
      activities: ["Cross-country skiing", "Snowshoeing", "Winter hiking", "Ice skating"],
      touristBoard: "Ausseerland-Salzkammergut Tourismus",
      touristBoardUrl: "https://www.ausseerland.at",
      emergency: "112",
      hospital: "Schladming hospital (30km)"
    },
    webcams: [
      { name: "Tauplitz summit 1868m", seed: "tauplitz-cam1" },
      { name: "Tauplitzalm plateau", seed: "tauplitz-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Tauplitz Cross-Country Classic", type: "Competition", desc: "Traditional cross-country race on the plateau" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 40, child: 20, senior: 32, badge: null },
      { type: "3-day", adult: 110, child: 55, senior: 88, badge: null },
      { type: "6-day", adult: 206, child: 103, senior: 165, badge: "Best value" },
      { type: "Season", adult: 920, child: 460, senior: 736, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.0,
      breakdown: { pistes: 8.0, lifts: 7.9, apresSki: 8.0, value: 9.4, beginners: 9.4 },
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
    gondolas: 4, chairlifts: 8, dragLifts: 2,
    longestRun: 9,
    difficultyBlue: 24, difficultyRed: 50, difficultyBlack: 26,
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
    weather: { temp: -4, snowDepth: 140, condition: "Snowy", forecast: [
      { day: "Today", high: -2, low: -8, condition: "snow" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "clear" }
    ]},
    snowDepthBase: 60, snowDepthMid: 110, snowDepthTop: 155, snowType: "Powder",
    liftsOpen: 13, liftsTotal: 14, pistesOpen: 22, pistesTotal: 24,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Freeride zone management program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h" },
      { airport: "Munich", iata: "MUC", driveTime: "1h 45m" }
    ],
    trainStation: "Fieberbrunn - 1km, trains on the Salzburg-Innsbruck line",
    shuttle: true, shuttleDesc: "Trains on the Salzburg-Innsbruck line stop at Fieberbrunn",
    parking: { capacity: 1500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Lärchfilzkogel Restaurant", zone: "Summit 2020m", cuisine: "Austrian", price: "€€" },
        { name: "Streuböden Hutte", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 3, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 300, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Head", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Fieberbrunn village",
      pharmacy: true, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Fieberbrunn is an authentic Tyrolean farming village in the Pillersee valley between Kitzbuehel and St. Johann. The Wildseeloder freeride face is world-famous.",
      nearbyTowns: [
        { name: "Fieberbrunn", distance: "0km", desc: "Traditional Tyrolean village with train station" },
        { name: "Kitzbuehel", distance: "20km", desc: "World-famous ski resort" },
        { name: "St. Johann in Tirol", distance: "10km", desc: "Market town in the Kitzbueheler Alps" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Freeride tours", "Winter hiking"],
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
      { date: "Jan 2025", name: "Freeride World Tour Fieberbrunn", type: "Competition", desc: "Elite freeride competition on the Wildseeloder face" }
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
      breakdown: { pistes: 8.3, lifts: 8.2, apresSki: 8.4, value: 9.0, beginners: 8.6 },
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
    longestRun: 7,
    difficultyBlue: 44, difficultyRed: 44, difficultyBlack: 12,
    snowCannons: 20, snowCannonKm: 9,
    seasonStart: "2024-12-07", seasonEnd: "2025-03-30",
    openStatus: "Open", roadStatus: "open",
    rating: 8.1, ratingLabel: "Excellent", priceFrom: 39,
    seasonDates: "7 Dec 2024 - 30 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort", "Nordic"],
    description: "Internationally renowned for 200km of cross-country ski trails under the dramatic Dachstein glacier hosting regular World Cup events. The alpine ski area offers gentle family terrain with the glacier as a stunning backdrop.",
    image: "https://picsum.photos/seed/ramsau-dachstein/800/500",
    images: ["https://picsum.photos/seed/ramsau-dachstein-1/1200/700", "https://picsum.photos/seed/ramsau-dachstein-2/1200/700", "https://picsum.photos/seed/ramsau-dachstein-3/1200/700"],
    weather: { temp: -3, snowDepth: 120, condition: "Sunny", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "clear" },
      { day: "Thu", high: -4, low: -10, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 55, snowDepthMid: 90, snowDepthTop: 130, snowType: "Packed powder",
    liftsOpen: 9, liftsTotal: 10, pistesOpen: 14, pistesTotal: 16,
    ecoRating: 4, ecoRenewable: 55, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["55% renewable electricity", "Green Globe certified ski area", "UNESCO Hallstatt-Dachstein protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Schladming - 12km bus",
    shuttle: false, shuttleDesc: "Bus from Schladming",
    parking: { capacity: 1200, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Dachstein Panorama Restaurant", zone: "1870m", cuisine: "Austrian", price: "€€" },
        { name: "Alpengasthof Ramsau", zone: "Village", cuisine: "Styrian", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 36, privateLessonFrom: 90,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 220, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol", "Fischer"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Ramsau village",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Ramsau am Dachstein is a high alpine plateau village in the UNESCO Hallstatt-Dachstein World Heritage region. The cross-country network is the most prestigious in Austria.",
      nearbyTowns: [
        { name: "Ramsau am Dachstein", distance: "0km", desc: "Famous cross-country village on the Dachstein plateau" },
        { name: "Schladming", distance: "12km", desc: "Major alpine ski resort town" },
        { name: "Hallstatt", distance: "25km", desc: "UNESCO World Heritage salt mining village" }
      ],
      activities: ["Cross-country skiing", "Snowshoeing", "Winter hiking", "Glacier tours"],
      touristBoard: "Ramsau am Dachstein Tourismus",
      touristBoardUrl: "https://www.ramsau.com",
      emergency: "112",
      hospital: "Schladming hospital (12km)"
    },
    webcams: [
      { name: "Dachstein plateau 1870m", seed: "ramsau-cam1" },
      { name: "Ramsau village", seed: "ramsau-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Ramsau Nordic World Cup", type: "Competition", desc: "FIS cross-country World Cup sprint races" }
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
      breakdown: { pistes: 8.0, lifts: 8.0, apresSki: 7.9, value: 9.3, beginners: 9.4 },
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
    longestRun: 7,
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
    weather: { temp: -3, snowDepth: 110, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 50, snowDepthMid: 85, snowDepthTop: 120, snowType: "Packed powder",
    liftsOpen: 6, liftsTotal: 7, pistesOpen: 12, pistesTotal: 14,
    ecoRating: 3, ecoRenewable: 50, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["50% renewable electricity", "Altaussee lake watershed protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 15m" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Bad Aussee - 8km bus",
    shuttle: false, shuttleDesc: "Bus from Bad Aussee station",
    parking: { capacity: 700, pricePerDay: 7, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Loser Panorama Restaurant", zone: "1838m", cuisine: "Austrian", price: "€€" },
        { name: "Seewirt Altaussee", zone: "Lake level", cuisine: "Styrian", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 34, privateLessonFrom: 88,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 42,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 160, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 5, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Bad Aussee (8km)",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Altaussee is a historic salt-mining village on the shores of the emerald-green Altaussee lake in the Styrian Salzkammergut. The area gained notoriety as a Nazi art repository during World War II.",
      nearbyTowns: [
        { name: "Altaussee", distance: "3km", desc: "Historic salt-mining village on the lake" },
        { name: "Bad Aussee", distance: "8km", desc: "Salzkammergut spa town with train station" },
        { name: "Grundlsee", distance: "10km", desc: "Scenic lake village" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating", "Salt mine tours"],
      touristBoard: "Ausseerland-Salzkammergut Tourismus",
      touristBoardUrl: "https://www.ausseerland.at",
      emergency: "112",
      hospital: "Bad Aussee hospital (8km)"
    },
    webcams: [
      { name: "Loser summit 1838m", seed: "loser-cam1" },
      { name: "Altaussee lake view", seed: "loser-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Loser Family Ski Weekend", type: "Festival", desc: "Family fun races and activities" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 37, child: 19, senior: 30, badge: null },
      { type: "3-day", adult: 102, child: 51, senior: 82, badge: null },
      { type: "6-day", adult: 190, child: 95, senior: 152, badge: "Best value" },
      { type: "Season", adult: 855, child: 428, senior: 684, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 7.9,
      breakdown: { pistes: 7.9, lifts: 7.8, apresSki: 7.7, value: 9.5, beginners: 9.5 },
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
    difficultyBlue: 15, difficultyRed: 54, difficultyBlack: 31,
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
    weather: { temp: -8, snowDepth: 180, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 80, snowDepthMid: 150, snowDepthTop: 210, snowType: "Powder",
    liftsOpen: 5, liftsTotal: 6, pistesOpen: 11, pistesTotal: 13,
    ecoRating: 3, ecoRenewable: 42, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["42% renewable electricity", "Hohe Tauern national park stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Klagenfurt", iata: "KLU", driveTime: "1h 30m" },
      { airport: "Salzburg", iata: "SZG", driveTime: "2h" }
    ],
    trainStation: "Mallnitz - 2km, accessible only by train through the Tauern tunnel",
    shuttle: true, shuttleDesc: "Tauernbahn trains stop at Mallnitz which is accessible only by train through the tunnel",
    parking: { capacity: 400, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Ankogel Gipfelrestaurant", zone: "2636m", cuisine: "Austrian", price: "€€€" },
        { name: "Mallnitz Bergrestaurant", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
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
      description: "Mallnitz is a unique car-free-accessible village in the Hohe Tauern national park, reached only by the Tauernbahn railway through the mountain. The setting is extraordinarily pristine.",
      nearbyTowns: [
        { name: "Mallnitz", distance: "0km", desc: "Car-free-accessible village in the Hohe Tauern park" },
        { name: "Obervellach", distance: "10km", desc: "Mölltal valley village" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Freeride tours", "Wildlife watching"],
      touristBoard: "Mallnitz Tourismus",
      touristBoardUrl: "https://www.mallnitz.at",
      emergency: "112",
      hospital: "LKH Spittal an der Drau (45km)"
    },
    webcams: [
      { name: "Ankogel 2638m", seed: "ankogel-cam1" },
      { name: "Mallnitz valley", seed: "ankogel-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Ankogel Hidden Gem Descent", type: "Festival", desc: "Freeride celebration at the hidden gem resort" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 40, child: 20, senior: 32, badge: null },
      { type: "3-day", adult: 110, child: 55, senior: 88, badge: null },
      { type: "6-day", adult: 206, child: 103, senior: 165, badge: "Best value" },
      { type: "Season", adult: 920, child: 460, senior: 736, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.0,
      breakdown: { pistes: 8.2, lifts: 7.9, apresSki: 7.2, value: 9.4, beginners: 7.0 },
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
    id: "almenwelt-lofer",
    name: "Almenwelt Lofer",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.60, lng: 12.69,
    minAltitude: 630, maxAltitude: 1745,
    verticalDrop: 1115,
    pisteKm: 42, runs: 26, lifts: 14,
    gondolas: 2, chairlifts: 8, dragLifts: 4,
    longestRun: 8,
    difficultyBlue: 40, difficultyRed: 44, difficultyBlack: 16,
    snowCannons: 80, snowCannonKm: 30,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.5, ratingLabel: "Excellent", priceFrom: 43,
    seasonDates: "14 Dec 2024 – 6 Apr 2025",
    seasonPasses: ["salzburg-super-ski"],
    resortTypes: ["Alpine", "Family resort", "Nordic"],
    description: "Almenwelt Lofer — 'Österreichs schönste Skialm' (Austria's most beautiful ski alm) — is an intimate, charming family ski resort perched above the picturesque market town of Lofer in the Salzburg Saalachtal. With 42km of immaculately groomed pistes across the forested Loferer Alm plateaus, spectacular panoramic views towards the Loferer Steinberge massif, and the legendary Lofi Funline kids zone, it is one of the most characterful and scenic small ski areas in the entire Alps. The 8-person Almbahn I gondola rises directly from the village centre, making it truly ski-in ski-out from town. Outstanding ski school with Bobo's Kindergarten, excellent cross-country trails, snowshoeing and a genuine Tyrolean-Salzburg alpine atmosphere.",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/0015f3229_almenwelt-lofer_51866698262_l.jpg",
    images: [
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/0015f3229_almenwelt-lofer_51866698262_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/4929ff3c2_snowboarden-im-salzburger-saalachtal_33425066400_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/a73206c94_almenwelt-lofer-im-salzburger-saalachtal_33653561022_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/6d7b29e25_grubhrndl-in-der-almenwelt-lofer-im-salzburger-saalachtal_49053353051_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f2d8726c6_kallbrunnalm-im-naturpark-weibach-im-salzburger-saalachtal_49053637537_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/cbf5d8ecc_langlaufen-im-salzburger-saalachtal_49052823488_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f38ad5126_langlaufen-im-salzburger-saalachtal_49053338691_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/cddd9667c_schneeschuhwandern-im-salzburger-saalachtal_33425042700_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/d2d075375_skifahren-familie-in-der-almenwelt-lofer-im-salzburger-saalachtal_32966847764_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/baf4154dd_skifahren-familie-in-der-almenwelt-lofer-im-salzburger-saalachtal_33680523211_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/46d8fafcc_skifahren-im-natursportheutal-im-salzburger-saalachta_33809785915_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/ec8b43af7_skifahren-in-der-almenwelt-lofer-im-salzburger-saalachtal_32966843014_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/266a9df8a_skifahren-in-der-almenwelt-lofer-im-salzburger-saalachtal_33680530881_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/53dcd42f9_skifahren-kinder-auf-der-lofi-funline-in-der-almenwelt-lofer_51866698692_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/d013810b9_skifahren-kinder-auf-der-lofi-funline-in-der-almenwelt-lofer_51867665956_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/b4bb3658e_skifahren-kinder-auf-der-lofi-funline-in-der-almenwelt-lofer_51867743423_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/980b5e823_skifahren-wiedereinsteiger-mit-skilehrer-in-der-almenwelt-lofer_51867666226_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/02491c974_skifahren-wiedereinsteiger-mit-skilehrer-in-der-almenwelt-lofer_51867666541_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/a1a5fbfb1_skikurs-almenwelt-lofer-im-salzburger-saalachtal_33653554872_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/fbac33fa9_skikurs-in-der-almenwelt-lofer-im-salzburger-saalachtal_33653558672_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/d226e65db_skikurs-in-der-almenwelt-lofer-im-salzburger-saalachtal_33680498001_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/d999f0f11_skikurs-in-der-almenwelt-lofer-im-salzburger-saalachtal_33769320126_l.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/c579395ee_skitour-im-natursportheutal-im-salzburger-saalachtal_32996951743_l.jpg",
    ],
    weather: { temp: -4, snowDepth: 130, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 110, snowDepthTop: 155, snowType: "Packed powder",
    liftsOpen: 13, liftsTotal: 14, pistesOpen: 23, pistesTotal: 26,
    ecoRating: 4, ecoRenewable: 62, ecoCertifications: ["ISO 14001", "Naturpark Weissbach"],
    ecoInitiatives: [
      "Located within the Naturpark Weissbach — active conservation partnership",
      "62% renewable electricity",
      "Low-impact piste design preserving traditional alm farming landscape",
      "Wildlife protection areas in the Loferer Steinberge",
    ],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "45m" },
      { airport: "Munich", iata: "MUC", driveTime: "1h 45m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
    ],
    trainStation: "Lofer — 0.5km (Salzburg–Kufstein regional line via Saalfelden)",
    shuttle: true, shuttleDesc: "Free ski bus within Lofer. Regional bus connections to Salzburg and Kufstein.",
    parking: { capacity: 1500, pricePerDay: 8, includedInPass: false },
    familyHighlights: [
      "Lofi Funline — dedicated kids fun zone with obstacles, tunnels and jumps",
      "Bobo's Kinder-Club ski school from age 3 — Skischule Sturmlofer & Skischule Herbst",
      "8-person Almbahn I gondola from the village centre — no drive to a separate lift base",
      "Cross-country ski trails directly accessible from town (Salzburg Saalachtal network)",
      "Snowshoe routes through the protected Naturpark Weissbach landscape",
      "Breathtaking Loferer Steinberge panorama — some of the most scenic skiing in Salzburg",
      "Adults back-on-skis programme — Wiedereinsteigerwochen every January",
      "Ski touring on the Loferer Alm (night touring available)",
    ],
    specialTerrain: {
      funparks: 1,
      funparkLocations: ["Lofi Funline — Schönblick"],
      tobogganRuns: 1,
      tobogganRunNames: ["Almhütten Rodelbahn — lit weekly"],
      tobogganRunsLit: true,
      nightSkiing: "Weekly night skiing available",
      skiTours: "Loferer Alm ski touring — multiple marked routes",
    },
    facilities: {
      restaurants: [
        { name: "Schönblick Alm", zone: "Summit — 1745m", cuisine: "Austrian", price: "€€" },
        { name: "Kechtalm", zone: "Mid-mountain — 1350m", cuisine: "Alpine", price: "€€" },
        { name: "Soderkaser", zone: "Mid-mountain — 1300m", cuisine: "Austrian", price: "€" },
        { name: "Loderbichl Alm", zone: "Lower station — 1000m", cuisine: "Austrian", price: "€" },
      ],
      skiSchools: 2, groupLessonFrom: 36, privateLessonFrom: 90,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "3–14", babysitting: false,
      lockerCount: 350, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Lofer village (0.5km)",
      pharmacy: true, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Lofer is a charming, well-preserved market town in the Salzburg Saalachtal, flanked by the dramatic limestone Loferer Steinberge. The Naturpark Weissbach directly adjoins the ski area, offering pristine wilderness snowshoeing and touring. The market town centre with traditional inns, cafés and the famous Almenwelt direct gondola access makes Lofer one of the most enjoyable ski villages in the Salzburg Alps.",
      nearbyTowns: [
        { name: "Lofer", distance: "0km", desc: "Charming Salzburg market town with direct gondola access to the ski area" },
        { name: "Saalfelden", distance: "20km", desc: "Salzburg Saalachtal regional centre with cross-country skiing" },
        { name: "St. Johann in Tirol", distance: "25km", desc: "Tyrolean market town with Skicircus connection" },
        { name: "Salzburg", distance: "60km", desc: "Mozart's city — major cultural and transport hub" },
      ],
      activities: [
        "Cross-country skiing (Salzburg Saalachtal network — 50+ km)",
        "Snowshoeing (Naturpark Weissbach)",
        "Ski touring (Loferer Alm)",
        "Toboggan run",
        "Winter hiking",
        "Ice skating",
        "Spa & wellness",
        "Sleigh rides",
      ],
      touristBoard: "Tourismusverband Lofer",
      touristBoardUrl: "https://www.skialm-lofer.com",
      emergency: "112",
      hospital: "Zell am See hospital (35km)"
    },
    webcams: [
      { name: "Schönblick — 1745m", seed: "lofer-cam1" },
      { name: "Kechtalm — 1350m", seed: "lofer-cam2" },
      { name: "Lofer village", seed: "lofer-cam3" },
    ],
    events: [
      { date: "Every January", name: "Wiedereinsteigerwochen", type: "Family", desc: "Back-on-skis weeks — special programme for adults returning to skiing after a long break" },
      { date: "Feb 2025", name: "Lofer Ski Races", type: "Competition", desc: "Annual ski race series on the Schönblick slope" },
      { date: "Mar 2025", name: "Spring Skiing Festival", type: "Festival", desc: "End-of-season celebrations with live music on the Kechtalm" },
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 43, child: 22, senior: 35, badge: null },
      { type: "3-day", adult: 118, child: 59, senior: 95, badge: null },
      { type: "6-day", adult: 220, child: 110, senior: 176, badge: "Best value" },
      { type: "Season", adult: 990, child: 495, senior: 792, badge: null }
    ],
    contact: {
      address: "Lofer 310, A-5090 Lofer",
      phone: "+43 6588 7222",
      email: "office@skialm-lofer.com",
      website: "www.skialm-lofer.com",
    },
    instructors: [],
    reviews: {
      overall: 8.5,
      breakdown: { pistes: 8.6, lifts: 8.4, apresSki: 8.3, value: 9.2, beginners: 9.4 },
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
    id: "obertauern",
    name: "Obertauern",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.25, lng: 13.56,
    minAltitude: 1630, maxAltitude: 2313,
    verticalDrop: 683,
    pisteKm: 100, runs: 26, lifts: 26,
    gondolas: 5, chairlifts: 14, dragLifts: 7,
    longestRun: 8,
    difficultyBlue: 61, difficultyRed: 35, difficultyBlack: 4,
    snowCannons: 0, snowCannonKm: 0,
    seasonStart: "2025-11-22", seasonEnd: "2026-05-03",
    openStatus: "Open", roadStatus: "clear",
    rating: 9.2, ratingLabel: "Exceptional", priceFrom: 56,
    seasonDates: "22 Nov 2025 – 3 May 2026",
    seasonPasses: ["salzburg-super-ski-card", "lungo"],
    resortTypes: ["Alpine", "Après-ski", "Freeride", "Family resort"],
    description: "Austria's snowiest ski resort, perched at 1,740m in the Radstädter Tauern range just 90km south of Salzburg. Obertauern receives an average maximum snow depth of 264cm — the highest of any resort in Austria — with natural snowfall from November through May. The uniquely bowl-shaped mountain layout means slopes face every direction, guaranteeing sun-chasing all day long. 26 lifts form a seamless ski circus encircling the village, enabling the legendary Tauernrunde circuit in both clockwise and counter-clockwise directions. True ski-in ski-out from all accommodations, no car needed. Famous for its vibrant après-ski scene, family-friendly Bobby Land adventure area, and the Gamsleiten 2 — one of Europe's steepest black runs. In March 1965, The Beatles filmed 'Help!' here, and three monuments now commemorate the visit.",
    logo: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/5cb582527_OBERTAUERN_RGB-ROT_RZ_LOGO.png",
    logoBackground: "white",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/7ad8fd48b_Skifahren_Winter_24_25MirjaGeh_01.jpg",
    images: [
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/7ad8fd48b_Skifahren_Winter_24_25MirjaGeh_01.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/cd98df45c_Skifahren_Winter_24_25MirjaGeh_02.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/451e66563_Skifahren_Winter_24_25MirjaGeh_08.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/d6ee6393f_Skifahren_Winter_24_25MirjaGeh_15.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/7d11e749c_Familie_Skifahren_Winter_24_25MirjaGeh_03.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/ac02a4958_Familie_Skifahren_Winter_24_25MirjaGeh_05.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/ceecc8fb3_Familie_Skifahren_Winter_24_25MirjaGeh_07.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/a5013d87f_Familie_Skifahren_Winter_24_25MirjaGeh_12.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/9c391399f_Familie_Skifahren_Winter_24_25MirjaGeh_15.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/79790e16e_Kids_Winter_24_25MirjaGeh_02.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/75c85b476_Kids_Winter_24_25MirjaGeh_04.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/01a913056_Kulinarik_Winter_24_25MirjaGeh_01.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/a84eecb0b_Kulinarik_Winter_24_25MirjaGeh_02.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/950a6956e_Kulinarik_Winter_24_25MirjaGeh_06.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/20c510b7d_Liegestuhl_Winter_24_25MirjaGeh_02.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/c8a75b689_Liegestuhl_Winter_24_25MirjaGeh_05.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/101eaa6e9_Liegestuhl_Winter_24_25MirjaGeh_08.jpg", credits: "© Mirja Geh / Obertauern" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/95783a47c_Liegestuhl_Winter_24_25MirjaGeh_10.jpg", credits: "© Mirja Geh / Obertauern" },
    ],
    weather: { temp: -7, snowDepth: 200, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 130, snowDepthMid: 190, snowDepthTop: 264, snowType: "Natural powder",
    liftsOpen: 24, liftsTotal: 26, pistesOpen: 24, pistesTotal: 26,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: [],
    ecoInitiatives: [
      "Free ski bus: Untertauern–Tweng corridor + Mauterndorf–Radstadt",
      "Guest Mobility Ticket: unlimited public transport across Salzburg province",
      "Electronic ski passes — digital QR-code system",
      "High-altitude natural snowfall reduces artificial snowmaking dependency",
    ],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 15m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" },
    ],
    trainStation: "Radstadt — 20km (ski bus connection via Untertauern)",
    shuttle: true, shuttleDesc: "Free ski bus for guests with valid ski ticket: Untertauern–Tweng. Guest Mobility Ticket covers all Salzburg public transport from arrival.",
    parking: { capacity: 2000, pricePerDay: 12, includedInPass: false },
    familyHighlights: [
      "Bobby Land adventure area — Bobby's Monsterpark, Wellenbahn, Geisterbahn tunnel",
      "Kindertauernrunde 'Bobby-Runde' with time measurements and ghost train",
      "My Track — children's and teen circuit with challenges",
      "Children under 5 ski free with parents all season",
      "7 ski & snowboard schools for beginners to advanced",
      "Bibo Bär Familienskipark — 3 pistes of different difficulty",
      "BobbyTV — educational kids TV channel via resort Panoramakanal",
      "Night skiing Mon + Thu — Edelweissbahn piste (1.5km, free with 1.5-day pass)",
    ],
    specialTerrain: {
      funparks: 2,
      funparkLocations: ["Bobby Land (Schaidbergbahn)", "Bibo Bär Familienskipark"],
      tobogganRuns: 1,
      tobogganRunNames: ["Gnadenalm Rodelbahn (1.5km) — night sledging available"],
      tobogganRunsLit: true,
      nightSkiing: "Mon & Thu — Edelweissbahn piste 1.5km (included with 1.5-day+ pass)",
      freerideZones: "Tiefschnee-Runs all expositions — North, South, East, West faces. LVS checkpoints at Hochalmbahn & Kringsalmbahn.",
      super7: "Super 7 Round — Seekareckbahn, Panoramabahn, Hundskogelbahn, Plattenkarbahn, Schaidbergbahn, Gamsleitenbahn 2, Zehnerkarbahn",
      earlyBird: "Wednesdays from 8:30 — Gamsleiten 1, Achenrainbahn, Zehnerkarbahn open early",
    },
    facilities: {
      restaurants: [
        { name: "Edelweissalm", zone: "On-piste — Edelweissbahn", cuisine: "Austrian / Après-ski", price: "€€" },
        { name: "Achenrainhütte", zone: "Gamsleiten — oldest ski hut in Austria", cuisine: "Alpine", price: "€€" },
        { name: "Kringsalm", zone: "Mid-mountain — West side", cuisine: "Austrian", price: "€€" },
        { name: "Seekareck Bergrestaurant", zone: "Seekareckbahn — summit", cuisine: "Alpine", price: "€€" },
        { name: "Panorama Restaurant", zone: "Panoramabahn", cuisine: "Austrian", price: "€€" },
        { name: "Restaurant Hundskogel", zone: "Hundskogelbahn — 360° viewpoint", cuisine: "Alpine", price: "€€" },
      ],
      skiSchools: 8, groupLessonFrom: 45, privateLessonFrom: 140,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 12, crecheFrom: 55,
      kidsGarden: true, kidsGardenAge: "3–14", babysitting: false,
      lockerCount: 600, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 8, rentalBrands: ["Atomic", "Head", "Rossignol", "Salomon", "Fischer"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Obertauern village",
      pharmacy: false, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Obertauern sits in a natural bowl at 1,740m in the Radstädter Tauern, flanked by Untertauern (1,009m) to the north and Tweng (1,233m) to the south. The bowl shape means slopes in all four aspects — sun-chasing is possible all day. Renowned for the highest snowfall of any Austrian resort, authentic après-ski, and predominantly family-owned hotels. Home of the Beatles' 1965 film 'Help!' with three permanent monuments. The new Sportzentrum (2025) adds paddle tennis, squash, golf simulator, and kids' indoor play.",
      nearbyTowns: [
        { name: "Untertauern", distance: "12km north", desc: "Valley village, 1,009m — ski bus connection" },
        { name: "Tweng", distance: "8km south", desc: "Salzburger Lungau village, 1,233m — ski bus to Mauterndorf" },
        { name: "Radstadt", distance: "20km", desc: "Historic market town, Salzach valley, train station" },
        { name: "Mauterndorf", distance: "15km", desc: "Lungau village — Grosseck-Speiereck linked ski area" },
        { name: "Salzburg", distance: "90km", desc: "Mozart's city — international airport, cultural capital" },
      ],
      activities: [
        "Cross-country skiing — Hundsfeldloipe 6km, Weltcuploipe 6km, Gnadenalmloipe 20km, Twenger Au 23km, Taurach 12km",
        "Night sledging — Gnadenalm (1.5km, with Rodeltaxi snowmobile uplift)",
        "Snowkiting — Snowkite-Schule Hang on",
        "Snowbiking — Snowbikeschule Koch",
        "Airboarding — high-speed air-cushion body boarding",
        "Laser Biathlon — Gnadenalm range (no experience needed)",
        "Horse-drawn sleigh rides — Landhotel Postgut Tweng & Gnadenalm",
        "Ski touring — on request through ski schools",
        "Freeride courses — LVS, avalanche safety, off-piste technique",
        "SAAC avalanche camps — free via TVB Obertauern",
        "Sportzentrum 2025 — paddle tennis, squash, golf simulator, indoor climbing",
        "Beatles monuments — three sites in the village",
      ],
      touristBoard: "TVB Obertauern",
      touristBoardUrl: "https://www.obertauern.com",
      emergency: "112",
      hospital: "Landeskrankenhaus Schwarzach (45km)"
    },
    webcams: [
      { name: "Seekareck — 2313m", seed: "obertauern-cam1" },
      { name: "Hundskogel — 2260m", seed: "obertauern-cam2" },
      { name: "Schaidberg — mid-mountain", seed: "obertauern-cam3" },
      { name: "Obertauern village — 1740m", seed: "obertauern-cam4" },
    ],
    events: [
      { date: "22 Nov 2025", name: "Einschwingen für Pink Ribbon", type: "Charity", desc: "Season warm-up charity event for Austrian cancer aid" },
      { date: "28 Nov 2025", name: "SKIOPENING — Seiler und Speer", type: "Concert", desc: "Season opening live concert with Seiler und Speer — 'Ham kummst', 'Für immer'" },
      { date: "5 Dec 2025", name: "SKIOPENING — Edmund", type: "Concert", desc: "Duo Edmund — Austropop concert in the village centre" },
      { date: "28 Nov – 21 Dec 2025", name: "TAUERNADVENT", type: "Festival", desc: "Austria's highest Christmas market (Salzburg Land). Fri & Sat 16–21h, Sun 16–20h" },
      { date: "30 Dec 2025", name: "FIRST.TRACK", type: "Sport", desc: "Exclusive early-morning tracks on freshly groomed pistes — 7:30am start. From €99 excl. pass" },
      { date: "29 Jan 2026", name: "POWDER.TRACK", type: "Sport", desc: "First tracks on powder snow. €99 excl. / €164 incl. ski pass" },
      { date: "12 Feb 2026", name: "VALENTINE'S.TRACK", type: "Sport", desc: "Sunrise first tracks for couples — Valentine's edition" },
      { date: "12 Mar 2026", name: "LEGENDS.TRACK", type: "Sport", desc: "First tracks with local legends — mountain sunrise experience" },
      { date: "20–22 Mar 2026", name: "FREERIDE WORLD TOUR CHALLENGER FINALE", type: "Competition", desc: "Elite freeride competition finale on Obertauern's steep faces" },
      { date: "2 Apr 2026", name: "SPRING.TRACK", type: "Sport", desc: "First tracks in spring sunshine — early morning slopes" },
      { date: "11 Apr 2026", name: "Obertauern Symphonic — ABBA Concert", type: "Concert", desc: "Philharmonie Salzburg & Stimmgewalt Monika Ballwein perform ABBA — SHESKIS für Pink Ribbon" },
      { date: "10–12 Apr 2026", name: "SHESKIS für Pink Ribbon — 8th Edition", type: "Charity", desc: "Women's ski day for Austrian cancer aid. 2025 raised €115,000 for Pink Ribbon" },
      { date: "16–18 Apr 2026", name: "GAMSLEITEN KRITERIUM", type: "Festival", desc: "Austria's largest snow treasure hunt — 18th edition. 1,000+ diggers, BMW main prize (€60,000+). Tickets €65 / Package €425" },
    ],
    promotions: [
      {
        title: "Salzburg Super Ski Card",
        description: "World's largest ski pass network. 3–14 day passes, season card, or Saisonwahlabo. Valid at Obertauern and hundreds of Salzburg-region resorts.",
        url: "www.skicard.at",
      },
      {
        title: "LUNGO — Lungau–Katschberg–Obertauern",
        description: "Regional pass valid at Obertauern + Grosseck-Speiereck (50km, 10 lifts) 15km away. Night skiing included with 2-day+ passes.",
        url: "www.obertauern.com",
      },
      {
        title: "Guest Mobility Ticket",
        description: "Free unlimited public transport across Salzburg province during your stay — all city buses, regional buses, S-Bahn, regional trains and intercity trains included. Provided digitally at check-in.",
        url: "www.obertauern.com",
      },
    ],
    liftPasses: [
      { type: "1-day", adult: 56, child: 28, senior: 50, badge: null },
      { type: "1.5-day", adult: 79, child: 40, senior: 71, badge: "Includes night skiing" },
      { type: "3-day", adult: 156, child: 78, senior: 140, badge: null },
      { type: "6-day", adult: 289, child: 145, senior: 260, badge: "Best value" },
      { type: "Season", adult: 1290, child: 645, senior: 1161, badge: null },
    ],
    passNote: "1.5-day+ passes include free night skiing Mon & Thu (Edelweissbahn piste, 1.5km). Obertauern passes (1.5-day+) also valid at Grosseck-Speiereck via LUNGO. Free ski bus included with valid ski ticket: Untertauern–Tweng and Mauterndorf–Radstadt corridors.",
    contact: {
      website: "www.obertauern.com",
      email: "pr@obertauern.com",
      phone: "+43 664 8862 3866",
      address: "Tourismusverband Obertauern, A-5562 Obertauern",
    },
    instructors: [],
    reviews: {
      overall: 9.2,
      breakdown: { pistes: 9.0, lifts: 9.1, apresSki: 9.5, value: 8.8, beginners: 8.9 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "partial" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "open" },
      { month: "May", status: "partial" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "mariazell",
    name: "Mariazeller Buergeralpe",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Styria, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.77, lng: 15.32,
    minAltitude: 870, maxAltitude: 1267,
    verticalDrop: 397,
    pisteKm: 25, runs: 12, lifts: 7,
    gondolas: 2, chairlifts: 4, dragLifts: 1,
    longestRun: 5,
    difficultyBlue: 40, difficultyRed: 44, difficultyBlack: 16,
    snowCannons: 30, snowCannonKm: 14,
    seasonStart: "2024-12-21", seasonEnd: "2025-03-16",
    openStatus: "Open", roadStatus: "open",
    rating: 7.6, ratingLabel: "Very good", priceFrom: 35,
    seasonDates: "21 Dec 2024 - 16 Mar 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "The Buergeralpe above the famous pilgrimage town of Mariazell offers gentle family skiing with excellent snowmaking. Easily reached by the famous Mariazellerbahn heritage railway from St. Poelten, it is an ideal introduction to skiing for beginners from Vienna.",
    image: "https://picsum.photos/seed/mariazell/800/500",
    images: ["https://picsum.photos/seed/mariazell-1/1200/700", "https://picsum.photos/seed/mariazell-2/1200/700", "https://picsum.photos/seed/mariazell-3/1200/700"],
    weather: { temp: -2, snowDepth: 85, condition: "Clear", forecast: [
      { day: "Today", high: 0, low: -6, condition: "clear" },
      { day: "Tomorrow", high: -1, low: -7, condition: "partly_cloudy" },
      { day: "Thu", high: -3, low: -9, condition: "snow" }
    ]},
    snowDepthBase: 45, snowDepthMid: 70, snowDepthTop: 95, snowType: "Machine-groomed",
    liftsOpen: 7, liftsTotal: 7, pistesOpen: 11, pistesTotal: 12,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Mariazellerbahn heritage railway integration"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Vienna", iata: "VIE", driveTime: "2h" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Mariazell - 2km, Mariazellerbahn narrow gauge from St. Poelten",
    shuttle: true, shuttleDesc: "Mariazellerbahn narrow gauge railway connects St. Poelten to Mariazell",
    parking: { capacity: 900, pricePerDay: 7, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Buergeralpe Restaurant", zone: "Summit 1267m", cuisine: "Austrian", price: "€€" },
        { name: "Erlaufsee Gasthaus", zone: "Lake level", cuisine: "Styrian", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 32, privateLessonFrom: 85,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 40,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 180, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 5, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Mariazell town",
      pharmacy: true, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Mariazell is Austrias most important pilgrimage site, attracting over one million visitors annually to its famous Marian basilica. The Erlaufsee lake is frozen in winter and ideal for ice skating.",
      nearbyTowns: [
        { name: "Mariazell", distance: "0km", desc: "Famous pilgrimage town with baroque basilica" },
        { name: "St. Sebastián", distance: "5km", desc: "Quiet village near the Erlaufsee" },
        { name: "St. Poelten", distance: "85km", desc: "Lower Austrian capital with train connections" }
      ],
      activities: ["Ice skating", "Pilgrimage visits", "Winter hiking", "Cultural tours"],
      touristBoard: "Mariazell Tourismus",
      touristBoardUrl: "https://www.mariazell.at",
      emergency: "112",
      hospital: "Scheibbs hospital (35km)"
    },
    webcams: [
      { name: "Buergeralpe 1267m", seed: "mariazell-cam1" },
      { name: "Mariazell basilica view", seed: "mariazell-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Mariazell Advent Market", type: "Festival", desc: "Traditional Christmas market at the pilgrimage basilica" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 35, child: 18, senior: 28, badge: null },
      { type: "3-day", adult: 96, child: 48, senior: 77, badge: null },
      { type: "6-day", adult: 180, child: 90, senior: 144, badge: "Best value" },
      { type: "Season", adult: 810, child: 405, senior: 648, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 7.6,
      breakdown: { pistes: 7.6, lifts: 7.7, apresSki: 7.8, value: 9.5, beginners: 9.6 },
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