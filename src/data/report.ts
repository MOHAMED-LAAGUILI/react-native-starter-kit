export type ReportProject = {
  project: string;
  hours: number;
  color: string;
};

export const projectData: ReportProject[] = [
  { project: 'Project Alpha', hours: 42, color: '#6366f1' },
  { project: 'Project Beta', hours: 28, color: '#f59e0b' },
  { project: 'Project Gamma', hours: 18, color: '#10b981' },
  { project: 'Project Delta', hours: 12, color: '#ef4444' },
];
