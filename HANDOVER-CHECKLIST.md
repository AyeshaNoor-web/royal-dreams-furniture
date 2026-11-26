# Handover checklist: Modern Furniture Collection

Status as of 14 Nov 2026. Tick items off as they are completed. Items marked **needs client** cannot be finished without information or an account from Modern Furniture Collection.

## 1. Code and build

- [x] Production build passes locally and on Vercel (23 routes, no type errors).
- [x] Next.js upgraded to 15.5.29, which closes the vulnerability Vercel was flagging.
- [x] Unused components, old hero assets and leftover font files removed from the repository.
- [x] Raw client media folders are git-ignored; only web-sized copies are committed.
- [x] Redeployed on Vercel; the live build carries the upgraded Next.js and the latest homepage.
- [ ] Review remaining `npm audit` advisories. They are in the image library used at build time, not in anything served to visitors. Re-run `npm audit` after the next Next.js release.

## 2. Domain and hosting

- [ ] **Check now:** on 17 Nov 2026 the live site answered every automated request with a Vercel "Security Checkpoint" (code 29), and a phone showed "Application error: a client-side exception" at the same time. Open the Vercel project, Firewall tab: if "Attack Challenge Mode" is switched on, switch it off, since it challenges the JavaScript requests real visitors' browsers make and the page then fails to load. Consider enabling Skew Protection (Settings, Advanced) so a phone that loaded the site before a deploy can still fetch the old scripts after it.

- [x] Domain added to the Vercel project and DNS records set at the registrar.
- [x] Both hosts resolve to Vercel. The bare domain redirects (308) to `www`, and plain HTTP redirects to HTTPS.
- [x] Canonical is `www`, matching the Vercel redirect. Set in the code on 14 Nov.
- [x] Site URL set to `https://www.modernfurniturecollection.online` in `lib/site.ts`. This drives the sitemap, canonical tags, Open Graph tags and social previews.
- [x] `/sitemap.xml` and `/robots.txt` on the live domain list the real domain.
- [x] HTTPS is active on both hosts with HSTS enabled.

## 3. Enquiries and email (the whole point of the site)

