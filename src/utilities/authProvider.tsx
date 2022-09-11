import { supabase } from "./supabase";
import { useState, useEffect, useContext, createContext } from "react";
import { User } from "@supabase/supabase-js";

const authContext = createContext<User | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext) as User | null;
};

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);

    const auth = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user as User);
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => auth.data?.unsubscribe();
  }, []);

  return user;
}
