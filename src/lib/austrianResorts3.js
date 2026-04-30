export const austrianResorts3 = [
  {
    id: "nassfeld",
    name: "Nassfeld-Hermagor",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Carinthia, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 46.58, lng: 13.23,
    minAltitude: 600, maxAltitude: 2020,
    verticalDrop: 1420,
    pisteKm: 110, runs: 102, lifts: 30,
    gondolas: 6, chairlifts: 16, dragLifts: 8,
    longestRun: 9,
    difficultyBlue: 45, difficultyRed: 38, difficultyBlack: 17,
    snowCannons: 120, snowCannonKm: 50,
    seasonStart: "2024-12-14", seasonEnd: "2025-03-30",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 48,
    seasonDates: "14 Dec 2024 - 30 Mar 2025",
    seasonPasses: ["alpin-card"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Carinthias largest ski resort on the Italian border above Hermagor. 110km of sunny south-facing slopes with outstanding snowmaking infrastructure and excellent value.",
    image: "https://picsum.photos/seed/nassfeld/800/500",
    images: ["https://picsum.photos/seed/nassfeld-1/1200/700", "https://picsum.photos/seed/nassfeld-2/1200/700", "https://picsum.photos/seed/nassfeld-3/1200/700"],
    weather: { temp: -3, snowDepth: 120, condition: "Sunny", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "clear" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 50, snowDepthMid: 95, snowDepthTop: 140, snowType: "Machine-groomed",
    liftsOpen: 26, liftsTotal: 30, pistesOpen: 88, pistesTotal: 102,
    ecoRating: 3, ecoRenewable: 50, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["50% renewable electricity", "Snow water recycling"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Klagenfurt", iata: "KLU", driveTime: "1h" },
      { airport: "Ljubljana", iata: "LJU", driveTime: "2h" },
      { airport: "Venice", iata: "VCE", driveTime: "2h 30m" }
    ],
    trainStation: "Hermagor - 12km bus connection",
    shuttle: false, shuttleDesc: "Bus connection from Hermagor station",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Gartnerkofel Restaurant", zone: "Summit 2020m", cuisine: "Austrian", price: "€€" },
        { name: "Nassfeld Hutte", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 2, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪", "🇮🇹"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 400, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Base station",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Nassfeld sits on the border between Carinthia and Italy, surrounded by the Carnic Alps. The region is known for its mild Carinthian climate and proximity to Udine.",
      nearbyTowns: [
        { name: "Hermagor", distance: "12km", desc: "Main market town in the Gailtal valley" },
        { name: "Klagenfurt", distance: "80km", desc: "Carinthian capital on the Worthersee lake" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating"],
      touristBoard: "Nassfeld-Pressegger See Tourismus",
      touristBoardUrl: "https://www.nassfeld.at",
      emergency: "112",
      hospital: "LKH Villach (45km)"
    },
    webcams: [
      { name: "Gartnerkofel 2020m", seed: "nassfeld-cam1" },
      { name: "Nassfeld base", seed: "nassfeld-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Nassfeld Race Weekend", type: "Competition", desc: "Annual regional race series" }
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
      overall: 8.6,
      breakdown: { pistes: 8.5, lifts: 8.4, apresSki: 8.3, value: 9.3, beginners: 9.1 },
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
    id: "damuels-mellau",
    name: "Damuels-Mellau",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Vorarlberg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.28, lng: 9.89,
    minAltitude: 1000, maxAltitude: 1850,
    verticalDrop: 850,
    pisteKm: 108, runs: 77, lifts: 25,
    gondolas: 6, chairlifts: 13, dragLifts: 6,
    longestRun: 9,
    difficultyBlue: 32, difficultyRed: 46, difficultyBlack: 22,
    snowCannons: 85, snowCannonKm: 32,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "chains",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["laendle-card"],
    resortTypes: ["Alpine", "Freeride"],
    description: "Damuels holds the record as the snowiest village in the Alps receiving an average of 10 metres of snowfall per season. The FunMountain area connected with Mellau offers outstanding natural snow and a relaxed Bregenzerwald atmosphere.",
    image: "https://picsum.photos/seed/damuels-mellau/800/500",
    images: ["https://picsum.photos/seed/damuels-mellau-1/1200/700", "https://picsum.photos/seed/damuels-mellau-2/1200/700", "https://picsum.photos/seed/damuels-mellau-3/1200/700"],
    weather: { temp: -6, snowDepth: 210, condition: "Snowy", forecast: [
      { day: "Today", high: -4, low: -10, condition: "snow" },
      { day: "Tomorrow", high: -5, low: -11, condition: "snow" },
      { day: "Thu", high: -7, low: -13, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 120, snowDepthMid: 190, snowDepthTop: 240, snowType: "Powder",
    liftsOpen: 22, liftsTotal: 25, pistesOpen: 68, pistesTotal: 77,
    ecoRating: 3, ecoRenewable: 62, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["62% renewable electricity", "Natural snowfall reduces artificial snowmaking"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "2h" },
      { airport: "Friedrichshafen", iata: "FDH", driveTime: "1h 30m" }
    ],
    trainStation: "Dornbirn - 35km bus connection",
    shuttle: false, shuttleDesc: "Bus connection from Dornbirn station",
    parking: { capacity: 1500, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Berghaus Damuels", zone: "Summit area", cuisine: "Austrian", price: "€€" },
        { name: "Mellau Bergrestaurant", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 42, privateLessonFrom: 105,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 300, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: false,
      medicalCentre: true, medicalLocation: "Damuels village",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "The Bregenzerwald is a traditional cheese-making region in Vorarlberg known for its distinctive woodcraft architecture and outstanding natural landscape.",
      nearbyTowns: [
        { name: "Egg", distance: "18km", desc: "Main Bregenzerwald market town" },
        { name: "Bregenz", distance: "45km", desc: "Vorarlberg capital on Lake Constance" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Cheese farm visits"],
      touristBoard: "Damuels-Mellau Tourismus",
      touristBoardUrl: "https://www.damuels-mellau.at",
      emergency: "112",
      hospital: "LKH Dornbirn (35km)"
    },
    webcams: [
      { name: "Damuels summit 1850m", seed: "damuels-cam1" },
      { name: "Mellau base", seed: "damuels-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Powder Days Damuels", type: "Festival", desc: "Celebration of natural snowfall" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 50, child: 25, senior: 40, badge: null },
      { type: "3-day", adult: 137, child: 69, senior: 110, badge: null },
      { type: "6-day", adult: 256, child: 128, senior: 205, badge: "Best value" },
      { type: "Season", adult: 1150, child: 575, senior: 920, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.7,
      breakdown: { pistes: 8.8, lifts: 8.5, apresSki: 8.4, value: 9.1, beginners: 8.9 },
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
    id: "kleinwalsertal",
    name: "Kleinwalsertal",
    countries: ["Austria", "Germany"],
    countryCode: "AT",
    region: "Vorarlberg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.37, lng: 10.18,
    minAltitude: 1090, maxAltitude: 2038,
    verticalDrop: 948,
    pisteKm: 108, runs: 45, lifts: 30,
    gondolas: 7, chairlifts: 15, dragLifts: 8,
    longestRun: 10,
    difficultyBlue: 33, difficultyRed: 45, difficultyBlack: 22,
    snowCannons: 90, snowCannonKm: 38,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 49,
    seasonDates: "14 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["laendle-card"],
    resortTypes: ["Alpine", "Family resort"],
    description: "A uniquely German-accessible Austrian valley reachable only from Oberstdorf in Bavaria. Connects with the Bavarian Fellhorn and Kanzelwand for 108km of skiing across two countries with an authentic valley atmosphere.",
    image: "https://picsum.photos/seed/kleinwalsertal/800/500",
    images: ["https://picsum.photos/seed/kleinwalsertal-1/1200/700", "https://picsum.photos/seed/kleinwalsertal-2/1200/700", "https://picsum.photos/seed/kleinwalsertal-3/1200/700"],
    weather: { temp: -4, snowDepth: 150, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 130, snowDepthTop: 175, snowType: "Packed powder",
    liftsOpen: 27, liftsTotal: 30, pistesOpen: 40, pistesTotal: 45,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["Alpine Pearls"],
    ecoInitiatives: ["58% renewable electricity", "Car-free transport options"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Memmingen", iata: "FMM", driveTime: "1h 30m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" },
      { airport: "Friedrichshafen", iata: "FDH", driveTime: "1h 30m" }
    ],
    trainStation: "Oberstdorf (Germany) - 15km bus through valley",
    shuttle: false, shuttleDesc: "Bus from Oberstdorf station through the valley",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Walmendingerhorn Restaurant", zone: "Summit 1990m", cuisine: "Alpine", price: "€€" },
        { name: "Kanzelwand Bergrestaurant", zone: "1957m", cuisine: "Austrian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 42, privateLessonFrom: 105,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 400, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Riezlern village",
      pharmacy: true, atm: true, atmCount: 3
    },
    surroundings: {
      description: "The Kleinwalsertal is an Austrian exclave accessible only from Bavaria. The valley retains a distinct identity using both Euro and German customs.",
      nearbyTowns: [
        { name: "Riezlern", distance: "0km", desc: "Main valley village at the entrance" },
        { name: "Oberstdorf", distance: "15km", desc: "German alpine resort town with train station" },
        { name: "Mittelberg", distance: "5km", desc: "Traditional village at the valley head" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking"],
      touristBoard: "Kleinwalsertal Tourismus",
      touristBoardUrl: "https://www.kleinwalsertal.com",
      emergency: "112",
      hospital: "Krankenhaus Oberstdorf (15km)"
    },
    webcams: [
      { name: "Walmendingerhorn 1990m", seed: "kleinwalsertal-cam1" },
      { name: "Kanzelwand 1957m", seed: "kleinwalsertal-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Kleinwalsertal Mountain Festival", type: "Festival", desc: "Traditional alpine music and food festival" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 49, child: 25, senior: 39, badge: null },
      { type: "3-day", adult: 134, child: 67, senior: 107, badge: null },
      { type: "6-day", adult: 250, child: 125, senior: 200, badge: "Best value" },
      { type: "Season", adult: 1120, child: 560, senior: 896, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.6,
      breakdown: { pistes: 8.6, lifts: 8.4, apresSki: 8.5, value: 9.0, beginners: 9.0 },
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
    id: "alpbach-wildschoenau",
    name: "Alpbach - Wildschoenau",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.40, lng: 11.96,
    minAltitude: 600, maxAltitude: 1900,
    verticalDrop: 1300,
    pisteKm: 109, runs: 51, lifts: 45,
    gondolas: 9, chairlifts: 24, dragLifts: 12,
    longestRun: 9,
    difficultyBlue: 45, difficultyRed: 40, difficultyBlack: 15,
    snowCannons: 120, snowCannonKm: 50,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.5, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "14 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Alpbach is consistently voted one of the most beautiful villages in Austria combining charming flower-box architecture with 109km of skiing. The SkiJuwel area is particularly well suited to intermediate skiers and families.",
    image: "https://picsum.photos/seed/alpbach-wildschoenau/800/500",
    images: ["https://picsum.photos/seed/alpbach-wildschoenau-1/1200/700", "https://picsum.photos/seed/alpbach-wildschoenau-2/1200/700", "https://picsum.photos/seed/alpbach-wildschoenau-3/1200/700"],
    weather: { temp: -3, snowDepth: 130, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 105, snowDepthTop: 150, snowType: "Packed powder",
    liftsOpen: 40, liftsTotal: 45, pistesOpen: 45, pistesTotal: 51,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Village preservation program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "45m" },
      { airport: "Munich", iata: "MUC", driveTime: "1h 45m" },
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" }
    ],
    trainStation: "Brixlegg - 12km bus connection",
    shuttle: false, shuttleDesc: "Bus connection from Brixlegg station",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Alpbacher Bergbahn Restaurant", zone: "Summit 1900m", cuisine: "Austrian", price: "€€" },
        { name: "Hornalm", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 42, privateLessonFrom: 105,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 450, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Alpbach village",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Alpbach village with its flower-adorned wooden houses has won Austrias most beautiful village award multiple times. The Inn valley is visible from the higher slopes.",
      nearbyTowns: [
        { name: "Alpbach", distance: "0km", desc: "Award-winning most beautiful village in Austria" },
        { name: "Brixlegg", distance: "12km", desc: "Inn valley town with train station" },
        { name: "Worgl", distance: "20km", desc: "Major Inn valley rail junction" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Winter hiking", "Village walks"],
      touristBoard: "Alpbachtal Tourismus",
      touristBoardUrl: "https://www.alpbachtal.at",
      emergency: "112",
      hospital: "Kufstein hospital (25km)"
    },
    webcams: [
      { name: "Gmahkopf 1900m", seed: "alpbach-cam1" },
      { name: "Alpbach village", seed: "alpbach-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "SkiJuwel Race Day", type: "Competition", desc: "Regional race event for all abilities" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 50, child: 25, senior: 40, badge: null },
      { type: "3-day", adult: 137, child: 69, senior: 110, badge: null },
      { type: "6-day", adult: 256, child: 128, senior: 205, badge: "Best value" },
      { type: "Season", adult: 1150, child: 575, senior: 920, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.5,
      breakdown: { pistes: 8.5, lifts: 8.4, apresSki: 8.3, value: 9.1, beginners: 9.3 },
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
    id: "innsbruck-ski",
    name: "Innsbruck Ski Areas",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.27, lng: 11.39,
    minAltitude: 574, maxAltitude: 2334,
    verticalDrop: 1760,
    pisteKm: 75, runs: 44, lifts: 18,
    gondolas: 5, chairlifts: 9, dragLifts: 4,
    longestRun: 8,
    difficultyBlue: 27, difficultyRed: 46, difficultyBlack: 27,
    snowCannons: 60, snowCannonKm: 22,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 44,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "City skiing", "Freeride"],
    description: "The only city in the world with a World Cup ski area directly above it. The Nordkette gondola rises from the city centre to 2334m in 25 minutes. Patscherkofel, Mutterer Alm and Rangger Kopfl offer varied terrain around the Tyrolean capital.",
    image: "https://picsum.photos/seed/innsbruck-ski/800/500",
    images: ["https://picsum.photos/seed/innsbruck-ski-1/1200/700", "https://picsum.photos/seed/innsbruck-ski-2/1200/700", "https://picsum.photos/seed/innsbruck-ski-3/1200/700"],
    weather: { temp: -4, snowDepth: 130, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 50, snowDepthMid: 105, snowDepthTop: 160, snowType: "Packed powder",
    liftsOpen: 16, liftsTotal: 18, pistesOpen: 40, pistesTotal: 44,
    ecoRating: 4, ecoRenewable: 75, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["75% renewable electricity", "Electric city transport integration", "Green city commuting"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "15m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "Innsbruck Hauptbahnhof - 1km, direct connections from Vienna, Munich, Zurich and Salzburg",
    shuttle: true, shuttleDesc: "Major rail hub with direct connections from Vienna, Munich, Zurich and Salzburg",
    parking: { capacity: 3000, pricePerDay: 15, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Nordkette Seegrube", zone: "1905m", cuisine: "Alpine", price: "€€€" },
        { name: "Patscherkofel Restaurant", zone: "Summit 2246m", cuisine: "Austrian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪", "🇮🇹"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 500, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Nordkette base station",
      pharmacy: true, atm: true, atmCount: 8
    },
    surroundings: {
      description: "Innsbruck is the capital of Tyrol and one of the most beautiful Alpine cities in Europe. The historic old town, Imperial palace and surrounding mountains create a unique urban-alpine experience.",
      nearbyTowns: [
        { name: "Innsbruck", distance: "0km", desc: "Tyrolean capital with Imperial palace and medieval old town" },
        { name: "Hall in Tirol", distance: "10km", desc: "Medieval silver-mining town" },
        { name: "Igls", distance: "8km", desc: "Village at the foot of Patscherkofel" }
      ],
      activities: ["Museum", "Shopping", "Spa & wellness", "Ice skating", "Snowshoeing", "Winter hiking", "Cultural tours"],
      touristBoard: "Innsbruck Tourismus",
      touristBoardUrl: "https://www.innsbruck.info",
      emergency: "112",
      hospital: "Innsbruck University Hospital (city centre)"
    },
    webcams: [
      { name: "Nordkette Hafelekar 2334m", seed: "innsbruck-cam1" },
      { name: "Patscherkofel 2246m", seed: "innsbruck-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Hahnenkamm Transfer Day", type: "Competition", desc: "Innsbruck city event linked to Kitzbuehel race week" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 44, child: 22, senior: 35, badge: null },
      { type: "3-day", adult: 121, child: 61, senior: 97, badge: null },
      { type: "6-day", adult: 226, child: 113, senior: 181, badge: "Best value" },
      { type: "Season", adult: 1010, child: 505, senior: 808, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.4,
      breakdown: { pistes: 8.3, lifts: 8.5, apresSki: 9.0, value: 8.8, beginners: 8.5 },
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
    id: "kaunertal-glacier",
    name: "Kaunertal Glacier",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 46.89, lng: 10.72,
    minAltitude: 1750, maxAltitude: 3160,
    verticalDrop: 1410,
    pisteKm: 43, runs: 18, lifts: 8,
    gondolas: 3, chairlifts: 4, dragLifts: 1,
    longestRun: 10,
    difficultyBlue: 11, difficultyRed: 50, difficultyBlack: 39,
    snowCannons: 15, snowCannonKm: 5,
    seasonStart: "2024-10-12", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 55,
    seasonDates: "12 Oct 2024 - 4 May 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Glacier", "Freeride"],
    description: "A remote and unspoiled high-alpine ski area in far west Tyrol accessible via a spectacular 26km toll road. A favourite among freeriders and those seeking uncrowded terrain above 3000m.",
    image: "https://picsum.photos/seed/kaunertal-glacier/800/500",
    images: ["https://picsum.photos/seed/kaunertal-glacier-1/1200/700", "https://picsum.photos/seed/kaunertal-glacier-2/1200/700", "https://picsum.photos/seed/kaunertal-glacier-3/1200/700"],
    weather: { temp: -12, snowDepth: 260, condition: "Sunny", forecast: [
      { day: "Today", high: -10, low: -18, condition: "clear" },
      { day: "Tomorrow", high: -11, low: -19, condition: "clear" },
      { day: "Thu", high: -13, low: -21, condition: "snow" }
    ]},
    snowDepthBase: 130, snowDepthMid: 200, snowDepthTop: 280, snowType: "Powder",
    liftsOpen: 7, liftsTotal: 8, pistesOpen: 16, pistesTotal: 18,
    ecoRating: 3, ecoRenewable: 35, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["35% renewable electricity", "Glacier protection monitoring"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "3h" }
    ],
    trainStation: "Landeck-Zams - 30km bus into Kaunertal valley",
    shuttle: false, shuttleDesc: "Bus from Landeck-Zams into the Kaunertal valley",
    parking: { capacity: 800, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Weisseeferner Restaurant", zone: "3108m", cuisine: "Alpine", price: "€€€" },
        { name: "Bergrestaurant Falginjoch", zone: "2750m", cuisine: "Austrian", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 48, privateLessonFrom: 120,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: false, crecheAgeMin: 0, crecheAgeMax: 0, crecheFrom: 0,
      kidsGarden: false, kidsGardenAge: "", babysitting: false,
      lockerCount: 150, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Prutz (15km)",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "The Kaunertal is one of the most remote glacial valleys in Tyrol. The 26km toll road winds through spectacular gorges to the glacier.",
      nearbyTowns: [
        { name: "Prutz", distance: "15km", desc: "Gateway village to the Kaunertal" },
        { name: "Landeck", distance: "30km", desc: "Inn valley market town with rail connections" }
      ],
      activities: ["Snowshoeing", "Glacier tours", "Freeride tours"],
      touristBoard: "Kaunertal Tourismus",
      touristBoardUrl: "https://www.kaunertal.com",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Zams (35km)"
    },
    webcams: [
      { name: "Weisseeferner 3108m", seed: "kaunertal-cam1" },
      { name: "Falginjoch 2750m", seed: "kaunertal-cam2" }
    ],
    events: [
      { date: "Oct 2024", name: "Kaunertal Glacier Opening", type: "Festival", desc: "Early season glacier opener" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 55, child: 28, senior: 44, badge: null },
      { type: "3-day", adult: 151, child: 76, senior: 121, badge: null },
      { type: "6-day", adult: 282, child: 141, senior: 226, badge: "Best value" },
      { type: "Season", adult: 1260, child: 630, senior: 1008, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.6,
      breakdown: { pistes: 8.8, lifts: 8.5, apresSki: 7.0, value: 8.7, beginners: 7.0 },
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
    id: "bad-kleinkirchheim",
    name: "Bad Kleinkirchheim",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Carinthia, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 46.81, lng: 13.79,
    minAltitude: 1070, maxAltitude: 2055,
    verticalDrop: 985,
    pisteKm: 100, runs: 39, lifts: 26,
    gondolas: 5, chairlifts: 14, dragLifts: 7,
    longestRun: 9,
    difficultyBlue: 38, difficultyRed: 41, difficultyBlack: 21,
    snowCannons: 110, snowCannonKm: 45,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.5, ratingLabel: "Excellent", priceFrom: 47,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["alpin-card"],
    resortTypes: ["Alpine", "Wellness"],
    description: "Carinthias spa and ski resort combining 100km of sunny south-facing slopes with world-famous thermal baths. Home to two World Cup downhill courses on the Franz Klammer piste.",
    image: "https://picsum.photos/seed/bad-kleinkirchheim/800/500",
    images: ["https://picsum.photos/seed/bad-kleinkirchheim-1/1200/700", "https://picsum.photos/seed/bad-kleinkirchheim-2/1200/700", "https://picsum.photos/seed/bad-kleinkirchheim-3/1200/700"],
    weather: { temp: -3, snowDepth: 125, condition: "Sunny", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "clear" },
      { day: "Thu", high: -4, low: -10, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 55, snowDepthMid: 100, snowDepthTop: 150, snowType: "Packed powder",
    liftsOpen: 23, liftsTotal: 26, pistesOpen: 34, pistesTotal: 39,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Thermal water reuse"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Klagenfurt", iata: "KLU", driveTime: "1h" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Spittal-Millstattersee - 28km bus connection",
    shuttle: false, shuttleDesc: "Bus from Spittal-Millstattersee station",
    parking: { capacity: 1800, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Brunnach Restaurant", zone: "Summit 2055m", cuisine: "Austrian", price: "€€" },
        { name: "Kaiserburg Alm", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 350, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: true, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Bad Kleinkirchheim is a sunny Carinthian resort famous for Franz Klammer, the greatest downhill skier of all time who trained here. The thermal baths are directly ski-in accessible.",
      nearbyTowns: [
        { name: "Bad Kleinkirchheim", distance: "0km", desc: "Spa and ski village with thermal baths" },
        { name: "Villach", distance: "50km", desc: "Major Carinthian city with train connections" },
        { name: "Klagenfurt", distance: "70km", desc: "Carinthian capital on Worthersee lake" }
      ],
      activities: ["Thermal spa", "Snowshoeing", "Winter hiking", "Spa & wellness"],
      touristBoard: "Bad Kleinkirchheim Tourismus",
      touristBoardUrl: "https://www.badkleinkirchheim.at",
      emergency: "112",
      hospital: "LKH Villach (50km)"
    },
    webcams: [
      { name: "Brunnach 2055m", seed: "bad-kleinkirchheim-cam1" },
      { name: "St. Oswald base", seed: "bad-kleinkirchheim-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Franz Klammer Cup", type: "Competition", desc: "Tribute race on the legendary downhill course" }
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
      overall: 8.5,
      breakdown: { pistes: 8.5, lifts: 8.3, apresSki: 8.4, value: 9.2, beginners: 9.0 },
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
    id: "katschberg",
    name: "Katschberg",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg/Carinthia, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.06, lng: 13.61,
    minAltitude: 1641, maxAltitude: 2220,
    verticalDrop: 579,
    pisteKm: 70, runs: 40, lifts: 16,
    gondolas: 3, chairlifts: 9, dragLifts: 4,
    longestRun: 7,
    difficultyBlue: 45, difficultyRed: 40, difficultyBlack: 15,
    snowCannons: 80, snowCannonKm: 35,
    seasonStart: "2024-11-30", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 48,
    seasonDates: "30 Nov 2024 - 6 Apr 2025",
    seasonPasses: ["superski", "alpin-card"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Katschberg sits at 1641m on the border of Salzburg and Carinthia with a car-free ski village and reliable snow. The high base altitude ensures excellent conditions from December through March.",
    image: "https://picsum.photos/seed/katschberg/800/500",
    images: ["https://picsum.photos/seed/katschberg-1/1200/700", "https://picsum.photos/seed/katschberg-2/1200/700", "https://picsum.photos/seed/katschberg-3/1200/700"],
    weather: { temp: -5, snowDepth: 155, condition: "Snowy", forecast: [
      { day: "Today", high: -3, low: -9, condition: "snow" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "clear" }
    ]},
    snowDepthBase: 85, snowDepthMid: 130, snowDepthTop: 175, snowType: "Packed powder",
    liftsOpen: 14, liftsTotal: 16, pistesOpen: 35, pistesTotal: 40,
    ecoRating: 3, ecoRenewable: 50, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["50% renewable electricity", "Car-free village centre"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" },
      { airport: "Klagenfurt", iata: "KLU", driveTime: "1h 30m" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" }
    ],
    trainStation: "Spittal-Millstattersee - 25km bus connection",
    shuttle: false, shuttleDesc: "Bus from Spittal-Millstattersee station",
    parking: { capacity: 1200, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Aineck Restaurant", zone: "Summit 2220m", cuisine: "Austrian", price: "€€" },
        { name: "Katschberg Hutte", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 100,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 50,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 280, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Katschberg Pass marks the historic border between Salzburg and Carinthia. The compact car-free resort is ideal for families seeking reliable snow without crowds.",
      nearbyTowns: [
        { name: "Rennweg", distance: "3km", desc: "Carinthian valley village" },
        { name: "St. Michael im Lungau", distance: "15km", desc: "Salzburg Lungau village" },
        { name: "Spittal an der Drau", distance: "30km", desc: "Major Carinthian town" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating", "Toboggan runs"],
      touristBoard: "Katschberg Tourismus",
      touristBoardUrl: "https://www.katschberg.at",
      emergency: "112",
      hospital: "LKH Spittal an der Drau (30km)"
    },
    webcams: [
      { name: "Aineck 2220m", seed: "katschberg-cam1" },
      { name: "Katschberg village", seed: "katschberg-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Katschberg Spring Festival", type: "Festival", desc: "End of season celebrations" }
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
      breakdown: { pistes: 8.4, lifts: 8.3, apresSki: 8.2, value: 9.0, beginners: 9.1 },
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
    id: "axamer-lizum",
    name: "Axamer Lizum",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.22, lng: 11.27,
    minAltitude: 1580, maxAltitude: 2340,
    verticalDrop: 760,
    pisteKm: 40, runs: 25, lifts: 8,
    gondolas: 2, chairlifts: 5, dragLifts: 1,
    longestRun: 7,
    difficultyBlue: 20, difficultyRed: 52, difficultyBlack: 28,
    snowCannons: 40, snowCannonKm: 16,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 45,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "City skiing"],
    description: "Hosted alpine events in the 1964 and 1976 Winter Olympics and remains one of the best value ski areas near Innsbruck. Olympic-standard terrain just 25 minutes from the city centre.",
    image: "https://picsum.photos/seed/axamer-lizum/800/500",
    images: ["https://picsum.photos/seed/axamer-lizum-1/1200/700", "https://picsum.photos/seed/axamer-lizum-2/1200/700", "https://picsum.photos/seed/axamer-lizum-3/1200/700"],
    weather: { temp: -5, snowDepth: 145, condition: "Clear", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 80, snowDepthMid: 130, snowDepthTop: 170, snowType: "Packed powder",
    liftsOpen: 7, liftsTotal: 8, pistesOpen: 22, pistesTotal: 25,
    ecoRating: 3, ecoRenewable: 48, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["48% renewable electricity", "Bus access from Innsbruck"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "25m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "Innsbruck Hauptbahnhof - 25km bus",
    shuttle: false, shuttleDesc: "Bus from Innsbruck central bus station",
    parking: { capacity: 1200, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Lizumer Hutte", zone: "Summit 2340m", cuisine: "Austrian", price: "€€" },
        { name: "Olympic Restaurant", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 38, privateLessonFrom: 95,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 250, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Base station",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "Axamer Lizum sits in the Axamer valley above Innsbruck on the slopes of the Pleisen group. The Olympic legacy and proximity to Innsbruck make it an ideal day trip destination.",
      nearbyTowns: [
        { name: "Axams", distance: "8km", desc: "Traditional Tyrolean village" },
        { name: "Innsbruck", distance: "25km", desc: "Tyrolean capital with cultural attractions" }
      ],
      activities: ["Snowshoeing", "Winter hiking"],
      touristBoard: "Innsbruck Tourismus",
      touristBoardUrl: "https://www.axamer-lizum.at",
      emergency: "112",
      hospital: "Innsbruck University Hospital (25km)"
    },
    webcams: [
      { name: "Hoadl 2340m", seed: "axamer-lizum-cam1" },
      { name: "Base station 1580m", seed: "axamer-lizum-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Olympic Memorial Race", type: "Competition", desc: "Annual race on the historic Olympic piste" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 45, child: 23, senior: 36, badge: null },
      { type: "3-day", adult: 123, child: 62, senior: 98, badge: null },
      { type: "6-day", adult: 230, child: 115, senior: 184, badge: "Best value" },
      { type: "Season", adult: 1030, child: 515, senior: 824, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.3,
      breakdown: { pistes: 8.4, lifts: 8.2, apresSki: 7.8, value: 9.3, beginners: 8.5 },
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
    id: "hinterstoder",
    name: "Hinterstoder",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Upper Austria, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.70, lng: 14.15,
    minAltitude: 592, maxAltitude: 1860,
    verticalDrop: 1268,
    pisteKm: 50, runs: 28, lifts: 9,
    gondolas: 2, chairlifts: 5, dragLifts: 2,
    longestRun: 8,
    difficultyBlue: 24, difficultyRed: 54, difficultyBlack: 22,
    snowCannons: 55, snowCannonKm: 22,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.2, ratingLabel: "Excellent", priceFrom: 44,
    seasonDates: "14 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "The premier ski resort of Upper Austria in the Totes Gebirge mountain range. Excellent reputation for slope grooming and efficient lift system with good access from Linz and Salzburg.",
    image: "https://picsum.photos/seed/hinterstoder/800/500",
    images: ["https://picsum.photos/seed/hinterstoder-1/1200/700", "https://picsum.photos/seed/hinterstoder-2/1200/700", "https://picsum.photos/seed/hinterstoder-3/1200/700"],
    weather: { temp: -4, snowDepth: 135, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 105, snowDepthTop: 150, snowType: "Machine-groomed",
    liftsOpen: 8, liftsTotal: 9, pistesOpen: 25, pistesTotal: 28,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["52% renewable electricity", "Water recycling for snowmaking"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" },
      { airport: "Graz", iata: "GRZ", driveTime: "2h" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Kirchdorf an der Krems - 28km bus connection",
    shuttle: false, shuttleDesc: "Bus connection from Kirchdorf",
    parking: { capacity: 1500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Huttenkogel Restaurant", zone: "Summit 1860m", cuisine: "Austrian", price: "€€" },
        { name: "Unterberg Alm", zone: "Mid-mountain", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 38, privateLessonFrom: 95,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 250, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: false,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: false, atm: true, atmCount: 1
    },
    surroundings: {
      description: "Hinterstoder sits in the northern Totes Gebirge in Upper Austria. The dramatic limestone peaks and good train access from Linz make it the go-to resort for Upper Austrian skiers.",
      nearbyTowns: [
        { name: "Hinterstoder", distance: "0km", desc: "Village at the foot of the Totes Gebirge" },
        { name: "Kirchdorf an der Krems", distance: "28km", desc: "Upper Austrian market town with train station" },
        { name: "Steyr", distance: "50km", desc: "Historic Upper Austrian city" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating"],
      touristBoard: "Pyhrn-Priel Tourismus",
      touristBoardUrl: "https://www.hinterstoder.at",
      emergency: "112",
      hospital: "LKH Kirchdorf (28km)"
    },
    webcams: [
      { name: "Huttenkogel 1860m", seed: "hinterstoder-cam1" },
      { name: "Hinterstoder base", seed: "hinterstoder-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Hinterstoder Giant Slalom", type: "Competition", desc: "FIS World Cup giant slalom event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 44, child: 22, senior: 35, badge: null },
      { type: "3-day", adult: 121, child: 61, senior: 97, badge: null },
      { type: "6-day", adult: 226, child: 113, senior: 181, badge: "Best value" },
      { type: "Season", adult: 1010, child: 505, senior: 808, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.2,
      breakdown: { pistes: 8.4, lifts: 8.3, apresSki: 7.8, value: 9.3, beginners: 9.0 },
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