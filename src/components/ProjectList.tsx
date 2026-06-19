import { useState, useMemo } from 'react';
import { Project, ProjectStatus } from '../types';
import ProjectItem from './ProjectItem';

interface ProjectListProps {
  projects: Project[];
  onEditComment: (projectId: string, currentComment: string) => void;
  onEditDetails: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

type FilterType = 'all' | ProjectStatus;

export default function ProjectList({ projects, onEditComment, onEditDetails, onDelete }: ProjectListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.crm.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = activeFilter === 'all' || project.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, activeFilter]);

  return (
    <div className="space-y-4 font-mono">
      {/* Search and Filters group */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#111b24] border border-[#1f2e3b] p-3 rounded-[4px]">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="[поиск проекта по имени / компании / CRM]..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] placeholder-[#5f7f94] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5f7f94] hover:text-[#7be0b0] transition-colors"
            >
              [сброс]
            </button>
          )}
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['all', 'active', 'paused', 'done', 'archived'] as const).map(filter => {
            const labelMap: Record<FilterType, string> = {
              all: 'все',
              active: 'крадущиеся',
              paused: 'пауза',
              done: 'готовы',
              archived: 'архив'
            };
            
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[10px] uppercase font-bold px-2.5 py-1.5 border rounded-[2px] cursor-pointer transition-all duration-200 ${
                  isActive 
                    ? 'border-[#7be0b0] text-[#0b0e14] bg-[#7be0b0]' 
                    : 'border-[#1f2e3b] text-[#5f7f94] bg-[#0b0e14]/55 hover:border-[#5f7f94] hover:text-[#e4edf5]'
                }`}
              >
                {labelMap[filter]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Render output */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-[#1f2e3b] rounded-[4px] bg-[#111b24]/20">
          <p className="text-xs text-[#5f7f94]">НЕТ ПРОЕКТОВ СООТВЕТСТВУЮЩИХ КРИТЕРИЯМ</p>
          {projects.length === 0 && (
            <p className="text-[10px] text-[#5f7f94]/70 mt-1 uppercase">Запустите первый аудит кнопкой сверху</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredProjects.map(project => (
            <ProjectItem
              key={project.id}
              project={project}
              onEditComment={onEditComment}
              onEditDetails={onEditDetails}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
