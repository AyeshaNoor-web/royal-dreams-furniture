import Reveal from "@/components/motion/Reveal";
import { areas, whatsappLink } from "@/lib/site";

export default function WhereWeWork() {
  return (
    <section className="bg-beige py-12 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <Reveal className="lg:col-span-5">
          <h2 className="ruled-heading font-serif text-display-md text-charcoal">Where we work</h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-taupe">
            Consultations, measuring and installation across all seven Emirates, from our workshop in Dubai. Our showroom is in Al Butina, Sharjah, and visits are by appointment.
          </p>
          <a href={whatsappLink("Hello, I would like to book a home visit. I am in ")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-link hover:text-gold-text">
            Ask about a visit in your area
          </a>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:col-span-7">
          {[areas.near, areas.far].map((a, i) => (
            <Reveal key={a.title} delay={0.08 * (i + 1)}>
              <p className="border-b border-border pb-3 text-[14px] text-taupe">{a.title}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 sm:flex-col sm:gap-0">
                {a.places.map((p) => (
                  <li key={p} className="font-serif text-xl text-charcoal sm:border-b sm:border-border/60 sm:py-3 sm:text-2xl">{p}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