- [ ] **Needs client:** a Resend account, or confirm which email service to use. The form posts to `/api/contact` and currently returns success without sending because the keys are empty.
- [ ] Add three environment variables in Vercel (Settings, Environment Variables), for Production: `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (the inbox that should receive enquiries), `CONTACT_FROM_EMAIL`.
- [ ] Verify the sending domain in Resend so emails are not marked as spam, or use their default sender for the first weeks.
- [ ] Redeploy, submit the contact form on the live site, and confirm the email arrives with all fields (name, phone, email, interest, message).
- [ ] Submit the homepage quick form and the footer newsletter box, and confirm both arrive. (Verified on 14 Nov that the API accepts valid input and rejects bad input on the live site; delivery still waits on the Resend keys.)
- [ ] **Needs client:** confirm 050 433 5872 is the number that should receive WhatsApp enquiries, and that someone monitors it. Every button on the site points there.
- [ ] Tap "Get a quote" on a phone and confirm WhatsApp opens with the pre-filled message.
- [ ] The chat assistant ("Ask us", bottom right of every page, added 16 Nov 2026) answers only from the facts already on the site: `lib/chatbot-intents.ts` builds its answers from the FAQ, the quotation factors, the collection descriptions and `lib/site.ts`. It never quotes a price, promises stock or gives a date. When it cannot answer, or on price, stock and timing questions, it asks for a name (phone optional) and the green button opens WhatsApp with the name and the question already written, because WhatsApp is the team's working channel. If a phone number was given the same details are also posted to `/api/contact` with source "chatbot" as a record, which only delivers once the Resend keys are set. Test on a phone: ask "warranty", type a name, tap Continue on WhatsApp, and confirm WhatsApp opens with the message.
- [ ] The green WhatsApp pill was replaced by the chat bubble so phones do not get two floating buttons. WhatsApp is the first quick button inside the chat and the icon in its header. If the client wants the green pill back as well, `components/WhatsAppFloat.tsx` is still on disk.

## 4. Content accuracy (needs client sign-off)

- [ ] The Instagram links go to `@modern_furniture_collection` only; the earlier `@modern_furniture_interiors` account was removed on 15 Nov 2026 at the client's request. Confirm.
- [ ] The homepage FAQ ("Common questions") and the "What shapes your quotation" section were written from the promises already on the site: free visit, 3D design, own workshop and fitters, samples brought to the home, reply within one working day, all seven Emirates. Read both and correct anything the team does not actually do.
- [ ] "Where we work" lists Dubai, Sharjah and Ajman as nearest the workshop and Abu Dhabi, Al Ain, Ras Al Khaimah, Umm Al Quwain and Fujairah as further afield. Confirm.
- [ ] Showroom is "Al Butina, Sharjah" (supplied 16 Nov 2026) on the contact page, footer, "Where we work", the FAQ and the chat assistant, with a Google Maps link to the area. **Needs client:** the street or building name so the map pin is exact, and opening hours. Also confirm the workshop itself is in Dubai, as the site says in several places; if it is in Sharjah too, say so and the wording changes.
- [ ] **Needs client:** read the chat assistant's answers (`lib/chatbot-intents.ts`, the `answer` fields) and correct anything the team does not do. The "Where we work" and opening-hours answers say "showroom visits by appointment" because no address or hours have been supplied; add them there and on the contact page together.
- [ ] **Needs client:** three to six real reviews for the "What clients say" section on the homepage. The section is built and hidden until `lib/reviews.ts` has entries. For each: the client's own words (a WhatsApp message after installation, an Instagram comment or a Google review), first name or initials, area, what was made, and their permission to publish. No invented reviews: they are misleading advertising under UAE consumer protection law and the site has none.
- [ ] Reply-time promise is "within one working day" on the contact page and forms. Confirm the team can keep it, or change the wording.
- [ ] Process claims on the homepage: free home consultation, 3D design before production, nothing built until approved, own fitters. Confirm each is true.
- [ ] Collection descriptions mention walnut and oak veneers, lacquer, marble and stone tops, boucle, velvet and leather. Remove any the workshop does not offer.
- [ ] Photo captions and alt text were written from what is visible in the photos. Correct any that misname a finish or a piece.
- [ ] All 191 photos and 27 videos supplied so far are on the site. The third batch (15 Nov) was 13 new media-wall, shelving and dressing-area photos; one of them, `dressing-tables-07.jpg`, is a mirror selfie with a recognisable face, so ask whether it should stay. Confirm there is nothing the client would rather not show publicly, such as a photo with a person in it.

## 5. Brand and legal

- [ ] Logo in the header, footer, favicon and social preview is the cutout from the file the client supplied. Confirm they are happy with it, or ask them for the original vector file for a cleaner favicon.
- [ ] Footer copyright reads "Modern Furniture Collection". Confirm the registered trading name.
- [ ] **Needs decision:** a privacy notice page for the contact form. UAE practice is to state what the form data is used for. I can add a short page if wanted.
- [ ] Remove or replace the `og-image.jpg` social preview if the client prefers a photo over the logo card.

## 6. Final checks on the live domain

- [ ] Open every page on a phone: home, collections, each of the 11 collection pages, gallery with a filter applied, about, contact, and a wrong address for the 404 page. (All routes verified to return correctly on the live domain on 14 Nov; the visual check on a phone is still yours to do.)
- [ ] Play one video on a phone over mobile data and confirm it loads in reasonable time.
- [ ] Run Google PageSpeed Insights on the home and a collection page; fix anything scoring red. (15 Nov: gallery and collection pages are now static files served from the edge instead of being rendered per visit, optimised images are cached for a year in the browser and on Vercel, and images are served as WebP only because AVIF encoding was taking 4 to 19 seconds on first request.)
- [ ] Rule for anyone adding photos later: never overwrite an image or video file in place. Browsers keep them for a year, so a changed picture needs a new file name.
- [ ] Share the home link in a WhatsApp chat and confirm the preview card shows the logo and title.
- [ ] Add the site to Google Search Console and submit the sitemap.
- [ ] **Needs decision:** analytics. Vercel Analytics is a one-click add; Google Analytics needs a property ID. Tell me which and I will wire it in.

## 7. Handover pack for the client

- [ ] Repository access or a zip of the code.
- [ ] Vercel project transferred to, or shared with, the client's account.
- [ ] Domain registrar login stays with whoever will renew it; note the renewal date.
- [ ] A one-page guide on how to update content: photos live in `public/images/<collection>/`, text in `lib/gallery.ts` and `lib/site.ts`, and any change pushed to `main` deploys automatically.
- [ ] Confirm who will handle future changes and how to reach them.

## 8. Budget estimator (branch feature/estimator-assistant)

- [x] 21 Nov 2026: cabinet rates received (simple wood doors AED 700, wood-framed glass AED 900, aluminium-framed glass AED 1,100 per square metre of front) and applied to fitted wardrobes and walk-in closets as exact rates with door types as the tiers. Confirm whether the same rates apply to TV unit, display shelving and kitchen cabinets, whether they include installation, and what the extras (lighting, island) cost.
- [ ] **Needs client, blocks production:** real rates for the other 9 collections. Open `config/pricing.config.ts`. For each collection set the three tiers' min and max AED per unit (seat, piece, metre, square metre or window), adjust the size bounds and the optional extras, then set `PLACEHOLDER_DATA = false`. Every number in the file today is a placeholder chosen only so the flow can be tested.
- [ ] Confirm the tier descriptions (Standard, Premium, Bespoke), the "included" and "not included" lists, and whether price changes by emirate (`emiratePricing.enabled`, off by default).
- [ ] Vercel environment variables: `ESTIMATOR_ENABLED=true` to show the /estimator page, the home section and the chat links. A production build fails while this is true and placeholders remain. Preview builds always pass.
- [ ] Rate limiting: create an Upstash Redis database from the Vercel Marketplace and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Without them a per-instance memory limiter runs and a warning is logged once.
- [ ] Bot protection: create a Cloudflare Turnstile widget for the domain and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. Without them the widget is not shown and tokens are not checked.
- [ ] `/api/contact` now answers 503 while the Resend keys are missing and the forms tell the visitor to use WhatsApp. Nothing is silently lost, but nothing is emailed either until section 3 is done.
- [ ] Email deliverability once Resend is live: add the DNS records Resend shows for the sending domain. SPF: a TXT record on the sending subdomain, `v=spf1 include:amazonses.com ~all` (Resend's value, copy from their dashboard). DKIM: the three CNAME records Resend lists. DMARC: TXT on `_dmarc`, start with `v=DMARC1; p=none; rua=mailto:[REPORTS MAILBOX]`, move to `p=quarantine` after two clean weeks.
- [ ] Legal drafts at /privacy-policy and /terms carry a DRAFT strip and `noindex`. Replace the [square bracket] items, have the lawyer review, then remove the strip, the `robots` line in each page and add both pages to `app/sitemap.ts`.
- [ ] Knowledge for the assistant (Phase 2) lives in `content/knowledge.md`. Replace every PLACEHOLDER line before the AI is enabled.

## 9. AI assistant (branch feature/estimator-assistant, Phase 2)

- [ ] **Needs client:** the assistant's name. It is "Noor" as a placeholder, set once in `lib/site.ts` (`SITE.assistant`) and used by the bubble, the greeting card, the chat header, the "Meet Noor" home section and the AI's own introduction. The face is an original SVG in `components/chat/Mascot.tsx`; change the colours or swap it for a commissioned illustration there. Whatever the name, the assistant says it is an AI assistant whenever someone asks, which is both the brief and good practice under UAE consumer rules.
- [ ] Off by default. The same bubble runs the keyword matcher until two Vercel variables are set: `AI_CHAT_ENABLED=true` and `ANTHROPIC_API_KEY`. `CHAT_MODEL` defaults to `claude-haiku-5-5`. The assistant also falls back to the matcher by itself if the API answers 503, and shows a WhatsApp fallback on any timeout or error.
- [ ] **Needs client, before enabling:** replace every PLACEHOLDER line in `content/knowledge.md` (showroom hours and street, lead email, support hours, brand voice, what is not included). The assistant is told not to state placeholder lines, but the answers are better with the facts in.
- [ ] **Cost:** this is a metered API. The client was told the chatbot has no monthly cost, so agree a budget first. Each reply is capped at 400 output tokens and each visitor at 20 messages a minute; the knowledge text is sent with every call.
- [ ] Guardrails: answers only from `content/knowledge.md` and tool results; prices only through the shared pricing engine, always as a range with "indicative" and "excludes 5% VAT"; no discounts, dates, stock or warranty; English only; declines off-topic; never reveals its instructions; user text and tool output are wrapped as untrusted; leads are sent only after explicit consent in the chat and are validated server-side. Transcripts are not stored anywhere; logs carry no message text, phone numbers or emails.
- [ ] Before go-live run `node scripts/chat-redteam.mjs https://www.modernfurniturecollection.online` with the assistant enabled on a preview deployment. It sends 25 adversarial prompts and prints PASS or FAIL per case. Review any FAIL and tighten `lib/ai/prompt.ts`.
- [ ] Test on a real iPhone: open the chat, tap the input, confirm the card lifts above the keyboard and the input stays visible; tap a collection link, confirm the page opens with a "Back to chat" pill; tap it, confirm the conversation is intact.

