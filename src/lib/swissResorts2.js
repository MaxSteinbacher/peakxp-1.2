export const swissResorts2 = [
  {
    id: "gstaad",
    name: "Gstaad Mountain Rides",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Bernese Oberland, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.48, lng: 7.28,
    minAltitude: 1050, maxAltitude: 2000,
    verticalDrop: 950,
    pisteKm: 220, runs: 70, lifts: 55,
    gondolas: 14, chairlifts: 28, dragLifts: 13,
    longestRun: 10,
    difficultyBlue: 44, difficultyRed: 43, difficultyBlack: 13,
    snowCannons: 100, snowCannonKm: 44,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.9, ratingLabel: "Excellent", priceFrom: 68,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Luxury", "Family resort"],
    description: "Synonymous with alpine luxury and celebrity clientele offering 220km of skiing across multiple connected valleys. Wide gentle slopes suit intermediate skiers and families while the village provides some of the finest dining and shopping in the Alps.",
    image: "https://picsum.photos/seed/gstaad/800/500",
    images: ["https://picsum.photos/seed/gstaad-1/1200/700", "https://picsum.photos/seed/gstaad-2/1200/700", "https://picsum.photos/seed/gstaad-3/1200/700"],
    weather: { temp: -4, snowDepth: 130, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 60, snowDepthMid: 105, snowDepthTop: 145, snowType: "Packed powder",
    liftsOpen: 49, liftsTotal: 55, pistesOpen: 63, pistesTotal: 70,
    ecoRating: 3, ecoRenewable: 70, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["70% renewable electricity", "Golden Pass railway integration"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h" },
      { airport: "Bern", iata: "BRN", driveTime: "1h 30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "2h 30m" }
    ],
    trainStation: "Gstaad - 0.5km, MOB Golden Pass Express from Montreux",
    shuttle: true, shuttleDesc: "MOB Golden Pass Express connects Montreux to Gstaad with panoramic rail cars",
    parking: { capacity: 2000, pricePerDay: 15, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Eggli Restaurant", zone: "1980m", cuisine: "Swiss Alpine", price: "€€€" },
        { name: "Glacier 3000 restaurant", zone: "2971m", cuisine: "Alpine Gourmet", price: "€€€€" },
        { name: "Chesery", zone: "Village", cuisine: "Swiss Gourmet", price: "€€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 60, privateLessonFrom: 160,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 72,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 700, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 12, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Volkl"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Gstaad village",
      pharmacy: true, atm: true, atmCount: 6
    },
    surroundings: {
      description: "Gstaad sits in the Saanenland valley where the Bernese Oberland meets the Vaud Alps. The village is famous for its traditional chalet architecture, Michelin-starred restaurants and the Menuhin Festival.",
      nearbyTowns: [
        { name: "Gstaad", distance: "0km", desc: "World-famous luxury Alpine village" },
        { name: "Saanen", distance: "3km", desc: "Traditional village with regional airport" },
        { name: "Zweisimmen", distance: "20km", desc: "Valley hub with mainline railway connections" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Dog sledding", "Curling"],
      touristBoard: "Gstaad Tourism",
      touristBoardUrl: "https://www.gstaad.ch",
      emergency: "112",
      hospital: "Spital Zweisimmen (20km)"
    },
    webcams: [
      { name: "Eggli 1980m", seed: "gstaad-cam1" },
      { name: "Gstaad village", seed: "gstaad-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Gstaad World Snow Polo", type: "Festival", desc: "Annual international snow polo championship" }
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
      overall: 8.9,
      breakdown: { pistes: 8.8, lifts: 8.7, apresSki: 9.2, value: 7.8, beginners: 9.2 },
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
    id: "arosa-lenzerheide",
    name: "Arosa Lenzerheide",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Graubunden, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.78, lng: 9.68,
    minAltitude: 1230, maxAltitude: 2865,
    verticalDrop: 1635,
    pisteKm: 225, runs: 78, lifts: 43,
    gondolas: 12, chairlifts: 22, dragLifts: 9,
    longestRun: 12,
    difficultyBlue: 37, difficultyRed: 47, difficultyBlack: 16,
    snowCannons: 105, snowCannonKm: 55,
    seasonStart: "2024-11-30", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.8, ratingLabel: "Excellent", priceFrom: 67,
    seasonDates: "30 Nov 2024 - 13 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Created by connecting two formerly separate resorts via the Urdenbahn gondola in 2014 forming 225km of varied terrain above Chur. Sunny south-facing Lenzerheide contrasts with challenging north-facing Arosa for excellent all-round skiing.",
    image: "https://picsum.photos/seed/arosa-lenzerheide/800/500",
    images: ["https://picsum.photos/seed/arosa-1/1200/700", "https://picsum.photos/seed/arosa-2/1200/700", "https://picsum.photos/seed/arosa-3/1200/700"],
    weather: { temp: -5, snowDepth: 150, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 120, snowDepthTop: 175, snowType: "Packed powder",
    liftsOpen: 38, liftsTotal: 43, pistesOpen: 70, pistesTotal: 78,
    ecoRating: 3, ecoRenewable: 72, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["72% renewable electricity", "Urdenbahn connection reducing car trips"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "1h 30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "via Chur 1h 45m" }
    ],
    trainStation: "Chur - 28km, bus to Lenzerheide or cogwheel train to Arosa",
    shuttle: false, shuttleDesc: "Bus from Chur to Lenzerheide or Arosa cogwheel train",
    parking: { capacity: 2500, pricePerDay: 14, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Weisshorn Restaurant", zone: "2653m Arosa", cuisine: "Swiss Alpine", price: "€€€" },
        { name: "Rothorn Restaurant", zone: "2865m Lenzerheide", cuisine: "Alpine", price: "€€€" },
        { name: "Urdenbahn Bergstation", zone: "2100m", cuisine: "Swiss", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 58, privateLessonFrom: 150,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 70,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 800, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 10, bootDryers: true,
      rentalShops: 10, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Arosa village",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "Arosa sits in a high enclosed valley at the end of the Schanfigg above Chur. Lenzerheide is on an open sunny plateau overlooking the Lenzerhorn. The Urdenbahn gondola links the two via the Urden ridge.",
      nearbyTowns: [
        { name: "Arosa", distance: "0km", desc: "Traditional enclosed Alpine resort village" },
        { name: "Lenzerheide", distance: "18km via gondola", desc: "Sunny plateau village above Chur" },
        { name: "Chur", distance: "28km", desc: "Switzerlands oldest city, rail hub" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Ice skating", "Spa & wellness", "Winter hiking"],
      touristBoard: "Arosa Lenzerheide Tourism",
      touristBoardUrl: "https://www.arosalenzerheide.ch",
      emergency: "112",
      hospital: "Kantonsspital Graubunden Chur (28km)"
    },
    webcams: [
      { name: "Weisshorn 2653m", seed: "arosa-cam1" },
      { name: "Rothorn 2865m", seed: "arosa-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Arosa Lenzerheide World Cup", type: "Competition", desc: "FIS Alpine Ski World Cup super-G and downhill" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 67, child: 34, senior: 54, badge: null },
      { type: "3-day", adult: 184, child: 92, senior: 147, badge: null },
      { type: "6-day", adult: 344, child: 172, senior: 275, badge: "Best value" },
      { type: "Season", adult: 1560, child: 780, senior: 1248, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.8,
      breakdown: { pistes: 8.9, lifts: 8.8, apresSki: 8.5, value: 8.6, beginners: 9.0 },
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
    id: "andermatt-sedrun-disentis",
    name: "Andermatt-Sedrun-Disentis",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Uri / Graubunden, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.63, lng: 8.59,
    minAltitude: 1444, maxAltitude: 3000,
    verticalDrop: 1556,
    pisteKm: 180, runs: 56, lifts: 26,
    gondolas: 8, chairlifts: 13, dragLifts: 5,
    longestRun: 13,
    difficultyBlue: 30, difficultyRed: 47, difficultyBlack: 23,
    snowCannons: 65, snowCannonKm: 28,
    seasonStart: "2024-11-23", seasonEnd: "2025-04-27",
    openStatus: "Open", roadStatus: "open",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 70,
    seasonDates: "23 Nov 2024 - 27 Apr 2025",
    seasonPasses: ["magic-pass", "ikon-pass"],
    resortTypes: ["Alpine", "Freeride", "Luxury"],
    description: "One of the fastest-growing ski destinations in the Alps following major investment. The high-altitude Gemsstock at 2961m offers world-class challenging terrain and the connection with Sedrun and Disentis creates one of Switzerlands most impressive ski areas.",
    image: "https://picsum.photos/seed/andermatt/800/500",
    images: ["https://picsum.photos/seed/andermatt-1/1200/700", "https://picsum.photos/seed/andermatt-2/1200/700", "https://picsum.photos/seed/andermatt-3/1200/700"],
    weather: { temp: -8, snowDepth: 195, condition: "Sunny", forecast: [
      { day: "Today", high: -6, low: -12, condition: "clear" },
      { day: "Tomorrow", high: -7, low: -13, condition: "clear" },
      { day: "Thu", high: -9, low: -15, condition: "snow" }
    ]},
    snowDepthBase: 90, snowDepthMid: 160, snowDepthTop: 225, snowType: "Packed powder",
    liftsOpen: 23, liftsTotal: 26, pistesOpen: 50, pistesTotal: 56,
    ecoRating: 4, ecoRenewable: 82, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["82% renewable electricity", "Matterhorn Gotthard Bahn train access", "Green Globe certified resort"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "1h 30m" },
      { airport: "Geneva", iata: "GVA", driveTime: "3h" }
    ],
    trainStation: "Andermatt - 0.5km, Matterhorn Gotthard Bahn and Furka-Oberalp Bahn",
    shuttle: true, shuttleDesc: "Matterhorn Gotthard Bahn and Furka-Oberalp Bahn both serve Andermatt directly",
    parking: { capacity: 1500, pricePerDay: 14, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Gemsstock Summit Restaurant", zone: "2961m", cuisine: "Alpine Gourmet", price: "€€€" },
        { name: "Natschen Restaurant", zone: "2000m", cuisine: "Swiss", price: "€€" },
        { name: "The Japanese Restaurant", zone: "Chedi Andermatt", cuisine: "Japanese", price: "€€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 62, privateLessonFrom: 165,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 75,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 500, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 12, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Andermatt village",
      pharmacy: true, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Andermatt sits at the junction of the Gotthard, Furka and Oberalp passes at 1444m. The Chedi Andermatt luxury hotel and new resort development has transformed the village into one of the most talked-about destinations in Switzerland.",
      nearbyTowns: [
        { name: "Andermatt", distance: "0km", desc: "Historic pass village transformed by luxury investment" },
        { name: "Sedrun", distance: "25km", desc: "Traditional Graubunden village on the Oberalp" },
        { name: "Disentis", distance: "35km", desc: "Monastery village at the head of the Rhine" }
      ],
      activities: ["Snowshoeing", "Spa & wellness", "Winter hiking", "Freeride tours", "Cross-country skiing"],
      touristBoard: "Andermatt Swiss Alps Tourism",
      touristBoardUrl: "https://www.andermatt.ch",
      emergency: "112",
      hospital: "Kantonsspital Uri Altdorf (40km)"
    },
    webcams: [
      { name: "Gemsstock 2961m", seed: "andermatt-cam1" },
      { name: "Andermatt village", seed: "andermatt-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Andermatt Freeride Days", type: "Festival", desc: "High-altitude freeride celebration on the Gemsstock" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 70, child: 35, senior: 56, badge: null },
      { type: "3-day", adult: 193, child: 97, senior: 154, badge: null },
      { type: "6-day", adult: 360, child: 180, senior: 288, badge: "Best value" },
      { type: "Season", adult: 1630, child: 815, senior: 1304, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 9.0,
      breakdown: { pistes: 9.1, lifts: 9.0, apresSki: 8.8, value: 8.2, beginners: 8.5 },
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
    id: "villars-gryon-diablerets",
    name: "Villars-Gryon-Les Diablerets",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Vaud, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.30, lng: 7.06,
    minAltitude: 1253, maxAltitude: 2971,
    verticalDrop: 1718,
    pisteKm: 125, runs: 45, lifts: 33,
    gondolas: 10, chairlifts: 16, dragLifts: 7,
    longestRun: 10,
    difficultyBlue: 38, difficultyRed: 45, difficultyBlack: 17,
    snowCannons: 60, snowCannonKm: 30,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 58,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Glacier", "Family resort"],
    description: "Connects with the Glacier 3000 above Les Diablerets providing year-round skiing from the highest point in the Vaud Alps. Charming village with traditional Swiss atmosphere and a well-regarded international school community.",
    image: "https://picsum.photos/seed/villars/800/500",
    images: ["https://picsum.photos/seed/villars-1/1200/700", "https://picsum.photos/seed/villars-2/1200/700", "https://picsum.photos/seed/villars-3/1200/700"],
    weather: { temp: -4, snowDepth: 130, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 100, snowDepthTop: 155, snowType: "Packed powder",
    liftsOpen: 29, liftsTotal: 33, pistesOpen: 40, pistesTotal: 45,
    ecoRating: 3, ecoRenewable: 65, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["65% renewable electricity", "Glacier 3000 conservation program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "1h 30m" },
      { airport: "Lausanne", iata: "QLS", driveTime: "1h" }
    ],
    trainStation: "Aigle - 20km, bus or cogwheel railway from Bex",
    shuttle: false, shuttleDesc: "Bus from Aigle or cogwheel railway from Bex",
    parking: { capacity: 1800, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Glacier 3000 Peak Walk", zone: "2971m glacier", cuisine: "Alpine", price: "€€€" },
        { name: "Chalet Bretaye", zone: "1808m", cuisine: "Swiss", price: "€€" },
        { name: "Le Sporting", zone: "Villars village", cuisine: "French-Swiss", price: "€€€" }
      ],
      skiSchools: 2, groupLessonFrom: 50, privateLessonFrom: 130,
      languages: ["🇫🇷", "🇬🇧", "🇨🇭"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 62,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 600, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Villars village",
      pharmacy: true, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Villars-sur-Ollon sits on a sunny balcony terrace above the Rhone valley in the Vaud Alps. The nearby Glacier 3000 is reached by a spectacular cable car from Col du Pillon.",
      nearbyTowns: [
        { name: "Villars-sur-Ollon", distance: "0km", desc: "Charming Vaud resort village with international schools" },
        { name: "Gryon", distance: "4km", desc: "Quieter linked village" },
        { name: "Aigle", distance: "20km", desc: "Wine town at the foot of the resort" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Spa & wellness", "Winter hiking", "Glacier walks"],
      touristBoard: "Villars Tourism",
      touristBoardUrl: "https://www.villars.ch",
      emergency: "112",
      hospital: "Hopital Riviera-Chablais Aigle (20km)"
    },
    webcams: [
      { name: "Glacier 3000 2971m", seed: "villars-cam1" },
      { name: "Villars village", seed: "villars-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Villars Winter Polo", type: "Festival", desc: "Annual snow polo tournament in the village" }
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
      overall: 8.6,
      breakdown: { pistes: 8.6, lifts: 8.5, apresSki: 8.5, value: 8.8, beginners: 9.2 },
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
    id: "aletsch-arena",
    name: "Aletsch Arena",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Valais, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.39, lng: 8.07,
    minAltitude: 1950, maxAltitude: 2869,
    verticalDrop: 919,
    pisteKm: 104, runs: 37, lifts: 13,
    gondolas: 5, chairlifts: 6, dragLifts: 2,
    longestRun: 9,
    difficultyBlue: 38, difficultyRed: 46, difficultyBlack: 16,
    snowCannons: 40, snowCannonKm: 22,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 55,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Family resort"],
    description: "A car-free ski destination above the Great Aletsch Glacier, a UNESCO World Heritage site and the largest glacier in the Alps. The three car-free villages of Bettmeralp, Riederalp and Fiescheralp are accessible only by cable car from the valley.",
    image: "https://picsum.photos/seed/aletsch-arena/800/500",
    images: ["https://picsum.photos/seed/aletsch-1/1200/700", "https://picsum.photos/seed/aletsch-2/1200/700", "https://picsum.photos/seed/aletsch-3/1200/700"],
    weather: { temp: -6, snowDepth: 160, condition: "Sunny", forecast: [
      { day: "Today", high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "clear" },
      { day: "Thu", high: -7, low: -13, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 130, snowDepthTop: 180, snowType: "Packed powder",
    liftsOpen: 12, liftsTotal: 13, pistesOpen: 33, pistesTotal: 37,
    ecoRating: 4, ecoRenewable: 80, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["80% renewable electricity", "UNESCO Aletsch Glacier heritage protection", "Car-free plateau villages"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" },
      { airport: "Bern", iata: "BRN", driveTime: "2h" },
      { airport: "Zurich", iata: "ZRH", driveTime: "2h 30m" }
    ],
    trainStation: "Brig - 18km then bus to cable car valley stations",
    shuttle: false, shuttleDesc: "Bus from Brig to valley stations then cable cars to the plateau",
    parking: { capacity: 1500, pricePerDay: 12, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Bettmerhorn Restaurant", zone: "2869m", cuisine: "Swiss Alpine", price: "€€€" },
        { name: "Moosfluh Hutte", zone: "2333m", cuisine: "Alpine", price: "€€" },
        { name: "Bettmeralp Dorfrestaurant", zone: "Village", cuisine: "Swiss", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 48, privateLessonFrom: 125,
      languages: ["🇩🇪", "🇬🇧", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 58,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 450, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: true, medicalLocation: "Bettmeralp village",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "The Aletsch Arena plateau is one of the most extraordinary ski settings in the Alps, with panoramic views of the Great Aletsch Glacier stretching 23km below the ski area. The three villages are entirely car-free.",
      nearbyTowns: [
        { name: "Bettmeralp", distance: "0km", desc: "Car-free village above the Aletsch Glacier" },
        { name: "Riederalp", distance: "4km", desc: "Linked car-free village" },
        { name: "Brig", distance: "18km", desc: "Valais rail junction on the Simplon line" }
      ],
      activities: ["Snowshoeing", "Glacier walks", "Winter hiking", "Cross-country skiing", "Wildlife watching"],
      touristBoard: "Aletsch Arena Tourism",
      touristBoardUrl: "https://www.aletscharena.ch",
      emergency: "112",
      hospital: "Visp hospital (25km)"
    },
    webcams: [
      { name: "Bettmerhorn 2869m", seed: "aletsch-cam1" },
      { name: "Bettmeralp village", seed: "aletsch-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Aletsch Glacier Ski Touring Day", type: "Festival", desc: "Guided ski touring along the glacier edge" }
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
      overall: 8.7,
      breakdown: { pistes: 8.7, lifts: 8.6, apresSki: 8.2, value: 9.0, beginners: 9.1 },
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
    id: "engelberg-titlis",
    name: "Engelberg-Titlis",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Obwalden, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.82, lng: 8.41,
    minAltitude: 1050, maxAltitude: 3020,
    verticalDrop: 1970,
    pisteKm: 82, runs: 41, lifts: 26,
    gondolas: 9, chairlifts: 12, dragLifts: 5,
    longestRun: 12,
    difficultyBlue: 30, difficultyRed: 46, difficultyBlack: 24,
    snowCannons: 38, snowCannonKm: 16,
    seasonStart: "2024-11-23", seasonEnd: "2025-05-04",
    openStatus: "Open", roadStatus: "open",
    rating: 8.7, ratingLabel: "Excellent", priceFrom: 64,
    seasonDates: "23 Nov 2024 - 4 May 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Glacier", "Family resort"],
    description: "Home to the revolving Rotair gondola on the Klein Titlis at 3020m offering year-round glacier skiing. The valley monastery and traditional village add cultural depth to this well-rounded Central Swiss resort popular with international visitors.",
    image: "https://picsum.photos/seed/engelberg/800/500",
    images: ["https://picsum.photos/seed/engelberg-1/1200/700", "https://picsum.photos/seed/engelberg-2/1200/700", "https://picsum.photos/seed/engelberg-3/1200/700"],
    weather: { temp: -7, snowDepth: 175, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 80, snowDepthMid: 150, snowDepthTop: 220, snowType: "Packed powder",
    liftsOpen: 23, liftsTotal: 26, pistesOpen: 37, pistesTotal: 41,
    ecoRating: 3, ecoRenewable: 70, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["70% renewable electricity", "Titlis Glacier monitoring program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "1h 15m" },
      { airport: "Lucerne", iata: "ZRH", driveTime: "via Lucerne 50m" }
    ],
    trainStation: "Engelberg - 0.5km, direct trains from Lucerne",
    shuttle: true, shuttleDesc: "Direct trains from Lucerne to Engelberg run regularly throughout the day",
    parking: { capacity: 1800, pricePerDay: 13, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Titlis Rotair Restaurant", zone: "3020m rotating", cuisine: "International", price: "€€€" },
        { name: "Ice Flyer Restaurant", zone: "2438m", cuisine: "Alpine", price: "€€" },
        { name: "Brunni Hutte", zone: "1860m", cuisine: "Swiss", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 55, privateLessonFrom: 145,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪", "🇰🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 68,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 500, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Engelberg village",
      pharmacy: true, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Engelberg means Angel Mountain and was founded around its Benedictine monastery in 1120. The monastery still functions today and the village retains a unique spiritual and cultural atmosphere alongside world-class skiing.",
      nearbyTowns: [
        { name: "Engelberg", distance: "0km", desc: "Traditional monastery village beneath the Titlis" },
        { name: "Lucerne", distance: "40km", desc: "Central Swiss lakeside city" },
        { name: "Zurich", distance: "80km", desc: "Swiss financial and cultural capital" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Monastery visits", "Spa & wellness", "Glacier walks"],
      touristBoard: "Engelberg Tourism",
      touristBoardUrl: "https://www.engelberg.ch",
      emergency: "112",
      hospital: "Lucerne Cantonal Hospital (40km)"
    },
    webcams: [
      { name: "Klein Titlis 3020m", seed: "engelberg-cam1" },
      { name: "Engelberg village", seed: "engelberg-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Engelberg Freeski World Cup", type: "Competition", desc: "FIS Freestyle Ski World Cup halfpipe and slopestyle" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 64, child: 32, senior: 51, badge: null },
      { type: "3-day", adult: 176, child: 88, senior: 141, badge: null },
      { type: "6-day", adult: 329, child: 165, senior: 263, badge: "Best value" },
      { type: "Season", adult: 1490, child: 745, senior: 1192, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.7,
      breakdown: { pistes: 8.7, lifts: 9.0, apresSki: 8.4, value: 8.6, beginners: 8.8 },
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
    id: "grimentz-zinal",
    name: "Grimentz-Zinal",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Valais, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.18, lng: 7.57,
    minAltitude: 1570, maxAltitude: 2900,
    verticalDrop: 1330,
    pisteKm: 90, runs: 43, lifts: 19,
    gondolas: 6, chairlifts: 9, dragLifts: 4,
    longestRun: 11,
    difficultyBlue: 30, difficultyRed: 47, difficultyBlack: 23,
    snowCannons: 45, snowCannonKm: 20,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 52,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Freeride"],
    description: "One of the most authentic and unspoiled ski areas in Switzerland connecting two charming villages at high altitude with 90km of predominantly north-facing slopes ensuring outstanding snow quality in the Val d'Anniviers.",
    image: "https://picsum.photos/seed/grimentz-zinal/800/500",
    images: ["https://picsum.photos/seed/grimentz-1/1200/700", "https://picsum.photos/seed/grimentz-2/1200/700", "https://picsum.photos/seed/grimentz-3/1200/700"],
    weather: { temp: -7, snowDepth: 175, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 80, snowDepthMid: 145, snowDepthTop: 200, snowType: "Powder",
    liftsOpen: 17, liftsTotal: 19, pistesOpen: 38, pistesTotal: 43,
    ecoRating: 3, ecoRenewable: 62, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["62% renewable electricity", "Val d'Anniviers valley heritage preservation"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h 30m" },
      { airport: "Sion", iata: "SIR", driveTime: "1h" }
    ],
    trainStation: "Sierre - 22km bus into the Val d'Anniviers",
    shuttle: false, shuttleDesc: "Bus from Sierre into the Val d'Anniviers",
    parking: { capacity: 800, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Bendolla Restaurant", zone: "2220m", cuisine: "Swiss Alpine", price: "€€" },
        { name: "Sorebois Restaurant", zone: "2438m Zinal", cuisine: "Alpine", price: "€€" },
        { name: "Grimentz Village Restaurant", zone: "Village", cuisine: "Valaisan", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 45, privateLessonFrom: 115,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 350, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: false, medicalLocation: "Sierre (22km)",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Grimentz is one of the best-preserved medieval villages in the Valais, with traditional mazot granaries and wine cellars. The Val d'Anniviers is considered one of the most beautiful valleys in Switzerland.",
      nearbyTowns: [
        { name: "Grimentz", distance: "0km", desc: "Beautifully preserved medieval Valais village" },
        { name: "Zinal", distance: "12km", desc: "Mountaineering base village at head of valley" },
        { name: "Sierre", distance: "22km", desc: "Bilingual Rhone valley town" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Freeride tours", "Ice climbing"],
      touristBoard: "Val d'Anniviers Tourism",
      touristBoardUrl: "https://www.valdanniviers.ch",
      emergency: "112",
      hospital: "Sierre hospital (22km)"
    },
    webcams: [
      { name: "Bendolla 2220m", seed: "grimentz-cam1" },
      { name: "Sorebois 2438m", seed: "grimentz-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Sierre-Zinal Winter Edition", type: "Competition", desc: "Winter trail race following the famous summer route" }
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
      breakdown: { pistes: 8.8, lifts: 8.5, apresSki: 8.0, value: 9.2, beginners: 8.5 },
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
    id: "flumserberg",
    name: "Flumserberg",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "St. Gallen, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 47.11, lng: 9.24,
    minAltitude: 1400, maxAltitude: 2222,
    verticalDrop: 822,
    pisteKm: 65, runs: 27, lifts: 14,
    gondolas: 4, chairlifts: 7, dragLifts: 3,
    longestRun: 8,
    difficultyBlue: 34, difficultyRed: 44, difficultyBlack: 22,
    snowCannons: 55, snowCannonKm: 26,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 48,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Family resort"],
    description: "Above Lake Walen in St. Gallen canton with 65km of well-groomed slopes and impressive views over the Rhine valley and the Austrian Alps. Family-friendly with excellent snowmaking and convenient access from Zurich and eastern Switzerland.",
    image: "https://picsum.photos/seed/flumserberg/800/500",
    images: ["https://picsum.photos/seed/flumserberg-1/1200/700", "https://picsum.photos/seed/flumserberg-2/1200/700", "https://picsum.photos/seed/flumserberg-3/1200/700"],
    weather: { temp: -4, snowDepth: 125, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 60, snowDepthMid: 100, snowDepthTop: 140, snowType: "Machine-groomed",
    liftsOpen: 12, liftsTotal: 14, pistesOpen: 24, pistesTotal: 27,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Walensee lake watershed protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "1h" },
      { airport: "St. Gallen", iata: "ACH", driveTime: "45m" }
    ],
    trainStation: "Flums - 8km bus",
    shuttle: false, shuttleDesc: "Bus from Flums station",
    parking: { capacity: 1500, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Prodalp Restaurant", zone: "2222m", cuisine: "Swiss Alpine", price: "€€" },
        { name: "Maschg Berghutte", zone: "1900m", cuisine: "Alpine", price: "€€" },
        { name: "Flumserberg Sonnenterrasse", zone: "1620m", cuisine: "Swiss", price: "€" }
      ],
      skiSchools: 1, groupLessonFrom: 42, privateLessonFrom: 110,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 350, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Head"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: true, medicalLocation: "Flums village (8km)",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Flumserberg rises above the Walensee, one of the most dramatic lakes in Switzerland. The views from the upper slopes extend across the Rhine valley to the Liechtenstein Alps and Vorarlberg.",
      nearbyTowns: [
        { name: "Flums", distance: "8km", desc: "Small St. Gallen town on the Walensee" },
        { name: "Bad Ragaz", distance: "20km", desc: "Famous thermal spa town on the Rhine" },
        { name: "Sargans", distance: "18km", desc: "Rhine valley town with castle" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Tobogganing", "Ice skating"],
      touristBoard: "Flumserberg Tourism",
      touristBoardUrl: "https://www.flumserberg.ch",
      emergency: "112",
      hospital: "Kantonsspital Graubunden (30km)"
    },
    webcams: [
      { name: "Prodalp 2222m", seed: "flumserberg-cam1" },
      { name: "Flumserberg base", seed: "flumserberg-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Flumserberg Families on Snow", type: "Festival", desc: "Family ski carnival weekend" }
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
      overall: 8.3,
      breakdown: { pistes: 8.4, lifts: 8.3, apresSki: 8.0, value: 9.2, beginners: 9.3 },
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
    id: "leukerbad",
    name: "Leukerbad",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Valais, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.38, lng: 7.63,
    minAltitude: 1411, maxAltitude: 2350,
    verticalDrop: 939,
    pisteKm: 60, runs: 22, lifts: 8,
    gondolas: 3, chairlifts: 4, dragLifts: 1,
    longestRun: 8,
    difficultyBlue: 34, difficultyRed: 45, difficultyBlack: 21,
    snowCannons: 35, snowCannonKm: 18,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 48,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Wellness", "Family resort"],
    description: "Europes largest alpine spa resort combining 60km of skiing on the Torrenthorn with world-famous thermal baths. The unique combination of skiing and bathing in the same afternoon with views of the Bernese Alps makes it one of the most distinctive destinations in Switzerland.",
    image: "https://picsum.photos/seed/leukerbad/800/500",
    images: ["https://picsum.photos/seed/leukerbad-1/1200/700", "https://picsum.photos/seed/leukerbad-2/1200/700", "https://picsum.photos/seed/leukerbad-3/1200/700"],
    weather: { temp: -4, snowDepth: 135, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "partly_cloudy" }
    ]},
    snowDepthBase: 60, snowDepthMid: 105, snowDepthTop: 150, snowType: "Packed powder",
    liftsOpen: 7, liftsTotal: 8, pistesOpen: 19, pistesTotal: 22,
    ecoRating: 4, ecoRenewable: 68, ecoCertifications: ["ISO 14001", "Green Globe"],
    ecoInitiatives: ["68% renewable electricity", "Geothermal thermal bath energy reuse", "Green Globe certified"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Geneva", iata: "GVA", driveTime: "2h" },
      { airport: "Sion", iata: "SIR", driveTime: "50m" },
      { airport: "Bern", iata: "BRN", driveTime: "2h" }
    ],
    trainStation: "Leuk - 18km post bus",
    shuttle: false, shuttleDesc: "Post bus from Leuk station",
    parking: { capacity: 1000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Torrenthorn Restaurant", zone: "2998m", cuisine: "Swiss Alpine", price: "€€€" },
        { name: "Gemmi Restaurant", zone: "2350m", cuisine: "Alpine", price: "€€" },
        { name: "Burgerbad Spa Restaurant", zone: "Village", cuisine: "International", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 42, privateLessonFrom: 110,
      languages: ["🇫🇷", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 300, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: true, medicalLocation: "Leukerbad village",
      pharmacy: true, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Leukerbad is at the head of the Dala gorge in the Valais Alps with dramatic cliff scenery. The 65 thermal springs produce 3.9 million litres of water daily at temperatures up to 51 degrees Celsius.",
      nearbyTowns: [
        { name: "Leukerbad", distance: "0km", desc: "Europes largest alpine thermal spa village" },
        { name: "Leuk", distance: "18km", desc: "Rhone valley village with train station" },
        { name: "Visp", distance: "30km", desc: "Valais railway hub" }
      ],
      activities: ["Thermal baths", "Spa & wellness", "Snowshoeing", "Winter hiking", "Gemmi pass walks"],
      touristBoard: "Leukerbad Tourism",
      touristBoardUrl: "https://www.leukerbad.ch",
      emergency: "112",
      hospital: "Visp hospital (30km)"
    },
    webcams: [
      { name: "Torrenthorn 2350m", seed: "leukerbad-cam1" },
      { name: "Leukerbad village", seed: "leukerbad-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Leukerbad Thermal Festival", type: "Festival", desc: "Outdoor thermal bathing under the winter stars" }
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
      overall: 8.3,
      breakdown: { pistes: 8.2, lifts: 8.3, apresSki: 9.2, value: 8.8, beginners: 9.0 },
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
    id: "scuol",
    name: "Scuol-Motta Naluns",
    countries: ["Switzerland"],
    countryCode: "CH",
    region: "Graubunden, Switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    lat: 46.80, lng: 10.30,
    minAltitude: 1250, maxAltitude: 2783,
    verticalDrop: 1533,
    pisteKm: 80, runs: 38, lifts: 13,
    gondolas: 4, chairlifts: 7, dragLifts: 2,
    longestRun: 10,
    difficultyBlue: 32, difficultyRed: 45, difficultyBlack: 23,
    snowCannons: 42, snowCannonKm: 22,
    seasonStart: "2024-12-14", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 49,
    seasonDates: "14 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["magic-pass"],
    resortTypes: ["Alpine", "Wellness", "Family resort"],
    description: "In the Lower Engadin valley with 80km of skiing above a charming spa town famous for its mineral springs and Romansh cultural atmosphere. The ski area connects across from the historic Old Town of Scuol.",
    image: "https://picsum.photos/seed/scuol/800/500",
    images: ["https://picsum.photos/seed/scuol-1/1200/700", "https://picsum.photos/seed/scuol-2/1200/700", "https://picsum.photos/seed/scuol-3/1200/700"],
    weather: { temp: -6, snowDepth: 150, condition: "Clear", forecast: [
      { day: "Today", high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "partly_cloudy" },
      { day: "Thu", high: -7, low: -13, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 120, snowDepthTop: 170, snowType: "Packed powder",
    liftsOpen: 11, liftsTotal: 13, pistesOpen: 34, pistesTotal: 38,
    ecoRating: 3, ecoRenewable: 60, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["60% renewable electricity", "Lower Engadin nature park stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Zurich", iata: "ZRH", driveTime: "2h 30m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h" }
    ],
    trainStation: "Scuol-Tarasp - 1km, Rhaetian Railway Engadin service",
    shuttle: true, shuttleDesc: "Rhaetian Railway Engadin service connects Pontresina and St. Moritz to Scuol",
    parking: { capacity: 1000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Motta Naluns Restaurant", zone: "2146m", cuisine: "Romansh Alpine", price: "€€" },
        { name: "Chamanna Naluns", zone: "2300m", cuisine: "Alpine", price: "€€" },
        { name: "Hotel Engiadina Restaurant", zone: "Scuol village", cuisine: "Swiss", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 42, privateLessonFrom: 108,
      languages: ["🇨🇭", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 280, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: true, medicalLocation: "Scuol village",
      pharmacy: true, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Scuol is the main town of the Lower Engadin, a region where Romansh is still spoken as a daily language. The mineral springs have attracted visitors since the 16th century and the Bogn Engiadina spa is one of the finest in Switzerland.",
      nearbyTowns: [
        { name: "Scuol", distance: "0km", desc: "Historic Romansh spa town with mineral springs" },
        { name: "Sent", distance: "5km", desc: "Traditional Engadin village" },
        { name: "Martina", distance: "10km", desc: "Border village with Austria on the Inn river" }
      ],
      activities: ["Thermal spa", "Snowshoeing", "Cross-country skiing", "Winter hiking", "Romansh cultural tours"],
      touristBoard: "Scuol Tourism",
      touristBoardUrl: "https://www.scuol.ch",
      emergency: "112",
      hospital: "Spital Scuol (2km)"
    },
    webcams: [
      { name: "Motta Naluns 2146m", seed: "scuol-cam1" },
      { name: "Scuol Old Town", seed: "scuol-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Engadin Skimarathon Qualifier", type: "Competition", desc: "Cross-country qualifier for the Engadin Skimarathon" }
    ],
    promotions: [],
    liftPasses: [
      { type: "1-day", adult: 49, child: 25, senior: 39, badge: null },
      { type: "3-day", adult: 135, child: 68, senior: 108, badge: null },
      { type: "6-day", adult: 252, child: 126, senior: 202, badge: "Best value" },
      { type: "Season", adult: 1140, child: 570, senior: 912, badge: null }
    ],
    instructors: [],
    reviews: {
      overall: 8.3,
      breakdown: { pistes: 8.4, lifts: 8.2, apresSki: 8.5, value: 9.1, beginners: 8.8 },
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