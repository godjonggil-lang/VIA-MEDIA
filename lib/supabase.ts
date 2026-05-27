import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ë¸Œë¼?°ì? / ?œë²„ ì»´í¬?ŒíŠ¸?ì„œ ?¬ìš© (ê³µê°œ ?½ê¸° ?„ìš©)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
