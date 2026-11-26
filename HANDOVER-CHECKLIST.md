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
