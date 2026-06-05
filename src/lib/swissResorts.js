export const swissResorts = [
  {
    id: "st-moritz",
    name: "St. Moritz / Engadin",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Graubunden, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.50, lng: 9.84,
    minAltitude: 1730, maxAltitude: 3303,
    verticalDrop: 1573,
    pisteKm: 350, runs: 88, lifts: 57,
    gondolas: 14, chairlifts: 28, dragLifts: 15,
    longestRun: 12,
    difficultyBlue: 45, difficultyRed: 54, difficultyBlack: 1,
    snowCannons: 95, snowCannonKm: 40,
    seasonStart: "2024-11-30", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 9.3, ratingLabel: "Exceptional", priceFrom: 88,
    seasonDates: "30 Nov 2024 - 20 Apr 2025",
    seasonPasses: ["ikon-pass"],
    resortTypes: ["Alpine", "Luxury", "Glacier"],
    description: "The original luxury ski resort host of two Winter Olympics combining 350km of high-altitude skiing with unmatched glamour. Engadin sunshine record of 322 sunny days per year ensures outstanding conditions on the Corviglia and Diavolezza mountains.",
    image: "https://picsum.photos/seed/st-moritz/800/500",
    images: ["https://picsum.photos/seed/st-moritz-1/1200/700", "https://picsum.photos/seed/st-moritz-2/1200/700", "https://picsum.photos/seed/st-moritz-3/1200/700"],
    weather: { temp: -7, snowDepth: 175, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 85, snowDepthMid: 145, snowDepthTop: 200, snowType: "Packed powder",
    liftsOpen: 50, liftsTotal: 57, pistesOpen: 78, pistesTotal: 88,
    ecoRating: 4, ecoRenewable: 80, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["80% renewable electricity", "Engadin valley biodiversity program", "EV shuttle network"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "2h 30m" },
      { airport: "Milan Bergamo", iata: "BGY", driveTime: "3h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "3h" }
    ],
    trainStation: "St. Moritz - 1km, Glacier Express from Zermatt and Rhaetian Railway from Chur",
    shuttle: true, shuttleDesc: "Glacier Express from Zermatt and Rhaetian Railway from Chur serve St. Moritz directly",
    parking: { capacity: 2500, pricePerDay: 18, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Mathis Food Affairs", zone: "Corviglia 2486m", cuisine: "Gourmet", price: "€€€€" },
        { name: "El Paradiso", zone: "Corviglia 2624m", cuisine: "International", price: "€€€" },
        { name: "Quattro Passi", zone: "Diavolezza 2973m", cuisine: "Italian Alpine", price: "€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 75, privateLessonFrom: 200,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪", "🇮🇹"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 85,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1100, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 15, bootDryers: true,
      rentalShops: 12, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Fischer", "Volkl"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "St. Moritz town",
      pharmacy: true, atm: true, atmCount: 10
    },
    surroundings: {
      description: "St. Moritz sits in the upper Engadin valley at 1856m, one of the highest inhabited areas in the Alps. The Engadin is famous for crisp blue-sky winters, frozen lake activities and a uniquely cosmopolitan atmosphere.",
      nearbyTowns: [
        { name: "St. Moritz", distance: "0km", desc: "Original luxury ski resort, twice Olympic host" },
        { name: "Pontresina", distance: "5km", desc: "Traditional Engadin village with glacier trails" },
        { name: "Samedan", distance: "8km", desc: "Engadin valley village with regional airport" }
      ],
      activities: ["Polo on ice", "Bobsleigh", "Ice skating", "Spa & wellness", "Snowkiting", "Winter golf", "Horse racing on snow"],
      touristBoard: "St. Moritz Tourism",
      touristBoardUrl: "https://www.stmoritz.com",
      emergency: "112",
      hospital: "Ospidal Engiadina Bassa (25km)"
    },
    webcams: [
      { name: "Corviglia 2486m", seed: "st-moritz-cam1" },
      { name: "Diavolezza 2973m", seed: "st-moritz-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "White Turf", type: "Festival", desc: "Horse racing on the frozen St. Moritz lake" },
      { date: "Feb 2025", name: "St. Moritz Polo World Cup on Snow", type: "Festival", desc: "International polo tournament on snow" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 88, child: 44, senior: 70, badge: null },
      { type: "3-day", adult: 242, child: 121, senior: 194, badge: null },
      { type: "6-day", adult: 452, child: 226, senior: 362, badge: "Best value" },
      { type: "Season", adult: 2050, child: 1025, senior: 1640, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.3,
      breakdown: { pistes: 9.3, lifts: 9.2, apresSki: 9.5, value: 7.8, beginners: 8.8 },
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
    id: "laax-flims-falera",
    name: "Laax-Flims-Falera",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Graubunden, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.80, lng: 9.25,
    minAltitude: 1100, maxAltitude: 3018,
    verticalDrop: 1918,
    pisteKm: 224, runs: 50, lifts: 28,
    gondolas: 9, chairlifts: 13, dragLifts: 6,
    longestRun: 15,
    difficultyBlue: 30, difficultyRed: 48, difficultyBlack: 22,
    snowCannons: 80, snowCannonKm: 40,
    seasonStart: "2024-10-26", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 68,
    seasonDates: "26 Oct 2024 - 20 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Freestyle", "Freeride"],
    description: "Switzerlands snowboard and freestyle capital home to the worlds biggest halfpipe. The Crap Sogn Gion at 3018m provides excellent snow from October and the integrated Rocksresort hotel village is one of the most innovative in the Alps.",
    image: "https://picsum.photos/seed/laax-flims-falera/800/500",
    images: ["https://picsum.photos/seed/laax-flims-1/1200/700", "https://picsum.photos/seed/laax-flims-2/1200/700", "https://picsum.photos/seed/laax-flims-3/1200/700"],
    weather: { temp: -6, snowDepth: 160, condition: "Clear", forecast: [
      { day: "Today", high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "clear" },
      { day: "Thu", high: -7, low: -13, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 130, snowDepthTop: 190, snowType: "Packed powder",
    liftsOpen: 25, liftsTotal: 28, pistesOpen: 45, pistesTotal: 50,
    ecoRating: 4, ecoRenewable: 72, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["72% renewable electricity", "Rocksresort passive energy building", "Wildlife zone management"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "1h 30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "via Chur 1h 45m" }
    ],
    trainStation: "Chur - 25km bus to resort",
    shuttle: false, shuttleDesc: "Bus from Chur station to resort",
    parking: { capacity: 2000, pricePerDay: 15, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Crap Sogn Gion Restaurant", zone: "3018m", cuisine: "Swiss", price: "€€€" },
        { name: "Tegia Larnags", zone: "2200m", cuisine: "Alpine", price: "€€" },
        { name: "Nooba", zone: "Laax base", cuisine: "Fusion", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 58, privateLessonFrom: 155,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 70,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 700, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 12, bootDryers: true,
      rentalShops: 8, rentalBrands: ["Atomic", "Rossignol", "Burton", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Laax village",
      pharmacy: false, atm: true, atmCount: 4
    },
    surroundings: {
      description: "The Flims-Laax area sits above the spectacular Rhine Gorge, sometimes called the Swiss Grand Canyon. Flims is one of the oldest Alpine resorts dating back to the 19th century.",
      nearbyTowns: [
        { name: "Flims", distance: "5km", desc: "Traditional resort village above the Rhine Gorge" },
        { name: "Laax", distance: "0km", desc: "Modern freestyle hub with Rocksresort" },
        { name: "Chur", distance: "25km", desc: "Switzerlands oldest city with rail connections" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Snowpark", "Halfpipe sessions"],
      touristBoard: "Laax Tourism",
      touristBoardUrl: "https://www.laax.com",
      emergency: "112",
      hospital: "Kantonsspital Graubunden Chur (25km)"
    },
    webcams: [
      { name: "Crap Sogn Gion 3018m", seed: "laax-cam1" },
      { name: "Laax base", seed: "laax-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Laax Open", type: "Competition", desc: "Global snowboard and freeski World Cup event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 68, child: 34, senior: 54, badge: null },
      { type: "3-day", adult: 187, child: 94, senior: 150, badge: null },
      { type: "6-day", adult: 349, child: 175, senior: 279, badge: "Best value" },
      { type: "Season", adult: 1580, child: 790, senior: 1264, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 8.9, lifts: 9.2, apresSki: 9.0, value: 8.5, beginners: 8.8 },
      items: []
    },
    seasonCalendar: [
      { month: "Oct", status: "partial" }, { month: "Nov", status: "open" },
      { month: "Dec", status: "open" }, { month: "Jan", status: "open" },
      { month: "Feb", status: "open" }, { month: "Mar", status: "open" },
      { month: "Apr", status: "partial" }, { month: "May", status: "closed" },
      { month: "Jun", status: "closed" }, { month: "Jul", status: "closed" },
      { month: "Aug", status: "closed" }, { month: "Sep", status: "closed" }
    ]
  },
  {
    id: "saas-fee",
    name: "Saas-Fee",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Valais, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.11, lng: 7.93,
    minAltitude: 1800, maxAltitude: 3600,
    verticalDrop: 1800,
    pisteKm: 145, runs: 57, lifts: 22,
    gondolas: 8, chairlifts: 9, dragLifts: 5,
    longestRun: 14,
    difficultyBlue: 26, difficultyRed: 53, difficultyBlack: 21,
    snowCannons: 30, snowCannonKm: 12,
    seasonStart: "2024-01-01", seasonEnd: "2025-12-31",
    openStatus: "Open", roadStatus: "open",
    rating: 9.2, ratingLabel: "Exceptional", priceFrom: 72,
    seasonDates: "Open year-round",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Glacier", "Alpine", "Luxury"],
    description: "The Glacier Village surrounded by thirteen four-thousand-metre peaks with year-round glacier skiing. The highest underground funicular in the world reaches 3456m and summer skiing is available on the Fee Glacier. Car-free village.",
    image: "https://picsum.photos/seed/saas-fee/800/500",
    images: ["https://picsum.photos/seed/saas-fee-1/1200/700", "https://picsum.photos/seed/saas-fee-2/1200/700", "https://picsum.photos/seed/saas-fee-3/1200/700"],
    weather: { temp: -9, snowDepth: 220, condition: "Sunny", forecast: [
      { day: "Today", high: -7, low: -13, condition: "clear" },
      { day: "Tomorrow", high: -8, low: -14, condition: "clear" },
      { day: "Thu", high: -10, low: -16, condition: "snow" }
    ]},
    snowDepthBase: 100, snowDepthMid: 175, snowDepthTop: 260, snowType: "Powder",
    liftsOpen: 20, liftsTotal: 22, pistesOpen: 52, pistesTotal: 57,
    ecoRating: 5, ecoRenewable: 88, ecoCertifications: ["ISO 14001", "Green Globe", "Alpine Pearls"],
    ecoInitiatives: ["88% renewable electricity", "Car-free village since 1968", "Alpine Pearls sustainable mobility", "Electric vehicle network"],
    ecoOffsetProgram: true,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "3h" },
      { airport: "Milan", iata: "MXP", driveTime: "3h" }
    ],
    trainStation: "Brig - 36km bus to valley station then cable car",
    shuttle: false, shuttleDesc: "Bus from Brig station to valley station then cable car to resort",
    parking: { capacity: 2200, pricePerDay: 14, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Allalin Restaurant", zone: "3500m rotating", cuisine: "Swiss Gourmet", price: "€€€" },
        { name: "Gletscher Grotte", zone: "3456m glacier cave", cuisine: "Alpine", price: "€€€" },
        { name: "Fletschhorn Restaurant", zone: "Village", cuisine: "Gourmet", price: "€€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 62, privateLessonFrom: 165,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 75,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 600, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 12, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Saas-Fee village",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "Saas-Fee is enclosed by a natural amphitheatre of thirteen 4000m peaks including the Dom and Alphubel. The village has been car-free since 1968 and retains a timeless Alpine atmosphere.",
      nearbyTowns: [
        { name: "Saas-Fee", distance: "0km", desc: "Car-free glacier village" },
        { name: "Visp", distance: "30km", desc: "Rhone valley town on the Simplon rail route" },
        { name: "Brig", distance: "36km", desc: "Major railway junction with Simplon tunnel" }
      ],
      activities: ["Glacier hiking", "Ice skating", "Spa & wellness", "Snowshoeing", "Winter walking", "Glacier cave visits"],
      touristBoard: "Saas-Fee Tourism",
      touristBoardUrl: "https://www.saas-fee.ch",
      emergency: "112",
      hospital: "Visp hospital (30km)"
    },
    webcams: [
      { name: "Mittelallalin 3456m", seed: "saas-fee-cam1" },
      { name: "Saas-Fee village", seed: "saas-fee-cam2" }
    ],
    events: [
      { date: "Aug 2025", name: "Saas-Fee Summer Skiing", type: "Festival", desc: "Summer glacier ski season opener" }
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
      overall: 9.2,
      breakdown: { pistes: 9.2, lifts: 9.1, apresSki: 8.6, value: 8.0, beginners: 8.8 },
      items: []
    },
    seasonCalendar: [
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "open" },
      { month: "May", status: "open" }, { month: "Jun", status: "open" },
      { month: "Jul", status: "open" }, { month: "Aug", status: "open" },
      { month: "Sep", status: "open" }, { month: "Oct", status: "open" },
      { month: "Nov", status: "open" }, { month: "Dec", status: "open" }
    ]
  },
  {
    id: "portes-du-soleil",
    name: "Portes du Soleil",
    countries: ["Switzerland", "France"],
    countryCode: "CH",
    region: "Valais / Haute-Savoie",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.18, lng: 6.85,
    minAltitude: 950, maxAltitude: 2277,
    verticalDrop: 1327,
    pisteKm: 600, runs: 286, lifts: 197,
    gondolas: 40, chairlifts: 100, dragLifts: 57,
    longestRun: 16,
    difficultyBlue: 45, difficultyRed: 53, difficultyBlack: 2,
    snowCannons: 340, snowCannonKm: 130,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 55,
    seasonDates: "14 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["magic-pass", "epic-pass"],
    resortTypes: ["Alpine", "Family resort", "Cross-border"],
    description: "One of the largest international ski areas in the world spanning 12 resorts across Switzerland and France with 600km of pistes. Swiss villages of Champery, Morgins, Les Crosets and Torgon connect seamlessly with Morzine, Avoriaz and Les Gets on the French side.",
    image: "https://picsum.photos/seed/portes-du-soleil/800/500",
    images: ["https://picsum.photos/seed/portes-1/1200/700", "https://picsum.photos/seed/portes-2/1200/700", "https://picsum.photos/seed/portes-3/1200/700"],
    weather: { temp: -4, snowDepth: 130, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 105, snowDepthTop: 150, snowType: "Packed powder",
    liftsOpen: 175, liftsTotal: 197, pistesOpen: 255, pistesTotal: 286,
    ecoRating: 3, ecoRenewable: 60, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["60% renewable electricity", "Franco-Swiss environmental cooperation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "1h 15m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" }
    ],
    trainStation: "Aigle - 22km bus to Champery",
    shuttle: false, shuttleDesc: "Bus from Aigle station to the valley villages",
    parking: { capacity: 5000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Les Crosets Restaurant", zone: "2100m Switzerland", cuisine: "Swiss Alpine", price: "€€" },
        { name: "Avoriaz Panorama", zone: "1800m France", cuisine: "Savoyard", price: "€€€" },
        { name: "Champery Apres Bar", zone: "Village", cuisine: "International", price: "€€" }
      ],
      skiSchools: 3, groupLessonFrom: 48, privateLessonFrom: 130,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪", "🇨🇭"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 60,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1200, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 18, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Champery village",
      pharmacy: true, atm: true, atmCount: 8
    },
    surroundings: {
      description: "The Portes du Soleil sits at the junction of the Valais Alps and the French Pre-Alps. Champery is a classic Swiss village with a dramatic backdrop of the Dents du Midi.",
      nearbyTowns: [
        { name: "Champery", distance: "0km", desc: "Classic Swiss village below the Dents du Midi" },
        { name: "Morgins", distance: "15km", desc: "Quiet Swiss border village" },
        { name: "Aigle", distance: "22km", desc: "Rhone valley wine town with train station" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Winter hiking", "Spa & wellness", "Cross-country skiing"],
      touristBoard: "Portes du Soleil Tourism",
      touristBoardUrl: "https://www.portesdusoleil.com",
      emergency: "112",
      hospital: "Hopital Riviera-Chablais Aigle (22km)"
    },
    webcams: [
      { name: "Pointe de Mossettes 2277m", seed: "portes-cam1" },
      { name: "Champery village", seed: "portes-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Portes du Soleil Spring Festival", type: "Festival", desc: "Franco-Swiss end-of-season celebrations" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 55, child: 28, senior: 44, badge: null },
      { type: "3-day", adult: 151, child: 76, senior: 121, badge: null },
      { type: "6-day", adult: 282, child: 141, senior: 226, badge: "Best value" },
      { type: "Season", adult: 1280, child: 640, senior: 1024, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.9,
      breakdown: { pistes: 8.8, lifts: 8.7, apresSki: 8.9, value: 9.1, beginners: 9.3 },
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
    id: "crans-montana",
    name: "Crans-Montana",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Valais, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.31, lng: 7.48,
    minAltitude: 1500, maxAltitude: 3000,
    verticalDrop: 1500,
    pisteKm: 140, runs: 50, lifts: 27,
    gondolas: 8, chairlifts: 13, dragLifts: 6,
    longestRun: 12,
    difficultyBlue: 40, difficultyRed: 46, difficultyBlack: 14,
    snowCannons: 75, snowCannonKm: 38,
    seasonStart: "2024-11-30", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 65,
    seasonDates: "30 Nov 2024 - 13 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Luxury", "Family resort"],
    description: "Sitting on a sunny plateau above the Rhone valley with outstanding views and exceptional sunshine hours. Home to the Omega European Masters golf tournament in summer and a World Cup downhill course in winter.",
    image: "https://picsum.photos/seed/crans-montana/800/500",
    images: ["https://picsum.photos/seed/crans-montana-1/1200/700", "https://picsum.photos/seed/crans-montana-2/1200/700", "https://picsum.photos/seed/crans-montana-3/1200/700"],
    weather: { temp: -4, snowDepth: 130, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 60, snowDepthMid: 110, snowDepthTop: 165, snowType: "Packed powder",
    liftsOpen: 24, liftsTotal: 27, pistesOpen: 44, pistesTotal: 50,
    ecoRating: 3, ecoRenewable: 65, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["65% renewable electricity", "Rhone valley biodiversity initiatives"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h" },
      { airport: "Sion", iata: "SIR", driveTime: "30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "3h" }
    ],
    trainStation: "Sierre - 14km funicular connection to resort",
    shuttle: false, shuttleDesc: "Funicular from Sierre to Crans-Montana",
    parking: { capacity: 3000, pricePerDay: 14, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Cry dEr Restaurant", zone: "2263m", cuisine: "Swiss Alpine", price: "€€€" },
        { name: "Mont Lachaux", zone: "Piste side", cuisine: "Savoyard", price: "€€€" },
        { name: "Chetzeron", zone: "2112m", cuisine: "Gourmet", price: "€€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 55, privateLessonFrom: 145,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 68,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 600, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 9, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Crans-Montana town",
      pharmacy: true, atm: true, atmCount: 7
    },
    surroundings: {
      description: "Crans-Montana occupies a wide sunny plateau at 1500m with panoramic views of the Valais Alps including the Matterhorn, Mont Blanc and the Weisshorn. One of the sunniest resorts in Switzerland.",
      nearbyTowns: [
        { name: "Crans-Montana", distance: "0km", desc: "Twin resort town on the sunny Valais plateau" },
        { name: "Sierre", distance: "14km", desc: "Bilingual Rhone valley town" },
        { name: "Sion", distance: "30km", desc: "Valais cantonal capital" }
      ],
      activities: ["Snowshoeing", "Spa & wellness", "Winter walking", "Ice skating", "Cross-country skiing"],
      touristBoard: "Crans-Montana Tourism",
      touristBoardUrl: "https://www.crans-montana.ch",
      emergency: "112",
      hospital: "Sierre hospital (14km)"
    },
    webcams: [
      { name: "Cry dEr 2263m", seed: "crans-montana-cam1" },
      { name: "Crans village", seed: "crans-montana-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Crans-Montana World Cup", type: "Competition", desc: "Ladies World Cup downhill and super-G races" }
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
      overall: 8.8,
      breakdown: { pistes: 8.8, lifts: 8.7, apresSki: 8.8, value: 8.4, beginners: 9.0 },
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
    id: "jungfrau-region",
    name: "Jungfrau Region",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Bernese Oberland, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.61, lng: 7.96,
    minAltitude: 945, maxAltitude: 2971,
    verticalDrop: 2026,
    pisteKm: 275, runs: 90, lifts: 49,
    gondolas: 16, chairlifts: 21, dragLifts: 12,
    longestRun: 12,
    difficultyBlue: 38, difficultyRed: 42, difficultyBlack: 20,
    snowCannons: 110, snowCannonKm: 50,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 9.4, ratingLabel: "Exceptional", priceFrom: 72,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Family resort", "Nordic", "UNESCO Heritage"],

    // Multi-area region flag — triggers village filter in booking + AI agents
    isMultiAreaRegion: true,
    liftPassCoversAllAreas: true,
    liftPassNote: "The Jungfrau Ski Region pass covers all 4 ski areas",

    // 4 ski areas with full stats
    skiAreas: [
      {
        id: "grindelwald-wengen",
        name: "Grindelwald-Wengen",
        villages: ["Grindelwald", "Wengen", "Kleine Scheidegg"],
        pisteKm: 103, lifts: 21,
        minAlt: 943, maxAlt: 2472,
        highlights: ["Lauberhorn World Cup downhill", "Eiger Express 3S gondola", "Grindelwald Terminal — most modern in Alps"],
        snowpark: false, skicross: false,
        image: "", // add in Base44 — Grindelwald-Wengen panorama with Eiger
        lat: 46.62, lng: 7.98,
      },
      {
        id: "grindelwald-first",
        name: "Grindelwald-First",
        villages: ["Grindelwald"],
        pisteKm: 56, lifts: 9,
        minAlt: 1034, maxAlt: 2168,
        highlights: ["First Cliff Walk by Tissot", "First Flieger zip-line", "Snowboard & freeski mecca", "Snowpark"],
        snowpark: true, skicross: false,
        image: "", // add in Base44 — First area with Eiger Mönch Jungfrau backdrop
        lat: 46.66, lng: 8.05,
      },
      {
        id: "muerren-schilthorn",
        name: "Mürren-Schilthorn",
        villages: ["Mürren", "Lauterbrunnen", "Stechelberg"],
        pisteKm: 56, lifts: 13,
        minAlt: 796, maxAlt: 2970,
        highlights: ["Piz Gloria — James Bond location", "Schilthorn 2970m — highest in Bernese Oberland", "Direttissima Nr.9 — 88% gradient", "Skyline Snowpark", "Skicross track", "Thrill Walk on Birg"],
        snowpark: true, skicross: true,
        image: "", // add in Base44 — Mürren-Schilthorn panorama
        lat: 46.55, lng: 7.89,
        isCarFree: true,
      },
      {
        id: "meiringen-hasliberg",
        name: "Meiringen-Hasliberg",
        villages: ["Meiringen", "Hasliberg", "Hasliberg Reuti", "Hasliberg Wasserwendi"],
        pisteKm: 60, lifts: 6,
        minAlt: 600, maxAlt: 2433,
        highlights: ["Skihäsliland children's area", "Night skiing on 4.5km lit pistes", "Skirennzentrum race training", "Alpen Tower viewpoint"],
        snowpark: false, skicross: false,
        image: "", // add in Base44 — Hasliberg panorama
        lat: 46.73, lng: 8.14,
      },
    ],

    // All villages — used for hotel/apartment booking filter
    bookingVillages: [
      { id: "grindelwald", name: "Grindelwald", skiAreas: ["grindelwald-wengen", "grindelwald-first"], carFree: false, trainAccess: true },
      { id: "wengen",      name: "Wengen",      skiAreas: ["grindelwald-wengen"], carFree: true, trainAccess: true },
      { id: "muerren",     name: "Mürren",      skiAreas: ["muerren-schilthorn"], carFree: true, trainAccess: true },
      { id: "lauterbrunnen", name: "Lauterbrunnen", skiAreas: ["muerren-schilthorn"], carFree: false, trainAccess: true },
      { id: "meiringen",   name: "Meiringen",   skiAreas: ["meiringen-hasliberg"], carFree: false, trainAccess: true },
      { id: "hasliberg",   name: "Hasliberg",   skiAreas: ["meiringen-hasliberg"], carFree: false, trainAccess: false },
    ],

    description: "One region, four legendary ski areas — all on a single pass. Beneath the UNESCO World Heritage Eiger, Mönch and Jungfrau massif, the Jungfrau Region spans 275 perfectly groomed kilometres across car-free Wengen and Mürren, the iconic Kleine Scheidegg, the adrenaline-charged First and the family paradise of Meiringen-Hasliberg. The Lauberhorn hosts the world's oldest downhill race; Piz Gloria was the Bond villain's lair; First Cliff Walk is the most photographed spot in the Bernese Oberland.",

    // Images — add in Base44
    image: "",   // main hero — wide panorama of all 4 areas or Eiger Mönch Jungfrau
    images: [
      "",  // Grindelwald-Wengen — skier with Eiger in background
      "",  // Grindelwald-First — First Cliff Walk aerial
      "",  // Mürren-Schilthorn — Piz Gloria / skier with James Bond poster
      "",  // Meiringen-Hasliberg — night skiing
    ],
    videoThumbnail: "", // add in Base44 — region promo video thumbnail

    weather: { temp: -6, snowDepth: 165, condition: "Sunny", forecast: [
      { day: "Today",    high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "clear" },
      { day: "Thu",      high: -7, low: -13, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 130, snowDepthTop: 215, snowType: "Packed powder",
    liftsOpen: 44, liftsTotal: 49, pistesOpen: 82, pistesTotal: 90,

    ecoRating: 5, ecoRenewable: 85, ecoCertifications: ["UNESCO World Heritage", "ISO 14001", "Green Globe"],
    ecoInitiatives: ["85% renewable electricity", "Car-free villages Wengen and Mürren", "UNESCO Jungfrau-Aletsch biosphere stewardship", "Rack railway heritage preservation", "No-fly zone over heritage massif"],
    ecoOffsetProgram: false,

    airports: [
      { airport: "Bern Belp",  iata: "BRN", driveTime: "1h" },
      { airport: "Zurich",     iata: "ZRH", driveTime: "2h" },
      { airport: "Geneva",     iata: "GVA", driveTime: "2h 30m" },
      { airport: "Basel",      iata: "BSL", driveTime: "2h" },
    ],
    trainStation: "Interlaken Ost — direct BOB (Berner Oberland Bahn) to Grindelwald and Lauterbrunnen. Wengernalpbahn rack railway to Wengen and Kleine Scheidegg. Schilthornbahn cable car from Stechelberg to Mürren.",
    shuttle: true, shuttleDesc: "The entire region is car-free from Interlaken — BOB, Wengernalpbahn, BLS and Schilthornbahn connect all villages. No car needed.",
    parking: { capacity: 4000, pricePerDay: 14, includedInPass: false },

    facilities: {
      restaurants: [
        { name: "Piz Gloria", zone: "Schilthorn 2970m (Mürren area)", cuisine: "Revolving Alpine — James Bond dining", price: "€€€" },
        { name: "Restaurant Eigernordwand", zone: "Kleine Scheidegg 2061m", cuisine: "Swiss Alpine — Eiger North Face views", price: "€€€" },
        { name: "First Mountain Restaurant", zone: "Grindelwald-First 2168m", cuisine: "Alpine — Eiger Mönch Jungfrau panorama", price: "€€" },
        { name: "Ristorante Pizzeria da Sina", zone: "Wengen village", cuisine: "Italian / Swiss", price: "€€" },
      ],
      skiSchools: 4, groupLessonFrom: 55, privateLessonFrom: 150,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪", "🇫🇷", "🇯🇵"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 75,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1400, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 12, bootDryers: true,
      rentalShops: 18, rentalBrands: ["Atomic", "Rossignol", "Fischer", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Interlaken Hospital (30 mins)",
      pharmacy: true, atm: true, atmCount: 12,
    },

    surroundings: {
      description: "The Jungfrau Region spans the Bernese Oberland, centred on Interlaken between Lake Thun and Lake Brienz. Five unique holiday villages — Grindelwald, Wengen, Mürren, Lauterbrunnen and Haslital — sit beneath Europe's most photographed mountain trio: the Eiger, Mönch and Jungfrau.",
      nearbyTowns: [
        { name: "Interlaken",    distance: "19km", desc: "Gateway town with direct rail to all villages" },
        { name: "Grindelwald",   distance: "0km",  desc: "Largest ski village — access to First and Wengen areas" },
        { name: "Wengen",        distance: "12km", desc: "Car-free car-free classic — Lauberhorn race village" },
        { name: "Mürren",        distance: "18km", desc: "Car-free cliff village — highest ski area in Bernese Oberland" },
        { name: "Lauterbrunnen", distance: "10km", desc: "Valley of 72 waterfalls — base for Mürren" },
        { name: "Meiringen",     distance: "35km", desc: "Sherlock Holmes country — separate Hasliberg ski area" },
      ],
      activities: ["Jungfraujoch Top of Europe (3454m)", "First Cliff Walk by Tissot", "First Flieger zip-line", "Ice skating Grindelwald", "Curling", "Snowshoe tours", "Sherlock Holmes Museum Meiringen", "Lauberhorn race spectating", "Thrill Walk on Birg"],
      touristBoard: "Jungfrau Region Tourismus AG",
      touristBoardUrl: "https://www.jungfrauregion.swiss",
      emergency: "112",
      hospital: "Spital Interlaken (30 mins from Grindelwald)",
    },

    webcams: [
      { name: "Grindelwald — Kleine Scheidegg", seed: "jungfrau-cam1" },
      { name: "Männlichen panorama", seed: "jungfrau-cam2" },
      { name: "Schilthorn — Piz Gloria", seed: "jungfrau-cam3" },
      { name: "Hasliberg — Mägisalp", seed: "jungfrau-cam4" },
    ],

    events: [
      { date: "Jan 2025",  name: "Lauberhorn World Cup",       type: "Race",    desc: "Oldest Alpine ski race — longest World Cup downhill at 4.48km. Wengen village transforms for race week." },
      { date: "Jan 2025",  name: "Inferno Race",               type: "Race",    desc: "World's largest amateur ski race from Schilthorn summit to Mürren — 15.8km." },
      { date: "Mar 2025",  name: "Snow & Symphony",            type: "Festival", desc: "Classical music concerts in alpine settings across the region." },
      { date: "Feb 2025",  name: "Grindelwald Snow Festival",  type: "Festival", desc: "Snow sculpture championships in Grindelwald village." },
    ],

    promotions: [
      { title: "Early bird season pass", desc: "Purchase before Nov 1 and save 20% on the full Jungfrau Ski Region season pass", badge: "Best value" },
      { title: "Family package", desc: "2 adults + 2 children 6-day pass with ski school included", badge: "Family favourite" },
    ],

    liftPasses: [
      { type: "1-day",  adult: 78,  child: 39,  senior: 62,  badge: null },
      { type: "3-day",  adult: 213, child: 107, senior: 170, badge: null },
      { type: "6-day",  adult: 384, child: 192, senior: 307, badge: "Best value" },
      { type: "Season", adult: 1290, child: 645, senior: 1032, badge: null },
    ],

    instructors: [],

    reviews: {
      overall: 9.4,
      breakdown: { pistes: 9.5, lifts: 9.3, apresSki: 8.8, value: 8.2, beginners: 9.2 },
      items: [
        { author: "James W.", date: "Feb 2025", rating: 10, text: "Wengen is absolutely magical. Car-free, pristine snow, and the Lauberhorn race atmosphere is electric. The new Eiger Express makes getting around the whole region so easy." },
        { author: "Nadia K.", date: "Jan 2025", rating: 9,  text: "Mürren and the Schilthorn are worth the trip alone. Piz Gloria revolving restaurant with 360° views — unforgettable. The direttissima black run had me scared and thrilled simultaneously." },
        { author: "Thomas S.", date: "Mar 2025", rating: 9,  text: "Took the family to Grindelwald-First. The cliff walk and First Flieger were the highlight — kids absolutely loved it. Ski school was excellent." },
      ],
    },

    seasonCalendar: [
      { month: "Nov", status: "partial" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" },    { month: "Feb", status: "open" },
      { month: "Mar", status: "open" },    { month: "Apr", status: "partial" },
      { month: "May", status: "closed" },  { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" },  { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" },  { month: "Oct", status: "closed" },
    ],
  {
    id: "adelboden-lenk",
    name: "Adelboden-Lenk",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Bernese Oberland, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.49, lng: 7.56,
    minAltitude: 1353, maxAltitude: 2362,
    verticalDrop: 1009,
    pisteKm: 210, runs: 68, lifts: 55,
    gondolas: 14, chairlifts: 28, dragLifts: 13,
    longestRun: 11,
    difficultyBlue: 40, difficultyRed: 45, difficultyBlack: 15,
    snowCannons: 120, snowCannonKm: 60,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 60,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Family resort"],
    description: "A classic Swiss ski destination combining two charming villages with 210km of well-prepared pistes. The Chuenisbargli hosts the opening World Cup slalom each January attracting 50,000 spectators to this picturesque Bernese Oberland resort.",
    image: "https://picsum.photos/seed/adelboden-lenk/800/500",
    images: ["https://picsum.photos/seed/adelboden-1/1200/700", "https://picsum.photos/seed/adelboden-2/1200/700", "https://picsum.photos/seed/adelboden-3/1200/700"],
    weather: { temp: -5, snowDepth: 145, condition: "Clear", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 165, snowType: "Packed powder",
    liftsOpen: 49, liftsTotal: 55, pistesOpen: 61, pistesTotal: 68,
    ecoRating: 3, ecoRenewable: 68, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["68% renewable electricity", "Bernese Oberland nature park buffer zones"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Bern", iata: "BRN", driveTime: "1h" },
      { airport: "Zurich", iata: "ZRH", driveTime: "2h" },
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" }
    ],
    trainStation: "Frutigen - 12km bus to Adelboden",
    shuttle: false, shuttleDesc: "Bus from Frutigen station to Adelboden",
    parking: { capacity: 2500, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Sillerenbuehl Restaurant", zone: "1980m", cuisine: "Swiss Alpine", price: "€€€" },
        { name: "Aebi Hutte", zone: "Piste side", cuisine: "Traditional", price: "€€" },
        { name: "Metschstand Bergbeiz", zone: "1957m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 52, privateLessonFrom: 138,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 62,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Volkl"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Adelboden village",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "Adelboden is a traditional Swiss mountain village at the head of the Engstligental. Lenk sits at the head of the parallel Simmental and the two are linked by the Hahnenmoos pass.",
      nearbyTowns: [
        { name: "Adelboden", distance: "0km", desc: "Traditional Bernese Oberland village" },
        { name: "Lenk", distance: "18km", desc: "Linked village in the Simmental" },
        { name: "Frutigen", distance: "12km", desc: "Valley town on the Kander river" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Ice skating", "Spa & wellness", "Winter hiking"],
      touristBoard: "Adelboden Tourism",
      touristBoardUrl: "https://www.adelboden.ch",
      emergency: "112",
      hospital: "Spital Frutigen (12km)"
    },
    webcams: [
      { name: "Sillerenbuehl 1980m", seed: "adelboden-cam1" },
      { name: "Adelboden village", seed: "adelboden-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Adelboden FIS World Cup", type: "Competition", desc: "FIS Alpine Ski World Cup giant slalom and slalom" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 60, child: 30, senior: 48, badge: null },
      { type: "3-day", adult: 165, child: 83, senior: 132, badge: null },
      { type: "6-day", adult: 308, child: 154, senior: 246, badge: "Best value" },
      { type: "Season", adult: 1400, child: 700, senior: 1120, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 8.9, lifts: 8.7, apresSki: 8.5, value: 8.8, beginners: 9.1 },
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