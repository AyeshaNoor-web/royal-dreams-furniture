// The catalogue: every photo and video the client sent, sorted into products. A product is one finished piece or
// room. The site shows one cover photo per product; the rest appear on the product's own page.
// Numbers are file numbers (sofas-07.jpg is photo 7), so a product never changes when the gallery order does.
// build() below throws if a number is missing, reused or left out, so a mistake here stops the build.
import { categories, type Category, type GalleryImage, type GalleryVideo } from "./gallery";

interface Def {
  id: string;
  title: string;
  /** One line about what is in the photos. No prices, sizes or claims the photos do not show. */
  line: string;
  photos?: number[];
  videos?: number[];
}

export interface Product {
  id: string;
  slug: string;
  category: Category;
  title: string;
  line: string;
  cover: GalleryImage;
  photos: GalleryImage[];
  videos: GalleryVideo[];
  /** Sub-type of the category, when the category has types (for example "l-shape"). */
  type?: string;
  href: string;
}

const defs: Record<string, Def[]> = {
  sofas: [
    { id: "cream-u-shaped-sectional", title: "Cream U-shaped sectional", line: "A deep U-shaped sectional in cream fabric with a matching marble coffee table.", photos: [1, 10], videos: [1] },
    { id: "modular-sofa-with-armchair", title: "Modular sofa with curved armchair", line: "A low modular sofa with a round boucle armchair, set against a city view.", photos: [2] },
    { id: "grey-tufted-l-shape", title: "Grey tufted L-shaped sofa", line: "A tufted L-shaped sofa in grey with a round fluted marble table.", photos: [3, 4] },
    { id: "ivory-corner-sofa", title: "Ivory corner sofa", line: "A cushioned corner sofa in ivory with a stone-top coffee table.", photos: [5] },
    { id: "beige-velvet-corner-sofa", title: "Beige velvet corner sofa", line: "A corner sofa with a chaise in soft beige velvet and loose back cushions.", photos: [6, 11, 12], videos: [2] },
    { id: "white-l-shaped-sofa", title: "White L-shaped sofa", line: "A long, low L-shaped sofa in white with a chaise end.", photos: [8, 7] },
    { id: "curved-end-sofa", title: "Sofa with a curved end", line: "A cream sofa with a rounded chaise end and a marble block table.", photos: [9] },
    { id: "large-u-shaped-family-sofa", title: "Large U-shaped family sofa", line: "A wide U-shaped sofa in beige that seats the whole family.", photos: [13] },
    { id: "brown-curved-corner-sofa", title: "Brown curved corner sofa", line: "A low corner sofa in brown with rounded ends.", photos: [14] },
    { id: "brown-modular-corner-sofa", title: "Brown modular corner sofa", line: "A block-style modular corner sofa in brown fabric.", photos: [15], videos: [3] },
    { id: "grey-velvet-corner-sofa", title: "Grey velvet corner sofa", line: "A corner sofa in grey crushed velvet with a chaise.", photos: [17, 16] },
    { id: "cream-sofa-bed", title: "Cream sofa bed", line: "A cream sofa with a pull-out base that opens into a bed.", photos: [18, 19, 20] },
    { id: "taupe-corner-sofa-bed", title: "Taupe corner sofa bed", line: "A corner sofa in taupe with a pull-out sleeping base.", photos: [22, 21] },
    { id: "beige-curved-sofa", title: "Beige curved sofa", line: "A kidney-shaped sofa in beige with a plinth base.", photos: [23] },
    { id: "white-boucle-curved-sofa", title: "White boucle curved sofa", line: "A curved sofa in white boucle.", photos: [24] },
    { id: "boucle-sofa-with-ottoman", title: "Boucle sofa with ottoman", line: "A small curved boucle sofa with a matching pebble ottoman.", photos: [25] },
    { id: "caramel-curved-sofa", title: "Caramel curved sofa", line: "A curved sofa in caramel boucle with a white ottoman.", photos: [26] },
    { id: "grey-curved-sofa-set", title: "Grey curved sofa set", line: "A curved sofa, swivel chair and round ottoman in grey with a gold trim.", photos: [27] },
    { id: "shell-back-sofa-set", title: "Shell-back sofa set", line: "Scalloped-back sofas and armchairs in cream on gold bases.", photos: [28, 29] },
    { id: "taupe-straight-sofas", title: "Taupe straight sofas", line: "Long straight sofas in taupe, facing each other across the room.", photos: [30, 31] },
    { id: "white-majlis-with-timber", title: "White majlis with timber side units", line: "Majlis seating in white with dark timber side units between the seats.", photos: [32, 33] },
    { id: "white-majlis-hall", title: "White majlis for a large hall", line: "Wall-to-wall majlis seating in white for a large reception hall.", photos: [34] },
    { id: "classic-sofa-with-marble-table", title: "Classic sofa with marble table", line: "A long classic sofa with a dark timber frame and a brown marble table.", photos: [35] },
    { id: "carved-classic-majlis", title: "Carved classic majlis", line: "Classic majlis seating with carved frames around the room.", photos: [36, 37] },
    { id: "teal-and-gold-majlis", title: "Teal and gold majlis", line: "Tufted majlis seating in teal with gold frames.", photos: [38], videos: [4] },
  ],
  "coffee-tables": [
    { id: "oval-fluted-coffee-table", title: "Oval fluted coffee table", line: "An oval table with a fluted base and a marble-look top.", photos: [1] },
    { id: "white-marble-block-table", title: "White marble block table", line: "A low block table wrapped in white veined marble.", photos: [2] },
    { id: "grey-marble-block-table", title: "Grey marble block table", line: "A square block table in grey marble on a recessed plinth.", photos: [4, 3] },
    { id: "brown-marble-block-table", title: "Brown marble block table", line: "A square block table in dark brown marble.", photos: [5] },
    { id: "large-brown-marble-table", title: "Large brown marble table", line: "A large low table in polished brown marble for a classic sitting room.", photos: [6] },
    { id: "brown-marble-pedestal-table", title: "Brown marble pedestal table", line: "A brown marble top on a narrower marble pedestal.", photos: [7] },
  ],
  "tv-units": [
    { id: "backlit-media-wall-with-slats", title: "Backlit media wall with timber slats", line: "A floating TV panel with a halo of warm light, a timber slat column and a floating console.", photos: [2, 4, 3, 1], videos: [9, 4, 8] },
    { id: "fluted-beige-media-wall", title: "Fluted beige media wall", line: "A fluted wall in beige with a backlit TV panel and a floating shelf.", photos: [5, 9], videos: [1] },
    { id: "media-wall-with-oak-niches", title: "Media wall with oak niches", line: "A wide media wall with lit oak niches on both sides and a long floating console.", photos: [10, 6] },
    { id: "fireplace-media-wall", title: "Media wall with fireplace", line: "A TV wall with a built-in electric fireplace and lit display shelves on both sides.", photos: [7, 14, 11, 13], videos: [3] },
    { id: "panelled-media-wall", title: "Panelled media wall", line: "A panelled TV wall with lines of warm light and a slatted side panel.", photos: [12, 8] },
    { id: "walnut-and-marble-media-wall", title: "Walnut and black marble media wall", line: "Walnut slats, a black marble TV panel, lit shelving and a floating console.", photos: [16, 17, 15], videos: [10] },
    { id: "walnut-slat-tv-wall", title: "Walnut slat TV wall", line: "A full-height walnut slat wall with a floating console beside the window.", videos: [2] },
    { id: "lit-slat-tv-wall", title: "Lit slat TV wall", line: "A fluted wall with a backlit TV panel in a bright sitting room.", videos: [5] },
    { id: "tv-wall-with-black-console", title: "TV wall with black console", line: "A panelled TV wall with a line of light and a long black console.", videos: [6] },
    { id: "dark-slat-study-wall", title: "Dark slat study wall", line: "A dark slatted wall with a desk and display shelving.", videos: [7] },
  ],
  "wall-paneling": [
    { id: "greige-stairwell-paneling", title: "Greige stairwell paneling", line: "Full-height moulded panels in greige beside the staircase.", photos: [1, 2, 19], videos: [2] },
    { id: "white-living-room-wainscoting", title: "White living room wainscoting", line: "Classical white wall panels with moulded frames around a living room.", photos: [3, 15, 11, 9] },
    { id: "white-corridor-paneling", title: "White corridor paneling", line: "Moulded white panels along a corridor and around its arches.", photos: [7, 6, 12, 14, 17] },
    { id: "white-dining-area-paneling", title: "White dining area paneling", line: "White moulded panels around a dining corner and bar.", photos: [5, 18] },
    { id: "white-entrance-paneling", title: "White entrance paneling", line: "White panels with layered mouldings in the entrance and sitting corners.", photos: [8, 4, 13, 16], videos: [1] },
    { id: "white-panelled-tv-wall", title: "White panelled TV wall", line: "A white panelled feature wall framing the television.", photos: [10, 20] },
  ],
  "display-shelving": [
    { id: "lit-floating-shelves", title: "Lit floating shelves with base cabinets", line: "Floating shelves with hidden lighting over a row of base cabinets.", photos: [2, 1, 3] },
    { id: "full-height-lit-shelving", title: "Full-height lit shelving", line: "Floor-to-ceiling lit shelves beside a media wall.", photos: [4] },
  ],
  beds: [
    { id: "channel-headboard-with-slat-panels", title: "Channel headboard with slat panels", line: "A wall-to-wall channel headboard with a line of warm light and slatted panels above.", photos: [1, 9] },
    { id: "walnut-and-marble-headboard-wall", title: "Walnut and marble headboard wall", line: "A lit headboard wall in walnut slats and marble behind a beige upholstered bed.", photos: [3, 2, 4], videos: [1] },
    { id: "cream-channel-bed", title: "Cream channel bed", line: "A cream bed with a channelled base and headboard against a panelled wall.", photos: [5] },
    { id: "navy-velvet-bed", title: "Navy velvet bed", line: "A channel-tufted bed in navy velvet.", photos: [6, 7, 8] },
    { id: "tall-panel-headboard", title: "Tall panel headboard with walnut slats", line: "A full-height upholstered headboard between walnut slat panels with wall lights.", photos: [10, 11] },
    { id: "white-storage-bed", title: "White storage bed", line: "A white bed with a storage base and bedside drawers, set against dark slats.", photos: [12] },
    { id: "curved-cream-bed", title: "Curved cream bed", line: "A rounded cream bed with a halo-lit headboard wall.", photos: [13] },
    { id: "mocha-modular-bed", title: "Mocha modular bed", line: "A wide, low bed in mocha fabric in front of a fluted wall.", photos: [14] },
    { id: "bed-with-panelled-headboard-wall", title: "Bed with panelled headboard wall", line: "A cream bed with a tall panelled headboard wall in dark timber and stone.", photos: [15] },
    { id: "grey-velvet-bed", title: "Grey velvet bed", line: "A grey velvet bed set in front of a glass-fronted wardrobe wall.", photos: [16] },
    { id: "beige-channel-bed", title: "Beige channel bed", line: "A beige bed with a channelled headboard and floating bedside shelves.", photos: [17, 18] },
    { id: "wide-white-headboard", title: "Wide white headboard", line: "A wide channelled headboard in white with floating bedside tables.", photos: [19, 20] },
    { id: "kids-house-bed", title: "Kids house bed", line: "A house-shaped bed with a lit pink headboard, guard rails and storage drawers.", photos: [21, 22, 23] },
    { id: "twin-scalloped-beds", title: "Twin scalloped beds", line: "Two beds with scalloped headboards under a lit slatted wall.", photos: [24] },
    { id: "scalloped-kids-bed", title: "Scalloped kids bed", line: "A single bed for a child with a tall scalloped headboard.", photos: [25, 26] },
  ],
  "walk-in-closets": [
    { id: "oak-closet-with-island", title: "Oak walk-in closet with island", line: "Oak units with bronze glass doors, lit interiors and a central island with a glass top.", photos: [4, 1, 6, 9, 10, 12, 25], videos: [4, 1] },
    { id: "black-framed-glass-closet", title: "Black-framed glass closet", line: "Glass doors in slim black frames around the corner, with a white drawer island.", photos: [14, 13, 2, 5], videos: [3] },
    { id: "glass-closet-with-window-seat", title: "Glass closet with window seat", line: "Two black-framed glass wardrobes with lit interiors either side of a cushioned seat.", photos: [8, 3, 7] },
    { id: "light-oak-closet", title: "Light oak closet with drawers", line: "Light oak units with glass doors, open shelving and a drawer stack in the centre.", photos: [11] },
    { id: "glass-wall-closet", title: "Glass wall closet", line: "A full wall of bronze glass doors in black frames, lit from inside.", photos: [15, 16] },
    { id: "classic-white-washed-closet", title: "Classic white-washed closet", line: "Framed doors in a white-washed timber finish with drawers below.", photos: [17, 18, 19] },
    { id: "white-lit-closet", title: "White lit closet", line: "White units with lit glass shelves and a tall stack of drawers.", photos: [20] },
    { id: "beige-handleless-closet", title: "Beige handleless closet", line: "Flush handleless doors in beige with a lit glass display section.", photos: [21, 22] },
    { id: "walnut-closet-with-glass-doors", title: "Walnut closet with glass doors", line: "Walnut units with glass doors, lit interiors and an island.", photos: [24, 23] },
    { id: "backlit-arched-mirror", title: "Backlit arched mirror", line: "A full-height arched mirror with a halo of light, fitted in a dressing area.", videos: [2] },
  ],
  "fitted-wardrobes": [
    { id: "greige-wardrobe-with-fluted-doors", title: "Greige wardrobe with fluted doors", line: "Floor-to-ceiling handleless doors with a fluted pair in the centre.", photos: [8, 1] },
    { id: "white-wardrobe-with-lit-glass-doors", title: "White wardrobe with lit glass doors", line: "A white wardrobe with glass doors and lit shelves inside.", photos: [2, 10] },
    { id: "white-wardrobe-with-black-glass", title: "White wardrobe with black glass", line: "White doors with long black handles and a black glass pair in the centre.", photos: [6, 3] },
    { id: "glass-display-wardrobe", title: "Glass-door display wardrobe", line: "A wall of glass doors with lit shelves for bags, shoes and folded clothes.", photos: [5, 4], videos: [1] },
    { id: "greige-wardrobe-with-black-glass", title: "Greige wardrobe with black glass", line: "Greige doors with a black glass pair in the centre.", photos: [9, 7] },
    { id: "grey-wardrobe-with-lit-niche", title: "Grey wardrobe with lit niche", line: "A textured grey wardrobe wall with a lit niche, drawers and open shelves.", photos: [11, 12] },
    { id: "oak-wardrobe-with-bronze-glass", title: "Oak wardrobe with bronze glass", line: "Oak doors in the centre with lit bronze glass sections either side.", photos: [13] },
  ],
  "dressing-tables": [
    { id: "kids-dressing-unit", title: "Kids dressing and display unit", line: "A dressing table with a house-shaped mirror between lit display towers in pink.", photos: [2, 1, 3], videos: [1, 2, 3] },
    { id: "round-mirror-dressing-table", title: "Round mirror dressing table", line: "A floating dressing shelf with a round mirror beside a fluted wardrobe.", photos: [4, 5] },
    { id: "backlit-mirror-vanity", title: "Backlit mirror vanity", line: "A round backlit mirror over a floating vanity with a lit shelf tower.", photos: [6, 7] },
  ],
  "dining-tables": [
    { id: "oval-table-with-boucle-chairs", title: "Oval table with boucle chairs", line: "A white oval table on a fluted base with boucle chairs on black frames.", photos: [1, 2, 14] },
    { id: "oval-marble-table", title: "Oval marble dining table", line: "An oval table with a veined marble top and upholstered chairs.", photos: [3, 5] },
    { id: "long-oval-table-dark-base", title: "Long oval table on dark base", line: "A long oval top on dark fluted bases, with boucle chairs.", photos: [4] },
    { id: "round-marble-table-black-base", title: "Round marble table on black base", line: "A round marble top on a black base with four chairs.", photos: [6, 7] },
    { id: "round-white-fluted-table", title: "Round white fluted table", line: "A round white table on a fluted base with boucle chairs.", photos: [8] },
    { id: "round-grey-table", title: "Round grey dining table", line: "A round grey table on a pedestal with upholstered chairs.", photos: [9] },
    { id: "beige-oval-table-with-white-chairs", title: "Beige oval table with white chairs", line: "A beige oval top on fluted bases with sculpted white chairs.", photos: [10, 11] },
    { id: "oval-table-with-walnut-chairs", title: "Oval table with walnut chairs", line: "An oval stone-look top with chairs on walnut frames.", photos: [12, 13] },
    { id: "round-marble-table-white-base", title: "Round marble table on white base", line: "A round marble top on a white fluted base.", photos: [16, 15] },
    { id: "large-round-marble-table", title: "Large round marble table", line: "A large round marble top on a white fluted base.", photos: [17, 18] },
    { id: "fluted-round-table", title: "Fluted round table", line: "A round table on a wide fluted drum base.", photos: [19] },
  ],
  curtains: [
    { id: "beige-curtains-with-sheers", title: "Beige curtains with sheers", line: "Full-height beige curtains over white sheers.", photos: [1, 7] },
    { id: "bay-window-curtains", title: "Bay window curtains", line: "Curtains and sheers fitted around a curved bay of windows.", photos: [2] },
    { id: "grey-curtains-with-pelmet", title: "Grey curtains with pelmet", line: "Grey curtains and sheers under a straight pelmet.", photos: [3] },
    { id: "blue-and-cream-curtains", title: "Blue and cream curtains", line: "Tall curtains in alternating blue and cream panels.", photos: [4] },
    { id: "cream-wave-curtains", title: "Cream wave curtains", line: "Cream wave curtains across the full width of the room.", photos: [5], videos: [2] },
    { id: "grey-wave-curtains", title: "Grey wave curtains", line: "Floor-to-ceiling wave curtains in grey from a recessed track.", photos: [6], videos: [3] },
    { id: "curtains-with-tieback", title: "Curtains with tieback", line: "A grey curtain gathered with a tieback over white sheers.", photos: [8] },
    { id: "taupe-blackout-with-sheers", title: "Taupe blackout with sheers", line: "Taupe blackout curtains with white sheers behind.", photos: [9, 11] },
    { id: "living-room-layered-curtains", title: "Living room layered curtains", line: "Grey curtains and white sheers around a balcony door.", photos: [10] },
    { id: "textured-beige-curtains", title: "Textured beige curtains", line: "Wave curtains in a textured beige fabric.", photos: [12] },
    { id: "bedroom-sheers", title: "Bedroom sheers with side curtains", line: "Sheers across a wide bedroom window with curtains at the sides.", photos: [13] },
    { id: "navy-curtains-with-tiebacks", title: "Navy curtains with tiebacks", line: "Navy curtains held back over patterned sheers.", photos: [14] },
    { id: "beige-curtains-under-cove-light", title: "Beige curtains under cove lighting", line: "Beige curtains and sheers under a lit ceiling cove.", photos: [15] },
    { id: "taupe-curtains-with-centre-sheers", title: "Taupe curtains with centre sheers", line: "Taupe curtains across a wide wall with sheers in the centre.", photos: [16, 17] },
    { id: "gold-curtains", title: "Gold curtains", line: "Gold curtains framing a balcony door.", photos: [18] },
    { id: "beige-blackout-curtains", title: "Beige blackout curtains", line: "Full-height blackout curtains in beige.", videos: [1] },
  ],
};

