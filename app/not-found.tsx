import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 text-center">
        <Image src="/brand/logo-dark-mark.png" alt="" width={500} height={567} className="h-16 w-auto mx-auto mb-8" />
        <h1 className="font-serif text-display-md text-charcoal mb-6">This page could not be found.</h1>
        <Link href="/" className="btn-dark">
          Back to home
        </Link>
      </div>
    </section>
  );
}
