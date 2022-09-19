import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "../utilities/supabase";

export function useSession() {
  const [user, setUser] = useState<User | null>(null);

  const setUserX = async () => {
    const { data } = await supabase.auth.getSession();

    setUser(data.session?.user!);
  };

  useEffect(() => {
    setUserX();
  }, []);

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
