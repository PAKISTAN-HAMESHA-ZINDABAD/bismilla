import type { ProjectArchetype, ProjectCategory } from '../data/fabricationData';

export function filterProjectArchetypes(
  projects: readonly ProjectArchetype[],
  category: ProjectCategory
): ProjectArchetype[] {
  if (category === 'all') {
    return [...projects];
  }
  return projects.filter((project) => project.category === category);
}

export function getCategoryCounts(
  projects: readonly ProjectArchetype[]
): Record<ProjectCategory, number> {
  const counts: Record<ProjectCategory, number> = {
    all: projects.length,
    'gates-louvers': 0,
    'stairs-railings': 0,
    'commercial-facades': 0,
    'structural-steel': 0,
  };

  for (const project of projects) {
    counts[project.category] += 1;
  }

  return counts;
}
