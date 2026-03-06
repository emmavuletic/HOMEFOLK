import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimit(`reset:${ip}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required.' }, { status: 400 })

  const supabase = createServerClient()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://homefolk.vercel.app'

  await supabase.auth.resetPasswordForEmail(email.toLowerCase().trim(), {
    redirectTo: `${appUrl}/reset-password`,
  })

  // Always return success to prevent email enumeration
  return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' })
}
