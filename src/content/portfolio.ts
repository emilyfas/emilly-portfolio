  // ============================================================
  // PORTFOLIO CONTENT
  // Every text has an English (en) and Portuguese (pt) version.
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
    image?: string; // leave empty "" for no image
  };


  const placeholderProject = (category: ProjectCategory): Project => ({
    category,
    title: { en: "Soon...", pt: "Em breve..." },
    description: {
      en: "Under construction. This project will be added soon.",
      pt: "Em construção. Este projeto será adicionado em breve.",
    },
    technologies: [],
    github: "",
    demo: "",
  });

  export const projects: Project[] = [
    {
      category: "software",
      title: { en: "Link Shortener", pt: "Encurtador de Links" },
      description: {
        en: "A simple and elegant URL shortener built with Flask, allowing users to transform long links into short, shareable URLs.",
        pt: "Um encurtador de URLs simples e elegante feito com Flask, permitindo transformar links longos em URLs curtas, ideais para compartilhamento.",
      },
      technologies: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/emilyfas/link-shortener",
      demo: "https://l1nksh0rtef.onrender.com/",
      image: "projects/encurtadorlinks.gif",
    },

    {
      category: "software",
      title: {
        en: "Calculator",
        pt: "Calculadora",
      },
      description: {
        en: "A calculator built with Python and Tkinter, featuring basic arithmetic operations, CSV-based history storage, and a customized user-friendly interface.",
        pt: "Uma calculadora feita com Python e Tkinter, com operações aritméticas básicas, armazenamento de histórico em CSV e uma interface personalizada e amigável.",
      },
      technologies: ["Python", "Tkinter", "Pillow", "Sympy"],
      github: "https://github.com/emilyfas/calculator.git",
      demo: "",
      image: "projects/calculator.gif",
    },

    {
      category: "software",
      title: {
        en: "Pokedex",
        pt: "Pokedex",
      },
      description: {
        en: "The Pokedex project is a web application that presents an interactive listing of Pokémon, obtained through the 'Poki API'.",
        pt: "O projeto Pokedex é uma aplicação web que apresenta uma listagem interativa de Pokémon, obtida por meio da API 'Poki API'.",
      },
      technologies: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/emilyfas/Pokedex-site",
      demo: "https://emilyfas.github.io/Pokedex-site/",
      image: "projects/pokedex.gif",
    },

    {
      category: "software",
      title: {
        en: "To Do List",
        pt: "Lista de Tarefas",
      },
      description: {
        en: "A task management application built with Python and Tkinter, allowing users to create, edit, and delete tasks with a simple and intuitive interface.",
        pt: "Uma aplicação de gerenciamento de tarefas feita com Python e Tkinter, permitindo criar, editar e excluir tarefas com uma interface simples e intuitiva.",
      },
      technologies: ["Python", "Tkinter"],
      github: "https://github.com/emilyfas/todolist",
      demo: "",
      image: "projects/todolist.gif",
    },

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

  export const experience: ExperienceItem[] = [
    {
      company: { en: "Iveco Group", pt: "Iveco Group" },
      position: { en: "Tech Intern", pt: "Estagiário de Tecnologia" },
      dates: { en: "2026/11 — 2028/11", pt: "11/2026 — 11/2028" },
      responsibilities: [
        { en: "Monitoring and managing tickets related to AMS (Application Management Services).", pt: "Acompanhamento e gestão de tickets relacionados aos serviços de AMS (Application Management Services)." },
        { en: "Providing user support to Finance and related departments.", pt: "Suporte aos usuários das áreas de Finanças e departamentos correlatos." },
        { en: "Creating, reviewing, and updating technical documentation, including user manuals and operational procedures.", pt: "Elaboração, revisão e atualização de documentação técnica, incluindo manuais de usuário e procedimentos operacionais." },
        { en: "Participating in activities and processes guided by Agile methodologies.", pt: "Atuação em atividades e processos orientados por metodologias ágeis." },
      ],
      tools: ["[Python]", "[Excel]", "[Power BI]"],
    }, 
    {
      company: { en: "Atento", pt: "Atento" },
      position: { en: "Quality Operations Analyst", pt: "Analista de Qualidade Operacional" },
      dates: { en: "2025/06 — 2026/10", pt: "06/2025 — 10/2026" },
      responsibilities: [
        { en: "Evaluation of customer interactions and compliance with quality standards.", pt: "Avaliação de atendimentos e conformidade com padrões de qualidade." },
        { en: "Monitoring of performance indicators and operational analysis.", pt: "Monitoramento de indicadores e análise de desempenho operacional." },
        { en: "Report preparation and identification of improvement opportunities.", pt: "Elaboração de relatórios e identificação de oportunidades de melhoria." },
      ],
      tools: ["[Excel]", "[Word]", "[Power BI]"],
    },
  ];





export type SkillGroupKey = "languages" | "data" | "dev" | "other";

export const skills: Record<SkillGroupKey, L[]> = {
  languages: [
    { en: "Python", pt: "Python" },
    { en: "Java", pt: "Java" },
    { en: "SQL", pt: "SQL" },
  ],

  data: [
    { en: "Pandas", pt: "Pandas" },
    { en: "Power BI", pt: "Power BI" },
    { en: "Excel", pt: "Excel" },
  ],

  dev: [
    { en: "Git", pt: "Git" },
    { en: "GitHub", pt: "GitHub" },
    { en: "VS Code", pt: "VS Code" },
  ],

  other: [
    { en: "Problem Solving", pt: "Resolução de Problemas" },
    { en: "Teamwork", pt: "Trabalho em Equipe" },
    { en: "Communication", pt: "Comunicação" },
  ],
};

  export const about = {
    intro: {
      en: "I am passionate about technology, with interests in software development, data analysis, and automation. I enjoy learning, solving problems, and turning ideas into solutions.",
      pt: "Sou entusiasta de tecnologia, com interesse em desenvolvimento de software, análise de dados e automação. Gosto de aprender, resolver problemas e transformar ideias em soluções.",
    },
    journey: {
      en: "Currently building my professional experience in the technology field, gaining exposure to enterprise systems, user support, and business processes.",
      pt: "Atualmente, estou desenvolvendo minha experiência profissional com sistemas corporativos, suporte a usuários e processos de negócio.",
    },
    careerGoals: {
      en: "I aim to grow in the technology field, strengthen my skills, and contribute to projects that combine development, data, and innovation.",
      pt: "Busco evoluir na área de tecnologia, aprimorando minhas habilidades e participando de projetos que unam desenvolvimento, dados e inovação.",
    },
    degree: { en: "B.Sc. in Computer Science", pt: "Bacharelado em Ciência da Computação" },
    school: { en: "Centro Universitário Una", pt: "Centro Universitário Una" },
    period: { en: "2023/06 — 2028/06", pt: "06/2023 — 06/2028" },
    interests: [
      { en: "Software Development", pt: "Desenvolvimento de Software" },
      { en: "Data Analysis", pt: "Análise de Dados" },
      { en: "Automation", pt: "Automação" },
      { en: "Technology", pt: "Tecnologia" },
    ] as L[],
  };

  export { same };
