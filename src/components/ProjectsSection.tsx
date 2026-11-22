import { useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import {
  PROJECT_ARCHETYPES,
  PROJECT_CATEGORIES,
  type ProjectArchetype,
  type ProjectCategory,
} from '../data/fabricationData';
import {
  filterProjectArchetypes,
  getCategoryCounts,
} from '../utils/projectFilter';

interface ProjectsSectionProps {
  onSelectProjectScope: (projectType: string) => void;
}

function ProjectCard({
  project,
  featured,
  onSelectProjectScope,
}: {
  project: ProjectArchetype;
  featured: boolean;
  onSelectProjectScope: (projectType: string) => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article
      data-testid={`project-card-${project.id}`}
      className={`flex flex-col border border-[#D5DCE2] bg-[#F6F7F8] transition-colors duration-150 hover:border-[#82909E] ${
        featured ? 'lg:col-span-2 lg:grid lg:grid-cols-12' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#1B1F24] ${
          featured
            ? 'aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:h-full'
            : 'aspect-[4/3]'
        }`}
      >
        {!imgFailed ? (
          <img
            src={project.imageSrc}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1B1F24] to-[#121417] p-6 text-center">
            <Layers className="h-8 w-8 text-[#E38849]" aria-hidden="true" />
            <p className="mt-2 font-display text-sm font-semibold text-white">
              {project.title}
            </p>
          </div>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col justify-between bg-white p-6 ${
          featured ? 'lg:col-span-5 lg:p-7' : ''
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#52606D]">
            <span className="text-[#9E4C14]">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.cityContext}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{project.turnaround}</span>
          </div>

          <h3 className="mt-2.5 font-display text-xl font-bold tracking-tight text-[#121417] [text-wrap:balance]">
            {project.title}
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-[#4A5562]">
            {project.description}
          </p>
        </div>

        <div className="mt-6">
          <dl className="space-y-2 border-t border-[#E6EAEF] pt-4 text-xs">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[#52606D] shrink-0">Section / Gauge</dt>
              <dd className="text-right font-mono font-medium text-[#121417] tabular-nums">
                {project.materialSpec}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[#52606D] shrink-0">Protective Finish</dt>
              <dd className="text-right font-mono font-medium text-[#121417]">
                {project.finishSpec}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => onSelectProjectScope(project.projectTypeValue)}
            className="mt-5 inline-flex min-h-[42px] w-full items-center justify-between rounded-sm border border-[#121417] bg-white px-4 py-2 text-sm font-semibold text-[#121417] transition-colors duration-150 hover:bg-[#121417] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D2D]"
          >
            <span>Request Similar Scope</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection({ onSelectProjectScope }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const counts = getCategoryCounts(PROJECT_ARCHETYPES);
  const filteredProjects = filterProjectArchetypes(
    PROJECT_ARCHETYPES,
    activeCategory
  );

  return (
    <section id="projects" className="border-b border-[#D8DEE4] bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium tracking-wide text-[#9E4C14]">
              Sample Fabrication Archetypes
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#121417] [text-wrap:balance] sm:text-4xl">
              Representative metalwork scopes across residential and commercial builds.
            </h2>
          </div>

          <p
            aria-live="polite"
            className="font-mono text-xs text-[#52606D] tabular-nums"
          >
            Showing {filteredProjects.length} of {PROJECT_ARCHETYPES.length} fabrication archetypes
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter project archetypes by category"
          className="mt-8 flex flex-wrap gap-2 border-b border-[#E2E7EC] pb-4"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category.key;
            return (
              <button
                key={category.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category.key)}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121417] ${
                  isSelected
                    ? 'bg-[#121417] text-white'
                    : 'border border-[#D5DCE2] bg-[#F6F7F8] text-[#3E4C59] hover:border-[#9AA5B1] hover:text-[#121417]'
                }`}
              >
                <span>{category.label}</span>
                <span
                  className={`font-mono text-xs tabular-nums ${
                    isSelected ? 'text-[#E38849]' : 'text-[#616E7C]'
                  }`}
                >
                  {counts[category.key]}
                </span>
              </button>
            );
          })}
        </div>

        <div
          data-testid="projects-grid"
          className={`mt-8 grid gap-6 ${
            filteredProjects.length === 1
              ? 'grid-cols-1'
              : filteredProjects.length === 2
                ? 'md:grid-cols-2'
                : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={
                filteredProjects.length === 1 ||
                (activeCategory === 'all' && index === 0)
              }
              onSelectProjectScope={onSelectProjectScope}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
