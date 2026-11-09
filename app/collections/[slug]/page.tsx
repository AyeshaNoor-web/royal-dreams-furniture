import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { categories, getCategory } from "@/lib/gallery";
import { whatsappLink } from "@/lib/site";

interface Props { params: Promise<{ slug: string }> }

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

  const others = categories.filter((c) => c.slug !== cat.slug).slice(0, 3);
  const inquiry = whatsappLink("Hello! I am interested in your " + cat.title.toLowerCase() + ". Can we discuss my room?");
  const images = cat.images.map((img) => ({ ...img, category: cat.slug, categoryTitle: cat.title }));

  return (
    <>
      <PageHeader title={cat.title} intro={cat.description} />

      <section className="pb-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <p className="text-[15px] text-taupe">{cat.short}</p>
            <a href={inquiry} target="_blank" rel="noopener noreferrer" className="btn-dark">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Enquire about {cat.title.toLowerCase()}
            </a>
          </div>
          <GalleryGrid images={images} />
        </div>
      </section>

      <section className="border-t border-border bg-beige-light py-section-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-3xl">More collections</h2>
            <Link href="/collections" className="text-link hover:text-gold-text">View all</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={"/collections/" + o.slug} className="group block">
                <div className="relative aspect-[3/4] bg-beige-dark">
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
