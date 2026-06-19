import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectContext';
import AuditList from '../components/AuditList';
import ProgressBar from '../components/ProgressBar';
import Modal from '../components/Modal';

export default function AuditPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject, getAuditState, updateAuditState, updateProject, addToast } = useProjects();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const project = projectId ? getProject(projectId) : undefined;
  const auditItems = projectId ? getAuditState(projectId) : [];

  if (!project || !projectId) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-12 border border-[#1f2e3b] rounded-[4px] bg-[#111b24] font-mono p-6 space-y-4 text-[#d0dbe8]">
        <h3 className="font-bold text-red-400">🚨 ОШИБКА: ПРОЕКТ НЕ НАЙДЕН</h3>
        <p className="text-xs text-[#5f7f94]">Указанный идентификатор сессии не найден в локальной базе данных.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 border border-[#1f2e3b] text-[#7be0b0] hover:border-[#7be0b0] rounded-[3px] text-xs transition-colors cursor-pointer"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  // Handlers for checkboxes and instruction state toggles
  const handleToggleCheck = (itemId: string) => {
    const freshItems = auditItems.map(item => {
      if (item.id === itemId) {
        const nextChecked = !item.checked;
        if (nextChecked) {
          addToast(`Пункт ${itemId.toUpperCase()} подтвержден`, 'success');
        } else {
          addToast(`Пункт ${itemId.toUpperCase()} сброшен`, 'info');
        }
        return { ...item, checked: nextChecked };
      }
      return item;
    });

    updateAuditState(projectId, freshItems);
  };

  const handleToggleOpen = (itemId: string) => {
    const freshItems = auditItems.map(item =>
      item.id === itemId ? { ...item, open: !item.open } : item
    );
    updateAuditState(projectId, freshItems);
  };

  // Bulk actions
  const handleExpandAll = () => {
    const fresh = auditItems.map(item => ({ ...item, open: true }));
    updateAuditState(projectId, fresh);
    addToast('Все инструкции раскрыты', 'info');
  };

  const handleCollapseAll = () => {
    const fresh = auditItems.map(item => ({ ...item, open: false }));
    updateAuditState(projectId, fresh);
    addToast('Все инструкции свернуты', 'info');
  };

  const handleResetConfirmSubmit = () => {
    const fresh = auditItems.map(item => ({ ...item, checked: false, open: false }));
    updateAuditState(projectId, fresh);
    // Optionally also clear section comments if requested, but leaving them keeps valuable qualitative feedback safe
    setIsResetModalOpen(false);
    addToast('Ход аудита полностью сброшен', 'info');
  };

  const comments = {
    tech: project.techComment || '',
    seo: project.seoComment || '',
    ux: project.uxComment || ''
  };

  const handleUpdateComment = (sectionId: 'tech' | 'seo' | 'ux', text: string) => {
    if (sectionId === 'tech') {
      updateProject(project.id, { techComment: text });
    } else if (sectionId === 'seo') {
      updateProject(project.id, { seoComment: text });
    } else if (sectionId === 'ux') {
      updateProject(project.id, { uxComment: text });
    }
    addToast('Комментарий по теме обновлен', 'success');
  };

  const checkedCount = auditItems.filter(item => item.checked).length;
  const total = auditItems.length;
  const percent = total > 0 ? Math.round((checkedCount / total) * 100) : 0;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in text-[#d0dbe8] font-mono pb-20">
      
      {/* Return back header and context statistics */}
      <header className="border-b border-[#1f2e3b] pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-[#5f7f94] hover:text-[#7be0b0] cursor-pointer transition-colors"
          >
            ← в панель проектов
          </button>
          
          <div className="text-[10px] text-[#5f7f94] uppercase bg-[#1a2a36]/50 px-2 py-0.5 border border-[#1f2e3b] rounded-[3px]">
            сессия: {project.id}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 leading-tight">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#e4edf5] truncate">{project.name}</h2>
            <p className="text-xs text-[#5f7f94] uppercase tracking-wider">
              {project.organization} · {project.crm || 'Без CRM'}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 self-start sm:self-auto min-w-[200px] w-full sm:w-auto">
            <div className="flex justify-between items-center w-full text-xs text-[#5f7f94] uppercase">
              <span>прогресс</span>
              <span className="text-[#7be0b0] font-bold">{checkedCount} / {total} ({percent}%)</span>
            </div>
            <ProgressBar value={checkedCount} max={total} heightClass="h-[4px]" />
          </div>
        </div>
      </header>

      {/* Control Actions Tray */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#111b24]/50 border border-[#1f2e3b] p-3 rounded-[3px] text-[10px]">
        <div className="flex items-center gap-2">
          <button
            onClick={handleExpandAll}
            className="text-[#7be0b0] hover:underline cursor-pointer"
          >
            [развернуть все]
          </button>
          <span className="text-[#5f7f94]">|</span>
          <button
            onClick={handleCollapseAll}
            className="text-[#d0dbe8] hover:underline cursor-pointer"
          >
            [свернуть все]
          </button>
        </div>

        <button
          onClick={() => setIsResetModalOpen(true)}
          className="text-red-400 hover:underline hover:text-red-300 font-bold cursor-pointer"
        >
          [⟲ сбросить сессию]
        </button>
      </div>

      {/* Checklists Core */}
      <main className="space-y-8">
        <AuditList
          items={auditItems}
          onToggleCheck={handleToggleCheck}
          onToggleOpen={handleToggleOpen}
          comments={comments}
          onUpdateComment={handleUpdateComment}
        />
      </main>

      {/* Confirm session reset dialog box modal */}
      <Modal 
        isOpen={isResetModalOpen} 
        onClose={() => setIsResetModalOpen(false)} 
        title="СБРОСИТЬ ХОД АУДИТА?"
      >
        <div className="space-y-4 font-mono text-xs">
          <p className="text-red-400 font-bold uppercase tracking-wide">
            ⚠️ ОПЕРАЦИЯ НЕОБРАТИМА
          </p>
          <p className="text-[#5f7f94] leading-relaxed">
            Вы собираетесь стереть все выполненные отметки аудитора для сайта <strong className="text-[#e4edf5]">{project.name}</strong> и полностью обнулить процент его готовности. Свернуть все текущие инструкции?
          </p>
          
          <div className="flex justify-end gap-2 pt-3 border-t border-[#1f2e3b]/80">
            <button
              onClick={() => setIsResetModalOpen(false)}
              className="px-4 py-2 border border-[#1f2e3b] text-[#5f7f94] hover:text-[#d0dbe8] rounded-[3px] transition-colors cursor-pointer"
            >
              отмена
            </button>
            <button
              onClick={handleResetConfirmSubmit}
              className="px-4 py-2 border border-red-500 bg-red-950/20 text-red-400 hover:bg-red-500/10 rounded-[3px] transition-colors font-bold cursor-pointer"
            >
              да, сбросить
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
