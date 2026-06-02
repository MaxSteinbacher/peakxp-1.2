export const austrianResorts2 = [
  {
    id: "obergurgl-hochgurgl",
    name: "Obergurgl-Hochgurgl",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 46.87, lng: 11.03,
    minAltitude: 1793, maxAltitude: 3080,
    verticalDrop: 1287,
    pisteKm: 110, runs: 112, lifts: 25,
    gondolas: 5, chairlifts: 14, dragLifts: 6,
    longestRun: 8,
    difficultyBlue: 22, difficultyRed: 55, difficultyBlack: 23,
    snowCannons: 70, snowCannonKm: 25,
    seasonStart: "2024-11-23", seasonEnd: "2025-04-27",
    openStatus: "Open", roadStatus: "open",
    rating: 9.2, ratingLabel: "Exceptional", priceFrom: 64,
    seasonDates: "23 Nov 2024 - 27 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Luxury", "Freeride"],
    description: "Austrias highest village ski resort offering exceptional snow reliability and a refined crowd-free atmosphere. Renowned for cosy luxury hotels and consistently excellent conditions from November through April.",
    image: "https://picsum.photos/seed/obergurgl/800/500",
    images: ["https://picsum.photos/seed/obergurgl-1/1200/700", "https://picsum.photos/seed/obergurgl-2/1200/700", "https://picsum.photos/seed/obergurgl-3/1200/700"],
    weather: { temp: -8, snowDepth: 185, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 100, snowDepthMid: 160, snowDepthTop: 230, snowType: "Packed powder",
    liftsOpen: 22, liftsTotal: 25, pistesOpen: 95, pistesTotal: 112,
    ecoRating: 3, ecoRenewable: 60, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["60% renewable electricity", "Electric shuttle buses"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Oetztal station - 42km bus connection",
    shuttle: false, shuttleDesc: "Regular bus service from Oetztal station",
    parking: { capacity: 1500, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Top Mountain Star", zone: "Wurmkogl 3080m", cuisine: "Alpine", price: "€€€" },
        { name: "Schirmbar", zone: "Mid-mountain", cuisine: "Austrian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 50, privateLessonFrom: 130,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 60,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 350, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Obergurgl sits at the end of the Otztal valley near the Italian border. One of the highest villages in Austria with a refined atmosphere and outstanding snow guarantee.",
      nearbyTowns: [
        { name: "Obergurgl", distance: "0km", desc: "Highest parish in Austria, refined alpine village" },
        { name: "Solden", distance: "20km", desc: "Vibrant resort with two glaciers" },
        { name: "Oetztal station", distance: "42km", desc: "Inn Valley rail junction" }
      ],
      activities: ["Snowshoeing", "Spa & wellness", "Winter hiking", "Ice skating"],
      touristBoard: "Obergurgl-Hochgurgl Tourismus",
      touristBoardUrl: "https://www.obergurgl.com",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Zams (65km)"
    },
    webcams: [
      { name: "Wurmkogl 3080m", seed: "obergurgl-cam1" },
      { name: "Festkogl 2836m", seed: "obergurgl-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Obergurgl Spring Skiing", type: "Festival", desc: "Late season celebrations with entertainment" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 64, child: 32, senior: 51, badge: null },
      { type: "3-day", adult: 176, child: 88, senior: 141, badge: null },
      { type: "6-day", adult: 330, child: 165, senior: 264, badge: "Best value" },
      { type: "Season", adult: 1480, child: 740, senior: 1184, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.2,
      breakdown: { pistes: 9.3, lifts: 9.0, apresSki: 8.5, value: 8.2, beginners: 8.8 },
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
    id: "gastein",
    name: "Bad Gastein - Bad Hofgastein - Dorfgastein",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.11, lng: 13.13,
    minAltitude: 838, maxAltitude: 2686,
    verticalDrop: 1848,
    pisteKm: 200, runs: 83, lifts: 47,
    gondolas: 10, chairlifts: 24, dragLifts: 13,
    longestRun: 13,
    difficultyBlue: 48, difficultyRed: 39, difficultyBlack: 13,
    snowCannons: 150, snowCannonKm: 55,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 55,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Wellness", "Family resort"],
    description: "The Gastein valley combines three villages and 200km of skiing with world-famous thermal spa waters. Direct train access from Salzburg and a unique combination of world-class skiing and wellness.",
    image: "https://picsum.photos/seed/gastein/800/500",
    images: ["https://picsum.photos/seed/gastein-1/1200/700", "https://picsum.photos/seed/gastein-2/1200/700", "https://picsum.photos/seed/gastein-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 60, snowDepthMid: 110, snowDepthTop: 165, snowType: "Packed powder",
    liftsOpen: 42, liftsTotal: 47, pistesOpen: 74, pistesTotal: 83,
    ecoRating: 4, ecoRenewable: 72, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["72% renewable electricity", "Thermal energy reuse", "EV charging network"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 15m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Bad Gastein - 1km walk, direct trains from Salzburg on Tauernbahn",
    shuttle: true, shuttleDesc: "Direct trains from Salzburg on the Tauernbahn line",
    parking: { capacity: 2500, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Felsentherme Restaurant", zone: "Spa complex", cuisine: "Austrian", price: "€€" },
        { name: "Stubnerkogel Panorama", zone: "Summit 2246m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 45, privateLessonFrom: 115,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 55,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 600, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Bad Gastein town centre",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "The Gastein valley is famous across Europe for its radon-rich thermal waters. The Belle Epoque architecture of Bad Gastein gives the resort a uniquely grand atmosphere.",
      nearbyTowns: [
        { name: "Bad Gastein", distance: "0km", desc: "Grand spa town with Belle Epoque architecture" },
        { name: "Bad Hofgastein", distance: "8km", desc: "Family-friendly village with excellent infrastructure" },
        { name: "Dorfgastein", distance: "15km", desc: "Traditional farming village at valley entrance" }
      ],
      activities: ["Thermal spa", "Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking"],
      touristBoard: "Gastein Tourismus",
      touristBoardUrl: "https://www.gastein.com",
      emergency: "112",
      hospital: "Tauernklinikum Schwarzach (30km)"
    },
    webcams: [
      { name: "Stubnerkogel 2246m", seed: "gastein-cam1" },
      { name: "Bad Gastein village", seed: "gastein-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Gastein Trophy", type: "Competition", desc: "Annual regional ski race series" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 55, child: 28, senior: 44, badge: null },
      { type: "3-day", adult: 151, child: 76, senior: 121, badge: null },
      { type: "6-day", adult: 280, child: 140, senior: 224, badge: "Best value" },
      { type: "Season", adult: 1280, child: 640, senior: 1024, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 8.7, lifts: 8.6, apresSki: 8.9, value: 9.0, beginners: 9.0 },
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
    id: "zell-am-see-kaprun",
    name: "Zell am See - Kaprun",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.32, lng: 12.80,
    minAltitude: 757, maxAltitude: 3029,
    verticalDrop: 2272,
    pisteKm: 138, runs: 80, lifts: 54,
    gondolas: 12, chairlifts: 28, dragLifts: 14,
    longestRun: 10,
    difficultyBlue: 44, difficultyRed: 44, difficultyBlack: 12,
    snowCannons: 130, snowCannonKm: 50,
    seasonStart: "2024-10-26", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 57,
    seasonDates: "26 Oct 2024 - 4 May 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Glacier", "Family resort"],
    description: "Combines the lakeside resort of Zell am See with the year-round Kitzsteinhorn glacier above Kaprun. The stunning alpine lake and glacier skiing from 3029m make this one of the most scenic destinations in Austria.",
    image: "https://picsum.photos/seed/zell-am-see/800/500",
    images: ["https://picsum.photos/seed/zell-am-see-1/1200/700", "https://picsum.photos/seed/zell-am-see-2/1200/700", "https://picsum.photos/seed/zell-am-see-3/1200/700"],
    weather: { temp: -5, snowDepth: 155, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 120, snowDepthTop: 200, snowType: "Packed powder",
    liftsOpen: 48, liftsTotal: 54, pistesOpen: 70, pistesTotal: 80,
    ecoRating: 3, ecoRenewable: 65, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["65% renewable electricity", "Electric bus network"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "Zell am See - 1km, direct trains from Salzburg and Innsbruck",
    shuttle: true, shuttleDesc: "Direct trains from Salzburg and Innsbruck",
    parking: { capacity: 3000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Kitzsteinhorn Panorama", zone: "Glacier 3029m", cuisine: "Alpine", price: "€€€" },
        { name: "Schmittenhohe Restaurant", zone: "Summit 1965m", cuisine: "Austrian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 46, privateLessonFrom: 115,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 58,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 700, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 8, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Zell am See town",
      pharmacy: true, atm: true, atmCount: 6
    },
    surroundings: {
      description: "The Zell am See lake sits beneath the Schmittenhohe mountain. The glacial scenery and lakeside promenade make this one of the most photographed destinations in Austria.",
      nearbyTowns: [
        { name: "Zell am See", distance: "0km", desc: "Picturesque lakeside town with train connections" },
        { name: "Kaprun", distance: "8km", desc: "Village below the Kitzsteinhorn glacier" },
        { name: "Saalbach", distance: "20km", desc: "Linked Skicircus resort" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Glacier tours"],
      touristBoard: "Zell am See - Kaprun Tourismus",
      touristBoardUrl: "https://www.zellamsee-kaprun.com",
      emergency: "112",
      hospital: "Zell am See hospital (2km)"
    },
    webcams: [
      { name: "Kitzsteinhorn 3029m", seed: "zell-am-see-cam1" },
      { name: "Schmittenhohe 1965m", seed: "zell-am-see-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Zell am See Winter Market", type: "Festival", desc: "Traditional Christmas market on the lakefront" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 57, child: 29, senior: 46, badge: null },
      { type: "3-day", adult: 157, child: 79, senior: 126, badge: null },
      { type: "6-day", adult: 292, child: 146, senior: 234, badge: "Best value" },
      { type: "Season", adult: 1320, child: 660, senior: 1056, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.9,
      breakdown: { pistes: 8.8, lifts: 9.0, apresSki: 8.7, value: 8.9, beginners: 9.1 },
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
    id: "stubai-glacier",
    name: "Stubai Glacier",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.07, lng: 11.14,
    minAltitude: 1750, maxAltitude: 3210,
    verticalDrop: 1460,
    pisteKm: 110, runs: 35, lifts: 26,
    gondolas: 8, chairlifts: 12, dragLifts: 6,
    longestRun: 12,
    difficultyBlue: 18, difficultyRed: 55, difficultyBlack: 27,
    snowCannons: 40, snowCannonKm: 10,
    seasonStart: "2024-10-05", seasonEnd: "2025-06-01",
    openStatus: "Open", roadStatus: "open",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 62,
    seasonDates: "5 Oct 2024 - 1 Jun 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Glacier", "Freeride"],
    description: "Austrias largest glacier ski area just 40 minutes from Innsbruck. Reliable snow from October to June and spectacular high-alpine terrain on three connected glaciers.",
    image: "https://picsum.photos/seed/stubai-glacier/800/500",
    images: ["https://picsum.photos/seed/stubai-glacier-1/1200/700", "https://picsum.photos/seed/stubai-glacier-2/1200/700", "https://picsum.photos/seed/stubai-glacier-3/1200/700"],
    weather: { temp: -11, snowDepth: 220, condition: "Sunny", forecast: [
      { day: "Today", high: -9, low: -16, condition: "clear" },
      { day: "Tomorrow", high: -10, low: -17, condition: "clear" },
      { day: "Thu", high: -12, low: -19, condition: "snow" }
    ]},
    snowDepthBase: 120, snowDepthMid: 190, snowDepthTop: 260, snowType: "Powder",
    liftsOpen: 23, liftsTotal: 26, pistesOpen: 31, pistesTotal: 35,
    ecoRating: 3, ecoRenewable: 45, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["45% renewable electricity", "Glacier monitoring program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "40m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "Innsbruck - 40km Stubai valley bus",
    shuttle: false, shuttleDesc: "Regular Stubai valley bus from Innsbruck central station",
    parking: { capacity: 2000, pricePerDay: 13, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Jochdohle", zone: "Summit 3150m", cuisine: "Alpine", price: "€€€" },
        { name: "Bergrestaurant Dresdner Hutte", zone: "2302m", cuisine: "Austrian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 50, privateLessonFrom: 125,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 58,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 400, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Base station Mutterbergalm",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "The Stubai valley stretches south from Innsbruck to the Stubai glacier. Close proximity to Innsbruck makes it accessible for day trips.",
      nearbyTowns: [
        { name: "Neustift im Stubaital", distance: "10km", desc: "Main Stubai valley village" },
        { name: "Innsbruck", distance: "40km", desc: "Tyrolean capital with international connections" }
      ],
      activities: ["Snowshoeing", "Glacier hiking", "Winter hiking"],
      touristBoard: "Stubai Tirol Tourismus",
      touristBoardUrl: "https://www.stubai.at",
      emergency: "112",
      hospital: "Innsbruck University Hospital (40km)"
    },
    webcams: [
      { name: "Eisgrat 3200m", seed: "stubai-cam1" },
      { name: "Mutterbergalm base", seed: "stubai-cam2" }
    ],
    events: [
      { date: "Oct 2024", name: "Stubai Glacier Opening", type: "Festival", desc: "Season opener with entertainment" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 62, child: 31, senior: 50, badge: null },
      { type: "3-day", adult: 170, child: 85, senior: 136, badge: null },
      { type: "6-day", adult: 318, child: 159, senior: 254, badge: "Best value" },
      { type: "Season", adult: 1420, child: 710, senior: 1136, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 9.1, lifts: 9.0, apresSki: 8.0, value: 8.6, beginners: 8.5 },
      items: []
    },
    seasonCalendar: [
      { month: "Oct", status: "partial" }, { month: "Nov", status: "open" },
      { month: "Dec", status: "open" }, { month: "Jan", status: "open" },
      { month: "Feb", status: "open" }, { month: "Mar", status: "open" },
      { month: "Apr", status: "open" }, { month: "May", status: "open" },
      { month: "Jun", status: "partial" }, { month: "Jul", status: "closed" },
      { month: "Aug", status: "closed" }, { month: "Sep", status: "closed" }
    ]
  },
  {
    id: "hintertux-glacier",
    name: "Hintertux Glacier",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.07, lng: 11.67,
    minAltitude: 1500, maxAltitude: 3250,
    verticalDrop: 1750,
    pisteKm: 86, runs: 26, lifts: 22,
    gondolas: 7, chairlifts: 10, dragLifts: 5,
    longestRun: 12,
    difficultyBlue: 12, difficultyRed: 52, difficultyBlack: 36,
    snowCannons: 20, snowCannonKm: 8,
    seasonStart: "2024-01-01", seasonEnd: "2025-12-31",
    openStatus: "Open", roadStatus: "open",
    rating: 9.1, ratingLabel: "Exceptional", priceFrom: 65,
    seasonDates: "Open year-round",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Glacier", "Freeride", "Alpine"],
    description: "The only glacier ski area in Austria open every single day of the year including summer. Outstanding powder skiing and challenging freeride terrain at altitudes up to 3250m at the head of the Zillertal.",
    image: "https://picsum.photos/seed/hintertux/800/500",
    images: ["https://picsum.photos/seed/hintertux-1/1200/700", "https://picsum.photos/seed/hintertux-2/1200/700", "https://picsum.photos/seed/hintertux-3/1200/700"],
    weather: { temp: -13, snowDepth: 280, condition: "Sunny", forecast: [
      { day: "Today", high: -11, low: -18, condition: "clear" },
      { day: "Tomorrow", high: -12, low: -19, condition: "clear" },
      { day: "Thu", high: -14, low: -21, condition: "snow" }
    ]},
    snowDepthBase: 140, snowDepthMid: 210, snowDepthTop: 290, snowType: "Powder",
    liftsOpen: 20, liftsTotal: 22, pistesOpen: 24, pistesTotal: 26,
    ecoRating: 3, ecoRenewable: 40, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["40% renewable electricity", "Glacier monitoring"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 15m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 15m" }
    ],
    trainStation: "Mayrhofen (Zillertalbahn) - 20km bus",
    shuttle: false, shuttleDesc: "Hintertux glacier bus from Mayrhofen",
    parking: { capacity: 1200, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Tuxer Fernerhaus", zone: "2660m", cuisine: "Alpine", price: "€€" },
        { name: "Gefrorene Wand Restaurant", zone: "3250m", cuisine: "Alpine", price: "€€€" }
      ],
      skiSchools: 1, groupLessonFrom: 55, privateLessonFrom: 140,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 62,
      kidsGarden: false, kidsGardenAge: "", babysitting: false,
      lockerCount: 300, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Base station Hintertux",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "Hintertux sits at the end of the Tuxertal, the highest side valley in the Zillertal. The permanent glacier makes it a year-round destination for serious skiers.",
      nearbyTowns: [
        { name: "Hintertux", distance: "0km", desc: "Small village at the head of the Tuxertal" },
        { name: "Mayrhofen", distance: "20km", desc: "Largest Zillertal resort with Harakiri slope" },
        { name: "Zell am Ziller", distance: "35km", desc: "Traditional Zillertal market town" }
      ],
      activities: ["Snowshoeing", "Glacier hiking", "Freeride tours"],
      touristBoard: "Zillertal Tourismus",
      touristBoardUrl: "https://www.hintertuxergletscher.at",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Schwaz (45km)"
    },
    webcams: [
      { name: "Gefrorene Wand 3250m", seed: "hintertux-cam1" },
      { name: "Tuxer Fernerhaus 2660m", seed: "hintertux-cam2" }
    ],
    events: [
      { date: "Aug 2025", name: "Summer Glacier Session", type: "Festival", desc: "Summer skiing and snowboarding event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 65, child: 33, senior: 52, badge: null },
      { type: "3-day", adult: 179, child: 90, senior: 143, badge: null },
      { type: "6-day", adult: 334, child: 167, senior: 267, badge: "Best value" },
      { type: "Season", adult: 1500, child: 750, senior: 1200, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.1,
      breakdown: { pistes: 9.2, lifts: 9.0, apresSki: 7.8, value: 8.3, beginners: 7.5 },
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
    id: "hochkoenig",
    name: "Hochkoenig",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.42, lng: 13.06,
    minAltitude: 800, maxAltitude: 1900,
    verticalDrop: 1100,
    pisteKm: 120, runs: 58, lifts: 37,
    gondolas: 7, chairlifts: 20, dragLifts: 10,
    longestRun: 9,
    difficultyBlue: 52, difficultyRed: 40, difficultyBlack: 8,
    snowCannons: 140, snowCannonKm: 60,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 52,
    seasonDates: "14 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Hochkoenig connects three charming villages beneath the imposing Hochkoenig massif. Known for authentic Alpine character, reliable snowmaking and excellent value compared to neighbouring premium resorts.",
    image: "https://picsum.photos/seed/hochkoenig/800/500",
    images: ["https://picsum.photos/seed/hochkoenig-1/1200/700", "https://picsum.photos/seed/hochkoenig-2/1200/700", "https://picsum.photos/seed/hochkoenig-3/1200/700"],
    weather: { temp: -4, snowDepth: 130, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 100, snowDepthTop: 145, snowType: "Machine-groomed",
    liftsOpen: 33, liftsTotal: 37, pistesOpen: 52, pistesTotal: 58,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Water recycling for snowmaking"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "Bischofshofen - 12km bus connection",
    shuttle: false, shuttleDesc: "Bus connection from Bischofshofen station",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Maria Alm Bergrestaurant", zone: "Mid-mountain", cuisine: "Austrian", price: "€€" },
        { name: "Dienten Hutte", zone: "Slope-side", cuisine: "Alpine", price: "€" }
      ],
      skiSchools: 2, groupLessonFrom: 42, privateLessonFrom: 105,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 400, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Maria Alm village",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Three traditional Salzburg villages - Maria Alm, Dienten and Mulhbach - cluster beneath the imposing 2941m Hochkoenig summit.",
      nearbyTowns: [
        { name: "Maria Alm", distance: "0km", desc: "Charming village with Gothic pilgrimage church" },
        { name: "Bischofshofen", distance: "12km", desc: "Ski jumping town with rail connections" },
        { name: "Salzburg", distance: "60km", desc: "Historic baroque city" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Ice skating"],
      touristBoard: "Hochkoenig Tourismus",
      touristBoardUrl: "https://www.hochkoenig.at",
      emergency: "112",
      hospital: "LKH St. Johann im Pongau (20km)"
    },
    webcams: [
      { name: "Hochkoenig 1900m", seed: "hochkoenig-cam1" },
      { name: "Maria Alm base", seed: "hochkoenig-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Hochkoenig Skiing Classic", type: "Competition", desc: "Regional alpine race event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 52, child: 26, senior: 42, badge: null },
      { type: "3-day", adult: 143, child: 72, senior: 114, badge: null },
      { type: "6-day", adult: 266, child: 133, senior: 213, badge: "Best value" },
      { type: "Season", adult: 1200, child: 600, senior: 960, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.7,
      breakdown: { pistes: 8.6, lifts: 8.5, apresSki: 8.3, value: 9.2, beginners: 9.2 },
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
    id: "montafon",
    name: "Montafon",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Vorarlberg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.07, lng: 9.87,
    minAltitude: 690, maxAltitude: 2430,
    verticalDrop: 1740,
    pisteKm: 222, runs: 115, lifts: 62,
    gondolas: 14, chairlifts: 32, dragLifts: 16,
    longestRun: 13,
    difficultyBlue: 39, difficultyRed: 45, difficultyBlack: 16,
    snowCannons: 200, snowCannonKm: 85,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 55,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["laendle-card"],
    resortTypes: ["Alpine", "Family resort", "Freeride"],
    description: "Montafon is a long valley in Vorarlberg connecting five distinct ski areas across 222km of terrain. From family-friendly Nova to the challenging Silvretta glacier, exceptional variety and authentic Austrian mountain culture.",
    image: "https://picsum.photos/seed/montafon/800/500",
    images: ["https://picsum.photos/seed/montafon-1/1200/700", "https://picsum.photos/seed/montafon-2/1200/700", "https://picsum.photos/seed/montafon-3/1200/700"],
    weather: { temp: -5, snowDepth: 155, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 120, snowDepthTop: 175, snowType: "Packed powder",
    liftsOpen: 56, liftsTotal: 62, pistesOpen: 103, pistesTotal: 115,
    ecoRating: 4, ecoRenewable: 72, ecoCertifications: ["Alpine Pearls"],
    ecoInitiatives: ["72% renewable electricity", "Montafonerbahn electric train", "Wildlife zones"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "2h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Schruns - 2km, Montafonerbahn from Bludenz mainline",
    shuttle: true, shuttleDesc: "Montafonerbahn railway connects Bludenz mainline station to Schruns",
    parking: { capacity: 3000, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Hochjoch Restaurant", zone: "2286m", cuisine: "Alpine", price: "€€" },
        { name: "Nova Stoba", zone: "Mid-mountain", cuisine: "Austrian", price: "€€" }
      ],
      skiSchools: 3, groupLessonFrom: 44, privateLessonFrom: 110,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 55,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 700, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 8, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Fischer"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Schruns village",
      pharmacy: true, atm: true, atmCount: 4
    },
    surroundings: {
      description: "The Montafon valley stretches 40km into the heart of Vorarlberg. Each of the five ski areas has its own character from lively Silvretta Montafon to the quiet family area of Golm.",
      nearbyTowns: [
        { name: "Schruns", distance: "0km", desc: "Main valley town with train connections" },
        { name: "Gaschurn", distance: "12km", desc: "Village below the Silvretta Montafon" },
        { name: "Bludenz", distance: "25km", desc: "Rhine valley town with main railway connections" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Toboggan runs"],
      touristBoard: "Montafon Tourismus",
      touristBoardUrl: "https://www.montafon.at",
      emergency: "112",
      hospital: "LKH Bludenz (25km)"
    },
    webcams: [
      { name: "Hochjoch 2286m", seed: "montafon-cam1" },
      { name: "Silvretta Montafon base", seed: "montafon-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Montafon Spring Fest", type: "Festival", desc: "End of season celebrations across all villages" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 55, child: 28, senior: 44, badge: null },
      { type: "3-day", adult: 151, child: 76, senior: 121, badge: null },
      { type: "6-day", adult: 280, child: 140, senior: 224, badge: "Best value" },
      { type: "Season", adult: 1280, child: 640, senior: 1024, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 8.8, lifts: 8.7, apresSki: 8.7, value: 9.0, beginners: 9.0 },
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
    id: "zillertal-arena",
    name: "Zillertal Arena",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.22, lng: 12.10,
    minAltitude: 580, maxAltitude: 2500,
    verticalDrop: 1920,
    pisteKm: 166, runs: 97, lifts: 48,
    gondolas: 10, chairlifts: 25, dragLifts: 13,
    longestRun: 11,
    difficultyBlue: 36, difficultyRed: 49, difficultyBlack: 15,
    snowCannons: 160, snowCannonKm: 62,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 54,
    seasonDates: "14 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Family resort"],
    description: "The Zillertal Arena connects Zell am Ziller, Gerlos, Koenigsleiten and Krimml across 166km of skiing above the famous Gerlospass. Known for excellent snowparks and family-friendly infrastructure.",
    image: "https://picsum.photos/seed/zillertal-arena/800/500",
    images: ["https://picsum.photos/seed/zillertal-arena-1/1200/700", "https://picsum.photos/seed/zillertal-arena-2/1200/700", "https://picsum.photos/seed/zillertal-arena-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 60, snowDepthMid: 110, snowDepthTop: 165, snowType: "Packed powder",
    liftsOpen: 43, liftsTotal: 48, pistesOpen: 87, pistesTotal: 97,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Zillertalbahn electric train access"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h" },
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "Zell am Ziller (Zillertalbahn) - 2km",
    shuttle: true, shuttleDesc: "Zillertalbahn railway connects Jenbach to Zell am Ziller",
    parking: { capacity: 2500, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Gerlosberg Restaurant", zone: "Mid-mountain", cuisine: "Austrian", price: "€€" },
        { name: "Koenigsleiten Bergrestaurant", zone: "2145m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 44, privateLessonFrom: 110,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 55,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 550, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Zell am Ziller village",
      pharmacy: false, atm: true, atmCount: 3
    },
    surroundings: {
      description: "The Zillertal Arena spans the Gerlospass connecting Tyrol and Salzburg. The famous Krimmler waterfalls are nearby, Europes highest at 380m.",
      nearbyTowns: [
        { name: "Zell am Ziller", distance: "0km", desc: "Traditional Zillertal market town" },
        { name: "Gerlos", distance: "8km", desc: "Village on the Gerlospass" },
        { name: "Krimml", distance: "15km", desc: "Home of the famous 380m Krimmler waterfalls" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Winter hiking", "Toboggan runs"],
      touristBoard: "Zillertal Tourismus",
      touristBoardUrl: "https://www.zillertalarena.com",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Schwaz (45km)"
    },
    webcams: [
      { name: "Gerlosstein 2166m", seed: "zillertal-arena-cam1" },
      { name: "Koenigsleiten 2145m", seed: "zillertal-arena-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Zillertal Arena Snowpark Open", type: "Competition", desc: "Snowpark freestyle competition" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 54, child: 27, senior: 43, badge: null },
      { type: "3-day", adult: 148, child: 74, senior: 118, badge: null },
      { type: "6-day", adult: 275, child: 138, senior: 220, badge: "Best value" },
      { type: "Season", adult: 1240, child: 620, senior: 992, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.7,
      breakdown: { pistes: 8.7, lifts: 8.6, apresSki: 8.5, value: 9.1, beginners: 9.0 },
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
    id: "pitztal-glacier",
    name: "Pitztal Glacier",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.01, lng: 10.85,
    minAltitude: 1660, maxAltitude: 3440,
    verticalDrop: 1780,
    pisteKm: 68, runs: 25, lifts: 13,
    gondolas: 5, chairlifts: 6, dragLifts: 2,
    longestRun: 10,
    difficultyBlue: 15, difficultyRed: 51, difficultyBlack: 34,
    snowCannons: 30, snowCannonKm: 8,
    seasonStart: "2024-10-05", seasonEnd: "2025-05-01",
    openStatus: "Open", roadStatus: "open",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 60,
    seasonDates: "5 Oct 2024 - 1 May 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Glacier", "Freeride", "Alpine"],
    description: "The highest ski area in Austria with the Wildspitzbahn gondola reaching 3440m. Outstanding high-alpine terrain particularly popular with freeriders seeking challenging off-piste routes in an uncrowded setting.",
    image: "https://picsum.photos/seed/pitztal-glacier/800/500",
    images: ["https://picsum.photos/seed/pitztal-glacier-1/1200/700", "https://picsum.photos/seed/pitztal-glacier-2/1200/700", "https://picsum.photos/seed/pitztal-glacier-3/1200/700"],
    weather: { temp: -14, snowDepth: 300, condition: "Sunny", forecast: [
      { day: "Today", high: -12, low: -20, condition: "clear" },
      { day: "Tomorrow", high: -13, low: -21, condition: "clear" },
      { day: "Thu", high: -15, low: -23, condition: "snow" }
    ]},
    snowDepthBase: 150, snowDepthMid: 230, snowDepthTop: 320, snowType: "Powder",
    liftsOpen: 11, liftsTotal: 13, pistesOpen: 22, pistesTotal: 25,
    ecoRating: 3, ecoRenewable: 38, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["38% renewable electricity", "Glacier monitoring"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 15m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Oetztal station - 35km Pitztal valley bus",
    shuttle: false, shuttleDesc: "Pitztal valley bus from Oetztal station",
    parking: { capacity: 1000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Cafe 3440", zone: "Summit 3440m", cuisine: "Alpine", price: "€€€" },
        { name: "Gletscherrestaurant", zone: "2874m", cuisine: "Austrian", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 52, privateLessonFrom: 130,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: false, crecheAgeMin: 0, crecheAgeMax: 0, crecheFrom: 0,
      kidsGarden: false, kidsGardenAge: "", babysitting: false,
      lockerCount: 200, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Base station",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "The Pitztal is a remote and quiet side valley in Tyrol. The Wildspitze at 3774m is the highest peak in North Tyrol and dominates the skyline.",
      nearbyTowns: [
        { name: "Arzl im Pitztal", distance: "15km", desc: "Main valley village" },
        { name: "Imst", distance: "25km", desc: "Inn valley market town" },
        { name: "Oetztal station", distance: "35km", desc: "Inn Valley rail junction" }
      ],
      activities: ["Snowshoeing", "Freeride tours", "Glacier hiking"],
      touristBoard: "Pitztal Tourismus",
      touristBoardUrl: "https://www.pitztal.com",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Zams (50km)"
    },
    webcams: [
      { name: "Wildspitze 3774m", seed: "pitztal-cam1" },
      { name: "Mittelbergferner glacier", seed: "pitztal-cam2" }
    ],
    events: [
      { date: "Nov 2024", name: "Pitztal Glacier Opening", type: "Festival", desc: "Season opener on the highest ski area in Austria" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 60, child: 30, senior: 48, badge: null },
      { type: "3-day", adult: 165, child: 83, senior: 132, badge: null },
      { type: "6-day", adult: 308, child: 154, senior: 246, badge: "Best value" },
      { type: "Season", adult: 1380, child: 690, senior: 1104, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.9,
      breakdown: { pistes: 9.1, lifts: 8.8, apresSki: 7.5, value: 8.5, beginners: 7.0 },
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
];