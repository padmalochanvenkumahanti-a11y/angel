import { useState } from 'react';
import {
  LayoutDashboard,
  Video,
  UploadCloud,
  Bell,
  FileText,
  BarChart3,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Shield,
} from 'lucide-react';
import { useRouter, type Page } from '@/router';
import { Logo } from '@/components/Logo';

const navItems: { page: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'cameras', label: 'Live Cameras', icon: Video },
  { page: 'upload', label: 'Upload & Test', icon: UploadCloud },
  { page: 'alerts', label: 'Alerts', icon: Bell },
  { page: 'incidents', label: 'Incidents', icon: FileText },
  { page: 'analytics', label: 'Analytics', icon: BarChart3 },
  { page: 'guardians', label: 'Guardians', icon: Users },
  { page: 'settings', label: 'Settings', icon: SettingsIcon },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { page, navigate, setAuthed } = useRouter();
  const currentRoot = page.replace('-detail', '');

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-angel-panel border-r border-angel-border z-50 lg:z-30 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-5 py-6 border-b border-angel-border">
          <button onClick={() => navigate('dashboard')}>
            <Logo size="sm" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 no-scrollbar">
          <div className="px-2 mb-3">
            <span className="text-[10px] font-medium tracking-widest text-angel-muted uppercase">Monitoring</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentRoot === item.page;
            return (
              <button
                key={item.page}
                onClick={() => {
                  navigate(item.page);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5 ${
                  active
                    ? 'bg-angel-gold/10 text-angel-gold-light border border-angel-gold/20'
                    : 'text-angel-muted hover:text-angel-ivory hover:bg-angel-panel-hover border border-transparent'
                }`}
              >
                <Icon size={18} className={active ? 'text-angel-gold' : ''} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-angel-border">
          <div className="px-3 py-3 rounded-lg bg-angel-bg border border-angel-border-soft mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Shield size={14} className="text-angel-secure" />
              <span className="text-xs font-medium text-angel-secure">System Secure</span>
            </div>
            <p className="text-[10px] text-angel-muted leading-relaxed">All monitoring modules operational</p>
          </div>
          <button
            onClick={() => {
              setAuthed(false);
              navigate('landing');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-angel-muted hover:text-angel-critical hover:bg-angel-panel-hover transition-all duration-200"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const { navigate } = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-angel-border">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-angel-muted hover:text-angel-ivory hover:bg-angel-panel-hover"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div>
            <h2 className="text-lg font-semibold text-angel-ivory">Good afternoon, Operator</h2>
            <p className="text-xs text-angel-muted">{today}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('alerts')}
            className="relative p-2.5 rounded-lg text-angel-muted hover:text-angel-gold hover:bg-angel-panel-hover transition-all"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-angel-critical rounded-full animate-pulse-soft" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-angel-panel-hover transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-angel-bg font-semibold text-sm">
                DO
              </div>
              <span className="hidden sm:block text-sm font-medium text-angel-ivory">Daniel O.</span>
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-angel-panel border border-angel-border rounded-xl shadow-2xl z-50 overflow-hidden animate-slide-in-right">
                  <div className="px-4 py-3 border-b border-angel-border">
                    <p className="text-sm font-medium text-angel-ivory">Daniel Okafor</p>
                    <p className="text-xs text-angel-muted">Head of Security</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => { navigate('settings'); setProfileOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-angel-muted hover:text-angel-ivory hover:bg-angel-panel-hover flex items-center gap-2"
                    >
                      <SettingsIcon size={16} /> Settings
                    </button>
                    <button
                      onClick={() => { navigate('guardians'); setProfileOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-angel-muted hover:text-angel-ivory hover:bg-angel-panel-hover flex items-center gap-2"
                    >
                      <Users size={16} /> Guardians
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
