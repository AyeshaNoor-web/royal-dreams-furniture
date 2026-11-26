"use client";

import type { ReactNode } from "react";
import { planHref, startPlan } from "@/lib/plan";

interface Props {
  pieces?: string[];
  note?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/** Any "get a quote" button. A real link (works without JavaScript and from any page) that talks to the planner when it is on the page. */
export default function PlanButton({ pieces = [], note, className = "btn-lit", children, ariaLabel }: Props) {
  return (
    <a
      href={planHref(pieces)}
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        startPlan({ pieces, note });
      }}
    >
      {children}
    </a>
  );
}
