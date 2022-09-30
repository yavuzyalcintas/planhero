import type { ReactNode } from "react";
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../utilities/authProvider";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();

  const { pathname, search } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | undefined>(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Navigate to={"/login?redirectTo=" + pathname + search} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(undefined);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
