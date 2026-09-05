import { useState } from 'react';
import {
  Shield,
  Eye,
  Zap,
  ArrowRight,
  Check,
  Video,
  Bell,
  FileText,
  BarChart3,
  Users,
  Lock,
  Play,
  Building2,
  Hospital,
  Factory,
  GraduationCap,
  Home,
  Star,
} from 'lucide-react';
import { useRouter } from '@/router';
import { Logo } from '@/components/Logo';

export function LandingPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-angel-bg">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-angel-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Logo size="sm" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm text-angel-muted hover:text-angel-ivory transition-colors">How It Works</a>
            <a href="#features" className="text-sm text-angel-muted hover:text-angel-ivory transition-colors">Features</a>
            <a href="#usecases" className="text-sm text-angel-muted hover:text-angel-ivory transition-colors">Use Cases</a>
            <a href="#pricing" className="text-sm text-angel-muted hover:text-angel-ivory transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('login')}
              className="hidden sm:block text-sm font-medium text-angel-ivory hover:text-angel-gold transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('signup')}
              className="px-5 py-2 bg-gradient-gold text-angel-bg font-medium text-sm rounded-lg hover:brightness-110 transition-all"
            >
              Explore Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-angel-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-angel-gold/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-angel-panel border border-angel-border mb-8 animate-fade-in">
            <Shield size={14} className="text-angel-gold" />
            <span className="text-xs font-medium tracking-wide text-angel-muted">AI Network for Guardian, Emergency & Life Safety</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-angel-ivory leading-[1.05] mb-6 animate-slide-up">
            See. Understand. <span className="text-gradient-gold">Alert.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-angel-muted font-light max-w-3xl mx-auto mb-4 leading-relaxed">
            Intelligent protection when every second matters.
          </p>
          <p className="text-base text-angel-muted/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            ANGEL CCTV transforms ordinary surveillance into an active safety system — using AI-assisted detection
            and rapid guardian response to protect what matters most.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('signup')}
              className="px-8 py-3.5 bg-gradient-gold text-angel-bg font-semibold rounded-lg hover:brightness-110 transition-all duration-200 gold-glow flex items-center gap-2 group"
            >
              Explore Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('login')}
              className="px-8 py-3.5 border border-angel-border text-angel-ivory font-medium rounded-lg hover:border-angel-gold/50 hover:bg-angel-panel transition-all duration-200 flex items-center gap-2"
            >
              <Play size={16} />
              Sign In
            </button>
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative max-w-5xl mx-auto mt-16 animate-slide-up">
          <div className="relative rounded-2xl border border-angel-border bg-angel-panel overflow-hidden gold-glow">
            <div className="grid grid-cols-3 gap-px bg-angel-border">
              {[
                { label: 'Main Gate', status: 'Online', img: 'https://images.pexels.com/photos/258262/pexels-photo-258262.jpeg?auto=compress&cs=tinysrgb&w=600' },
                { label: 'Corridor A', status: 'Alert', img: 'https://images.pexels.com/photos/31377788/pexels-photo-31377788.jpeg?auto=compress&cs=tinysrgb&w=600' },
                { label: 'Reception', status: 'Online', img: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=600' },
              ].map((cam, i) => (
                <div key={i} className="relative aspect-video bg-angel-bg overflow-hidden scan-overlay">
                  <img src={cam.img} alt={cam.label} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-angel-bg/90 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${cam.status === 'Alert' ? 'bg-angel-critical animate-pulse-soft' : 'bg-angel-secure'}`} />
                    <span className="text-[10px] font-medium text-angel-ivory tracking-wide">{cam.label}</span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`text-[10px] font-medium ${cam.status === 'Alert' ? 'text-angel-critical' : 'text-angel-secure'}`}>
                      {cam.status === 'Alert' ? 'AI: Fall Detected' : 'LIVE'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] text-angel-muted tabular-nums">14:32</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 px-6 lg:px-10 border-t border-angel-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-angel-gold uppercase">How It Works</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-angel-ivory mt-3">Three layers of protection</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, step: '01', title: 'See', desc: 'Connect any CCTV feed. ANGEL continuously monitors every camera in real time, day and night.' },
              { icon: Zap, step: '02', title: 'Understand', desc: 'AI analyzes movement, crowds, falls, fire, and intrusions — distinguishing real threats from noise.' },
              { icon: Bell, step: '03', title: 'Alert', desc: 'Verified threats trigger instant alerts to designated guardians with evidence and response actions.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative bg-angel-panel border border-angel-border rounded-xl p-8 hover:border-angel-gold/30 transition-all duration-300 group">
                  <span className="absolute top-6 right-6 text-5xl font-bold text-angel-border group-hover:text-angel-gold/20 transition-colors">{item.step}</span>
                  <div className="w-12 h-12 rounded-lg bg-angel-gold/10 flex items-center justify-center mb-5">
                    <Icon size={24} className="text-angel-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-angel-ivory mb-3">{item.title}</h3>
                  <p className="text-sm text-angel-muted leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 lg:px-10 border-t border-angel-border bg-angel-panel/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-angel-gold uppercase">Features</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-angel-ivory mt-3">Built for uncompromising safety</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Video, title: 'Live Camera Monitoring', desc: 'View all feeds in a unified grid with real-time status and full-screen detail.' },
              { icon: Zap, title: 'AI-Assisted Detection', desc: 'Seven detection types from intrusion to fire, with confidence scoring.' },
              { icon: Bell, title: 'Smart Alert Management', desc: 'Acknowledge, escalate, and resolve alerts with full evidence trails.' },
              { icon: FileText, title: 'Incident Reporting', desc: 'Auto-generated incident reports with AI timelines and guardian records.' },
              { icon: BarChart3, title: 'Analytics & Insights', desc: 'Track alert trends, camera uptime, and response times over time.' },
              { icon: Users, title: 'Guardian Network', desc: 'Designate emergency contacts with custom notification preferences.' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-angel-panel border border-angel-border rounded-xl p-6 hover:border-angel-gold/20 transition-all duration-300">
                  <Icon size={22} className="text-angel-gold mb-4" />
                  <h3 className="text-base font-semibold text-angel-ivory mb-2">{f.title}</h3>
                  <p className="text-sm text-angel-muted leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="usecases" className="py-24 px-6 lg:px-10 border-t border-angel-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-angel-gold uppercase">Use Cases</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-angel-ivory mt-3">Protection for every space</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Home, title: 'Home', desc: 'Residential perimeters, entry points, and family safety zones.' },
              { icon: GraduationCap, title: 'Campus', desc: 'School and university corridors, gates, and student safety areas.' },
              { icon: Hospital, title: 'Hospital', desc: 'Patient monitoring, fall detection, and emergency response.' },
              { icon: Building2, title: 'Office', desc: 'Corporate lobbies, parking structures, and access control.' },
              { icon: Factory, title: 'Factory', desc: 'Industrial safety, restricted zones, and hazard detection.' },
              { icon: Shield, title: 'Public Spaces', desc: 'Crowd management and rapid emergency escalation.' },
            ].map((u, i) => {
              const Icon = u.icon;
              return (
                <div key={i} className="flex items-start gap-4 p-6 bg-angel-panel border border-angel-border rounded-xl hover:border-angel-gold/20 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-angel-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-angel-gold" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-angel-ivory mb-1">{u.title}</h3>
                    <p className="text-sm text-angel-muted leading-relaxed">{u.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 lg:px-10 border-t border-angel-border bg-angel-panel/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-angel-gold uppercase">Pricing</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-angel-ivory mt-3">Plans scaled to your needs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Sentinel', price: '$49', period: '/month', features: ['Up to 4 cameras', 'AI detection — all types', 'Email alerts', '1 guardian', '7-day retention'], popular: false },
              { name: 'Guardian', price: '$149', period: '/month', features: ['Up to 16 cameras', 'AI detection — all types', 'Push + SMS + Email alerts', '5 guardians', '30-day retention', 'Analytics dashboard'], popular: true },
              { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited cameras', 'Custom AI models', 'Emergency escalation', 'Unlimited guardians', '90-day retention', 'Dedicated support'], popular: false },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-angel-panel border-2 border-angel-gold/40 gold-glow-strong'
                    : 'bg-angel-panel border border-angel-border hover:border-angel-gold/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-gold rounded-full text-xs font-semibold text-angel-bg flex items-center gap-1">
                    <Star size={12} fill="currentColor" /> Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-angel-ivory mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-angel-gold">{plan.price}</span>
                  <span className="text-sm text-angel-muted">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-angel-muted">
                      <Check size={16} className="text-angel-secure shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('signup')}
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                    plan.popular
                      ? 'bg-gradient-gold text-angel-bg hover:brightness-110'
                      : 'border border-angel-border text-angel-ivory hover:border-angel-gold/50'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-10 border-t border-angel-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-gold mx-auto flex items-center justify-center mb-6 gold-glow">
            <Shield size={32} className="text-angel-bg" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-angel-ivory mb-4">Ready to see ANGEL in action?</h2>
          <p className="text-lg text-angel-muted mb-8 leading-relaxed">
            Explore the full demo experience — no setup required.
          </p>
          <button
            onClick={() => navigate('signup')}
            className="px-8 py-3.5 bg-gradient-gold text-angel-bg font-semibold rounded-lg hover:brightness-110 transition-all gold-glow inline-flex items-center gap-2 group"
          >
            Start Demo
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-10 border-t border-angel-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="sm" />
            <p className="text-sm text-angel-muted">See. Understand. Alert.</p>
            <div className="flex items-center gap-6">
              <a href="#how" className="text-xs text-angel-muted hover:text-angel-gold transition-colors">How It Works</a>
              <a href="#features" className="text-xs text-angel-muted hover:text-angel-gold transition-colors">Features</a>
              <a href="#pricing" className="text-xs text-angel-muted hover:text-angel-gold transition-colors">Pricing</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-angel-border-soft flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-angel-muted">© 2026 ANGEL CCTV. All rights reserved.</p>
            <p className="text-xs text-angel-muted flex items-center gap-2">
              <Lock size={12} /> Secure authentication will be connected in the next phase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
