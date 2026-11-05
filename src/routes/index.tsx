import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About, Projects, Experience, Skills, Contact, Footer } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emilly.dev — Computer Science Student & Developer" },
      { name: "description", content: "Portfolio of Emilly, a Computer Science student focused on software development, data analysis and business intelligence." },
      { property: "og:title", content: "Emilly.dev — Building solutions through technology" },
      { property: "og:description", content: "Projects, experience and skills of Emilly, Computer Science student and technology enthusiast." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://emily-bilingual-dev-showcase.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://emily-bilingual-dev-showcase.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