## 10. Client-requested changes, 20 Nov 2026 (branch feature/estimator-assistant)

- [ ] Theme moved to warm off-white (`tailwind.config.ts`: surfaces #FBF9F5, #F4EFE8, #E7DFD4; border #DDD3C7). Charcoal text and gold accents unchanged. WhatsApp buttons use the brand teal #128C7E because white on the light green fails WCAG AA (2:1). Confirm the client is happy with the lighter look.
- [ ] "Book a free visit" and "Get a quote" buttons sit in the navbar, hero, every collection page, the estimator result and the chat card, plus a phone-only bottom bar. Both open WhatsApp with a pre-written message (`VISIT_LINK`, `QUOTE_LINK` in `lib/site.ts`). The visit message makes no promise about hours or coverage; add those to `lib/site.ts` and `content/knowledge.md` when the client supplies them.
- [ ] Estimator quick-start presets (1-bed, 2-bed, 3-bed, 5-bed) are PLACEHOLDER baskets in `config/pricing.config.ts` (`presets`). Ask the client what a typical home of each size actually orders and replace the sizes.
- [ ] "Custom or ready-made?" on the TV unit, fitted wardrobe and walk-in closet pages, and the four-step "How it goes" timeline on every collection page, are PLACEHOLDER copy in `lib/collection-notes.ts`, written in the site's voice from facts already on the site. The client should rewrite them in their own words. Both sections carry a `data-placeholder-copy` attribute until then.

## 11. Black-and-gold theme and project sets, 26 Nov 2026 (branch feature/estimator-assistant)

- [ ] The client asked for the dark look back (screenshot of the earlier black site with the gold wave header). Tokens in `tailwind.config.ts` are now near-black surfaces, cream text and the brand gold; the token names (`beige` for surfaces, `charcoal` for text) are unchanged so every component kept working. Contrast was recomputed: cream on black 16.6:1, muted text 8.9:1, gold text 10.3:1, black on gold buttons 7.1:1, white on the WhatsApp teal 5.6:1. If the client changes their mind again, the off-white values are in the git history of commit aa5ad14.
- [ ] The gold wave texture (`.wave-gold`, and the hero background) is an inline SVG of flowing lines, no image file. Opacity and spacing are set in `app/globals.css`.
- [ ] Project sets: photos and videos of one project share a `set` id in `lib/gallery.ts`. Opening any photo of a set shows the others as thumbnails under it, including the video, which plays inside the lightbox. First set: the walnut-and-black-marble media wall, three photos and one video received on 26 Nov (files `tv-units-15` to `17.jpg`, `tv-units-10.mp4`). To group future projects, add the same `set` value to each entry.

