import type { ReactNode } from "react";
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../utilities/authProvider";

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }: AuthGuardProps) => {
  const user = useAuth();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | undefined>(undefined);

  if (!user) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Navigate to="/login" />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(undefined);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
