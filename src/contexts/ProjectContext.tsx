import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, AuditItemState } from '../types';
import { loadProjects, saveProjects, loadAuditStates, saveAuditStates } from '../utils/storage';
import { DEFAULT_PROJECTS } from '../utils/constants';
import { checklistSections } from '../utils/checklistData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ProjectContextType {
  projects: Project[];
  auditStates: Record<string, AuditItemState[]>;
  toasts: ToastMessage[];
  addProject: (name: string, organization: string, crm: string, comment?: string) => string;
  updateProject: (projectId: string, data: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  updateAuditState: (projectId: string, items: AuditItemState[]) => void;
  getAuditState: (projectId: string) => AuditItemState[];
  getProject: (projectId: string) => Project | undefined;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Helper to get fresh default audit item states
export function getInitialAuditItems(): AuditItemState[] {
  const list: AuditItemState[] = [];
  checklistSections.forEach(section => {
    section.items.forEach(item => {
      list.push({
        id: item.id,
        checked: false,
        open: false
      });
    });
  });
  return list;
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [auditStates, setAuditStates] = useState<Record<string, AuditItemState[]>>({});
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load from storage immediately on mount
  useEffect(() => {
    const loadedProjects = loadProjects() || DEFAULT_PROJECTS;
    const loadedStates = loadAuditStates() || {};

    let needSaveStates = false;

    // Special: seed mock state for crypto-app.io as fully completed (progress: 22)
    loadedProjects.forEach(p => {
      if (!loadedStates[p.id]) {
        if (p.progress === 22) {
          // Fully pre-complete
          loadedStates[p.id] = getInitialAuditItems().map(item => ({ ...item, checked: true }));
        } else if (p.id === 'p1' && p.progress === 3) {
          // pre-complete first 3
          const items = getInitialAuditItems();
          if (items[0]) items[0].checked = true;
          if (items[1]) items[1].checked = true;
          if (items[2]) items[2].checked = true;
          loadedStates[p.id] = items;
        } else if (p.id === 'p2' && p.progress === 1) {
          // pre-complete first
          const items = getInitialAuditItems();
          if (items[0]) items[0].checked = true;
          loadedStates[p.id] = items;
        } else {
          loadedStates[p.id] = getInitialAuditItems();
        }
        needSaveStates = true;
      }
    });

    setProjects(loadedProjects);
    setAuditStates(loadedStates);
    setInitialized(true);

    if (needSaveStates) {
      saveAuditStates(loadedStates);
    }
  }, []);

  // Save to storage on dependency changes, but only after initial load finishes
  useEffect(() => {
    if (initialized) {
      saveProjects(projects);
    }
  }, [projects, initialized]);

  useEffect(() => {
    if (initialized) {
      saveAuditStates(auditStates);
    }
  }, [auditStates, initialized]);

  // Toast handlers
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove toast after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // CRUD on projects
  const addProject = (name: string, organization: string, crm: string, comment = ''): string => {
    const projectId = 'proj_' + Math.random().toString(36).substring(2, 9);
    const newProject: Project = {
      id: projectId,
      name: name.trim() || 'Новый сайт',
      organization: organization.trim() || 'Не указана',
      crm: crm.trim() || 'Custom',
      status: 'active',
      progress: 0,
      comment: comment.trim()
    };

    setProjects(prev => [newProject, ...prev]);
    setAuditStates(prev => ({
      ...prev,
      [projectId]: getInitialAuditItems()
    }));

    addToast(`Проект "${newProject.name}" запущен`, 'success');
    return projectId;
  };

  const updateProject = (projectId: string, data: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...data } : p));
  };

  const deleteProject = (projectId: string) => {
    const proj = projects.find(p => p.id === projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setAuditStates(prev => {
      const copy = { ...prev };
      delete copy[projectId];
      return copy;
    });
    if (proj) {
      addToast(`Проект "${proj.name}" удалён`, 'info');
    }
  };

  const updateAuditState = (projectId: string, items: AuditItemState[]) => {
    setAuditStates(prev => ({
      ...prev,
      [projectId]: items
    }));

    // Recompute and persist checked progress
    const checkedCount = items.filter(it => it.checked).length;
    
    // Auto status suggestion: if speed completed is 22, can flag 'done' optional or let user control status.
    const currentProject = projects.find(p => p.id === projectId);
    const updatedStatus = currentProject 
      ? (checkedCount === 22 && currentProject.status === 'active' ? 'done' as const : currentProject.status)
      : 'active' as const;

    updateProject(projectId, { 
      progress: checkedCount,
      status: updatedStatus
    });
  };

  const getAuditState = (projectId: string): AuditItemState[] => {
    return auditStates[projectId] || getInitialAuditItems();
  };

  const getProject = (projectId: string): Project | undefined => {
    return projects.find(p => p.id === projectId);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      auditStates,
      toasts,
      addProject,
      updateProject,
      deleteProject,
      updateAuditState,
      getAuditState,
      getProject,
      addToast,
      removeToast
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
