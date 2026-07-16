"use client";

import posthog from "posthog-js";

const links = [
  { href: "https://www.linkedin.com/in/nattran/", label: "LinkedIn" },
  { href: "https://github.com/FaZeDrug", label: "GitHub" },
  { href: "/resume.pdf", label: "Resume" },
];

export function SocialLinks() {
  function handleClick(label: string) {
    posthog.capture("social_link_clicked", { link: label });
  }

  return (
    <ul className="social-links" aria-label="Profile links">
      {links.map(({ href, label }) => (
        <li key={label}>
          <a href={href} onClick={() => handleClick(label)}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
