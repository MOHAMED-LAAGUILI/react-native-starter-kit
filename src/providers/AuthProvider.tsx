import * as React from "react";
import { useAuthStore } from "@/store";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore(s => s.hydrate);

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}

export { AuthProvider };
