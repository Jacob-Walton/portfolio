export type ProjectStatus = 'inDevelopment' | 'complete' | 'functionallyComplete';

export type TechCategory = 'languages' | 'frontend' | 'backend' | 'databases' | 'devops' | 'tools';

export type TranslationKeys =
  | 'common' | 'landing' | 'projects' | 'githubStats' | 'about' | 'footer'
  | 'common.viewWork' | 'common.status'
  | 'landing.title' | 'landing.subtitle' | 'landing.githubButton'
  | 'projects.title' | 'projects.statuses.inDevelopment' | 'projects.statuses.complete' | 'projects.statuses.functionallyComplete' | 'projects.viewProject'
  | 'githubStats.totalProjects' | 'githubStats.primaryLanguage' | 'githubStats.latestProject'
  | 'about.title' | 'about.description'
  | 'about.currentStudies.title' | 'about.currentStudies.computerScience.title' | 'about.currentStudies.computerScience.details'
  | 'about.currentStudies.mathematics.title' | 'about.currentStudies.mathematics.details'
  | 'about.currentStudies.physics.title' | 'about.currentStudies.physics.details'
  | 'about.technicalFocus.title' | 'about.technicalFocus.languages.title' | 'about.technicalFocus.backend.title' | 'about.technicalFocus.tools.title'
  | 'about.techStack.title' | 'about.techStack.categories.languages' | 'about.techStack.categories.frontend' | 'about.techStack.categories.backend'
  | 'about.techStack.categories.databases' | 'about.techStack.categories.devops' | 'about.techStack.categories.tools'
  | 'footer.copyright';
