# Chatbot build plan

A guided assistant in the corner of every page. It answers only from approved questions and answers,
routes visitors to the right page, and hands over to WhatsApp or a name-and-phone form when it cannot help.
No AI, no third-party service, no monthly cost. Written 16 Nov 2026. **Built the same day**: see the status note at the end.

## What the sold description says, and what the site can actually do today

| In the description | Reality on this site | What we do |
|---|---|---|
| "Location & Timings" button | No street address or opening hours exist on the site. The client has not supplied them (see HANDOVER-CHECKLIST, showroom line). | Button reads **Where we work** and answers with Dubai workshop, home visits across all seven Emirates, visits by appointment. The address and hours lines are wired but hidden until the client supplies them. Never invent hours. |
| "your showroom" | The business is a Dubai workshop plus home visits and a 3D design. | Copy says workshop and home visit, not showroom. |
| Buttons to "Sofas, Dining or Contact" | Real routes are `/collections/<slug>`, `/gallery`, `/about`, `/contact`. | Each answer carries one link to a real route. Slugs: sofas, majlis, beds, kids-bed, dining-tables, coffee-tables, curtains, tv-units, wall-paneling, walk-in-closets, fitted-wardrobes, dressing-tables, display-shelving, custom. |
| "sends it to your email or WhatsApp" | Email goes through `/api/contact`, which only delivers once the Resend keys are set. Until then it returns success with `delivered: false`. | The lead form posts to the existing API **and** shows a WhatsApp button with the name, phone and question pre-filled. WhatsApp works today with no keys. When the API reports `delivered: false`, the bot nudges the visitor to tap WhatsApp rather than claiming the message was sent. |
| "up to 10 approved FAQs" | `lib/faq.ts` already has 9 approved answers, no prices or lead times. | Reuse those 9 as the bot's answers (one source of truth). Add one: where we work. Keywords and link targets are added per FAQ in a separate file so `faq.ts` stays clean. |
| "never quotes prices or promises stock or delivery dates" | Already true of the 9 answers. | Fallback for price, stock, timing and delivery words is a fixed line: the team confirms that after the home visit, plus the lead form. |

## Architecture

Zero new dependencies. Framer Motion, Tailwind and the existing API are enough.

```
lib/
  chatbot.ts              intents (keywords + answer + link), the matcher, the welcome copy
components/chat/
  ChatWidget.tsx          bubble + open/close state + sessionStorage persistence (client)
  ChatPanel.tsx           header, message list (aria-live), quick buttons, composer
  ChatMessage.tsx         one bubble, bot or visitor, with optional link button
  ChatLeadForm.tsx        name + phone, posts to /api/contact, WhatsApp fallback button
app/layout.tsx            mounts <ChatWidget /> in place of <WhatsAppFloat />
app/api/contact/route.ts  accepts source "chatbot" (already generic), message carries the unanswered question
```

Each component stays under 150 lines.

### Intents and matching (`lib/chatbot.ts`)

```ts
interface Intent {
  id: string;
  keywords: string[];          // lowercase stems and phrases, e.g. "sofa", "couch", "majlis", "l shape"
  answer: string;              // from lib/faq.ts where one exists
  link?: { label: string; href: string };
}
```

Matcher is a pure function: lowercase, strip punctuation, collapse plurals (`sofas` to `sofa`), then score each
intent by keyword hits, phrases weighted above single words. Return the best intent above a small threshold, or null.
Deterministic, so it can be tested with a plain list of sample phrases.

Intent groups, about 20 in total:

- **Product routing** (14): one per collection slug. "sofa", "couch", "majlis", "bed", "kids bed", "bunk", "dining",
  "table", "coffee table", "curtain", "blind", "tv unit", "media wall", "paneling", "closet", "wardrobe", "dressing",
  "shelving", "kitchen", "joinery". Answer: one line from the collection blurb plus a link to that collection page.
- **FAQ** (9 existing + 1): free visit, price before visit, own workshop, areas, finishes, changes after 3D,
  Instagram photo, installation, how to start, where we work.
- **Guardrails** (3): price/cost/AED/how much, stock/ready/available/in stock, delivery/when/days/weeks. Fixed answer,
  no numbers, then the lead form offer.
- **Fallback**: "I do not have an answer for that yet" plus three options: send your number, chat on WhatsApp,
  or contact page.

Keyword lists are English only in version 1. Arabic and Hindi words can be appended to the same lists later with no
code change.

### Widget behaviour

- Closed: a round bubble, bottom right, charcoal on beige, 56 px, `aria-label="Ask us a question"`. Replaces the
  green WhatsApp pill so phones do not get two floating buttons. `WhatsAppFloat.tsx` stays on disk, unmounted.
