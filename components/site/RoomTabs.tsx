"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface Room {
  slug: string;
  title: string;
  blurb: string;
  tiles: { href: string; title: string; price: string; priced: boolean; src: string; alt: string }[];
}

/** Choose a room, see what we make for it. */
export default function RoomTabs({ rooms }: { rooms: Room[] }) {
  const [slug, setSlug] = useState(rooms[0].slug);
  const room = rooms.find((r) => r.slug === slug) ?? rooms[0];
  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Rooms">
        {rooms.map((r) => (
          <button key={r.slug} type="button" role="tab" id={"room-tab-" + r.slug} aria-selected={r.slug === slug} aria-controls="room-panel" onClick={() => setSlug(r.slug)} className={"chip shrink-0 " + (r.slug === slug ? "chip-on" : "")}>{r.title}</button>
        ))}
      </div>
      <div id="room-panel" role="tabpanel" aria-labelledby={"room-tab-" + room.slug} className="mt-6">
        <p className="font-dm text-[15px] text-taupe">{room.blurb}</p>
        <ul className="no-scrollbar -mx-5 mt-6 flex snap-x scroll-pl-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5 lg:gap-5">
          {room.tiles.map((t) => (
            <li key={t.href} className="w-[62%] shrink-0 snap-start sm:w-auto">
              <Link href={t.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist">
                  <Image src={t.src} alt={t.alt} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 62vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 font-serif text-[1.125rem] font-medium leading-tight text-charcoal group-hover:text-gold-dark">{t.title}</p>
                <p className={"mt-1 font-dm text-[13px] " + (t.priced ? "font-semibold text-gold-dark" : "text-taupe")}>{t.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
