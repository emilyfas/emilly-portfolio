import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">{kicker}</p>
      <h2 className="text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}
