import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer, PageHeader } from '../../../shared/components/ui/Page';

export interface TechRoadmapCard {
  slug: string;
  title: string;
  icon: string;
}

export interface TechRoadmapSection {
  title: string;
  subtitle: string;
  items: TechRoadmapCard[];
}

const roadmapSections: TechRoadmapSection[] = [
  {
    title: 'Computer Science Fundamentals',
    subtitle: 'Build a rock-solid foundation for software engineering and placement interviews.',
    items: [
      { slug: 'data-structures', title: 'Data Structures & Algorithms', icon: 'fa-solid fa-sitemap' },
      { slug: 'system-design', title: 'System Design', icon: 'fa-solid fa-network-wired' },
      { slug: 'oops', title: 'Object-Oriented Programming', icon: 'fa-solid fa-cubes' },
      { slug: 'dbms', title: 'Database Management (DBMS)', icon: 'fa-solid fa-database' },
      { slug: 'operating-systems', title: 'Operating Systems', icon: 'fa-solid fa-microchip' },
      { slug: 'computer-networks', title: 'Computer Networks', icon: 'fa-solid fa-globe' },
      { slug: 'git-github', title: 'Git & GitHub', icon: 'fa-solid fa-code-branch' },
      { slug: 'linux', title: 'Linux', icon: 'fa-solid fa-terminal' },
    ],
  },
  {
    title: 'Programming Fundamentals',
    subtitle: 'Master the language that powers your engineering career.',
    items: [
      { slug: 'java', title: 'Java', icon: 'fa-brands fa-java' },
      { slug: 'javascript', title: 'JavaScript', icon: 'fa-brands fa-js' },
      { slug: 'python', title: 'Python', icon: 'fa-brands fa-python' },
      { slug: 'typescript', title: 'TypeScript', icon: 'fa-solid fa-file-code' },
      { slug: 'nodejs', title: 'Node.js', icon: 'fa-brands fa-node-js' },
      { slug: 'aspnet-core', title: 'ASP.NET Core', icon: 'fa-solid fa-globe' },
    ],
  },
  {
    title: 'Backend & APIs',
    subtitle: 'Build high-performance services that scale.',
    items: [
      { slug: 'spring-boot', title: 'Spring Boot', icon: 'fa-solid fa-layer-group' },
      { slug: 'api-design', title: 'API Design', icon: 'fa-solid fa-border-all' },
      { slug: 'graphql', title: 'GraphQL', icon: 'fa-solid fa-diagram-project' },
      { slug: 'mongodb', title: 'MongoDB', icon: 'fa-solid fa-hard-drive' },
      { slug: 'redis', title: 'Redis', icon: 'fa-solid fa-bolt' },
    ],
  },
  {
    title: 'Frontend Development',
    subtitle: 'Craft beautiful, fast, and interactive web apps.',
    items: [
      { slug: 'html', title: 'HTML', icon: 'fa-solid fa-file-lines' },
      { slug: 'css', title: 'CSS', icon: 'fa-solid fa-palette' },
      { slug: 'react', title: 'React', icon: 'fa-brands fa-react' },
      { slug: 'angular', title: 'Angular', icon: 'fa-brands fa-angular' },
      { slug: 'design-systems', title: 'Design Systems', icon: 'fa-solid fa-icons' },
    ],
  },
  {
    title: 'Cloud & Systems',
    subtitle: 'Deploy and scale infrastructure for modern software.',
    items: [
      { slug: 'system-design-cloud', title: 'System Design', icon: 'fa-solid fa-network-wired' },
      { slug: 'aws', title: 'AWS', icon: 'fa-brands fa-aws' },
      { slug: 'docker', title: 'Docker', icon: 'fa-brands fa-docker' },
      { slug: 'kubernetes', title: 'Kubernetes', icon: 'fa-solid fa-dharmachakra' },
      { slug: 'terraform', title: 'Terraform', icon: 'fa-solid fa-cubes-stacked' },
    ],
  },
  {
    title: 'AI & Emerging Tech',
    subtitle: 'Build with state-of-the-art AI architectures.',
    items: [
      { slug: 'ai-agents', title: 'AI Agents', icon: 'fa-solid fa-wand-magic-sparkles' },
      { slug: 'prompt-engineering', title: 'Prompt Engineering', icon: 'fa-solid fa-comment-dots' },
    ],
  },
];

export const RoadmapList: React.FC = () => {
  return (
    <main className="c2c-page w-full font-sans">
      <PageContainer>
        <PageHeader
          eyebrow="Choose your path"
          title="Tech Placement Roadmaps"
          description="Step-by-step guides, resources, and learning paths for software engineering."
        />

        <nav
          aria-label="Roadmap categories"
          className="mt-8 border-y border-[var(--c2c-border)] py-3 sm:mt-10"
        >
          <div className="-mx-[var(--c2c-gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--c2c-gutter)] pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
            {roadmapSections.map((section) => {
              const sectionId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

              return (
                <a
                  key={section.title}
                  href={`#${sectionId}`}
                  className="shrink-0 snap-start rounded-full border border-[var(--c2c-border)] bg-[var(--c2c-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--c2c-text-muted)] transition-colors hover:border-[var(--c2c-primary)] hover:text-[var(--c2c-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c2c-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c2c-bg)]"
                >
                  {section.title}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="mt-12 flex flex-col gap-14 md:mt-16 md:gap-20">
          {roadmapSections.map((section, sectionIndex) => {
            const sectionId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const descriptionId = `${sectionId}-description`;

            return (
              <section
                id={sectionId}
                key={section.title}
                aria-labelledby={`${sectionId}-title`}
                aria-describedby={descriptionId}
                className="scroll-mt-28"
              >
                <div className="mb-6 flex items-start gap-4 sm:mb-8">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--c2c-primary)]/30 bg-[var(--c2c-primary)]/10 font-mono text-xs font-bold text-[var(--c2c-primary)]"
                  >
                    {String(sectionIndex + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2
                      id={`${sectionId}-title`}
                      className="font-heading text-xl font-bold tracking-tight text-[var(--c2c-text)] sm:text-2xl"
                    >
                      {section.title}
                    </h2>
                    <p
                      id={descriptionId}
                      className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--c2c-text-muted)] sm:text-base"
                    >
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                  {section.items.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/roadmaps/${item.slug}`}
                      aria-label={`Open the ${item.title} roadmap`}
                      className="c2c-card c2c-card-interactive group flex min-h-24 items-center gap-4 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c2c-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c2c-bg)] sm:p-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--c2c-border)] bg-[var(--c2c-surface-raised)] text-[var(--c2c-primary)] transition-colors group-hover:border-[var(--c2c-primary)]/40 group-hover:bg-[var(--c2c-primary)]/10">
                        <i className={`${item.icon} text-lg`} aria-hidden="true" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-5 text-[var(--c2c-text)] sm:text-base">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-xs text-[var(--c2c-text-subtle)]">
                          View roadmap
                        </span>
                      </span>

                      <i
                        className="fa-solid fa-arrow-right shrink-0 text-xs text-[var(--c2c-text-subtle)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--c2c-primary)]"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </PageContainer>
    </main>
  );
};
