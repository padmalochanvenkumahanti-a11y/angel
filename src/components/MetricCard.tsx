import { ShieldCheck, Bell, FileText, AlertTriangle } from 'lucide-react';

export function MetricCard({
  label,
  value,
  icon: Icon,
  accent = 'gold',
}: {
  label: string;
  value: string | number;
  icon: typeof ShieldCheck;
  accent?: 'gold' | 'secure' | 'warning' | 'critical';
}) {
  const colors = {
    gold: 'text-angel-gold',
    secure: 'text-angel-secure',
    warning: 'text-angel-warning',
    critical: 'text-angel-critical',
  };
  return (
    <div className="bg-angel-panel border border-angel-border rounded-xl p-5 transition-all duration-300 hover:border-angel-gold/30 group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-angel-muted tracking-wide uppercase">{label}</span>
        <Icon size={20} className={`${colors[accent]} opacity-70 group-hover:opacity-100 transition-opacity`} />
      </div>
      <div className={`text-3xl font-bold ${colors[accent]} tabular-nums`}>{value}</div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, subtitle }: { icon: typeof ShieldCheck; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-angel-panel border border-angel-border flex items-center justify-center mb-4">
        <Icon size={24} className="text-angel-muted" />
      </div>
      <p className="text-sm font-medium text-angel-ivory">{title}</p>
      {subtitle && <p className="text-xs text-angel-muted mt-1">{subtitle}</p>}
    </div>
  );
}

export { ShieldCheck, Bell, FileText, AlertTriangle };
