import type { User } from "@supabase/supabase-js";
import React from "react";
import { createContext, useContext, useState } from "react";

import { supabase } from "./supabase";

const authContext = createContext<User | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(() => {
    let localUser = JSON.parse(localStorage.getItem("supabase.auth.token")!)?.currentSession
      ?.user as User;

    if (!localUser) {
      localUser = JSON.parse(localStorage.getItem("sb-localhost-auth-token")!)?.user as User;
    }

    return localUser;
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      setUser(session?.user!);
    }

    if (event === "SIGNED_OUT") {
      setUser(null);
    }
  });

  return user;
}
