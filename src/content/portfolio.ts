// ============================================================
// EDIT YOUR PORTFOLIO CONTENT HERE
// Every text has an English (en) and Portuguese (pt) version.
// Replace the [bracketed placeholders] with your real information.
// Add or remove items in the lists to show more or fewer cards.
// ============================================================

export type L = { en: string; pt: string };
const same = (s: string): L => ({ en: s, pt: s });

export type ProjectCategory = "software" | "data" | "academic";

export type Project = {
  category: ProjectCategory;
  title: L;
  description: L;
  technologies: string[];
  github?: string; // leave empty "" to hide the link
  demo?: string; // leave empty "" to hide the link
};

const placeholderProject = (category: ProjectCategory): Project => ({
  category,
  title: { en: "[Project title]", pt: "[Título do projeto]" },
  description: {
    en: "[Short description of the problem, your approach and what you built.]",
    pt: "[Breve descrição do problema, da sua abordagem e do que foi construído.]",
  },
  technologies: ["[Tech]", "[Tech]", "[Tech]"],
  github: "",
  demo: "",
});

export const projects: Project[] = [
  placeholderProject("software"),
  placeholderProject("data"),
  placeholderProject("academic"),
  placeholderProject("software"),
  placeholderProject("data"),
  placeholderProject("academic"),
];

export type ExperienceItem = {
  company: L;
  position: L;
  dates: L;
  responsibilities: L[];
  tools: string[];
};

const placeholderExperience = (): ExperienceItem => ({
  company: { en: "[Company]", pt: "[Empresa]" },
  position: { en: "[Position]", pt: "[Cargo]" },
  dates: { en: "[Start] — [End]", pt: "[Início] — [Fim]" },
  responsibilities: [
    { en: "[Responsibility or activity]", pt: "[Responsabilidade ou atividade]" },
    { en: "[Responsibility or activity]", pt: "[Responsabilidade ou atividade]" },
  ],
  tools: ["[Tool]", "[Tool]"],
});

export const experience: ExperienceItem[] = [placeholderExperience(), placeholderExperience(), placeholderExperience()];

export type SkillGroupKey = "languages" | "data" | "dev" | "other";

export const skills: Record<SkillGroupKey, string[]> = {
  languages: ["[Skill]", "[Skill]", "[Skill]"],
  data: ["[Skill]", "[Skill]", "[Skill]"],
  dev: ["[Skill]", "[Skill]", "[Skill]"],
  other: ["[Skill]", "[Skill]", "[Skill]"],
};

export const about = {
  intro: {
    en: "[Write a short personal introduction here — who you are, what drives you and what you enjoy building.]",
    pt: "[Escreva aqui uma breve apresentação pessoal — quem você é, o que te motiva e o que gosta de construir.]",
  },
  journey: {
    en: "[Describe your professional journey and interests — e.g. software development, data analysis and business intelligence.]",
    pt: "[Descreva sua trajetória profissional e interesses — ex.: desenvolvimento de software, análise de dados e business intelligence.]",
  },
  careerGoals: {
    en: "[Describe your career goals — what kind of role or impact you are working towards.]",
    pt: "[Descreva seus objetivos de carreira — que tipo de função ou impacto você busca.]",
  },
  degree: { en: "B.Sc. in Computer Science", pt: "Bacharelado em Ciência da Computação" },
  school: { en: "[University name]", pt: "[Nome da universidade]" },
  period: { en: "[Start year] — [Expected graduation]", pt: "[Ano de início] — [Previsão de conclusão]" },
  interests: [
    { en: "Software Development", pt: "Desenvolvimento de Software" },
    { en: "Data Analysis", pt: "Análise de Dados" },
    { en: "Business Intelligence", pt: "Business Intelligence" },
    { en: "Technology", pt: "Tecnologia" },
  ] as L[],
};

export { same };
