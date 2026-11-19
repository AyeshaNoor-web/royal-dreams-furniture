import type { Metadata } from "next";
import LegalPage from "@/components/shared/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy (draft)",
  description: "How Modern Furniture Collection handles enquiry details, chat messages and estimator inputs.",
  robots: { index: false, follow: false }, // Remove once the lawyer has approved the text.
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What we collect when you contact us through this website, why, and how long we keep it."
      updated="19 November 2026"
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              [LEGAL ENTITY NAME], trading as {SITE.name}, licence number [TRADE LICENCE NUMBER], [REGISTERED ADDRESS], United Arab Emirates. Questions about this
              policy: [PRIVACY CONTACT EMAIL] or WhatsApp {SITE.phones[0].display}.
            </p>
          ),
        },
        {
          heading: "What we collect and why",
          body: (
            <>
              <p>We only collect what you type or send us. There are no accounts and no advertising trackers on this site.</p>
              <ul>
                <li>Enquiry forms and the budget estimator: your name, phone or WhatsApp number, email if you add it, your message and the estimate summary. Used to reply to you, arrange a visit and prepare a quotation.</li>
                <li>Website chat: the questions you type are answered inside your browser by matching them to our prepared answers. They are kept in your browser for the visit (session storage) and are not sent to us unless you choose to send them on WhatsApp or through the call-back form.</li>
                <li>WhatsApp: when you tap a WhatsApp button, the pre-written message opens in your WhatsApp app. Nothing is sent until you press send there. WhatsApp&apos;s own privacy policy applies to that conversation.</li>
                <li>Technical data: our hosting provider records IP addresses in server logs for security and rate limiting. We do not combine them with your enquiry.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Legal basis",
          body: <p>We process enquiry details to take steps at your request before a contract, and to pursue our legitimate interest in answering enquiries and protecting the site from abuse. Where we ask for a tick box, we rely on your consent, which you can withdraw by messaging us.</p>,
        },
        {
          heading: "Who else sees it",
          body: (
            <ul>
              <li>Email delivery: [EMAIL PROVIDER, e.g. Resend], which transmits form submissions to our inbox.</li>
              <li>Hosting: Vercel Inc., which serves the website and holds server logs.</li>
              <li>Bot protection and rate limiting: Cloudflare (Turnstile) and Upstash, which see your IP address and a challenge token, not your enquiry.</li>
              <li>We do not sell personal data and do not share it with advertisers.</li>
            </ul>
          ),
        },
        {
          heading: "How long we keep it",
          body: <p>Enquiries are kept for [RETENTION PERIOD, e.g. 24 months] after our last contact, or longer where a quotation became an order and accounting law requires it. Chat messages stay only in your browser and are removed when the tab is closed.</p>,
        },
        {
          heading: "Your rights",
          body: <p>You can ask for a copy of the personal data we hold about you, ask us to correct or delete it, or object to our use of it. Message [PRIVACY CONTACT EMAIL]. We answer within 30 days. This policy follows UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data.</p>,
        },
        {
          heading: "Cookies",
          body: (
            <>
              <p>This website sets no advertising or analytics cookies, so there is no cookie banner. It uses:</p>
              <ul>
                <li>Session storage in your browser to keep the chat conversation open while you move between pages. It is deleted when the tab closes.</li>
                <li>A short-lived cookie set by Cloudflare Turnstile when you submit a form, used only to tell people from bots.</li>
              </ul>
              <p>If analytics are added later, this section and the site will be updated first.</p>
            </>
          ),
        },
        {
          heading: "Changes",
          body: <p>We will post any change here with a new date. Significant changes will be mentioned on the contact page.</p>,
        },
      ]}
    />
  );
}
