import { createClient } from "@supabase/supabase-js";

import { Database } from "../models/DatabaseDefinitions";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
