import { useState } from 'react';
import { X, Plus, Phone, Mail, Bell, User } from 'lucide-react';
import { Panel, GoldButton, GhostButton } from '@/components/ui';
import { guardians as initialGuardians } from '@/data';
import type { Guardian } from '@/types';

export function GuardiansPage() {
  const [guardians, setGuardians] = useState<Guardian[]>(initialGuardians);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', phone: '', email: '', notificationPref: 'Push + SMS' });

  const addGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    const newG: Guardian = {
      id: `g-${String(guardians.length + 1).padStart(3, '0')}`,
      name: form.name,
      role: form.role,
      phone: form.phone,
      email: form.email,
      notificationPref: form.notificationPref,
      status: 'active',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    };
    setGuardians([...guardians, newG]);
    setForm({ name: '', role: '', phone: '', email: '', notificationPref: 'Push + SMS' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-angel-ivory">Guardians</h1>
          <p className="text-sm text-angel-muted mt-1">Emergency contacts and response team</p>
        </div>
        <GoldButton onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Add Guardian
        </GoldButton>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {guardians.map((g) => (
          <Panel key={g.id} className="p-5 hover:border-angel-gold/20 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <img src={g.avatar} alt={g.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-angel-ivory truncate">{g.name}</h3>
                <p className="text-xs text-angel-muted">{g.role}</p>
              </div>
              <span className={`flex items-center gap-1.5 text-xs ${g.status === 'active' ? 'text-angel-secure' : 'text-angel-muted'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${g.status === 'active' ? 'bg-angel-secure animate-pulse-soft' : 'bg-angel-muted'}`} />
                {g.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="space-y-2 pt-3 border-t border-angel-border-soft">
              <div className="flex items-center gap-2 text-xs text-angel-muted">
                <Phone size={12} className="text-angel-gold/60" />
                {g.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-angel-muted">
                <Mail size={12} className="text-angel-gold/60" />
                {g.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-angel-muted">
                <Bell size={12} className="text-angel-gold/60" />
                {g.notificationPref}
              </div>
            </div>
          </Panel>
        ))}
      </div>

      {/* Add Guardian Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <Panel className="relative w-full max-w-md p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-angel-ivory">Add Guardian</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg border border-angel-border flex items-center justify-center text-angel-muted hover:text-angel-ivory transition-all"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={addGuardian} className="space-y-4">
              <div>
                <label className="block text-xs text-angel-muted mb-2 tracking-wide uppercase">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-angel-muted" />
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-angel-bg border border-angel-border rounded-lg text-sm text-angel-ivory placeholder-angel-muted/50 focus:border-angel-gold/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-angel-muted mb-2 tracking-wide uppercase">Role</label>
                <input
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Response Team Member"
                  className="w-full px-4 py-2.5 bg-angel-bg border border-angel-border rounded-lg text-sm text-angel-ivory placeholder-angel-muted/50 focus:border-angel-gold/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-angel-muted mb-2 tracking-wide uppercase">Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-angel-muted" />
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 bg-angel-bg border border-angel-border rounded-lg text-sm text-angel-ivory placeholder-angel-muted/50 focus:border-angel-gold/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-angel-muted mb-2 tracking-wide uppercase">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-angel-muted" />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@angel-cctv.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-angel-bg border border-angel-border rounded-lg text-sm text-angel-ivory placeholder-angel-muted/50 focus:border-angel-gold/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-angel-muted mb-2 tracking-wide uppercase">Notification Preference</label>
                <select
                  value={form.notificationPref}
                  onChange={(e) => setForm({ ...form, notificationPref: e.target.value })}
                  className="w-full px-4 py-2.5 bg-angel-bg border border-angel-border rounded-lg text-sm text-angel-ivory focus:border-angel-gold/50 focus:outline-none transition-colors"
                >
                  <option className="bg-angel-panel">Push + SMS</option>
                  <option className="bg-angel-panel">Push + SMS + Email</option>
                  <option className="bg-angel-panel">SMS + Email</option>
                  <option className="bg-angel-panel">Email Only</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <GoldButton type="submit" className="flex-1">Add Guardian</GoldButton>
                <GhostButton onClick={() => setShowModal(false)}>Cancel</GhostButton>
              </div>
            </form>
          </Panel>
        </div>
      )}
    </div>
  );
}
