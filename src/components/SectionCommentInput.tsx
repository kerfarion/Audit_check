import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface SectionCommentInputProps {
  sectionId: 'tech' | 'seo' | 'ux';
  sectionTitle: string;
  initialValue: string;
  onSave: (sectionId: 'tech' | 'seo' | 'ux', text: string) => void;
}

export default function SectionCommentInput({
  sectionId,
  sectionTitle,
  initialValue,
  onSave
}: SectionCommentInputProps) {
  const [value, setValue] = useState(initialValue);
  const [isSaved, setIsSaved] = useState(true);

  // Sync state if initialValue changes from external source (e.g. project reset or navigation)
  useEffect(() => {
    setValue(initialValue);
    setIsSaved(true);
  }, [initialValue]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setIsSaved(false);
  };

  const handleBlur = () => {
    if (value !== initialValue) {
      onSave(sectionId, value);
      setIsSaved(true);
    }
  };

  // Allow manual save with Ctrl+Enter or a button click
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (value !== initialValue) {
        onSave(sectionId, value);
        setIsSaved(true);
        // Remove focus
        e.currentTarget.blur();
      }
    }
  };

  const handleSaveClick = () => {
    if (value !== initialValue) {
      onSave(sectionId, value);
      setIsSaved(true);
    }
  };

  return (
    <div className="mt-4 border-t border-[#1f2e3b]/30 pt-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase font-mono tracking-widest text-[#5f7f94] flex items-center gap-1.5">
          <span>📝 Замечания по теме "{sectionTitle}":</span>
        </label>
        
        <div className="flex items-center gap-2">
          {!isSaved ? (
            <button
              onClick={handleSaveClick}
              className="text-[9px] font-mono text-[#7be0b0] bg-[#1a2a36] hover:bg-[#203a4a] border border-[#2a4a5a] px-1.5 py-0.5 rounded-[2px] transition-colors cursor-pointer"
            >
              [сохранить]
            </button>
          ) : (
            <span className="text-[9px] font-mono text-[#5f7f94]/60 flex items-center gap-1">
              ✓ сохранено
            </span>
          )}
        </div>
      </div>
      
      <textarea
        className="w-full bg-[#111b24]/40 border border-[#1f2e3b]/80 focus:border-[#7be0b0]/40 focus:outline-none p-3 rounded-[3px] text-xs font-mono text-[#d0dbe8] h-20 resize-y placeholder-[#5f7f94]/40 placeholder:font-mono transition-colors focus:bg-[#111b24]"
        placeholder={`Опишите подробности проведения чекапа, замечания или ошибки, обнаруженные в категории "${sectionTitle}"...`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <div className="text-[9px] text-[#5f7f94]/50 text-right leading-none -mt-1 font-mono">
        ctrl + enter для быстрого сохранения
      </div>
    </div>
  );
}
