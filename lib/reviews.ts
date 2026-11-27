/**
 * Client reviews shown on the homepage. The section stays hidden while this list is empty.
 *
 * Only add words a real client actually wrote or said, with their permission. Good sources are WhatsApp
 * messages after installation, Instagram comments and Google reviews. Keep the client's own wording;
 * fix only spelling. `name` can be a first name or initials if they prefer, `area` is where the piece was
 * fitted and `piece` is what was made for them.
 */
export interface Review {
  quote: string;
  name: string;
  area: string;
  piece: string;
  /** Where the words came from. Optional: leave it out and nothing about the source is shown. */
  source?: "WhatsApp" | "Instagram" | "Google";
  /** Star rating out of 5, only when the client actually gave one (a Google review, for example). */
  stars?: 1 | 2 | 3 | 4 | 5;
}

export const reviews: Review[] = [];
