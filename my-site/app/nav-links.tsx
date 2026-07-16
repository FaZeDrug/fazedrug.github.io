"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "home" },
  { href: "/memories", label: "memories" },
  { href: "/writing", label: "writing" },
];

type Indicator = {
  left: number;
  width: number;
  ready: boolean;
};

export function NavLinks() {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [indicator, setIndicator] = useState<Indicator>({
    left: 0,
    width: 0,
    ready: false,
  });

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.href === pathname),
  );

  function moveIndicator(index: number) {
    const list = listRef.current;
    const link = linkRefs.current[index];

    if (!list || !link) {
      return;
    }

    const listRect = list.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    setIndicator({
      left: linkRect.left - listRect.left,
      width: linkRect.width,
      ready: true,
    });
  }

  useEffect(() => {
    moveIndicator(activeIndex);

    function handleResize() {
      moveIndicator(activeIndex);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  return (
    <ul
      ref={listRef}
      className="nav-links"
      onMouseLeave={() => moveIndicator(activeIndex)}
    >
      {navItems.map((item, index) => (
        <li key={item.href}>
          <Link
            ref={(node) => {
              linkRefs.current[index] = node;
            }}
            href={item.href}
            aria-current={index === activeIndex ? "page" : undefined}
            onMouseEnter={() => moveIndicator(index)}
            onFocus={() => moveIndicator(index)}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <span
        className="nav-indicator"
        style={{
          opacity: indicator.ready ? 1 : 0,
          width: `${indicator.width}px`,
          transform: `translateX(${indicator.left}px)`,
        }}
        aria-hidden="true"
      />
    </ul>
  );
}
