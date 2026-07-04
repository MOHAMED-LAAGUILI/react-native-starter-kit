import { useAuthStore } from '@/store';
import * as React from 'react';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}

export { AuthProvider };
