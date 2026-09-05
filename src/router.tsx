import { createContext, useContext, useState, type ReactNode } from 'react';

export type Page =
  | 'landing'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'cameras'
  | 'camera-detail'
  | 'upload'
  | 'alerts'
  | 'alert-detail'
  | 'incidents'
  | 'incident-detail'
  | 'analytics'
  | 'guardians'
  | 'settings';

interface RouterContextType {
  page: Page;
  param: string | null;
  navigate: (page: Page, param?: string | null) => void;
  isAuthed: boolean;
  setAuthed: (v: boolean) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>('landing');
  const [param, setParam] = useState<string | null>(null);
  const [isAuthed, setAuthed] = useState(false);

  const navigate = (p: Page, pm: string | null = null) => {
    setPage(p);
    setParam(pm);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <RouterContext.Provider value={{ page, param, navigate, isAuthed, setAuthed }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
