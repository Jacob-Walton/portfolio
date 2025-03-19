export type ProjectStatus = 'inDevelopment' | 'complete' | 'functionallyComplete';

export type TranslationKeys = 
  | 'common.viewWork'
  | 'common.status'
  | 'landing.title'
  | 'landing.subtitle'
  | 'landing.githubButton'
  | 'projects.title'
  | 'projects.viewProject'
  | `projects.statuses.${ProjectStatus}`
  | 'githubStats.totalProjects'
  | 'githubStats.primaryLanguage'
  | 'githubStats.latestProject'
  | 'about.title'
  | 'about.description'
  | 'about.currentStudies.title'
  | 'about.currentStudies.computerScience.title'
  | 'about.currentStudies.computerScience.details'
  | 'about.currentStudies.mathematics.title'
  | 'about.currentStudies.mathematics.details'
  | 'about.currentStudies.physics.title'
  | 'about.currentStudies.physics.details'
  | 'about.technicalFocus.title'
  | 'about.technicalFocus.languages.title'
  | 'about.technicalFocus.backend.title'
  | 'about.technicalFocus.tools.title';
