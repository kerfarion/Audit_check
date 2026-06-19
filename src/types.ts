export type ProjectStatus = 'active' | 'paused' | 'done' | 'archived';

export interface Project {
  id: string;
  name: string;
  organization: string;
  crm: string;
  status: ProjectStatus;
  progress: number; // 0 to 22
  comment: string;
  techComment?: string;
  seoComment?: string;
  uxComment?: string;
}

export interface AuditItemState {
  id: string;
  checked: boolean;
  open: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  instruction: string;
}

export interface ChecklistSection {
  id: 'tech' | 'seo' | 'ux';
  title: string;
  items: ChecklistItem[];
}
