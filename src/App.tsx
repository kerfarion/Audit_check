import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider, useProjects } from './contexts/ProjectContext';
import HomePage from './pages/HomePage';
import AuditPage from './pages/AuditPage';
import ToastContainer from './components/Toast';

function AppContent() {
  const { toasts, removeToast } = useProjects();

  return (
    <div className="min-h-screen bg-[#0b0e14] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111e29] via-[#0b0e14] to-[#080a0e] text-[#d0dbe8] flex flex-col selection:bg-[#7be0b0]/25 selection:text-[#7be0b0] antialiased">
      {/* Visual top decorative line */}
      <div className="h-[2px] bg-gradient-to-r from-[#7be0b0]/30 via-[#7be0b0] to-[#7be0b0]/30 w-full" />

      {/* Main Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/audit/:projectId" element={<AuditPage />} />
        </Routes>
      </div>

      {/* Modern Footer */}
      <footer className="border-t border-[#1f2e3b]/50 py-6 text-center text-[10px] font-mono text-[#5f7f94] tracking-widest uppercase">
        ПЛАТФОРМА АВТОМАТИЗАЦИИ АУДИТОВ · {new Date().getFullYear()} · ВСЕ ПРАВА ЗАЩИЩЕНЫ
      </footer>

      {/* Flash Toasts Display Overlay */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <Router>
        <AppContent />
      </Router>
    </ProjectProvider>
  );
}
