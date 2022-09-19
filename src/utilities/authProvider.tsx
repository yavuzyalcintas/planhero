import type { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../utilities/supabase";

const authContext = createContext<{
  isLoading: boolean;
  user: User | null;
}>({
  isLoading: true,
  user: null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user!);
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    const fn = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setIsLoading(false);
    };
    fn();

    return () => {
      sub.data.subscription.unsubscribe();
    };
  }, []);

  return <authContext.Provider value={{ user, isLoading }}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
