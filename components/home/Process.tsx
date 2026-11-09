const steps = [
  { title: "Consult", desc: "Share photos or a floor plan on WhatsApp and we will discuss finishes, lighting and budget." },
  { title: "Measure & Design", desc: "We visit your home, measure precisely and present a 3D design for your approval." },
  { title: "Craft", desc: "Your furniture is built in our own workshop in the veneer, lacquer or glass you selected." },
  { title: "Install", desc: "Our fitters install, align every door and light, and hand over a room that is ready to use." },
];

export default function Process() {
  return (
    <section className="bg-charcoal py-section text-beige-light">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-serif text-display-md">From consultation to installation</h2>
        <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-beige/20 pt-5">
              <h3 className="font-serif text-[1.75rem]"><span className="tabular-nums text-gold">{i + 1}</span> {s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-beige/80">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
