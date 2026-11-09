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
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const text = variant === "dark" ? "text-charcoal" : "text-beige-light";
  return (
    <Link href="/" className={"flex shrink-0 items-center gap-3 " + className} aria-label={SITE.name + " home"}>
      <Image src={"/brand/logo-mark-" + variant + ".png"} alt="" width={484} height={543} priority className="h-11 w-auto lg:h-12" />
      <span className={"font-serif text-[15px] font-medium uppercase leading-[1.2] tracking-[0.12em] " + text}>
        Modern Furniture
        <br />
        Collection
      </span>
    </Link>
  );
}
