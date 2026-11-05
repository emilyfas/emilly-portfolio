import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const ids = ["home", "about", "projects", "experience", "skills", "contact"] as const;

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const LangSwitch = () => (
    <div className="flex items-center rounded-full border border-border bg-background/50 p-0.5 font-mono text-xs" role="group" aria-label="Language">
      {(["pt", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-3 py-1 uppercase transition-colors",
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "glass border-x-0 border-t-0" : "border-b border-transparent")}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#home" className="font-display text-lg font-bold tracking-tight">
          EMILLY<span className="text-primary">.DEV</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {ids.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.nav[id]}
                {active === id && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-primary shadow-glow" />}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block"><LangSwitch /></div>
        <div className="flex items-center gap-3 lg:hidden">
          <LangSwitch />
          <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="rounded-md p-2 text-foreground">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="glass mx-4 mb-4 flex flex-col rounded-xl p-2 lg:hidden animate-fade-up">
          {ids.map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setOpen(false)} className={cn("block rounded-lg px-4 py-3 text-sm", active === id ? "bg-accent text-primary" : "text-muted-foreground")}>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
