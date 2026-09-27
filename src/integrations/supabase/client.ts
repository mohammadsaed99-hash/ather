import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hblbusxoouukqisjkvkq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_OYPJef745rFjLdu4Uq8yAQ_PnxeyCCD";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
