/**
 * Copy for the landing page (/), reused by the other pages so the studio speaks with one voice.
 * Studio copy for a mostly-commercial (hotels, workplaces) interior design practice that also takes on residences.
 * Project fields (titles, photos, locations, counts) are read from PROJECTS at runtime.
 */

export const LAB_HERO = {
  eyebrow: 'Interior Design Studio',
  title: ['Interiors shaped around people,'],
  sub: 'for hotels, workplaces and private homes.',
  image: '/projects/spd-hotel/01.jpg',
};

export const LAB_COMPOSITION = {
  caption: 'Commercial & Residential',
  title: ['Space with', 'a purpose.'],
  left: 'Every interior starts with the people who will use it — the guest checking in late, the team at their desks all day, the family at home. We plan around those routines first, then choose the materials, light and detail that make them easier.',
  right: 'Most of our work is commercial: hotels, corporate headquarters and research facilities. We bring the same care to private residences.',
  /** [project key, gallery index] for the five drifting photos, in layout order A–E. */
  photos: [
    ['west-lake-state-guesthouse', 1],
    ['kinrara-hotel', 0],
    ['ecovacs-phase-vi-office', 2],
    ['simcere-rd-centre', 5],
    ['mengfa-hot-spring-hotel', 6],
  ],
};

export const LAB_SLIDER = {
  keys: [
    'west-lake-state-guesthouse',
    'whale-cloud-global-headquarters',
    'kinrara-hotel',
    'ecovacs-phase-vi-office',
    'mengfa-hot-spring-hotel',
  ],
};

export const LAB_DELIVERY = {
  lead: 'We take an interior from the first brief to the final walkthrough, keeping design intent, budget and programme aligned at every stage.',
  caption: 'How We Work',
  title: ['From first brief', 'to final handover.'],
  rows: [
    {
      title: 'Brief & Planning',
      body: 'We study how the space will run — occupancy, circulation, operations — and turn it into a clear layout before any finishes are chosen.',
      image: '/projects/ecovacs-phase-vi-office/01-sm.jpg',
    },
    {
      title: 'Concept & Materials',
      body: 'A considered palette of durable materials, tested against heavy daily use in hotels and offices and the slower rhythm of a home.',
      image: '/projects/simcere-rd-centre/06-sm.jpg',
    },
    {
      title: 'Detail & Documentation',
      body: 'Joinery, lighting and furniture are drawn to the millimetre, so contractors build exactly what was designed.',
      image: '/projects/whale-cloud-global-headquarters/01-sm.jpg',
    },
    {
      title: 'Delivery',
      body: 'We stay on through construction and installation, reviewing samples and site work until the space is ready to open.',
      image: '/projects/hengli-group-headquarters/01-sm.jpg',
    },
  ],
};

export const LAB_APPROACH = {
  caption: 'Our Approach',
  lines: [
    'Plan for the people.',
    'Build with lasting materials.',
    'Light for every hour.',
  ],
  panels: [
    {
      title: 'People',
      body: 'Layouts follow real routines: how guests arrive, how teams meet and focus, how a family lives day to day.',
      images: ['/projects/hengli-group-headquarters/01-sm.jpg'],
    },
    {
      title: 'Material',
      body: 'Stone, timber and metal chosen to wear well, so a lobby or workplace still looks right years after opening.',
      images: [
        '/projects/kinrara-hotel/01-sm.jpg',
        '/projects/spd-hotel/02-sm.jpg',
        '/projects/everbright-environment/01-sm.jpg',
        '/projects/rugao-new-century-grand-hotel/04-sm.jpg',
        '/projects/new-england-biotechnology/03-sm.jpg',
      ],
    },
    {
      title: 'Light',
      body: 'Daylight and artificial light are planned together, so each space works from morning meetings to evening service.',
      images: ['/projects/simcere-rd-centre/01-sm.jpg'],
    },
  ],
};

export const LAB_STATS = {
  caption: 'Archive',
  title: 'Portfolio.',
  body: [
    'Hotels, headquarters and research centres across China and Malaysia.',
    'Each one designed around the people who use it every day.',
  ],
  images: [
    '/projects/west-lake-state-guesthouse/01-sm.jpg',
    '/projects/kinrara-hotel/03-sm.jpg',
    '/projects/whale-cloud-global-headquarters/02-sm.jpg',
    '/projects/mengfa-hot-spring-hotel/02-sm.jpg',
  ],
};

export const LAB_MARQUEE = {
  caption: 'Selected Works',
  title: 'Hotels & workplaces.',
};

export const LAB_CARDS = {
  caption: 'Portfolio',
  title: 'Office interiors.',
  count: 4,
};

export const LAB_QUOTE = {
  quote: '"A good interior is one people stop noticing — because everything simply works."',
  name: 'II Design',
  role: 'Interior Design Studio',
  body: 'Planning a hotel, workplace or home? Tell us about the site, the brief and the timeline.',
  image: '/projects/spd-hotel/06-sm.jpg',
};

export const LAB_INDEX = {
  caption: 'Archive',
  title: 'Every project, by name.',
  initial: 4,
};

export const LAB_STUDIO = {
  email: 'info@iidesign.cloud',
  copyright: `© ${new Date().getFullYear()} II Design. All rights reserved.`,
  tagline: 'Interior Design — Residential / Commercial',
};

export const LAB_FOOTER = {
  caption: 'New Projects',
  title: ['Let’s design', 'your next space.'],
  body: 'Hotels, workplaces and residences — we’d like to hear about yours.',
};

export const LAB_NAV = [
  { to: '/', label: 'Home' },
  { to: '/archive', label: 'Archive' },
  { to: '/philosophy', label: 'Philosophy' },
  { to: '/contact', label: 'Contact' },
];
