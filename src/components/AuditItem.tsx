interface AuditItemProps {
  key?: string;
  id: string;
  text: string;
  instruction: string;
  checked: boolean;
  open: boolean;
  onToggleCheck: (id: string) => void;
  onToggleOpen: (id: string) => void;
}

export default function AuditItem({
  id,
  text,
  instruction,
  checked,
  open,
  onToggleCheck,
  onToggleOpen,
}: AuditItemProps) {
  return (
    <div
      className={`bg-[#111b24] border border-[#1f2e3b] rounded-[4px] p-4 transition-all duration-300 flex flex-col cursor-pointer ${
        checked ? 'opacity-60' : 'opacity-100'
      } hover:shadow-[0_4px_12px_rgba(123,224,176,0.05)] hover:border-[#7be0b0] hover:-translate-y-[2px]`}
      onClick={() => onToggleOpen(id)}
    >
      <div className="flex items-center justify-between gap-3 select-none">
        {/* Custom Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCheck(id);
          }}
          className={`w-5 h-5 border-[1.5px] rounded-[3px] flex items-center justify-center transition-all cursor-pointer ${
            checked
              ? 'bg-[#7be0b0] border-[#7be0b0]'
              : 'border-[#3a5a6e] hover:border-[#7be0b0]'
          }`}
          aria-label={checked ? 'Uncheck audit step' : 'Check audit step'}
        >
          {checked && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111b24"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        {/* Audit checkpoint text */}
        <div
          className={`flex-1 text-sm font-mono leading-relaxed text-[#d0dbe8] transition-all ${
            checked ? 'line-through text-[#5f7f94]' : ''
          }`}
          // Render tags such as <code> inside checklists
          dangerouslySetInnerHTML={{ __html: text }}
        />

        {/* Rotate Chevron (▾) */}
        <div
          className={`text-[#5f7f94] transition-transform duration-300 px-1 text-sm ${
            open ? 'rotate-180 text-[#7be0b0]' : 'rotate-0'
          }`}
        >
          ▾
        </div>
      </div>

      {/* Slide-out detail instruction block */}
      <div
        className={`overflow-hidden transition-all duration-300 font-mono text-[13px] ${
          open
            ? 'max-h-[500px] border-t border-[#1a2a36] mt-3 pt-3 opacity-100 pointer-events-auto'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        onClick={(e) => {
          // Prevent closing card when highlight/interaction happens inside instructions
          e.stopPropagation();
        }}
      >
        <div 
          className="pl-7 space-y-2.5 text-[#d0dbe8] leading-relaxed antialiased"
          dangerouslySetInnerHTML={{ __html: instruction }}
        />
      </div>
    </div>
  );
}
