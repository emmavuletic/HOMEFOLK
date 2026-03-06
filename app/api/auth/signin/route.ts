import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimit(`signin:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts. Please wait 15 minutes.' }, { status: 429 })
  }

  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
  }

  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  })

  if (error) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single()

  return NextResponse.json({
    success: true,
    session: data.session,
    user: {
      id: data.user.id,
      email: data.user.email,
      ...profile,
    },
  })
}
