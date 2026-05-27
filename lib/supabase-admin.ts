import { createClient } from '@supabase/supabase-js'

// ?œë²„ ?„ìš© ???´ë“œë¯??‘ì—…???¬ìš© (RLS ?°íšŒ)
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