const pad = (n: number) => String(n).padStart(2, "0");

function build(): Product[] {
  const out: Product[] = [];
  for (const category of categories) {
    const list = defs[category.slug];
    if (!list) throw new Error("No products defined for " + category.slug);
    const usedP = new Set<number>();
    const usedV = new Set<number>();
    for (const d of list) {
      const photos = (d.photos ?? []).map((n) => {
        const src = "/images/" + category.slug + "/" + category.slug + "-" + pad(n) + ".jpg";
        const hit = category.images.find((i) => i.src === src);
        if (!hit) throw new Error("Missing photo " + src);
        if (usedP.has(n)) throw new Error("Photo used twice: " + src);
        usedP.add(n);
        return hit;
      });
      const videos = (d.videos ?? []).map((n) => {
        const src = "/video/" + category.slug + "/" + category.slug + "-" + pad(n) + ".mp4";
        const hit = category.videos.find((v) => v.src === src);
        if (!hit) throw new Error("Missing video " + src);
        if (usedV.has(n)) throw new Error("Video used twice: " + src);
        usedV.add(n);
        return hit;
      });
      const cover: GalleryImage = photos[0] ?? { src: videos[0].poster, w: videos[0].w, h: videos[0].h, alt: videos[0].alt };
      out.push({
        id: d.id, slug: category.slug, category, title: d.title, line: d.line, cover, photos, videos,
        type: photos[0]?.type, href: "/collections/" + category.slug + "/" + d.id,
      });
    }
    // The client wants every asset shown: stop the build if one was left out.
    if (usedP.size !== category.images.length) throw new Error(category.slug + ": " + (category.images.length - usedP.size) + " photo(s) not placed in a product");
    if (usedV.size !== category.videos.length) throw new Error(category.slug + ": " + (category.videos.length - usedV.size) + " video(s) not placed in a product");
  }
  return out;
}

export const products: Product[] = build();

export const productsOf = (slug: string) => products.filter((p) => p.slug === slug);
export const getProduct = (slug: string, id: string) => products.find((p) => p.slug === slug && p.id === id);

/** "4 photos", "2 photos + video", "Video". */
export const mediaLabel = (p: Product) => {
  const ph = p.photos.length;
  const v = p.videos.length;
  const a = ph ? ph + (ph === 1 ? " photo" : " photos") : "";
  const b = v ? (v === 1 ? "video" : v + " videos") : "";
  if (a && b) return a + " + " + b;
  return a || b.charAt(0).toUpperCase() + b.slice(1);
};
