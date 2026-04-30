export const frenchResorts2 = [
  {
    id: "tignes",
    name: "Tignes",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.47, lng: 6.90,
    minAltitude: 1550, maxAltitude: 3456,
    verticalDrop: 1906,
    pisteKm: 150, runs: 68, lifts: 43,
    gondolas: 11, chairlifts: 23, dragLifts: 9,
    longestRun: 13,
    difficultyBlue: 33, difficultyRed: 44, difficultyBlack: 23,
    snowCannons: 290, snowCannonKm: 65,
    seasonStart: "2024-09-28", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 9.2, ratingLabel: "Exceptional", priceFrom: 70,
    seasonDates: "28 Sep 2024 - 4 May 2025",
    seasonPasses: ["epic-pass"],
    resortTypes: ["Alpine", "Glacier", "Freestyle"],
    description: "Year-round skiing on the Grande Motte glacier at 3456m accessible via the worlds highest underground funicular. Five village centres at different altitudes all with ski-in ski-out access. Particularly renowned for freestyle skiing and snowboarding.",
    image: "https://picsum.photos/seed/tignes/800/500",
    images: ["https://picsum.photos/seed/tignes-1/1200/700", "https://picsum.photos/seed/tignes-2/1200/700", "https://picsum.photos/seed/tignes-3/1200/700"],
    weather: { temp: -9, snowDepth: 220, condition: "Sunny", forecast: [
      { day: "Today", high: -7, low: -13, condition: "clear" },
      { day: "Tomorrow", high: -8, low: -14, condition: "clear" },
      { day: "Thu", high: -10, low: -16, condition: "snow" }
    ]},
    snowDepthBase: 100, snowDepthMid: 185, snowDepthTop: 275, snowType: "Powder",
    liftsOpen: 38, liftsTotal: 43, pistesOpen: 61, pistesTotal: 68,
    ecoRating: 3, ecoRenewable: 62, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["62% renewable electricity", "Grande Motte glacier monitoring program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "3h" },
      { airport: "Chambery", iata: "CMF", driveTime: "2h" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" }
    ],
    trainStation: "Bourg-Saint-Maurice - 28km, TGV Neige",
    shuttle: true, shuttleDesc: "TGV Neige stops at Bourg-Saint-Maurice",
    parking: { capacity: 4000, pricePerDay: 14, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Panoramic Grande Motte", zone: "3020m glacier", cuisine: "French Alpine", price: "€€€" },
        { name: "Tignes Le Lac Brasserie", zone: "2100m", cuisine: "Savoyard", price: "€€" },
        { name: "Val Claret Apres Bar", zone: "Val Claret", cuisine: "French", price: "€€" }
      ],
      skiSchools: 3, groupLessonFrom: 52, privateLessonFrom: 155,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 68,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1100, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 11, bootDryers: true,
      rentalShops: 28, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head", "Burton"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Tignes Le Lac village",
      pharmacy: true, atm: true, atmCount: 10
    },
    surroundings: {
      description: "Tignes is a collection of five purpose-built villages. The original village of Tignes was flooded by the reservoir created by the Tignes dam in 1952 and its church tower still protrudes above the water surface in dry years.",
      nearbyTowns: [
        { name: "Tignes Le Lac", distance: "0km", desc: "Main Tignes village at 2100m" },
        { name: "Val d'Isere", distance: "12km via ski area", desc: "Espace Killy expert resort partner" },
        { name: "Bourg-Saint-Maurice", distance: "28km", desc: "Tarentaise ski train hub" }
      ],
      activities: ["Glacier skiing", "Ice diving Tignes lake", "Snowshoeing", "Spa & wellness", "Freestyle terrain park"],
      touristBoard: "Tignes Tourism",
      touristBoardUrl: "https://www.tignes.net",
      emergency: "112",
      hospital: "Centre Hospitalier Bourg-Saint-Maurice (28km)"
    },
    webcams: [
      { name: "Grande Motte 3456m", seed: "tignes-cam1" },
      { name: "Tignes Le Lac 2100m", seed: "tignes-cam2" }
    ],
    events: [
      { date: "Oct 2024", name: "Tignes Glacier Opening", type: "Festival", desc: "Season opening on the Grande Motte glacier" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 70, child: 35, senior: 56, badge: null },
      { type: "3-day", adult: 193, child: 97, senior: 154, badge: null },
      { type: "6-day", adult: 360, child: 180, senior: 288, badge: "Best value" },
      { type: "Season", adult: 1640, child: 820, senior: 1312, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.2,
      breakdown: { pistes: 9.3, lifts: 9.2, apresSki: 8.9, value: 8.7, beginners: 8.5 },
      items: []
    },
    seasonCalendar: [
      { month: "Sep", status: "partial" }, { month: "Oct", status: "open" },
      { month: "Nov", status: "open" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "open" },
      { month: "May", status: "partial" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" }
    ]
  },
  {
    id: "sainte-foy",
    name: "Sainte-Foy-Tarentaise",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.57, lng: 6.84,
    minAltitude: 1550, maxAltitude: 2620,
    verticalDrop: 1070,
    pisteKm: 60, runs: 20, lifts: 8,
    gondolas: 3, chairlifts: 4, dragLifts: 1,
    longestRun: 10,
    difficultyBlue: 22, difficultyRed: 40, difficultyBlack: 38,
    snowCannons: 40, snowCannonKm: 12,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 44,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Freeride"],
    description: "The ultimate insider resort in Tarentaise beloved by powder skiers for uncrowded off-piste terrain and authentic Savoyard farming village character. Located between Les Arcs and Val d'Isere with some of the finest untracked freeride routes in the Alps.",
    image: "https://picsum.photos/seed/sainte-foy/800/500",
    images: ["https://picsum.photos/seed/sainte-foy-1/1200/700", "https://picsum.photos/seed/sainte-foy-2/1200/700", "https://picsum.photos/seed/sainte-foy-3/1200/700"],
    weather: { temp: -8, snowDepth: 200, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 90, snowDepthMid: 170, snowDepthTop: 255, snowType: "Powder",
    liftsOpen: 7, liftsTotal: 8, pistesOpen: 18, pistesTotal: 20,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Traditional farming village landscape preservation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" },
      { airport: "Chambery", iata: "CMF", driveTime: "2h" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" }
    ],
    trainStation: "Bourg-Saint-Maurice - 15km, TGV Neige and Eurostar",
    shuttle: true, shuttleDesc: "TGV Neige and Eurostar Ski Train stop at Bourg-Saint-Maurice",
    parking: { capacity: 600, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Plan de l'Aiguille Restaurant", zone: "2620m", cuisine: "French Alpine", price: "€€" },
        { name: "Chez Leon", zone: "Village 1550m", cuisine: "Savoyard", price: "€€" },
        { name: "Ferme de Sainte-Foy", zone: "Village", cuisine: "French", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 38, privateLessonFrom: 98,
      languages: ["🇫🇷", "🇬🇧"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 46,
      kidsGarden: false, kidsGardenAge: "", babysitting: false,
      lockerCount: 180, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Bourg-Saint-Maurice (15km)",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Sainte-Foy is one of the few genuine farming villages in the Tarentaise that has become a ski resort without losing its character. Cattle still graze the lower slopes in summer and traditional wooden barns remain throughout the village.",
      nearbyTowns: [
        { name: "Sainte-Foy-Tarentaise", distance: "0km", desc: "Authentic Tarentaise farming village resort" },
        { name: "Bourg-Saint-Maurice", distance: "15km", desc: "Tarentaise ski train hub" },
        { name: "Les Arcs", distance: "18km", desc: "Paradiski linked resort" }
      ],
      activities: ["Freeride tours", "Snowshoeing", "Touring", "Village walks"],
      touristBoard: "Sainte-Foy-Tarentaise Tourism",
      touristBoardUrl: "https://www.saintefoy.net",
      emergency: "112",
      hospital: "Centre Hospitalier Bourg-Saint-Maurice (15km)"
    },
    webcams: [
      { name: "Plan de l'Aiguille 2620m", seed: "sainte-foy-cam1" },
      { name: "Sainte-Foy village", seed: "sainte-foy-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Sainte-Foy Pow Wow", type: "Festival", desc: "Annual powder skiing and freeride gathering" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 44, child: 22, senior: 35, badge: null },
      { type: "3-day", adult: 121, child: 61, senior: 97, badge: null },
      { type: "6-day", adult: 226, child: 113, senior: 181, badge: "Best value" },
      { type: "Season", adult: 1020, child: 510, senior: 816, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.9,
      breakdown: { pistes: 9.0, lifts: 8.7, apresSki: 8.2, value: 9.6, beginners: 6.5 },
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
    id: "la-clusaz",
    name: "La Clusaz",
    countries: ["France"],
    countryCode: "FR",
    region: "Haute-Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.90, lng: 6.43,
    minAltitude: 1100, maxAltitude: 2616,
    verticalDrop: 1516,
    pisteKm: 132, runs: 84, lifts: 50,
    gondolas: 13, chairlifts: 26, dragLifts: 11,
    longestRun: 11,
    difficultyBlue: 37, difficultyRed: 44, difficultyBlack: 19,
    snowCannons: 280, snowCannonKm: 82,
    seasonStart: "2024-11-23", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 52,
    seasonDates: "23 Nov 2024 - 20 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "The most accessible major ski resort from Geneva located just 45 minutes away in the Aravis range. An authentic Savoyard village with traditional architecture and a weekly cattle market in winter giving it a unique character.",
    image: "https://picsum.photos/seed/la-clusaz/800/500",
    images: ["https://picsum.photos/seed/la-clusaz-1/1200/700", "https://picsum.photos/seed/la-clusaz-2/1200/700", "https://picsum.photos/seed/la-clusaz-3/1200/700"],
    weather: { temp: -5, snowDepth: 155, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 125, snowDepthTop: 185, snowType: "Packed powder",
    liftsOpen: 45, liftsTotal: 50, pistesOpen: 75, pistesTotal: 84,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Aravis natural reserve stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "45m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h" },
      { airport: "Chambery", iata: "CMF", driveTime: "1h 30m" }
    ],
    trainStation: "Annecy - 35km bus",
    shuttle: false, shuttleDesc: "Bus from Annecy",
    parking: { capacity: 2500, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "L'Esquinade", zone: "2200m", cuisine: "French Alpine", price: "€€€" },
        { name: "La Clusaz Village Savoyard", zone: "Village", cuisine: "Savoyard", price: "€€" },
        { name: "Chalet Pointe Percee", zone: "1900m", cuisine: "French", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 42, privateLessonFrom: 115,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 700, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 14, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "La Clusaz village",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "La Clusaz sits in the Aravis range above the Annecy lake basin. The local Reblochon cheese is produced in the valleys below and farm visits are possible throughout the winter season.",
      nearbyTowns: [
        { name: "La Clusaz", distance: "0km", desc: "Authentic Savoyard resort, 45min from Geneva" },
        { name: "Annecy", distance: "35km", desc: "Beautiful lake city, gateway from Geneva" },
        { name: "Le Grand-Bornand", distance: "8km", desc: "Linked Aravis resort" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Ice skating", "Spa & wellness", "Reblochon farm visits"],
      touristBoard: "La Clusaz Tourism",
      touristBoardUrl: "https://www.laclusaz.com",
      emergency: "112",
      hospital: "Centre Hospitalier Annecy (35km)"
    },
    webcams: [
      { name: "Beauregard 1900m", seed: "la-clusaz-cam1" },
      { name: "La Clusaz village", seed: "la-clusaz-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "La Clusaz Biathlon Pop", type: "Competition", desc: "Biathlon initiation event for the public" }
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
      breakdown: { pistes: 8.7, lifts: 8.6, apresSki: 8.7, value: 9.2, beginners: 9.2 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "partial" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "partial" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "les-menuires",
    name: "Les Menuires",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.33, lng: 6.54,
    minAltitude: 1850, maxAltitude: 3230,
    verticalDrop: 1380,
    pisteKm: 160, runs: 71, lifts: 40,
    gondolas: 10, chairlifts: 21, dragLifts: 9,
    longestRun: 13,
    difficultyBlue: 35, difficultyRed: 44, difficultyBlack: 21,
    snowCannons: 390, snowCannonKm: 95,
    seasonStart: "2024-11-23", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 62,
    seasonDates: "23 Nov 2024 - 4 May 2025",
    seasonPasses: ["epic-pass"],
    resortTypes: ["Alpine", "Family resort"],
    description: "The best value entry point to Les Trois Vallees network sitting at 1850m with direct access to Val Thorens above and Meribel to the north. High base altitude ensures reliable snow and the resort has undergone significant architectural improvement in recent years.",
    image: "https://picsum.photos/seed/les-menuires/800/500",
    images: ["https://picsum.photos/seed/les-menuires-1/1200/700", "https://picsum.photos/seed/les-menuires-2/1200/700", "https://picsum.photos/seed/les-menuires-3/1200/700"],
    weather: { temp: -8, snowDepth: 195, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 90, snowDepthMid: 160, snowDepthTop: 240, snowType: "Packed powder",
    liftsOpen: 36, liftsTotal: 40, pistesOpen: 64, pistesTotal: 71,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Belleville valley ecological restoration"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" },
      { airport: "Chambery", iata: "CMF", driveTime: "1h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h" }
    ],
    trainStation: "Moutiers - 28km bus",
    shuttle: false, shuttleDesc: "Bus from Moutiers",
    parking: { capacity: 3500, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Les Menuires Summit Resto", zone: "2850m", cuisine: "French Alpine", price: "€€" },
        { name: "La Creole Chalet", zone: "Village", cuisine: "Savoyard", price: "€€" },
        { name: "Bruyere Brasserie", zone: "Village", cuisine: "French", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 46, privateLessonFrom: 130,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 62,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 18, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Les Menuires village",
      pharmacy: true, atm: true, atmCount: 6
    },
    surroundings: {
      description: "Les Menuires was originally built in the 1960s with a Brutalist architecture that became dated. The resort has invested heavily in renovation and now presents a much improved village appearance. Its high altitude of 1850m is its key advantage.",
      nearbyTowns: [
        { name: "Les Menuires", distance: "0km", desc: "Value entry to Les Trois Vallees at 1850m" },
        { name: "Val Thorens", distance: "8km via ski area", desc: "Europes highest resort linked above" },
        { name: "Moutiers", distance: "28km", desc: "Tarentaise valley gateway with train" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Cross-country skiing"],
      touristBoard: "Les Menuires Tourism",
      touristBoardUrl: "https://www.lesmenuires.com",
      emergency: "112",
      hospital: "Centre Hospitalier Moutiers (28km)"
    },
    webcams: [
      { name: "Masse 2850m", seed: "les-menuires-cam1" },
      { name: "Les Menuires village", seed: "les-menuires-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Les Menuires Spring Festival", type: "Festival", desc: "End of season celebrations in the Belleville valley" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 62, child: 31, senior: 50, badge: null },
      { type: "3-day", adult: 171, child: 86, senior: 137, badge: null },
      { type: "6-day", adult: 319, child: 160, senior: 255, badge: "Best value" },
      { type: "Season", adult: 1450, child: 725, senior: 1160, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 9.0, lifts: 8.8, apresSki: 8.6, value: 9.3, beginners: 9.2 },
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
    id: "vars-risoul",
    name: "Vars-Risoul",
    countries: ["France"],
    countryCode: "FR",
    region: "Hautes-Alpes, France",
    country: "France",
    flag: "🇫🇷",
    lat: 44.55, lng: 6.68,
    minAltitude: 1650, maxAltitude: 2750,
    verticalDrop: 1100,
    pisteKm: 185, runs: 86, lifts: 54,
    gondolas: 13, chairlifts: 29, dragLifts: 12,
    longestRun: 12,
    difficultyBlue: 37, difficultyRed: 44, difficultyBlack: 19,
    snowCannons: 280, snowCannonKm: 82,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "14 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "Vars and Risoul connect to form La Foret Blanche in the southern Alps offering 185km of sunny skiing in one of the most snow-reliable areas of the Hautes-Alpes. Two villages with distinct characters - Vars traditional Provencal and Risoul modern at 1850m.",
    image: "https://picsum.photos/seed/vars-risoul/800/500",
    images: ["https://picsum.photos/seed/vars-1/1200/700", "https://picsum.photos/seed/vars-2/1200/700", "https://picsum.photos/seed/vars-3/1200/700"],
    weather: { temp: -4, snowDepth: 145, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 170, snowType: "Packed powder",
    liftsOpen: 48, liftsTotal: 54, pistesOpen: 77, pistesTotal: 86,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Ubaye valley biodiversity program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Turin", iata: "TRN", driveTime: "2h 30m" },
      { airport: "Grenoble", iata: "GNB", driveTime: "2h 30m" },
      { airport: "Marseille", iata: "MRS", driveTime: "3h" }
    ],
    trainStation: "Briancon - 35km bus",
    shuttle: false, shuttleDesc: "Bus from Briancon",
    parking: { capacity: 2500, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Risoul Summit Resto", zone: "2600m", cuisine: "French Alpine", price: "€€" },
        { name: "Vars Village Auberge", zone: "Village", cuisine: "Provencal", price: "€€" },
        { name: "La Foret Blanche Bar", zone: "Mid-mountain", cuisine: "French", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 40, privateLessonFrom: 105,
      languages: ["🇫🇷", "🇬🇧"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 650, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 12, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Vars village",
      pharmacy: false, atm: true, atmCount: 4
    },
    surroundings: {
      description: "The Vars massif is in the southern Hautes-Alpes near the Mercantour national park. The strong sunshine of the southern Alps means excellent spring skiing well into April.",
      nearbyTowns: [
        { name: "Vars", distance: "0km", desc: "Traditional Provencal ski village" },
        { name: "Risoul", distance: "5km via ski area", desc: "Modern high-altitude linked village" },
        { name: "Guillestre", distance: "15km", desc: "Hautes-Alpes valley town" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Winter hiking", "Mercanatur park tours"],
      touristBoard: "Vars-Risoul Tourism",
      touristBoardUrl: "https://www.vars.com",
      emergency: "112",
      hospital: "Centre Hospitalier Briancon (35km)"
    },
    webcams: [
      { name: "Vars 2750m", seed: "vars-cam1" },
      { name: "Risoul village", seed: "vars-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Speed Ski World Cup Vars", type: "Competition", desc: "FIS Speed Ski World Cup on the Les Escoyeres track" }
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
      overall: 8.6,
      breakdown: { pistes: 8.7, lifts: 8.5, apresSki: 8.3, value: 9.3, beginners: 9.2 },
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
    id: "valloire",
    name: "Valloire",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.16, lng: 6.43,
    minAltitude: 1430, maxAltitude: 2600,
    verticalDrop: 1170,
    pisteKm: 150, runs: 58, lifts: 33,
    gondolas: 8, chairlifts: 18, dragLifts: 7,
    longestRun: 11,
    difficultyBlue: 36, difficultyRed: 44, difficultyBlack: 20,
    snowCannons: 280, snowCannonKm: 82,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "A beautiful and authentic Savoyard village at the foot of the Galibier Pass offering 150km of skiing combined with Valmeinier. The village church and traditional architecture make it one of the most photogenic resorts in France.",
    image: "https://picsum.photos/seed/valloire/800/500",
    images: ["https://picsum.photos/seed/valloire-1/1200/700", "https://picsum.photos/seed/valloire-2/1200/700", "https://picsum.photos/seed/valloire-3/1200/700"],
    weather: { temp: -5, snowDepth: 155, condition: "Clear", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 125, snowDepthTop: 185, snowType: "Packed powder",
    liftsOpen: 29, liftsTotal: 33, pistesOpen: 52, pistesTotal: 58,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Galibier Pass natural heritage protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Turin", iata: "TRN", driveTime: "2h" },
      { airport: "Grenoble", iata: "GNB", driveTime: "2h" },
      { airport: "Chambery", iata: "CMF", driveTime: "1h 30m" }
    ],
    trainStation: "Saint-Michel-de-Maurienne - 18km, TGV and Intercite",
    shuttle: true, shuttleDesc: "TGV and Intercite trains stop at Saint-Michel-de-Maurienne",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Setaz Summit Restaurant", zone: "2400m", cuisine: "Savoyard", price: "€€" },
        { name: "Valloire Village Auberge", zone: "Village", cuisine: "French", price: "€€" },
        { name: "Choucas Bar", zone: "Village", cuisine: "French", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 105,
      languages: ["🇫🇷", "🇬🇧"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 550, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: true, medicalLocation: "Valloire village",
      pharmacy: false, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Valloire is one of the most picturesque villages in the French Alps, dominated by its 17th century Baroque church. The Galibier pass at 2642m is one of the highest road passes in France and a legendary Tour de France climb.",
      nearbyTowns: [
        { name: "Valloire", distance: "0km", desc: "Picturesque Baroque church village" },
        { name: "Saint-Michel-de-Maurienne", distance: "18km", desc: "Maurienne valley town with TGV station" },
        { name: "Modane", distance: "25km", desc: "Frejus tunnel gateway" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Village architecture tours", "Winter hiking"],
      touristBoard: "Valloire Tourism",
      touristBoardUrl: "https://www.valloire.net",
      emergency: "112",
      hospital: "Centre Hospitalier Saint-Jean-de-Maurienne (25km)"
    },
    webcams: [
      { name: "Crey du Quart 2600m", seed: "valloire-cam1" },
      { name: "Valloire village", seed: "valloire-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Valloire Snow Sculptures", type: "Festival", desc: "International snow sculpture competition in the village" }
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
      overall: 8.6,
      breakdown: { pistes: 8.6, lifts: 8.5, apresSki: 8.5, value: 9.3, beginners: 9.2 },
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
    id: "les-sybelles",
    name: "Les Sybelles",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.22, lng: 6.27,
    minAltitude: 1300, maxAltitude: 2620,
    verticalDrop: 1320,
    pisteKm: 310, runs: 111, lifts: 72,
    gondolas: 18, chairlifts: 38, dragLifts: 16,
    longestRun: 13,
    difficultyBlue: 40, difficultyRed: 42, difficultyBlack: 18,
    snowCannons: 450, snowCannonKm: 145,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.5, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "14 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "The sixth largest ski area in France connecting six villages including Le Corbier, La Toussuire and Saint-Sorlin-d'Arves in the Maurienne valley. Underrated but substantial with good value lift passes and predominantly intermediate terrain above the treeline.",
    image: "https://picsum.photos/seed/les-sybelles/800/500",
    images: ["https://picsum.photos/seed/les-sybelles-1/1200/700", "https://picsum.photos/seed/les-sybelles-2/1200/700", "https://picsum.photos/seed/les-sybelles-3/1200/700"],
    weather: { temp: -6, snowDepth: 165, condition: "Clear", forecast: [
      { day: "Today", high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "partly_cloudy" },
      { day: "Thu", high: -7, low: -13, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 130, snowDepthTop: 195, snowType: "Packed powder",
    liftsOpen: 64, liftsTotal: 72, pistesOpen: 99, pistesTotal: 111,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Maurienne valley renewable energy cooperation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Chambery", iata: "CMF", driveTime: "1h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h" },
      { airport: "Grenoble", iata: "GNB", driveTime: "2h" }
    ],
    trainStation: "Saint-Jean-de-Maurienne - 25km, TGV Lyon-Turin line",
    shuttle: true, shuttleDesc: "TGV trains from Paris stop at Saint-Jean-de-Maurienne on the Lyon-Turin line",
    parking: { capacity: 3000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Le Corbier Summit Resto", zone: "2200m", cuisine: "French Alpine", price: "€€" },
        { name: "La Toussuire Village", zone: "Village", cuisine: "Savoyard", price: "€€" },
        { name: "Saint-Sorlin Chalet Bar", zone: "Village", cuisine: "French", price: "€" }
      ],
      skiSchools: 2, groupLessonFrom: 40, privateLessonFrom: 105,
      languages: ["🇫🇷", "🇬🇧"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 800, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 16, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Le Corbier village",
      pharmacy: false, atm: true, atmCount: 5
    },
    surroundings: {
      description: "The Sybelles connects the Arves massif villages above the Maurienne valley. The area is less well known than the Tarentaise resorts but offers comparable terrain at significantly better value.",
      nearbyTowns: [
        { name: "Saint-Jean-de-Maurienne", distance: "25km", desc: "Maurienne valley capital with TGV station" },
        { name: "Le Corbier", distance: "0km", desc: "Main Sybelles resort village" },
        { name: "Saint-Sorlin-d'Arves", distance: "8km via ski area", desc: "Traditional Arves valley village" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Winter hiking", "Maurienne heritage tours"],
      touristBoard: "Les Sybelles Tourism",
      touristBoardUrl: "https://www.lessybelles.com",
      emergency: "112",
      hospital: "Centre Hospitalier Saint-Jean-de-Maurienne (25km)"
    },
    webcams: [
      { name: "Le Corbier 2200m", seed: "les-sybelles-cam1" },
      { name: "La Toussuire village", seed: "les-sybelles-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Sybelles Snow Challenge", type: "Competition", desc: "Giant slalom race across the six villages" }
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
      overall: 8.5,
      breakdown: { pistes: 8.6, lifts: 8.4, apresSki: 8.2, value: 9.4, beginners: 9.3 },
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
    id: "puy-saint-vincent",
    name: "Puy-Saint-Vincent",
    countries: ["France"],
    countryCode: "FR",
    region: "Hautes-Alpes, France",
    country: "France",
    flag: "🇫🇷",
    lat: 44.83, lng: 6.49,
    minAltitude: 1400, maxAltitude: 2748,
    verticalDrop: 1348,
    pisteKm: 75, runs: 48, lifts: 18,
    gondolas: 5, chairlifts: 10, dragLifts: 3,
    longestRun: 9,
    difficultyBlue: 32, difficultyRed: 44, difficultyBlack: 24,
    snowCannons: 90, snowCannonKm: 34,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "14 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "An underrated gem of the southern French Alps offering 75km of varied terrain from a compact well-designed ski area. North-facing aspect ensures excellent snow retention and exceptional value compared to more famous northern Alps resorts.",
    image: "https://picsum.photos/seed/puy-saint-vincent/800/500",
    images: ["https://picsum.photos/seed/puy-1/1200/700", "https://picsum.photos/seed/puy-2/1200/700", "https://picsum.photos/seed/puy-3/1200/700"],
    weather: { temp: -5, snowDepth: 150, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 68, snowDepthMid: 120, snowDepthTop: 180, snowType: "Packed powder",
    liftsOpen: 16, liftsTotal: 18, pistesOpen: 43, pistesTotal: 48,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Ecrins national park adjacent stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Grenoble", iata: "GNB", driveTime: "1h 30m" },
      { airport: "Turin", iata: "TRN", driveTime: "2h 30m" },
      { airport: "Marseille", iata: "MRS", driveTime: "3h" }
    ],
    trainStation: "Briancon - 20km bus",
    shuttle: false, shuttleDesc: "Bus from Briancon",
    parking: { capacity: 1500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "PSV Summit Restaurant", zone: "2748m", cuisine: "French Alpine", price: "€€" },
        { name: "Puy 1600 Village Bar", zone: "1600m", cuisine: "French", price: "€€" },
        { name: "Puy 1400 Brasserie", zone: "1400m", cuisine: "French", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 38, privateLessonFrom: 98,
      languages: ["🇫🇷", "🇬🇧"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 46,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 380, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "L'Argentiere-la-Bessee (12km)",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Puy-Saint-Vincent is named after the patron saint of the local village and is adjacent to the Ecrins national park, one of the wildest mountain landscapes in France. The Durance river valley below is one of the sunniest in the French Alps.",
      nearbyTowns: [
        { name: "L'Argentiere-la-Bessee", distance: "12km", desc: "Durance valley market town" },
        { name: "Briancon", distance: "20km", desc: "Highest town in France with Vauban fortress" },
        { name: "Embrun", distance: "30km", desc: "Lac de Serre-Poncon resort town" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ecrins park tours", "Cross-country skiing"],
      touristBoard: "Puy-Saint-Vincent Tourism",
      touristBoardUrl: "https://www.puy-saint-vincent.com",
      emergency: "112",
      hospital: "Centre Hospitalier Briancon (20km)"
    },
    webcams: [
      { name: "PSV summit 2748m", seed: "puy-cam1" },
      { name: "Puy 1600m base", seed: "puy-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "PSV Slalom Classic", type: "Competition", desc: "Annual slalom race open to all" }
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
      breakdown: { pistes: 8.4, lifts: 8.2, apresSki: 8.0, value: 9.5, beginners: 9.2 },
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
    id: "valmorel",
    name: "Valmorel",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.46, lng: 6.45,
    minAltitude: 1400, maxAltitude: 2550,
    verticalDrop: 1150,
    pisteKm: 165, runs: 84, lifts: 52,
    gondolas: 13, chairlifts: 28, dragLifts: 11,
    longestRun: 11,
    difficultyBlue: 38, difficultyRed: 44, difficultyBlack: 18,
    snowCannons: 350, snowCannonKm: 95,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 52,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "One of Frances most charming purpose-built resorts designed in traditional Savoyard style with stone and wood chalets rather than concrete. The Grand Domaine extends to Saint-Francois-Longchamp for 165km of predominantly intermediate terrain.",
    image: "https://picsum.photos/seed/valmorel/800/500",
    images: ["https://picsum.photos/seed/valmorel-1/1200/700", "https://picsum.photos/seed/valmorel-2/1200/700", "https://picsum.photos/seed/valmorel-3/1200/700"],
    weather: { temp: -5, snowDepth: 155, condition: "Clear", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 125, snowDepthTop: 185, snowType: "Packed powder",
    liftsOpen: 46, liftsTotal: 52, pistesOpen: 75, pistesTotal: 84,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Traditional Savoyard village architectural charter"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Chambery", iata: "CMF", driveTime: "1h 30m" },
      { airport: "Geneva", iata: "GVA", driveTime: "2h" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h" }
    ],
    trainStation: "Moutiers - 16km bus",
    shuttle: false, shuttleDesc: "Bus from Moutiers",
    parking: { capacity: 2000, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Altispace Restaurant", zone: "2550m", cuisine: "French Alpine", price: "€€€" },
        { name: "Valmorel Village Savoyard", zone: "Village", cuisine: "Savoyard", price: "€€" },
        { name: "Chasse-Montagne Bar", zone: "Village", cuisine: "French", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 42, privateLessonFrom: 115,
      languages: ["🇫🇷", "🇬🇧"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 650, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 12, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Valmorel village",
      pharmacy: false, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Valmorel was built in 1976 to a strict architectural charter requiring all buildings to use natural stone and wood. The pedestrian village centre is one of the most attractive of any purpose-built French resort.",
      nearbyTowns: [
        { name: "Valmorel", distance: "0km", desc: "Charming purpose-built Savoyard resort" },
        { name: "Moutiers", distance: "16km", desc: "Tarentaise valley gateway with train" },
        { name: "Bourg-Saint-Maurice", distance: "35km", desc: "Major ski train hub" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Ice skating", "Spa & wellness"],
      touristBoard: "Valmorel Tourism",
      touristBoardUrl: "https://www.valmorel.com",
      emergency: "112",
      hospital: "Centre Hospitalier Moutiers (16km)"
    },
    webcams: [
      { name: "Creve-Coeur 2550m", seed: "valmorel-cam1" },
      { name: "Valmorel village", seed: "valmorel-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Valmorel Ski Week", type: "Festival", desc: "Annual family ski week with races and entertainment" }
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
      overall: 8.6,
      breakdown: { pistes: 8.6, lifts: 8.5, apresSki: 8.6, value: 9.2, beginners: 9.3 },
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
    id: "chamrousse",
    name: "Chamrousse",
    countries: ["France"],
    countryCode: "FR",
    region: "Isere, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.12, lng: 5.89,
    minAltitude: 1370, maxAltitude: 2253,
    verticalDrop: 883,
    pisteKm: 90, runs: 42, lifts: 22,
    gondolas: 6, chairlifts: 12, dragLifts: 4,
    longestRun: 9,
    difficultyBlue: 36, difficultyRed: 46, difficultyBlack: 18,
    snowCannons: 140, snowCannonKm: 44,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.1, ratingLabel: "Excellent", priceFrom: 44,
    seasonDates: "14 Dec 2024 - 6 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "The main ski resort of the Belledonne range above Grenoble host of alpine events in the 1968 Winter Olympics. Excellent north-facing terrain with views of the Vercors and Chartreuse massifs and very popular with day visitors from the Grenoble metropolis.",
    image: "https://picsum.photos/seed/chamrousse/800/500",
    images: ["https://picsum.photos/seed/chamrousse-1/1200/700", "https://picsum.photos/seed/chamrousse-2/1200/700", "https://picsum.photos/seed/chamrousse-3/1200/700"],
    weather: { temp: -4, snowDepth: 130, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 60, snowDepthMid: 105, snowDepthTop: 155, snowType: "Packed powder",
    liftsOpen: 19, liftsTotal: 22, pistesOpen: 37, pistesTotal: 42,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Belledonne nature reserve management"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Grenoble", iata: "GNB", driveTime: "45m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h" },
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" }
    ],
    trainStation: "Grenoble - 30km bus",
    shuttle: false, shuttleDesc: "Bus from Grenoble",
    parking: { capacity: 2500, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Croix de Chamrousse", zone: "2253m", cuisine: "French Alpine", price: "€€" },
        { name: "Recoin Base Restaurant", zone: "1650m", cuisine: "French", price: "€€" },
        { name: "1750 Village Brasserie", zone: "Village", cuisine: "French", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 36, privateLessonFrom: 92,
      languages: ["🇫🇷", "🇬🇧"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 450, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: false, medicalLocation: "Grenoble (30km)",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Chamrousse hosted the downhill, slalom and giant slalom events of the 1968 Grenoble Winter Olympics. The resort remains the closest major ski area to Grenoble and is very popular with the large student population of the university city.",
      nearbyTowns: [
        { name: "Uriage-les-Bains", distance: "15km", desc: "Thermal spa town below the resort" },
        { name: "Grenoble", distance: "30km", desc: "Isere capital, largest Alpine city in France" },
        { name: "Vizille", distance: "20km", desc: "Chateau and Dauphinois history museum" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Olympic heritage visits", "Spa & wellness at Uriage"],
      touristBoard: "Chamrousse Tourism",
      touristBoardUrl: "https://www.chamrousse.com",
      emergency: "112",
      hospital: "CHU Grenoble (30km)"
    },
    webcams: [
      { name: "Croix de Chamrousse 2253m", seed: "chamrousse-cam1" },
      { name: "Chamrousse base 1650m", seed: "chamrousse-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Chamrousse Olympic Day", type: "Festival", desc: "Celebration of the 1968 Winter Olympics heritage" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 44, child: 22, senior: 35, badge: null },
      { type: "3-day", adult: 121, child: 61, senior: 97, badge: null },
      { type: "6-day", adult: 226, child: 113, senior: 181, badge: "Best value" },
      { type: "Season", adult: 1020, child: 510, senior: 816, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.1,
      breakdown: { pistes: 8.1, lifts: 8.0, apresSki: 7.8, value: 9.4, beginners: 9.3 },
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
    id: "saint-lary",
    name: "Saint-Lary-Soulan",
    countries: ["France"],
    countryCode: "FR",
    region: "Hautes-Pyrenees, France",
    country: "France",
    flag: "🇫🇷",
    lat: 42.82, lng: 0.32,
    minAltitude: 830, maxAltitude: 2515,
    verticalDrop: 1685,
    pisteKm: 100, runs: 68, lifts: 36,
    gondolas: 9, chairlifts: 19, dragLifts: 8,
    longestRun: 11,
    difficultyBlue: 34, difficultyRed: 44, difficultyBlack: 22,
    snowCannons: 200, snowCannonKm: 58,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 44,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "The largest and most developed ski resort in the Hautes-Pyrenees rising from the charming village at 830m to the Cabane ski area at 2515m. Excellent snowmaking and a genuine Gascon mountain culture quite different from the Alpine resorts.",
    image: "https://picsum.photos/seed/saint-lary/800/500",
    images: ["https://picsum.photos/seed/saint-lary-1/1200/700", "https://picsum.photos/seed/saint-lary-2/1200/700", "https://picsum.photos/seed/saint-lary-3/1200/700"],
    weather: { temp: -3, snowDepth: 115, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -1, low: -7, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -2, low: -8, condition: "clear" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 50, snowDepthMid: 95, snowDepthTop: 145, snowType: "Machine-groomed",
    liftsOpen: 32, liftsTotal: 36, pistesOpen: 61, pistesTotal: 68,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Pyrenees national park boundary stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Tarbes-Lourdes", iata: "LDE", driveTime: "1h" },
      { airport: "Toulouse", iata: "TLS", driveTime: "2h" },
      { airport: "Pau", iata: "PUF", driveTime: "1h 30m" }
    ],
    trainStation: "Tarbes - 55km bus",
    shuttle: false, shuttleDesc: "Bus from Tarbes",
    parking: { capacity: 2000, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Cabane Summit Resto", zone: "2515m", cuisine: "Gascon Alpine", price: "€€" },
        { name: "Saint-Lary Village Auberge", zone: "Village", cuisine: "Gascon", price: "€€" },
        { name: "Espiau 1700 Bar", zone: "1700m", cuisine: "French", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 36, privateLessonFrom: 92,
      languages: ["🇫🇷", "🇬🇧", "🇪🇸"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 480, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 8, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Saint-Lary village",
      pharmacy: true, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Saint-Lary is in the Aure valley in the central Pyrenees near the Spanish border. The resort also has a famous thermal spa and the local Gascon cuisine is quite different from Alpine food traditions.",
      nearbyTowns: [
        { name: "Saint-Lary-Soulan", distance: "0km", desc: "Hautes-Pyrenees village with thermal spa" },
        { name: "Arreau", distance: "15km", desc: "Aure valley market town" },
        { name: "Lourdes", distance: "55km", desc: "Famous pilgrimage city" }
      ],
      activities: ["Thermal spa", "Snowshoeing", "Cross-country skiing", "Winter hiking", "Pyrenean fauna watching"],
      touristBoard: "Saint-Lary Tourism",
      touristBoardUrl: "https://www.saintlary.com",
      emergency: "112",
      hospital: "Centre Hospitalier Tarbes (55km)"
    },
    webcams: [
      { name: "Cabane 2515m", seed: "saint-lary-cam1" },
      { name: "Saint-Lary village", seed: "saint-lary-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Saint-Lary Pyrenees Week", type: "Festival", desc: "Annual winter celebration of Pyrenean culture" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 44, child: 22, senior: 35, badge: null },
      { type: "3-day", adult: 121, child: 61, senior: 97, badge: null },
      { type: "6-day", adult: 226, child: 113, senior: 181, badge: "Best value" },
      { type: "Season", adult: 1020, child: 510, senior: 816, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.4,
      breakdown: { pistes: 8.5, lifts: 8.3, apresSki: 8.4, value: 9.4, beginners: 9.3 },
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
    id: "grand-tourmalet",
    name: "Grand Tourmalet",
    countries: ["France"],
    countryCode: "FR",
    region: "Hautes-Pyrenees, France",
    country: "France",
    flag: "🇫🇷",
    lat: 42.89, lng: 0.14,
    minAltitude: 1250, maxAltitude: 2500,
    verticalDrop: 1250,
    pisteKm: 100, runs: 47, lifts: 30,
    gondolas: 8, chairlifts: 16, dragLifts: 6,
    longestRun: 10,
    difficultyBlue: 36, difficultyRed: 43, difficultyBlack: 21,
    snowCannons: 160, snowCannonKm: 46,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 44,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "The largest ski area in the Pyrenees connecting La Mongie and Bareges across the famous Tour de France cycling pass. 100km of predominantly intermediate skiing with spectacular Pyrenean panoramas and a distinctly French Gascony character.",
    image: "https://picsum.photos/seed/grand-tourmalet/800/500",
    images: ["https://picsum.photos/seed/tourmalet-1/1200/700", "https://picsum.photos/seed/tourmalet-2/1200/700", "https://picsum.photos/seed/tourmalet-3/1200/700"],
    weather: { temp: -4, snowDepth: 125, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 100, snowDepthTop: 150, snowType: "Packed powder",
    liftsOpen: 27, liftsTotal: 30, pistesOpen: 42, pistesTotal: 47,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Pyrenees national park wildlife corridor"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Tarbes-Lourdes", iata: "LDE", driveTime: "1h" },
      { airport: "Toulouse", iata: "TLS", driveTime: "2h 30m" },
      { airport: "Pau", iata: "PUF", driveTime: "1h 30m" }
    ],
    trainStation: "Tarbes - 50km bus",
    shuttle: false, shuttleDesc: "Bus from Tarbes",
    parking: { capacity: 2500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Pic du Midi Restaurant", zone: "2877m observatory", cuisine: "Alpine", price: "€€€" },
        { name: "La Mongie Brasserie", zone: "La Mongie 1800m", cuisine: "Gascon", price: "€€" },
        { name: "Bareges Village Bar", zone: "Bareges 1250m", cuisine: "French", price: "€" }
      ],
      skiSchools: 2, groupLessonFrom: 36, privateLessonFrom: 92,
      languages: ["🇫🇷", "🇬🇧", "🇪🇸"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 500, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 9, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "La Mongie village",
      pharmacy: false, atm: true, atmCount: 3
    },
    surroundings: {
      description: "The Tourmalet pass is the most frequently featured mountain in Tour de France history. The Pic du Midi observatory at 2877m has one of the best astronomical sites in Europe and is accessible by cable car from La Mongie.",
      nearbyTowns: [
        { name: "Bagneres-de-Bigorre", distance: "25km", desc: "Bigorre valley thermal spa town" },
        { name: "Lourdes", distance: "40km", desc: "World-famous Catholic pilgrimage city" },
        { name: "Pau", iata: "PUF", desc: "Pyrenees-Atlantiques capital" }
      ],
      activities: ["Pic du Midi visits", "Snowshoeing", "Cross-country skiing", "Pyrenean wildlife watching"],
      touristBoard: "Grand Tourmalet Tourism",
      touristBoardUrl: "https://www.grand-tourmalet.com",
      emergency: "112",
      hospital: "Centre Hospitalier Tarbes (50km)"
    },
    webcams: [
      { name: "Pic du Midi 2877m", seed: "tourmalet-cam1" },
      { name: "La Mongie 1800m", seed: "tourmalet-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Grand Tourmalet Ski Weekend", type: "Competition", desc: "Annual giant slalom and snowboard race event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 44, child: 22, senior: 35, badge: null },
      { type: "3-day", adult: 121, child: 61, senior: 97, badge: null },
      { type: "6-day", adult: 226, child: 113, senior: 181, badge: "Best value" },
      { type: "Season", adult: 1020, child: 510, senior: 816, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.3,
      breakdown: { pistes: 8.4, lifts: 8.2, apresSki: 8.2, value: 9.4, beginners: 9.3 },
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
    id: "isola-2000",
    name: "Isola 2000",
    countries: ["France"],
    countryCode: "FR",
    region: "Alpes-Maritimes, France",
    country: "France",
    flag: "🇫🇷",
    lat: 44.19, lng: 7.17,
    minAltitude: 2000, maxAltitude: 2610,
    verticalDrop: 610,
    pisteKm: 120, runs: 46, lifts: 22,
    gondolas: 6, chairlifts: 12, dragLifts: 4,
    longestRun: 9,
    difficultyBlue: 36, difficultyRed: 45, difficultyBlack: 19,
    snowCannons: 175, snowCannonKm: 58,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "The closest major ski resort to the French Riviera sitting at 2000m base altitude just 90 minutes from Nice. Modern purpose-built resort with excellent reliable snow conditions despite the southern latitude and a popular weekend destination for the Riviera population.",
    image: "https://picsum.photos/seed/isola-2000/800/500",
    images: ["https://picsum.photos/seed/isola-1/1200/700", "https://picsum.photos/seed/isola-2/1200/700", "https://picsum.photos/seed/isola-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 65, snowDepthMid: 110, snowDepthTop: 160, snowType: "Machine-groomed",
    liftsOpen: 19, liftsTotal: 22, pistesOpen: 41, pistesTotal: 46,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Mercantour national park adjacent conservation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Nice", iata: "NCE", driveTime: "1h 30m" },
      { airport: "Marseille", iata: "MRS", driveTime: "3h" },
      { airport: "Turin", iata: "TRN", driveTime: "2h 30m" }
    ],
    trainStation: "Nice - 90km bus",
    shuttle: false, shuttleDesc: "Bus from Nice",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Isola Summit Resto", zone: "2610m", cuisine: "French Alpine", price: "€€" },
        { name: "Isola Village Brasserie", zone: "Village", cuisine: "Nicoise", price: "€€" },
        { name: "Plan Coulet Bar", zone: "Mid-mountain", cuisine: "French", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 38, privateLessonFrom: 98,
      languages: ["🇫🇷", "🇬🇧", "🇮🇹"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 46,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 450, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Isola village",
      pharmacy: false, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Isola 2000 is adjacent to the Mercantour national park and close to the Italian border. The unique combination of Mediterranean climate below and reliable snow above 2000m makes it unlike any other French resort.",
      nearbyTowns: [
        { name: "Saint-Etienne-de-Tinee", distance: "15km", desc: "Tinee valley traditional village" },
        { name: "Nice", distance: "90km", desc: "French Riviera capital with international airport" },
        { name: "Cuneo (Italy)", distance: "40km", desc: "Piedmont city near the border" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Mercantour park wildlife tours", "Winter hiking"],
      touristBoard: "Isola 2000 Tourism",
      touristBoardUrl: "https://www.isola2000.com",
      emergency: "112",
      hospital: "Centre Hospitalier Nice (90km)"
    },
    webcams: [
      { name: "Isola summit 2610m", seed: "isola-cam1" },
      { name: "Isola village 2000m", seed: "isola-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Isola Riviera Ski Week", type: "Festival", desc: "Annual ski week popular with Nice and Monaco residents" }
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
      breakdown: { pistes: 8.4, lifts: 8.3, apresSki: 8.4, value: 9.3, beginners: 9.3 },
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
    id: "la-rosiere",
    name: "La Rosiere",
    countries: ["France", "Italy"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.64, lng: 6.85,
    minAltitude: 1850, maxAltitude: 2809,
    verticalDrop: 959,
    pisteKm: 160, runs: 44, lifts: 26,
    gondolas: 7, chairlifts: 14, dragLifts: 5,
    longestRun: 11,
    difficultyBlue: 34, difficultyRed: 45, difficultyBlack: 21,
    snowCannons: 130, snowCannonKm: 58,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Cross-border", "Family resort"],
    description: "Sits on the Petit Saint Bernard pass at 1850m connecting with La Thuile in Italy to form the Espace San Bernardo with 160km of cross-border skiing. High base altitude and predominantly north-facing aspect ensure excellent snow reliability throughout the season.",
    image: "https://picsum.photos/seed/la-rosiere/800/500",
    images: ["https://picsum.photos/seed/la-rosiere-1/1200/700", "https://picsum.photos/seed/la-rosiere-2/1200/700", "https://picsum.photos/seed/la-rosiere-3/1200/700"],
    weather: { temp: -7, snowDepth: 180, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 82, snowDepthMid: 148, snowDepthTop: 218, snowType: "Packed powder",
    liftsOpen: 23, liftsTotal: 26, pistesOpen: 39, pistesTotal: 44,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Franco-Italian Espace San Bernardo ecological charter"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" },
      { airport: "Turin", iata: "TRN", driveTime: "2h" },
      { airport: "Chambery", iata: "CMF", driveTime: "2h" }
    ],
    trainStation: "Bourg-Saint-Maurice - 22km, TGV Neige",
    shuttle: true, shuttleDesc: "TGV Neige stops at Bourg-Saint-Maurice",
    parking: { capacity: 1500, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Col du Mont Restaurant", zone: "2600m", cuisine: "Franco-Italian Alpine", price: "€€" },
        { name: "La Rosiere Village Brasserie", zone: "Village", cuisine: "Savoyard", price: "€€" },
        { name: "Alpage des Eucherts", zone: "2000m", cuisine: "French", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 42, privateLessonFrom: 110,
      languages: ["🇫🇷", "🇬🇧", "🇮🇹"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 380, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: false, medicalLocation: "Bourg-Saint-Maurice (22km)",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "La Rosiere sits on the Petit Saint Bernard pass, an ancient trading route between the Aosta valley and France used since Roman times. Hannibal is said to have crossed the Alps nearby with his elephants.",
      nearbyTowns: [
        { name: "La Rosiere", distance: "0km", desc: "High-altitude pass resort above Bourg-Saint-Maurice" },
        { name: "Bourg-Saint-Maurice", distance: "22km", desc: "Tarentaise ski train hub" },
        { name: "La Thuile (Italy)", distance: "15km via ski area", desc: "Italian partner resort across the pass" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Cross-border ski tours", "Winter hiking"],
      touristBoard: "La Rosiere Tourism",
      touristBoardUrl: "https://www.larosiere.net",
      emergency: "112",
      hospital: "Centre Hospitalier Bourg-Saint-Maurice (22km)"
    },
    webcams: [
      { name: "Col du Mont 2600m", seed: "la-rosiere-cam1" },
      { name: "La Rosiere village", seed: "la-rosiere-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "La Rosiere Family Week", type: "Festival", desc: "Annual family ski festival with races and entertainment" }
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
      overall: 8.6,
      breakdown: { pistes: 8.7, lifts: 8.5, apresSki: 8.3, value: 9.2, beginners: 9.2 },
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
    id: "la-grave",
    name: "La Grave-La Meije",
    countries: ["France"],
    countryCode: "FR",
    region: "Hautes-Alpes, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.05, lng: 6.31,
    minAltitude: 1450, maxAltitude: 3568,
    verticalDrop: 2118,
    pisteKm: 20, runs: 4, lifts: 4,
    gondolas: 2, chairlifts: 1, dragLifts: 1,
    longestRun: 20,
    difficultyBlue: 0, difficultyRed: 20, difficultyBlack: 80,
    snowCannons: 0, snowCannonKm: 0,
    seasonStart: "2024-12-07", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "chains",
    rating: 9.1, ratingLabel: "Exceptional", priceFrom: 42,
    seasonDates: "7 Dec 2024 - 4 May 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Freeride", "Expert"],
    description: "The most extreme ski destination in the Alps offering unpatrolled lift-accessed off-piste skiing from 3568m on the glaciers of La Meije. With just one two-stage cable car and virtually no groomed runs it is exclusively for expert and advanced skiers seeking raw high-alpine adventure.",
    image: "https://picsum.photos/seed/la-grave/800/500",
    images: ["https://picsum.photos/seed/la-grave-1/1200/700", "https://picsum.photos/seed/la-grave-2/1200/700", "https://picsum.photos/seed/la-grave-3/1200/700"],
    weather: { temp: -12, snowDepth: 280, condition: "Sunny", forecast: [
      { day: "Today", high: -10, low: -17, condition: "clear" },
      { day: "Tomorrow", high: -11, low: -18, condition: "clear" },
      { day: "Thu", high: -13, low: -20, condition: "snow" }
    ]},
    snowDepthBase: 130, snowDepthMid: 225, snowDepthTop: 340, snowType: "Powder",
    liftsOpen: 3, liftsTotal: 4, pistesOpen: 3, pistesTotal: 4,
    ecoRating: 4, ecoRenewable: 35, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["35% renewable electricity", "No snowmaking - entirely natural snow policy", "Minimal infrastructure philosophy"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Grenoble", iata: "GNB", driveTime: "1h 30m" },
      { airport: "Turin", iata: "TRN", driveTime: "2h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "3h" }
    ],
    trainStation: "Briancon - 32km bus",
    shuttle: false, shuttleDesc: "Bus from Briancon",
    parking: { capacity: 400, pricePerDay: 6, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Chancel Restaurant", zone: "3200m", cuisine: "French Alpine", price: "€€" },
        { name: "La Grave Village Cafe", zone: "Village 1450m", cuisine: "French", price: "€" },
        { name: "P'tit Maquis", zone: "Village", cuisine: "French", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 0, privateLessonFrom: 150,
      languages: ["🇫🇷", "🇬🇧"],
      creche: false, crecheAgeMin: 0, crecheAgeMax: 0, crecheFrom: 0,
      kidsGarden: false, kidsGardenAge: "", babysitting: false,
      lockerCount: 80, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 5, bootDryers: false,
      rentalShops: 1, rentalBrands: ["Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Briancon (32km)",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "La Grave is one of the last truly wild ski areas in the Alps. The village has barely changed since the 19th century when mountaineers came to attempt La Meije, one of the last great Alpine peaks to be summited. Guides are strongly recommended.",
      nearbyTowns: [
        { name: "La Grave", distance: "0km", desc: "Ancient glacial village unchanged since the 1800s" },
        { name: "Briancon", distance: "32km", desc: "Highest town in France, Vauban fortress" },
        { name: "Bourg-d'Oisans", distance: "25km", desc: "Romanche valley gateway" }
      ],
      activities: ["Expert off-piste", "Ski touring", "Ice climbing", "Alpinism", "Photography"],
      touristBoard: "La Grave Tourism",
      touristBoardUrl: "https://www.la-grave.com",
      emergency: "112",
      hospital: "Centre Hospitalier Briancon (32km)"
    },
    webcams: [
      { name: "La Meije 3568m", seed: "la-grave-cam1" },
      { name: "La Grave village", seed: "la-grave-cam2" }
    ],
    events: [
      { date: "Apr 2025", name: "La Grave Extreme Ski", type: "Competition", desc: "Freeride World Tour qualifier on La Meije" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 42, child: 21, senior: 34, badge: null },
      { type: "3-day", adult: 115, child: 58, senior: 92, badge: null },
      { type: "6-day", adult: 215, child: 108, senior: 172, badge: "Best value" },
      { type: "Season", adult: 975, child: 488, senior: 780, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.1,
      breakdown: { pistes: 9.5, lifts: 7.5, apresSki: 6.5, value: 9.8, beginners: 1.0 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "open" },
      { month: "May", status: "partial" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  }
];