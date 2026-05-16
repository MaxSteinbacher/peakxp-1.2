export const austrianResorts = [
  {
    id: "ski-arlberg",
    name: "Ski Arlberg",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Vorarlberg/Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.13, lng: 10.27,
    minAltitude: 1304, maxAltitude: 2811,
    verticalDrop: 1507,
    pisteKm: 305, runs: 200, lifts: 88,
    gondolas: 18, chairlifts: 42, dragLifts: 28,
    longestRun: 14,
    difficultyBlue: 35, difficultyRed: 45, difficultyBlack: 20,
    snowCannons: 200, snowCannonKm: 80,
    seasonStart: "2024-11-30", seasonEnd: "2025-05-01",
    openStatus: "Open", roadStatus: "clear",
    rating: 9.4, ratingLabel: "Exceptional", priceFrom: 67,
    seasonDates: "30 Nov 2024 - 1 May 2025",
    seasonPasses: ["laendle-card", "ikon-pass"],
    resortTypes: ["Alpine", "Freeride", "Apres-ski", "Luxury"],
    description: "Ski Arlberg is one of the largest and most prestigious ski areas in the Alps spanning St. Anton, Lech, Zürs, Stuben and Warth-Schröcken. Famous for deep powder, legendary apres-ski and technically demanding terrain. The birthplace of alpine skiing technique.",
    image: "https://picsum.photos/seed/ski-arlberg/800/500",
    images: ["https://picsum.photos/seed/ski-arlberg-1/1200/700", "https://picsum.photos/seed/ski-arlberg-2/1200/700", "https://picsum.photos/seed/ski-arlberg-3/1200/700"],
    weather: { temp: -5, snowDepth: 170, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 90, snowDepthMid: 140, snowDepthTop: 200, snowType: "Packed powder",
    liftsOpen: 80, liftsTotal: 88, pistesOpen: 180, pistesTotal: 200,
    ecoRating: 3, ecoRenewable: 65, ecoCertifications: ["Alpine Pearls"],
    ecoInitiatives: ["65% renewable electricity", "Electric shuttle buses", "Wildlife protection zones"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 15m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "2h 30m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "St. Anton am Arlberg (slope-side) - Direct Railjet from Zurich, Munich and Vienna",
    shuttle: true, shuttleDesc: "Direct ski bus between all villages. Free with lift pass.",
    parking: { capacity: 5000, pricePerDay: 15, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Hospiz Alm", zone: "St. Anton village", cuisine: "Austrian", price: "€€€" },
        { name: "Mooserwirt", zone: "St. Anton slope-side", cuisine: "Austrian", price: "€€" },
        { name: "Rüfikopf Restaurant", zone: "Summit 2350m", cuisine: "Alpine", price: "€€€" }
      ],
      skiSchools: 8, groupLessonFrom: 55, privateLessonFrom: 140,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 70,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1200, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 12, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Base station St. Anton",
      pharmacy: true, atm: true, atmCount: 8
    },
    surroundings: {
      description: "The Arlberg region spans the border of Tyrol and Vorarlberg in the central Alps. St. Anton is a lively village with excellent dining and nightlife while Lech and Zürs offer a quieter, more exclusive atmosphere.",
      nearbyTowns: [
        { name: "St. Anton am Arlberg", distance: "0km", desc: "Lively alpine village, birthplace of skiing" },
        { name: "Lech", distance: "12km", desc: "Exclusive upmarket village with celebrity clientele" },
        { name: "Landeck", distance: "40km", desc: "Market town with rail connections" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Paragliding", "Dog sledding"],
      touristBoard: "Arlberg Tourismus",
      touristBoardUrl: "https://www.arlberg.com",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Zams (30km)"
    },
    webcams: [
      { name: "Valluga Summit 2811m", seed: "ski-arlberg-cam1" },
      { name: "Galzig 2085m", seed: "ski-arlberg-cam2" },
      { name: "St. Anton village", seed: "ski-arlberg-cam3" }
    ],
    events: [
      { date: "11 Jan 2025", name: "Arlberg Classic Race", type: "Competition", desc: "Annual Arlberg Classic race event" },
      { date: "22 Mar 2025", name: "Spring Festival Arlberg", type: "Festival", desc: "End of season celebrations across all villages" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 67, child: 34, senior: 60, badge: null },
      { type: "3-day", adult: 185, child: 93, senior: 166, badge: null },
      { type: "6-day", adult: 330, child: 165, senior: 297, badge: "Best value" },
      { type: "Season", adult: 1600, child: 800, senior: 1440, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.4,
      breakdown: { pistes: 9.5, lifts: 9.3, apresSki: 9.6, value: 8.5, beginners: 8.0 },
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
    id: "ischgl-samnaun",
    name: "Ischgl / Samnaun",
    countries: ["Austria", "Switzerland"],
    countryCode: "AT/CH",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 46.99, lng: 10.29,
    minAltitude: 1377, maxAltitude: 2872,
    verticalDrop: 1495,
    pisteKm: 239, runs: 83, lifts: 45,
    gondolas: 10, chairlifts: 22, dragLifts: 13,
    longestRun: 13,
    difficultyBlue: 28, difficultyRed: 50, difficultyBlack: 22,
    snowCannons: 170, snowCannonKm: 65,
    seasonStart: "2024-11-29", seasonEnd: "2025-05-01",
    openStatus: "Open", roadStatus: "clear",
    rating: 9.2, ratingLabel: "Exceptional", priceFrom: 65,
    seasonDates: "29 Nov 2024 - 1 May 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Apres-ski", "Freeride"],
    description: "Ischgl connects with the Swiss duty-free village of Samnaun across 239km of perfectly groomed slopes. World-class apres-ski concerts and guaranteed snow from November to May make it one of Austrias most celebrated high-altitude resorts.",
    image: "https://picsum.photos/seed/ischgl-samnaun/800/500",
    images: ["https://picsum.photos/seed/ischgl-samnaun-1/1200/700", "https://picsum.photos/seed/ischgl-samnaun-2/1200/700", "https://picsum.photos/seed/ischgl-samnaun-3/1200/700"],
    weather: { temp: -7, snowDepth: 195, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 100, snowDepthMid: 155, snowDepthTop: 210, snowType: "Packed powder",
    liftsOpen: 40, liftsTotal: 45, pistesOpen: 75, pistesTotal: 83,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Snow water recycling system"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "2h 30m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Landeck-Zams - 25km bus connection",
    shuttle: true, shuttleDesc: "Regular bus service from Landeck-Zams station",
    parking: { capacity: 3500, pricePerDay: 14, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Pardorama", zone: "Summit 2624m", cuisine: "Alpine", price: "€€€" },
        { name: "Schirm Bar", zone: "Mid-mountain", cuisine: "Austrian", price: "€€" },
        { name: "Trofana Alm", zone: "Village", cuisine: "International", price: "€€€" }
      ],
      skiSchools: 4, groupLessonFrom: 52, privateLessonFrom: 130,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 65,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 800, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 8, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "Ischgl sits in the Paznaun valley in Tyrol, flanked by dramatic high-Alpine peaks. The cross-border connection to duty-free Samnaun in Switzerland makes it unique in the Alps.",
      nearbyTowns: [
        { name: "Ischgl", distance: "0km", desc: "Vibrant resort village with legendary nightlife" },
        { name: "Samnaun", distance: "cross-border", desc: "Swiss duty-free village" },
        { name: "Landeck", distance: "25km", desc: "Valley market town with train station" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Shopping (duty-free Samnaun)"],
      touristBoard: "Tourismusverband Paznaun-Ischgl",
      touristBoardUrl: "https://www.ischgl.com",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Zams (40km)"
    },
    webcams: [
      { name: "Idalpe 2320m", seed: "ischgl-cam1" },
      { name: "Pardatschgrat 2624m", seed: "ischgl-cam2" },
      { name: "Village centre", seed: "ischgl-cam3" }
    ],
    events: [
      { date: "29 Nov 2024", name: "Season Opening Concert", type: "Concert", desc: "World-class artist opening concert on the slopes" },
      { date: "1 May 2025", name: "Season Closing Concert", type: "Concert", desc: "Spectacular season finale concert event" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 65, child: 33, senior: 58, badge: null },
      { type: "3-day", adult: 179, child: 90, senior: 161, badge: null },
      { type: "6-day", adult: 321, child: 161, senior: 289, badge: "Best value" },
      { type: "Season", adult: 1550, child: 775, senior: 1395, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.2,
      breakdown: { pistes: 9.3, lifts: 9.1, apresSki: 9.8, value: 8.3, beginners: 7.5 },
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
    id: "skicircus-saalbach",
    name: "Skicircus Saalbach Hinterglemm Leogang Fieberbrunn",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg/Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.39, lng: 12.64,
    minAltitude: 1003, maxAltitude: 2096,
    verticalDrop: 1093,
    pisteKm: 270, runs: 133, lifts: 70,
    gondolas: 14, chairlifts: 38, dragLifts: 18,
    longestRun: 11,
    difficultyBlue: 38, difficultyRed: 42, difficultyBlack: 20,
    snowCannons: 280, snowCannonKm: 110,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "clear",
    rating: 9.1, ratingLabel: "Exceptional", priceFrom: 60,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Freeride", "Family resort", "Apres-ski"],
    description: "The Skicircus connects four villages in a seamless circuit of 270km of varied terrain from gentle valley runs to the demanding Hacklberg freeride zone. One of the best linked ski areas in Austria with exceptional lift infrastructure.",
    image: "https://picsum.photos/seed/skicircus-saalbach/800/500",
    images: ["https://picsum.photos/seed/skicircus-saalbach-1/1200/700", "https://picsum.photos/seed/skicircus-saalbach-2/1200/700", "https://picsum.photos/seed/skicircus-saalbach-3/1200/700"],
    weather: { temp: -4, snowDepth: 145, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 120, snowDepthTop: 175, snowType: "Packed powder",
    liftsOpen: 62, liftsTotal: 70, pistesOpen: 118, pistesTotal: 133,
    ecoRating: 4, ecoRenewable: 60, ecoCertifications: ["Green Globe"],
    ecoInitiatives: ["60% renewable electricity", "Electric snowcat fleet", "Wildlife corridor protection"],
    ecoOffsetProgram: true,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 15m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "Zell am See - 20km bus connection",
    shuttle: true, shuttleDesc: "Regular bus service connecting all four villages",
    parking: { capacity: 4000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Hinterhag Alm", zone: "Mid-mountain", cuisine: "Austrian", price: "€€" },
        { name: "Spielberghaus", zone: "Summit area", cuisine: "International", price: "€€€" }
      ],
      skiSchools: 5, groupLessonFrom: 48, privateLessonFrom: 120,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 60,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 1000, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Fischer"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Saalbach village",
      pharmacy: true, atm: true, atmCount: 6
    },
    surroundings: {
      description: "The Glemmtal and Leoganger Steinberge form the backdrop for one of Austria's most visited ski circuits. Saalbach village has a lively central street with renowned apres-ski.",
      nearbyTowns: [
        { name: "Saalbach", distance: "0km", desc: "Car-free village centre with lively apres-ski" },
        { name: "Zell am See", distance: "20km", desc: "Lakeside town with train connections" },
        { name: "Leogang", distance: "8km", desc: "Quiet village at the Pinzgau entrance" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Toboggan runs"],
      touristBoard: "Saalbach Hinterglemm Tourismus",
      touristBoardUrl: "https://www.saalbach.com",
      emergency: "112",
      hospital: "Zell am See hospital (20km)"
    },
    webcams: [
      { name: "Schattberg Ost 1883m", seed: "saalbach-cam1" },
      { name: "Kohlmaiskopf", seed: "saalbach-cam2" },
      { name: "Saalbach village", seed: "saalbach-cam3" }
    ],
    events: [
      { date: "14 Mar 2025", name: "Hahnenkamm Night Race", type: "Competition", desc: "FIS Alpine Ski World Cup event" },
      { date: "20 Apr 2025", name: "Season Closing Party", type: "Festival", desc: "End of season celebration" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 60, child: 30, senior: 54, badge: null },
      { type: "3-day", adult: 165, child: 83, senior: 148, badge: null },
      { type: "6-day", adult: 305, child: 153, senior: 274, badge: "Best value" },
      { type: "Season", adult: 1400, child: 700, senior: 1260, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.1,
      breakdown: { pistes: 9.0, lifts: 9.2, apresSki: 9.4, value: 8.6, beginners: 8.8 },
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
    id: "ski-welt",
    name: "Ski Welt Wilder Kaiser-Brixental",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.52, lng: 12.19,
    minAltitude: 620, maxAltitude: 1869,
    verticalDrop: 1249,
    pisteKm: 272, runs: 279, lifts: 81,
    gondolas: 16, chairliftsFixed: 13, chairliftsDetachable: 19, chairlifts: 32, dragLifts: 13, practiceLifts: 19, combiLifts: 1,
    totalCapacityPerHour: 144953,
    longestRun: 8,
    difficultyBlue: 45, difficultyRed: 42, difficultyBlack: 13,
    beginnerKm: 40, intermediateKm: 120, advancedKm: 44,
    offPisteZones: 3,
    snowCannons: 1171, snowCannonCoveragePercent: 90, snowCannonKm: 245,
    storageLakes: 18, pisteMachines: 74,
    seasonStart: "2025-11-29", seasonEnd: "2026-04-06",
    peakPeriods: "December 26 to January 4, February school holidays, Easter week",
    openStatus: "Open", roadStatus: "clear",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 40,
    seasonDates: "29 Nov 2025 - 6 Apr 2026",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Family resort", "Ecological"],
    description: "The SkiWelt Wilder Kaiser-Brixental is one of the largest, most ecological and most family-friendly ski areas in the world. With 81 state-of-the-art lifts, over 275 perfectly groomed kilometres of pistes and 9 different village entry points, it ranks among the biggest and most modern ski resorts globally. Just one hour from Salzburg, Innsbruck and Munich, the SkiWelt is powered by 100 percent renewable energy from Tyrolean hydropower and has been awarded the most ecological ski resort in the world multiple times. Panoramic views of the Wilder Kaiser and over 70 three-thousand-metre peaks await.",
    logo: "https://media.base44.com/images/public/6a058497bdc3421cd2bb6205/a7a2a1b28_SkiWeltLogo4c.jpg",
    logoBackground: "red",
    // REPLACE WITH REAL URLS — SkiWelt media portal images pending. Contact: presse@skiwelt.at
    image: "https://picsum.photos/seed/skiwelt-hero/1400/800",
    images: [
      "https://picsum.photos/seed/skiwelt-hero/1400/800",
      "https://picsum.photos/seed/skiwelt-piste/1400/800",
      "https://picsum.photos/seed/skiwelt-family/1400/800",
      "https://picsum.photos/seed/skiwelt-village/1400/800",
      "https://picsum.photos/seed/skiwelt-lift/1400/800",
      "https://picsum.photos/seed/skiwelt-hohe-salve/1400/800",
      "https://picsum.photos/seed/skiwelt-hut/1400/800",
      "https://picsum.photos/seed/skiwelt-westendorf/1400/800",
      "https://picsum.photos/seed/skiwelt-ellmau/1400/800",
      "https://picsum.photos/seed/skiwelt-snow/1400/800",
      "https://picsum.photos/seed/skiwelt-kids/1400/800",
      "https://picsum.photos/seed/skiwelt-apres/1400/800",
      "https://picsum.photos/seed/skiwelt-summer/1400/800",
    ],
    videos: [
      {
        url: "https://media.base44.com/videos/public/6a058497bdc3421cd2bb6205/c187d7527_02-ClipBBWK.mp4",
        type: "promotional",
        label: "SkiWelt Wilder Kaiser-Brixental — Official Resort Film",
        autoplay: false,
        loop: true,
      }
    ],
    weather: { temp: -3, snowDepth: 120, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 60, snowDepthMid: 100, snowDepthTop: 145, snowType: "Machine-groomed",
    liftsOpen: 75, liftsTotal: 81, pistesOpen: 250, pistesTotal: 279,
    ecoRating: 5, ecoRenewable: 100, ecoCertifications: ["Most ecological ski resort in the world (multiple awards)"],
    ecoInitiatives: ["100% Tyrolean hydropower renewable energy", "18 water storage lakes for snowmaking", "74 piste machines", "1171 snow cannons with 90% coverage", "Ecological ski resort world award — multiple years"],
    ecoOffsetProgram: true,
    renewableEnergyPercent: 100,
    energySource: "Tyrolean hydropower",
    investmentEUR: 631000000,
    investmentYears: 47,
    employees: { winter: 500, summer: 250 },
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h" },
      { airport: "Munich", iata: "MUC", driveTime: "1h 20m" },
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 30m" }
    ],
    nearestStation: "Worgl",
    distanceFromStation: 15,
    trainStation: "Wörgl — 15km (free regional ski bus)",
    shuttle: true, shuttleDesc: "Free regional ski bus connecting all 9 villages and Wörgl train station. Free local ski bus within each village.",
    parking: { capacity: 5000, pricePerDay: 0, includedInPass: true },
    villages: [
      { name: "Brixen im Thale", altitudeValley: 802, altitudeMountain: 1820, lifts: 13, pisteKm: 47.8 },
      { name: "Ellmau", altitudeValley: 820, altitudeMountain: 1525, lifts: 13, pisteKm: 47.2 },
      { name: "Going", altitudeValley: 800, altitudeMountain: 1267, lifts: 4, pisteKm: 11.2 },
      { name: "Hopfgarten-Itter", altitudeValley: 620, altitudeMountain: 1829, lifts: 12, pisteKm: 33.4 },
      { name: "Scheffau", altitudeValley: 687, altitudeMountain: 1650, lifts: 15, pisteKm: 43.6 },
      { name: "Soll", altitudeValley: 703, altitudeMountain: 1829, lifts: 13, pisteKm: 31.2 },
      { name: "Westendorf", altitudeValley: 802, altitudeMountain: 1869, lifts: 11, pisteKm: 57.7 },
    ],
    specialTerrain: {
      funparks: 3,
      funparkLocations: ["Ellmau", "Soll", "Westendorf"],
      tobogganRuns: 3,
      tobogganRunNames: ["Hexenritt Soll", "Mond-Rodelbahn Soll", "Astberg Ellmau/Going"],
      tobogganRunsLit: true,
      skiMovieTrack: true,
      speedTrack: true,
      nightSkiing: "Soll 11.5km",
      skiTours: "Ellmau Thursdays, Westendorf",
    },
    skiSchoolCount: 22,
    skiSchoolNames: [
      "Skischule Brixen", "Skischule Aktiv", "Top Skischule Ellmau", "Skischule Ellmau-Hartkaiser",
      "Freaks on Snow", "Skischule Going", "Skischule Stanglwirt", "Skischule Hopfgarten",
      "Skischule Alpin", "Ski und Rennschule Ingrid Salvenmoser",
      "Ski und Snowboardschule Scheffau und Kinderkaiserland", "Skischule MountainMind",
      "Skischule Knolln", "Skischule Hochsoll Embacher", "Skischule Westendorf The Reds",
      "Pro Skischule Walter", "Schneesportschule Alpin", "Skischule Top",
      "Skischule Snowsports", "Snowboardschule About Winter"
    ],
    childcareAvailable: true,
    childcareAgeRange: "from 1 year",
    childcareLocations: ["Brixen im Thale", "Ellmau (Ellmi Kids Club)", "Hopfgarten (Kids Club Salvenland)", "Scheffau (Schneepiraten)", "Soll (Hexenwasser Berg/Blaues Wunder)"],
    childcareNote: "Specialized kids ski schools from age 2. Mini and kids clubs with professional childcare from age 1 at mountain and valley level.",
    familyHighlights: [
      "Awarded TOP family ski area of Tyrol",
      "Free ski tickets for children under 15 (min 3 days) during Vorteilssaison",
      "Jungfamilienkarte: 1 ticket shared by 2 parents with children under 3",
      "88 percent of pistes easy or intermediate",
      "Mountain hut every 3.5km (over 80 family-run huts)",
      "3 funparks suitable for young children",
      "Speed and Skimovie tracks",
      "New Kinderland at Soll mid-station from winter 2025-26",
      "Private Hexenwasser gondola bookable for 2 hours",
    ],
    restaurantCount: 84,
    lockerFacilities: 16,
    skiDepotUrl: "https://www.skiwelt.at/de/skidepots.html",
    skiDepotNote: "Ski depots available at all 9 village lift entry points. Barrier-free access, ski rental, sports shops and free parking all within walking distance at every entry point.",
    facilities: {
      restaurants: [
        { name: "Gipfelalm Hohe Salve", zone: "Soll — Summit", cuisine: "Austrian", price: "€€" },
        { name: "Alpengasthof Hochsoll", zone: "Soll — Mid-mountain", cuisine: "Alpine", price: "€€" },
        { name: "Gasthof Grundlalm", zone: "Soll", cuisine: "Austrian", price: "€" },
        { name: "Gasthof Stocklalm", zone: "Soll", cuisine: "Austrian", price: "€" },
        { name: "Restaurant Hexenalm", zone: "Soll", cuisine: "Austrian", price: "€€" },
        { name: "Das Rabennest Café & Shop", zone: "Soll", cuisine: "Café", price: "€" },
        { name: "Der Back Café & Bar", zone: "Soll", cuisine: "Café", price: "€" },
        { name: "Panoramarestaurant Bergkaiser", zone: "Ellmau/Going — Summit", cuisine: "Alpine", price: "€€€" },
        { name: "Kaiserlunge", zone: "Ellmau", cuisine: "Austrian", price: "€€" },
        { name: "Jägerhütte", zone: "Ellmau", cuisine: "Austrian", price: "€€" },
        { name: "Rübezahl Alm", zone: "Ellmau", cuisine: "Alpine", price: "€€" },
        { name: "Tirol Bar & Grill", zone: "Ellmau", cuisine: "International", price: "€€" },
        { name: "Ellmauer Alm", zone: "Ellmau", cuisine: "Austrian", price: "€€" },
        { name: "Après Ski Bar Fabels", zone: "Ellmau", cuisine: "Bar", price: "€€" },
        { name: "Sonnalm", zone: "Westendorf", cuisine: "Alpine", price: "€€" },
        { name: "Panoramarestaurant Choralpe", zone: "Westendorf — Summit", cuisine: "Alpine", price: "€€€" },
        { name: "Alpenrosenhütte DAV", zone: "Westendorf", cuisine: "Austrian", price: "€€" },
        { name: "Restaurant Talkaser", zone: "Westendorf", cuisine: "Alpine", price: "€€" },
        { name: "Bergrestaurant Stimmlach", zone: "Westendorf", cuisine: "Alpine", price: "€€" },
        { name: "Sunset Bar", zone: "Westendorf", cuisine: "Bar", price: "€€" },
        { name: "Alpengasthof Rigi", zone: "Hopfgarten/Itter", cuisine: "Austrian", price: "€€" },
        { name: "KRAFTalm", zone: "Hopfgarten", cuisine: "Alpine", price: "€€" },
        { name: "Sunnseithütte", zone: "Hopfgarten/Itter", cuisine: "Austrian", price: "€" },
        { name: "Das Brixx Restaurant & Weinbar", zone: "Hopfgarten", cuisine: "International", price: "€€€" },
        { name: "SkiWelt-Hütte", zone: "Brixen im Thale", cuisine: "Austrian", price: "€€" },
        { name: "Brixner Stadl", zone: "Brixen im Thale", cuisine: "Austrian", price: "€€" },
        { name: "Bergrestaurant Brandstadl", zone: "Scheffau", cuisine: "Alpine", price: "€€" },
        { name: "Tanzbodenalm", zone: "Scheffau", cuisine: "Austrian", price: "€€" },
        { name: "Bergrestaurant Jochstubern", zone: "Scheffau", cuisine: "Alpine", price: "€€" },
      ],
      skiSchools: 22, groupLessonFrom: 44, privateLessonFrom: 110,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪", "🇮🇹"],
      creche: true, crecheAgeMin: 1, crecheAgeMax: 6, crecheFrom: 55,
      kidsGarden: true, kidsGardenAge: "2-14", babysitting: true,
      lockerCount: 1400, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 16, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head", "Fischer"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Soll village",
      pharmacy: true, atm: true, atmCount: 9
    },
    surroundings: {
      description: "The Wilder Kaiser mountains rise dramatically above nine traditional Tyrolean villages in the heart of the Tyrol. Known for its dramatic rocky ridgeline, 100% renewable energy, and the most family-friendly atmosphere in the Alps.",
      nearbyTowns: [
        { name: "Soll", distance: "0km", desc: "Traditional Tyrolean village, night skiing 11.5km" },
        { name: "Ellmau", distance: "5km", desc: "Charming village at the foot of the Wilder Kaiser" },
        { name: "Wörgl", distance: "15km", desc: "Rail junction town in the Inn Valley" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Toboggan runs", "Curling", "Night skiing", "Ski touring"],
      touristBoard: "SkiWelt Wilder Kaiser-Brixental",
      touristBoardUrl: "https://www.skiwelt.at",
      emergency: "112",
      hospital: "Kufstein hospital (18km)"
    },
    webcams: [
      { name: "Hohe Salve 1829m", seed: "ski-welt-cam1" },
      { name: "Soll village", seed: "ski-welt-cam2" },
      { name: "Ellmau/Kaiser", seed: "ski-welt-cam3" },
      { name: "Westendorf summit 1869m", seed: "ski-welt-cam4" },
    ],
    events: [
      { date: "29 Nov 2025", name: "SkiWelt Season Opening", type: "Festival", desc: "Season opening celebrations across all 9 villages" },
      { date: "26 Dec 2025", name: "Christmas & New Year Peak", type: "Family", desc: "Peak season family events, festive markets and ski entertainment" },
      { date: "22 Feb 2026", name: "Ski Welt Family Festival", type: "Family", desc: "Family fun day with prizes and entertainment" },
      { date: "6 Apr 2026", name: "Season Closing", type: "Festival", desc: "End of season celebrations across all villages" }
    ],
    promotions: [
      {
        title: "FamilienSkiWochen — Kids under 15 ski free",
        validFrom: "2025-12-06",
        validTo: "2025-12-19",
        validFrom2: "2026-03-14",
        validTo2: "2026-04-06",
        description: "Children up to 15 years ski free when one parent buys a ski pass for minimum 3 days during the promotional period.",
        url: "www.skiwelt.at/ticketshop",
      }
    ],
    liftPasses: [
      { type: "1 day", adult: 40.00, youth: 30.00, child: 20.00, badge: null },
      { type: "2 days", adult: 71.00, youth: 53.50, child: 35.50, badge: null },
      { type: "3 days", adult: 87.00, youth: 65.50, child: 43.50, badge: null },
      { type: "4 days", adult: 99.00, youth: 74.50, child: 49.50, badge: null },
      { type: "5 days", adult: 108.50, youth: 81.50, child: 54.50, badge: null },
      { type: "6 days", adult: 118.50, youth: 89.00, child: 59.50, badge: "Best value" },
      { type: "7 days", adult: 125.50, youth: 94.00, child: 63.00, badge: null },
      { type: "10 days", adult: 149.50, youth: 112.00, child: 75.00, badge: null },
      { type: "14 days", adult: 177.00, youth: 133.00, child: 88.50, badge: null },
      { type: "21 days", adult: 235.50, youth: 176.50, child: 118.00, badge: null },
    ],
    passRules: {
      photoRequired: true,
      handsfreeRFID: true,
      cancellation: "up to 48 hours before",
      lostPassFee: 10,
      transferable: "Jungfamilienkarte only (3-14 days between 2 parents)",
      validPasses: "snowcard-tirol",
      youthBornRange: "2008-2010",
      childBornRange: "2011-2021",
      infantSkiFree: "born 2022 or later",
    },
    contact: {
      address: "Dorf 84, A-6306 Söll",
      phone: "+43 5333 400",
      email: "office@skiwelt.at",
      website: "www.skiwelt.at",
      facebook: "facebook.com/SkiWelt",
      instagram: "instagram.com/skiweltwilderkaiserbrixental",
      tiktok: "tiktok.com/@skiwelt",
      pressContact: "Johanna Fischbacher — presse@skiwelt.at",
    },
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 8.7, lifts: 9.0, apresSki: 8.5, value: 9.0, beginners: 9.2 },
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
    id: "kitzbuehel",
    name: "Kitzbühel",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.45, lng: 12.39,
    minAltitude: 762, maxAltitude: 2000,
    verticalDrop: 1238,
    pisteKm: 230, runs: 177, lifts: 57,
    gondolas: 10, chairlifts: 30, dragLifts: 17,
    longestRun: 9,
    difficultyBlue: 40, difficultyRed: 42, difficultyBlack: 18,
    snowCannons: 250, snowCannonKm: 95,
    seasonStart: "2024-11-30", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "clear",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 63,
    seasonDates: "30 Nov 2024 - 20 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Apres-ski", "Luxury"],
    description: "Kitzbühel is home to the legendary Hahnenkamm downhill race and 230km of varied skiing. The medieval town centre combines world-class skiing with outstanding gastronomy and a uniquely glamorous Austrian mountain atmosphere.",
    image: "https://picsum.photos/seed/kitzbuehel/800/500",
    images: ["https://picsum.photos/seed/kitzbuehel-1/1200/700", "https://picsum.photos/seed/kitzbuehel-2/1200/700", "https://picsum.photos/seed/kitzbuehel-3/1200/700"],
    weather: { temp: -4, snowDepth: 145, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -1, low: -7, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 165, snowType: "Packed powder",
    liftsOpen: 50, liftsTotal: 57, pistesOpen: 158, pistesTotal: 177,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Electric ski bus fleet"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h" },
      { airport: "Salzburg", iata: "SZG", driveTime: "1h" },
      { airport: "Munich", iata: "MUC", driveTime: "1h 45m" }
    ],
    trainStation: "Kitzbühel - 1km walk, direct trains from Innsbruck, Salzburg and Munich",
    shuttle: true, shuttleDesc: "Free ski bus between all lift stations",
    parking: { capacity: 3500, pricePerDay: 13, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Hahnenkamm Restaurant", zone: "Summit 1712m", cuisine: "Austrian", price: "€€€" },
        { name: "Seidlalm", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 6, groupLessonFrom: 50, privateLessonFrom: 125,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪", "🇮🇹"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 60,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 900, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 9, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Town centre",
      pharmacy: true, atm: true, atmCount: 7
    },
    surroundings: {
      description: "Kitzbühel sits in a broad valley in eastern Tyrol surrounded by the gentler Kitzbüheler Alps. The medieval walled town is one of the most beautiful in Austria.",
      nearbyTowns: [
        { name: "Kitzbühel", distance: "0km", desc: "Stunning medieval walled town with cosmopolitan feel" },
        { name: "St. Johann in Tirol", distance: "10km", desc: "Traditional market town" },
        { name: "Fieberbrunn", distance: "15km", desc: "Freeride paradise linked to Saalbach circuit" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Museum", "Shopping", "Wine & gastronomy"],
      touristBoard: "Kitzbühel Tourismus",
      touristBoardUrl: "https://www.kitzbuehel.com",
      emergency: "112",
      hospital: "St. Johann hospital (10km)"
    },
    webcams: [
      { name: "Hahnenkamm 1712m", seed: "kitzbuehel-cam1" },
      { name: "Pengelstein 1940m", seed: "kitzbuehel-cam2" }
    ],
    events: [
      { date: "24 Jan 2025", name: "Hahnenkamm Race Weekend", type: "Race", desc: "World Cup downhill, super-G and slalom on the Streif" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 63, child: 32, senior: 57, badge: null },
      { type: "3-day", adult: 173, child: 87, senior: 156, badge: null },
      { type: "6-day", adult: 320, child: 160, senior: 288, badge: "Best value" },
      { type: "Season", adult: 1480, child: 740, senior: 1332, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 8.9, lifts: 8.8, apresSki: 9.3, value: 8.2, beginners: 8.5 },
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
    id: "schladming-dachstein",
    name: "Schladming-Dachstein",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Styria, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.39, lng: 13.69,
    minAltitude: 745, maxAltitude: 2015,
    verticalDrop: 1270,
    pisteKm: 230, runs: 121, lifts: 44,
    gondolas: 8, chairlifts: 24, dragLifts: 12,
    longestRun: 10,
    difficultyBlue: 42, difficultyRed: 40, difficultyBlack: 18,
    snowCannons: 220, snowCannonKm: 90,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "clear",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 58,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort", "Night skiing"],
    description: "Schladming connects four mountains in Styria and is famous for its Nightrace World Cup slalom and outstanding night skiing. A charming market town at the base with excellent train access from Salzburg and Graz.",
    image: "https://picsum.photos/seed/schladming-dachstein/800/500",
    images: ["https://picsum.photos/seed/schladming-dachstein-1/1200/700", "https://picsum.photos/seed/schladming-dachstein-2/1200/700", "https://picsum.photos/seed/schladming-dachstein-3/1200/700"],
    weather: { temp: -3, snowDepth: 125, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -1, low: -7, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -2, low: -8, condition: "clear" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 100, snowDepthTop: 155, snowType: "Packed powder",
    liftsOpen: 40, liftsTotal: 44, pistesOpen: 108, pistesTotal: 121,
    ecoRating: 4, ecoRenewable: 62, ecoCertifications: ["Green Globe"],
    ecoInitiatives: ["62% renewable electricity", "Green Globe certified", "LED lift lighting"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h 15m" },
      { airport: "Graz", iata: "GRZ", driveTime: "1h 45m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Schladming - 1km walk, direct trains from Salzburg and Graz",
    shuttle: true, shuttleDesc: "Free ski bus to all four mountain bases",
    parking: { capacity: 3000, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Schafalm", zone: "Mid-mountain Planai", cuisine: "Austrian", price: "€€" },
        { name: "Bergrestaurant Hochwurzen", zone: "Summit 1850m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 5, groupLessonFrom: 46, privateLessonFrom: 115,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 58,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 700, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 8, rentalBrands: ["Atomic", "Rossignol", "Head", "Fischer"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Planai base station",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "The Enns valley in Styria is surrounded by the gentle Schladminger Tauern and the dramatic Dachstein massif. Schladming is a genuine Austrian market town with centuries of mining heritage.",
      nearbyTowns: [
        { name: "Schladming", distance: "0km", desc: "Genuine Austrian market town with medieval centre" },
        { name: "Ramsau am Dachstein", distance: "12km", desc: "Nordic ski paradise on the Dachstein plateau" },
        { name: "Bad Aussee", distance: "30km", desc: "Spa town in the Salzkammergut lake district" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Toboggan runs", "Museum"],
      touristBoard: "Schladming-Dachstein Tourismus",
      touristBoardUrl: "https://www.schladming-dachstein.at",
      emergency: "112",
      hospital: "LKH Schladming (1km)"
    },
    webcams: [
      { name: "Planai summit 1906m", seed: "schladming-cam1" },
      { name: "Hochwurzen 1850m", seed: "schladming-cam2" }
    ],
    events: [
      { date: "28 Jan 2025", name: "Nightrace Schladming", type: "Race", desc: "World Cup night slalom under floodlights before 40000 spectators" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 58, child: 29, senior: 52, badge: null },
      { type: "3-day", adult: 159, child: 80, senior: 143, badge: null },
      { type: "6-day", adult: 295, child: 148, senior: 265, badge: "Best value" },
      { type: "Season", adult: 1350, child: 675, senior: 1215, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 8.9, lifts: 8.8, apresSki: 9.0, value: 8.9, beginners: 9.0 },
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
    id: "salzburger-sportwelt",
    name: "Salzburger Sportwelt",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Salzburg, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.33, lng: 13.30,
    minAltitude: 838, maxAltitude: 2188,
    verticalDrop: 1350,
    pisteKm: 350, runs: 121, lifts: 77,
    gondolas: 12, chairlifts: 42, dragLifts: 23,
    longestRun: 14,
    difficultyBlue: 44, difficultyRed: 42, difficultyBlack: 14,
    snowCannons: 310, snowCannonKm: 130,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "clear",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 56,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "The Salzburger Sportwelt connects five villages across 350km of terrain and is part of the Ski Amade network. Outstanding value and excellent beginner and intermediate terrain in the heart of the Salzburg Alps.",
    image: "https://picsum.photos/seed/salzburger-sportwelt/800/500",
    images: ["https://picsum.photos/seed/salzburger-sportwelt-1/1200/700", "https://picsum.photos/seed/salzburger-sportwelt-2/1200/700", "https://picsum.photos/seed/salzburger-sportwelt-3/1200/700"],
    weather: { temp: -5, snowDepth: 130, condition: "Snowy", forecast: [
      { day: "Today", high: -3, low: -9, condition: "snow" },
      { day: "Tomorrow", high: -4, low: -10, condition: "partly_cloudy" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 60, snowDepthMid: 105, snowDepthTop: 160, snowType: "Powder",
    liftsOpen: 70, liftsTotal: 77, pistesOpen: 108, pistesTotal: 121,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Water recycling for snowmaking"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Salzburg", iata: "SZG", driveTime: "1h" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" }
    ],
    trainStation: "St. Johann im Pongau - 5km bus connection",
    shuttle: true, shuttleDesc: "Regular ski buses connecting all five villages",
    parking: { capacity: 4000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Wagrain Bergrestaurant", zone: "Summit area", cuisine: "Austrian", price: "€€" },
        { name: "Flachau Hut", zone: "Slope-side", cuisine: "Austrian", price: "€" }
      ],
      skiSchools: 5, groupLessonFrom: 44, privateLessonFrom: 110,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 55,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 800, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Flachau base station",
      pharmacy: false, atm: true, atmCount: 4
    },
    surroundings: {
      description: "The Pongau region in Salzburg province offers gentle rolling hills dotted with traditional farmsteads. Excellent value skiing in an authentic Austrian rural setting.",
      nearbyTowns: [
        { name: "Wagrain", distance: "0km", desc: "Pleasant village with good infrastructure" },
        { name: "Flachau", distance: "4km", desc: "Home of Hermann Maier, former world champion" },
        { name: "St. Johann im Pongau", distance: "5km", desc: "Market town with train station" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Curling"],
      touristBoard: "Salzburger Sportwelt Tourismus",
      touristBoardUrl: "https://www.salzburger-sportwelt.at",
      emergency: "112",
      hospital: "LKH St. Johann im Pongau (5km)"
    },
    webcams: [
      { name: "Wagrain summit 1840m", seed: "salzburger-sportwelt-cam1" },
      { name: "Flachau mid-station", seed: "salzburger-sportwelt-cam2" }
    ],
    events: [
      { date: "21 Jan 2025", name: "Snow Space Cup", type: "Competition", desc: "Regional amateur race competition" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 56, child: 28, senior: 50, badge: null },
      { type: "3-day", adult: 154, child: 77, senior: 138, badge: null },
      { type: "6-day", adult: 285, child: 143, senior: 256, badge: "Best value" },
      { type: "Season", adult: 1290, child: 645, senior: 1161, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.9,
      breakdown: { pistes: 8.8, lifts: 8.9, apresSki: 8.6, value: 9.2, beginners: 9.3 },
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
    id: "soelden",
    name: "Sölden",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 46.97, lng: 11.00,
    minAltitude: 1377, maxAltitude: 3340,
    verticalDrop: 1963,
    pisteKm: 148, runs: 33, lifts: 36,
    gondolas: 9, chairlifts: 18, dragLifts: 9,
    longestRun: 15,
    difficultyBlue: 30, difficultyRed: 45, difficultyBlack: 25,
    snowCannons: 120, snowCannonKm: 45,
    seasonStart: "2024-10-19", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "clear",
    rating: 9.1, ratingLabel: "Exceptional", priceFrom: 66,
    seasonDates: "19 Oct 2024 - 4 May 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Freeride", "Glacier", "Apres-ski"],
    description: "Sölden features two glaciers and three mountains above 3000m in the Ötztal valley. Famous for early season skiing, world-class apres-ski and the spectacular Ice Q restaurant at 3048m made famous by the James Bond film Spectre.",
    image: "https://picsum.photos/seed/soelden/800/500",
    images: ["https://picsum.photos/seed/soelden-1/1200/700", "https://picsum.photos/seed/soelden-2/1200/700", "https://picsum.photos/seed/soelden-3/1200/700"],
    weather: { temp: -9, snowDepth: 210, condition: "Sunny", forecast: [
      { day: "Today", high: -7, low: -14, condition: "clear" },
      { day: "Tomorrow", high: -8, low: -15, condition: "clear" },
      { day: "Thu", high: -10, low: -17, condition: "snow" }
    ]},
    snowDepthBase: 110, snowDepthMid: 175, snowDepthTop: 245, snowType: "Powder",
    liftsOpen: 32, liftsTotal: 36, pistesOpen: 30, pistesTotal: 33,
    ecoRating: 3, ecoRenewable: 48, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["48% renewable electricity", "Glacier protection measures", "EV parking at base"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 15m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Ötztal station - 30km bus connection",
    shuttle: true, shuttleDesc: "Regular ÖBB bus service from Ötztal station",
    parking: { capacity: 2500, pricePerDay: 14, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Ice Q", zone: "Gaislachkogl 3048m", cuisine: "Alpine Gourmet", price: "€€€€" },
        { name: "Schwarze Schneid", zone: "3340m", cuisine: "Alpine", price: "€€€" }
      ],
      skiSchools: 4, groupLessonFrom: 55, privateLessonFrom: 140,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 5, crecheFrom: 68,
      kidsGarden: true, kidsGardenAge: "3-10", babysitting: false,
      lockerCount: 600, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: true, atm: true, atmCount: 4
    },
    surroundings: {
      description: "The Ötztal is one of the longest side valleys in the Alps stretching 65km from the Inn river to the glaciers near the Italian border. A landscape of dramatic contrasts.",
      nearbyTowns: [
        { name: "Sölden", distance: "0km", desc: "Vibrant resort village with legendary nightlife" },
        { name: "Obergurgl", distance: "20km", desc: "High-altitude exclusive village" },
        { name: "Ötztal station", distance: "30km", desc: "Inn valley rail junction" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Paragliding"],
      touristBoard: "Ötztal Tourismus",
      touristBoardUrl: "https://www.soelden.com",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Zams (60km)"
    },
    webcams: [
      { name: "Gaislachkogl 3048m", seed: "soelden-cam1" },
      { name: "Giggijoch 2284m", seed: "soelden-cam2" }
    ],
    events: [
      { date: "26 Oct 2024", name: "Glacier Opening Race", type: "Race", desc: "FIS Alpine World Cup glacier opener" },
      { date: "4 May 2025", name: "Top of the Mountain Concert", type: "Concert", desc: "End-of-season concert at high altitude" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 66, child: 33, senior: 59, badge: null },
      { type: "3-day", adult: 182, child: 91, senior: 163, badge: null },
      { type: "6-day", adult: 336, child: 168, senior: 302, badge: "Best value" },
      { type: "Season", adult: 1550, child: 775, senior: 1395, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.1,
      breakdown: { pistes: 9.0, lifts: 9.2, apresSki: 9.5, value: 8.2, beginners: 7.8 },
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
    id: "mayrhofen",
    name: "Mayrhofen",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.17, lng: 11.86,
    minAltitude: 630, maxAltitude: 2500,
    verticalDrop: 1870,
    pisteKm: 157, runs: 126, lifts: 24,
    gondolas: 6, chairlifts: 12, dragLifts: 6,
    longestRun: 13,
    difficultyBlue: 38, difficultyRed: 42, difficultyBlack: 20,
    snowCannons: 100, snowCannonKm: 45,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "clear",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 58,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Freeride", "Apres-ski"],
    description: "Mayrhofen is home to the legendary Harakiri slope, the steepest groomed run in Austria at 78 percent gradient. A vibrant resort town at the heart of the Zillertal with excellent nightlife and access to the Hintertux glacier.",
    image: "https://picsum.photos/seed/mayrhofen/800/500",
    images: ["https://picsum.photos/seed/mayrhofen-1/1200/700", "https://picsum.photos/seed/mayrhofen-2/1200/700", "https://picsum.photos/seed/mayrhofen-3/1200/700"],
    weather: { temp: -4, snowDepth: 150, condition: "Partly cloudy", forecast: [
      { day: "Today", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 120, snowDepthTop: 185, snowType: "Packed powder",
    liftsOpen: 22, liftsTotal: 24, pistesOpen: 112, pistesTotal: 126,
    ecoRating: 3, ecoRenewable: 52, ecoCertifications: ["Alpine Pearls"],
    ecoInitiatives: ["52% renewable electricity", "Zillertalbahn electric train access"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h" },
      { airport: "Munich", iata: "MUC", driveTime: "2h" },
      { airport: "Salzburg", iata: "SZG", driveTime: "2h" }
    ],
    trainStation: "Mayrhofen (Zillertalbahn) - 0.5km, narrow gauge from Jenbach mainline",
    shuttle: true, shuttleDesc: "Zillertalbahn train and local ski bus network",
    parking: { capacity: 2800, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Ahornhutte", zone: "Ahorn summit 2000m", cuisine: "Austrian", price: "€€" },
        { name: "Penken Park Restaurant", zone: "Mid-mountain", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 4, groupLessonFrom: 46, privateLessonFrom: 115,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 60,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 700, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Village centre",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "The Zillertal is one of Tyrol's most popular valleys, stretching 40km south from the Inn river. Known for its traditional culture, brass band music and access to multiple ski areas.",
      nearbyTowns: [
        { name: "Mayrhofen", distance: "0km", desc: "Lively resort with strong nightlife" },
        { name: "Zell am Ziller", distance: "15km", desc: "Traditional Zillertal market town" },
        { name: "Jenbach", distance: "35km", desc: "Inn Valley mainline rail junction" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Toboggan runs"],
      touristBoard: "Mayrhofen Tourismus",
      touristBoardUrl: "https://www.mayrhofen.at",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Schwaz (35km)"
    },
    webcams: [
      { name: "Penken 2095m", seed: "mayrhofen-cam1" },
      { name: "Ahorn 2000m", seed: "mayrhofen-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Snowbombing Festival", type: "Concert", desc: "Worlds biggest music festival on snow" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 58, child: 29, senior: 52, badge: null },
      { type: "3-day", adult: 159, child: 80, senior: 143, badge: null },
      { type: "6-day", adult: 295, child: 148, senior: 265, badge: "Best value" },
      { type: "Season", adult: 1350, child: 675, senior: 1215, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.9,
      breakdown: { pistes: 8.8, lifts: 8.7, apresSki: 9.4, value: 8.6, beginners: 8.5 },
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
    id: "serfaus-fiss-ladis",
    name: "Serfaus-Fiss-Ladis",
    countries: ["Austria"],
    countryCode: "AT",
    region: "Tyrol, Austria",
    country: "Austria",
    flag: "🇦🇹",
    lat: 47.04, lng: 10.61,
    minAltitude: 1200, maxAltitude: 2820,
    verticalDrop: 1620,
    pisteKm: 198, runs: 101, lifts: 68,
    gondolas: 12, chairlifts: 36, dragLifts: 20,
    longestRun: 12,
    difficultyBlue: 45, difficultyRed: 40, difficultyBlack: 15,
    snowCannons: 190, snowCannonKm: 80,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "clear",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 60,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["snowcard-tirol"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Serfaus-Fiss-Ladis is one of the premier family ski areas in the Alps with a unique driverless underground people mover connecting villages. Outstanding childrens facilities and excellent snow reliability at high altitude.",
    image: "https://picsum.photos/seed/serfaus-fiss-ladis/800/500",
    images: ["https://picsum.photos/seed/serfaus-fiss-ladis-1/1200/700", "https://picsum.photos/seed/serfaus-fiss-ladis-2/1200/700", "https://picsum.photos/seed/serfaus-fiss-ladis-3/1200/700"],
    weather: { temp: -6, snowDepth: 170, condition: "Sunny", forecast: [
      { day: "Today", high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "clear" },
      { day: "Thu", high: -7, low: -13, condition: "snow" }
    ]},
    snowDepthBase: 90, snowDepthMid: 145, snowDepthTop: 200, snowType: "Packed powder",
    liftsOpen: 62, liftsTotal: 68, pistesOpen: 90, pistesTotal: 101,
    ecoRating: 4, ecoRenewable: 68, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["68% renewable electricity", "Underground people mover reduces emissions", "Wildlife protection areas"],
    ecoOffsetProgram: true,
    airports: [
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 15m" },
      { airport: "Munich", iata: "MUC", driveTime: "2h 30m" }
    ],
    trainStation: "Landeck-Zams - 18km bus connection",
    shuttle: true, shuttleDesc: "Underground Dorfbahn and regular bus from Landeck",
    parking: { capacity: 3000, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Masner Alm", zone: "Mid-mountain", cuisine: "Austrian", price: "€€" },
        { name: "Komperdell Bergrestaurant", zone: "2208m", cuisine: "Alpine", price: "€€" }
      ],
      skiSchools: 5, groupLessonFrom: 48, privateLessonFrom: 120,
      languages: ["🇦🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 2, crecheAgeMax: 6, crecheFrom: 62,
      kidsGarden: true, kidsGardenAge: "2-12", babysitting: true,
      lockerCount: 900, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 9, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Serfaus village",
      pharmacy: false, atm: true, atmCount: 4
    },
    surroundings: {
      description: "The three plateau villages of Serfaus, Fiss and Ladis sit high above the Inn valley near Landeck. The area is renowned across Europe as the ideal destination for families with young children.",
      nearbyTowns: [
        { name: "Serfaus", distance: "0km", desc: "Car-free plateau village with unique underground train" },
        { name: "Fiss", distance: "2km", desc: "Traditional village with excellent children facilities" },
        { name: "Landeck", distance: "18km", desc: "Inn valley town with train connections" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Toboggan runs", "Curling"],
      touristBoard: "Serfaus-Fiss-Ladis Tourismus",
      touristBoardUrl: "https://www.serfaus-fiss-ladis.at",
      emergency: "112",
      hospital: "Bezirkskrankenhaus Zams (20km)"
    },
    webcams: [
      { name: "Lazid 2820m", seed: "serfaus-cam1" },
      { name: "Komperdell 2208m", seed: "serfaus-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Family Snow Festival", type: "Family", desc: "Annual family celebration with kids entertainment" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 60, child: 30, senior: 54, badge: null },
      { type: "3-day", adult: 165, child: 83, senior: 148, badge: null },
      { type: "6-day", adult: 305, child: 153, senior: 274, badge: "Best value" },
      { type: "Season", adult: 1400, child: 700, senior: 1260, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 8.9, lifts: 9.1, apresSki: 8.5, value: 8.8, beginners: 9.5 },
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