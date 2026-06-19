import { Project, AuditItemState } from '../types';

export function loadProjects(): Project[] | null {
  try {
    const data = localStorage.getItem('audit_projects');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load projects from localStorage:', error);
    return null;
  }
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem('audit_projects', JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to save projects to localStorage:', error);
  }
}

export function loadAuditStates(): Record<string, AuditItemState[]> | null {
  try {
    const data = localStorage.getItem('audit_states');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load audit states from localStorage:', error);
    return null;
  }
}

export function saveAuditStates(states: Record<string, AuditItemState[]>): void {
  try {
    localStorage.setItem('audit_states', JSON.stringify(states));
  } catch (error) {
    console.error('Failed to save audit states to localStorage:', error);
  }
}
