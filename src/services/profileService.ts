import { showNotification } from "@mantine/notifications";

import { Profiles, ProfilesTable } from "../models/supabaseEntities";
import { supabase } from "../utilities/supabase";

export const upsertProfile = async (profile: Profiles) => {
  const { data, error } = await supabase.from(ProfilesTable).upsert(profile).select("*").single();

  if (error) {
    showNotification({
      title: "Create Session Error",
      message: error.message,
      color: "red",
    });
  }

  return { data, error };
};
