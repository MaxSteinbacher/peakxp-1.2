export const austrianResorts4 = [
  {
    id: "warth-schroecken",
    name: "Warth-Schroecken",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Vorarlberg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.26, lng: 10.18,
    minAltitude: 1495, maxAltitude: 2044,
    verticalDrop: 549,
    pisteKm: 85, runs: 38, lifts: 12,
    gondolas: 4, chairlifts: 6, dragLifts: 2,
    longestRun: 8,
    difficultyBlue: 24, difficultyRed: 55, difficultyBlack: 21,
    snowCannons: 50, snowCannonKm: 18,
    seasonStart: "2024-11-23", seasonEnd: "2025-05-01",
    openStatus: "Open", roadStatus: "chains",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 58,
    seasonDates: "23 Nov 2024 - 1 May 2025",
    seasonPasses: ["laendle-card", "ikon-pass"],
    resortTypes: ["Alpine", "Freeride", "Powder"],
    description: "Warth-Schroecken receives more snowfall than almost any other resort in the Alps averaging over 10 metres per season. Connected to Lech-Zurs and part of the Ski Arlberg area offering exceptional powder skiing in a quiet unspoiled high-altitude setting.",
    image: "https://picsum.photos/seed/warth-schroecken/800/500",
    images: ["https://picsum.photos/seed/warth-schroecken-1/1200/700", "https://picsum.photos/seed/warth-schroecken-2/1200/700", "https://picsum.photos/seed/warth-schroecken-3/1200/700"],
    weather: { temp: -8, snowDepth: 280, condition: "Snowy", forecast: [
      { day: "Today", high: -6, low: -12, condition: "snow" },
      { day: "Tomorrow", high: -7, low: -13, condition: "snow" },
      { day: "Thu", high: -9, low: -15, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 160, snowDepthMid: 240, snowDepthTop: 290, snowType: "Powder",
    liftsOpen: 11, liftsTotal: 12, pistesOpen: 35, pistesTotal: 38,
    ecoRating: 3, ecoRenewable: 45, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["45% renewable electricity", "Natural snowfall minimises snowmaking"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "2h" },
      { airport: "Friedrichshafen", iata: "FDH", driveTime: "1h 30m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" }
    ],
    trainStation: "Langen am Arlberg - 20km bus",
    shuttle: false, shuttleDesc: "Bus from Langen am Arlberg station",
    parking: { capacity: 800, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Auenfelder Hotel Restaurant", zone: "Village", cuisine: "Austrian", price: "€€" },
        { name: "Steffisalp Alpe", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 45, privateLessonFrom: 115,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 55,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 180, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Warth and Schroecken are tiny traditional villages at the top of the Bregenzerwald connected to the wider Ski Arlberg domain including Lech and Zurs.",
      nearbyTowns: [
        { name: "Warth", distance: "0km", desc: "Small mountain village at 1495m" },
        { name: "Lech am Arlberg", distance: "10km", desc: "Luxury ski village with international clientele" },
        { name: "Bregenz", distance: "60km", desc: "Vorarlberg capital on Lake Constance" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Freeride tours"],
      touristBoard: "Warth-Schroecken Tourismus",
      touristBoardUrl: "https://www.warth-schroecken.at",
      emergency: "112",
      hospital: "LKH Bregenz (60km)"
    },
    webcams: [
      { name: "Warth summit 2044m", seed: "warth-cam1" },
      { name: "Schroecken village", seed: "warth-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Powder Days Warth", type: "Festival", desc: "Powder skiing celebration" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 58, child: 29, senior: 46, badge: null },
      { type: "3-day", adult: 159, child: 80, senior: 127, badge: null },
      { type: "6-day", adult: 298, child: 149, senior: 238, badge: "Best value" },
      { type: "Season", adult: 1330, child: 665, senior: 1064, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 9.0, lifts: 8.7, apresSki: 8.5, value: 8.8, beginners: 8.2 },
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
    id: "brandnertal",
    name: "Brandnertal",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Vorarlberg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.14, lng: 9.75,
    minAltitude: 1020, maxAltitude: 2000,
    verticalDrop: 980,
    pisteKm: 55, runs: 30, lifts: 10,
    gondolas: 3, chairlifts: 5, dragLifts: 2,
    longestRun: 8,
    difficultyBlue: 35, difficultyRed: 45, difficultyBlack: 20,
    snowCannons: 50, snowCannonKm: 20,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "14 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["laendle-card"],
    resortTypes: ["Alpine", "Family resort"],
    description: "A quiet and scenic valley in Vorarlberg with 55km of skiing and the spectacular Lunersee reservoir as backdrop. Authentic character away from the larger Arlberg crowds with good family facilities.",
    image: "https://picsum.photos/seed/brandnertal/800/500",
    images: ["https://picsum.photos/seed/brandnertal-1/1200/700", "https://picsum.photos/seed/brandnertal-2/1200/700", "https://picsum.photos/seed/brandnertal-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 160, snowType: "Packed powder",
    liftsOpen: 9, liftsTotal: 10, pistesOpen: 27, pistesTotal: 30,
    ecoRating: 3, ecoRenewable: 60, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["60% renewable electricity", "Lunersee hydro power integration"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "1h 30m" },
      { airport: "Friedrichshafen", iata: "FDH", driveTime: "1h" }
    ],
    trainStation: "Bludenz - 12km bus into the valley",
    shuttle: false, shuttleDesc: "Bus from Bludenz station into the valley",
    parking: { capacity: 1200, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Scesaplana Restaurant", zone: "Summit 2000m", cuisine: "Austrian", price: "€€" },
        { name: "Palud Alpe", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 220, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: false,
      medicalCentre: true, medicalLocation: "Brand village",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "The Brandnertal is one of Vorarlbergs most scenic valleys with the turquoise Lunersee lake visible from the upper slopes. Bludenz at the valley entrance is a charming small city.",
      nearbyTowns: [
        { name: "Brand", distance: "0km", desc: "Quiet village at the head of the valley" },
        { name: "Bludenz", distance: "12km", desc: "Vorarlberg market town with train connections" },
        { name: "Feldkirch", distance: "25km", desc: "Medieval city near the Swiss border" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating"],
      touristBoard: "Brandnertal Tourismus",
      touristBoardUrl: "https://www.brandnertal.at",
      emergency: "112",
      hospital: "LKH Bludenz (12km)"
    },
    webcams: [
      { name: "Niggenkopf 2000m", seed: "brandnertal-cam1" },
      { name: "Brand village", seed: "brandnertal-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Brandnertal Family Race", type: "Competition", desc: "Annual fun race for all ages" }
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
      overall: 8.3,
      breakdown: { pistes: 8.3, lifts: 8.1, apresSki: 8.0, value: 9.2, beginners: 9.3 },
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
    id: "wildkogel-arena",
    name: "Wildkogel Arena",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.28, lng: 12.28,
    minAltitude: 854, maxAltitude: 2368,
    verticalDrop: 1514,
    pisteKm: 60, runs: 34, lifts: 14,
    gondolas: 4, chairlifts: 7, dragLifts: 3,
    longestRun: 14,
    difficultyBlue: 32, difficultyRed: 50, difficultyBlack: 18,
    snowCannons: 65, snowCannonKm: 26,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 47,
    seasonDates: "14 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "The Wildkogel Arena in the Upper Pinzgau valley connects Neukirchen and Bramberg with 60km of well-groomed slopes and some of the longest runs in Salzburg. Quieter than neighbouring Zell am See with excellent value.",
    image: "https://picsum.photos/seed/wildkogel-arena/800/500",
    images: ["https://picsum.photos/seed/wildkogel-arena-1/1200/700", "https://picsum.photos/seed/wildkogel-arena-2/1200/700", "https://picsum.photos/seed/wildkogel-arena-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 110, snowDepthTop: 165, snowType: "Packed powder",
    liftsOpen: 13, liftsTotal: 14, pistesOpen: 30, pistesTotal: 34,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Pinzgau valley water management"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Zell am See - 22km bus along Pinzgau valley",
    shuttle: false, shuttleDesc: "Bus from Zell am See along the Pinzgau valley",
    parking: { capacity: 1500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Wildkogel Restaurant", zone: "Summit 2368m", cuisine: "Austrian", price: "€€" },
        { name: "Bramberg Hutte", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 2, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 300, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Neukirchen village",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "The Upper Pinzgau is a wide valley in Salzburg Land with the Hohe Tauern national park peaks visible from the slopes. The Grossvenediger glacier dominates the southern skyline.",
      nearbyTowns: [
        { name: "Neukirchen am Grossvenediger", distance: "0km", desc: "Traditional Pinzgau village" },
        { name: "Bramberg", distance: "5km", desc: "Connected village in the Pinzgau valley" },
        { name: "Zell am See", distance: "22km", desc: "Major Salzburg resort town with lake" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating", "Tobogganing"],
      touristBoard: "Wildkogel Arena Tourismus",
      touristBoardUrl: "https://www.wildkogel-arena.at",
      emergency: "112",
      hospital: "Zell am See hospital (22km)"
    },
    webcams: [
      { name: "Wildkogel 2368m", seed: "wildkogel-cam1" },
      { name: "Neukirchen base", seed: "wildkogel-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Wildkogel Vertical Race", type: "Competition", desc: "Long vertical descent race event" }
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
      breakdown: { pistes: 8.4, lifts: 8.2, apresSki: 7.9, value: 9.3, beginners: 9.1 },
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
    id: "heiligenblut",
    name: "Grossglockner Resort Heiligenblut",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Carinthia, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.04, lng: 12.84,
    minAltitude: 1288, maxAltitude: 2907,
    verticalDrop: 1619,
    pisteKm: 55, runs: 27, lifts: 12,
    gondolas: 4, chairlifts: 6, dragLifts: 2,
    longestRun: 10,
    difficultyBlue: 22, difficultyRed: 52, difficultyBlack: 26,
    snowCannons: 50, snowCannonKm: 18,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "chains",
    rating: 8.5, ratingLabel: "Excellent", priceFrom: 49,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: ["alpin-card"],
    resortTypes: ["Alpine", "Freeride"],
    description: "Sits beneath Austrias highest peak the Grossglockner with skiing up to 2907m. The iconic church spire of the village is one of the most recognizable images in Alpine skiing and the high-altitude terrain suits confident intermediates and experts.",
    image: "https://picsum.photos/seed/heiligenblut/800/500",
    images: ["https://picsum.photos/seed/heiligenblut-1/1200/700", "https://picsum.photos/seed/heiligenblut-2/1200/700", "https://picsum.photos/seed/heiligenblut-3/1200/700"],
    weather: { temp: -7, snowDepth: 170, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 70, snowDepthMid: 140, snowDepthTop: 210, snowType: "Packed powder",
    liftsOpen: 11, liftsTotal: 12, pistesOpen: 24, pistesTotal: 27,
    ecoRating: 3, ecoRenewable: 42, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["42% renewable electricity", "Grossglockner national park stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Klagenfurt", iata: "KLU", driveTime: "2h" },
      { airport: "Salzburg", iata: "SZG", driveTime: "2h" },
      { airport: "Graz", iata: "GRZ", driveTime: "3h" }
    ],
    trainStation: "Spittal-Millstattersee - 40km bus",
    shuttle: false, shuttleDesc: "Bus from Spittal-Millstattersee",
    parking: { capacity: 1200, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Schareck Restaurant", zone: "2600m", cuisine: "Austrian", price: "€€€" },
        { name: "Hohe Dock Hutte", zone: "2450m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 42, privateLessonFrom: 108,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 250, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: false,
      medicalCentre: true, medicalLocation: "Heiligenblut village",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Heiligenblut sits at the foot of the Grossglockner, Austrias highest mountain at 3798m. The famous pilgrimage church and dramatic mountain scenery make this one of the most photogenic villages in the Alps.",
      nearbyTowns: [
        { name: "Heiligenblut", distance: "0km", desc: "Iconic village with famous church and Grossglockner backdrop" },
        { name: "Lienz", distance: "50km", desc: "East Tyrolean capital" },
        { name: "Spittal an der Drau", distance: "40km", desc: "Carinthian town with train connections" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Glacier tours", "Photography"],
      touristBoard: "Heiligenblut Tourismus",
      touristBoardUrl: "https://www.heiligenblut.at",
      emergency: "112",
      hospital: "LKH Spittal an der Drau (40km)"
    },
    webcams: [
      { name: "Schareck 2600m", seed: "heiligenblut-cam1" },
      { name: "Heiligenblut village", seed: "heiligenblut-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Grossglockner FIS Race", type: "Competition", desc: "FIS race on the Schareck downhill" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 49, child: 25, senior: 39, badge: null },
      { type: "3-day", adult: 134, child: 67, senior: 107, badge: null },
      { type: "6-day", adult: 251, child: 126, senior: 201, badge: "Best value" },
      { type: "Season", adult: 1120, child: 560, senior: 896, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.5,
      breakdown: { pistes: 8.6, lifts: 8.4, apresSki: 8.1, value: 9.0, beginners: 8.0 },
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
    id: "turracher-hoehe",
    name: "Turracher Hoehe",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Styria/Carinthia, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 46.92, lng: 14.01,
    minAltitude: 1763, maxAltitude: 2195,
    verticalDrop: 432,
    pisteKm: 38, runs: 18, lifts: 11,
    gondolas: 2, chairlifts: 6, dragLifts: 3,
    longestRun: 6,
    difficultyBlue: 32, difficultyRed: 50, difficultyBlack: 18,
    snowCannons: 40, snowCannonKm: 16,
    seasonStart: "2024-11-30", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "chains",
    rating: 8.1, ratingLabel: "Excellent", priceFrom: 41,
    seasonDates: "30 Nov 2024 - 6 Apr 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Sits at 1763m on the border of Styria and Carinthia with a romantic frozen lake setting. The compact ski area suits families and beginners and the high altitude pass ensures excellent natural snowfall.",
    image: "https://picsum.photos/seed/turracher-hoehe/800/500",
    images: ["https://picsum.photos/seed/turracher-hoehe-1/1200/700", "https://picsum.photos/seed/turracher-hoehe-2/1200/700", "https://picsum.photos/seed/turracher-hoehe-3/1200/700"],
    weather: { temp: -6, snowDepth: 150, condition: "Snowy", forecast: [
      { day: "Today", high: -4, low: -10, condition: "snow" },
      { day: "Tomorrow", high: -5, low: -11, condition: "partly_cloudy" },
      { day: "Thu", high: -7, low: -13, condition: "clear" }
    ]},
    snowDepthBase: 90, snowDepthMid: 135, snowDepthTop: 170, snowType: "Packed powder",
    liftsOpen: 10, liftsTotal: 11, pistesOpen: 16, pistesTotal: 18,
    ecoRating: 3, ecoRenewable: 48, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["48% renewable electricity", "Frozen lake ecosystem protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Klagenfurt", iata: "KLU", driveTime: "1h 30m" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Tamsweg - 35km bus",
    shuttle: false, shuttleDesc: "Bus from Tamsweg",
    parking: { capacity: 1000, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Eisseehochsitz Restaurant", zone: "Summit 2195m", cuisine: "Austrian", price: "€€" },
        { name: "Seehof Restaurant", zone: "Lake level", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 36, privateLessonFrom: 92,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 200, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "The Turracher Hoehe pass sits between the Nock Mountains in Carinthia and the Green Styrian Alps. The frozen Turracher Lake in winter creates a fairy-tale setting.",
      nearbyTowns: [
        { name: "Turrach", distance: "0km", desc: "Small village on the high pass" },
        { name: "Murau", distance: "30km", desc: "Historic Styrian town" },
        { name: "Klagenfurt", distance: "80km", desc: "Carinthian capital" }
      ],
      activities: ["Snowshoeing", "Ice skating on frozen lake", "Winter hiking"],
      touristBoard: "Turracher Hoehe Tourismus",
      touristBoardUrl: "https://www.turracher-hoehe.at",
      emergency: "112",
      hospital: "LKH Judenburg (40km)"
    },
    webcams: [
      { name: "Eisseehochsitz 2195m", seed: "turrach-cam1" },
      { name: "Turracher See", seed: "turrach-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Turracher Midnight Race", type: "Competition", desc: "Night race on the illuminated piste" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 41, child: 21, senior: 33, badge: null },
      { type: "3-day", adult: 113, child: 57, senior: 90, badge: null },
      { type: "6-day", adult: 211, child: 106, senior: 169, badge: "Best value" },
      { type: "Season", adult: 940, child: 470, senior: 752, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.1,
      breakdown: { pistes: 8.1, lifts: 8.0, apresSki: 7.9, value: 9.4, beginners: 9.4 },
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
    id: "sportgastein",
    name: "Sportgastein",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.07, lng: 13.14,
    minAltitude: 1590, maxAltitude: 2686,
    verticalDrop: 1096,
    pisteKm: 50, runs: 12, lifts: 5,
    gondolas: 2, chairlifts: 2, dragLifts: 1,
    longestRun: 10,
    difficultyBlue: 16, difficultyRed: 50, difficultyBlack: 34,
    snowCannons: 20, snowCannonKm: 8,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-27",
    openStatus: "Open", roadStatus: "chains",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 48,
    seasonDates: "7 Dec 2024 - 27 Apr 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Freeride", "Glacier"],
    description: "The high-altitude extension of the Gastein valley rising to 2686m with outstanding freeride terrain. Wide open bowls and reliable powder make it a favourite for advanced skiers seeking space and significant vertical drop.",
    image: "https://picsum.photos/seed/sportgastein/800/500",
    images: ["https://picsum.photos/seed/sportgastein-1/1200/700", "https://picsum.photos/seed/sportgastein-2/1200/700", "https://picsum.photos/seed/sportgastein-3/1200/700"],
    weather: { temp: -9, snowDepth: 195, condition: "Sunny", forecast: [
      { day: "Today", high: -7, low: -13, condition: "clear" },
      { day: "Tomorrow", high: -8, low: -14, condition: "clear" },
      { day: "Thu", high: -10, low: -16, condition: "snow" }
    ]},
    snowDepthBase: 100, snowDepthMid: 165, snowDepthTop: 220, snowType: "Powder",
    liftsOpen: 5, liftsTotal: 5, pistesOpen: 11, pistesTotal: 12,
    ecoRating: 3, ecoRenewable: 38, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["38% renewable electricity", "Gastein valley thermal energy integration"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h" }
    ],
    trainStation: "Bad Gastein - 9km bus",
    shuttle: false, shuttleDesc: "Bus from Bad Gastein",
    parking: { capacity: 600, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Kreuzkogel Restaurant", zone: "2686m", cuisine: "Austrian", price: "€€€" },
        { name: "Schlossalm Hutte", zone: "2050m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 45, privateLessonFrom: 115,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: false, crecheAgeMin: 0, crecheAgeMax: 0, crecheFrom: 0,
      kidsGarden: false, kidsGardenAge: "", babysitting: false,
      lockerCount: 150, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 1, rentalBrands: ["Atomic"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Bad Gastein (9km)",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "Sportgastein is the highest and most remote ski area in the Gastein valley, connected to the wider Ski Amade domain. Bad Gastein below is famous for its belle epoque architecture and thermal springs.",
      nearbyTowns: [
        { name: "Bad Gastein", distance: "9km", desc: "Famous spa town with Victorian architecture and thermal baths" },
        { name: "Bad Hofgastein", distance: "15km", desc: "Traditional Gastein valley village" },
        { name: "Salzburg", distance: "90km", desc: "Mozart birthplace and cultural capital" }
      ],
      activities: ["Freeride tours", "Snowshoeing", "Thermal spa in Bad Gastein"],
      touristBoard: "Gastein Tourismus",
      touristBoardUrl: "https://www.gastein.com",
      emergency: "112",
      hospital: "Schwarzach hospital (50km)"
    },
    webcams: [
      { name: "Kreuzkogel 2686m", seed: "sportgastein-cam1" },
      { name: "Sportgastein base 1590m", seed: "sportgastein-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Gastein Freeride Challenge", type: "Competition", desc: "Freeride competition on the open bowls" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 48, child: 24, senior: 38, badge: null },
      { type: "3-day", adult: 132, child: 66, senior: 106, badge: null },
      { type: "6-day", adult: 246, child: 123, senior: 197, badge: "Best value" },
      { type: "Season", adult: 1100, child: 550, senior: 880, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.4,
      breakdown: { pistes: 8.5, lifts: 8.3, apresSki: 7.5, value: 8.9, beginners: 7.0 },
      items: []
    },
    seasonCalendar: [
      { month: "Nov", status: "closed" }, { month: "Dec", status: "open" },
      { month: "Jan", status: "open" }, { month: "Feb", status: "open" },
      { month: "Mar", status: "open" }, { month: "Apr", status: "open" },
      { month: "May", status: "closed" }, { month: "Jun", status: "closed" },
      { month: "Jul", status: "closed" }, { month: "Aug", status: "closed" },
      { month: "Sep", status: "closed" }, { month: "Oct", status: "closed" }
    ]
  },
  {
    id: "moelltaler-glacier",
    name: "Moelltaler Glacier",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Carinthia, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.01, lng: 13.09,
    minAltitude: 1220, maxAltitude: 2640,
    verticalDrop: 1420,
    pisteKm: 35, runs: 14, lifts: 7,
    gondolas: 3, chairlifts: 3, dragLifts: 1,
    longestRun: 9,
    difficultyBlue: 10, difficultyRed: 52, difficultyBlack: 38,
    snowCannons: 15, snowCannonKm: 5,
    seasonStart: "2024-10-19", seasonEnd: "2025-05-18",
    openStatus: "Open", roadStatus: "open",
    rating: 8.2, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "19 Oct 2024 - 18 May 2025",
    seasonPasses: ["alpin-card"],
    resortTypes: ["Glacier", "Freeride"],
    description: "The Moelltaler Glacier offers snow-sure skiing from October through May with some of the most uncrowded glacier terrain in Austria. Popular with snowboarders for consistent powder and a relaxed uncrowded atmosphere.",
    image: "https://picsum.photos/seed/moelltaler-glacier/800/500",
    images: ["https://picsum.photos/seed/moelltaler-glacier-1/1200/700", "https://picsum.photos/seed/moelltaler-glacier-2/1200/700", "https://picsum.photos/seed/moelltaler-glacier-3/1200/700"],
    weather: { temp: -11, snowDepth: 240, condition: "Sunny", forecast: [
      { day: "Today", high: -9, low: -17, condition: "clear" },
      { day: "Tomorrow", high: -10, low: -18, condition: "clear" },
      { day: "Thu", high: -12, low: -20, condition: "snow" }
    ]},
    snowDepthBase: 110, snowDepthMid: 180, snowDepthTop: 255, snowType: "Powder",
    liftsOpen: 6, liftsTotal: 7, pistesOpen: 12, pistesTotal: 14,
    ecoRating: 3, ecoRenewable: 40, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["40% renewable electricity", "Glacier monitoring program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Klagenfurt", iata: "KLU", driveTime: "2h" },
      { airport: "Salzburg", iata: "SZG", driveTime: "2h 30m" }
    ],
    trainStation: "Spittal-Millstattersee - 30km bus",
    shuttle: false, shuttleDesc: "Bus from Spittal-Millstattersee",
    parking: { capacity: 700, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Mölltaler Gletscherrestaurant", zone: "2640m", cuisine: "Austrian", price: "€€€" },
        { name: "Bergrestaurant Mittelstation", zone: "1900m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 44, privateLessonFrom: 110,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: false, crecheAgeMin: 0, crecheAgeMax: 0, crecheFrom: 0,
      kidsGarden: false, kidsGardenAge: "", babysitting: false,
      lockerCount: 140, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Flattach (5km)",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "The Molltal valley runs north from the Hohe Tauern to join the Drau river at Spittal. The glacier road winds through pristine alpine scenery.",
      nearbyTowns: [
        { name: "Flattach", distance: "5km", desc: "Gateway village to the Molltal glacier" },
        { name: "Spittal an der Drau", distance: "30km", desc: "Major Carinthian town with rail connections" }
      ],
      activities: ["Glacier tours", "Snowshoeing", "Freeride tours"],
      touristBoard: "Moelltal Tourismus",
      touristBoardUrl: "https://www.moelltaler-gletscher.at",
      emergency: "112",
      hospital: "LKH Spittal an der Drau (30km)"
    },
    webcams: [
      { name: "Moelltaler glacier 2640m", seed: "moelltaler-cam1" },
      { name: "Valley station 1220m", seed: "moelltaler-cam2" }
    ],
    events: [
      { date: "Oct 2024", name: "Moelltaler Glacier Opening", type: "Festival", desc: "Early season glacier opening party" }
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
      overall: 8.2,
      breakdown: { pistes: 8.3, lifts: 8.1, apresSki: 7.2, value: 9.0, beginners: 7.5 },
      items: []
    },
    seasonCalendar: [
      { month: "Oct", status: "partial" }, { month: "Nov", status: "open" },
      { month: "Dec", status: "open" }, { month: "Jan", status: "open" },
      { month: "Feb", status: "open" }, { month: "Mar", status: "open" },
      { month: "Apr", status: "open" }, { month: "May", status: "partial" },
      { month: "Jun", status: "closed" }, { month: "Jul", status: "closed" },
      { month: "Aug", status: "closed" }, { month: "Sep", status: "closed" }
    ]
  },
  {
    id: "st-johann-tirol",
    name: "St. Johann in Tirol",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.52, lng: 12.43,
    minAltitude: 659, maxAltitude: 1700,
    verticalDrop: 1041,
    pisteKm: 54, runs: 40, lifts: 20,
    gondolas: 5, chairlifts: 11, dragLifts: 4,
    longestRun: 8,
    difficultyBlue: 30, difficultyRed: 50, difficultyBlack: 20,
    snowCannons: 60, snowCannonKm: 25,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.2, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Family resort"],
    description: "A charming market town with a well-developed ski area on the Kitzbueheler Alpen just 10km from Kitzbuehel. Part of the KitzSki region offering excellent value with a friendly local atmosphere popular with Austrian families.",
    image: "https://picsum.photos/seed/st-johann-tirol/800/500",
    images: ["https://picsum.photos/seed/st-johann-tirol-1/1200/700", "https://picsum.photos/seed/st-johann-tirol-2/1200/700", "https://picsum.photos/seed/st-johann-tirol-3/1200/700"],
    weather: { temp: -3, snowDepth: 115, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 50, snowDepthMid: 95, snowDepthTop: 135, snowType: "Machine-groomed",
    liftsOpen: 18, liftsTotal: 20, pistesOpen: 36, pistesTotal: 40,
    ecoRating: 3, ecoRenewable: 54, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["54% renewable electricity", "Train access promotion program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "St. Johann in Tirol - 1km, direct trains from Innsbruck and Salzburg",
    shuttle: true, shuttleDesc: "Direct trains from Innsbruck and Salzburg",
    parking: { capacity: 1800, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Harschbichl Restaurant", zone: "Summit 1700m", cuisine: "Austrian", price: "€€" },
        { name: "Weitau Alm", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 2, groupLessonFrom: 38, privateLessonFrom: 95,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 46,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 350, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol", "Head", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Town centre",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "St. Johann in Tirol is a lively market town with a beautiful baroque church in the Kitzbueheler Alps. The weekly market and vibrant town centre offer a genuine Austrian experience.",
      nearbyTowns: [
        { name: "St. Johann in Tirol", distance: "0km", desc: "Lively market town with baroque church" },
        { name: "Kitzbuehel", distance: "10km", desc: "World-famous ski resort with Hahnenkamm race" },
        { name: "Ellmau", distance: "8km", desc: "SkiWelt resort village" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Shopping", "Cultural tours", "Winter hiking"],
      touristBoard: "St. Johann in Tirol Tourismus",
      touristBoardUrl: "https://www.st.johann.tirol.at",
      emergency: "112",
      hospital: "Kufstein hospital (30km)"
    },
    webcams: [
      { name: "Harschbichl 1700m", seed: "st-johann-tirol-cam1" },
      { name: "St. Johann town", seed: "st-johann-tirol-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "St. Johann Ski Week", type: "Festival", desc: "Week-long programme of races and events" }
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
      overall: 8.2,
      breakdown: { pistes: 8.2, lifts: 8.1, apresSki: 8.4, value: 9.4, beginners: 9.3 },
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