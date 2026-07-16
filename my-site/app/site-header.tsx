import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="brand">
          <ThemeToggle />
        </div>

        <NavLinks />
      </nav>
    </header>
  );
}
