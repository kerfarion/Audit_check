export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let borderClass = 'border-[#1f2e3b] text-[#d0dbe8]';
        let icon = '⏣';
        if (toast.type === 'success') {
          borderClass = 'border-[#7be0b0]/40 text-[#7be0b0] bg-[#0f1f2a]/95';
          icon = '✓';
        } else if (toast.type === 'error') {
          borderClass = 'border-red-500/40 text-red-400 bg-red-950/20';
          icon = '✗';
        } else {
          borderClass = 'border-[#2a4a5a] text-[#7be0b0] bg-[#111b24]/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3 border rounded-[3px] shadow-xl backdrop-blur-md text-xs font-mono transition-all duration-300 transform translate-y-0 animate-fade-in ${borderClass}`}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold">{icon}</span>
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-[#5f7f94] hover:text-[#7be0b0] ml-2 cursor-pointer font-bold transition-colors"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
