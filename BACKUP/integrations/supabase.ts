import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yjuvbiglrpetsfgwabic.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdXZiaWdscnBldHNmZ3dhYmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NzEyMTUsImV4cCI6MjA3ODQ0NzIxNX0.WmOQPJynEPTOErH-T74j54Bh9gLqHzE8IqgE6Lx1EBc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);