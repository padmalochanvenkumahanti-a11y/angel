import { useState } from 'react';
import { Maximize2, X, MapPin, Clock, Video, Wifi } from 'lucide-react';
import { useRouter } from '@/router';
import { Panel, StatusBadge } from '@/components/ui';
import { cameras } from '@/data';
import { statusClasses } from '@/utils';

const groups = ['All', 'Home', 'Campus', 'Hospital', 'Office', 'Factory'];

export function CamerasPage() {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? cameras : cameras.filter((c) => c.group === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-angel-ivory">Live Cameras</h1>
          <p className="text-sm text-angel-muted mt-1">Real-time monitoring across all locations</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-angel-muted">
          <Wifi size={14} className="text-angel-secure" />
          <span>{cameras.filter((c) => c.status === 'online').length} of {cameras.length} cameras online</span>
        </div>
      </div>

      {/* Group filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              filter === g
                ? 'bg-angel-gold/10 text-angel-gold-light border border-angel-gold/30'
                : 'text-angel-muted hover:text-angel-ivory border border-angel-border'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Camera grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cam) => (
          <button
            key={cam.id}
            onClick={() => navigate('camera-detail', cam.id)}
            className="group text-left"
          >
            <Panel className="overflow-hidden hover:border-angel-gold/30 transition-all duration-300">
              <div className="relative aspect-video bg-angel-bg overflow-hidden scan-overlay">
                <img src={cam.image} alt={cam.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-angel-bg/90 via-angel-bg/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusClasses(cam.status).dot} ${cam.status === 'online' ? 'animate-pulse-soft' : ''}`} />
                  <span className="text-xs font-medium text-angel-ivory">{cam.name}</span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] text-angel-muted tabular-nums bg-angel-bg/60 px-2 py-0.5 rounded">
                    {cam.lastUpdate.split(' ')[1]}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-angel-bg/80 flex items-center justify-center">
                    <Maximize2 size={16} className="text-angel-gold" />
                  </div>
                </div>
                {cam.status !== 'online' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-angel-bg/80 text-xs font-medium text-angel-warning">
                      {cam.status === 'maintenance' ? 'Maintenance Mode' : 'Offline'}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <StatusBadge status={cam.status} />
                  <span className="text-[10px] text-angel-muted tracking-wide uppercase">{cam.group}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-angel-muted">
                  <MapPin size={12} /> {cam.location}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-angel-muted">
                  <Clock size={12} /> {cam.lastUpdate}
                </div>
              </div>
            </Panel>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CameraDetailPage() {
  const { param, navigate } = useRouter();
  const cam = cameras.find((c) => c.id === param) || cameras[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('cameras')}
            className="w-9 h-9 rounded-lg border border-angel-border flex items-center justify-center text-angel-muted hover:text-angel-ivory hover:border-angel-gold/30 transition-all"
          >
            <X size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-angel-ivory">{cam.name}</h1>
            <p className="text-sm text-angel-muted">{cam.location}</p>
          </div>
        </div>
        <StatusBadge status={cam.status} />
      </div>

      {/* Full screen view */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-angel-bg border border-angel-border scan-overlay">
        <img src={cam.image} alt={cam.name} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-angel-bg/60 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-angel-bg/70 glass-panel">
          <span className={`w-2 h-2 rounded-full ${statusClasses(cam.status).dot} ${cam.status === 'online' ? 'animate-pulse-soft' : ''}`} />
          <span className="text-xs font-medium text-angel-ivory">REC · LIVE</span>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-angel-bg/70 glass-panel">
          <span className="text-xs text-angel-muted tabular-nums">{cam.lastUpdate}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-angel-bg/70 glass-panel">
            <Video size={14} className="text-angel-gold" />
            <span className="text-xs text-angel-ivory">{cam.name} — {cam.group}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-angel-bg/70 glass-panel">
            <MapPin size={14} className="text-angel-gold" />
            <span className="text-xs text-angel-ivory">{cam.location}</span>
          </div>
        </div>
      </div>

      {/* Camera info */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Panel className="p-5">
          <p className="text-xs text-angel-muted uppercase tracking-wide mb-2">Camera ID</p>
          <p className="text-lg font-medium text-angel-ivory">{cam.id}</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-xs text-angel-muted uppercase tracking-wide mb-2">Group</p>
          <p className="text-lg font-medium text-angel-ivory">{cam.group}</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-xs text-angel-muted uppercase tracking-wide mb-2">Last Update</p>
          <p className="text-lg font-medium text-angel-ivory">{cam.lastUpdate}</p>
        </Panel>
      </div>

      {/* Other cameras */}
      <div>
        <h3 className="text-sm font-medium text-angel-muted tracking-wide uppercase mb-4">Other Cameras</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {cameras.filter((c) => c.id !== cam.id).map((c) => (
            <button
              key={c.id}
              onClick={() => navigate('camera-detail', c.id)}
              className="group text-left"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-angel-panel border border-angel-border group-hover:border-angel-gold/30 transition-all">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-angel-bg/80 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] font-medium text-angel-ivory">{c.name}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
