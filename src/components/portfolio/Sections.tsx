import { useState } from "react";
import {
  GraduationCap, Sparkles, Github, ExternalLink, Code2, BarChart3, BookOpen, Briefcase,
  Terminal, Database, Wrench, Layers, Linkedin, Mail, Copy, Check, ArrowUp, ArrowUpRight, Target,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeader, Tag } from "./shared";
import { profile } from "./profile";
import { about, projects, experience, skills, type Project, type ProjectCategory } from "@/content/portfolio";

export function About() {
  const { t, lang } = useLanguage();
  const a = t.about;
  return (
    <Section id="about">
      <SectionHeader kicker={a.kicker} title={a.title} />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="card-surface space-y-5 rounded-2xl p-6 text-base leading-relaxed text-muted-foreground sm:p-8 sm:text-lg">
          <p>{about.intro[lang]}</p>
          <p>{about.journey[lang]}</p>
          <div className="border-t border-border pt-5">
            <div className="mb-3 flex items-center gap-3 text-primary"><Target size={18} aria-hidden /><span className="font-mono text-xs uppercase tracking-widest">{a.goals}</span></div>
            <p>{about.careerGoals[lang]}</p>
          </div>
        </Reveal>
        <div className="grid gap-6">
          <Reveal delay={100} className="card-surface rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-3 text-primary"><GraduationCap size={20} aria-hidden /><span className="font-mono text-xs uppercase tracking-widest">{a.education}</span></div>
            <h3 className="text-xl font-semibold">{about.degree[lang]}</h3>
            <p className="mt-1 text-muted-foreground">{about.school[lang]}</p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">{about.period[lang]}</p>
          </Reveal>
          <Reveal delay={200} className="card-surface rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-3 text-primary"><Sparkles size={20} aria-hidden /><span className="font-mono text-xs uppercase tracking-widest">{a.interests}</span></div>
            <div className="flex flex-wrap gap-2">{about.interests.map((i) => <Tag key={i.en}>{i[lang]}</Tag>)}</div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

const catIcon = { software: Code2, data: BarChart3, academic: BookOpen };

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useLanguage();
  const p = t.projects;
  const Icon = catIcon[project.category];
  const title = project.title[lang];
  return (
    <article className="card-surface group relative flex min-h-[530px] flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-border bg-background">
        <div className="bg-grid absolute inset-0" />

        {project.image ? (
          <img
            src={`${import.meta.env.BASE_URL}${project.image}`}
            alt={`${title} - demonstração do projeto`}
            className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Icon
            size={40}
            aria-hidden
            className="relative text-primary/70 transition-transform duration-500 group-hover:scale-110"
            strokeWidth={1.25}
          />
        )}

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background/80 via-background/20 to-transparent" />

        <span className="absolute left-4 top-4 z-20 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {p.categories[project.category]}
        </span>

        <span className="absolute right-4 top-4 z-20 font-mono text-[10px] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-start justify-between gap-2 text-lg font-semibold">
          {title}
          <ArrowUpRight size={18} aria-hidden className="shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description[lang]}</p>
        <div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech, i) => <Tag key={i}>{tech}</Tag>)}</div>
        {(project.github || project.demo) && (
          <div className="mt-6 flex gap-5 border-t border-border pt-4 text-sm">
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${p.code}: ${title}`} className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"><Github size={15} aria-hidden />{p.code}</a>}
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${p.demo}: ${title}`} className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"><ExternalLink size={15} aria-hidden />{p.demo}</a>}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const p = t.projects;
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const list = projects.filter((pr) => filter === "all" || pr.category === filter);
  const filters: (ProjectCategory | "all")[] = ["all", "software", "data", "academic"];

  return (
    <Section id="projects">
      <SectionHeader kicker={p.kicker} title={p.title} subtitle={p.subtitle} />
      <Reveal className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
            className={cn("rounded-full border px-4 py-2 text-sm transition-all",
              filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground")}>
            {f === "all" ? p.all : p.categories[f]}
          </button>
        ))}
      </Reveal>
      {list.length === 0 && <p className="text-muted-foreground">{t.contact.empty}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((project, i) => (
          <Reveal key={`${filter}-${i}`} delay={i * 80}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  const { t, lang } = useLanguage();
  const e = t.experience;
  return (
    <Section id="experience">
      <SectionHeader kicker={e.kicker} title={e.title} />
      <ol className="relative ml-3 border-l border-border md:ml-0 md:border-0">
        <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-border to-transparent md:block" aria-hidden />
        {experience.map((item, i) => (
          <li key={i} className={cn("relative mb-12 pl-8 md:w-1/2 md:pl-0", i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12")}>
            <span aria-hidden className={cn("absolute top-6 h-3 w-3 rounded-full border-2 border-primary bg-background shadow-glow -left-[7px]",
              i % 2 === 0 ? "md:left-auto md:-right-[6px]" : "md:-left-[6px]")} />
            <Reveal delay={i * 100} className="card-surface rounded-2xl p-6 transition-colors hover:border-primary/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-primary">{item.dates[lang]}</span>
                <Briefcase size={16} aria-hidden className="text-muted-foreground" />
              </div>
              <h3 className="mt-3 text-xl font-semibold">{item.position[lang]}</h3>
              <p className="text-muted-foreground">{item.company[lang]}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {item.responsibilities.map((r, j) => <li key={j} className="flex gap-2"><span className="text-primary" aria-hidden>▹</span>{r[lang]}</li>)}
              </ul>
              {item.tools.length > 0 && (
                <div className="mt-4 border-t border-border pt-4">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{e.tools}</p>
                  <div className="flex flex-wrap gap-2">{item.tools.map((tool, j) => <Tag key={j}>{tool}</Tag>)}</div>
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Skills() {
  const { t, lang } = useLanguage();
  const s = t.skills;
  const groups = [
    { key: "languages", icon: Terminal },
    { key: "data", icon: Database },
    { key: "dev", icon: Wrench },
    { key: "other", icon: Layers },
  ] as const;
  return (
    <Section id="skills">
      <SectionHeader kicker={s.kicker} title={s.title} subtitle={s.subtitle} />
      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map(({ key, icon: Icon }, i) => (
          <Reveal key={key} delay={i * 80}>
            <div className="card-surface group h-full rounded-2xl p-6 transition-all hover:border-primary/40">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary transition-shadow group-hover:shadow-glow"><Icon size={18} aria-hidden /></span>
                <h3 className="text-lg font-semibold">{s.groups[key]}</h3>
              </div>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {skills[key].map((skill, n) => (
                  <li key={n} className="truncate rounded-lg border border-border bg-background/50 px-3 py-2.5 text-center font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">{skill[lang]}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const links = [
    { label: "GitHub", href: profile.github, icon: Github, value: profile.github.replace("https://", "") },
    { label: "LinkedIn", href: profile.linkedin, icon: Linkedin, value: profile.linkedin.replace("https://", "") },
  ];
  return (
    <Section id="contact">
      <Reveal className="card-surface relative overflow-hidden rounded-3xl p-8 md:p-14">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div className="glow-orb absolute -right-20 -top-20 h-80 w-80 opacity-50" aria-hidden />
        <div className="relative grid min-w-0 gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">{c.kicker}</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">{c.title}</h2>
            <p className="mt-4 max-w-md text-muted-foreground">{c.subtitle}</p>
          </div>
          <div className="space-y-3">
            <div className="glass flex items-center justify-between gap-3 rounded-xl p-4">
              <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center gap-4">
                <Mail size={20} className="shrink-0 text-primary" />
                <span className="min-w-0"><span className="block text-xs text-muted-foreground">{c.email}</span><span className="block truncate">{profile.email}</span></span>
              </a>
              <button type="button" onClick={copy} aria-label={c.copyLabel} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? c.copied : c.copy}
              </button>
            </div>
            {links.map(({ label, href, icon: Icon, value }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="glass group flex items-center justify-between gap-3 rounded-xl p-4 transition-colors hover:border-primary/50">
                <span className="flex min-w-0 items-center gap-4">
                  <Icon size={20} className="shrink-0 text-primary" />
                  <span className="min-w-0"><span className="block text-xs text-muted-foreground">{label}</span><span className="block truncate">{value}</span></span>
                </span>
                <ArrowUpRight size={18} aria-hidden className="shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:px-8">
        <p><span className="font-display font-bold text-foreground">EMILLY<span className="text-primary">.DEV</span></span> · © {new Date().getFullYear()} · {t.footer.rights}</p>
        <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-primary">{t.footer.back}<ArrowUp size={14} /></a>
      </div>
    </footer>
  );
}
