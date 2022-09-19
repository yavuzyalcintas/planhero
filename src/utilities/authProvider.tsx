import type { User } from "@supabase/supabase-js";
import React from "react";
import { createContext, useContext } from "react";

import { useSession } from "../hooks/useSession";

const authContext = createContext<User | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useSession();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
