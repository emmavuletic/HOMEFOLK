import { createClient } from '@supabase/supabase-js'

// Browser-safe client — only uses publishable key
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)
