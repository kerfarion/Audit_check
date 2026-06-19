import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Keypress listener for Escape key to close the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0e14]/92 backdrop-blur-[4px] animate-fade-in">
      {/* Backdrop click gets caught here */}
      <div 
        className="absolute inset-0 cursor-default" 
        onClick={onClose}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-lg bg-[#111b24] border border-[#1f2e3b] rounded-[4px] shadow-2xl p-6 transition-all transform scale-100 ease-out">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1f2e3b]">
          <h3 className="font-mono text-sm font-bold tracking-wider text-[#e4edf5] uppercase">
            ⏣ {title}
          </h3>
          <button 
            onClick={onClose}
            className="text-[#5f7f94] hover:text-[#7be0b0] font-mono text-xs transition-colors p-1"
          >
            [закрыть]
          </button>
        </div>
        
        {children}
      </div>
    </div>
  );
}
