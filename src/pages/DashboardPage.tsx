import {
  ShieldCheck,
  Video,
  Bell,
  AlertTriangle,
  ArrowRight,
  Activity,
  MapPin,
  Clock,
} from 'lucide-react';
import { useRouter } from '@/router';
import { Panel, SeverityBadge, StatusBadge } from '@/components/ui';
import { MetricCard } from '@/components/MetricCard';
import { cameras, alerts, recentActivity } from '@/data';
import { statusClasses } from '@/utils';

export function DashboardPage() {
  const { navigate } = useRouter();
  const featuredCameras = cameras.slice(0, 3);
  const latestAlerts = alerts.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Status banner */}
      <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-angel-secure/10 to-transparent border border-angel-secure/20 rounded-xl">
        <div className="w-10 h-10 rounded-lg bg-angel-secure/15 flex items-center justify-center shrink-0">
          <ShieldCheck size={22} className="text-angel-secure" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-angel-ivory">All Areas Secure</h3>
          <p className="text-sm text-angel-muted">5 of 6 cameras online. 1 in maintenance. No active critical threats.</p>
        </div>
        <StatusBadge status="online" />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Cameras" value="6" icon={Video} accent="gold" />
        <MetricCard label="Online Cameras" value="5" icon={ShieldCheck} accent="secure" />
        <MetricCard label="Alerts Today" value="9" icon={Bell} accent="warning" />
        <MetricCard label="Critical Alerts" value="3" icon={AlertTriangle} accent="critical" />
      </div>

      {/* Featured cameras + latest alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cameras */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase">Featured Cameras</h3>
            <button
              onClick={() => navigate('cameras')}
              className="text-sm text-angel-gold hover:text-angel-gold-light flex items-center gap-1 transition-colors"
            >
              View All Cameras <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {featuredCameras.map((cam) => (
              <button
                key={cam.id}
                onClick={() => navigate('camera-detail', cam.id)}
                className="group text-left"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-angel-panel border border-angel-border group-hover:border-angel-gold/30 transition-all">
                  <img src={cam.image} alt={cam.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-angel-bg/80 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className={`w-2 h-2 rounded-full ${statusClasses(cam.status).dot} ${cam.status === 'online' ? 'animate-pulse-soft' : ''}`} />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs font-medium text-angel-ivory">{cam.name}</p>
                    <p className="text-[10px] text-angel-muted truncate">{cam.location}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Latest alerts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase">Latest Alerts</h3>
            <button
              onClick={() => navigate('alerts')}
              className="text-sm text-angel-gold hover:text-angel-gold-light flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <Panel className="divide-y divide-angel-border-soft">
            {latestAlerts.map((alert) => (
              <button
                key={alert.id}
                onClick={() => navigate('alert-detail', alert.id)}
                className="w-full flex items-start gap-3 p-3.5 hover:bg-angel-panel-hover transition-colors text-left"
              >
                <img src={alert.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-angel-ivory truncate">{alert.type}</p>
                  <p className="text-[10px] text-angel-muted truncate">{alert.cameraName} · {alert.timestamp.split(' ')[1]}</p>
                </div>
                <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                  alert.severity === 'critical' ? 'bg-angel-critical' : alert.severity === 'warning' ? 'bg-angel-warning' : 'bg-angel-gold'
                }`} />
              </button>
            ))}
          </Panel>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-4">Recent Activity</h3>
        <Panel className="p-6">
          <div className="space-y-1">
            {recentActivity.map((act, i) => (
              <div key={act.id} className="flex items-start gap-4 py-3 relative">
                {i < recentActivity.length - 1 && (
                  <div className="absolute left-[7px] top-12 bottom-0 w-px bg-angel-border" />
                )}
                <div className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 z-10 ring-4 ring-angel-panel ${
                  act.type === 'critical' ? 'bg-angel-critical' :
                  act.type === 'warning' ? 'bg-angel-warning' :
                  act.type === 'secure' ? 'bg-angel-secure' : 'bg-angel-gold'
                }`} />
                <div className="flex-1 flex items-center justify-between gap-4">
                  <p className="text-sm text-angel-ivory">{act.text}</p>
                  <span className="text-xs text-angel-muted whitespace-nowrap">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
