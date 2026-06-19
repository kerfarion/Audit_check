interface ProgressBarProps {
  value: number;
  max: number;
  heightClass?: string;
}

export default function ProgressBar({ value, max, heightClass = 'h-[3px]' }: ProgressBarProps) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-1.5 font-mono">
      <div className="w-full bg-[#111b24] border border-[#1f2e3b] rounded-[2px] overflow-hidden">
        <div 
          className={`bg-[#7be0b0] rounded-[2px] transition-all duration-500 ease-out ${heightClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
