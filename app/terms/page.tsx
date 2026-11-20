import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/shared/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use (draft)",
  description: "Terms for using the Modern Furniture Collection website, its estimator and chat assistant.",
  robots: { index: false, follow: false }, // Remove once the lawyer has approved the text.
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="The rules for using this website, and what our estimates and chat answers do and do not mean."
      updated="19 November 2026"
      sections={[
        {
          heading: "About these terms",
          body: <p>This website is operated by [LEGAL ENTITY NAME], trading as {SITE.name}, [REGISTERED ADDRESS], United Arab Emirates. By using the site you accept these terms. They do not replace the written quotation and order terms you receive before any work begins.</p>,
        },
        {
          heading: "Estimates are indicative",
          body: (
            <>
              <p>The budget estimator gives an indicative range in UAE dirhams, excluding 5% VAT, based only on the size, finish tier and options you select. It is not an offer and not a quotation.</p>
              <ul>
                <li>The final price is set in a written quotation after the free site measurement and your approval of the 3D design.</li>
                <li>The real price can fall outside the range, for example because of access, wall condition, electrical work or finish availability.</li>
                <li>Rates behind the estimator can change without notice.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Chat assistant",
          body: <p>The website chat answers from prepared information about our services. It cannot confirm prices, stock, delivery dates or warranty terms, and anything it says is subject to confirmation by our team in writing. Do not share payment details or sensitive personal information in the chat.</p>,
        },
        {
          heading: "Enquiries and WhatsApp",
          body: <p>Sending an enquiry does not create an order. We aim to reply within one working day but cannot guarantee it. WhatsApp conversations are governed by WhatsApp&apos;s terms as well as ours.</p>,
        },
        {
          heading: "Photographs and content",
          body: <p>Photographs and videos show furniture we have made for clients and are our property or used with permission. You may not copy them for commercial use. Finishes on screen can differ from the real sample, which is why we bring samples to your home.</p>,
        },
        {
          heading: "Acceptable use",
          body: <p>Do not attempt to disrupt the website, submit automated requests, or use the forms or chat for anything other than a genuine enquiry. We may block access to protect the site.</p>,
        },
        {
          heading: "Liability",
          body: <p>The website is provided as is. To the extent permitted by UAE law, we are not liable for loss arising from reliance on an indicative estimate or a chat answer. Nothing here limits liability that cannot be limited by law.</p>,
        },
        {
          heading: "Privacy and law",
          body: (
            <p>
              How we handle your details is set out in the <Link href="/privacy-policy" className="text-link-inline text-charcoal">privacy policy</Link>. These terms are governed by the laws of the United Arab Emirates and the courts of [EMIRATE, e.g. Dubai].
            </p>
          ),
        },
      ]}
    />
  );
}
