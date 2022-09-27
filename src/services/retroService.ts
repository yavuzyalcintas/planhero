import { showNotification } from "@mantine/notifications";

import { RetroSessionMessagesTable, RetroSessionTable } from "../models/supabaseEntities";
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

export const createRetroMessage = async (
  message: string,
  session_id: string,
  type: string,
  user_id: string
) => {
  const { data, error } = await supabase
    .from(RetroSessionMessagesTable)
    .insert({ message, session_id, type, user_id })
    .select("*")
    .single();

  if (error) {
    showNotification({
      title: "Create Session Message Error",
      message: error.message,
      color: "red",
    });
  }

  return { data, error };
};

export const getRetroMessages = async (sessionID: string) => {
  const { data, error } = await supabase
    .from(RetroSessionMessagesTable)
    .select("*")
    .match({ session_id: sessionID });

  if (error) {
    showNotification({
      title: "Get Retro Messages Error",
      message: error.message,
      color: "red",
    });
  }

  return { data, error };
};
