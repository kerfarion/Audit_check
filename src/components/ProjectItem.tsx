import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import ProgressBar from './ProgressBar';

interface ProjectItemProps {
  key?: string;
  project: Project;
  onEditComment: (projectId: string, currentComment: string) => void;
  onEditDetails: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export default function ProjectItem({ project, onEditComment, onEditDetails, onDelete }: ProjectItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (e: MouseEvent) => {
    // Prevent navigating if user is clicking expand, editing comments, or deleting
    e.stopPropagation();
    navigate(`/audit/${project.id}`);
  };

  const getStatusBadge = () => {
    switch (project.status) {
      case 'active':
        return (
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#7be0b0]/50 text-[#7be0b0] bg-[#0f1f2a]/60 rounded-[3px] font-bold">
            активен
          </span>
        );
      case 'paused':
        return (
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#5f7f94]/40 text-[#5f7f94] bg-[#0b0e14]/40 rounded-[3px] font-semibold">
            пауза
          </span>
        );
      case 'done':
        return (
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#7be0b0] text-[#0b0e14] bg-[#7be0b0] rounded-[3px] font-bold">
            завершен
          </span>
        );
      case 'archived':
        return (
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#1f2e3b] text-[#5f7f94] bg-[#0b0e14]/90 rounded-[3px] font-normal">
            архив
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="bg-[#111b24] border border-[#1f2e3b] rounded-[4px] font-mono transition-all duration-300 hover:border-[#7be0b0] hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(123,224,176,0.03)]"
    >
      {/* Title block */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer select-none"
        onClick={handleNavigate}
      >
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-[#accent] text-[#7be0b0] font-bold text-xs">⏣</span>
            <span className="font-bold text-[#e4edf5] text-sm sm:text-base hover:text-[#7be0b0] transition-colors truncate">
              {project.name}
            </span>
            {getStatusBadge()}
          </div>
          <div className="text-xs text-[#5f7f94] truncate">
            {project.organization || 'Не указана'}
          </div>
        </div>

        <div className="flex items-center gap-3 pl-2">
          {/* Progress display */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-[10px] text-[#5f7f94] uppercase tracking-wider">
              прогресс: <span className="text-[#e4edf5] font-bold">{project.progress}/22</span>
            </span>
            <div className="w-24">
              <ProgressBar value={project.progress} max={22} heightClass="h-[2px]" />
            </div>
          </div>

          {/* Toggle Expand button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 text-[#5f7f94] hover:text-[#7be0b0] transition-colors focus:outline-none"
            aria-label="Toggle details"
          >
            <span className={`inline-block text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#7be0b0]' : 'rotate-0'}`}>
              ▼
            </span>
          </button>
        </div>
      </div>

      {/* Expanded details panel */}
      {isExpanded && (
        <div className="border-t border-[#1f2e3b] bg-[#0b0e14]/30 px-4 py-4 text-xs space-y-3.5 antialiased">
          {/* Progress fallback for small screens */}
          <div className="flex sm:hidden flex-col gap-1.5 pb-2 border-b border-[#1f2e3b]/50">
            <div className="flex justify-between items-center text-[10px] uppercase text-[#5f7f94]">
              <span>прогресс аудита</span>
              <span className="text-[#e4edf5] font-bold">{project.progress} / 22 страниц</span>
            </div>
            <ProgressBar value={project.progress} max={22} heightClass="h-[3px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="text-[#5f7f94] uppercase tracking-wider text-[10px]">CRM СИСТЕМА:</div>
              <div className="text-[#d0dbe8] font-medium">{project.crm || 'Не указана'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[#5f7f94] uppercase tracking-wider text-[10px]">КОМПАНИЯ ОРГАНИЗАЦИЯ:</div>
              <div className="text-[#d0dbe8] font-medium">{project.organization || 'Не указана'}</div>
            </div>
          </div>

          {/* Comment block */}
          <div className="space-y-1 bg-[#111b24]/60 p-3 border border-[#1f2e3b]/80 rounded-[2px]">
            <div className="flex justify-between items-center pb-1 mb-1 border-b border-[#1f2e3b]/40">
              <span className="text-[#5f7f94] uppercase tracking-wider text-[10px]">ИНЖЕНЕРНЫЙ КОММЕНТАРИЙ:</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditComment(project.id, project.comment);
                }}
                className="text-[#7be0b0] hover:underline cursor-pointer text-[10px]"
              >
                [править]
              </button>
            </div>
            <p className="text-[#d0dbe8] leading-relaxed break-words italic">
              {project.comment || 'Комментарий отсутствует. Нажмите [править], чтобы добавить примету или зафиксировать промежуточное состояние.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center pt-2 gap-2">
            <button
              onClick={handleNavigate}
              className="px-3 py-1.5 border border-[#7be0b0]/40 text-[#7be0b0] rounded-[3px] hover:bg-[#7be0b0]/10 hover:border-[#7be0b0] transition-colors"
            >
              ⌨ запустить аудит.site
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditDetails(project);
                }}
                className="px-3 py-1.5 border border-[#1f2e3b] text-[#d0dbe8] rounded-[3px] hover:border-[#5f7f94] hover:text-[#e4edf5] transition-colors"
              >
                настройки
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(project.id);
                }}
                className="px-3 py-1.5 border border-red-950 text-red-500 rounded-[3px] hover:bg-red-950/20 hover:border-red-900 transition-colors"
                title="Удалить проект"
              >
                удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
