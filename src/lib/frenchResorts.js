export const frenchResorts = [
  {
    id: "trois-vallees",
    name: "Les Trois Vallees",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.42, lng: 6.63,
    minAltitude: 1100, maxAltitude: 3230,
    verticalDrop: 2130,
    pisteKm: 600, runs: 335, lifts: 183,
    gondolas: 45, chairlifts: 95, dragLifts: 43,
    longestRun: 16,
    difficultyBlue: 42, difficultyRed: 41, difficultyBlack: 17,
    snowCannons: 1700, snowCannonKm: 350,
    seasonStart: "2024-11-23", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 9.5, ratingLabel: "Exceptional", priceFrom: 72,
    seasonDates: "23 Nov 2024 - 4 May 2025",
    seasonPasses: ["epic-pass", "ikon-pass"],
    resortTypes: ["Alpine", "Luxury", "Family resort", "Freeride"],
    description: "The worlds largest linked ski area with 600km of pistes spanning five resort villages. From exclusive Courchevel 1850 to high-altitude Val Thorens at 2300m it offers unparalleled variety and a guarantee of excellent snow throughout the season.",
    image: "https://picsum.photos/seed/trois-vallees/800/500",
    images: ["https://picsum.photos/seed/trois-vallees-1/1200/700", "https://picsum.photos/seed/trois-vallees-2/1200/700", "https://picsum.photos/seed/trois-vallees-3/1200/700"],
    weather: { temp: -8, snowDepth: 195, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 90, snowDepthMid: 165, snowDepthTop: 240, snowType: "Packed powder",
    liftsOpen: 165, liftsTotal: 183, pistesOpen: 300, pistesTotal: 335,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Trois Vallees coordinated snowmaking efficiency program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h" },
      { airport: "Chambery", iata: "CMF", driveTime: "1h 30m" }
    ],
    trainStation: "Moutiers - 25km bus to all villages",
    shuttle: false, shuttleDesc: "Bus connections from Moutiers to all villages",
    parking: { capacity: 15000, pricePerDay: 15, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Le Chabichou", zone: "Courchevel 1850", cuisine: "French Gourmet", price: "€€€€" },
        { name: "La Folie Douce", zone: "Val Thorens", cuisine: "Alpine Party", price: "€€€" },
        { name: "Le Blanchot", zone: "Meribel summit", cuisine: "French Alpine", price: "€€€" }
      ],
      skiSchools: 4, groupLessonFrom: 54, privateLessonFrom: 160,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 70,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 3000, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 12, bootDryers: true,
      rentalShops: 60, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head", "Dynastar"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "All villages",
      pharmacy: true, atm: true, atmCount: 40
    },
    surroundings: {
      description: "The Trois Vallees spans the Belleville, Meribel and Courchevel valleys in the Vanoise massif. The area hosts more Michelin-starred restaurants than any other ski destination in the world.",
      nearbyTowns: [
        { name: "Moutiers", distance: "25km", desc: "Tarentaise valley gateway town with train station" },
        { name: "Bourg-Saint-Maurice", distance: "50km", desc: "Major ski train hub" },
        { name: "Albertville", distance: "60km", desc: "1992 Winter Olympics host city" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Gourmet dining", "Helicopter tours", "Dog sledding"],
      touristBoard: "Trois Vallees Tourism",
      touristBoardUrl: "https://www.les3vallees.com",
      emergency: "112",
      hospital: "Centre Hospitalier Moutiers (25km)"
    },
    webcams: [
      { name: "Saulire 2738m", seed: "trois-vallees-cam1" },
      { name: "Cime Caron 3230m", seed: "trois-vallees-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Trois Vallees Ski Enduro", type: "Competition", desc: "Epic multi-day ski touring race across all three valleys" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 72, child: 36, senior: 58, badge: null },
      { type: "3-day", adult: 198, child: 99, senior: 158, badge: null },
      { type: "6-day", adult: 370, child: 185, senior: 296, badge: "Best value" },
      { type: "Season", adult: 1680, child: 840, senior: 1344, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.5,
      breakdown: { pistes: 9.6, lifts: 9.4, apresSki: 9.5, value: 8.5, beginners: 9.2 },
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
    id: "paradiski",
    name: "Paradiski (Les Arcs, La Plagne)",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.57, lng: 6.79,
    minAltitude: 1200, maxAltitude: 3226,
    verticalDrop: 2026,
    pisteKm: 425, runs: 226, lifts: 141,
    gondolas: 35, chairlifts: 75, dragLifts: 31,
    longestRun: 15,
    difficultyBlue: 40, difficultyRed: 42, difficultyBlack: 18,
    snowCannons: 1200, snowCannonKm: 240,
    seasonStart: "2024-11-30", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 9.1, ratingLabel: "Exceptional", priceFrom: 65,
    seasonDates: "30 Nov 2024 - 4 May 2025",
    seasonPasses: ["ikon-pass"],
    resortTypes: ["Alpine", "Family resort", "Freeride"],
    description: "Connects Les Arcs and La Plagne via the Vanoise Express double-decker cable car creating one of the largest ski areas in the world with 425km of pistes spanning from 1200m villages to the 3226m Aiguille Rouge.",
    image: "https://picsum.photos/seed/paradiski/800/500",
    images: ["https://picsum.photos/seed/paradiski-1/1200/700", "https://picsum.photos/seed/paradiski-2/1200/700", "https://picsum.photos/seed/paradiski-3/1200/700"],
    weather: { temp: -7, snowDepth: 180, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 85, snowDepthMid: 155, snowDepthTop: 225, snowType: "Packed powder",
    liftsOpen: 127, liftsTotal: 141, pistesOpen: 203, pistesTotal: 226,
    ecoRating: 3, ecoRenewable: 62, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["62% renewable electricity", "Vanoise National Park adjacent conservation program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" },
      { airport: "Chambery", iata: "CMF", driveTime: "1h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h" }
    ],
    trainStation: "Bourg-Saint-Maurice - 12km, Eurostar Ski Train and TGV Neige",
    shuttle: true, shuttleDesc: "Eurostar Ski Train and TGV Neige stop at Bourg-Saint-Maurice directly",
    parking: { capacity: 8000, pricePerDay: 13, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Le Grand Duc", zone: "Aiguille Rouge 3226m", cuisine: "French Alpine", price: "€€€" },
        { name: "La Plagne Bellecote", zone: "2050m La Plagne", cuisine: "Savoyard", price: "€€" },
        { name: "Les Arcs Summit Bar", zone: "Arc 2000", cuisine: "French", price: "€€" }
      ],
      skiSchools: 3, groupLessonFrom: 48, privateLessonFrom: 140,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 62,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 35, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "All major villages",
      pharmacy: true, atm: true, atmCount: 20
    },
    surroundings: {
      description: "The Paradiski area spreads across the Vanoise National Park edge. Les Arcs was designed with speed skiing in mind while La Plagne hosted the bobsleigh events of the 1992 Albertville Olympics.",
      nearbyTowns: [
        { name: "Bourg-Saint-Maurice", distance: "12km", desc: "Tarentaise ski train hub" },
        { name: "Aime", distance: "15km", desc: "Tarentaise valley market town" },
        { name: "Albertville", distance: "60km", desc: "1992 Winter Olympics city" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Bobsleigh experience", "Spa & wellness", "Paragliding"],
      touristBoard: "Paradiski Tourism",
      touristBoardUrl: "https://www.paradiski.com",
      emergency: "112",
      hospital: "Centre Hospitalier Bourg-Saint-Maurice (12km)"
    },
    webcams: [
      { name: "Aiguille Rouge 3226m", seed: "paradiski-cam1" },
      { name: "Vanoise Express cable car", seed: "paradiski-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "La Plagne Speed Ski", type: "Competition", desc: "International speed skiing event on the Kilometre Lance" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 65, child: 33, senior: 52, badge: null },
      { type: "3-day", adult: 179, child: 90, senior: 143, badge: null },
      { type: "6-day", adult: 334, child: 167, senior: 267, badge: "Best value" },
      { type: "Season", adult: 1520, child: 760, senior: 1216, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.1,
      breakdown: { pistes: 9.2, lifts: 9.0, apresSki: 8.8, value: 8.9, beginners: 9.1 },
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
    id: "espace-killy",
    name: "Espace Killy (Val d'Isere, Tignes)",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.45, lng: 6.98,
    minAltitude: 1550, maxAltitude: 3456,
    verticalDrop: 1906,
    pisteKm: 300, runs: 154, lifts: 88,
    gondolas: 22, chairlifts: 48, dragLifts: 18,
    longestRun: 14,
    difficultyBlue: 34, difficultyRed: 44, difficultyBlack: 22,
    snowCannons: 600, snowCannonKm: 120,
    seasonStart: "2024-11-09", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 9.4, ratingLabel: "Exceptional", priceFrom: 74,
    seasonDates: "9 Nov 2024 - 4 May 2025",
    seasonPasses: ["epic-pass"],
    resortTypes: ["Alpine", "Glacier", "Freeride", "Expert"],
    description: "The Espace Killy combines Val d'Isere and Tignes in a 300km ski area named after Olympic champion Jean-Claude Killy. Val d'Isere is arguably the worlds finest resort for expert skiers while the Tignes glacier provides year-round skiing from 3456m.",
    image: "https://picsum.photos/seed/espace-killy/800/500",
    images: ["https://picsum.photos/seed/espace-killy-1/1200/700", "https://picsum.photos/seed/espace-killy-2/1200/700", "https://picsum.photos/seed/espace-killy-3/1200/700"],
    weather: { temp: -9, snowDepth: 210, condition: "Sunny", forecast: [
      { day: "Today", high: -7, low: -13, condition: "clear" },
      { day: "Tomorrow", high: -8, low: -14, condition: "clear" },
      { day: "Thu", high: -10, low: -16, condition: "snow" }
    ]},
    snowDepthBase: 100, snowDepthMid: 180, snowDepthTop: 265, snowType: "Packed powder",
    liftsOpen: 79, liftsTotal: 88, pistesOpen: 138, pistesTotal: 154,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Tignes glacier preservation program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "3h" },
      { airport: "Chambery", iata: "CMF", driveTime: "2h" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" }
    ],
    trainStation: "Bourg-Saint-Maurice - 30km, TGV Neige and Eurostar Ski Train",
    shuttle: true, shuttleDesc: "TGV Neige and Eurostar Ski Train stop at Bourg-Saint-Maurice",
    parking: { capacity: 5000, pricePerDay: 15, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "La Grande Ourse", zone: "Val d'Isere 2300m", cuisine: "French Gourmet", price: "€€€€" },
        { name: "Tignes Le Lac Restaurant", zone: "Tignes 2100m", cuisine: "Savoyard", price: "€€€" },
        { name: "Refuge de Solaise", zone: "2551m", cuisine: "French Alpine", price: "€€€" }
      ],
      skiSchools: 3, groupLessonFrom: 56, privateLessonFrom: 165,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 72,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1600, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 12, bootDryers: true,
      rentalShops: 40, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head", "Dynastar"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Val d'Isere and Tignes villages",
      pharmacy: true, atm: true, atmCount: 15
    },
    surroundings: {
      description: "The Espace Killy sits at the head of the Isere valley. The Tignes dam, one of the largest in Europe, flooded the old village in 1952 and its bell tower still emerges in dry years, a haunting reminder of the original settlement.",
      nearbyTowns: [
        { name: "Bourg-Saint-Maurice", distance: "32km", desc: "Tarentaise main ski train hub" },
        { name: "Sainte-Foy-Tarentaise", distance: "20km", desc: "Quiet traditional freeride resort" },
        { name: "Moute", distance: "35km", desc: "Tarentaise valley market town" }
      ],
      activities: ["Freeride tours", "Ice diving Tignes lake", "Snowshoeing", "Spa & wellness", "Paragliding"],
      touristBoard: "Val d'Isere Tourism",
      touristBoardUrl: "https://www.valdisere.com",
      emergency: "112",
      hospital: "Centre Hospitalier Bourg-Saint-Maurice (32km)"
    },
    webcams: [
      { name: "Grande Motte glacier 3456m", seed: "espace-killy-cam1" },
      { name: "Val d'Isere village", seed: "espace-killy-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Val d'Isere World Cup", type: "Competition", desc: "FIS Alpine Ski World Cup downhill and super-G on the Bellevarde face" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 74, child: 37, senior: 59, badge: null },
      { type: "3-day", adult: 204, child: 102, senior: 163, badge: null },
      { type: "6-day", adult: 380, child: 190, senior: 304, badge: "Best value" },
      { type: "Season", adult: 1720, child: 860, senior: 1376, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.4,
      breakdown: { pistes: 9.5, lifts: 9.3, apresSki: 9.1, value: 8.6, beginners: 8.4 },
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
    id: "alpe-dhuez",
    name: "Alpe d'Huez",
    countries: ["France"],
    countryCode: "FR",
    region: "Isere, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.09, lng: 6.07,
    minAltitude: 1120, maxAltitude: 3330,
    verticalDrop: 2210,
    pisteKm: 250, runs: 89, lifts: 83,
    gondolas: 20, chairlifts: 45, dragLifts: 18,
    longestRun: 16,
    difficultyBlue: 36, difficultyRed: 44, difficultyBlack: 20,
    snowCannons: 600, snowCannonKm: 130,
    seasonStart: "2024-11-23", seasonEnd: "2025-04-27",
    openStatus: "Open", roadStatus: "open",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 62,
    seasonDates: "23 Nov 2024 - 27 Apr 2025",
    seasonPasses: ["ikon-pass"],
    resortTypes: ["Alpine", "Family resort", "Expert"],
    description: "Europes sunniest ski resort with 300 days of sunshine per year offering 250km of spectacular skiing. The 16km Sarenne black run is the longest in France and the resort has exceptional beginner and family terrain on the vast sun-drenched plateau.",
    image: "https://picsum.photos/seed/alpe-dhuez/800/500",
    images: ["https://picsum.photos/seed/alpe-dhuez-1/1200/700", "https://picsum.photos/seed/alpe-dhuez-2/1200/700", "https://picsum.photos/seed/alpe-dhuez-3/1200/700"],
    weather: { temp: -5, snowDepth: 165, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 140, snowDepthTop: 210, snowType: "Packed powder",
    liftsOpen: 74, liftsTotal: 83, pistesOpen: 80, pistesTotal: 89,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Belledonne natural park cooperation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Grenoble", iata: "GNB", driveTime: "1h" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h" },
      { airport: "Geneva", iata: "GVA", driveTime: "3h" }
    ],
    trainStation: "Grenoble - 65km bus",
    shuttle: false, shuttleDesc: "Bus from Grenoble",
    parking: { capacity: 5000, pricePerDay: 14, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Folie Douce Alpe d'Huez", zone: "2100m", cuisine: "French Alpine Party", price: "€€€" },
        { name: "Chalet du Lac Besson", zone: "2350m plateau", cuisine: "French Alpine", price: "€€€" },
        { name: "Brasserie du Palais des Sports", zone: "Village", cuisine: "French", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 46, privateLessonFrom: 130,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 62,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1200, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 25, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Alpe d'Huez village",
      pharmacy: true, atm: true, atmCount: 10
    },
    surroundings: {
      description: "Alpe d'Huez is famous as one of the iconic climbs in the Tour de France. The 21 hairpin bends of the access road are each named after a Tour stage winner. In winter the same road becomes the ski resort access.",
      nearbyTowns: [
        { name: "Bourg-d'Oisans", distance: "14km", desc: "Tour de France town at the road foot" },
        { name: "Grenoble", distance: "65km", desc: "Isere regional capital and university city" },
        { name: "Les 2 Alpes", distance: "20km", desc: "Neighbouring glacier resort" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Ice driving", "Spa & wellness", "Paragliding"],
      touristBoard: "Alpe d'Huez Tourism",
      touristBoardUrl: "https://www.alpedhuez.com",
      emergency: "112",
      hospital: "CHU Grenoble (65km)"
    },
    webcams: [
      { name: "Pic Blanc 3330m", seed: "alpe-dhuez-cam1" },
      { name: "Alpe d'Huez village", seed: "alpe-dhuez-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Alpe d'Huez International Film Festival", type: "Festival", desc: "Annual comedy film festival on the slopes" }
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
      overall: 9.0,
      breakdown: { pistes: 9.1, lifts: 8.9, apresSki: 9.0, value: 8.8, beginners: 9.3 },
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
    id: "serre-chevalier",
    name: "Serre Chevalier",
    countries: ["France"],
    countryCode: "FR",
    region: "Hautes-Alpes, France",
    country: "France",
    flag: "🇫🇷",
    lat: 44.92, lng: 6.55,
    minAltitude: 1200, maxAltitude: 2830,
    verticalDrop: 1630,
    pisteKm: 250, runs: 110, lifts: 68,
    gondolas: 17, chairlifts: 36, dragLifts: 15,
    longestRun: 12,
    difficultyBlue: 36, difficultyRed: 43, difficultyBlack: 21,
    snowCannons: 480, snowCannonKm: 120,
    seasonStart: "2024-11-30", seasonEnd: "2025-04-27",
    openStatus: "Open", roadStatus: "open",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 57,
    seasonDates: "30 Nov 2024 - 27 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort", "Expert"],
    description: "Combines 13 villages along the Guisane valley into one of the largest ski areas in France with 250km of pistes. Predominantly north-facing terrain maintains excellent snow quality and wooded lower slopes provide superb tree skiing. Adjacent to Briancon, the highest town in France and a UNESCO World Heritage site.",
    image: "https://picsum.photos/seed/serre-chevalier/800/500",
    images: ["https://picsum.photos/seed/serre-chevalier-1/1200/700", "https://picsum.photos/seed/serre-chevalier-2/1200/700", "https://picsum.photos/seed/serre-chevalier-3/1200/700"],
    weather: { temp: -6, snowDepth: 175, condition: "Sunny", forecast: [
      { day: "Today", high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "clear" },
      { day: "Thu", high: -7, low: -13, condition: "snow" }
    ]},
    snowDepthBase: 80, snowDepthMid: 145, snowDepthTop: 215, snowType: "Packed powder",
    liftsOpen: 61, liftsTotal: 68, pistesOpen: 99, pistesTotal: 110,
    ecoRating: 3, ecoRenewable: 60, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["60% renewable electricity", "Briancon UNESCO heritage town cooperation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Turin", iata: "TRN", driveTime: "2h" },
      { airport: "Grenoble", iata: "GNB", driveTime: "2h" },
      { airport: "Lyon", iata: "LYS", driveTime: "3h" }
    ],
    trainStation: "Briancon - 3km, direct Intercite from Paris",
    shuttle: true, shuttleDesc: "Direct Intercite trains from Paris Lyon connect to Briancon",
    parking: { capacity: 4000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Chalet de Serre Ratier", zone: "2500m", cuisine: "French Alpine", price: "€€€" },
        { name: "Chantemerle Village Resto", zone: "1350m", cuisine: "Hautes-Alpes", price: "€€" },
        { name: "Montier-les-Bains", zone: "Village", cuisine: "French", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 44, privateLessonFrom: 120,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 56,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 1100, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 22, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Briancon hospital (3km)",
      pharmacy: true, atm: true, atmCount: 8
    },
    surroundings: {
      description: "Serre Chevalier stretches across the sun-drenched Guisane valley with Briancon at its base. Briancon is the highest town in France at 1326m and its Vauban fortifications are a UNESCO World Heritage site.",
      nearbyTowns: [
        { name: "Briancon", distance: "3km", desc: "Highest town in France, Vauban UNESCO fortress" },
        { name: "Montgenevre", distance: "12km", desc: "Border resort connecting to Italy" },
        { name: "Embrun", distance: "30km", desc: "Lac de Serre-Poncon lakeside town" }
      ],
      activities: ["Snowshoeing", "Briancon fortress visits", "Ice skating", "Cross-country skiing", "Winter hiking"],
      touristBoard: "Serre Chevalier Tourism",
      touristBoardUrl: "https://www.serre-chevalier.com",
      emergency: "112",
      hospital: "Centre Hospitalier Briancon (3km)"
    },
    webcams: [
      { name: "Prorel 2830m", seed: "serre-chevalier-cam1" },
      { name: "Chantemerle base", seed: "serre-chevalier-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Serre Chevalier Ski Raid", type: "Competition", desc: "Annual ski touring and alpine race event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 57, child: 29, senior: 46, badge: null },
      { type: "3-day", adult: 157, child: 79, senior: 126, badge: null },
      { type: "6-day", adult: 293, child: 147, senior: 234, badge: "Best value" },
      { type: "Season", adult: 1330, child: 665, senior: 1064, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.9,
      breakdown: { pistes: 9.0, lifts: 8.8, apresSki: 8.7, value: 9.2, beginners: 9.1 },
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
    id: "grand-massif",
    name: "Grand Massif",
    countries: ["France"],
    countryCode: "FR",
    region: "Haute-Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 46.01, lng: 6.68,
    minAltitude: 700, maxAltitude: 2500,
    verticalDrop: 1800,
    pisteKm: 265, runs: 141, lifts: 72,
    gondolas: 18, chairlifts: 38, dragLifts: 16,
    longestRun: 14,
    difficultyBlue: 38, difficultyRed: 42, difficultyBlack: 20,
    snowCannons: 420, snowCannonKm: 110,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 57,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: ["epic-pass"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Connects five resorts including Flaine, Samoens, Les Carroz and Morillon with Flaine at the highest point providing the most reliable snow. The Flaine bowl is one of the most snowfall-rich locations in the French Alps.",
    image: "https://picsum.photos/seed/grand-massif/800/500",
    images: ["https://picsum.photos/seed/grand-massif-1/1200/700", "https://picsum.photos/seed/grand-massif-2/1200/700", "https://picsum.photos/seed/grand-massif-3/1200/700"],
    weather: { temp: -7, snowDepth: 185, condition: "Snowy", forecast: [
      { day: "Today", high: -5, low: -11, condition: "snow" },
      { day: "Tomorrow", high: -6, low: -12, condition: "partly_cloudy" },
      { day: "Thu", high: -8, low: -14, condition: "clear" }
    ]},
    snowDepthBase: 85, snowDepthMid: 155, snowDepthTop: 225, snowType: "Powder",
    liftsOpen: 64, liftsTotal: 72, pistesOpen: 126, pistesTotal: 141,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Giffre valley nature reserve stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "1h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" },
      { airport: "Chambery", iata: "CMF", driveTime: "2h" }
    ],
    trainStation: "Cluses - 25km bus or Sallanches",
    shuttle: false, shuttleDesc: "Bus from Cluses or Sallanches",
    parking: { capacity: 4000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Flaine Grandes Platiers Restaurant", zone: "2480m", cuisine: "French Alpine", price: "€€€" },
        { name: "Samoens Village Savoyard", zone: "Village", cuisine: "Savoyard", price: "€€" },
        { name: "Les Carroz Brasserie", zone: "Village", cuisine: "French", price: "€€" }
      ],
      skiSchools: 3, groupLessonFrom: 44, privateLessonFrom: 122,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 58,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1000, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 20, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Flaine village",
      pharmacy: false, atm: true, atmCount: 8
    },
    surroundings: {
      description: "Flaine was designed in the 1960s by the architect Marcel Breuer as a planned resort. Despite its Brutalist architecture the bowl above the treeline receives some of the heaviest snowfall in the French Alps.",
      nearbyTowns: [
        { name: "Cluses", distance: "25km", desc: "Arve valley industrial town with train station" },
        { name: "Samoens", distance: "8km via ski area", desc: "Charming traditional Haute-Savoie village" },
        { name: "Geneva", distance: "80km", desc: "International hub with major airport" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Samoens village walks", "Spa & wellness"],
      touristBoard: "Grand Massif Tourism",
      touristBoardUrl: "https://www.grand-massif.com",
      emergency: "112",
      hospital: "Hopital Sallanches (30km)"
    },
    webcams: [
      { name: "Grandes Platiers 2480m", seed: "grand-massif-cam1" },
      { name: "Flaine base", seed: "grand-massif-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Grand Massif Enduro", type: "Competition", desc: "Epic off-piste freeride race through the five villages" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 57, child: 29, senior: 46, badge: null },
      { type: "3-day", adult: 157, child: 79, senior: 126, badge: null },
      { type: "6-day", adult: 293, child: 147, senior: 234, badge: "Best value" },
      { type: "Season", adult: 1330, child: 665, senior: 1064, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.9,
      breakdown: { pistes: 9.0, lifts: 8.8, apresSki: 8.6, value: 9.1, beginners: 9.2 },
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
    id: "megeve",
    name: "Megeve",
    countries: ["France"],
    countryCode: "FR",
    region: "Haute-Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.86, lng: 6.61,
    minAltitude: 1113, maxAltitude: 2350,
    verticalDrop: 1237,
    pisteKm: 155, runs: 128, lifts: 77,
    gondolas: 19, chairlifts: 40, dragLifts: 18,
    longestRun: 11,
    difficultyBlue: 40, difficultyRed: 45, difficultyBlack: 15,
    snowCannons: 570, snowCannonKm: 110,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 9.1, ratingLabel: "Exceptional", priceFrom: 68,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["epic-pass"],
    resortTypes: ["Alpine", "Luxury", "Family resort"],
    description: "The original French luxury ski resort created by the Rothschild family in the 1920s. The charming medieval village centre with ice rink and gourmet restaurants is unmatched in France and the skiing connects with Saint-Gervais in the Evasion Mont-Blanc network.",
    image: "https://picsum.photos/seed/megeve/800/500",
    images: ["https://picsum.photos/seed/megeve-1/1200/700", "https://picsum.photos/seed/megeve-2/1200/700", "https://picsum.photos/seed/megeve-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 170, snowType: "Machine-groomed",
    liftsOpen: 69, liftsTotal: 77, pistesOpen: 115, pistesTotal: 128,
    ecoRating: 3, ecoRenewable: 62, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["62% renewable electricity", "Evasion Mont-Blanc sustainability charter"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "1h" },
      { airport: "Chambery", iata: "CMF", driveTime: "1h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" }
    ],
    trainStation: "Sallanches - 12km bus",
    shuttle: false, shuttleDesc: "Bus from Sallanches station",
    parking: { capacity: 3500, pricePerDay: 14, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Restaurant 1920 by Flocon de Sel", zone: "Village", cuisine: "Haute Cuisine", price: "€€€€" },
        { name: "Refuge du Calvaire", zone: "1955m", cuisine: "French Alpine", price: "€€€" },
        { name: "Le Prieure", zone: "Village centre", cuisine: "French", price: "€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 52, privateLessonFrom: 155,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 68,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 11, bootDryers: true,
      rentalShops: 20, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Dynastar"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Megeve village",
      pharmacy: true, atm: true, atmCount: 8
    },
    surroundings: {
      description: "Megeve was created in the 1920s by Baroness Noemi de Rothschild as a French alternative to St. Moritz. The medieval town centre with its horse-drawn carriages and luxury boutiques remains one of the most elegant in the Alps.",
      nearbyTowns: [
        { name: "Megeve", distance: "0km", desc: "Original French luxury resort, medieval village" },
        { name: "Saint-Gervais", distance: "12km via ski area", desc: "Linked spa and ski resort" },
        { name: "Chamonix", distance: "30km", desc: "World-famous alpine adventure capital" }
      ],
      activities: ["Ice skating", "Spa & wellness", "Horse-drawn carriage rides", "Snowshoeing", "Luxury shopping"],
      touristBoard: "Megeve Tourism",
      touristBoardUrl: "https://www.megeve.com",
      emergency: "112",
      hospital: "Hopital de Sallanches (12km)"
    },
    webcams: [
      { name: "Mont d'Arbois 1850m", seed: "megeve-cam1" },
      { name: "Megeve village centre", seed: "megeve-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Megeve Rocks", type: "Festival", desc: "Annual music festival on the snow" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 68, child: 34, senior: 54, badge: null },
      { type: "3-day", adult: 187, child: 94, senior: 150, badge: null },
      { type: "6-day", adult: 350, child: 175, senior: 280, badge: "Best value" },
      { type: "Season", adult: 1590, child: 795, senior: 1272, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.1,
      breakdown: { pistes: 8.9, lifts: 9.0, apresSki: 9.4, value: 8.2, beginners: 9.2 },
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
    id: "les-2-alpes",
    name: "Les 2 Alpes",
    countries: ["France"],
    countryCode: "FR",
    region: "Isere, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.01, lng: 6.12,
    minAltitude: 1650, maxAltitude: 3600,
    verticalDrop: 1950,
    pisteKm: 220, runs: 96, lifts: 55,
    gondolas: 14, chairlifts: 29, dragLifts: 12,
    longestRun: 13,
    difficultyBlue: 36, difficultyRed: 43, difficultyBlack: 21,
    snowCannons: 380, snowCannonKm: 95,
    seasonStart: "2024-11-23", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 60,
    seasonDates: "23 Nov 2024 - 4 May 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Glacier", "Freestyle"],
    description: "A lively resort in the Romanche valley offering 220km of skiing including year-round glacier skiing on the Girose at 3600m. The vast wide glacier plateau suits beginners while expert terrain in the Jandri Express area provides challenging couloirs.",
    image: "https://picsum.photos/seed/les-2-alpes/800/500",
    images: ["https://picsum.photos/seed/les-2-alpes-1/1200/700", "https://picsum.photos/seed/les-2-alpes-2/1200/700", "https://picsum.photos/seed/les-2-alpes-3/1200/700"],
    weather: { temp: -8, snowDepth: 200, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 90, snowDepthMid: 165, snowDepthTop: 250, snowType: "Powder",
    liftsOpen: 49, liftsTotal: 55, pistesOpen: 86, pistesTotal: 96,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Girose glacier monitoring program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Grenoble", iata: "GNB", driveTime: "1h 15m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" },
      { airport: "Geneva", iata: "GVA", driveTime: "3h" }
    ],
    trainStation: "Grenoble - 75km bus",
    shuttle: false, shuttleDesc: "Bus from Grenoble",
    parking: { capacity: 4000, pricePerDay: 13, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "La Patate", zone: "3200m glacier", cuisine: "French Alpine", price: "€€€" },
        { name: "Chalet de la Fee", zone: "2100m", cuisine: "Savoyard", price: "€€" },
        { name: "Les 2 Alpes Village Bar", zone: "Village", cuisine: "French", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 46, privateLessonFrom: 130,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 62,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 900, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 20, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Les 2 Alpes village",
      pharmacy: true, atm: true, atmCount: 7
    },
    surroundings: {
      description: "Les 2 Alpes sits on a mountain plateau between the Romanche and Veneon valleys. The resort has one of the longest seasons in France thanks to its glacier and is popular with snowboarders for its terrain parks.",
      nearbyTowns: [
        { name: "Bourg-d'Oisans", distance: "30km", desc: "Tour de France gateway town" },
        { name: "Alpe d'Huez", distance: "20km", desc: "Neighbouring sunny resort" },
        { name: "Grenoble", distance: "75km", desc: "Isere regional capital" }
      ],
      activities: ["Glacier walks", "Snowshoeing", "Terrain park", "Paragliding", "Spa & wellness"],
      touristBoard: "Les 2 Alpes Tourism",
      touristBoardUrl: "https://www.les2alpes.com",
      emergency: "112",
      hospital: "CHU Grenoble (75km)"
    },
    webcams: [
      { name: "Girose glacier 3600m", seed: "les-2-alpes-cam1" },
      { name: "Les 2 Alpes village", seed: "les-2-alpes-cam2" }
    ],
    events: [
      { date: "Jun 2025", name: "Les 2 Alpes Summer Ski", type: "Festival", desc: "Summer glacier ski season opener" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 60, child: 30, senior: 48, badge: null },
      { type: "3-day", adult: 165, child: 83, senior: 132, badge: null },
      { type: "6-day", adult: 309, child: 155, senior: 247, badge: "Best value" },
      { type: "Season", adult: 1400, child: 700, senior: 1120, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 8.8, lifts: 8.7, apresSki: 9.0, value: 9.0, beginners: 9.2 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "partial" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "open" },
      { month: "May", status: "partial" }, { month: "Jun", status: "partial" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "morzine-avoriaz",
    name: "Morzine-Avoriaz",
    countries: ["France"],
    countryCode: "FR",
    region: "Haute-Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 46.18, lng: 6.70,
    minAltitude: 1000, maxAltitude: 2277,
    verticalDrop: 1277,
    pisteKm: 140, runs: 75, lifts: 48,
    gondolas: 12, chairlifts: 25, dragLifts: 11,
    longestRun: 11,
    difficultyBlue: 37, difficultyRed: 43, difficultyBlack: 20,
    snowCannons: 280, snowCannonKm: 85,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 56,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["epic-pass"],
    resortTypes: ["Alpine", "Family resort"],
    description: "A traditional Savoyard village at 1000m connected by gondola with the car-free Avoriaz at 1800m forming the French gateway to the 600km Portes du Soleil. Morzine has a particularly vibrant local atmosphere and authentic French mountain character.",
    image: "https://picsum.photos/seed/morzine-avoriaz/800/500",
    images: ["https://picsum.photos/seed/morzine-1/1200/700", "https://picsum.photos/seed/morzine-2/1200/700", "https://picsum.photos/seed/morzine-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 170, snowType: "Packed powder",
    liftsOpen: 43, liftsTotal: 48, pistesOpen: 67, pistesTotal: 75,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Avoriaz car-free zone since 1966"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "1h" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" },
      { airport: "Chambery", iata: "CMF", driveTime: "2h" }
    ],
    trainStation: "Thonon-les-Bains - 35km bus",
    shuttle: false, shuttleDesc: "Bus from Thonon-les-Bains or Geneva airport transfer",
    parking: { capacity: 3000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Prodains Panorama", zone: "Avoriaz 2277m", cuisine: "French Alpine", price: "€€€" },
        { name: "La Chamade", zone: "Morzine village", cuisine: "Savoyard", price: "€€" },
        { name: "Hotel les Airelles", zone: "Morzine", cuisine: "French", price: "€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 44, privateLessonFrom: 122,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 58,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 18, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Morzine village",
      pharmacy: true, atm: true, atmCount: 7
    },
    surroundings: {
      description: "Morzine is one of the most authentic resort towns in the French Alps with a year-round population and strong community. Avoriaz above it was designed in the 1960s in a distinctive architectural style using only wood and stone.",
      nearbyTowns: [
        { name: "Morzine", distance: "0km", desc: "Authentic Savoyard mountain town" },
        { name: "Les Gets", distance: "5km", desc: "Charming linked Portes du Soleil village" },
        { name: "Thonon-les-Bains", distance: "35km", desc: "Lake Geneva shore town with train" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Cross-country skiing", "Spa & wellness", "Mountain biking (summer)"],
      touristBoard: "Morzine-Avoriaz Tourism",
      touristBoardUrl: "https://www.morzine.com",
      emergency: "112",
      hospital: "Hopital de Thonon-les-Bains (35km)"
    },
    webcams: [
      { name: "Avoriaz 2277m", seed: "morzine-cam1" },
      { name: "Morzine village", seed: "morzine-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Avoriaz Fantasy Festival", type: "Festival", desc: "Annual Fantastic Arts film festival at Avoriaz" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 56, child: 28, senior: 45, badge: null },
      { type: "3-day", adult: 154, child: 77, senior: 123, badge: null },
      { type: "6-day", adult: 288, child: 144, senior: 230, badge: "Best value" },
      { type: "Season", adult: 1305, child: 653, senior: 1044, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 8.8, lifts: 8.7, apresSki: 8.9, value: 9.1, beginners: 9.1 },
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
    id: "les-gets",
    name: "Les Gets",
    countries: ["France"],
    countryCode: "FR",
    region: "Haute-Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 46.16, lng: 6.67,
    minAltitude: 1172, maxAltitude: 2010,
    verticalDrop: 838,
    pisteKm: 120, runs: 54, lifts: 25,
    gondolas: 6, chairlifts: 13, dragLifts: 6,
    longestRun: 9,
    difficultyBlue: 37, difficultyRed: 44, difficultyBlack: 19,
    snowCannons: 200, snowCannonKm: 68,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 53,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["epic-pass"],
    resortTypes: ["Alpine", "Family resort"],
    description: "One of the most charming resort villages in the Portes du Soleil retaining authentic mountain architecture and a genuine year-round community. The local ski area connects with Morzine and the full 600km network. Exceptionally family-friendly.",
    image: "https://picsum.photos/seed/les-gets/800/500",
    images: ["https://picsum.photos/seed/les-gets-1/1200/700", "https://picsum.photos/seed/les-gets-2/1200/700", "https://picsum.photos/seed/les-gets-3/1200/700"],
    weather: { temp: -3, snowDepth: 120, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 100, snowDepthTop: 148, snowType: "Machine-groomed",
    liftsOpen: 22, liftsTotal: 25, pistesOpen: 48, pistesTotal: 54,
    ecoRating: 3, ecoRenewable: 60, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["60% renewable electricity", "Authentic village preservation program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "1h" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" },
      { airport: "Chambery", iata: "CMF", driveTime: "2h" }
    ],
    trainStation: "Cluses - 22km bus",
    shuttle: false, shuttleDesc: "Bus from Cluses",
    parking: { capacity: 2000, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Mont Chery Summit Restaurant", zone: "1820m", cuisine: "French Alpine", price: "€€" },
        { name: "Les Gets Village Brasserie", zone: "Village", cuisine: "Savoyard", price: "€€" },
        { name: "La Vaffieu", zone: "Ski area", cuisine: "French", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 42, privateLessonFrom: 115,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 560, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Les Gets village",
      pharmacy: false, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Les Gets is one of the few French ski resorts that retains the character of a genuine mountain village rather than a purpose-built resort. The church, traditional wooden chalets and local shops give it an authentic Haute-Savoie atmosphere.",
      nearbyTowns: [
        { name: "Les Gets", distance: "0km", desc: "Authentic Haute-Savoie resort village" },
        { name: "Morzine", distance: "5km", desc: "Larger linked Savoyard town" },
        { name: "Cluses", distance: "22km", desc: "Arve valley industrial town with train" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Ice skating", "Winter hiking"],
      touristBoard: "Les Gets Tourism",
      touristBoardUrl: "https://www.lesgets.com",
      emergency: "112",
      hospital: "Hopital de Thonon-les-Bains (40km)"
    },
    webcams: [
      { name: "Mont Chery 1827m", seed: "les-gets-cam1" },
      { name: "Les Gets village", seed: "les-gets-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Les Gets World Cup Mountain Bike", type: "Competition", desc: "UCI MTB World Cup round hosted in Les Gets" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 53, child: 27, senior: 42, badge: null },
      { type: "3-day", adult: 146, child: 73, senior: 117, badge: null },
      { type: "6-day", adult: 273, child: 137, senior: 218, badge: "Best value" },
      { type: "Season", adult: 1238, child: 619, senior: 990, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.7,
      breakdown: { pistes: 8.7, lifts: 8.6, apresSki: 8.6, value: 9.2, beginners: 9.4 },
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
    id: "val-disere",
    name: "Val d'Isere",
    countries: ["France"],
    countryCode: "FR",
    region: "Savoie, France",
    country: "France",
    flag: "🇫🇷",
    lat: 45.45, lng: 6.98,
    minAltitude: 1850, maxAltitude: 3456,
    verticalDrop: 1606,
    pisteKm: 150, runs: 86, lifts: 45,
    gondolas: 11, chairlifts: 24, dragLifts: 10,
    longestRun: 13,
    difficultyBlue: 27, difficultyRed: 44, difficultyBlack: 29,
    snowCannons: 310, snowCannonKm: 72,
    seasonStart: "2024-11-09", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 9.5, ratingLabel: "Exceptional", priceFrom: 72,
    seasonDates: "9 Nov 2024 - 4 May 2025",
    seasonPasses: ["epic-pass"],
    resortTypes: ["Alpine", "Expert", "Freeride"],
    description: "Consistently rated the best overall resort in the Alps. The vast off-piste terrain, challenging Face de Bellevarde World Cup course and guaranteed snow from November make it the destination of choice for expert skiers worldwide.",
    image: "https://picsum.photos/seed/val-disere/800/500",
    images: ["https://picsum.photos/seed/val-disere-1/1200/700", "https://picsum.photos/seed/val-disere-2/1200/700", "https://picsum.photos/seed/val-disere-3/1200/700"],
    weather: { temp: -10, snowDepth: 230, condition: "Sunny", forecast: [
      { day: "Today", high: -8, low: -14, condition: "clear" },
      { day: "Tomorrow", high: -9, low: -15, condition: "clear" },
      { day: "Thu", high: -11, low: -17, condition: "snow" }
    ]},
    snowDepthBase: 110, snowDepthMid: 195, snowDepthTop: 285, snowType: "Powder",
    liftsOpen: 40, liftsTotal: 45, pistesOpen: 77, pistesTotal: 86,
    ecoRating: 3, ecoRenewable: 60, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["60% renewable electricity", "Vanoise National Park boundary stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "3h" },
      { airport: "Chambery", iata: "CMF", driveTime: "2h" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" }
    ],
    trainStation: "Bourg-Saint-Maurice - 32km, TGV Neige direct",
    shuttle: true, shuttleDesc: "TGV Neige stops at Bourg-Saint-Maurice",
    parking: { capacity: 3000, pricePerDay: 16, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "La Grande Ourse", zone: "2300m Col de l'Iseran direction", cuisine: "French Gourmet", price: "€€€€" },
        { name: "Folie Douce Val d'Isere", zone: "2300m", cuisine: "French Alpine Party", price: "€€€" },
        { name: "Refuge de Solaise", zone: "2551m", cuisine: "French Alpine", price: "€€€" }
      ],
      skiSchools: 3, groupLessonFrom: 56, privateLessonFrom: 170,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 74,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1000, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 12, bootDryers: true,
      rentalShops: 28, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head", "Dynastar"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Val d'Isere village",
      pharmacy: true, atm: true, atmCount: 9
    },
    surroundings: {
      description: "Val d'Isere has been a skiing destination since the 1930s and hosted the 1992 Albertville Olympics alpine events. The village has evolved from a traditional Savoyard hamlet into a sophisticated international resort while retaining its stone church and chalets.",
      nearbyTowns: [
        { name: "Val d'Isere", distance: "0km", desc: "World-renowned expert ski resort" },
        { name: "Tignes", distance: "12km via ski area", desc: "Espace Killy glacier partner" },
        { name: "Bourg-Saint-Maurice", distance: "32km", desc: "Tarentaise ski train hub" }
      ],
      activities: ["Freeride tours", "Off-piste guiding", "Spa & wellness", "Snowshoeing", "Paragliding"],
      touristBoard: "Val d'Isere Tourism",
      touristBoardUrl: "https://www.valdisere.com",
      emergency: "112",
      hospital: "Centre Hospitalier Bourg-Saint-Maurice (32km)"
    },
    webcams: [
      { name: "Bellevarde 2826m", seed: "val-disere-cam1" },
      { name: "Val d'Isere village", seed: "val-disere-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Val d'Isere World Cup", type: "Competition", desc: "FIS Alpine Ski World Cup opening event on the Bellevarde" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 72, child: 36, senior: 58, badge: null },
      { type: "3-day", adult: 198, child: 99, senior: 158, badge: null },
      { type: "6-day", adult: 370, child: 185, senior: 296, badge: "Best value" },
      { type: "Season", adult: 1680, child: 840, senior: 1344, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.5,
      breakdown: { pistes: 9.6, lifts: 9.4, apresSki: 9.2, value: 8.4, beginners: 8.0 },
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
  }
];