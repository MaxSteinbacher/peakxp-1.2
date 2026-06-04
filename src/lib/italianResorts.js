export const italianResorts = [
  {
    id: "val-gardena",
    name: "Val Gardena",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Alto Adige, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.56, lng: 11.77,
    minAltitude: 1236, maxAltitude: 2518,
    verticalDrop: 1282,
    pisteKm: 175, runs: 80, lifts: 82,
    gondolas: 20, chairlifts: 42, dragLifts: 20,
    longestRun: 12,
    difficultyBlue: 28, difficultyRed: 47, difficultyBlack: 25,
    snowCannons: 400, snowCannonKm: 120,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 9.2, ratingLabel: "Exceptional", priceFrom: 58,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Freeride", "Cross-border"],
    description: "One of the most famous ski destinations in the Dolomites home to the annual World Cup downhill on the legendary Saslong course. Three villages of Selva, Ortisei and Santa Cristina connected with the full 1200km Dolomiti Superski network with strong Ladin cultural identity.",
    image: "https://picsum.photos/seed/val-gardena/800/500",
    images: ["https://picsum.photos/seed/val-gardena-1/1200/700", "https://picsum.photos/seed/val-gardena-2/1200/700", "https://picsum.photos/seed/val-gardena-3/1200/700"],
    weather: { temp: -5, snowDepth: 150, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 130, snowDepthTop: 190, snowType: "Packed powder",
    liftsOpen: 74, liftsTotal: 82, pistesOpen: 72, pistesTotal: 80,
    ecoRating: 4, ecoRenewable: 72, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["72% renewable electricity", "Green Globe certified", "Dolomites UNESCO heritage stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Bolzano", iata: "BZO", driveTime: "45m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Venice Marco Polo", iata: "VCE", driveTime: "2h 30m" }
    ],
    trainStation: "Chiusa/Klausen - 22km bus",
    shuttle: false, shuttleDesc: "Bus from Chiusa/Klausen station",
    parking: { capacity: 3000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Sasslong", zone: "2100m", cuisine: "Ladin", price: "€€€" },
        { name: "Col Raiser Restaurant", zone: "2106m", cuisine: "South Tyrolean", price: "€€" },
        { name: "Rifugio Comici", zone: "Sella Ronda", cuisine: "Italian Alpine", price: "€€" }
      ],
      skiSchools: 3, groupLessonFrom: 50, privateLessonFrom: 135,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 60,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1000, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 14, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head", "Fischer"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Ortisei village",
      pharmacy: true, atm: true, atmCount: 8
    },
    surroundings: {
      description: "Val Gardena is a Ladin-speaking valley in the heart of the Dolomites. The Sella Ronda circuit is accessible directly from the ski area and the Saslong World Cup race track is one of the most famous in the world.",
      nearbyTowns: [
        { name: "Ortisei", distance: "0km", desc: "Main Gardena valley town with wood-carving tradition" },
        { name: "Selva di Val Gardena", distance: "6km", desc: "Ski hub at the head of the valley" },
        { name: "Santa Cristina", distance: "3km", desc: "Central Gardena village" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Spa & wellness", "Ladin culture tours", "Ice skating"],
      touristBoard: "Val Gardena Tourism",
      touristBoardUrl: "https://www.valgardena.it",
      emergency: "112",
      hospital: "Ospedale di Bolzano (45m drive)"
    },
    webcams: [
      { name: "Ciampinoi 2254m", seed: "val-gardena-cam1" },
      { name: "Col Raiser 2106m", seed: "val-gardena-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Val Gardena World Cup", type: "Competition", desc: "FIS Alpine Ski World Cup super-G and downhill on the Saslong" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 58, child: 29, senior: 46, badge: null },
      { type: "3-day", adult: 159, child: 80, senior: 127, badge: null },
      { type: "6-day", adult: 298, child: 149, senior: 238, badge: "Best value" },
      { type: "Season", adult: 1350, child: 675, senior: 1080, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.2,
      breakdown: { pistes: 9.3, lifts: 9.2, apresSki: 9.0, value: 8.8, beginners: 8.8 },
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
    id: "alta-badia",
    name: "Alta Badia",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Alto Adige, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.58, lng: 11.87,
    minAltitude: 1568, maxAltitude: 2778,
    verticalDrop: 1210,
    pisteKm: 130, runs: 58, lifts: 53,
    gondolas: 13, chairlifts: 28, dragLifts: 12,
    longestRun: 10,
    difficultyBlue: 30, difficultyRed: 49, difficultyBlack: 21,
    snowCannons: 310, snowCannonKm: 100,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 9.1, ratingLabel: "Exceptional", priceFrom: 56,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Gourmet"],
    description: "Renowned for the Gran Risa World Cup slalom and exceptional Ladin gastronomy. High plateau setting above the treeline with outstanding views of the Fanes massif and the Marmolada glacier and access to the full Sella Ronda circuit.",
    image: "https://picsum.photos/seed/alta-badia/800/500",
    images: ["https://picsum.photos/seed/alta-badia-1/1200/700", "https://picsum.photos/seed/alta-badia-2/1200/700", "https://picsum.photos/seed/alta-badia-3/1200/700"],
    weather: { temp: -6, snowDepth: 160, condition: "Sunny", forecast: [
      { day: "Today", high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "clear" },
      { day: "Thu", high: "07", low: -13, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 140, snowDepthTop: 200, snowType: "Packed powder",
    liftsOpen: 47, liftsTotal: 53, pistesOpen: 52, pistesTotal: 58,
    ecoRating: 3, ecoRenewable: 68, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["68% renewable electricity", "Dolomites UNESCO World Heritage partnership"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Bolzano", iata: "BZO", driveTime: "1h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h" },
      { airport: "Venice Marco Polo", iata: "VCE", driveTime: "2h 30m" }
    ],
    trainStation: "Brunico/Bruneck - 30km bus",
    shuttle: false, shuttleDesc: "Bus from Brunico/Bruneck",
    parking: { capacity: 2000, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Piz Arlara", zone: "2050m", cuisine: "Ladin Gourmet", price: "€€€" },
        { name: "La Stua Restaurant Corvara", zone: "Village", cuisine: "Ladin", price: "€€€€" },
        { name: "Maso Runch", zone: "Alta Badia valley", cuisine: "South Tyrolean", price: "€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 48, privateLessonFrom: 130,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 58,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 900, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 12, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Corvara village",
      pharmacy: true, atm: true, atmCount: 6
    },
    surroundings: {
      description: "Alta Badia is a Ladin enclave famous across Europe for its extraordinary mountain gastronomy. The Taste the Alps event each year brings Michelin-starred chefs to cook at high-altitude restaurants.",
      nearbyTowns: [
        { name: "Corvara", distance: "0km", desc: "Main Alta Badia resort village" },
        { name: "La Villa", distance: "4km", desc: "Traditional Ladin village" },
        { name: "San Cassiano", distance: "5km", desc: "Quiet upper valley village" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Spa & wellness", "Ladin gastronomy tours"],
      touristBoard: "Alta Badia Tourism",
      touristBoardUrl: "https://www.altabadia.org",
      emergency: "112",
      hospital: "Ospedale di Brunico (30km)"
    },
    webcams: [
      { name: "La Villa 2100m", seed: "alta-badia-cam1" },
      { name: "Gran Risa race run", seed: "alta-badia-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Alta Badia World Cup", type: "Competition", desc: "FIS Alpine Ski World Cup giant slalom on Gran Risa" }
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
      overall: 9.1,
      breakdown: { pistes: 9.2, lifts: 9.1, apresSki: 9.3, value: 8.7, beginners: 8.8 },
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
    id: "kronplatz",
    name: "Plan de Corones / Kronplatz",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Alto Adige / South Tyrol, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.74, lng: 11.95,
    minAltitude: 800, maxAltitude: 2275,
    verticalDrop: 1475,
    pisteKm: 125, runs: 56, lifts: 32,
    gondolas: 10, chairlifts: 16, dragLifts: 6,
    longestRun: 11,
    difficultyBlue: 48, difficultyRed: 29, difficultyBlack: 23,
    snowCannons: 360, snowCannonCoveragePercent: 98, snowCannonKm: 100,
    seasonStart: "2026-12-05", seasonEnd: "2027-04-04",
    openStatus: "Open", roadStatus: "open",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 54,
    seasonDates: "Dec 2026 – Apr 2027",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Family resort", "Freeride"],
    description: "Plan de Corones / Kronplatz is a unique conical summit rising in isolation to 2,275m above the Puster valley in South Tyrol, with ski runs descending in all directions to five different valley entry points — Reischach, St. Vigil in Enneberg, Olang, Onach and Geiselsberg. 125km of perfectly groomed pistes spread across 32 state-of-the-art lifts, with 98% snowmaking coverage ensuring reliable conditions throughout the season. At the summit, two world-class mountain museums await: the LUMEN mountain photography museum and the MMM Corones — Reinhold Messner's mountain museum carved into the rock. With 42 mountain huts and restaurants, outstanding panoramic views of the Dolomites, Zillertal Alps and as far as the Großglockner, Kronplatz is one of the premier ski destinations in the Alps. Winter 2026/27 sees a major upgrade: new 8-person chairlift Dolomiti, renewed 8-person gondola Ruis, and an entirely new 10-person Kronplatz 1+2 gondola (by Leitner) plus two new pistes.",
    logo: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/7f91dd0a4_Kronplatz_Logo.png",
    logoBackground: "blue",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/c9faa11d5_wwwwisthalercom_26_04_kronplatz__HW87405.jpg",
    images: [
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/44a1c2214_wisthalercom_24_01_kronplatz_heli__HW65361.jpg", credits: "© Harald Wisthaler / Kronplatz" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/c9faa11d5_wwwwisthalercom_26_04_kronplatz__HW87405.jpg", credits: "© Harald Wisthaler / Kronplatz" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f3fa74e27_wisthalercom_24_01_kronplatz_heli__HW86012.jpg", credits: "© Harald Wisthaler / Kronplatz" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/2f2a3384c_wisthalercom_24_12_Kronplatz__HW86367.jpg", credits: "© Harald Wisthaler / Kronplatz" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f42096177_wisthalercom_24_12_Kronplatz__HW86904.jpg", credits: "© Harald Wisthaler / Kronplatz" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/2b4669b1d_wisthalercom_24_12_Kronplatz__HW84413.jpg", credits: "© Harald Wisthaler / Kronplatz" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/069e2b166_wwwwisthalercom_13_12_alpenlift_doppelmayr_HAW_0015.jpg", credits: "© Harald Wisthaler / Kronplatz" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/40de65d7b_SkiramaKronplatz_SafetyPark3.jpg", credits: "© Skirama Kronplatz" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/0883292a2_wwwwisthalercom_26_04_kronplatz__HW86940.jpg", credits: "© Harald Wisthaler / Kronplatz" },
      { src: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/b2efc6dc4_wwwwisthalercom_16_01_Kronplatz_MMM_HAW_8362.jpg", credits: "© Harald Wisthaler / Kronplatz" },
    ],
    weather: { temp: -5, snowDepth: 145, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 170, snowType: "Machine-groomed",
    liftsOpen: 29, liftsTotal: 32, pistesOpen: 50, pistesTotal: 56,
    ecoRating: 4, ecoRenewable: 80, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: [
      "80% renewable electricity",
      "98% snowmaking coverage — one of the highest in the Alps",
      "Green Globe certified",
      "Nachhaltigkeit strategy — long-term ecological commitment",
      "Electric shuttle buses from Brunico/Bruneck",
    ],
    ecoOffsetProgram: false,
    newForSeason: {
      season: "2026/27",
      headline: "Major lift & piste upgrades for winter 2026/27",
      items: [
        {
          type: "New lift",
          name: "8-person chairlift Dolomiti (new build)",
          detail: "Summit: 2,186m · Base: 1,853m · Length: 1,356m · Speed: 5.0 m/s · Capacity: 3,000 p/h · Doppelmayr",
        },
        {
          type: "Renewed lift",
          name: "8-person gondola Ruis (renewal)",
          detail: "Summit: 2,277m · Base: 1,752m · Length: 1,568m · Speed: 6.0 m/s · Capacity: 3,600 p/h · Doppelmayr",
        },
        {
          type: "Renewed lift",
          name: "10-person gondola Kronplatz 1 (renewal by Leitner)",
          detail: "Base: 975m · Mid: 1,500m · Length: 1,819m · Speed: 6.5 m/s · Capacity: 3,250 p/h",
        },
        {
          type: "Renewed lift",
          name: "10-person gondola Kronplatz 2 (renewal by Leitner)",
          detail: "Mid: 1,500m · Summit: 2,271m · Length: 2,176m · Speed: 6.5 m/s · Capacity: 3,250 p/h",
        },
        {
          type: "New piste",
          name: "Piste Dolomiti",
          detail: "Length: 1.5 km · Difficulty: Blue · Vertical drop: 333m",
        },
        {
          type: "New piste",
          name: "Piste Lumen",
          detail: "Length: 2.7 km · Difficulty: Red · Vertical drop: 775m",
        },
      ],
    },
    villages: [
      { name: "Reischach / Riscone", altitudeValley: 834, desc: "Main gondola base, closest to Brunico" },
      { name: "St. Vigil in Enneberg / San Vigilio di Marebbe", altitudeValley: 1201, desc: "Eastern access point" },
      { name: "Olang / Valdaora", altitudeValley: 1050, desc: "Northern access point" },
      { name: "Onach / Onago", altitudeValley: 980, desc: "Western access point" },
      { name: "Geiselsberg / Casteldarne", altitudeValley: 930, desc: "South-western access point" },
    ],
    airports: [
      { airport: "Bolzano", iata: "BZO", driveTime: "45m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Venice Marco Polo", iata: "VCE", driveTime: "2h 30m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Brunico/Bruneck — 10km (regular bus/shuttle to all base stations)",
    shuttle: true, shuttleDesc: "Regular shuttle buses from Brunico/Bruneck train station to all 5 valley base stations. Ski bus between Reischach, Olang and St. Vigil.",
    parking: { capacity: 2500, pricePerDay: 11, includedInPass: false },
    contact: {
      website: "www.kronplatz.com",
    },
    facilities: {
      restaurants: [
        { name: "LUMEN Restaurant", zone: "Summit 2,275m", cuisine: "South Tyrolean Gourmet", price: "€€€" },
        { name: "MMM Corones Café", zone: "Summit 2,275m", cuisine: "Alpine", price: "€€€" },
        { name: "Haberhutte", zone: "Mid-mountain", cuisine: "South Tyrolean", price: "€€" },
        { name: "Concordia 2000", zone: "2,000m", cuisine: "Alpine", price: "€€" },
        { name: "Edelweiss", zone: "Mid-mountain Reischach", cuisine: "South Tyrolean", price: "€€" },
        { name: "42 Hütten & Restaurants on-mountain", zone: "Various", cuisine: "South Tyrolean / Alpine", price: "€-€€€" },
      ],
      skiSchools: 4, groupLessonFrom: 46, privateLessonFrom: 120,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 56,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Brunico/Bruneck (10km)",
      pharmacy: false, atm: true, atmCount: 5
    },
    surroundings: {
      description: "Kronplatz / Plan de Corones is a unique isolated conical summit rising above the Puster valley in South Tyrol. Five different valley entry points connect to the summit, and the 360° panorama encompasses the Dolomites, Zillertal Alps, Ötztal Alps and on clear days the Großglockner. Brunico/Bruneck is a vibrant market town with a medieval castle, excellent South Tyrolean cuisine and strong Ladin cultural heritage. The LUMEN mountain photography museum and MMM Corones (Reinhold Messner's mountain museum) at the summit make Kronplatz unique among Alpine ski areas. In summer: Bike Park with 30+ trails, hiking, paragliding, Skyscraper viewing platform and Zip-Line.",
      nearbyTowns: [
        { name: "Brunico/Bruneck", distance: "10km", desc: "Main Puster valley city with medieval castle — lively dining, shopping and culture" },
        { name: "Reischach/Riscone", distance: "5km", desc: "Main gondola base village" },
        { name: "San Vigilio di Marebbe", distance: "15km", desc: "Quiet Ladin valley village — eastern access point" },
        { name: "Olang/Valdaora", distance: "12km", desc: "Charming village — northern access to Kronplatz" }
      ],
      activities: [
        "LUMEN mountain photography museum (summit)",
        "MMM Corones — Reinhold Messner Mountain Museum (summit)",
        "Snowshoeing",
        "Cross-country skiing",
        "Puster valley winter walks",
        "South Tyrolean cuisine & wine",
        "Spa & wellness in Brunico",
        "Summer: Kronplatz Bike Park (30+ trails)",
        "Summer: Paragliding & tandem flights",
        "Summer: Skyscraper viewing platform",
        "Summer: Zip-Line",
        "Helikopterflug (helicopter tours)",
      ],
      touristBoard: "Skirama Kronplatz / Ferienregion Kronplatz",
      touristBoardUrl: "https://www.kronplatz.com",
      emergency: "112",
      hospital: "Ospedale di Brunico (10km)"
    },
    webcams: [
      { name: "Kronplatz summit 2,275m", seed: "kronplatz-cam1" },
      { name: "Reischach base gondola", seed: "kronplatz-cam2" },
      { name: "Mid-mountain panorama", seed: "kronplatz-cam3" }
    ],
    events: [
      { date: "Jan 2027", name: "Kronplatz Super G Ladies World Cup", type: "Competition", desc: "FIS Alpine Ski World Cup super-G for women on the Rita Oberhauser downhill course" },
      { date: "Dec 2026", name: "Season Opening — new lifts debut", type: "Festival", desc: "Opening weekend celebrating the new Kronplatz 1+2 gondola, new Dolomiti chairlift and new Ruis gondola" },
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 54, child: 27, senior: 43, badge: null },
      { type: "3-day", adult: 148, child: 74, senior: 118, badge: null },
      { type: "6-day", adult: 277, child: 139, senior: 222, badge: "Best value" },
      { type: "Season", adult: 1255, child: 628, senior: 1004, badge: null }
    ],
    passNote: "Dolomiti Superski pass valid — access to 12 ski areas and 1,200km of pistes across the Dolomites.",
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 9.0, lifts: 9.2, apresSki: 8.8, value: 8.9, beginners: 9.0 },
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
    id: "madonna-campiglio",
    name: "Madonna di Campiglio",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Trentino, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.23, lng: 10.83,
    minAltitude: 1520, maxAltitude: 2600,
    verticalDrop: 1080,
    pisteKm: 150, runs: 64, lifts: 60,
    gondolas: 15, chairlifts: 32, dragLifts: 13,
    longestRun: 10,
    difficultyBlue: 32, difficultyRed: 47, difficultyBlack: 21,
    snowCannons: 320, snowCannonKm: 110,
    seasonStart: "2024-11-30", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 56,
    seasonDates: "30 Nov 2024 - 20 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Luxury"],
    description: "The premier ski resort of Trentino hosting World Cup 3-Tre slalom events annually. Connected with Folgarida and Marilleva in the Skirama Dolomiti network for 150km of predominantly intermediate terrain between the Adamello and Brenta groups.",
    image: "https://picsum.photos/seed/madonna-campiglio/800/500",
    images: ["https://picsum.photos/seed/madonna-campiglio-1/1200/700", "https://picsum.photos/seed/madonna-campiglio-2/1200/700", "https://picsum.photos/seed/madonna-campiglio-3/1200/700"],
    weather: { temp: -6, snowDepth: 160, condition: "Sunny", forecast: [
      { day: "Today", high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "clear" },
      { day: "Thu", high: -7, low: -13, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 135, snowDepthTop: 190, snowType: "Packed powder",
    liftsOpen: 54, liftsTotal: 60, pistesOpen: 57, pistesTotal: 64,
    ecoRating: 3, ecoRenewable: 70, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["70% renewable electricity", "Brenta Dolomites UNESCO heritage cooperation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Verona", iata: "VRN", driveTime: "2h" },
      { airport: "Milan Malpensa", iata: "MXP", driveTime: "2h 30m" },
      { airport: "Trento", iata: "TRN", driveTime: "1h" }
    ],
    trainStation: "Trento - 60km bus",
    shuttle: false, shuttleDesc: "Bus from Trento",
    parking: { capacity: 2000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Graffer", zone: "2261m", cuisine: "Trentino Alpine", price: "€€€" },
        { name: "Malga Ritorto", zone: "1750m", cuisine: "Alpine", price: "€€" },
        { name: "Il Convivio", zone: "Village", cuisine: "Italian Gourmet", price: "€€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 48, privateLessonFrom: 130,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 60,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 900, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 12, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Madonna di Campiglio village",
      pharmacy: true, atm: true, atmCount: 6
    },
    surroundings: {
      description: "Madonna di Campiglio sits between the Adamello and Brenta Dolomite groups at 1520m. The resort has been a royal favourite since Empress Sissi of Austria wintered here in the 19th century.",
      nearbyTowns: [
        { name: "Madonna di Campiglio", distance: "0km", desc: "Premier Trentino luxury resort" },
        { name: "Pinzolo", distance: "15km", desc: "Valley town at the entrance to the resort" },
        { name: "Trento", distance: "60km", desc: "Trentino regional capital" }
      ],
      activities: ["Snowshoeing", "Spa & wellness", "Cross-country skiing", "Brenta Dolomites hiking", "Ice skating"],
      touristBoard: "Madonna di Campiglio Tourism",
      touristBoardUrl: "https://www.campigliodolomiti.it",
      emergency: "112",
      hospital: "Ospedale di Tione (20km)"
    },
    webcams: [
      { name: "Spinale 2104m", seed: "madonna-cam1" },
      { name: "Grostè 2437m", seed: "madonna-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "3-Tre World Cup Slalom", type: "Competition", desc: "FIS Alpine Ski World Cup night slalom on the 3-Tre course" }
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
      breakdown: { pistes: 9.0, lifts: 9.1, apresSki: 9.2, value: 8.6, beginners: 8.8 },
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
    id: "courmayeur",
    name: "Courmayeur",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Valle d'Aosta, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 45.80, lng: 6.97,
    minAltitude: 1224, maxAltitude: 2755,
    verticalDrop: 1531,
    pisteKm: 100, runs: 43, lifts: 20,
    gondolas: 7, chairlifts: 10, dragLifts: 3,
    longestRun: 11,
    difficultyBlue: 26, difficultyRed: 48, difficultyBlack: 26,
    snowCannons: 140, snowCannonKm: 55,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 58,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["ikon-pass"],
    resortTypes: ["Alpine", "Freeride", "Luxury"],
    description: "Sitting beneath the southern face of Mont Blanc connected to Chamonix by the Mont Blanc Express cable car. Predominantly challenging skiing with exceptional off-piste terrain and a vibrant Italian mountain town atmosphere.",
    image: "https://picsum.photos/seed/courmayeur/800/500",
    images: ["https://picsum.photos/seed/courmayeur-1/1200/700", "https://picsum.photos/seed/courmayeur-2/1200/700", "https://picsum.photos/seed/courmayeur-3/1200/700"],
    weather: { temp: -7, snowDepth: 175, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 80, snowDepthMid: 145, snowDepthTop: 215, snowType: "Packed powder",
    liftsOpen: 18, liftsTotal: 20, pistesOpen: 39, pistesTotal: 43,
    ecoRating: 3, ecoRenewable: 62, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["62% renewable electricity", "Mont Blanc massif conservation partnership"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "1h 30m" },
      { airport: "Turin", iata: "TRN", driveTime: "2h" },
      { airport: "Milan Malpensa", iata: "MXP", driveTime: "2h 30m" }
    ],
    trainStation: "Aosta - 35km bus",
    shuttle: false, shuttleDesc: "Bus from Aosta",
    parking: { capacity: 2000, pricePerDay: 13, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Monte Bianco", zone: "2165m", cuisine: "Italian Alpine", price: "€€€" },
        { name: "Chalet Plan Checrouit", zone: "1706m", cuisine: "Valdostan", price: "€€€" },
        { name: "La Maison de Filippo", zone: "Village", cuisine: "Italian", price: "€€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 50, privateLessonFrom: 135,
      languages: ["🇮🇹", "🇬🇧", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 62,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 700, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Courmayeur town",
      pharmacy: true, atm: true, atmCount: 6
    },
    surroundings: {
      description: "Courmayeur is an authentic Italian mountain town with a long Alpine tradition. The Mont Blanc Tunnel connects it to Chamonix and the Skyway Monte Bianco gondola offers one of the most spectacular views in the Alps.",
      nearbyTowns: [
        { name: "Courmayeur", distance: "0km", desc: "Authentic Italian mountain town beneath Mont Blanc" },
        { name: "La Thuile", distance: "18km", desc: "Linked Italian resort near the French border" },
        { name: "Chamonix", distance: "15km via tunnel", desc: "French alpine adventure capital" }
      ],
      activities: ["Freeride tours", "Spa & wellness", "Snowshoeing", "Ice skating", "Mont Blanc Skyway visits"],
      touristBoard: "Courmayeur Tourism",
      touristBoardUrl: "https://www.courmayeur.com",
      emergency: "112",
      hospital: "Ospedale di Aosta (35km)"
    },
    webcams: [
      { name: "Checrouit 2256m", seed: "courmayeur-cam1" },
      { name: "Courmayeur village", seed: "courmayeur-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Courmayeur Mont Blanc Freeride", type: "Competition", desc: "Freeride World Tour qualifier on the Mont Blanc slopes" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 58, child: 29, senior: 46, badge: null },
      { type: "3-day", adult: 159, child: 80, senior: 127, badge: null },
      { type: "6-day", adult: 298, child: 149, senior: 238, badge: "Best value" },
      { type: "Season", adult: 1350, child: 675, senior: 1080, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 9.0, lifts: 8.9, apresSki: 9.3, value: 8.7, beginners: 8.4 },
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
    id: "livigno",
    name: "Livigno",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Lombardy, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.54, lng: 10.14,
    minAltitude: 1816, maxAltitude: 2900,
    verticalDrop: 1084,
    pisteKm: 115, runs: 43, lifts: 31,
    gondolas: 9, chairlifts: 16, dragLifts: 6,
    longestRun: 10,
    difficultyBlue: 30, difficultyRed: 47, difficultyBlack: 23,
    snowCannons: 150, snowCannonKm: 60,
    seasonStart: "2024-11-23", seasonEnd: "2025-05-01",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 48,
    seasonDates: "23 Nov 2024 - 1 May 2025",
    seasonPasses: ["ikon-pass"],
    resortTypes: ["Alpine", "Freestyle", "Freeride"],
    description: "A duty-free enclave at 1816m offering 115km of skiing split equally between two mountain flanks. Tax-free status makes lift passes and equipment significantly cheaper than comparable resorts and the resort has one of the best snowparks in Europe.",
    image: "https://picsum.photos/seed/livigno/800/500",
    images: ["https://picsum.photos/seed/livigno-1/1200/700", "https://picsum.photos/seed/livigno-2/1200/700", "https://picsum.photos/seed/livigno-3/1200/700"],
    weather: { temp: -8, snowDepth: 185, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 90, snowDepthMid: 155, snowDepthTop: 215, snowType: "Packed powder",
    liftsOpen: 28, liftsTotal: 31, pistesOpen: 39, pistesTotal: 43,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Duty-free zone reduces transport emissions"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Milan Bergamo", iata: "BGY", driveTime: "2h 30m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h 30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "3h" }
    ],
    trainStation: "Zernez (Switzerland) - 30km bus through Munt La Schera tunnel",
    shuttle: false, shuttleDesc: "Bus from Zernez through the Munt La Schera tunnel",
    parking: { capacity: 3000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Mottolino Bergrestaurant", zone: "2700m", cuisine: "Italian Alpine", price: "€€" },
        { name: "Tea del Vidal", zone: "2200m Carosello", cuisine: "Italian", price: "€€" },
        { name: "Bormio & Co", zone: "Village", cuisine: "Italian", price: "€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 42, privateLessonFrom: 110,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 12, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Burton", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Livigno village",
      pharmacy: true, atm: true, atmCount: 8
    },
    surroundings: {
      description: "Livigno is an ancient smuggling village turned duty-free ski resort in the Valtellina Alps near the Swiss border. The valley has one of the highest average altitudes of any inhabited area in the Alps.",
      nearbyTowns: [
        { name: "Livigno", distance: "0km", desc: "Duty-free resort village at 1816m" },
        { name: "Bormio", distance: "40km via tunnel", desc: "Historic spa town with World Cup downhill" },
        { name: "Zernez", distance: "30km", desc: "Swiss National Park gateway" }
      ],
      activities: ["Snowpark", "Cross-country skiing", "Snowshoeing", "Tax-free shopping", "Ice skating"],
      touristBoard: "Livigno Tourism",
      touristBoardUrl: "https://www.livigno.eu",
      emergency: "112",
      hospital: "Ospedale di Sondalo (45km)"
    },
    webcams: [
      { name: "Mottolino 2700m", seed: "livigno-cam1" },
      { name: "Carosello 3000m", seed: "livigno-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Livigno Snowboard Open", type: "Competition", desc: "International snowboard competition at Mottolino snowpark" }
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
      overall: 8.8,
      breakdown: { pistes: 8.8, lifts: 8.9, apresSki: 8.7, value: 9.5, beginners: 9.0 },
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
    id: "bormio",
    name: "Bormio",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Lombardy, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.47, lng: 10.37,
    minAltitude: 1225, maxAltitude: 3012,
    verticalDrop: 1787,
    pisteKm: 50, runs: 22, lifts: 11,
    gondolas: 4, chairlifts: 5, dragLifts: 2,
    longestRun: 12,
    difficultyBlue: 24, difficultyRed: 47, difficultyBlack: 29,
    snowCannons: 60, snowCannonKm: 25,
    seasonStart: "2024-11-23", seasonEnd: "2025-04-27",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 52,
    seasonDates: "23 Nov 2024 - 27 Apr 2025",
    seasonPasses: ["ikon-pass"],
    resortTypes: ["Alpine", "Wellness", "Freeride"],
    description: "A historic spa town home to World Cup downhill events on the famous Stelvio course. The skiing reaches 3012m with exceptional vertical drop of 1800m and the town has Roman thermal baths making it a superb ski and wellness destination.",
    image: "https://picsum.photos/seed/bormio/800/500",
    images: ["https://picsum.photos/seed/bormio-1/1200/700", "https://picsum.photos/seed/bormio-2/1200/700", "https://picsum.photos/seed/bormio-3/1200/700"],
    weather: { temp: -7, snowDepth: 170, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 140, snowDepthTop: 210, snowType: "Packed powder",
    liftsOpen: 10, liftsTotal: 11, pistesOpen: 19, pistesTotal: 22,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Stelvio National Park conservation partnership"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Milan Bergamo", iata: "BGY", driveTime: "2h 30m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h 30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "3h" }
    ],
    trainStation: "Tirano - 35km bus",
    shuttle: false, shuttleDesc: "Bus from Tirano",
    parking: { capacity: 1500, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Oga", zone: "2300m", cuisine: "Italian Alpine", price: "€€" },
        { name: "Bormio Stelvio Restaurant", zone: "3012m", cuisine: "Alpine", price: "€€€" },
        { name: "Il Filo", zone: "Bormio town", cuisine: "Italian", price: "€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 46, privateLessonFrom: 118,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 56,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 550, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Bormio town",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "Bormio is a medieval walled town with Roman thermal baths, situated at the junction of the Stelvio National Park and the Valtellina. The Stelvio Pass road nearby is famous as one of the most spectacular Alpine roads.",
      nearbyTowns: [
        { name: "Bormio", distance: "0km", desc: "Historic Valtellina spa town" },
        { name: "Livigno", distance: "40km via tunnel", desc: "Duty-free resort neighbour" },
        { name: "Tirano", distance: "35km", desc: "UNESCO Bernina Express terminus" }
      ],
      activities: ["Bormio thermal baths", "Snowshoeing", "Stelvio National Park tours", "Cross-country skiing", "Medieval town walks"],
      touristBoard: "Bormio Tourism",
      touristBoardUrl: "https://www.bormio.com",
      emergency: "112",
      hospital: "Ospedale di Sondalo (10km)"
    },
    webcams: [
      { name: "Stelvio 3012m", seed: "bormio-cam1" },
      { name: "Bormio town", seed: "bormio-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Bormio World Cup Downhill", type: "Competition", desc: "FIS Alpine Ski World Cup downhill on the Stelvio" }
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
      breakdown: { pistes: 8.8, lifts: 8.6, apresSki: 8.8, value: 9.0, beginners: 8.3 },
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
    id: "sestriere",
    name: "Sestriere-Via Lattea",
    countries: ["Italy", "France"],
    countryCode: "IT",
    region: "Piedmont, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 44.96, lng: 6.88,
    minAltitude: 1350, maxAltitude: 2823,
    verticalDrop: 1473,
    pisteKm: 400, runs: 146, lifts: 91,
    gondolas: 18, chairlifts: 50, dragLifts: 23,
    longestRun: 14,
    difficultyBlue: 38, difficultyRed: 42, difficultyBlack: 20,
    snowCannons: 350, snowCannonKm: 150,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 52,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Cross-border", "Family resort"],
    description: "The centrepiece of the Via Lattea ski area built by Fiat founder Giovanni Agnelli hosting alpine events in the 2006 Turin Winter Olympics. Connects with Sauze d'Oulx, Sansicario, Claviere and Montgenevre in France for 400km of skiing.",
    image: "https://picsum.photos/seed/sestriere/800/500",
    images: ["https://picsum.photos/seed/sestriere-1/1200/700", "https://picsum.photos/seed/sestriere-2/1200/700", "https://picsum.photos/seed/sestriere-3/1200/700"],
    weather: { temp: -5, snowDepth: 145, condition: "Clear", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 165, snowType: "Machine-groomed",
    liftsOpen: 82, liftsTotal: 91, pistesOpen: 131, pistesTotal: 146,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Franco-Italian cross-border energy cooperation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Turin", iata: "TRN", driveTime: "1h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" },
      { airport: "Marseille", iata: "MRS", driveTime: "3h" }
    ],
    trainStation: "Oulx - 20km bus",
    shuttle: false, shuttleDesc: "Bus from Oulx station",
    parking: { capacity: 4000, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Fraiteve Restaurant", zone: "2701m", cuisine: "Italian Alpine", price: "€€" },
        { name: "Sises Alpage", zone: "2300m", cuisine: "Piedmontese", price: "€€" },
        { name: "Grand Hotel Sestriere", zone: "Village", cuisine: "Italian", price: "€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 44, privateLessonFrom: 115,
      languages: ["🇮🇹", "🇬🇧", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 900, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 12, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Sestriere village",
      pharmacy: true, atm: true, atmCount: 6
    },
    surroundings: {
      description: "Sestriere was purpose-built in the 1930s by Fiat boss Giovanni Agnelli as a company ski resort. The two distinctive cylindrical towers remain landmarks. The connection to Montgenevre in France creates one of the largest cross-border ski areas in the Alps.",
      nearbyTowns: [
        { name: "Sestriere", distance: "0km", desc: "Fiat-built resort, 2006 Olympic venue" },
        { name: "Sauze d'Oulx", distance: "12km", desc: "Lively linked Via Lattea village" },
        { name: "Claviere", distance: "8km", desc: "Border village connecting to France" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Ice skating", "Olympic venues tours"],
      touristBoard: "Via Lattea Tourism",
      touristBoardUrl: "https://www.vialattea.it",
      emergency: "112",
      hospital: "Ospedale di Pinerolo (50km)"
    },
    webcams: [
      { name: "Fraiteve 2701m", seed: "sestriere-cam1" },
      { name: "Sestriere village", seed: "sestriere-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Sestriere FIS Speed Events", type: "Competition", desc: "FIS Alpine Ski World Cup downhill training races" }
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
      breakdown: { pistes: 8.8, lifts: 8.7, apresSki: 8.5, value: 9.1, beginners: 9.0 },
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