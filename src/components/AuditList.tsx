import { checklistSections } from '../utils/checklistData';
import { AuditItemState } from '../types';
import AuditItem from './AuditItem';
import SectionCommentInput from './SectionCommentInput';

interface AuditListProps {
  items: AuditItemState[];
  onToggleCheck: (id: string) => void;
  onToggleOpen: (id: string) => void;
  comments: {
    tech?: string;
    seo?: string;
    ux?: string;
  };
  onUpdateComment: (sectionId: 'tech' | 'seo' | 'ux', text: string) => void;
}

export default function AuditList({
  items,
  onToggleCheck,
  onToggleOpen,
  comments,
  onUpdateComment
}: AuditListProps) {
  // Helpers to draw headers SVGs
  const getSectionIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'tech':
        return (
          <svg className="flex-shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7be0b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case 'seo':
        return (
          <svg className="flex-shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7be0b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        );
      case 'ux':
        return (
          <svg className="flex-shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7be0b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 font-mono">
      {checklistSections.map(section => {
        // Collect subset list IDs to count checked vs. total inside this section
        const sectionItemIds = section.items.map(item => item.id);
        const sectionStates = items.filter(st => sectionItemIds.includes(st.id));
        const total = section.items.length;
        const checked = sectionStates.filter(st => st.checked).length;

        return (
          <section key={section.id} className="space-y-4">
            
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-dashed border-[#1f2e3b] pb-2">
              <div className="flex items-center gap-3">
                {getSectionIcon(section.id)}
                <h3 className="text-[#e4edf5] font-bold text-sm sm:text-base tracking-tight uppercase">
                  {section.title}
                </h3>
              </div>
              
              {/* Count status badge */}
              <span className="text-xs font-bold text-[#7be0b0] bg-[#1a2a36] border border-[#2a4a5a] px-2.5 py-0.5 rounded-[12px]">
                {checked} / {total}
              </span>
            </div>

            {/* Checkpoints list */}
            <div className="flex flex-col gap-2">
              {section.items.map(item => {
                const itemState = items.find(st => st.id === item.id) || { checked: false, open: false };
                return (
                  <AuditItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    instruction={item.instruction}
                    checked={itemState.checked}
                    open={itemState.open}
                    onToggleCheck={onToggleCheck}
                    onToggleOpen={onToggleOpen}
                  />
                );
              })}
            </div>

            {/* Section Comment Input */}
            <SectionCommentInput
              sectionId={section.id}
              sectionTitle={section.title}
              initialValue={comments[section.id] || ''}
              onSave={onUpdateComment}
            />
          </section>
        );
      })}
    </div>
  );
}
