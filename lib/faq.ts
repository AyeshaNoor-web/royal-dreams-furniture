// Answers are written only from promises the site already makes elsewhere (free visit, 3D design,
// own workshop and fitters, finishes list, reply time). Add prices or lead times here only once
// the client has confirmed them.
export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Is the home visit really free?",
    a: "Yes. We come to your home, measure the room and prepare a 3D design with no obligation. You only decide once you have seen the design and the quotation.",
  },
  {
    q: "Can I get a price before you visit?",
    a: "Send a photo of the room and rough sizes on WhatsApp and we will reply within a working day with first ideas and a rough budget. The exact quotation follows the site measurement.",
  },
  {
    q: "Do you make the furniture yourselves?",
    a: "Yes. Everything is built in our own workshop in Dubai. The team that measures your room also designs the piece, builds it and installs it, so nothing is passed to a subcontractor.",
  },
  {
    q: "Which areas do you cover?",
    a: "We measure and install across all seven Emirates. Dubai, Sharjah and Ajman are closest to the workshop and have the most visit slots; Abu Dhabi, Al Ain, Ras Al Khaimah, Umm Al Quwain and Fujairah are visited by arrangement. Our showroom is in Al Butina, Sharjah, and visits there are by appointment.",
  },
  {
    q: "Can I choose the fabric and finish?",
    a: "Every finish is your choice: walnut and oak veneers, lacquer in any colour, marble and stone tops, boucle, velvet and leather. We bring samples to your home so you can judge them in your own light.",
  },
  {
    q: "What if I want changes after seeing the 3D design?",
    a: "Change anything you like. Dimensions, finishes, lighting and layout are all adjusted in the design, and nothing is built until you approve the final version.",
  },
  {
    q: "Can you make something I saw on Instagram?",
    a: "Usually, yes. Send us the picture and we will design a version that fits your room, your sizes and the finishes you prefer.",
  },
  {
    q: "Who installs it?",
    a: "Our own fitters. They install the piece, align every door and light, clear the packaging and leave you a finished room rather than a delivery.",
  },
  {
    q: "How do I start?",
    a: "Message us on WhatsApp with a photo of the room, or send the contact form. We reply within one working day with ideas and a time to visit.",
  },
];
