import { useState } from 'react';
import { Calendar, Filter, TrendingUp, TrendingDown, Clock, Zap } from 'lucide-react';
import { Panel } from '@/components/ui';
import {
  alertTrendData,
  alertTypeData,
  cameraUptimeData,
  topLocationsData,
  responseTimeData,
} from '@/data';

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [cameraFilter, setCameraFilter] = useState('all');

  const maxTrend = Math.max(...alertTrendData.flatMap((d) => [d.critical + d.warning + d.info]));
  const maxType = Math.max(...alertTypeData.map((d) => d.count));
  const maxLocation = Math.max(...topLocationsData.map((d) => d.count));
  const maxResponse = Math.max(...responseTimeData.map((d) => d.time));
  const avgResponse = (responseTimeData.reduce((s, d) => s + d.time, 0) / responseTimeData.length).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-angel-ivory">Analytics</h1>
          <p className="text-sm text-angel-muted mt-1">Safety insights and trends</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-angel-panel border border-angel-border rounded-lg">
            <Calendar size={14} className="text-angel-muted" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-sm text-angel-ivory focus:outline-none"
            >
              <option value="24h" className="bg-angel-panel">Last 24 hours</option>
              <option value="7d" className="bg-angel-panel">Last 7 days</option>
              <option value="30d" className="bg-angel-panel">Last 30 days</option>
              <option value="90d" className="bg-angel-panel">Last 90 days</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-angel-panel border border-angel-border rounded-lg">
            <Filter size={14} className="text-angel-muted" />
            <select
              value={cameraFilter}
              onChange={(e) => setCameraFilter(e.target.value)}
              className="bg-transparent text-sm text-angel-ivory focus:outline-none"
            >
              <option value="all" className="bg-angel-panel">All Cameras</option>
              <option value="gate" className="bg-angel-panel">Main Gate</option>
              <option value="parking" className="bg-angel-panel">Parking Area</option>
              <option value="corridor" className="bg-angel-panel">Corridor A</option>
              <option value="exit" className="bg-angel-panel">Emergency Exit</option>
              <option value="reception" className="bg-angel-panel">Reception</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Alerts', value: '87', trend: '+12%', up: true, icon: Zap, color: 'text-angel-gold' },
          { label: 'Critical Events', value: '8', trend: '-3%', up: false, icon: TrendingDown, color: 'text-angel-critical' },
          { label: 'Avg Response', value: `${avgResponse}m`, trend: '-0.4m', up: false, icon: Clock, color: 'text-angel-secure' },
          { label: 'Camera Uptime', value: '97.3%', trend: '+1.2%', up: true, icon: TrendingUp, color: 'text-angel-secure' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Panel key={i} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-angel-muted tracking-wide uppercase">{stat.label}</span>
                <Icon size={18} className={stat.color} />
              </div>
              <div className="text-3xl font-bold text-angel-ivory mb-1">{stat.value}</div>
              <div className={`text-xs flex items-center gap-1 ${stat.up ? 'text-angel-warning' : 'text-angel-secure'}`}>
                {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.trend} vs last period
              </div>
            </Panel>
          );
        })}
      </div>

      {/* Alert trends - stacked bar */}
      <Panel className="p-6">
        <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-6">Alert Trends</h3>
        <div className="flex items-end justify-between gap-3 h-48">
          {alertTrendData.map((d) => {
            const total = d.critical + d.warning + d.info;
            const totalH = (total / maxTrend) * 100;
            const critH = (d.critical / total) * totalH;
            const warnH = (d.warning / total) * totalH;
            const infoH = (d.info / total) * totalH;
            return (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex flex-col-reverse h-40 justify-start relative">
                  <div className="w-full bg-angel-gold/60 rounded-b-sm transition-all group-hover:bg-angel-gold" style={{ height: `${infoH}%` }} />
                  <div className="w-full bg-angel-warning/70 transition-all group-hover:bg-angel-warning" style={{ height: `${warnH}%` }} />
                  <div className="w-full bg-angel-critical/80 rounded-t-sm transition-all group-hover:bg-angel-critical" style={{ height: `${critH}%` }} />
                </div>
                <span className="text-xs text-angel-muted">{d.label}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-angel-border-soft">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-angel-critical/80" /><span className="text-xs text-angel-muted">Critical</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-angel-warning/70" /><span className="text-xs text-angel-muted">Warning</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-angel-gold/60" /><span className="text-xs text-angel-muted">Info</span></div>
        </div>
      </Panel>

      {/* Two column charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alert types - horizontal bars */}
        <Panel className="p-6">
          <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-6">Alert Types</h3>
          <div className="space-y-4">
            {alertTypeData.map((d) => (
              <div key={d.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-angel-ivory">{d.label}</span>
                  <span className="text-sm font-medium text-angel-muted tabular-nums">{d.count}</span>
                </div>
                <div className="h-2 bg-angel-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      d.severity === 'critical' ? 'bg-angel-critical' : d.severity === 'warning' ? 'bg-angel-warning' : 'bg-angel-gold'
                    }`}
                    style={{ width: `${(d.count / maxType) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Camera uptime - circular style */}
        <Panel className="p-6">
          <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-6">Camera Uptime</h3>
          <div className="space-y-4">
            {cameraUptimeData.map((d) => (
              <div key={d.label} className="flex items-center gap-4">
                <div className="relative w-12 h-12 shrink-0">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#1E1E1E" strokeWidth="4" />
                    <circle
                      cx="24" cy="24" r="20" fill="none"
                      stroke={d.uptime >= 99 ? '#3E8F5E' : d.uptime >= 95 ? '#D48A1A' : '#C8364B'}
                      strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${(d.uptime / 100) * 125.6} 125.6`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-angel-ivory tabular-nums">
                    {d.uptime.toFixed(0)}%
                  </span>
                </div>
                <span className="text-sm text-angel-ivory flex-1 truncate">{d.label}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Two column charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top locations */}
        <Panel className="p-6">
          <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-6">Top Locations by Alerts</h3>
          <div className="space-y-4">
            {topLocationsData.map((d, i) => (
              <div key={d.label} className="flex items-center gap-4">
                <span className="text-xs text-angel-muted tabular-nums w-5">#{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-angel-ivory">{d.label}</span>
                    <span className="text-sm font-medium text-angel-gold-light">{d.count}</span>
                  </div>
                  <div className="h-2 bg-angel-bg rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-gold rounded-full transition-all duration-500" style={{ width: `${(d.count / maxLocation) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Average response time - line chart */}
        <Panel className="p-6">
          <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-6">Average Response Time (minutes)</h3>
          <div className="relative h-48">
            <svg className="w-full h-full" viewBox="0 0 300 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="responseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A227" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
                </linearGradient>
              </defs>
              {(() => {
                const pts = responseTimeData.map((d, i) => ({
                  x: (i / (responseTimeData.length - 1)) * 300,
                  y: 180 - (d.time / maxResponse) * 150 - 15,
                }));
                const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                const area = `${path} L 300 180 L 0 180 Z`;
                return (
                  <>
                    <path d={area} fill="url(#responseGrad)" />
                    <path d={path} fill="none" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {pts.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="3" fill="#E7D39A" />
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>
          <div className="flex items-center justify-between mt-4">
            {responseTimeData.map((d) => (
              <span key={d.label} className="text-xs text-angel-muted">{d.label}</span>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-angel-border-soft flex items-center justify-between">
            <span className="text-sm text-angel-muted">Weekly Average</span>
            <span className="text-lg font-bold text-angel-gold">{avgResponse}m</span>
          </div>
        </Panel>
      </div>
    </div>
  );
}
