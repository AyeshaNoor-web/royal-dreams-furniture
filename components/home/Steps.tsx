import Reveal from "@/components/motion/Reveal";
import PlanButton from "@/components/plan/PlanButton";

const steps = [
  { n: "1", where: "On WhatsApp", title: "Tell us about the room", text: "Send a few photos or a floor plan. Within a working day you have first ideas, a rough budget and a time for us to visit." },
  { n: "2", where: "At your home", title: "We measure and design", text: "We measure every wall and opening, then show you the piece in 3D, in your own room. Change anything you like." },
  { n: "3", where: "In our Dubai workshop", title: "We build it", text: "Made in the veneer, lacquer, stone or fabric you chose. Nothing is cut until you approve the design and the price." },
  { n: "4", where: "At your home", title: "We fit it", text: "Our own team installs, aligns every door and light, and clears the packaging. You get a finished room, not a delivery." },
];

/** Four steps, with the free ones marked: the visitor sees how far they can go before spending anything. */
export default function Steps() {
  return (
    <section className="px-3 lg:px-5">
      <div className="pine-stage on-dark mx-auto max-w-[92rem] rounded-[2.25rem] px-5 py-12 text-beige sm:px-8 lg:rounded-[3.5rem] lg:px-14 lg:py-20">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="max-w-3xl font-serif text-display-lg text-beige">From a WhatsApp photo to a <span className="accent text-gold">finished</span> room</h2>
          </div>
          <p className="max-w-xs text-[15px] text-beige/75">The first two steps cost nothing. You decide only after you have seen the 3D design and the quotation.</p>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={0.07 * i} className="relative flex h-full flex-col rounded-4xl border border-beige/12 bg-beige/[0.06] p-6 lg:p-7">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-[72px] font-bold leading-[0.8] tracking-tighter text-gold lg:text-[88px]">{s.n}</span>
                  {i < 2 && <span className="rounded-full bg-whatsapp px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-ink">Free</span>}
                </div>
                <p className="mt-6 text-[12.5px] font-bold uppercase tracking-[0.1em] text-beige/60">{s.where}</p>
                <h3 className="mt-1.5 font-serif text-[24px] font-semibold text-beige">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-beige/75">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:mt-10">
          <PlanButton>Start with step one <span aria-hidden="true">&rarr;</span></PlanButton>
          <p className="text-[14px] text-beige/70">Takes about a minute. No payment, no obligation.</p>
        </Reveal>
      </div>
    </section>
  );
}
