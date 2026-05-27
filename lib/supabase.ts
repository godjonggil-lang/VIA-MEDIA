import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 브라우저 / 서버 컴포넌트에서 사용 (공개 읽기 전용)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
