import React from "react";
import { supabase } from "./supabase";
import { useState, useEffect, useContext, createContext } from "react";
import type { User } from "@supabase/supabase-js";

const authContext = createContext<User | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user!);

    const auth = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user!);
      }

      if (event === "SIGNED_OUT") {
        setUser(undefined);
      }
    });

    return () => auth.data?.unsubscribe();
  }, []);

  return user;
}
