"use client";

import { WHATSAPP_LINK } from "@/lib/site";

/** Shown instead of a blank page when something on the client throws. Reloading fetches a fresh copy of the site. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-xl flex-col items-start justify-center px-6 py-16">
      <h1 className="ruled-heading font-serif text-display-md text-charcoal">Something went wrong loading this page.</h1>
      <p className="mt-4 text-[16px] leading-relaxed text-taupe">
        This usually clears with a reload. If it keeps happening, message us on WhatsApp and we will help you directly.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => window.location.reload()} className="btn-dark">
          Reload the page
        </button>
        <button type="button" onClick={reset} className="btn-line">
          Try again
        </button>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-line">
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
