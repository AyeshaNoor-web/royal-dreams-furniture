import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import VideoGrid from "@/components/gallery/VideoGrid";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { categories, categoriesInGroup, getCategory, groups } from "@/lib/gallery";
import { whatsappLink } from "@/lib/site";
import CustomOrReadyMade from "@/components/collections/CustomOrReadyMade";
import ProcessTimeline from "@/components/collections/ProcessTimeline";
import Planner from "@/components/plan/Planner";
import PlanButton from "@/components/plan/PlanButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return { title: cat.title, description: cat.description, openGraph: { images: [{ url: cat.cover.src, alt: cat.cover.alt }] } };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const group = groups.find((g) => g.slug === cat.group)!;
  const siblings = categoriesInGroup(cat.group).filter((c) => c.slug !== cat.slug);
  const others = [...siblings, ...categories.filter((c) => c.group !== cat.group)].slice(0, 3);
  const inquiry = whatsappLink("Hello, I would like a free quotation for " + cat.title.toLowerCase() + ". I can send photos and sizes of the room.");

  // When a collection has sub-types (e.g. sofas), the grid filters by type instead of category
  const hasTypes = Boolean(cat.types?.length);
  const images = cat.images.map((img) => ({ ...img, category: hasTypes ? img.type ?? "other" : cat.slug, categoryTitle: cat.title }));

  return (
    <>
      <PageHeader eyebrow={group.title} title={cat.title} intro={cat.description} />

      <section className="pb-section-sm pt-8 lg:pt-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-4xl bg-beige-light p-4 pl-6">
            <p className="text-[15px] text-taupe">{cat.short}</p>
            <div className="flex flex-wrap gap-3">
              <PlanButton pieces={[cat.slug]} className="btn-lit min-h-[48px]">Get a free quote <span aria-hidden="true">&rarr;</span></PlanButton>
              <a href={inquiry} target="_blank" rel="noopener noreferrer" className="btn-wa min-h-[48px]">
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <GalleryGrid images={images} videos={cat.videos} paramKey="type" filters={hasTypes ? cat.types : undefined} />
        </div>
      </section>

      <VideoGrid videos={cat.videos} />

      <CustomOrReadyMade slug={cat.slug} />
      <ProcessTimeline />
      <Planner initial={[cat.slug]} />

      <section className="py-section-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-3xl">More for the {group.title.toLowerCase()}</h2>
            <Link href="/collections" className="text-link px-1 hover:text-gold-text">View all</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={"/collections/" + o.slug} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-4xl bg-beige-dark">
                  <Image src={o.cover.src} alt={o.cover.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-3 font-serif text-xl group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{o.title}</p>
                <p className="text-[15px] text-taupe">{o.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
