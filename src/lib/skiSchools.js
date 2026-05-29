/**
 * Verified partner ski school profiles.
 * Each school can be linked to one or more resort IDs via `resortIds`.
 */
export const SKI_SCHOOLS = [
  {
    id: "skischule-reith",
    name: "Skischule Reith bei Kitzbühel",
    tagline: "Die blaue Schule — Ski · Verleih · Service",
    location: "Reith bei Kitzbühel, Tyrol, Austria",
    address: "Kirchweg 7, 6370 Reith bei Kitzbühel",
    phone: "+43 5356 654 96",
    email: "office@skischule-reith.at",
    website: "https://www.skischule-reith.at",
    // Resorts this school serves (Reith is directly adjacent to Kitzbühel,
    // also serves St. Johann area and Fieberbrunn via Kitzbühel ski region)
    resortIds: ["kitzbuehel", "fieberbrunn"],
    instructorCount: 150,
    languages: ["🇦🇹 German", "🇬🇧 English"],
    disciplines: ["Skiing", "Snowboard", "Cross-country / Langlauf", "Freeride"],
    rating: 4.9,
    reviews: 320,
    verified: true,
    // PeakXP partner badge
    partner: true,
    heroImage: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/b42c7285d_DJI_0133.jpg",
    images: [
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/b42c7285d_DJI_0133.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/1c15db4b4_Skischule_Winter.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/dcfbe1064_AS-PHOTO-231203-1199-web2048px72dpi.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/76878d1fe_AS-PHOTO-231203-1511-web2048px72dpi.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/b6701dd84_AY5I5181.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/609167fed_AY5I5493.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f2af1a8fa_GruppenfotoLogoneu.jpg",
    ],
    description: "Skischule Reith bei Kitzbühel — die blaue Schule — has been sharing the joy of skiing in one of the world's most celebrated ski regions for generations. Up to 150 fully qualified ski, snowboard and cross-country instructors are ready to guide guests of all ages and abilities across the slopes of the legendary Kitzbühel ski area. The school's own Reither Skiwiese — with a 1,000m² Kinderland, 4 conveyor belt lifts, a 100m bob run and free ski lift — is the perfect, safe, car-free environment to take first turns on snow. For advanced skiers and freeriders, the instructors explore the full extent of the Kitzbühel ski region, repeatedly voted the world's best. Director Josef Dagn (state-certified ski instructor, mountain and ski guide, cross-country instructor) and his son Andreas lead a passionate team delivering the highest standard of instruction.",
    highlights: [
      "1,000m² Kinderland with free ski lift and 4 conveyor lifts",
      "100m bob run on the Reither Skiwiese",
      "Free parking at the school base",
      "Rennschule (race school) — training on the Hahnenkamm course",
      "Freeride private lessons with specialist guides",
      "Snowboard, cross-country and ski touring private instruction",
      "Bambini Club from age 2 (with advance booking)",
      "Equipment rental and ski service on-site",
      "Perfect ski bus connections to Kitzbühel",
    ],
    offerings: [
      {
        category: "Kinderland & Bambini",
        items: [
          { name: "Bambini Club (age 2–4) — half day", priceFrom: 50, unit: "per child" },
          { name: "Bambini Club (age 2–4) — full day", priceFrom: 85, unit: "per child" },
          { name: "Group lesson (age 3) — half day", priceFrom: 40, unit: "per child" },
        ],
      },
      {
        category: "Group Courses",
        items: [
          { name: "Group — half day (ski meadow)", priceFrom: 60, unit: "per person" },
          { name: "Group — 1 day", priceFrom: 90, unit: "per person" },
          { name: "Group — 3 days", priceFrom: 240, unit: "per person" },
          { name: "Group — 5 days", priceFrom: 345, unit: "per person" },
          { name: "Group — 6 days", priceFrom: 390, unit: "per person" },
        ],
      },
      {
        category: "Private Lessons (Ski, Snowboard, Cross-country)",
        items: [
          { name: "Private — 2 hours (off-peak)", priceFrom: 220, unit: "per lesson" },
          { name: "Private — 2 hours (peak)", priceFrom: 230, unit: "per lesson" },
          { name: "Private — 1 day 4h (off-peak)", priceFrom: 310, unit: "per day" },
          { name: "Private — 1 day 4h (peak)", priceFrom: 340, unit: "per day" },
          { name: "Private — 6 days 4h/day (off-peak)", priceFrom: 1800, unit: "total" },
          { name: "Private — 6 days 4h/day (peak)", priceFrom: 1920, unit: "total" },
          { name: "Additional person per day", priceFrom: 30, unit: "per person" },
        ],
      },
      {
        category: "Freeride Private",
        items: [
          { name: "Freeride — 1 day", priceFrom: 450, unit: "per lesson" },
          { name: "Freeride — 3 days", priceFrom: 1350, unit: "total" },
          { name: "Freeride — 6 days", priceFrom: 2700, unit: "total" },
          { name: "Additional person per day", priceFrom: 30, unit: "per person" },
        ],
      },
    ],
    // Summary for ski school tab
    groupLessonFrom: 60,
    privateLessonFrom: 220,
    freeridefrom: 450,
    kidsGroupFrom: 40,
    rentalAvailable: true,
    serviceAvailable: true,
    // Peak / off-peak note
    priceNote: "Peak season: 20 Dec – 11 Jan & 31 Jan – 8 Mar. Off-peak: all other dates. Group prices are per person for groups of 5–8.",
    cancellationPolicy: "Free cancellation up to 48 hours before lesson start.",
    director: {
      name: "Josef Dagn",
      role: "Director & Head Instructor",
      qualifications: ["State-certified ski instructor", "State-certified mountain & ski guide", "Cross-country instructor"],
    },
  },
];

export function getSkiSchoolsByResortId(resortId) {
  return SKI_SCHOOLS.filter(s => s.resortIds.includes(resortId));
}