import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageProvider, useCopy } from "@/components/portfolio/language";
import type { Lang } from "@/content/portfolio";

function useTyped(text: string) {
  const [count, setCount] = useState(text.length);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(text.length);
      return;
    }
    setCount(0);
    const id = window.setInterval(() => {
      setCount((current) => {
        if (current >= text.length) {
          window.clearInterval(id);
          return current;
        }
        return current + 1;
      });
    }, 26);
    return () => window.clearInterval(id);
  }, [text]);

  return text.slice(0, count);
}

function useTicker(lines: string[]) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % lines.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [lines]);

  return lines[index] ?? "";
}

function LangSwitch() {
  const { lang, setLang } = useCopy();
  const options: Lang[] = ["en", "es"];

  return (
    <div className="fixed top-4 right-4 z-40 flex rounded-full border border-border bg-bg p-1 font-mono text-xs">
      {options.map((option) => {
        const active = option === lang;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            className={
              active
                ? "min-h-11 min-w-11 rounded-full bg-primary px-3 text-bg"
                : "min-h-11 min-w-11 rounded-full px-3 text-muted"
            }
            aria-pressed={active}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

function Page() {
  const { t } = useCopy();
  const typed = useTyped(t.role);
  const tick = useTicker(t.live);

  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <div className="grid-field pointer-events-none fixed inset-0 opacity-40" aria-hidden="true" />
      <LangSwitch />
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 pr-36">
          <a href="#top" className="font-mono text-sm text-primary">
            lesanpi
          </a>
          <nav className="hidden gap-6 font-mono text-sm text-muted sm:flex">
            <a href="#work" className="hover:text-fg">
              {t.nav.work}
            </a>
            <a href="#projects" className="hover:text-fg">
              {t.nav.projects}
            </a>
            <a href="#skills" className="hover:text-fg">
              {t.nav.skills}
            </a>
            <a href="#contact" className="hover:text-fg">
              {t.nav.contact}
            </a>
          </nav>
        </div>
        <nav className="flex gap-4 overflow-x-auto border-t border-border px-5 py-2 font-mono text-sm text-muted sm:hidden">
          <a href="#work" className="inline-flex min-h-11 items-center">
            {t.nav.work}
          </a>
          <a href="#projects" className="inline-flex min-h-11 items-center">
            {t.nav.projects}
          </a>
          <a href="#skills" className="inline-flex min-h-11 items-center">
            {t.nav.skills}
          </a>
          <a href="#contact" className="inline-flex min-h-11 items-center">
            {t.nav.contact}
          </a>
        </nav>
      </header>

      <main id="top" className="relative mx-auto max-w-6xl px-5 pb-24">
        <section className="grid items-end gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="rise lg:col-span-7">
            <p className="font-mono text-sm text-primary">{t.kicker}</p>
            <h1 className="mt-4 max-w-xl text-5xl leading-none font-extrabold tracking-tight sm:text-6xl">
              {t.name}
            </h1>
            <p className="mt-6 min-h-16 max-w-xl text-xl text-fg">
              {typed}
              <span className="caret text-primary" aria-hidden="true">
                ▍
              </span>
            </p>
            <p className="mt-4 max-w-xl text-muted">{t.lede}</p>
            <p className="mt-4 font-mono text-sm text-muted">{t.location}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex min-h-11 items-center bg-primary px-5 font-mono text-sm text-bg"
              >
                {t.ctaWork}
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center border border-border px-5 font-mono text-sm text-fg"
              >
                {t.ctaContact}
              </a>
            </div>
          </div>
          <aside className="rise border border-border bg-surface lg:col-span-5">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-xs text-muted">
              <span className="size-2 rounded-full bg-primary" />
              <span>
                {t.prompt}
                <span className="text-fg"> luis</span>
              </span>
            </div>
            <ul className="space-y-3 px-4 py-5 font-mono text-sm">
              {t.live.map((line) => (
                <li key={line} className={line === tick ? "text-primary" : "text-muted"}>
                  <span className="text-primary">› </span>
                  {line}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section id="work" className="border-t border-border py-16">
          <h2 className="text-3xl font-bold">{t.workTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t.workLead}</p>
          <ol className="mt-10 space-y-8">
            {t.roles.map((role) => (
              <li key={role.org} className="grid gap-3 border-l border-primary pl-5 md:grid-cols-12">
                <div className="md:col-span-4">
                  <p className="font-mono text-sm text-primary">{role.when}</p>
                  <p className="mt-1 text-xl font-bold">{role.title}</p>
                  <p className="text-muted">
                    {role.org} · {role.place}
                  </p>
                  {role.image && role.href ? (
                    <a href={role.href} target="_blank" rel="noreferrer" className="mt-4 block">
                      <img
                        src={role.image}
                        alt={role.alt ?? role.org}
                        className="aspect-video w-full border border-border object-cover object-top"
                      />
                    </a>
                  ) : null}
                </div>
                <ul className="space-y-2 md:col-span-8">
                  {role.points.map((point) => (
                    <li key={point} className="text-fg">
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="border-t border-border py-16">
          <h2 className="text-3xl font-bold">{t.projectsTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t.projectsLead}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {t.projects.map((project) => (
              <article key={project.title} className="overflow-hidden border border-border bg-surface">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="aspect-video w-full object-cover object-top"
                />
                <div className="p-5">
                  <p className="font-mono text-xs text-primary">
                    {project.where} · {project.year}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex min-h-11 items-center font-mono text-xs text-primary"
                    >
                      {project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  ) : null}
                  <p className="mt-2 text-muted">{project.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <li key={item} className="border border-border px-2 py-1 font-mono text-xs text-primary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="border-t border-border py-16">
          <h2 className="text-3xl font-bold">{t.skillsTitle}</h2>
          <p className="mt-3 text-muted">{t.skillsLead}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.groups.map((group) => (
              <div key={group.name} className="border border-border p-5">
                <h3 className="font-mono text-sm text-primary">{group.name}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="bg-surface px-2 py-1 font-mono text-xs text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-16">
          <h2 className="text-3xl font-bold">{t.studyTitle}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <ul className="space-y-4">
              {t.schools.map((school) => (
                <li key={school.name}>
                  <p className="font-bold">{school.name}</p>
                  <p className="font-mono text-sm text-muted">{school.detail}</p>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {t.certs.map((cert) => (
                <li key={cert.name}>
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-11 items-center justify-between gap-3 border border-border px-4 py-3 font-mono text-sm text-primary"
                  >
                    <span>{cert.name}</span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs">
                      <BadgeCheck className="size-4" aria-hidden="true" />
                      {t.verify}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="border-t border-border py-16">
          <h2 className="text-3xl font-bold">{t.contactTitle}</h2>
          <p className="mt-3 text-muted">{t.contactLead}</p>
          <ul className="mt-8 space-y-3 font-mono text-lg">
            <li>
              <a className="text-primary" href={`mailto:${t.email}`}>
                {t.email}
              </a>
            </li>
            <li>
              <a className="text-fg" href={`tel:${t.phone.replace(/\s/g, "")}`}>
                {t.phone}
              </a>
            </li>
            <li>
              <a className="text-fg" href="https://github.com/lesanpi" target="_blank" rel="noreferrer">
                {t.github}
              </a>
            </li>
            <li>
              <a className="text-fg" href="https://www.linkedin.com/in/lesanpi" target="_blank" rel="noreferrer">
                {t.linkedin}
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export function Landing() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}
