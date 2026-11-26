import type { GalleryVideo } from "@/lib/gallery";

/** Short project clips: poster shown until the visitor presses play; nothing autoplays. */
export default function VideoGrid({ videos, title = "Watch the work" }: { videos: GalleryVideo[]; title?: string }) {
  if (!videos.length) return null;
  return (
    <section className="py-section-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="mb-8 font-serif text-3xl text-charcoal">{title}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {videos.map((v) => (
            <figure key={v.src} className="overflow-hidden rounded-3xl bg-ink">
              <video
                controls
                preload="none"
                playsInline
                muted
                poster={v.poster}
                width={v.w}
                height={v.h}
                className="aspect-[9/16] w-full object-cover"
                aria-label={v.alt}
              >
                <source src={v.src} type="video/mp4" />
              </video>
              <figcaption className="flex items-baseline justify-between gap-3 px-3 py-2.5 text-[13px] text-beige/70">
                <span className="truncate">{v.alt}</span>
                <span className="shrink-0 tabular-nums">{v.duration}s</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
