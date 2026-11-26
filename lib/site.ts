export const SITE = {
  name: "Modern Furniture Collection",
  shortName: "MFC",
  tagline: "Made-to-measure interiors for homes across the UAE",
  url: "https://www.modernfurniturecollection.online",
  location: "Dubai, United Arab Emirates",
  // Showroom area supplied by the client on 16 Nov 2026. Add the street, building and opening hours here when they arrive.
  showroom: {
    area: "Al Butina",
    city: "Sharjah",
    display: "Al Butina, Sharjah",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Al+Butina+Sharjah",
  },
  instagramHandle: "@modern_furniture_collection",
  instagramUrl: "https://www.instagram.com/modern_furniture_collection",
  // The client's one Instagram account. Kept as a list so the footer, contact and about pages can show more if another is added.
  instagramAccounts: [
    { handle: "@modern_furniture_collection", url: "https://www.instagram.com/modern_furniture_collection" },
  ],
  phones: [
    { display: "050 433 5872", intl: "971504335872" },
  ],
} as const;

/** Where the team measures and installs. The workshop is in Dubai, so the first group gets the most visit slots. */
export const areas = {
  near: { title: "Nearest the workshop", places: ["Dubai", "Sharjah", "Ajman"] },
  far: { title: "Further afield", places: ["Abu Dhabi", "Al Ain", "Ras Al Khaimah", "Umm Al Quwain", "Fujairah"] },
} as const;

export const whatsappLink = (message: string, number: string = SITE.phones[0].intl) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_LINK = whatsappLink(
  "Hello Modern Furniture Collection, I would like to enquire about made-to-measure furniture for my home."
);

export const APPOINTMENT_LINK = whatsappLink(
  "Hello, I would like to book a complimentary consultation and site measurement."
);

export const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  "Sofas & Majlis",
  "Beds",
  "Kids Beds",
  "Dining Tables",
  "Coffee Tables",
  "Curtains",
  "TV Units & Media Walls",
  "Wall Paneling",
  "Walk-in Closets",
  "Fitted Wardrobes",
  "Dressing Tables",
  "Display Shelving",
  "Kitchen Cabinets",
  "Custom Joinery",
];
