"use client";

import { WHATSAPP_LINK } from "@/lib/site";

/** Replaces Next.js's bare "Application error" page when the root layout itself fails. Must render its own html and body. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#E8D5C4", color: "#2A1F18", fontFamily: "Georgia, serif" }}>
        <main style={{ maxWidth: 560, margin: "0 auto", padding: "25vh 24px 48px" }}>
          <h1 style={{ fontSize: 30, fontWeight: 400, lineHeight: 1.15, margin: 0 }}>Something went wrong loading this page.</h1>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, lineHeight: 1.65, color: "#6E584A", marginTop: 16 }}>
            This usually clears with a reload. If it keeps happening, message us on WhatsApp and we will help you directly.
          </p>
          <p style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28, fontFamily: "system-ui, sans-serif", fontSize: 15 }}>
            <button type="button" onClick={() => window.location.reload()} style={{ background: "#2A1F18", color: "#F9F3F0", border: 0, padding: "14px 24px", cursor: "pointer" }}>
              Reload the page
            </button>
            <button type="button" onClick={reset} style={{ background: "transparent", color: "#2A1F18", border: "1px solid #2A1F18", padding: "14px 24px", cursor: "pointer" }}>
              Try again
            </button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "#2A1F18", border: "1px solid #2A1F18", padding: "14px 24px", textDecoration: "none" }}>
              Chat on WhatsApp
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
