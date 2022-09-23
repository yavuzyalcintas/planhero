import { showNotification } from "@mantine/notifications";

import { RetroSessionTable } from "../models/supabaseEntities";
import { supabase } from "../utilities/supabase";

export const createRetroSession = async (name: string, created_by: string) => {
  const { data, error } = await supabase
    .from(RetroSessionTable)
    .insert({ name, created_by })
    .select("*")
    .single();

  if (error) {
    showNotification({
      title: "Create Session Error",
      message: error.message,
      color: "red",
    });
  }

  return { data, error };
};

export const getRetroSessions = async (created_by: string) => {
  const { data, error } = await supabase
    .from(RetroSessionTable)
    .select("*")
    .match({ created_by: created_by })
    .limit(50);

  if (error) {
    showNotification({
      title: "Get Sessions Error",
      message: error.message,
      color: "red",
    });
  }

  return { data, error };
};
