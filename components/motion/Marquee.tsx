import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}

export default function Marquee({ children, className = "", duration = 40, reverse = false }: MarqueeProps) {
  const style = { ["--marquee-duration" as string]: `${duration}s` } as React.CSSProperties;
  return (
    <div className={"group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] " + className}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          style={style}
          className={"flex shrink-0 items-center gap-10 pr-10 motion-safe:animate-marquee group-hover:[animation-play-state:paused] " + (reverse ? "[animation-direction:reverse]" : "")}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
