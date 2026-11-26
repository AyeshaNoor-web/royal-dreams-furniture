// Generated from the client's project photos and videos. Edit text freely; media paths are stable.

export interface GalleryImage {
  src: string;
  w: number;
  h: number;
  alt: string;
  /** Sub-type within the category, e.g. "l-shape" or "kids-bed" */
  type?: string;
  /** Photos and videos of the same project share a set id; the lightbox shows them together. */
  set?: string;
}

export interface GalleryVideo {
  src: string;
  poster: string;
  w: number;
  h: number;
  duration: number;
  alt: string;
  set?: string;
}

export interface CategoryType {
  slug: string;
  title: string;
}

export type GroupSlug = "living" | "bedroom" | "dining" | "windows";

export interface Category {
  slug: string;
  title: string;
  eyebrow: string;
  short: string;
  description: string;
  size: "wide" | "narrow";
  group: GroupSlug;
  cover: GalleryImage;
  images: GalleryImage[];
  types?: CategoryType[];
  videos: GalleryVideo[];
}

export const groups: { slug: GroupSlug; title: string; blurb: string }[] = [
  { slug: "living", title: "Living Room", blurb: "Sofas, coffee tables, media walls, paneling and shelving." },
  { slug: "bedroom", title: "Bedroom", blurb: "Beds, walk-in closets, fitted wardrobes and dressing tables." },
  { slug: "dining", title: "Dining", blurb: "Marble and stone dining tables with matching chairs." },
  { slug: "windows", title: "Windows", blurb: "Curtains, sheers and blackout layers fitted on site." },
];

