import type { ReactNode } from 'react';
import { severityClasses, statusClasses } from '@/utils';

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-angel-panel border border-angel-border rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-sm font-medium tracking-wide text-angel-muted uppercase ${className}`}>
      {children}
    </h3>
  );
}

export function SeverityBadge({ severity }: { severity: string }) {
  const s = severityClasses(severity);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text} ${s.border} border`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const s = statusClasses(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === 'online' || status === 'active' ? 'animate-pulse-soft' : ''}`} />
      {s.label}
    </span>
  );
}

export function GoldButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 bg-gradient-gold text-angel-bg font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-angel-gold/20 hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = '',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 border border-angel-border text-angel-ivory font-medium rounded-lg transition-all duration-200 hover:border-angel-gold/50 hover:bg-angel-panel-hover active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 90 ? 'bg-angel-critical' : value >= 80 ? 'bg-angel-warning' : 'bg-angel-gold';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-angel-bg rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium text-angel-muted tabular-nums">{value}%</span>
    </div>
  );
}
