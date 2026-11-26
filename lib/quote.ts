// What changes the price of each collection, what we measure on the visit, and what a visitor can
// send for a first estimate. No figures: the client has not supplied starting prices.
export interface QuoteFactor {
  slug: string;
  depends: string[];
  measure: string;
  send: string;
}

export const quoteFactors: QuoteFactor[] = [
  {
    slug: "sofas",
    depends: ["Overall length and seat depth", "Fabric: boucle, velvet, leather or linen", "Foam density and cushion fill", "Arm shape, legs and loose cushions"],
    measure: "The wall it sits against, the walkways around it and any window or door it has to clear.",
    send: "A photo of the room from the doorway and the length of the wall.",
  },
  {
    slug: "coffee-tables",
    depends: ["Marble, stone or timber top", "Size and shape", "Base finish"],
    measure: "The sofa seat height and the space you want to keep around the table.",
    send: "A photo of the sofa and the room.",
  },
  {
    slug: "tv-units",
    depends: ["Width and height of the wall", "Backlighting and the number of lit niches", "Veneer, lacquer or stone surfaces", "Hidden storage and cable routing"],
    measure: "The full wall, your screen size, socket positions and air-conditioning vents.",
    send: "A photo of the wall and your screen size.",
  },
  {
    slug: "wall-paneling",
    depends: ["Area covered: dado height or floor to ceiling", "Flat, fluted or moulded panels", "Painted, veneered or lacquered finish"],
    measure: "Every wall, opening and switch position in the room.",
    send: "Photos of the walls and rough room dimensions.",
  },
  {
    slug: "display-shelving",
    depends: ["Width and number of shelves", "Lighting", "Base cabinets below"],
    measure: "The wall and anything the unit has to work around.",
    send: "A photo of the wall and what you plan to display.",
  },
  {
    slug: "beds",
    depends: ["Mattress size", "Headboard height, and whether it runs wall to wall", "Upholstery or veneer, and lighting", "Storage base, or safety rails on a kids bed"],
    measure: "The bedroom wall, bedside space and plug positions.",
    send: "The mattress size and a photo of the wall behind the bed.",
  },
  {
    slug: "walk-in-closets",
    depends: ["Square metres of cabinet front: length of the run times ceiling height", "Door type: simple wood, wood-framed glass or aluminium-framed glass", "Lighting inside the units", "An island, drawers and accessories"],
    measure: "Every wall of the room, the ceiling height and the door swing.",
    send: "Photos of the room and a rough sketch with sizes.",
  },
  {
    slug: "fitted-wardrobes",
    depends: ["Square metres of front: width times height", "Door type: simple wood, wood-framed glass or aluminium-framed glass", "Internal layout: hanging, shelves and drawers", "Lighting"],
    measure: "The wall, ceiling height and skirting.",
    send: "A photo of the wall and its width.",
  },
  {
    slug: "dressing-tables",
    depends: ["Width and number of drawers", "Mirror and lighting", "Finish"],
    measure: "The wall and the seating space in front of it.",
    send: "A photo of the spot you have in mind.",
  },
  {
    slug: "dining-tables",
    depends: ["Number of seats", "Marble or stone top", "Base finish and chair upholstery"],
    measure: "The dining area, so chairs pull out comfortably on every side.",
    send: "How many people you seat and a photo of the space.",
  },
  {
    slug: "curtains",
    depends: ["Number and height of the windows", "Fabric and lining: sheer, blackout or both", "Wave, pleated or classic heading", "Track type and ceiling or wall fixing"],
    measure: "Each window, the track position and the ceiling height.",
    send: "A photo of each window and the room.",
  },
];
