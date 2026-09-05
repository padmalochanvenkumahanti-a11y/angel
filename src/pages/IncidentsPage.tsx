import { useState } from 'react';
import { X, Download, FileText, Video, MapPin, Clock, User, ShieldCheck } from 'lucide-react';
import { useRouter } from '@/router';
import { Panel, SeverityBadge, GoldButton } from '@/components/ui';
import { incidents as initialIncidents } from '@/data';

export function IncidentsPage() {
  const { navigate } = useRouter();
  const [incidents] = useState(initialIncidents);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-angel-ivory">Incident Reports</h1>
          <p className="text-sm text-angel-muted mt-1">Documented incidents with full response records</p>
        </div>
        <GoldButton className="flex items-center gap-2">
          <FileText size={16} />
          Export All
        </GoldButton>
      </div>

      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-angel-border">
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3.5">Incident ID</th>
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3.5">Severity</th>
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3.5 hidden md:table-cell">Camera</th>
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3.5 hidden lg:table-cell">Date / Time</th>
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3.5 hidden sm:table-cell">Guardian</th>
                <th className="text-left text-xs font-medium text-angel-muted uppercase tracking-wide px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-angel-border-soft">
              {incidents.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => navigate('incident-detail', inc.id)}
                  className="hover:bg-angel-panel-hover transition-colors cursor-pointer"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-angel-gold-light">{inc.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <SeverityBadge severity={inc.severity} />
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-angel-ivory">{inc.cameraName}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-angel-muted">{inc.dateTime}</span>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-sm text-angel-ivory">{inc.guardian}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium ${
                      inc.status.includes('New') ? 'text-angel-gold-light' :
                      inc.status.includes('Escalated') ? 'text-angel-critical' :
                      inc.status.includes('Acknowledged') ? 'text-angel-ivory' :
                      'text-angel-secure'
                    }`}>
                      {inc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

export function IncidentDetailPage() {
  const { param, navigate } = useRouter();
  const inc = initialIncidents.find((i) => i.id === param) || initialIncidents[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('incidents')}
            className="w-9 h-9 rounded-lg border border-angel-border flex items-center justify-center text-angel-muted hover:text-angel-ivory hover:border-angel-gold/30 transition-all"
          >
            <X size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-angel-ivory">{inc.id}</h1>
            <p className="text-sm text-angel-muted">{inc.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SeverityBadge severity={inc.severity} />
          <GoldButton className="flex items-center gap-2">
            <Download size={16} />
            <span className="hidden sm:inline">Download Report</span>
          </GoldButton>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Video evidence */}
          <Panel className="overflow-hidden">
            <div className="relative aspect-video bg-angel-bg flex items-center justify-center">
              <img src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Evidence" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-angel-gold/20 backdrop-blur flex items-center justify-center">
                  <Video size={28} className="text-angel-gold-light ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-angel-bg/70 glass-panel">
                <span className="text-xs text-angel-ivory">Video Evidence</span>
              </div>
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-angel-bg/70 glass-panel">
                <span className="text-xs text-angel-muted tabular-nums">{inc.dateTime}</span>
              </div>
            </div>
          </Panel>

          {/* Description */}
          <Panel className="p-5">
            <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-3">Incident Description</h3>
            <p className="text-sm text-angel-ivory leading-relaxed">{inc.description}</p>
          </Panel>

          {/* AI event timeline */}
          <Panel className="p-5">
            <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-4">AI Event Timeline</h3>
            <div className="space-y-1">
              {[
                { time: '14:15:03', text: 'AI detected anomalous movement pattern' },
                { time: '14:15:08', text: 'Fall classification triggered — 91% confidence' },
                { time: '14:15:12', text: 'Alert created and guardian notified' },
                { time: '14:15:45', text: 'Guardian acknowledged alert' },
                { time: '14:16:20', text: 'Emergency response team dispatched' },
                { time: '14:18:00', text: 'On-site assessment began' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 relative">
                  {i < 5 && <div className="absolute left-[7px] top-10 bottom-0 w-px bg-angel-border" />}
                  <div className="w-3.5 h-3.5 rounded-full mt-1 shrink-0 z-10 ring-4 ring-angel-panel bg-angel-gold" />
                  <div className="flex-1 flex items-center justify-between">
                    <p className="text-sm text-angel-ivory">{step.text}</p>
                    <span className="text-xs text-angel-muted tabular-nums">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Resolution */}
          <Panel className="p-5">
            <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-3">Resolution</h3>
            <p className="text-sm text-angel-ivory leading-relaxed">{inc.resolution}</p>
          </Panel>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Panel className="p-5 space-y-4">
            <h3 className="text-sm font-medium text-angel-ivory">Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText size={14} className="text-angel-muted" />
                <span className="text-xs text-angel-muted">Type</span>
                <span className="text-sm text-angel-ivory ml-auto">{inc.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <Video size={14} className="text-angel-muted" />
                <span className="text-xs text-angel-muted">Camera</span>
                <span className="text-sm text-angel-ivory ml-auto">{inc.cameraName}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-angel-muted" />
                <span className="text-xs text-angel-muted">Location</span>
                <span className="text-sm text-angel-ivory ml-auto text-right">{inc.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-angel-muted" />
                <span className="text-xs text-angel-muted">Time</span>
                <span className="text-sm text-angel-ivory ml-auto">{inc.dateTime}</span>
              </div>
            </div>
          </Panel>

          <Panel className="p-5">
            <h3 className="text-sm font-medium text-angel-ivory mb-4">Assigned Guardian</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-angel-bg font-semibold text-sm">
                {inc.guardian === 'Unassigned' ? '?' : inc.guardian.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-angel-ivory">{inc.guardian}</p>
                <p className="text-xs text-angel-muted">{inc.guardian === 'Unassigned' ? 'Awaiting assignment' : 'Response Team'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-angel-border-soft">
              <ShieldCheck size={14} className="text-angel-secure" />
              <span className="text-xs text-angel-secure">{inc.status}</span>
            </div>
          </Panel>

          <Panel className="p-5">
            <h3 className="text-sm font-medium text-angel-ivory mb-3">Notes</h3>
            <textarea
              className="w-full bg-angel-bg border border-angel-border rounded-lg p-3 text-sm text-angel-ivory placeholder-angel-muted/50 focus:border-angel-gold/50 focus:outline-none transition-colors resize-none"
              rows={4}
              placeholder="Add internal notes..."
            />
            <GoldButton className="w-full mt-3 text-sm">Save Note</GoldButton>
          </Panel>
        </div>
      </div>
    </div>
  );
}
