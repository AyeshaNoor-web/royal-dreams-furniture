import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

interface LogoProps {
  variant?: "dark" | "gold";
  className?: string;
}

/**
 * Header logo: the client's monogram beside a typeset wordmark.
 * The full lockup is tall and becomes unreadable at header height, so it is used only in the footer.
 */
// On the black theme the gold monogram and cream wordmark are the default; "dark" keeps the charcoal mark for light surfaces.
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const text = variant === "dark" ? "text-charcoal" : "text-beige";
  return (
    <Link href="/" className={"flex shrink-0 items-center gap-2.5 sm:gap-3 " + className} aria-label={SITE.name + " home"}>
      <Image src={"/brand/logo-mark-" + variant + ".png"} alt="" width={484} height={543} priority unoptimized className="h-9 w-auto sm:h-11 lg:h-12" />
      <span className={"font-serif text-[11.5px] font-semibold uppercase leading-[1.2] tracking-[0.12em] sm:text-[14px] " + text}>
        Modern Furniture
        <br />
        Collection
      </span>
    </Link>
  );
}
