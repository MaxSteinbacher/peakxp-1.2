export const italianResorts3 = [
  {
    id: "folgarida-marilleva",
    name: "Folgarida-Marilleva",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Trentino, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.28, lng: 10.88,
    minAltitude: 986, maxAltitude: 2180,
    verticalDrop: 1194,
    pisteKm: 100, runs: 35, lifts: 20,
    gondolas: 6, chairlifts: 11, dragLifts: 3,
    longestRun: 10,
    difficultyBlue: 32, difficultyRed: 45, difficultyBlack: 23,
    snowCannons: 200, snowCannonKm: 72,
    seasonStart: "2024-11-30", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 8.5, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "30 Nov 2024 - 20 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Family resort"],
    description: "A purpose-built ski area in the Val di Sole directly connected with Madonna di Campiglio in the Skirama Dolomiti circuit. Exceptional modern lift infrastructure and pedestrian-free design with direct access to 150km of connected skiing.",
    image: "https://picsum.photos/seed/folgarida-marilleva/800/500",
    images: ["https://picsum.photos/seed/folgarida-1/1200/700", "https://picsum.photos/seed/folgarida-2/1200/700", "https://picsum.photos/seed/folgarida-3/1200/700"],
    weather: { temp: -5, snowDepth: 150, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 70, snowDepthMid: 125, snowDepthTop: 180, snowType: "Packed powder",
    liftsOpen: 18, liftsTotal: 20, pistesOpen: 31, pistesTotal: 35,
    ecoRating: 3, ecoRenewable: 60, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["60% renewable electricity", "Ferrovia Trento-Male railway access promotion"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Verona", iata: "VRN", driveTime: "1h 45m" },
      { airport: "Milan Bergamo", iata: "BGY", driveTime: "2h 30m" },
      { airport: "Trento", iata: "TRN", driveTime: "1h" }
    ],
    trainStation: "Male (Trento-Male railway) - 8km bus",
    shuttle: true, shuttleDesc: "Ferrovia Trento-Male narrow gauge railway connects Trento to Male",
    parking: { capacity: 2000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Daolasa Bergrestaurant", zone: "1840m", cuisine: "Trentino Alpine", price: "€€" },
        { name: "Marilleva Rifugio", zone: "1400m", cuisine: "Italian", price: "€€" },
        { name: "Val di Sole Trattoria", zone: "Village", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 44, privateLessonFrom: 115,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 54,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 500, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 8, bootDryers: true,
      rentalShops: 6, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Male town (8km)",
      pharmacy: false, atm: true, atmCount: 3
    },
    surroundings: {
      description: "The Val di Sole is famous for whitewater rafting in summer and is one of the sunniest valleys in Trentino. Folgarida and Marilleva were purpose-built in the 1970s and connected by modern lift infrastructure.",
      nearbyTowns: [
        { name: "Male", distance: "8km", desc: "Val di Sole market town on the Trento railway" },
        { name: "Madonna di Campiglio", distance: "25km via ski area", desc: "Connected luxury Trentino resort" },
        { name: "Trento", distance: "60km", desc: "Trentino regional capital" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "Winter hiking", "Spa & wellness"],
      touristBoard: "Val di Sole Tourism",
      touristBoardUrl: "https://www.valdisole.net",
      emergency: "112",
      hospital: "Ospedale di Cles (20km)"
    },
    webcams: [
      { name: "Daolasa 1840m", seed: "folgarida-cam1" },
      { name: "Marilleva base", seed: "folgarida-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Val di Sole Biathlon World Cup", type: "Competition", desc: "IBU Biathlon World Cup in the Val di Sole" }
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
      breakdown: { pistes: 8.5, lifts: 8.7, apresSki: 8.2, value: 9.1, beginners: 9.0 },
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
    id: "pila",
    name: "Pila",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Valle d'Aosta, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 45.75, lng: 7.31,
    minAltitude: 1800, maxAltitude: 2700,
    verticalDrop: 900,
    pisteKm: 70, runs: 35, lifts: 13,
    gondolas: 4, chairlifts: 7, dragLifts: 2,
    longestRun: 9,
    difficultyBlue: 30, difficultyRed: 47, difficultyBlack: 23,
    snowCannons: 80, snowCannonKm: 34,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.3, ratingLabel: "Excellent", priceFrom: 44,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "Overlooks the Valle d'Aosta from 1800m accessed by a modern gondola directly from the city of Aosta. Panoramic views of Mont Blanc, the Matterhorn and Monte Rosa and one of the best value ski areas in the Aosta valley.",
    image: "https://picsum.photos/seed/pila/800/500",
    images: ["https://picsum.photos/seed/pila-1/1200/700", "https://picsum.photos/seed/pila-2/1200/700", "https://picsum.photos/seed/pila-3/1200/700"],
    weather: { temp: -5, snowDepth: 145, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 165, snowType: "Packed powder",
    liftsOpen: 11, liftsTotal: 13, pistesOpen: 31, pistesTotal: 35,
    ecoRating: 3, ecoRenewable: 62, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["62% renewable electricity", "Aosta city gondola reducing car access"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Turin", iata: "TRN", driveTime: "1h 45m" },
      { airport: "Geneva", iata: "GVA", driveTime: "2h" },
      { airport: "Milan Malpensa", iata: "MXP", driveTime: "2h 30m" }
    ],
    trainStation: "Aosta - 2km then gondola",
    shuttle: true, shuttleDesc: "Direct trains from Turin and Milan stop at Aosta",
    parking: { capacity: 1500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Couis 2 Restaurant", zone: "2555m", cuisine: "Valdostan", price: "€€" },
        { name: "Pila Village Rifugio", zone: "1800m", cuisine: "Italian Alpine", price: "€€" },
        { name: "Chamole Trattoria", zone: "Mid-mountain", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 38, privateLessonFrom: 96,
      languages: ["🇮🇹", "🇬🇧", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 46,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 380, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Aosta (2km + gondola)",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Pila is remarkable for being directly accessible by gondola from the centre of Aosta, an ancient Roman city with well-preserved triumphal arch and theatre. The combination of city amenities and mountain skiing is unique in the Alps.",
      nearbyTowns: [
        { name: "Aosta", distance: "2km + gondola", desc: "Roman city with triumphal arch and amphitheatre" },
        { name: "Cogne", distance: "25km", desc: "Gran Paradiso national park village" },
        { name: "Courmayeur", distance: "40km", desc: "Mont Blanc luxury resort" }
      ],
      activities: ["Aosta Roman monuments", "Snowshoeing", "Cross-country skiing", "Winter hiking"],
      touristBoard: "Pila Tourism",
      touristBoardUrl: "https://www.pila.it",
      emergency: "112",
      hospital: "Ospedale di Aosta (2km)"
    },
    webcams: [
      { name: "Couis 2555m", seed: "pila-cam1" },
      { name: "Pila base 1800m", seed: "pila-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Pila Aosta Valley Cup", type: "Competition", desc: "Regional ski racing event" }
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
      breakdown: { pistes: 8.3, lifts: 8.4, apresSki: 8.2, value: 9.3, beginners: 9.1 },
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
    id: "civetta",
    name: "Civetta-Alleghe",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Veneto, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.41, lng: 12.05,
    minAltitude: 1000, maxAltitude: 2370,
    verticalDrop: 1370,
    pisteKm: 80, runs: 36, lifts: 18,
    gondolas: 5, chairlifts: 10, dragLifts: 3,
    longestRun: 11,
    difficultyBlue: 30, difficultyRed: 47, difficultyBlack: 23,
    snowCannons: 180, snowCannonKm: 58,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.6, ratingLabel: "Excellent", priceFrom: 50,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Freeride"],
    description: "80km of skiing beneath the giant west face of Monte Civetta one of the most dramatic walls in the Alps. Part of the Dolomiti Superski network above the beautiful Alleghe lake with connecting access to the Selva di Cadore area.",
    image: "https://picsum.photos/seed/civetta/800/500",
    images: ["https://picsum.photos/seed/civetta-1/1200/700", "https://picsum.photos/seed/civetta-2/1200/700", "https://picsum.photos/seed/civetta-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Sunny", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "clear" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 165, snowType: "Packed powder",
    liftsOpen: 16, liftsTotal: 18, pistesOpen: 32, pistesTotal: 36,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Alleghe lake ecosystem protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Venice Marco Polo", iata: "VCE", driveTime: "2h" },
      { airport: "Treviso", iata: "TSF", driveTime: "2h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h 30m" }
    ],
    trainStation: "Belluno - 35km bus",
    shuttle: false, shuttleDesc: "Bus from Belluno",
    parking: { capacity: 1500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Coldai", zone: "2132m", cuisine: "Venetian Alpine", price: "€€" },
        { name: "Rifugio Tissi", zone: "2262m", cuisine: "Alpine", price: "€€" },
        { name: "Alleghe Lakeside Trattoria", zone: "Lakeside", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 44, privateLessonFrom: 112,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 52,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 380, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: false, medicalLocation: "Alleghe village (base)",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Alleghe sits on the shore of its glacial lake which was formed by a catastrophic landslide from the Civetta in 1771. The combination of lake, village and towering rock face makes it one of the most photogenic settings in the Dolomites.",
      nearbyTowns: [
        { name: "Alleghe", distance: "0km", desc: "Lakeside village beneath the Civetta wall" },
        { name: "Caprile", distance: "3km", desc: "Valley junction village" },
        { name: "Arabba", distance: "15km", desc: "High-altitude Sella Ronda village" }
      ],
      activities: ["Snowshoeing", "Lake walks", "Cross-country skiing", "Winter photography"],
      touristBoard: "Civetta Dolomiti Tourism",
      touristBoardUrl: "https://www.civetta.it",
      emergency: "112",
      hospital: "Ospedale di Belluno (35km)"
    },
    webcams: [
      { name: "Piani di Pezzè 2000m", seed: "civetta-cam1" },
      { name: "Alleghe lake view", seed: "civetta-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Civetta Ski Festival", type: "Festival", desc: "Annual ski and mountain culture weekend" }
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
      breakdown: { pistes: 8.7, lifts: 8.5, apresSki: 8.3, value: 9.2, beginners: 8.8 },
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
    id: "andalo",
    name: "Andalo-Paganella",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Trentino, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.16, lng: 11.01,
    minAltitude: 1042, maxAltitude: 2125,
    verticalDrop: 1083,
    pisteKm: 50, runs: 26, lifts: 13,
    gondolas: 4, chairlifts: 7, dragLifts: 2,
    longestRun: 8,
    difficultyBlue: 36, difficultyRed: 46, difficultyBlack: 18,
    snowCannons: 130, snowCannonKm: 38,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.2, ratingLabel: "Excellent", priceFrom: 44,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "Predominantly beginner and intermediate skiing above Lake Molveno and the Brenta Dolomites. Excellent snowmaking covering 90 percent of terrain with guaranteed conditions popular with families from the Trento and Verona regions.",
    image: "https://picsum.photos/seed/andalo/800/500",
    images: ["https://picsum.photos/seed/andalo-1/1200/700", "https://picsum.photos/seed/andalo-2/1200/700", "https://picsum.photos/seed/andalo-3/1200/700"],
    weather: { temp: -3, snowDepth: 120, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 55, snowDepthMid: 95, snowDepthTop: 140, snowType: "Machine-groomed",
    liftsOpen: 11, liftsTotal: 13, pistesOpen: 23, pistesTotal: 26,
    ecoRating: 3, ecoRenewable: 58, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["58% renewable electricity", "Lake Molveno watershed protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Verona", iata: "VRN", driveTime: "1h 30m" },
      { airport: "Trento", iata: "TRN", driveTime: "45m" },
      { airport: "Milan Bergamo", iata: "BGY", driveTime: "2h" }
    ],
    trainStation: "Trento - 35km bus",
    shuttle: false, shuttleDesc: "Bus from Trento",
    parking: { capacity: 1500, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Paganella Summit Restaurant", zone: "2125m", cuisine: "Trentino", price: "€€" },
        { name: "Andalo Village Ristorante", zone: "Village", cuisine: "Italian", price: "€€" },
        { name: "Molveno Lakeside", zone: "Lake 860m", cuisine: "Italian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 38, privateLessonFrom: 96,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 46,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 300, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 4, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: true, medicalLocation: "Andalo village",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Andalo sits on the Altopiano della Paganella above Lake Molveno with stunning views of the Brenta Dolomites group. The lake is one of the most beautiful in Trentino and accessible on foot from the ski area.",
      nearbyTowns: [
        { name: "Andalo", distance: "0km", desc: "Family resort on the Paganella plateau" },
        { name: "Molveno", distance: "5km", desc: "Village on the beautiful Molveno lake" },
        { name: "Trento", distance: "35km", desc: "Trentino regional capital" }
      ],
      activities: ["Snowshoeing", "Winter hiking", "Lake Molveno walks", "Cross-country skiing"],
      touristBoard: "Andalo Tourism",
      touristBoardUrl: "https://www.andalo.it",
      emergency: "112",
      hospital: "Ospedale di Cles (20km)"
    },
    webcams: [
      { name: "Paganella summit 2125m", seed: "andalo-cam1" },
      { name: "Andalo village", seed: "andalo-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Andalo Family Week", type: "Festival", desc: "Family ski week with activities and entertainment" }
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
      overall: 8.2,
      breakdown: { pistes: 8.2, lifts: 8.2, apresSki: 8.0, value: 9.3, beginners: 9.5 },
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
    id: "folgaria",
    name: "Folgaria-Lavarone",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Trentino, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 45.92, lng: 11.17,
    minAltitude: 1116, maxAltitude: 1800,
    verticalDrop: 684,
    pisteKm: 80, runs: 36, lifts: 22,
    gondolas: 5, chairlifts: 12, dragLifts: 5,
    longestRun: 7,
    difficultyBlue: 38, difficultyRed: 44, difficultyBlack: 18,
    snowCannons: 160, snowCannonKm: 55,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.1, ratingLabel: "Excellent", priceFrom: 42,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Family resort"],
    description: "One of the largest ski areas in Trentino south of the main Dolomites range with 80km of family-friendly skiing above the Asiago plateau. Outstanding snowmaking and proximity to Verona and Vicenza make it excellent value for northern Italy.",
    image: "https://picsum.photos/seed/folgaria/800/500",
    images: ["https://picsum.photos/seed/folgaria-1/1200/700", "https://picsum.photos/seed/folgaria-2/1200/700", "https://picsum.photos/seed/folgaria-3/1200/700"],
    weather: { temp: -3, snowDepth: 110, condition: "Clear", forecast: [
      { day: "Today", high: -1, low: -7, condition: "clear" },
      { day: "Tomorrow", high: -2, low: -8, condition: "partly_cloudy" },
      { day: "Thu", high: -4, low: -10, condition: "snow" }
    ]},
    snowDepthBase: 50, snowDepthMid: 85, snowDepthTop: 125, snowType: "Machine-groomed",
    liftsOpen: 20, liftsTotal: 22, pistesOpen: 32, pistesTotal: 36,
    ecoRating: 3, ecoRenewable: 55, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["55% renewable electricity", "Lavarone plateau nature reserve stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Verona", iata: "VRN", driveTime: "1h" },
      { airport: "Vicenza", iata: "VIC", driveTime: "1h" },
      { airport: "Trento", iata: "TRN", driveTime: "40m" }
    ],
    trainStation: "Trento - 28km bus",
    shuttle: false, shuttleDesc: "Bus from Trento",
    parking: { capacity: 2000, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Costa Restaurant", zone: "1720m", cuisine: "Trentino", price: "€€" },
        { name: "Folgaria Village Ristorante", zone: "Village", cuisine: "Italian", price: "€" },
        { name: "Lavarone Rifugio", zone: "1184m plateau", cuisine: "Italian", price: "€" }
      ],
      skiSchools: 2, groupLessonFrom: 36, privateLessonFrom: 90,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 44,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 380, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 6, bootDryers: true,
      rentalShops: 5, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: true,
      medicalCentre: true, medicalLocation: "Folgaria village",
      pharmacy: false, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Folgaria and Lavarone are on a high plateau south of Trento, historically fortified during the First World War with numerous forts and trenches now accessible as heritage sites.",
      nearbyTowns: [
        { name: "Folgaria", distance: "0km", desc: "Main plateau resort village" },
        { name: "Lavarone", distance: "8km", desc: "Linked plateau village with First World War fort" },
        { name: "Rovereto", distance: "20km", desc: "Trento province city with MART museum" }
      ],
      activities: ["Snowshoeing", "Cross-country skiing", "First World War fort visits", "Winter hiking"],
      touristBoard: "Folgaria Tourism",
      touristBoardUrl: "https://www.folgaria.net",
      emergency: "112",
      hospital: "Ospedale di Rovereto (20km)"
    },
    webcams: [
      { name: "Costa 1720m", seed: "folgaria-cam1" },
      { name: "Folgaria village", seed: "folgaria-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Folgaria Snow Festival", type: "Festival", desc: "Family snow carnival and slalom race" }
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
      overall: 8.1,
      breakdown: { pistes: 8.1, lifts: 8.0, apresSki: 7.9, value: 9.5, beginners: 9.5 },
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
    id: "madesimo",
    name: "Madesimo",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Lombardy, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.44, lng: 9.35,
    minAltitude: 1550, maxAltitude: 2948,
    verticalDrop: 1398,
    pisteKm: 50, runs: 20, lifts: 9,
    gondolas: 3, chairlifts: 5, dragLifts: 1,
    longestRun: 10,
    difficultyBlue: 26, difficultyRed: 44, difficultyBlack: 30,
    snowCannons: 60, snowCannonKm: 24,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Freeride"],
    description: "Near the Swiss border offering 50km of varied skiing from 2948m with some of the best off-piste terrain in Lombardy. The Canalone run is one of the most challenging marked pistes in Italy popular with skiers from Milan and Como.",
    image: "https://picsum.photos/seed/madesimo/800/500",
    images: ["https://picsum.photos/seed/madesimo-1/1200/700", "https://picsum.photos/seed/madesimo-2/1200/700", "https://picsum.photos/seed/madesimo-3/1200/700"],
    weather: { temp: -7, snowDepth: 175, condition: "Sunny", forecast: [
      { day: "Today", high: -5, low: -11, condition: "clear" },
      { day: "Tomorrow", high: -6, low: -12, condition: "clear" },
      { day: "Thu", high: -8, low: -14, condition: "snow" }
    ]},
    snowDepthBase: 80, snowDepthMid: 145, snowDepthTop: 215, snowType: "Packed powder",
    liftsOpen: 8, liftsTotal: 9, pistesOpen: 18, pistesTotal: 20,
    ecoRating: 3, ecoRenewable: 48, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["48% renewable electricity", "Swiss border natural landscape protection"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Milan Malpensa", iata: "MXP", driveTime: "2h" },
      { airport: "Milan Bergamo", iata: "BGY", driveTime: "2h 30m" },
      { airport: "Zurich", iata: "ZRH", driveTime: "2h" }
    ],
    trainStation: "Chiavenna - 30km bus",
    shuttle: false, shuttleDesc: "Bus from Chiavenna",
    parking: { capacity: 1000, pricePerDay: 10, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Rifugio Motta", zone: "2250m", cuisine: "Lombard Alpine", price: "€€" },
        { name: "Madesimo Village Trattoria", zone: "Village", cuisine: "Italian", price: "€€" },
        { name: "Canalone Hutte", zone: "2700m", cuisine: "Alpine", price: "€€€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 102,
      languages: ["🇮🇹", "🇬🇧"],
      creche: true, crecheAgeMin: 4, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "4-12", babysitting: false,
      lockerCount: 280, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 3, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Chiavenna (30km)",
      pharmacy: false, atm: true, atmCount: 2
    },
    surroundings: {
      description: "Madesimo is in the Valchiavenna, a deep Alpine valley that drains south to Lake Como. The Spluga pass at the head of the valley crosses into Switzerland and was historically an important trade route.",
      nearbyTowns: [
        { name: "Madesimo", distance: "0km", desc: "Remote Lombard resort at the head of the valley" },
        { name: "Campodolcino", distance: "5km", desc: "Valley village below the resort" },
        { name: "Chiavenna", distance: "30km", desc: "Valchiavenna main town near Lake Como" }
      ],
      activities: ["Snowshoeing", "Freeride tours", "Spluga pass tours", "Winter hiking"],
      touristBoard: "Madesimo Tourism",
      touristBoardUrl: "https://www.madesimo.eu",
      emergency: "112",
      hospital: "Ospedale di Chiavenna (30km)"
    },
    webcams: [
      { name: "Motta 2250m", seed: "madesimo-cam1" },
      { name: "Madesimo village", seed: "madesimo-cam2" }
    ],
    events: [
      { date: "Feb 2025", name: "Canalone Challenge", type: "Competition", desc: "Annual race on the legendary Canalone piste" }
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
      breakdown: { pistes: 8.5, lifts: 8.3, apresSki: 8.2, value: 9.1, beginners: 8.2 },
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
    id: "sauze-doulx",
    name: "Sauze d'Oulx",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Piedmont, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 45.03, lng: 6.86,
    minAltitude: 1509, maxAltitude: 2823,
    verticalDrop: 1314,
    pisteKm: 140, runs: 40, lifts: 17,
    gondolas: 5, chairlifts: 9, dragLifts: 3,
    longestRun: 11,
    difficultyBlue: 30, difficultyRed: 48, difficultyBlack: 22,
    snowCannons: 120, snowCannonKm: 56,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-06",
    openStatus: "Open", roadStatus: "open",
    rating: 8.2, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "7 Dec 2024 - 6 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Apres-ski"],
    description: "Traditionally popular with British skiers in the Via Lattea ski area for its extensive terrain, reliable snow and vibrant apres-ski. The Via Lattea connection provides access to 400km of skiing across the border into France.",
    image: "https://picsum.photos/seed/sauze-doulx/800/500",
    images: ["https://picsum.photos/seed/sauze-1/1200/700", "https://picsum.photos/seed/sauze-2/1200/700", "https://picsum.photos/seed/sauze-3/1200/700"],
    weather: { temp: -4, snowDepth: 140, condition: "Clear", forecast: [
      { day: "Today", high: -2, low: -8, condition: "clear" },
      { day: "Tomorrow", high: -3, low: -9, condition: "partly_cloudy" },
      { day: "Thu", high: -5, low: -11, condition: "snow" }
    ]},
    snowDepthBase: 65, snowDepthMid: 115, snowDepthTop: 165, snowType: "Packed powder",
    liftsOpen: 15, liftsTotal: 17, pistesOpen: 35, pistesTotal: 40,
    ecoRating: 3, ecoRenewable: 48, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["48% renewable electricity", "Via Lattea cross-border environmental coordination"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Turin", iata: "TRN", driveTime: "1h 30m" },
      { airport: "Lyon", iata: "LYS", driveTime: "2h 30m" },
      { airport: "Geneva", iata: "GVA", driveTime: "3h" }
    ],
    trainStation: "Oulx - 8km bus",
    shuttle: false, shuttleDesc: "Direct Frecciabianca trains from Turin stop at Oulx",
    parking: { capacity: 2000, pricePerDay: 9, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Clos Peyron Restaurant", zone: "2316m", cuisine: "Italian Alpine", price: "€€" },
        { name: "Il Capricorno", zone: "Village", cuisine: "Italian Gourmet", price: "€€€" },
        { name: "Rio Nero Alpe", zone: "1850m", cuisine: "Piedmontese", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 102,
      languages: ["🇮🇹", "🇬🇧", "🇫🇷"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 48,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: false,
      lockerCount: 480, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Sauze village",
      pharmacy: false, atm: true, atmCount: 3
    },
    surroundings: {
      description: "Sauze d'Oulx became internationally known as a budget ski destination in the 1980s, popular with British package holiday skiers. The resort has matured considerably while retaining its lively apres-ski tradition.",
      nearbyTowns: [
        { name: "Sauze d'Oulx", distance: "0km", desc: "Lively Via Lattea resort with British heritage" },
        { name: "Oulx", distance: "8km", desc: "Piedmont valley town with high-speed train" },
        { name: "Sestriere", distance: "15km via ski area", desc: "Olympic resort at the Via Lattea heart" }
      ],
      activities: ["Snowshoeing", "Ice skating", "Via Lattea ski touring", "Apres-ski"],
      touristBoard: "Sauze d'Oulx Tourism",
      touristBoardUrl: "https://www.sauzedoulx.it",
      emergency: "112",
      hospital: "Ospedale di Susa (25km)"
    },
    webcams: [
      { name: "Clotes 2316m", seed: "sauze-cam1" },
      { name: "Sauze village", seed: "sauze-cam2" }
    ],
    events: [
      { date: "Jan 2025", name: "Sauze Ski Week", type: "Festival", desc: "Annual British ski week with competitions and entertainment" }
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
      overall: 8.2,
      breakdown: { pistes: 8.2, lifts: 8.1, apresSki: 9.0, value: 9.2, beginners: 8.8 },
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
    id: "selva-val-gardena",
    name: "Selva Val Gardena",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Alto Adige, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.56, lng: 11.76,
    minAltitude: 1563, maxAltitude: 2518,
    verticalDrop: 955,
    pisteKm: 82, runs: 42, lifts: 35,
    gondolas: 9, chairlifts: 18, dragLifts: 8,
    longestRun: 10,
    difficultyBlue: 26, difficultyRed: 48, difficultyBlack: 26,
    snowCannons: 180, snowCannonKm: 62,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-13",
    openStatus: "Open", roadStatus: "open",
    rating: 9.1, ratingLabel: "Exceptional", priceFrom: 56,
    seasonDates: "7 Dec 2024 - 13 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Freeride"],
    description: "The main village of the Gardena valley and best positioned for the Sella Ronda circuit with direct access to all four passes of the famous ski tour. The Ciampinoi gondola provides rapid access to the World Cup Saslong downhill course.",
    image: "https://picsum.photos/seed/selva-val-gardena/800/500",
    images: ["https://picsum.photos/seed/selva-1/1200/700", "https://picsum.photos/seed/selva-2/1200/700", "https://picsum.photos/seed/selva-3/1200/700"],
    weather: { temp: -5, snowDepth: 155, condition: "Sunny", forecast: [
      { day: "Today", high: -3, low: -9, condition: "clear" },
      { day: "Tomorrow", high: -4, low: -10, condition: "clear" },
      { day: "Thu", high: -6, low: -12, condition: "snow" }
    ]},
    snowDepthBase: 72, snowDepthMid: 132, snowDepthTop: 192, snowType: "Packed powder",
    liftsOpen: 31, liftsTotal: 35, pistesOpen: 38, pistesTotal: 42,
    ecoRating: 3, ecoRenewable: 70, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["70% renewable electricity", "Sella Ronda circuit sustainable tourism"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Bolzano", iata: "BZO", driveTime: "50m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "1h 30m" },
      { airport: "Verona", iata: "VRN", driveTime: "2h 30m" }
    ],
    trainStation: "Chiusa/Klausen - 22km bus",
    shuttle: false, shuttleDesc: "Bus from Chiusa/Klausen",
    parking: { capacity: 2500, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Ciampinoi Restaurant", zone: "2254m", cuisine: "Ladin", price: "€€€" },
        { name: "Rifugio Saslong", zone: "2100m", cuisine: "South Tyrolean", price: "€€" },
        { name: "Selva Village Stuberl", zone: "Village", cuisine: "Ladin Italian", price: "€€" }
      ],
      skiSchools: 2, groupLessonFrom: 48, privateLessonFrom: 128,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 58,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 600, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 9, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Selva village",
      pharmacy: true, atm: true, atmCount: 5
    },
    surroundings: {
      description: "Selva di Val Gardena is the largest and most touristic of the three Gardena villages. Its position at the head of the valley makes it the best base for the Sella Ronda circuit with all four passes directly accessible.",
      nearbyTowns: [
        { name: "Selva di Val Gardena", distance: "0km", desc: "Main Gardena village, Sella Ronda hub" },
        { name: "Santa Cristina", distance: "3km", desc: "Central Gardena village" },
        { name: "Ortisei", distance: "8km", desc: "Lower Gardena valley town" }
      ],
      activities: ["Sella Ronda circuit", "Snowshoeing", "Ladin culture tours", "Cross-country skiing"],
      touristBoard: "Val Gardena Tourism",
      touristBoardUrl: "https://www.valgardena.it",
      emergency: "112",
      hospital: "Ospedale di Bolzano (50km)"
    },
    webcams: [
      { name: "Ciampinoi 2254m", seed: "selva-cam1" },
      { name: "Selva village", seed: "selva-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Val Gardena World Cup Selva", type: "Competition", desc: "FIS World Cup downhill and super-G on the Saslong" }
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
      breakdown: { pistes: 9.2, lifts: 9.1, apresSki: 8.9, value: 8.8, beginners: 8.7 },
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
    id: "corvara",
    name: "Corvara",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Alto Adige, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.55, lng: 11.87,
    minAltitude: 1568, maxAltitude: 2550,
    verticalDrop: 982,
    pisteKm: 55, runs: 30, lifts: 20,
    gondolas: 5, chairlifts: 11, dragLifts: 4,
    longestRun: 9,
    difficultyBlue: 28, difficultyRed: 48, difficultyBlack: 24,
    snowCannons: 130, snowCannonKm: 44,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 9.0, ratingLabel: "Exceptional", priceFrom: 55,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: ["dolomiti-superski"],
    resortTypes: ["Alpine", "Luxury", "Gourmet"],
    description: "The chic central village of Alta Badia perfectly positioned for the Sella Ronda circuit and the Gran Risa World Cup slalom. Excellent hotel infrastructure and the best Ladin gastronomy in the Dolomites.",
    image: "https://picsum.photos/seed/corvara/800/500",
    images: ["https://picsum.photos/seed/corvara-1/1200/700", "https://picsum.photos/seed/corvara-2/1200/700", "https://picsum.photos/seed/corvara-3/1200/700"],
    weather: { temp: -6, snowDepth: 160, condition: "Sunny", forecast: [
      { day: "Today", high: -4, low: -10, condition: "clear" },
      { day: "Tomorrow", high: -5, low: -11, condition: "clear" },
      { day: "Thu", high: -7, low: -13, condition: "snow" }
    ]},
    snowDepthBase: 75, snowDepthMid: 140, snowDepthTop: 200, snowType: "Packed powder",
    liftsOpen: 18, liftsTotal: 20, pistesOpen: 27, pistesTotal: 30,
    ecoRating: 3, ecoRenewable: 65, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["65% renewable electricity", "Alta Badia Ladin food heritage program"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Bolzano", iata: "BZO", driveTime: "1h" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h" },
      { airport: "Venice Marco Polo", iata: "VCE", driveTime: "2h 30m" }
    ],
    trainStation: "Brunico/Bruneck - 28km bus",
    shuttle: false, shuttleDesc: "Bus from Brunico/Bruneck",
    parking: { capacity: 1800, pricePerDay: 11, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "La Stua de Michil", zone: "Village - Michelin star", cuisine: "Ladin Gourmet", price: "€€€€" },
        { name: "Rifugio Col Alto", zone: "2150m", cuisine: "Ladin", price: "€€€" },
        { name: "Pescosta Ristorante", zone: "Village", cuisine: "Ladin Italian", price: "€€€" }
      ],
      skiSchools: 1, groupLessonFrom: 46, privateLessonFrom: 125,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: true, crecheAgeMin: 3, crecheAgeMax: 6, crecheFrom: 56,
      kidsGarden: true, kidsGardenAge: "3-12", babysitting: true,
      lockerCount: 480, lockerSizes: ["S", "M", "L", "XL"],
      skiStorage: true, skiStorageFrom: 9, bootDryers: true,
      rentalShops: 7, rentalBrands: ["Atomic", "Rossignol", "Salomon", "Head"],
      skiTuning: true, clothingShop: true, supermarket: true,
      medicalCentre: true, medicalLocation: "Corvara village",
      pharmacy: false, atm: true, atmCount: 4
    },
    surroundings: {
      description: "Corvara is the main village of Alta Badia and one of the few remaining Ladin-speaking communities in the Dolomites. The village is known for its Michelin-starred restaurants and world-class hotel infrastructure.",
      nearbyTowns: [
        { name: "Corvara", distance: "0km", desc: "Chic Alta Badia village, Ladin capital" },
        { name: "La Villa", distance: "4km", desc: "Alta Badia linked village" },
        { name: "San Cassiano", distance: "5km", desc: "Quiet upper valley village" }
      ],
      activities: ["Sella Ronda circuit", "Snowshoeing", "Ladin gastronomy tours", "Spa & wellness"],
      touristBoard: "Alta Badia Tourism",
      touristBoardUrl: "https://www.altabadia.org",
      emergency: "112",
      hospital: "Ospedale di Brunico (28km)"
    },
    webcams: [
      { name: "Col Alto 2150m", seed: "corvara-cam1" },
      { name: "Corvara village", seed: "corvara-cam2" }
    ],
    events: [
      { date: "Dec 2024", name: "Alta Badia Gran Risa World Cup", type: "Competition", desc: "FIS Ski World Cup giant slalom on Gran Risa" }
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
      overall: 9.0,
      breakdown: { pistes: 9.1, lifts: 9.0, apresSki: 9.4, value: 8.5, beginners: 8.6 },
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
    id: "solda",
    name: "Solda-Sulden",
    countries: ["Italy"],
    countryCode: "IT",
    region: "Alto Adige, Italy",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.52, lng: 10.58,
    minAltitude: 1900, maxAltitude: 3250,
    verticalDrop: 1350,
    pisteKm: 40, runs: 18, lifts: 9,
    gondolas: 3, chairlifts: 5, dragLifts: 1,
    longestRun: 10,
    difficultyBlue: 26, difficultyRed: 46, difficultyBlack: 28,
    snowCannons: 45, snowCannonKm: 20,
    seasonStart: "2024-12-07", seasonEnd: "2025-04-20",
    openStatus: "Open", roadStatus: "open",
    rating: 8.4, ratingLabel: "Excellent", priceFrom: 46,
    seasonDates: "7 Dec 2024 - 20 Apr 2025",
    seasonPasses: [],
    resortTypes: ["Alpine", "Freeride"],
    description: "A remote high-altitude resort in the Ortler Alps rising to 3250m on the shoulder of the Ortler, Italys highest peak outside the Mont Blanc massif. Uncrowded and scenically spectacular popular with those seeking altitude and solitude.",
    image: "https://picsum.photos/seed/solda/800/500",
    images: ["https://picsum.photos/seed/solda-1/1200/700", "https://picsum.photos/seed/solda-2/1200/700", "https://picsum.photos/seed/solda-3/1200/700"],
    weather: { temp: -10, snowDepth: 220, condition: "Sunny", forecast: [
      { day: "Today", high: -8, low: -15, condition: "clear" },
      { day: "Tomorrow", high: -9, low: -16, condition: "clear" },
      { day: "Thu", high: -11, low: -18, condition: "snow" }
    ]},
    snowDepthBase: 100, snowDepthMid: 175, snowDepthTop: 265, snowType: "Powder",
    liftsOpen: 8, liftsTotal: 9, pistesOpen: 16, pistesTotal: 18,
    ecoRating: 3, ecoRenewable: 42, ecoCertifications: ["ISO 14001"],
    ecoInitiatives: ["42% renewable electricity", "Stelvio National Park conservation stewardship"],
    ecoOffsetProgram: false,
    airports: [
      { airport: "Bolzano", iata: "BZO", driveTime: "1h 30m" },
      { airport: "Innsbruck", iata: "INN", driveTime: "2h" },
      { airport: "Milan Bergamo", iata: "BGY", driveTime: "3h" }
    ],
    trainStation: "Spondigna - 20km bus",
    shuttle: false, shuttleDesc: "Bus from Spondigna",
    parking: { capacity: 600, pricePerDay: 8, includedInPass: false },
    facilities: {
      restaurants: [
        { name: "Grenzstation Restaurant", zone: "3250m", cuisine: "South Tyrolean", price: "€€€" },
        { name: "Rifugio Spiood", zone: "2850m", cuisine: "Alpine", price: "€€" },
        { name: "Solda Village Gasthaus", zone: "Village", cuisine: "South Tyrolean", price: "€€" }
      ],
      skiSchools: 1, groupLessonFrom: 40, privateLessonFrom: 102,
      languages: ["🇮🇹", "🇬🇧", "🇩🇪"],
      creche: false, crecheAgeMin: 0, crecheAgeMax: 0, crecheFrom: 0,
      kidsGarden: false, kidsGardenAge: "", babysitting: false,
      lockerCount: 180, lockerSizes: ["S", "M", "L"],
      skiStorage: true, skiStorageFrom: 7, bootDryers: true,
      rentalShops: 2, rentalBrands: ["Atomic", "Rossignol"],
      skiTuning: true, clothingShop: false, supermarket: false,
      medicalCentre: false, medicalLocation: "Silandro (25km)",
      pharmacy: false, atm: false, atmCount: 0
    },
    surroundings: {
      description: "Solda is a deep mountain village at the end of the Suldental in the Stelvio National Park. The Ortler peak at 3905m is the highest mountain entirely within Italy and dominates the skyline above the resort.",
      nearbyTowns: [
        { name: "Solda", distance: "0km", desc: "Remote Ortler Alps village" },
        { name: "Silandro", distance: "25km", desc: "Venosta valley market town" },
        { name: "Bormio", distance: "40km via Stelvio Pass", desc: "Lombard resort town" }
      ],
      activities: ["Freeride tours", "Snowshoeing", "Ortler mountaineering tours", "Stelvio National Park wildlife"],
      touristBoard: "Solda Tourism",
      touristBoardUrl: "https://www.sulden.com",
      emergency: "112",
      hospital: "Ospedale di Silandro (25km)"
    },
    webcams: [
      { name: "Ortler 3250m", seed: "solda-cam1" },
      { name: "Solda village 1900m", seed: "solda-cam2" }
    ],
    events: [
      { date: "Mar 2025", name: "Solda Ortler Skitour", type: "Competition", desc: "Ski touring race on the Ortler flanks" }
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
      breakdown: { pistes: 8.5, lifts: 8.3, apresSki: 7.8, value: 9.2, beginners: 7.5 },
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
  }
];