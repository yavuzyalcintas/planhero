import { supabase } from "../../utilities/supabase";

export const getQueryBy = async (table: string, eqId: string, eqValue: string) => {
  const { data, error } = await supabase.from(table).select().eq(eqId, eqValue).single();

  // @ts-ignore
  return data, error;
};
