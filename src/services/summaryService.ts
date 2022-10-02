import { showNotification } from "@mantine/notifications";

import { RecentActivitiesView } from "../models/supabaseEntities";
import { supabase } from "../utilities/supabase";

export const getRecentActivities = async (user_id: string, limit: number = 10) => {
  const { data, error } = await supabase
    .from(RecentActivitiesView)
    .select("*")
    .eq("user_id", user_id)
    .limit(limit);

  if (error) {
    showNotification({
      title: "getRecentActivities Error",
      message: error.message,
      color: "red",
    });
  }

  return { data, error };
};
