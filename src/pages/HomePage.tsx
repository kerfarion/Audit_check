import { useState, FormEvent } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import { Project, ProjectStatus } from '../types';
import ProjectList from '../components/ProjectList';
import Modal from '../components/Modal';

export default function HomePage() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  
  // Modals status management
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);
  
  // Working states for edits
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  
  // Details form inputs (for both Add and Edit)
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    crm: '',
    status: 'active' as ProjectStatus,
    comment: ''
  });

  // Calculate sum counts for status board
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    paused: projects.filter(p => p.status === 'paused').length,
    done: projects.filter(p => p.status === 'done').length,
    totalCheckpoints: projects.reduce((acc, p) => acc + p.progress, 0)
  };

  // HANDLERS
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      organization: '',
      crm: 'AmoCRM',
      status: 'active',
      comment: ''
    });
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    addProject(
      formData.name,
      formData.organization,
      formData.crm,
      formData.comment
    );
    
    setIsAddModalOpen(false);
  };

  const handleOpenEditComment = (projectId: string, currentComment: string) => {
    setSelectedProjectId(projectId);
    setCommentInput(currentComment);
    setIsEditCommentModalOpen(true);
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedProjectId) {
      updateProject(selectedProjectId, { comment: commentInput });
    }
    setIsEditCommentModalOpen(false);
    setSelectedProjectId(null);
  };

  const handleOpenEditDetails = (project: Project) => {
    setSelectedProjectId(project.id);
    setFormData({
      name: project.name,
      organization: project.organization,
      crm: project.crm,
      status: project.status,
      comment: project.comment
    });
    setIsEditDetailsModalOpen(true);
  };

  const handleEditDetailsSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedProjectId) {
      updateProject(selectedProjectId, {
        name: formData.name,
        organization: formData.organization,
        crm: formData.crm,
        status: formData.status,
        comment: formData.comment
      });
    }
    setIsEditDetailsModalOpen(false);
    setSelectedProjectId(null);
  };

  const handleDelete = (projectId: string) => {
    // Custom modal instead of confirm for perfect iframe compatibility?
    // Let's do a fast JS confirm or we can do it gracefully. Since it's a critical project action, let's ask.
    const proj = projects.find(p => p.id === projectId);
    if (proj && window.confirm(`Удалить проект "${proj.name}" из базы и очистить его прогресс?`)) {
      deleteProject(projectId);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in text-[#d0dbe8]">
      {/* Header board */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#1f2e3b] pb-5 gap-4">
        <div className="space-y-1 font-mono">
          <h1 className="text-xl sm:text-2xl font-bold text-[#7be0b0] tracking-tight">⏣ аудит.site</h1>
          <p className="text-xs text-[#5f7f94]">ПАНЕЛЬ УПРАВЛЕНИЯ ПОТОКАМИ АУДИТА · v2.0</p>
        </div>
        
        {/* Launcher Trigger Button */}
        <button
          onClick={handleOpenAddModal}
          className="self-start sm:self-auto px-4 py-2 border border-[#7be0b0] bg-[#0f1f2a]/70 text-[#7be0b0] hover:bg-[#7be0b0]/15 rounded-[3px] font-mono font-bold text-xs cursor-pointer transition-all active:scale-[98%]"
        >
          [+] запустить новый аудит
        </button>
      </header>

      {/* Dashboard Stats Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 font-mono">
        <div className="bg-[#111b24] border border-[#1f2e3b] p-3 rounded-[3px] flex flex-col justify-between">
          <span className="text-[9px] uppercase tracking-wider text-[#5f7f94]">всего под аудитом</span>
          <span className="text-lg font-bold text-[#e4edf5] mt-1">{stats.total} сайтов</span>
        </div>
        <div className="bg-[#111b24] border border-[#1f2e3b] p-3 rounded-[3px] flex flex-col justify-between">
          <span className="text-[9px] uppercase tracking-wider text-[#5f7f94]">активные сессии</span>
          <span className="text-lg font-bold text-[#7be0b0] mt-1">{stats.active} в процессе</span>
        </div>
        <div className="bg-[#111b24] border border-[#1f2e3b] p-3 rounded-[3px] flex flex-col justify-between">
          <span className="text-[9px] uppercase tracking-wider text-[#5f7f94]">завершенные</span>
          <span className="text-lg font-bold text-[#7be0b0] mt-1">{stats.done} сайтов</span>
        </div>
        <div className="bg-[#111b24] border border-[#1f2e3b] p-3 rounded-[3px] flex flex-col justify-between">
          <span className="text-[9px] uppercase tracking-wider text-[#5f7f94]">закрыто пунктов</span>
          <span className="text-lg font-bold text-[#7be0b0] mt-1">{stats.totalCheckpoints} шт</span>
        </div>
      </div>

      {/* Primary Projects List render output */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1 font-mono">
          <h2 className="text-[#e4edf5] font-bold text-xs uppercase tracking-wide">Зарегистрированные проекты</h2>
          <span className="text-[10px] text-[#5f7f94]">сортировка по новизне</span>
        </div>
        
        <ProjectList
          projects={projects}
          onEditComment={handleOpenEditComment}
          onEditDetails={handleOpenEditDetails}
          onDelete={handleDelete}
        />
      </div>

      {/* MODAL 1: ADD NEW PROJECT */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Новый проект под аудит">
        <form onSubmit={handleAddSubmit} className="space-y-4 font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-[#5f7f94] uppercase text-[10px] block">Название сайта (Домен) *</label>
            <input
              type="text"
              required
              placeholder="example.com"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[#5f7f94] uppercase text-[10px] block">Компания / Заказчик</label>
              <input
                type="text"
                placeholder="ООО Ромашка"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[#5f7f94] uppercase text-[10px] block">Интегрированная CRM</label>
              <input
                type="text"
                placeholder="AmoCRM, Bitrix..."
                value={formData.crm}
                onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[#5f7f94] uppercase text-[10px] block">Первоначальный комментарий</label>
            <textarea
              rows={3}
              placeholder="Дополнительные детали запуска, важные ссылки..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#1f2e3b]/80">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border border-[#1f2e3b] text-[#5f7f94] hover:text-[#d0dbe8] rounded-[3px] transition-colors cursor-pointer"
            >
              отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-[#7be0b0] bg-[#0f1f2a]/60 text-[#7be0b0] hover:bg-[#7be0b0]/20 rounded-[3px] transition-colors font-bold cursor-pointer"
            >
              запустить поток
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: EDIT COMMENT */}
      <Modal isOpen={isEditCommentModalOpen} onClose={() => setIsEditCommentModalOpen(false)} title="Редактировать комментарий">
        <form onSubmit={handleCommentSubmit} className="space-y-4 font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-[#5f7f94] uppercase text-[10px] block">Примечание инженера</label>
            <textarea
              rows={4}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Опишите текущие задачи или проблемы..."
              className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#1f2e3b]/80">
            <button
              type="button"
              onClick={() => setIsEditCommentModalOpen(false)}
              className="px-4 py-2 border border-[#1f2e3b] text-[#5f7f94] hover:text-[#d0dbe8] rounded-[3px] transition-colors cursor-pointer"
            >
              отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-[#7be0b0] bg-[#0f1f2a]/60 text-[#7be0b0] hover:bg-[#7be0b0]/20 rounded-[3px] transition-colors font-bold cursor-pointer"
            >
              сохранить заметку
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: EDIT FULL DETAILS */}
      <Modal isOpen={isEditDetailsModalOpen} onClose={() => setIsEditDetailsModalOpen(false)} title="Параметры проекта">
        <form onSubmit={handleEditDetailsSubmit} className="space-y-4 font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-[#5f7f94] uppercase text-[10px] block">Название проекта (Домен)</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[#5f7f94] uppercase text-[10px] block">Организация</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[#5f7f94] uppercase text-[10px] block">Интегрированная CRM</label>
              <input
                type="text"
                value={formData.crm}
                onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[#5f7f94] uppercase text-[10px] block">Статус работы</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
              className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors cursor-pointer"
            >
              <option value="active">Активный</option>
              <option value="paused">На паузе</option>
              <option value="done">Внеочередно Завершен</option>
              <option value="archived">Архив</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[#5f7f94] uppercase text-[10px] block">Комментарий</label>
            <textarea
              rows={3}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full bg-[#0b0e14] border border-[#1f2e3b] text-xs text-[#d0dbe8] rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#7be0b0] transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#1f2e3b]/80">
            <button
              type="button"
              onClick={() => setIsEditDetailsModalOpen(false)}
              className="px-4 py-2 border border-[#1f2e3b] text-[#5f7f94] hover:text-[#d0dbe8] rounded-[3px] transition-colors cursor-pointer"
            >
              отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-[#7be0b0] bg-[#0f1f2a]/60 text-[#7be0b0] hover:bg-[#7be0b0]/20 rounded-[3px] transition-colors font-bold cursor-pointer"
            >
              изменить параметры
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
