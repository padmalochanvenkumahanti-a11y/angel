import { Shield } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  const iconSize = { sm: 16, md: 20, lg: 28 };
  const textSize = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl' };

  return (
    <div className="flex items-center gap-3">
      <div className={`${dims[size]} rounded-lg bg-gradient-gold flex items-center justify-center gold-glow shrink-0`}>
        <Shield size={iconSize[size]} className="text-angel-bg" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <div className={`font-bold tracking-wide text-angel-ivory ${textSize[size]}`}>
          ANGEL<span className="text-angel-gold"> CCTV</span>
        </div>
        {size !== 'sm' && (
          <div className="text-[10px] text-angel-muted tracking-widest uppercase">Guardian · Emergency · Life Safety</div>
        )}
      </div>
    </div>
  );
}