export const categories: Category[] = [
  {
    "slug": "sofas",
    "title": "Sofas & Majlis",
    "eyebrow": "Living Room",
    "short": "L-shaped sofas, sofa beds, custom curved sofas and majlis seating.",
    "description": "Sofas made to the size of your room and the way you sit in it. L-shaped and U-shaped sectionals, sofa beds with pull-out bases, curved custom sofas in boucle or velvet, and full majlis sets with long low seating. Fabric, foam density and seat depth are all chosen with you.",
    "size": "wide",
    "group": "living",
    "cover": {
      "src": "/images/sofas/sofas-01.jpg",
      "w": 960,
      "h": 1280,
      "alt": "Cream U-shaped sectional with marble coffee table",
      "type": "l-shape"
    },
    "images": [
      {
        "src": "/images/sofas/sofas-01.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Cream U-shaped sectional with marble coffee table",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-02.jpg",
        "w": 1060,
        "h": 1400,
        "alt": "Modular sofa with curved armchair and city view",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-03.jpg",
        "w": 1120,
        "h": 1400,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-04.jpg",
        "w": 960,
        "h": 1280,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-05.jpg",
        "w": 1280,
        "h": 960,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-06.jpg",
        "w": 1280,
        "h": 960,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-07.jpg",
        "w": 1290,
        "h": 1279,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-08.jpg",
        "w": 1290,
        "h": 1279,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-09.jpg",
        "w": 1280,
        "h": 960,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-10.jpg",
        "w": 1280,
        "h": 960,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-11.jpg",
        "w": 960,
        "h": 1280,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-12.jpg",
        "w": 1024,
        "h": 1280,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-13.jpg",
        "w": 1080,
        "h": 808,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-14.jpg",
        "w": 1059,
        "h": 1400,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-15.jpg",
        "w": 720,
        "h": 1280,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-16.jpg",
        "w": 960,
        "h": 1280,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-17.jpg",
        "w": 1280,
        "h": 960,
        "alt": "L-shaped sofa in soft upholstery, made to the room",
        "type": "l-shape"
      },
      {
        "src": "/images/sofas/sofas-18.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Cream sofa bed with round travertine table",
        "type": "sofa-bed"
      },
      {
        "src": "/images/sofas/sofas-19.jpg",
        "w": 1024,
        "h": 1280,
        "alt": "Sofa bed opened out into a double bed",
        "type": "sofa-bed"
      },
      {
        "src": "/images/sofas/sofas-20.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Sofa bed with pull-out base and fitted cushions",
        "type": "sofa-bed"
      },
      {
        "src": "/images/sofas/sofas-21.jpg",
        "w": 1055,
        "h": 1400,
        "alt": "Sofa bed with pull-out base and fitted cushions",
        "type": "sofa-bed"
      },
      {
        "src": "/images/sofas/sofas-22.jpg",
        "w": 1057,
        "h": 1400,
        "alt": "Sofa bed with pull-out base and fitted cushions",
        "type": "sofa-bed"
      },
      {
        "src": "/images/sofas/sofas-23.jpg",
        "w": 1289,
        "h": 1378,
        "alt": "Curved beige sofa in a gallery setting",
        "type": "custom"
      },
      {
        "src": "/images/sofas/sofas-24.jpg",
        "w": 1137,
        "h": 1400,
        "alt": "Custom curved sofa in boucle fabric",
        "type": "custom"
      },
      {
        "src": "/images/sofas/sofas-25.jpg",
        "w": 1050,
        "h": 1400,
        "alt": "Custom curved sofa in boucle fabric",
        "type": "custom"
      },
      {
        "src": "/images/sofas/sofas-26.jpg",
        "w": 1400,
        "h": 1050,
        "alt": "Custom curved sofa in boucle fabric",
        "type": "custom"
      },
      {
        "src": "/images/sofas/sofas-27.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Curved grey sofa with pouf and armchair",
        "type": "custom"
      },
      {
        "src": "/images/sofas/sofas-28.jpg",
        "w": 1079,
        "h": 796,
        "alt": "Custom curved sofa in boucle fabric",
        "type": "custom"
      },
      {
        "src": "/images/sofas/sofas-29.jpg",
        "w": 1060,
        "h": 1400,
        "alt": "Custom curved sofa in boucle fabric",
        "type": "custom"
      },
      {
        "src": "/images/sofas/sofas-30.jpg",
        "w": 1080,
        "h": 1225,
        "alt": "Majlis with brown sofas and nested coffee tables",
        "type": "majlis"
      },
      {
        "src": "/images/sofas/sofas-31.jpg",
        "w": 1080,
        "h": 1159,
        "alt": "Majlis seating set with long low sofas and cushions",
        "type": "majlis"
      },
      {
        "src": "/images/sofas/sofas-32.jpg",
        "w": 1027,
        "h": 1280,
        "alt": "Majlis seating set with long low sofas and cushions",
        "type": "majlis"
      },
      {
        "src": "/images/sofas/sofas-33.jpg",
        "w": 1027,
        "h": 1280,
        "alt": "Majlis seating set with long low sofas and cushions",
        "type": "majlis"
      },
      {
        "src": "/images/sofas/sofas-34.jpg",
        "w": 1290,
        "h": 1283,
        "alt": "Large white majlis with green cushions",
        "type": "majlis"
      },
      {
        "src": "/images/sofas/sofas-35.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Majlis seating set with long low sofas and cushions",
        "type": "majlis"
      },
      {
        "src": "/images/sofas/sofas-36.jpg",
        "w": 1290,
        "h": 724,
        "alt": "Classic carved majlis set on a traditional rug",
        "type": "majlis"
      },
      {
        "src": "/images/sofas/sofas-37.jpg",
        "w": 1290,
        "h": 949,
        "alt": "Majlis seating set with long low sofas and cushions",
        "type": "majlis"
      },
      {
        "src": "/images/sofas/sofas-38.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Traditional floor majlis in blue",
        "type": "majlis"
      }
    ],
    "types": [
      {
        "slug": "l-shape",
        "title": "L-shaped sofas"
      },
      {
        "slug": "sofa-bed",
        "title": "Sofa beds"
      },
      {
        "slug": "custom",
        "title": "Custom sofas"
      },
      {
        "slug": "majlis",
        "title": "Majlis"
      }
    ],
    "videos": [
      {
        "src": "/video/sofas/sofas-01.mp4",
        "poster": "/video/sofas/sofas-01.jpg",
        "w": 576,
        "h": 1024,
        "duration": 11,
        "alt": "L-shaped sofa with cushions"
      },
      {
        "src": "/video/sofas/sofas-02.mp4",
        "poster": "/video/sofas/sofas-02.jpg",
        "w": 576,
        "h": 1024,
        "duration": 7,
        "alt": "Beige L-shaped sofa"
      },
      {
        "src": "/video/sofas/sofas-03.mp4",
        "poster": "/video/sofas/sofas-03.jpg",
        "w": 576,
        "h": 1024,
        "duration": 9,
        "alt": "Brown L-shaped sofa"
      },
      {
        "src": "/video/sofas/sofas-04.mp4",
        "poster": "/video/sofas/sofas-04.jpg",
        "w": 848,
        "h": 480,
        "duration": 21,
        "alt": "Classic majlis sofa with tufted back"
      }
    ]
  },
  {
    "slug": "coffee-tables",
    "title": "Coffee Tables",
    "eyebrow": "Living Room",
    "short": "Marble block and round fluted coffee tables.",
    "description": "Solid-looking marble block coffee tables, round fluted tables with stone tops and nested side tables, finished in the stone that suits your sofa and floor.",
    "size": "narrow",
    "group": "living",
    "cover": {
      "src": "/images/coffee-tables/coffee-tables-01.jpg",
      "w": 1050,
      "h": 1400,
      "alt": "Round fluted coffee table with marble top"
    },
    "images": [
      {
        "src": "/images/coffee-tables/coffee-tables-01.jpg",
        "w": 1050,
        "h": 1400,
        "alt": "Round fluted coffee table with marble top"
      },
      {
        "src": "/images/coffee-tables/coffee-tables-02.jpg",
        "w": 1400,
        "h": 1050,
        "alt": "Marble block coffee table with sectional sofa"
      },
      {
        "src": "/images/coffee-tables/coffee-tables-03.jpg",
        "w": 1050,
        "h": 1400,
        "alt": "Marble block coffee table"
      },
      {
        "src": "/images/coffee-tables/coffee-tables-04.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Marble block coffee table"
      },
      {
        "src": "/images/coffee-tables/coffee-tables-05.jpg",
        "w": 1400,
        "h": 1050,
        "alt": "Marble block coffee table"
      },
      {
        "src": "/images/coffee-tables/coffee-tables-06.jpg",
        "w": 1050,
        "h": 1400,
        "alt": "Brown marble coffee table in a majlis"
      },
      {
        "src": "/images/coffee-tables/coffee-tables-07.jpg",
        "w": 1050,
        "h": 1400,
        "alt": "Marble block coffee table"
      }
    ],
    "videos": []
  },
  {
    "slug": "tv-units",
    "title": "TV Units & Media Walls",
    "eyebrow": "Living Rooms",
    "short": "Backlit media walls with slats, niches and floating consoles.",
    "description": "Floating media walls with concealed cabling, soft backlighting, timber slat panels and lit display niches. Each unit is sized to your screen and sound system and finished to match the rest of the room.",
    "size": "wide",
    "cover": {
      "src": "/images/tv-units/tv-units-05.jpg",
      "w": 960,
      "h": 1280,
      "alt": "Fluted beige media wall with backlit TV panel and floating console"
    },
    "images": [
      {"src": "/images/tv-units/tv-units-15.jpg", "w": 1200, "h": 1600, "alt": "Walnut slat media wall with a black marble TV panel and a floating console, before the lighting is switched on", "set": "tv-units-walnut-marble"},
      {"src": "/images/tv-units/tv-units-16.jpg", "w": 960, "h": 1280, "alt": "Walnut slat media wall with black marble TV panel, lit display shelving and a glowing console", "set": "tv-units-walnut-marble"},
      {"src": "/images/tv-units/tv-units-17.jpg", "w": 960, "h": 1280, "alt": "The same walnut and marble media wall in the evening, slats and shelves backlit in warm light", "set": "tv-units-walnut-marble"},
      {
        "src": "/images/tv-units/tv-units-05.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Fluted beige media wall with backlit TV panel and floating console"
      },
      {
        "src": "/images/tv-units/tv-units-06.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Travertine-effect TV wall with lit display niches and a long floating console"
      },
      {
        "src": "/images/tv-units/tv-units-07.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Media wall with electric fireplace and lit shelving on both sides"
      },
      {
        "src": "/images/tv-units/tv-units-01.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Backlit floating TV wall with lit display niches"
      },
      {
        "src": "/images/tv-units/tv-units-08.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Panelled TV wall with backlit panels, fluted stone column and glass display cabinet"
      },
      {
        "src": "/images/tv-units/tv-units-09.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Fluted media wall with floating console and backlit TV panel"
      },
      {
        "src": "/images/tv-units/tv-units-02.jpg",
        "w": 960,
        "h": 1280,
        "alt": "TV media wall with timber slats and floating console unit"
      },
      {
        "src": "/images/tv-units/tv-units-10.jpg",
        "w": 1280,
        "h": 960,
        "alt": "TV wall with lit display niches either side and a floating console"
      },
      {
        "src": "/images/tv-units/tv-units-11.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Media wall with electric fireplace beside lit display shelving"
      },
      {
        "src": "/images/tv-units/tv-units-03.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Backlit TV wall with timber slats and floating console"
      },
      {
        "src": "/images/tv-units/tv-units-12.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Backlit panelled media wall with a low drawer console"
      },
      {
        "src": "/images/tv-units/tv-units-13.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Television above a built-in electric fireplace"
      },
      {
        "src": "/images/tv-units/tv-units-14.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Living room media wall with fireplace, lit shelving and floating base cabinets"
      },
      {
        "src": "/images/tv-units/tv-units-04.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Backlit TV wall with timber slats and floating console"
      },
      {"src": "/images/tv-units/tv-units-18.jpg", "w": 960, "h": 1280, "alt": "Backlit TV panel with a timber slat column and a floating console, lit in warm light"},
      {"src": "/images/tv-units/tv-units-19.jpg", "w": 960, "h": 1280, "alt": "White media wall with a backlit TV panel, lit side shelves and a floating console, seen from the side"},
      {"src": "/images/tv-units/tv-units-20.jpg", "w": 1280, "h": 960, "alt": "White media wall with a backlit TV panel and lit side shelves, seen from the front"},
      {"src": "/images/tv-units/tv-units-21.jpg", "w": 960, "h": 1280, "alt": "Close view of the white media wall with its backlit TV panel and lit side shelf"},
      {"src": "/images/tv-units/tv-units-22.jpg", "w": 1280, "h": 960, "alt": "TV unit in a dark timber frame with a grey stone-look back panel and lit glass shelves"},
      {"src": "/images/tv-units/tv-units-23.jpg", "w": 960, "h": 1280, "alt": "Dark timber framed TV unit with vertical lines of light and glass shelves at the side"},
      {"src": "/images/tv-units/tv-units-24.jpg", "w": 1600, "h": 1200, "alt": "Media wall with a tall timber slat panel, backlit TV panel and a lit oak shelf tower"},
      {"src": "/images/tv-units/tv-units-25.jpg", "w": 1200, "h": 1600, "alt": "Backlit TV panel beside a lit oak shelf tower with a slat panel above"},
      {"src": "/images/tv-units/tv-units-26.jpg", "w": 1280, "h": 960, "alt": "Fluted TV wall with a backlit panel and floating lit shelves in a living room with pendant lamps"},
      {"src": "/images/tv-units/tv-units-27.jpg", "w": 1280, "h": 960, "alt": "Fluted TV wall with a backlit TV panel, floating console and lit shelves, seen from the front"},
      {"src": "/images/tv-units/tv-units-28.jpg", "w": 960, "h": 1280, "alt": "Slatted TV wall with a floating white console and a lit mirror dressing niche"},
      {"src": "/images/tv-units/tv-units-29.jpg", "w": 1280, "h": 960, "alt": "Full slatted wall with a wall-mounted TV, floating white console and a dressing niche"},
      {"src": "/images/tv-units/tv-units-30.jpg", "w": 1024, "h": 1280, "alt": "Lit slatted TV wall with warm light above and below and a floating dark console"},
      {"src": "/images/tv-units/tv-units-31.jpg", "w": 1024, "h": 1280, "alt": "Side-lit TV panel on a full-height slatted wall with a floating shelf"},
      {"src": "/images/tv-units/tv-units-32.jpg", "w": 960, "h": 1280, "alt": "Slatted wall with a backlit TV panel beside the bedroom door"},
      {"src": "/images/tv-units/tv-units-33.jpg", "w": 960, "h": 1280, "alt": "Cream panelled TV wall with a lit stone strip in the centre and a low timber console"},
      {"src": "/images/tv-units/tv-units-34.jpg", "w": 960, "h": 1280, "alt": "Cream panelled TV wall with lines of warm light and a timber console"},
      {"src": "/images/tv-units/tv-units-35.jpg", "w": 960, "h": 1280, "alt": "Close view of the cream panelled TV wall with its lit stone centre strip"}
    ],
    "group": "living",
    "videos": [
      {"src": "/video/tv-units/tv-units-10.mp4", "poster": "/video/tv-units/tv-units-10.jpg", "w": 576, "h": 1024, "duration": 9, "alt": "Walkthrough of the walnut slat and black marble media wall with its lighting on", "set": "tv-units-walnut-marble"},
      {
        "src": "/video/tv-units/tv-units-08.mp4",
        "poster": "/video/tv-units/tv-units-08.jpg",
        "w": 576,
        "h": 1024,
        "duration": 8,
        "alt": "Backlit TV wall with timber slats"
      },
      {
        "src": "/video/tv-units/tv-units-09.mp4",
        "poster": "/video/tv-units/tv-units-09.jpg",
        "w": 576,
        "h": 1024,
        "duration": 9,
        "alt": "Media wall with floating console and lit panel"
      },
      {
        "src": "/video/tv-units/tv-units-01.mp4",
        "poster": "/video/tv-units/tv-units-01.jpg",
        "w": 576,
        "h": 1024,
        "duration": 14,
        "alt": "Media wall with slat panels and floating console"
      },
      {
        "src": "/video/tv-units/tv-units-02.mp4",
        "poster": "/video/tv-units/tv-units-02.jpg",
        "w": 576,
        "h": 1024,
        "duration": 8,
        "alt": "Walnut slat media wall with backlighting"
      },
      {
        "src": "/video/tv-units/tv-units-03.mp4",
        "poster": "/video/tv-units/tv-units-03.jpg",
        "w": 576,
        "h": 1024,
        "duration": 14,
        "alt": "Media wall with lit niches and fireplace"
      },
      {
        "src": "/video/tv-units/tv-units-04.mp4",
        "poster": "/video/tv-units/tv-units-04.jpg",
        "w": 576,
        "h": 1024,
        "duration": 11,
        "alt": "Backlit TV panel with slat surround"
      },
      {
        "src": "/video/tv-units/tv-units-05.mp4",
        "poster": "/video/tv-units/tv-units-05.jpg",
        "w": 576,
        "h": 1024,
        "duration": 11,
        "alt": "Media wall with fireplace screen and lit shelving"
      },
      {
        "src": "/video/tv-units/tv-units-06.mp4",
        "poster": "/video/tv-units/tv-units-06.jpg",
        "w": 576,
        "h": 1024,
        "duration": 6,
        "alt": "Floating TV console with backlit panel"
      },
      {
        "src": "/video/tv-units/tv-units-07.mp4",
        "poster": "/video/tv-units/tv-units-07.jpg",
        "w": 576,
        "h": 1024,
        "duration": 15,
        "alt": "Study wall with slat panelling and desk"
      },
      {"src": "/video/tv-units/tv-units-11.mp4", "poster": "/video/tv-units/tv-units-11.jpg", "w": 576, "h": 1024, "duration": 12, "alt": "Walkthrough of the backlit TV panel with a timber slat column"},
      {"src": "/video/tv-units/tv-units-12.mp4", "poster": "/video/tv-units/tv-units-12.jpg", "w": 576, "h": 1024, "duration": 17, "alt": "Walkthrough of the dark timber framed TV unit with lit glass shelves"},
      {"src": "/video/tv-units/tv-units-13.mp4", "poster": "/video/tv-units/tv-units-13.jpg", "w": 576, "h": 1024, "duration": 10, "alt": "Walkthrough of the media wall with a slat panel and backlit TV, lights off"},
      {"src": "/video/tv-units/tv-units-14.mp4", "poster": "/video/tv-units/tv-units-14.jpg", "w": 576, "h": 1024, "duration": 6, "alt": "Walkthrough of the lit slatted TV wall with a floating dark console"}
    ]
  },
  {
    "slug": "wall-paneling",
    "title": "Wall Paneling",
    "eyebrow": "Classical & Contemporary",
    "short": "Moulded wainscoting, full-height panels and feature walls.",
    "description": "Hand-finished wall paneling that gives corridors, majlis and living rooms architectural depth. From classical white wainscoting with moulded frames to greige full-height panels under cascading pendants, every profile is drawn to your ceiling heights and openings.",
    "size": "wide",
    "cover": {
      "src": "/images/wall-paneling/wall-paneling-01.jpg",
      "w": 720,
      "h": 1280,
      "alt": "Cascading crystal pendant lights over greige wall paneling at a staircase"
    },
    "images": [
      {
        "src": "/images/wall-paneling/wall-paneling-01.jpg",
        "w": 720,
        "h": 1280,
        "alt": "Cascading crystal pendant lights over greige wall paneling at a staircase"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-02.jpg",
        "w": 720,
        "h": 1280,
        "alt": "Double-height greige wall paneling with pendant chandelier"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-03.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling in a living room with navy velvet sofas"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-04.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Wainscoting panels with brass console tables beside garden doors"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-05.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-06.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-07.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-08.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-09.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-10.jpg",
        "w": 720,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-11.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-12.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-13.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-14.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-15.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-16.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-17.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-18.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-19.jpg",
        "w": 720,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      },
      {
        "src": "/images/wall-paneling/wall-paneling-20.jpg",
        "w": 720,
        "h": 1280,
        "alt": "Classical white wall paneling with moulded frames"
      }
    ],
    "group": "living",
    "videos": [
      {
        "src": "/video/wall-paneling/wall-paneling-01.mp4",
        "poster": "/video/wall-paneling/wall-paneling-01.jpg",
        "w": 576,
        "h": 1024,
        "duration": 30,
        "alt": "Walkthrough of a villa with classical wall paneling"
      },
      {
        "src": "/video/wall-paneling/wall-paneling-02.mp4",
        "poster": "/video/wall-paneling/wall-paneling-02.jpg",
        "w": 576,
        "h": 1024,
        "duration": 20,
        "alt": "Full-height wall paneling beneath a pendant"
      }
    ]
  },
  {
    "slug": "display-shelving",
    "title": "Display Shelving",
    "eyebrow": "Living & Study",
    "short": "Floating shelves and lit display units over base cabinets.",
    "description": "Floating shelves and display units with concealed LED strips, set over matching base cabinets. Ideal for living rooms, studies and majlis where books, ceramics and framed pieces deserve a stage.",
    "size": "narrow",
    "cover": {
      "src": "/images/display-shelving/display-shelving-02.jpg",
        "w": 1139,
        "h": 1400,
        "alt": "Floating display shelves with warm LED lighting"
    },
    "images": [
      {
        "src": "/images/display-shelving/display-shelving-04.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Lit display shelving unit beside a media wall"
      },
      {
        "src": "/images/display-shelving/display-shelving-01.jpg",
        "w": 1130,
        "h": 1400,
        "alt": "Floating shelves with LED strip lighting over base cabinets"
      },
      {
        "src": "/images/display-shelving/display-shelving-02.jpg",
        "w": 1139,
        "h": 1400,
        "alt": "Floating display shelves with warm LED lighting"
      },
      {
        "src": "/images/display-shelving/display-shelving-03.jpg",
        "w": 1129,
        "h": 1400,
        "alt": "Floating display shelves with warm LED lighting"
      }
    ],
    "group": "living",
    "videos": []
  },
  {
    "slug": "beds",
    "title": "Beds",
    "eyebrow": "Bedroom",
    "short": "Upholstered beds, lit headboard walls and children's beds.",
    "description": "Upholstered beds with channel-tufted, scalloped or curved headboards, often paired with a lit headboard wall in marble, walnut or slatted timber. Children's beds come with house-shaped headboards, guard rails and storage drawers.",
    "size": "wide",
    "group": "bedroom",
    "cover": {
      "src": "/images/beds/beds-01.jpg",
      "w": 1280,
      "h": 960,
      "alt": "Bed with illuminated headboard panel and bedside sconces",
      "type": "bed"
    },
    "images": [
      {
        "src": "/images/beds/beds-01.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Bed with illuminated headboard panel and bedside sconces",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-02.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Bed with marble and walnut headboard wall, lit from behind",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-03.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-04.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-05.jpg",
        "w": 1127,
        "h": 1400,
        "alt": "White boucle bed in a paneled bedroom",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-06.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Black velvet bed with channel headboard and nightstands",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-07.jpg",
        "w": 1024,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-08.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-09.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-10.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-11.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-12.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-13.jpg",
        "w": 1155,
        "h": 1400,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-14.jpg",
        "w": 1166,
        "h": 1400,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-15.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-16.jpg",
        "w": 1125,
        "h": 803,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-17.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-18.jpg",
        "w": 1024,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-19.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-20.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Upholstered bed with channel-tufted headboard",
        "type": "bed"
      },
      {
        "src": "/images/beds/beds-21.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Children's bed with pink house-shaped headboard and drawers",
        "type": "kids-bed"
      },
      {
        "src": "/images/beds/beds-22.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Children's bed with house-shaped headboard and storage drawers",
        "type": "kids-bed"
      },
      {
        "src": "/images/beds/beds-23.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Children's bed with house-shaped headboard and storage drawers",
        "type": "kids-bed"
      },
      {
        "src": "/images/beds/beds-24.jpg",
        "w": 1290,
        "h": 966,
        "alt": "Twin children's beds with scalloped headboards and lit slat wall",
        "type": "kids-bed"
      },
      {
        "src": "/images/beds/beds-25.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Scalloped headboard bed against striped wallpaper",
        "type": "kids-bed"
      },
      {
        "src": "/images/beds/beds-26.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Children's bed with house-shaped headboard and storage drawers",
        "type": "kids-bed"
      }
    ],
    "types": [
      {
        "slug": "bed",
        "title": "Beds"
      },
      {
        "slug": "kids-bed",
        "title": "Kids beds"
      }
    ],
    "videos": [
      {
        "src": "/video/beds/beds-01.mp4",
        "poster": "/video/beds/beds-01.jpg",
        "w": 576,
        "h": 1024,
        "duration": 30,
        "alt": "Bed with marble and walnut headboard wall"
      }
    ]
  },
  {
    "slug": "walk-in-closets",
    "title": "Walk-in Closets",
    "eyebrow": "Dressing Rooms",
    "short": "Glass-front wardrobes, lit shelving and central islands.",
    "description": "Walk-in dressing rooms planned around how you live. Bronze or clear glass doors with slim black frames, warm LED-lit interiors, pull-out trays and a central island with a glass-top jewellery display. Walnut, oak and painted finishes are all made to measure.",
    "size": "narrow",
    "cover": {
      "src": "/images/walk-in-closets/walk-in-closets-01.jpg",
      "w": 960,
      "h": 1280,
      "alt": "Walnut walk-in closet with glass-front doors and a central island"
    },
    "images": [
      {
        "src": "/images/walk-in-closets/walk-in-closets-01.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walnut walk-in closet with glass-front doors and a central island"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-02.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Bronze glass walk-in wardrobe with lit shelving and an island"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-03.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Black-framed glass wardrobes with LED-lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-04.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-05.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-06.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-07.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-08.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-09.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-10.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-11.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-12.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-13.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-14.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-15.jpg",
        "w": 1024,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-16.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-17.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-18.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-19.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-20.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-21.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-22.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-23.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-24.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Walk-in closet with glass doors and lit interiors"
      },
      {
        "src": "/images/walk-in-closets/walk-in-closets-25.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Walk-in closet with glass doors and lit interiors"
      }
    ],
    "group": "bedroom",
    "videos": [
      {
        "src": "/video/walk-in-closets/walk-in-closets-03.mp4",
        "poster": "/video/walk-in-closets/walk-in-closets-03.jpg",
        "w": 576,
        "h": 1024,
        "duration": 15,
        "alt": "Walk-in closet with island and glass-front doors"
      },
      {
        "src": "/video/walk-in-closets/walk-in-closets-04.mp4",
        "poster": "/video/walk-in-closets/walk-in-closets-04.jpg",
        "w": 576,
        "h": 1024,
        "duration": 14,
        "alt": "Walnut walk-in closet with illuminated shelving"
      },
      {
        "src": "/video/walk-in-closets/walk-in-closets-01.mp4",
        "poster": "/video/walk-in-closets/walk-in-closets-01.jpg",
        "w": 576,
        "h": 1024,
        "duration": 30,
        "alt": "Walk-in closet with island and glass doors"
      },
      {
        "src": "/video/walk-in-closets/walk-in-closets-02.mp4",
        "poster": "/video/walk-in-closets/walk-in-closets-02.jpg",
        "w": 576,
        "h": 1024,
        "duration": 30,
        "alt": "Walk-in closet with lit arched mirror"
      }
    ]
  },
  {
    "slug": "fitted-wardrobes",
    "title": "Fitted Wardrobes",
    "eyebrow": "Bedroom Storage",
    "short": "Floor-to-ceiling wardrobes with flush or fluted doors.",
    "description": "Floor-to-ceiling fitted wardrobes that disappear into the architecture. Flush handleless doors, fluted feature panels, glass inserts and lit interiors, built to the exact width and height of your room so no space is wasted.",
    "size": "narrow",
    "cover": {
      "src": "/images/fitted-wardrobes/fitted-wardrobes-01.jpg",
      "w": 960,
      "h": 1280,
      "alt": "Minimal taupe fitted wardrobe with fluted centre panel"
    },
    "images": [
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-01.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Minimal taupe fitted wardrobe with fluted centre panel"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-02.jpg",
        "w": 1280,
        "h": 960,
        "alt": "White fitted wardrobe with glass doors and illuminated shelves"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-03.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-04.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-05.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-06.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-07.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-08.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-09.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-10.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-11.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-12.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      },
      {
        "src": "/images/fitted-wardrobes/fitted-wardrobes-13.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Made-to-measure fitted wardrobe with flush doors"
      }
    ],
    "group": "bedroom",
    "videos": [
      {
        "src": "/video/fitted-wardrobes/fitted-wardrobes-01.mp4",
        "poster": "/video/fitted-wardrobes/fitted-wardrobes-01.jpg",
        "w": 576,
        "h": 1024,
        "duration": 8,
        "alt": "White fitted wardrobes with glass doors and lit shelves"
      }
    ]
  },
  {
    "slug": "dressing-tables",
    "title": "Dressing Tables",
    "eyebrow": "Vanities",
    "short": "Vanities with mirrors, drawers and lit display cubes.",
    "description": "Dressing tables and vanity units with integrated mirrors, soft-close drawers and illuminated display cubes. From a quiet round mirror beside a fluted wardrobe to a bold backlit feature wall in colour.",
    "size": "wide",
    "cover": {
      "src": "/images/dressing-tables/dressing-tables-06.jpg",
      "w": 960,
      "h": 1280,
      "alt": "Dressing area with backlit round mirror, fluted floating vanity and lit shelving"
    },
    "images": [
      {
        "src": "/images/dressing-tables/dressing-tables-06.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Dressing area with backlit round mirror, fluted floating vanity and lit shelving"
      },
      {
        "src": "/images/dressing-tables/dressing-tables-01.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Pink backlit dressing unit with timber display cubes"
      },
      {
        "src": "/images/dressing-tables/dressing-tables-07.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Backlit round mirror over a fluted floating vanity"
      },
      {
        "src": "/images/dressing-tables/dressing-tables-02.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Custom dressing table with integrated backlit display"
      },
      {
        "src": "/images/dressing-tables/dressing-tables-03.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Custom dressing table with integrated backlit display"
      },
      {
        "src": "/images/dressing-tables/dressing-tables-04.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Round mirror vanity beside a fluted wardrobe"
      },
      {
        "src": "/images/dressing-tables/dressing-tables-05.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Custom dressing table with integrated backlit display"
      },
      {"src": "/images/dressing-tables/dressing-tables-08.jpg", "w": 960, "h": 1280, "alt": "Floating vanity with a lit shelf tower beside a wall-mounted TV and a long floating console"},
      {"src": "/images/dressing-tables/dressing-tables-09.jpg", "w": 960, "h": 1280, "alt": "Round backlit mirror over a fluted floating vanity with drawers"}
    ],
    "group": "bedroom",
    "videos": [
      {
        "src": "/video/dressing-tables/dressing-tables-02.mp4",
        "poster": "/video/dressing-tables/dressing-tables-02.jpg",
        "w": 576,
        "h": 1024,
        "duration": 8,
        "alt": "Dressing unit with coloured cubes beside a child's bed"
      },
      {
        "src": "/video/dressing-tables/dressing-tables-03.mp4",
        "poster": "/video/dressing-tables/dressing-tables-03.jpg",
        "w": 576,
        "h": 1024,
        "duration": 4,
        "alt": "Illuminated dressing unit in pink and timber"
      },
      {
        "src": "/video/dressing-tables/dressing-tables-01.mp4",
        "poster": "/video/dressing-tables/dressing-tables-01.jpg",
        "w": 576,
        "h": 1024,
        "duration": 30,
        "alt": "Dressing unit with coloured display cubes"
      },
      {"src": "/video/dressing-tables/dressing-tables-04.mp4", "poster": "/video/dressing-tables/dressing-tables-04.jpg", "w": 576, "h": 1024, "duration": 13, "alt": "Walkthrough of the round backlit mirror vanity and its lit shelf tower"}
    ]
  },
  {
    "slug": "dining-tables",
    "title": "Dining Tables",
    "eyebrow": "Dining",
    "short": "Marble and stone tables with upholstered chairs.",
    "description": "Round and oval dining tables in marble or sintered stone on fluted or cylindrical bases, with upholstered chairs made to match. Sizes follow your dining room and the number of guests you host.",
    "size": "narrow",
    "group": "dining",
    "cover": {
      "src": "/images/dining-tables/dining-tables-01.jpg",
      "w": 1080,
      "h": 1350,
      "alt": "Oval marble dining table with boucle chairs by the garden",
      "type": "oval"
    },
    "images": [
      {
        "src": "/images/dining-tables/dining-tables-01.jpg",
        "w": 1080,
        "h": 1350,
        "alt": "Oval marble dining table with boucle chairs by the garden"
      },
      {
        "src": "/images/dining-tables/dining-tables-02.jpg",
        "w": 1080,
        "h": 1350,
        "alt": "Oval marble dining table with upholstered chairs",
        "type": "oval"
      },
      {
        "src": "/images/dining-tables/dining-tables-03.jpg",
        "w": 1079,
        "h": 1384,
        "alt": "Oval marble dining table with vase styling",
        "type": "oval"
      },
      {
        "src": "/images/dining-tables/dining-tables-04.jpg",
        "w": 960,
        "h": 960,
        "alt": "Oval marble dining table with upholstered chairs",
        "type": "oval"
      },
      {
        "src": "/images/dining-tables/dining-tables-05.jpg",
        "w": 1080,
        "h": 1350,
        "alt": "Oval marble dining table with upholstered chairs",
        "type": "oval"
      },
      {
        "src": "/images/dining-tables/dining-tables-06.jpg",
        "w": 1024,
        "h": 1280,
        "alt": "Round marble dining table with black fluted base",
        "type": "round"
      },
      {
        "src": "/images/dining-tables/dining-tables-07.jpg",
        "w": 1026,
        "h": 1280,
        "alt": "Round stone dining table on a fluted base",
        "type": "round"
      },
      {
        "src": "/images/dining-tables/dining-tables-08.jpg",
        "w": 1080,
        "h": 1350,
        "alt": "Round stone dining table on a fluted base",
        "type": "round"
      },
      {
        "src": "/images/dining-tables/dining-tables-09.jpg",
        "w": 1050,
        "h": 1400,
        "alt": "Round stone dining table on a fluted base",
        "type": "round"
      },
      {
        "src": "/images/dining-tables/dining-tables-10.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Oval marble dining table with upholstered chairs",
        "type": "oval"
      },
      {
        "src": "/images/dining-tables/dining-tables-11.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Oval marble dining table with upholstered chairs",
        "type": "oval"
      },
      {
        "src": "/images/dining-tables/dining-tables-12.jpg",
        "w": 1080,
        "h": 1350,
        "alt": "Oval stone dining table with walnut chairs",
        "type": "chairs"
      },
      {
        "src": "/images/dining-tables/dining-tables-13.jpg",
        "w": 1080,
        "h": 1343,
        "alt": "Upholstered dining chairs in boucle and walnut",
        "type": "chairs"
      },
      {
        "src": "/images/dining-tables/dining-tables-14.jpg",
        "w": 1080,
        "h": 1350,
        "alt": "Upholstered dining chairs in boucle and walnut",
        "type": "chairs"
      },
      {
        "src": "/images/dining-tables/dining-tables-15.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Round stone dining table on a fluted base",
        "type": "round"
      },
      {
        "src": "/images/dining-tables/dining-tables-16.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Round stone dining table on a fluted base",
        "type": "round"
      },
      {
        "src": "/images/dining-tables/dining-tables-17.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Round stone dining table on a fluted base",
        "type": "round"
      },
      {
        "src": "/images/dining-tables/dining-tables-18.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Round stone dining table on a fluted base",
        "type": "round"
      },
      {
        "src": "/images/dining-tables/dining-tables-19.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Round stone dining table on a fluted base",
        "type": "round"
      }
    ],
    "types": [
      {
        "slug": "oval",
        "title": "Oval tables"
      },
      {
        "slug": "round",
        "title": "Round tables"
      },
      {
        "slug": "chairs",
        "title": "Dining chairs"
      }
    ],
    "videos": []
  },
  {
    "slug": "curtains",
    "title": "Curtains",
    "eyebrow": "Windows",
    "short": "Wave curtains, sheers and blackout layers, fitted to the window.",
    "description": "Floor-to-ceiling wave curtains with sheer and blackout layers, pleated drapes with pelmets and tiebacks, and motorised tracks on request. Measured on site and fitted by our team.",
    "size": "narrow",
    "group": "windows",
    "cover": {
      "src": "/images/curtains/curtains-01.jpg",
      "w": 1280,
      "h": 960,
      "alt": "Wave curtains with sheer layer in a lit bedroom",
      "type": "wave"
    },
    "images": [
      {
        "src": "/images/curtains/curtains-01.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Wave curtains with sheer layer in a lit bedroom"
      },
      {
        "src": "/images/curtains/curtains-02.jpg",
        "w": 1125,
        "h": 815,
        "alt": "Wave curtains fitted floor to ceiling",
        "type": "wave"
      },
      {
        "src": "/images/curtains/curtains-03.jpg",
        "w": 1094,
        "h": 1367,
        "alt": "Pleated curtains on an arched window with pelmet",
        "type": "classic"
      },
      {
        "src": "/images/curtains/curtains-04.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Blue and beige curtains beneath a crystal chandelier",
        "type": "classic"
      },
      {
        "src": "/images/curtains/curtains-05.jpg",
        "w": 1022,
        "h": 1280,
        "alt": "Wave curtains fitted floor to ceiling",
        "type": "wave"
      },
      {
        "src": "/images/curtains/curtains-06.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Wave curtains fitted floor to ceiling",
        "type": "wave"
      },
      {
        "src": "/images/curtains/curtains-07.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Sheer and blackout curtain layers on a ceiling track",
        "type": "layered"
      },
      {
        "src": "/images/curtains/curtains-08.jpg",
        "w": 1024,
        "h": 1280,
        "alt": "Pleated drapes with pelmet and tiebacks",
        "type": "classic"
      },
      {
        "src": "/images/curtains/curtains-09.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Sheer and blackout curtain layers on a ceiling track",
        "type": "layered"
      },
      {
        "src": "/images/curtains/curtains-10.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Sheer and blackout curtain layers on a ceiling track",
        "type": "layered"
      },
      {
        "src": "/images/curtains/curtains-11.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Wave curtains fitted floor to ceiling",
        "type": "wave"
      },
      {
        "src": "/images/curtains/curtains-12.jpg",
        "w": 1024,
        "h": 1280,
        "alt": "Wave curtains fitted floor to ceiling",
        "type": "wave"
      },
      {
        "src": "/images/curtains/curtains-13.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Sheer and blackout curtain layers on a ceiling track",
        "type": "layered"
      },
      {
        "src": "/images/curtains/curtains-14.jpg",
        "w": 792,
        "h": 1024,
        "alt": "Navy curtains with tiebacks and sheer panels",
        "type": "classic"
      },
      {
        "src": "/images/curtains/curtains-15.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Sheer and blackout curtain layers on a ceiling track",
        "type": "layered"
      },
      {
        "src": "/images/curtains/curtains-16.jpg",
        "w": 1280,
        "h": 960,
        "alt": "Sheer and blackout curtain layers on a ceiling track",
        "type": "layered"
      },
      {
        "src": "/images/curtains/curtains-17.jpg",
        "w": 1024,
        "h": 1280,
        "alt": "Sheer and blackout curtain layers on a ceiling track",
        "type": "layered"
      },
      {
        "src": "/images/curtains/curtains-18.jpg",
        "w": 960,
        "h": 1280,
        "alt": "Sheer and blackout curtain layers on a ceiling track",
        "type": "layered"
      }
    ],
    "types": [
      {
        "slug": "wave",
        "title": "Wave curtains"
      },
      {
        "slug": "layered",
        "title": "Sheer & blackout layers"
      },
      {
        "slug": "classic",
        "title": "Classic drapes"
      }
    ],
    "videos": [
      {
        "src": "/video/curtains/curtains-01.mp4",
        "poster": "/video/curtains/curtains-01.jpg",
        "w": 576,
        "h": 768,
        "duration": 8,
        "alt": "Wave curtains being drawn across a window"
      },
      {
        "src": "/video/curtains/curtains-02.mp4",
        "poster": "/video/curtains/curtains-02.jpg",
        "w": 768,
        "h": 576,
        "duration": 3,
        "alt": "Wave curtains, close view of the fabric fall"
      },
      {
        "src": "/video/curtains/curtains-03.mp4",
        "poster": "/video/curtains/curtains-03.jpg",
        "w": 576,
        "h": 1024,
        "duration": 11,
        "alt": "Sheer and blackout curtains in a bedroom"
      }
    ]
  }
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const categoriesInGroup = (group: GroupSlug) => categories.filter((c) => c.group === group);

