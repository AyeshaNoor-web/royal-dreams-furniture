export const SITE = {
  name: "Modern Furniture Collection",
  shortName: "MFC",
  tagline: "Made-to-measure interiors for homes across the UAE",
  url: "https://modernfurniturecollection.ae",
  location: "Dubai, United Arab Emirates",
  instagramHandle: "@modern_furniture_interiors",
  instagramUrl: "https://www.instagram.com/modern_furniture_interiors",
  phones: [
    { display: "050 433 5872", intl: "971504335872" },
  ],
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
