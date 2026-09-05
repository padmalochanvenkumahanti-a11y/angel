import { useState } from 'react';
import {
  X,
  ArrowRight,
  Check,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Clock,
  Video,
  Zap,
} from 'lucide-react';
import { useRouter } from '@/router';
import { Panel, SeverityBadge, ConfidenceBar, GoldButton, GhostButton } from '@/components/ui';
import { alerts as initialAlerts } from '@/data';
import { alertStatusBadge } from '@/utils';
import type { Alert, AlertStatus } from '@/types';

const tabs: { key: AlertStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'acknowledged', label: 'Acknowledged' },
  { key: 'escalated', label: 'Escalated' },
  { key: 'resolved', label: 'Resolved' },
];

export function AlertsPage() {
  const { navigate } = useRouter();
  const [tab, setTab] = useState<AlertStatus | 'all'>('all');
  const [alertList, setAlertList] = useState<Alert[]>(initialAlerts);

  const filtered = tab === 'all' ? alertList : alertList.filter((a) => a.status === tab);

  const updateStatus = (id: string, status: AlertStatus) => {
    setAlertList(alertList.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-angel-ivory">Alerts</h1>
        <p className="text-sm text-angel-muted mt-1">AI-detected events across all cameras</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((t) => {
          const count = t.key === 'all' ? alertList.length : alertList.filter((a) => a.status === t.key).length;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                tab === t.key
                  ? 'bg-angel-gold/10 text-angel-gold-light border border-angel-gold/30'
                  : 'text-angel-muted hover:text-angel-ivory border border-angel-border'
              }`}
            >
              {t.label}
              <span className={`text-xs ${tab === t.key ? 'text-angel-gold' : 'text-angel-muted'}`}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Alert list */}
      <div className="grid gap-3">
        {filtered.map((alert) => {
          const badge = alertStatusBadge(alert.status);
          return (
            <button
              key={alert.id}
              onClick={() => navigate('alert-detail', alert.id)}
              className="group text-left"
            >
              <Panel className="p-4 hover:border-angel-gold/30 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <img src={alert.thumbnail} alt="" className="w-20 h-20 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-angel-ivory">{alert.type}</h3>
                        <p className="text-xs text-angel-muted mt-0.5">{alert.id} · {alert.cameraName}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <SeverityBadge severity={alert.severity} />
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} ${badge.border} border`}>
                          {badge.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-angel-muted mb-3 line-clamp-1">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs text-angel-muted">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {alert.location}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {alert.timestamp}</span>
                      <span className="flex items-center gap-1"><Zap size={12} className="text-angel-gold" /> {alert.confidence}% confidence</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-angel-muted group-hover:text-angel-gold group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                </div>
              </Panel>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AlertDetailPage() {
  const { param, navigate } = useRouter();
  const [alertList, setAlertList] = useState<Alert[]>(initialAlerts);
  const alert = alertList.find((a) => a.id === param) || alertList[0];

  const updateStatus = (status: AlertStatus) => {
    setAlertList(alertList.map((a) => (a.id === alert.id ? { ...a, status } : a)));
  };

  const badge = alertStatusBadge(alert.status);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('alerts')}
            className="w-9 h-9 rounded-lg border border-angel-border flex items-center justify-center text-angel-muted hover:text-angel-ivory hover:border-angel-gold/30 transition-all"
          >
            <X size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-angel-ivory">{alert.type}</h1>
            <p className="text-sm text-angel-muted">{alert.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SeverityBadge severity={alert.severity} />
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} ${badge.border} border`}>
            {badge.label}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Evidence */}
        <div className="lg:col-span-2 space-y-4">
          <Panel className="overflow-hidden">
            <div className="relative aspect-video bg-angel-bg">
              <img src={alert.thumbnail} alt={alert.type} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-angel-bg/60 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-angel-bg/70 glass-panel">
                <Video size={14} className="text-angel-gold" />
                <span className="text-xs text-angel-ivory">{alert.cameraName}</span>
              </div>
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-angel-bg/70 glass-panel">
                <span className="text-xs text-angel-muted tabular-nums">{alert.timestamp}</span>
              </div>
            </div>
          </Panel>

          <Panel className="p-5">
            <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-3">AI Analysis</h3>
            <p className="text-sm text-angel-ivory leading-relaxed mb-4">{alert.description}</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-angel-muted mb-1.5">Confidence Score</p>
                <ConfidenceBar value={alert.confidence} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-angel-muted mb-1">Detection Type</p>
                  <p className="text-sm text-angel-ivory">{alert.type}</p>
                </div>
                <div>
                  <p className="text-xs text-angel-muted mb-1">Camera</p>
                  <p className="text-sm text-angel-ivory">{alert.cameraName}</p>
                </div>
                <div>
                  <p className="text-xs text-angel-muted mb-1">Location</p>
                  <p className="text-sm text-angel-ivory">{alert.location}</p>
                </div>
                <div>
                  <p className="text-xs text-angel-muted mb-1">Timestamp</p>
                  <p className="text-sm text-angel-ivory">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          </Panel>

          {/* Event timeline */}
          <Panel className="p-5">
            <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-4">Event Timeline</h3>
            <div className="space-y-1">
              {[
                { time: alert.timestamp.split(' ')[1], text: 'AI detection triggered', done: true },
                { time: alert.timestamp.split(' ')[1], text: 'Alert created and queued', done: true },
                { time: '—', text: 'Guardian notified', done: alert.status !== 'new' },
                { time: '—', text: 'Alert acknowledged', done: alert.status === 'acknowledged' || alert.status === 'escalated' || alert.status === 'resolved' },
                { time: '—', text: 'Incident resolved', done: alert.status === 'resolved' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 relative">
                  {i < 4 && (
                    <div className="absolute left-[7px] top-10 bottom-0 w-px bg-angel-border" />
                  )}
                  <div className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 z-10 ring-4 ring-angel-panel ${step.done ? 'bg-angel-secure' : 'bg-angel-border'}`} />
                  <div className="flex-1 flex items-center justify-between">
                    <p className={`text-sm ${step.done ? 'text-angel-ivory' : 'text-angel-muted'}`}>{step.text}</p>
                    <span className="text-xs text-angel-muted tabular-nums">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Actions sidebar */}
        <div className="space-y-4">
          <Panel className="p-5 space-y-3">
            <h3 className="text-sm font-medium text-angel-ivory">Response Actions</h3>
            <GoldButton onClick={() => updateStatus('acknowledged')} className="w-full flex items-center justify-center gap-2" disabled={alert.status === 'acknowledged'}>
              <Check size={16} />
              {alert.status === 'acknowledged' ? 'Acknowledged' : 'Acknowledge'}
            </GoldButton>
            <GhostButton onClick={() => updateStatus('escalated')} className="w-full flex items-center justify-center gap-2 border-angel-warning/30 text-angel-warning hover:border-angel-warning/50" disabled={alert.status === 'escalated'}>
              <ArrowUpRight size={16} />
              {alert.status === 'escalated' ? 'Escalated' : 'Escalate'}
            </GhostButton>
            <GhostButton onClick={() => updateStatus('resolved')} className="w-full flex items-center justify-center gap-2 border-angel-secure/30 text-angel-secure hover:border-angel-secure/50" disabled={alert.status === 'resolved'}>
              <ShieldCheck size={16} />
              {alert.status === 'resolved' ? 'Resolved' : 'Mark Resolved'}
            </GhostButton>
          </Panel>

          <Panel className="p-5">
            <h3 className="text-sm font-medium text-angel-ivory mb-4">Assigned Guardian</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-angel-bg font-semibold text-sm">
                DO
              </div>
              <div>
                <p className="text-sm font-medium text-angel-ivory">Daniel Okafor</p>
                <p className="text-xs text-angel-muted">Head of Security</p>
              </div>
            </div>
            <button
              onClick={() => navigate('incidents')}
              className="w-full mt-4 text-sm text-angel-gold hover:text-angel-gold-light flex items-center justify-center gap-1 transition-colors py-2"
            >
              View Incident Report <ArrowRight size={14} />
            </button>
          </Panel>
        </div>
      </div>
    </div>
  );
}