export const allImages = categories.flatMap((c) => c.images.map((img) => ({ ...img, category: c.slug, categoryTitle: c.title })));

export const allVideos = categories.flatMap((c) => c.videos.map((v) => ({ ...v, category: c.slug, categoryTitle: c.title })));

/** Image by category slug and position, with a safe fallback to the cover. */
export const pick = (slug: string, i = 0): GalleryImage => {
  const c = getCategory(slug);
  if (!c) throw new Error("Unknown category " + slug);
  return c.images[i] ?? c.cover;
};

/** Kept for older components */
export const featured = ["wall-paneling", "walk-in-closets", "tv-units", "fitted-wardrobes", "sofas", "beds", "dining-tables", "curtains"].map((s) => { const c = getCategory(s)!; return { ...c.cover, category: c.slug, categoryTitle: c.title }; });

export const aboutImages = {
  primary: pick("wall-paneling", 2),
  secondary: pick("walk-in-closets", 0),
};

/** Tiles for a room: its collections, or one tile per sub-type when the room has a single collection. */
export interface RoomTile {
  key: string;
  title: string;
  short: string;
  href: string;
  image: GalleryImage;
}
export const roomTiles = (group: GroupSlug): RoomTile[] => {
  const cats = categoriesInGroup(group);
  if (cats.length >= 3 || !cats.some((c) => c.types?.length)) {
    return cats.map((c) => ({ key: c.slug, title: c.title, short: c.short, href: "/collections/" + c.slug, image: c.cover }));
  }
  return cats.flatMap((c) =>
    (c.types ?? []).map((t) => {
      const image = c.images.find((img) => img.type === t.slug) ?? c.cover;
      return { key: c.slug + "-" + t.slug, title: t.title, short: c.title, href: "/collections/" + c.slug + "?type=" + t.slug, image };
    })
  );
};
