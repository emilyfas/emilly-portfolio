import { useEffect, useState } from "react";
import { ArrowRight, Github } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { profile } from "./profile";

const lines = [
  { p: "$", c: "whoami" },
  { o: "emilly — cs student" },
  { p: "$", c: "cat interests.json" },
  { o: '["software", "data", "bi"]' },
  { p: "$", c: "run build --future" },
  { o: "✓ compiling ideas into solutions" },
];

function Terminal() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= lines.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? 500 : 650);
    return () => clearTimeout(id);
  }, [count]);

  return (
    <div className="relative animate-float">
      <div className="glow-orb absolute -inset-10 opacity-60" aria-hidden />
      <div className="card-surface relative overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-terminal-red" />
          <span className="h-3 w-3 rounded-full bg-terminal-yellow" />
          <span className="h-3 w-3 rounded-full bg-primary" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">~/emilly.dev — zsh</span>
        </div>
        <div className="min-h-[260px] space-y-2 p-5 font-mono text-sm">
          {lines.slice(0, count).map((l, i) =>
            "c" in l ? (
              <p key={i}><span className="text-primary">{l.p}</span> <span className="text-foreground">{l.c}</span></p>
            ) : (
              <p key={i} className="text-terminal-cyan">{l.o}</p>
            ),
          )}
          <p><span className="text-primary">$</span> <span className="inline-block h-4 w-2 translate-y-0.5 bg-primary animate-blink" /></p>
        </div>
        <div className="grid grid-cols-3 border-t border-border font-mono text-[11px] text-muted-foreground">
          {[["lang", "TS · PY · SQL"], ["focus", "dev + data"], ["status", "learning"]].map(([k, v]) => (
            <div key={k} className="border-r border-border px-4 py-3 last:border-r-0">
              <p className="uppercase tracking-wider opacity-60">{k}</p>
              <p className="mt-1 text-foreground">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="glass absolute -bottom-12 -left-6 hidden rounded-xl px-4 py-3 font-mono text-xs sm:block">
        <span className="text-muted-foreground">SELECT</span> <span className="text-primary">insight</span> <span className="text-muted-foreground">FROM data;</span>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="glow-orb absolute -top-40 left-1/4 h-[500px] w-[500px] opacity-40" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-5 py-20 md:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] sm:text-[11px] sm:tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
            {t.hero.label}
          </p>
          <h1 className="animate-fade-up mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-7xl" style={{ animationDelay: "100ms" }}>
            {t.hero.title1}<br /><span className="text-gradient">{t.hero.title2}</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "200ms" }}>
            {t.hero.intro}
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: "300ms" }}>
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow">
              {t.hero.ctaProjects}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
              <Github size={16} /> GitHub
            </a>
          </div>
          <p className="animate-fade-up mt-10 flex items-center gap-2 font-mono text-xs text-muted-foreground" style={{ animationDelay: "400ms" }}>
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" /><span className="relative h-2 w-2 rounded-full bg-primary" /></span>
            {t.hero.status}
          </p>
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "300ms" }}><Terminal /></div>
      </div>
    </section>
  );
}
