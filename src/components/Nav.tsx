import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass-strong" : "py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="font-display text-lg font-bold tracking-widest">
          <span className="text-primary">P</span>T
          <span className="ml-1 text-xs text-muted-foreground">// R&D ENGINEER</span>
        </a>
        <ul className="hidden gap-8 font-mono text-xs tracking-widest md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-xs tracking-widest text-primary transition-all hover:bg-primary/20 hover:shadow-glow-soft"
        >
          INITIATE CONTACT →
        </a>
      </div>
    </nav>
  );
};

export default Nav;