- Open on desktop: 380 x 600 card above the bubble. Open on a phone: bottom sheet, full width, `85svh`, body scroll
  locked, `env(safe-area-inset-bottom)` respected.
- Welcome message plus four quick buttons: **Browse collections**, **Where we work**, **Ask a question**,
  **Chat on WhatsApp**. Browse collections shows a second row of room chips (Living, Bedroom, Dining, Windows) that
  link to the collection pages. Ask a question focuses the composer.
- Visitor types, presses Enter or Send. Bot replies instantly with the matched answer and one link button.
  Every bot reply ends with "Did that help?" only after a fallback, not after every answer, to keep it quiet.
- Lead form appears inline in the conversation after a fallback, after a guardrail answer, or when the visitor taps
  "Talk to the team". Fields: name, phone. Honeypot field as in the existing forms. Posts
  `{ type: "enquiry", name, phone, message: "Asked in chat: <last question>", source: "chatbot" }`.
  On success with `delivered: true`: "Thanks, we reply within one working day." On `delivered: false`: "Tap below to
  send it on WhatsApp so it reaches us now" with the pre-filled wa.me link. One lead per session.
- Conversation and open state are kept in `sessionStorage` so moving between pages does not reset the chat. Nothing
  is stored server side.
- Motion: panel scales 0.96 to 1 with opacity over 0.3 s on the shared `EASE`; messages fade and rise 8 px; honours
  `useReducedMotion`. Escape closes. Focus moves into the panel on open and back to the bubble on close.
- `role="dialog"` with `aria-label`, message list is `aria-live="polite"`, every quick button is a real button or link.

### Performance

The bubble is a small server-rendered element so there is no flash. The panel (messages, matcher, form) is loaded with
`next/dynamic` on first open, so pages that never open the chat pay for roughly 2 KB. No layout shift: the bubble is
`position: fixed`.

## Build order

1. `lib/chatbot.ts`: intents, matcher, welcome copy. Test script with about 30 sample phrases
   ("sofa", "where are you located", "delivery", "how much", "kids bed", "do you come to Abu Dhabi", "curtains for
   villa", nonsense) run with `node` against the built matcher. Done when every phrase lands on the expected intent
   or the fallback.
2. `ChatWidget`, `ChatPanel`, `ChatMessage`: bubble, panel, welcome, quick buttons, composer, replies and links.
3. `ChatLeadForm` and the API source. Verify against the local `next start` that the API accepts the payload and the
   WhatsApp link opens with the right text.
4. Mount in `app/layout.tsx`, unmount `WhatsAppFloat`, phone bottom sheet, scroll lock, focus and Escape.
5. Verify: headless Chrome at 390 px and 1280 px (open and closed states), keyboard only, build output size, no
   console errors, `npm run lint`. Update HANDOVER-CHECKLIST with the items below. Commit and push.

About a day of work including verification.

## What the client has to provide (goes into HANDOVER-CHECKLIST)

- Confirm the 10 questions and answers. The 9 on the site are the starting set; the bot shows exactly what they approve.
- Street address and opening hours, if they want the "Where we work" answer to carry them. Until then it says
  "visits by appointment".
- Resend keys, or the leads only reach them through the WhatsApp button.

## Decisions taken

- Chat bubble replaces the WhatsApp pill. WhatsApp is the first quick button inside, and the lead form's fallback.
  If the client prefers both, the chat bubble can sit above the pill at `bottom-24` with a one-line change.
- No analytics or logging of conversations in version 1. If the client later wants to know what people ask, the
  fallback questions can be appended to the lead email instead of adding a tracking service.

## Status, 16 Nov 2026

Built and verified locally on a production build. Differences from the plan above:

- The knowledge base is wider than ten FAQs because the brief asked the bot to answer about the whole site: 11 collection
  intents built from the collection descriptions, 4 room intents, the 9 FAQs, price, stock and timing guardrails, contact,
  process, gallery, about, newsletter, joinery, and small talk. About 40 intents in `lib/chatbot-intents.ts`.
- "How much is a sofa" answers with that collection's quotation factors from `lib/quote.ts` and the WhatsApp message asks
  for exactly what the team needs. "Do you deliver to Ajman" is treated as a coverage question, not a date question.
- Files: `lib/chatbot-intents.ts`, `lib/chatbot.ts`, `components/chat/{useChat.ts, ChatWidget.tsx, ChatPanel.tsx,
  ChatMessage.tsx, ChatLeadForm.tsx}`. The matcher has a 48-phrase test in the session scratchpad (`chat-test.cjs`,
  compiled with `tsc` to CommonJS); copy it into the repo if a test runner is ever added.
- The bot's reply is delayed 450 ms with a typing indicator so it reads as a conversation rather than a search box.
