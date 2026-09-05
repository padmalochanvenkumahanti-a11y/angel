import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Video,
  Lock,
  Trash2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Panel } from '@/components/ui';

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-all duration-200 relative shrink-0 ${
        on ? 'bg-angel-gold' : 'bg-angel-border'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-angel-ivory transition-transform duration-200 ${
          on ? 'translate-x-5' : ''
        }`}
      />
    </button>
  );
}

function SettingsRow({
  label,
  desc,
  children,
}: {
  label: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-angel-border-soft last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-angel-ivory">{label}</p>
        {desc && <p className="text-xs text-angel-muted mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof User;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Panel className="p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg bg-angel-gold/10 flex items-center justify-center">
          <Icon size={18} className="text-angel-gold" />
        </div>
        <h2 className="text-base font-semibold text-angel-ivory">{title}</h2>
      </div>
      <div className="mt-2">{children}</div>
    </Panel>
  );
}

export function SettingsPage() {
  const [toggles, setToggles] = useState({
    pushAlerts: true,
    emailAlerts: true,
    smsAlerts: false,
    emergencyEscalation: true,
    criticalOnly: false,
    weeklyDigest: true,
    motionDetection: true,
    crowdDetection: true,
    fallDetection: true,
    fireDetection: true,
    tamperDetection: true,
    intrusionDetection: true,
    unattendedDetection: true,
    twoFactor: true,
    sessionTimeout: true,
    dataEncryption: true,
    autoDelete30: true,
    autoDelete90: false,
    faceBlur: true,
    dataSharing: false,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles({ ...toggles, [key]: !toggles[key] });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-angel-ivory">Settings</h1>
        <p className="text-sm text-angel-muted mt-1">Manage your account and platform preferences</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Profile */}
        <SectionCard icon={User} title="Profile">
          <SettingsRow label="Full Name" desc="Daniel Okafor">
            <button className="text-sm text-angel-gold hover:text-angel-gold-light transition-colors">Edit</button>
          </SettingsRow>
          <SettingsRow label="Email" desc="d.okafor@angel-cctv.com">
            <button className="text-sm text-angel-gold hover:text-angel-gold-light transition-colors">Edit</button>
          </SettingsRow>
          <SettingsRow label="Role" desc="Head of Security">
            <button className="text-sm text-angel-gold hover:text-angel-gold-light transition-colors">Edit</button>
          </SettingsRow>
          <SettingsRow label="Profile Photo">
            <button className="text-sm text-angel-gold hover:text-angel-gold-light transition-colors">Change</button>
          </SettingsRow>
        </SectionCard>

        {/* Notification Preferences */}
        <SectionCard icon={Bell} title="Notification Preferences">
          <SettingsRow label="Push Notifications" desc="Real-time alerts on your device">
            <Toggle on={toggles.pushAlerts} onChange={() => toggle('pushAlerts')} />
          </SettingsRow>
          <SettingsRow label="Email Alerts" desc="Detailed alert summaries to your inbox">
            <Toggle on={toggles.emailAlerts} onChange={() => toggle('emailAlerts')} />
          </SettingsRow>
          <SettingsRow label="SMS Alerts" desc="Critical alerts via text message">
            <Toggle on={toggles.smsAlerts} onChange={() => toggle('smsAlerts')} />
          </SettingsRow>
          <SettingsRow label="Emergency Escalation" desc="Auto-escalate unresolved critical alerts">
            <Toggle on={toggles.emergencyEscalation} onChange={() => toggle('emergencyEscalation')} />
          </SettingsRow>
          <SettingsRow label="Critical Only" desc="Suppress non-critical notifications">
            <Toggle on={toggles.criticalOnly} onChange={() => toggle('criticalOnly')} />
          </SettingsRow>
          <SettingsRow label="Weekly Digest" desc="Summary report every Monday">
            <Toggle on={toggles.weeklyDigest} onChange={() => toggle('weeklyDigest')} />
          </SettingsRow>
        </SectionCard>

        {/* Alert Rules */}
        <SectionCard icon={AlertTriangle} title="Alert Rules">
          <SettingsRow label="Motion Detection" desc="Person detected in monitored area">
            <Toggle on={toggles.motionDetection} onChange={() => toggle('motionDetection')} />
          </SettingsRow>
          <SettingsRow label="Crowd Gathering" desc="Unusual crowd density detected">
            <Toggle on={toggles.crowdDetection} onChange={() => toggle('crowdDetection')} />
          </SettingsRow>
          <SettingsRow label="Possible Fall" desc="Person collapse or fall pattern">
            <Toggle on={toggles.fallDetection} onChange={() => toggle('fallDetection')} />
          </SettingsRow>
          <SettingsRow label="Smoke / Fire Warning" desc="Smoke or fire patterns detected">
            <Toggle on={toggles.fireDetection} onChange={() => toggle('fireDetection')} />
          </SettingsRow>
          <SettingsRow label="Camera Tampering" desc="Angle shift or obstruction">
            <Toggle on={toggles.tamperDetection} onChange={() => toggle('tamperDetection')} />
          </SettingsRow>
          <SettingsRow label="Restricted-Zone Intrusion" desc="Unauthorized entry to restricted areas">
            <Toggle on={toggles.intrusionDetection} onChange={() => toggle('intrusionDetection')} />
          </SettingsRow>
          <SettingsRow label="Unattended Object" desc="Object left unattended for extended period">
            <Toggle on={toggles.unattendedDetection} onChange={() => toggle('unattendedDetection')} />
          </SettingsRow>
        </SectionCard>

        {/* Camera Groups */}
        <SectionCard icon={Video} title="Camera Groups">
          <SettingsRow label="Home" desc="2 cameras assigned">
            <span className="text-sm text-angel-muted">Manage</span>
          </SettingsRow>
          <SettingsRow label="Campus" desc="3 cameras assigned">
            <span className="text-sm text-angel-muted">Manage</span>
          </SettingsRow>
          <SettingsRow label="Hospital" desc="1 camera assigned">
            <span className="text-sm text-angel-muted">Manage</span>
          </SettingsRow>
          <SettingsRow label="Office" desc="2 cameras assigned">
            <span className="text-sm text-angel-muted">Manage</span>
          </SettingsRow>
          <SettingsRow label="Factory" desc="1 camera assigned">
            <span className="text-sm text-angel-muted">Manage</span>
          </SettingsRow>
        </SectionCard>

        {/* Privacy */}
        <SectionCard icon={Lock} title="Privacy">
          <SettingsRow label="Face Blur" desc="Automatically blur faces in stored footage">
            <Toggle on={toggles.faceBlur} onChange={() => toggle('faceBlur')} />
          </SettingsRow>
          <SettingsRow label="Data Sharing" desc="Share anonymized data for AI improvement">
            <Toggle on={toggles.dataSharing} onChange={() => toggle('dataSharing')} />
          </SettingsRow>
        </SectionCard>

        {/* Retention */}
        <SectionCard icon={Clock} title="Retention">
          <SettingsRow label="Auto-Delete After 30 Days" desc="Automatically remove old footage">
            <Toggle on={toggles.autoDelete30} onChange={() => toggle('autoDelete30')} />
          </SettingsRow>
          <SettingsRow label="Auto-Delete After 90 Days" desc="Extended retention for enterprise">
            <Toggle on={toggles.autoDelete90} onChange={() => toggle('autoDelete90')} />
          </SettingsRow>
        </SectionCard>

        {/* Security */}
        <SectionCard icon={Shield} title="Security">
          <SettingsRow label="Two-Factor Authentication" desc="Require code on new device sign-in">
            <Toggle on={toggles.twoFactor} onChange={() => toggle('twoFactor')} />
          </SettingsRow>
          <SettingsRow label="Session Timeout" desc="Auto sign-out after 30 minutes inactivity">
            <Toggle on={toggles.sessionTimeout} onChange={() => toggle('sessionTimeout')} />
          </SettingsRow>
          <SettingsRow label="Data Encryption" desc="End-to-end encryption for all footage">
            <Toggle on={toggles.dataEncryption} onChange={() => toggle('dataEncryption')} />
          </SettingsRow>
        </SectionCard>

        {/* Danger zone */}
        <Panel className="p-6 border-angel-critical/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-angel-critical/10 flex items-center justify-center">
              <Trash2 size={18} className="text-angel-critical" />
            </div>
            <h2 className="text-base font-semibold text-angel-ivory">Danger Zone</h2>
          </div>
          <SettingsRow label="Delete Account" desc="Permanently remove your account and all data">
            <button className="px-4 py-2 text-sm font-medium text-angel-critical border border-angel-critical/30 rounded-lg hover:bg-angel-critical/10 transition-all">
              Delete
            </button>
          </SettingsRow>
        </Panel>
      </div>
    </div>
  );
}
