import { useState } from 'react';
import { RouterProvider, useRouter } from '@/router';
import { Sidebar, TopBar } from '@/components/Shell';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CamerasPage, CameraDetailPage } from '@/pages/CamerasPage';
import { UploadPage } from '@/pages/UploadPage';
import { AlertsPage, AlertDetailPage } from '@/pages/AlertsPage';
import { IncidentsPage, IncidentDetailPage } from '@/pages/IncidentsPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { GuardiansPage } from '@/pages/GuardiansPage';
import { SettingsPage } from '@/pages/SettingsPage';

function AppContent() {
  const { page, isAuthed } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const standalonePages = ['landing', 'login', 'signup'];
  const isStandalone = standalonePages.includes(page) || !isAuthed;

  if (isStandalone) {
    if (page === 'login') return <AuthPage mode="login" />;
    if (page === 'signup') return <AuthPage mode="signup" />;
    return <LandingPage />;
  }

  const dashboardPages: Record<string, React.ReactNode> = {
    dashboard: <DashboardPage />,
    cameras: <CamerasPage />,
    'camera-detail': <CameraDetailPage />,
    upload: <UploadPage />,
    alerts: <AlertsPage />,
    'alert-detail': <AlertDetailPage />,
    incidents: <IncidentsPage />,
    'incident-detail': <IncidentDetailPage />,
    analytics: <AnalyticsPage />,
    guardians: <GuardiansPage />,
    settings: <SettingsPage />,
  };

  const content = dashboardPages[page] || <DashboardPage />;

  return (
    <div className="flex min-h-screen bg-angel-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 lg:px-8 py-8 max-w-7xl mx-auto">{content}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
