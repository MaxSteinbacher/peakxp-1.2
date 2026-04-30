export const italianResorts2 = [
  {
    id: "monterosa-ski",
    name: "Monterosa Ski",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Valle d'Aosta / Piedmont, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 45.80, lng: 7.82,
    minAltitude: 1385, maxAltitude: 3275,
    verticalDrop: 1890,
    pisteKm: 180, runs: 69, lifts: 42,
    gondolas: 11, chairlifts: 22, dragLifts: 9,
    longestRun: 14,
    difficultyBlue: 30, difficultyRed: 49, difficultyBlack: 21,
    snowCannons: 180, snowCannonKm: 72,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 52,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: ["ikon-pass"],
    resortTypes: ["Alpine", "Freeride"],
    description: "Connects three valleys on the flanks of Monte Rosa, Europes second highest massif. Alagna is legendary among freeriders for extreme off-piste couloirs while Champoluc and Gressoney offer accessible terrain and charming Walser villages.",
    image: "https://picsum.photos/seed/monterosa-ski/800/500",
    images: ["https://picsum.photos/seed/monterosa-1/1200/700", "https://picsum.photos/seed/monterosa-2/1200/700", "https://picsum.photos/seed/monterosa-3/1200/700"],
    weather: { temp: -7, snowDepth: 175, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 80, snowDepthMid: 150, snowDepthTop: 230, snowType: "Powder",
    liftsOpen: 38, liftsTotal: 42, pistesOpen: 62, pistesTotal: 69,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Monte Rosa glacier monitoring program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Turin", iata: "TRN", driveTime: "1h 30m" },
      { airport: "Milan Malpensa", iata: "MXP", driveTime: "2h" },
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" }
    ],
    trainStation: "Verres - 25km bus into the valleys",
    shuttle: false, shuttleDesc: "Bus from Verres into the valleys",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Gabiet", zone: "2379m", cuisine: "Valdostan", price: "€€" },
        { name: "Punta Jolanda Restaurant", zone: "3275m", cuisine: "Alpine", price: "€€€" },
        { name: "Alagna Village Osteria", zone: "Village", cuisine: "Walser", price: "€€" }
      ],
      skiSchools: 3, groupLessonFrom: 44, privateLessonFrom: 115,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 700, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 9, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Gressoney-la-Trinite village",
      pharmacy: false, atm: true, atmCount: 4
    },
    surroundings: {
      description: "The three valleys of Gressoney, Champoluc and Alagna are Walser villages settled by German-speaking immigrants from the Valais in the 13th century. Alagna is considered one of the great freeride destinations in the world.",
      nearbyTowns: [
        { name: "Gressoney-la-Trinite", distance: "0km", desc: "Main Walser village in the Gressoney valley" },
        { name: "Champoluc", distance: "15km via ski area", desc: "Charming Walser village in the Ayas valley" },
        { name: "Alagna", distance: "25km via ski area", desc: "Legendary freeride village in the Valsesia" }
      ],
      activities: ["Freeride tours", "Snowshoeing", "Winter hiking", "Spa & wellness", "Walser culture tours"],
      touristBoard: "Monterosa Ski Tourism",
      touristBoardUrl: "https://www.monterosa-ski.com",
      emergency: "112",
      hospital: "Ospedale di Aosta (60km)"
    },
    webcams: [
      { name: "Punta Jolanda 3275m", seed: "monterosa-cam1" },
      { name: "Gressoney valley", seed: "monterosa-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Monterosa Freeride Festival", type: "Festival", desc: "Extreme freeride celebration at Alagna" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 52, child: 26, senior: 42, badge: null },
      { type: "3-day", adult: 143, child: 72, senior: 114, badge: null },
      { type: "6-day", adult: 267, child: 134, senior: 214, badge: "Best value" },
      { type: "Season", adult: 1210, child: 605, senior: 968, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 8.9, lifts: 8.7, apresSki: 8.5, value: 9.0, beginners: 8.6 },
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
    id: "arabba-marmolada",
    name: "Arabba-Marmolada",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Veneto, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.50, lng: 11.89,
    minAltitude: 1602, maxAltitude: 3269,
    verticalDrop: 1667,
    pisteKm: 67, runs: 34, lifts: 27,
    gondolas: 7, chairlifts: 14, dragLifts: 6,
    longestRun: 12,
    difficultyBlue: 20, difficultyRed: 47, difficultyBlack: 33,
    snowCannons: 160, snowCannonKm: 50,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 56,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Freeride", "Glacier"],
    description: "The highest and most challenging village on the Sella Ronda circuit with access to the Marmolada glacier at 3269m - the Queen of the Dolomites. Outstanding snow quality on predominantly north-facing slopes and the Marmolada descent is one of the longest in the Dolomites.",
    image: "https://picsum.photos/seed/arabba-marmolada/800/500",
    images: ["https://picsum.photos/seed/arabba-1/1200/700", "https://picsum.photos/seed/arabba-2/1200/700", "https://picsum.photos/seed/arabba-3/1200/700"],
    weather: { temp: -8, snowDepth: 195, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 90, snowDepthMid: 165, snowDepthTop: 240, snowType: "Powder",
    liftsOpen: 24, liftsTotal: 27, pistesOpen: 30, pistesTotal: 34,
    ecoRating: 3, ecoRenewable: 60, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["60% renewable electricity", "Marmolada glacier conservation monitoring"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Venice Marco Polo", iata: "VCE", driveTime: "2h 30m" },
      { airport: "Treviso", iata: "TSF", driveTime: "2h 30m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h" }
    ],
    trainStation: "Belluno - 55km bus",
    shuttle: false, shuttleDesc: "Bus from Belluno",
    parking: { capacity: 1200, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Punta Rocca Restaurant", zone: "3265m Marmolada", cuisine: "Alpine Gourmet", price: "€€€" },
        { name: "Rifugio Mesole", zone: "2050m Arabba", cuisine: "Veneto Alpine", price: "€€" },
        { name: "Arabba Village Ristorante", zone: "Village", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 48, privateLessonFrom: 128,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 58,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 500, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: true, medicalLocation: "Arabba village",
      pharmacy: false, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Arabba is a small village at 1602m on the Pordoi Pass road. The north-facing slopes above the village retain exceptional snow quality and the Marmolada glacier provides the most dramatic backdrop in the Dolomites.",
      nearbyTowns: [
        { name: "Arabba", distance: "0km", desc: "High-altitude Sella Ronda village" },
        { name: "Canazei", distance: "12km", desc: "Val di Fassa main village" },
        { name: "Corvara", distance: "15km via ski area", desc: "Alta Badia chic resort village" }
      ],
      activities: ["Sella Ronda circuit", "Glacier tours", "Snowshoeing", "Freeride tours"],
      touristBoard: "Arabba-Marmolada Tourism",
      touristBoardUrl: "https://www.arabba.it",
      emergency: "112",
      hospital: "Ospedale di Belluno (55km)"
    },
    webcams: [
      { name: "Marmolada 3265m", seed: "arabba-cam1" },
      { name: "Arabba village 1602m", seed: "arabba-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Arabba Freeride Challenge", type: "Competition", desc: "Freeride ski mountaineering race on Marmolada" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 56, child: 28, senior: 45, badge: null },
      { type: "3-day", adult: 154, child: 77, senior: 123, badge: null },
      { type: "6-day", adult: 288, child: 144, senior: 230, badge: "Best value" },
      { type: "Season", adult: 1300, child: 650, senior: 1040, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 9.1, lifts: 8.9, apresSki: 8.4, value: 8.8, beginners: 7.8 },
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
    id: "seiser-alm",
    name: "Alpe di Siusi / Seiser Alm",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Alto Adige, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.54, lng: 11.62,
    minAltitude: 1844, maxAltitude: 2518,
    verticalDrop: 674,
    pisteKm: 60, runs: 42, lifts: 15,
    gondolas: 5, chairlifts: 7, dragLifts: 3,
    longestRun: 9,
    difficultyBlue: 42, difficultyRed: 44, difficultyBlack: 14,
    snowCannons: 90, snowCannonKm: 35,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Family resort", "Nordic"],
    description: "Europes largest high-altitude alpine meadow at 1844m with spectacular views of the Sassolungo and Sciliar massifs. Accessible only by cable car or ski bus providing a car-free experience connecting with the full Dolomiti Superski network.",
    image: "https://picsum.photos/seed/seiser-alm/800/500",
    images: ["https://picsum.photos/seed/seiser-alm-1/1200/700", "https://picsum.photos/seed/seiser-alm-2/1200/700", "https://picsum.photos/seed/seiser-alm-3/1200/700"],
    weather: { temp: -5, snowDepth: 145, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 70, snowDepthMid: 115, snowDepthTop: 160, snowType: "Packed powder",
    liftsOpen: 13, liftsTotal: 15, pistesOpen: 38, pistesTotal: 42,
    ecoRating: 4, ecoRenewable: 75, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["75% renewable electricity", "Car-free plateau designation", "Green Globe certified", "UNESCO Dolomites heritage stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Bolzano", iata: "BZO", driveTime: "45m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Verona", iata: "VRN", driveTime: "2h" }
    ],
    trainStation: "Bolzano/Bozen - 35km bus then cable car",
    shuttle: false, shuttleDesc: "Bus from Bolzano then cable car to the plateau",
    parking: { capacity: 1500, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Panorama Restaurant Spitzbuehl", zone: "2044m", cuisine: "South Tyrolean", price: "€€€" },
        { name: "Saltria Malga", zone: "Plateau 1874m", cuisine: "Alpine", price: "€€" },
        { name: "Compatsch Terrasse", zone: "Base 1844m", cuisine: "Italian Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 44, privateLessonFrom: 115,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 480, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Castelrotto (5km)",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "The Seiser Alm plateau is the largest high-altitude meadow in Europe at over 56 square kilometres. In winter it becomes a stunning snowfield with the Sassolungo and Schlern massifs rising dramatically above.",
      nearbyTowns: [
        { name: "Castelrotto", distance: "5km", desc: "Traditional South Tyrolean village below the plateau" },
        { name: "Ortisei", distance: "8km via ski area", desc: "Main Val Gardena town" },
        { name: "Bolzano", distance: "35km", desc: "South Tyrolean capital" }
      ],
      activities: ["Cross-country skiing", "Snowshoeing", "Winter hiking", "Horse sleigh rides"],
      touristBoard: "Seiser Alm Tourism",
      touristBoardUrl: "https://www.seiseralm.it",
      emergency: "112",
      hospital: "Ospedale di Bolzano (35km)"
    },
    webcams: [
      { name: "Spitzbuehl 2044m", seed: "seiser-alm-cam1" },
      { name: "Compatsch base 1844m", seed: "seiser-alm-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Seiser Alm Ski Marathon", type: "Competition", desc: "Annual cross-country ski marathon on the plateau" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 50, child: 25, senior: 40, badge: null },
      { type: "3-day", adult: 137, child: 69, senior: 110, badge: null },
      { type: "6-day", adult: 256, child: 128, senior: 205, badge: "Best value" },
      { type: "Season", adult: 1160, child: 580, senior: 928, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 8.7, lifts: 8.8, apresSki: 8.4, value: 9.0, beginners: 9.3 },
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
    id: "la-thuile",
    name: "La Thuile",
    countries: ["Italy", "France"],
    countryCode: "IT",
    region: "Valle d'Aosta, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 45.72, lng: 6.95,
    minAltitude: 1441, maxAltitude: 2640,
    verticalDrop: 1199,
    pisteKm: 160, runs: 44, lifts: 26,
    gondolas: 7, chairlifts: 14, dragLifts: 5,
    longestRun: 13,
    difficultyBlue: 32, difficultyRed: 46, difficultyBlack: 22,
    snowCannons: 130, snowCannonKm: 65,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["ikon-pass"],
    resortTypes: ["Alpine", "Cross-border", "Freeride"],
    description: "Connects with La Rosiere in France via the Petit Saint Bernard Pass to form the Espace San Bernardo with 160km of cross-border skiing. The north-facing Italian side offers excellent snow retention and a more relaxed atmosphere than nearby Courmayeur.",
    image: "https://picsum.photos/seed/la-thuile/800/500",
    images: ["https://picsum.photos/seed/la-thuile-1/1200/700", "https://picsum.photos/seed/la-thuile-2/1200/700", "https://picsum.photos/seed/la-thuile-3/1200/700"],
    weather: { temp: -7, snowDepth: 180, condition: "Clear", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 80, snowDepthMid: 145, snowDepthTop: 210, snowType: "Powder",
    liftsOpen: 23, liftsTotal: 26, pistesOpen: 39, pistesTotal: 44,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Franco-Italian Espace San Bernardo cooperation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h" },
      { airport: "Turin", iata: "TRN", driveTime: "2h" },
      { airport: "Lyon", iata: "LYS", driveTime: "3h" }
    ],
    trainStation: "Aosta - 40km bus",
    shuttle: false, shuttleDesc: "Bus from Aosta",
    parking: { capacity: 1500, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Maison Carrel", zone: "2200m", cuisine: "Valdostan", price: "€€€" },
        { name: "Rifugio Chalet de l'Arp", zone: "2484m", cuisine: "Alpine", price: "€€" },
        { name: "La Thuile Village Bar", zone: "Village", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 44, privateLessonFrom: 115,
      languages: ["🇮🇹", "🇬🇧", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 480, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "La Thuile village",
      pharmacy: false, atm: true, atmCount: 3
    },
    surroundings: {
      description: "La Thuile is an old mining village transformed into a resort above the Piccolo San Bernardo pass. The pass has been a trade route between the Aosta valley and Savoie since Roman times.",
      nearbyTowns: [
        { name: "La Thuile", distance: "0km", desc: "Quiet Aosta valley resort near the French border" },
        { name: "Courmayeur", distance: "20km", desc: "Prestigious Mont Blanc resort" },
        { name: "Aosta", distance: "40km", desc: "Roman capital of the valley" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Freeride tours", "Winter hiking"],
      touristBoard: "La Thuile Tourism",
      touristBoardUrl: "https://www.lathuile.eu",
      emergency: "112",
      hospital: "Ospedale di Aosta (40km)"
    },
    webcams: [
      { name: "Chaz Dura 2640m", seed: "la-thuile-cam1" },
      { name: "La Thuile village", seed: "la-thuile-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "La Thuile World Cup", type: "Competition", desc: "FIS Alpine Ski World Cup super-G and downhill" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 50, child: 25, senior: 40, badge: null },
      { type: "3-day", adult: 137, child: 69, senior: 110, badge: null },
      { type: "6-day", adult: 256, child: 128, senior: 205, badge: "Best value" },
      { type: "Season", adult: 1160, child: 580, senior: 928, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.7,
      breakdown: { pistes: 8.8, lifts: 8.6, apresSki: 8.3, value: 9.1, beginners: 8.8 },
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
    id: "val-di-fassa",
    name: "Val di Fassa",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Trentino, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.47, lng: 11.78,
    minAltitude: 1000, maxAltitude: 2630,
    verticalDrop: 1630,
    pisteKm: 120, runs: 49, lifts: 30,
    gondolas: 8, chairlifts: 16, dragLifts: 6,
    longestRun: 11,
    difficultyBlue: 30, difficultyRed: 48, difficultyBlack: 22,
    snowCannons: 280, snowCannonKm: 95,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 54,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "The main gateway to the Sella Ronda circuit in Trentino with Canazei providing access to the Belvedere ski area and the famous Col Rodella piste overlooking the Marmolada. Strong Ladin cultural traditions and excellent ski infrastructure.",
    image: "https://picsum.photos/seed/val-di-fassa/800/500",
    images: ["https://picsum.photos/seed/val-di-fassa-1/1200/700", "https://picsum.photos/seed/val-di-fassa-2/1200/700", "https://picsum.photos/seed/val-di-fassa-3/1200/700"],
    weather: { temp: -5, snowDepth: 150, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 130, snowDepthTop: 195, snowType: "Packed powder",
    liftsOpen: 27, liftsTotal: 30, pistesOpen: 44, pistesTotal: 49,
    ecoRating: 3, ecoRenewable: 65, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["65% renewable electricity", "Dolomites UNESCO heritage valley program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Bolzano", iata: "BZO", driveTime: "1h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Venice Marco Polo", iata: "VCE", driveTime: "2h 30m" }
    ],
    trainStation: "Bolzano/Bozen - 55km bus",
    shuttle: false, shuttleDesc: "Bus from Bolzano",
    parking: { capacity: 2500, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Col Rodella", zone: "2484m", cuisine: "Trentino Alpine", price: "€€€" },
        { name: "Malga Contrin", zone: "2016m", cuisine: "Ladin", price: "€€" },
        { name: "Canazei Village Osteria", zone: "Village", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 46, privateLessonFrom: 120,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 56,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Canazei village",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "The Fassa valley is one of the remaining areas where Ladin, a Rhaeto-Romance language, is spoken as a daily language. The valley runs between the Marmolada and the Sella massif through spectacular Dolomite scenery.",
      nearbyTowns: [
        { name: "Canazei", distance: "0km", desc: "Main Fassa valley ski village and Sella Ronda gateway" },
        { name: "Campitello di Fassa", distance: "3km", desc: "Linked village with Col Rodella cable car" },
        { name: "Vigo di Fassa", distance: "8km", desc: "Lower valley village with Catinaccio access" }
      ],
      activities: ["Sella Ronda circuit", "Snowshoeing", "Cross-country skiing", "Ladin culture tours", "Ice skating"],
      touristBoard: "Val di Fassa Tourism",
      touristBoardUrl: "https://www.fassa.com",
      emergency: "112",
      hospital: "Ospedale di Cavalese (25km)"
    },
    webcams: [
      { name: "Col Rodella 2484m", seed: "val-di-fassa-cam1" },
      { name: "Canazei village", seed: "val-di-fassa-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Gran Fondo Val di Fassa", type: "Competition", desc: "Cross-country ski marathon in the Fassa valley" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 54, child: 27, senior: 43, badge: null },
      { type: "3-day", adult: 148, child: 74, senior: 118, badge: null },
      { type: "6-day", adult: 277, child: 139, senior: 222, badge: "Best value" },
      { type: "Season", adult: 1255, child: 628, senior: 1004, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.9,
      breakdown: { pistes: 9.0, lifts: 8.9, apresSki: 8.7, value: 8.9, beginners: 8.9 },
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
    id: "ponte-di-legno-tonale",
    name: "Ponte di Legno-Tonale",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Lombardy / Trentino, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.26, lng: 10.51,
    minAltitude: 1258, maxAltitude: 3016,
    verticalDrop: 1758,
    pisteKm: 100, runs: 34, lifts: 19,
    gondolas: 6, chairlifts: 9, dragLifts: 4,
    longestRun: 10,
    difficultyBlue: 30, difficultyRed: 46, difficultyBlack: 24,
    snowCannons: 120, snowCannonKm: 52,
    seasonStart: "2024-11-02", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 8.5, ratingLabel: "Excellent", priceFrom: 48,
    seasonDates: "2 Nov 2024 - 4 May 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Glacier"],
    description: "Connects the lively village of Ponte di Legno with the Presena glacier at 3016m on the Passo del Tonale. Part of the Dolomiti Superski network with reliable early and late season snow on the glacier.",
    image: "https://picsum.photos/seed/ponte-di-legno/800/500",
    images: ["https://picsum.photos/seed/ponte-1/1200/700", "https://picsum.photos/seed/ponte-2/1200/700", "https://picsum.photos/seed/ponte-3/1200/700"],
    weather: { temp: -7, snowDepth: 185, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 85, snowDepthMid: 155, snowDepthTop: 230, snowType: "Powder",
    liftsOpen: 17, liftsTotal: 19, pistesOpen: 30, pistesTotal: 34,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Presena glacier monitoring program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Milan Bergamo", iata: "BGY", driveTime: "2h" },
      { airport: "Brescia", iata: "VBS", driveTime: "1h 30m" },
      { airport: "Verona", iata: "VRN", driveTime: "2h" }
    ],
    trainStation: "Edolo - 22km bus",
    shuttle: false, shuttleDesc: "Bus from Edolo",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Paradiso", zone: "Presena glacier 3016m", cuisine: "Alpine", price: "€€€" },
        { name: "Malga Valbiolo", zone: "2000m Tonale", cuisine: "Lombardian", price: "€€" },
        { name: "Ponte di Legno Ristorante", zone: "Village", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 42, privateLessonFrom: 110,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 500, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Ponte di Legno village",
      pharmacy: true, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Ponte di Legno sits at the head of the Camonica valley at the foot of the Tonale pass. The Presena glacier is covered in white tarps in summer to slow its retreat, making for an unusual visual experience.",
      nearbyTowns: [
        { name: "Ponte di Legno", distance: "0km", desc: "Lively Lombard mountain village" },
        { name: "Passo del Tonale", distance: "10km", desc: "High pass with glacier access" },
        { name: "Edolo", distance: "22km", desc: "Camonica valley town with train station" }
      ],
      activities: ["Glacier walks", "Snowshoeing", "Cross-country skiing", "Winter hiking"],
      touristBoard: "Ponte di Legno-Tonale Tourism",
      touristBoardUrl: "https://www.pontedilegno-tonale.com",
      emergency: "112",
      hospital: "Ospedale di Edolo (22km)"
    },
    webcams: [
      { name: "Presena glacier 3016m", seed: "ponte-cam1" },
      { name: "Ponte di Legno base", seed: "ponte-cam2" }
    ],
    events: [
      { date: "Nov 2024", name: "Ponte di Legno-Tonale Season Opener", type: "Festival", desc: "Early season glacier skiing celebration" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 48, child: 24, senior: 38, badge: null },
      { type: "3-day", adult: 132, child: 66, senior: 106, badge: null },
      { type: "6-day", adult: 247, child: 124, senior: 198, badge: "Best value" },
      { type: "Season", adult: 1120, child: 560, senior: 896, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.5,
      breakdown: { pistes: 8.6, lifts: 8.5, apresSki: 8.3, value: 9.1, beginners: 8.8 },
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
    id: "3-zinnen-dolomites",
    name: "3 Zinnen Dolomites",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Alto Adige, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.63, lng: 12.24,
    minAltitude: 1200, maxAltitude: 2300,
    verticalDrop: 1100,
    pisteKm: 110, runs: 50, lifts: 22,
    gondolas: 6, chairlifts: 12, dragLifts: 4,
    longestRun: 10,
    difficultyBlue: 30, difficultyRed: 46, difficultyBlack: 24,
    snowCannons: 250, snowCannonKm: 85,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 52,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "In the Alta Pusteria valley with the iconic Three Peaks of the Dolomites as a constant backdrop. Sunny south-facing terrain connecting with Cortina and the wider Dolomiti Superski network.",
    image: "https://picsum.photos/seed/3-zinnen/800/500",
    images: ["https://picsum.photos/seed/3-zinnen-1/1200/700", "https://picsum.photos/seed/3-zinnen-2/1200/700", "https://picsum.photos/seed/3-zinnen-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 165, snowType: "Machine-groomed",
    liftsOpen: 19, liftsTotal: 22, pistesOpen: 45, pistesTotal: 50,
    ecoRating: 3, ecoRenewable: 68, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["68% renewable electricity", "Three Peaks UNESCO Dolomites heritage zone"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Bolzano", iata: "BZO", driveTime: "1h 30m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Venice Marco Polo", iata: "VCE", driveTime: "2h 30m" }
    ],
    trainStation: "Dobbiaco/Toblach - 8km, Pusterbahn trains",
    shuttle: true, shuttleDesc: "Pusterbahn trains connect Fortezza to Dobbiaco",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Haunold Bergrestaurant", zone: "2000m", cuisine: "South Tyrolean", price: "€€" },
        { name: "Drei Zinnen Hutte", zone: "2438m", cuisine: "Alpine", price: "€€€" },
        { name: "Innichen Village Stuberl", zone: "Village", cuisine: "South Tyrolean", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 44, privateLessonFrom: 115,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 600, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "San Candido/Innichen village",
      pharmacy: true, atm: true, atmCount: 4
    },
    surroundings: {
      description: "The 3 Zinnen area sits in the Alta Pusteria, the highest and most remote part of the Puster valley on the border with Veneto. The Three Peaks of Lavaredo are one of the most photographed rock formations in the world.",
      nearbyTowns: [
        { name: "San Candido/Innichen", distance: "8km", desc: "Historic bilingual Puster valley town" },
        { name: "Dobbiaco/Toblach", distance: "8km", desc: "Puster valley hub with train station" },
        { name: "Brunico/Bruneck", distance: "40km", desc: "Main Puster valley city" }
      ],
      activities: ["Three Peaks walks", "Cross-country skiing", "Snowshoeing", "Winter hiking"],
      touristBoard: "Alta Pusteria Tourism",
      touristBoardUrl: "https://www.3zinnen.info",
      emergency: "112",
      hospital: "Ospedale di Brunico (40km)"
    },
    webcams: [
      { name: "Haunold 2000m", seed: "3-zinnen-cam1" },
      { name: "Three Peaks view", seed: "3-zinnen-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Dobbiaco-Cortina Langlauf", type: "Competition", desc: "Famous cross-country ski race from Dobbiaco to Cortina" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 52, child: 26, senior: 42, badge: null },
      { type: "3-day", adult: 143, child: 72, senior: 114, badge: null },
      { type: "6-day", adult: 267, child: 134, senior: 214, badge: "Best value" },
      { type: "Season", adult: 1210, child: 605, senior: 968, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.7,
      breakdown: { pistes: 8.7, lifts: 8.6, apresSki: 8.5, value: 9.1, beginners: 9.1 },
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
    id: "san-martino-castrozza",
    name: "San Martino di Castrozza",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Trentino, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.26, lng: 11.80,
    minAltitude: 1450, maxAltitude: 2357,
    verticalDrop: 907,
    pisteKm: 60, runs: 25, lifts: 16,
    gondolas: 5, chairlifts: 8, dragLifts: 3,
    longestRun: 9,
    difficultyBlue: 34, difficultyRed: 45, difficultyBlack: 21,
    snowCannons: 100, snowCannonKm: 40,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.5, ratingLabel: "Excellent", priceFrom: 48,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Sits in a glacial cirque beneath the pale towers of the Pale di San Martino among the most spectacular rock formations in the Dolomites. Traditional resort with charming village atmosphere and skiing on the Tognola and Rosetta areas.",
    image: "https://picsum.photos/seed/san-martino-castrozza/800/500",
    images: ["https://picsum.photos/seed/san-martino-1/1200/700", "https://picsum.photos/seed/san-martino-2/1200/700", "https://picsum.photos/seed/san-martino-3/1200/700"],
    weather: { temp: -5, snowDepth: 150, condition: "Clear", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 120, snowDepthTop: 175, snowType: "Packed powder",
    liftsOpen: 14, liftsTotal: 16, pistesOpen: 22, pistesTotal: 25,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Pale di San Martino nature park stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Venice Marco Polo", iata: "VCE", driveTime: "2h" },
      { airport: "Treviso", iata: "TSF", driveTime: "2h" },
      { airport: "Verona", iata: "VRN", driveTime: "2h 30m" }
    ],
    trainStation: "Trento - 65km bus",
    shuttle: false, shuttleDesc: "Bus from Trento",
    parking: { capacity: 1500, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Rosetta", zone: "2581m", cuisine: "Alpine", price: "€€€" },
        { name: "Malga Ces", zone: "1900m Tognola", cuisine: "Trentino", price: "€€" },
        { name: "San Martino Village Trattoria", zone: "Village", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 42, privateLessonFrom: 108,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 380, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: true, medicalLocation: "San Martino village",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "San Martino di Castrozza is enclosed by the Pale di San Martino, a vast high plateau of pale limestone one of the greatest geological features in the Dolomites. The village is a traditional resort with 19th century hotel tradition.",
      nearbyTowns: [
        { name: "San Martino di Castrozza", distance: "0km", desc: "Traditional resort in the Pale cirque" },
        { name: "Primiero", distance: "10km", desc: "Historic valley town" },
        { name: "Feltre", distance: "40km", desc: "Veneto foothills town with rail access" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Cross-country skiing", "Pale di San Martino tours"],
      touristBoard: "San Martino di Castrozza Tourism",
      touristBoardUrl: "https://www.sanmartino.com",
      emergency: "112",
      hospital: "Ospedale di Feltre (40km)"
    },
    webcams: [
      { name: "Tognola 2100m", seed: "san-martino-cam1" },
      { name: "San Martino village", seed: "san-martino-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Trofeo Tognola", type: "Competition", desc: "Annual slalom race on the Tognola slope" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 48, child: 24, senior: 38, badge: null },
      { type: "3-day", adult: 132, child: 66, senior: 106, badge: null },
      { type: "6-day", adult: 247, child: 124, senior: 198, badge: "Best value" },
      { type: "Season", adult: 1120, child: 560, senior: 896, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.5,
      breakdown: { pistes: 8.5, lifts: 8.4, apresSki: 8.4, value: 9.1, beginners: 9.1 },
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
    id: "bardonecchia",
    name: "Bardonecchia",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Piedmont, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 45.08, lng: 6.70,
    minAltitude: 1312, maxAltitude: 2750,
    verticalDrop: 1438,
    pisteKm: 140, runs: 56, lifts: 25,
    gondolas: 7, chairlifts: 13, dragLifts: 5,
    longestRun: 11,
    difficultyBlue: 30, difficultyRed: 48, difficultyBlack: 22,
    snowCannons: 130, snowCannonKm: 60,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "A charming Piedmontese resort near the French border host of snowboard events in the 2006 Turin Olympics. Four distinct ski areas on different aspects provide excellent variety and the resort has excellent rail access from Turin via the Frejus tunnel.",
    image: "https://picsum.photos/seed/bardonecchia/800/500",
    images: ["https://picsum.photos/seed/bardonecchia-1/1200/700", "https://picsum.photos/seed/bardonecchia-2/1200/700", "https://picsum.photos/seed/bardonecchia-3/1200/700"],
    weather: { temp: -5, snowDepth: 145, condition: "Clear", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 170, snowType: "Packed powder",
    liftsOpen: 22, liftsTotal: 25, pistesOpen: 50, pistesTotal: 56,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Rail access promotion reducing car trips"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Turin", iata: "TRN", driveTime: "1h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" },
      { airport: "Geneva", iata: "GVA", driveTime: "3h" }
    ],
    trainStation: "Bardonecchia - 0.5km, direct trains from Turin via Frejus tunnel",
    shuttle: true, shuttleDesc: "Direct trains from Turin Porta Nuova take 1h40 to Bardonecchia",
    parking: { capacity: 2500, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Campo Smith Restaurant", zone: "1732m", cuisine: "Piedmontese Alpine", price: "€€" },
        { name: "Melezet Rifugio", zone: "1800m", cuisine: "Italian", price: "€€" },
        { name: "Bardonecchia Piazza Ristorante", zone: "Village", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 102,
      languages: ["🇮🇹", "🇬🇧", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 500, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Bardonecchia town",
      pharmacy: true, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Bardonecchia sits at the entrance to the Frejus tunnel, one of the main Alpine road and rail crossings between Italy and France. The resort spreads across several hamlets in a wide valley with excellent sun exposure.",
      nearbyTowns: [
        { name: "Bardonecchia", distance: "0km", desc: "Piedmontese resort town with direct Turin trains" },
        { name: "Oulx", distance: "12km", desc: "Via Lattea gateway with high-speed train stop" },
        { name: "Modane (France)", distance: "10km via tunnel", desc: "French rail junction" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Ice skating", "Winter hiking", "Olympic heritage visits"],
      touristBoard: "Bardonecchia Tourism",
      touristBoardUrl: "https://www.bardonecchia.it",
      emergency: "112",
      hospital: "Ospedale di Susa (30km)"
    },
    webcams: [
      { name: "Jafferau 2750m", seed: "bardonecchia-cam1" },
      { name: "Bardonecchia town", seed: "bardonecchia-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Bardonecchia Snowboard Jam", type: "Competition", desc: "Snowboard freestyle event in the Olympic snowpark" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 46, child: 23, senior: 37, badge: null },
      { type: "3-day", adult: 126, child: 63, senior: 101, badge: null },
      { type: "6-day", adult: 236, child: 118, senior: 189, badge: "Best value" },
      { type: "Season", adult: 1065, child: 533, senior: 852, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.3,
      breakdown: { pistes: 8.3, lifts: 8.2, apresSki: 8.3, value: 9.2, beginners: 9.1 },
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
    id: "montgenevre",
    name: "Montgenevre",
    countries: ["Italy", "France"],
    countryCode: "IT",
    region: "Piedmont / Hautes-Alpes",
    country: "Italy",
    flag: "🇮🇹",
    lat: 44.93, lng: 6.73,
    minAltitude: 1860, maxAltitude: 2823,
    verticalDrop: 963,
    pisteKm: 100, runs: 41, lifts: 22,
    gondolas: 6, chairlifts: 12, dragLifts: 4,
    longestRun: 10,
    difficultyBlue: 36, difficultyRed: 44, difficultyBlack: 20,
    snowCannons: 90, snowCannonKm: 45,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Cross-border", "Family resort"],
    description: "Sits directly on the French-Italian border at 1860m connecting with Claviere and the Milky Way ski area extending to Sestriere. The resort village sits entirely at altitude ensuring excellent snow cover and easy cross-border skiing.",
    image: "https://picsum.photos/seed/montgenevre/800/500",
    images: ["https://picsum.photos/seed/montgenevre-1/1200/700", "https://picsum.photos/seed/montgenevre-2/1200/700", "https://picsum.photos/seed/montgenevre-3/1200/700"],
    weather: { temp: -5, snowDepth: 155, condition: "Clear", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 120, snowDepthTop: 170, snowType: "Machine-groomed",
    liftsOpen: 19, liftsTotal: 22, pistesOpen: 36, pistesTotal: 41,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Franco-Italian cross-border ski area management"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Turin", iata: "TRN", driveTime: "2h" },
      { airport: "Lyon", iata: "LYS", driveTime: "3h" },
      { airport: "Geneva", iata: "GVA", driveTime: "3h 30m" }
    ],
    trainStation: "Oulx - 22km bus",
    shuttle: false, shuttleDesc: "Bus from Oulx station",
    parking: { capacity: 1500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Les Gondrans Restaurant", zone: "2550m", cuisine: "Franco-Italian Alpine", price: "€€" },
        { name: "Chalet du Rocher", zone: "2200m", cuisine: "French Alpine", price: "€€€" },
        { name: "Montgenevre Village Brasserie", zone: "Village", cuisine: "French", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 102,
      languages: ["🇫🇷", "🇮🇹", "🇬🇧"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 380, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: true, medicalLocation: "Montgenevre village",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Montgenevre has been an important Alpine pass since Roman times and Napoleon crossed it during his Italian campaigns. The village sits entirely above 1860m on the col between the Durance and Po river basins.",
      nearbyTowns: [
        { name: "Claviere", distance: "5km", desc: "Italian border village in the Via Lattea" },
        { name: "Cesana Torinese", distance: "8km", desc: "Italian village at the pass foot" },
        { name: "Briancon (France)", distance: "10km", desc: "Highest fortified city in Europe" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Winter hiking", "Cross-border ski tours"],
      touristBoard: "Montgenevre Tourism",
      touristBoardUrl: "https://www.montgenevre.com",
      emergency: "112",
      hospital: "Ospedale di Susa (40km)"
    },
    webcams: [
      { name: "Les Gondrans 2550m", seed: "montgenevre-cam1" },
      { name: "Montgenevre village", seed: "montgenevre-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Montgenevre Franco-Italian Race", type: "Competition", desc: "Cross-border team ski race" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 46, child: 23, senior: 37, badge: null },
      { type: "3-day", adult: 126, child: 63, senior: 101, badge: null },
      { type: "6-day", adult: 236, child: 118, senior: 189, badge: "Best value" },
      { type: "Season", adult: 1065, child: 533, senior: 852, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.4,
      breakdown: { pistes: 8.4, lifts: 8.3, apresSki: 8.3, value: 9.2, beginners: 9.2 },
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
  }
];