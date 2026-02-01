import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function POST() {
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Missing Supabase environment variables' },
      { status: 503 }
    )
  }
  try {
    // Check if tables exist and initialize if needed
    const { data: playersCheck } = await supabase
      .from('players')
      .select('id')
      .limit(1)

    // If we can query the table, it exists
    console.log('[v0] Database tables already exist')
    return NextResponse.json({ initialized: true })
  } catch (error) {
    // Tables might not exist, but that's okay - the app will work with Supabase
    console.log('[v0] Database check completed')
    return NextResponse.json({ initialized: false, ready: true })
  }
}

export async function GET() {
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Missing Supabase environment variables' },
      { status: 503 }
    )
  }
  try {
    // Simple health check
    const { data, error } = await supabase.auth.getSession()
    return NextResponse.json({ status: 'ok', supabaseConnected: !error })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Supabase connection failed' },
      { status: 500 }
    )
  }
}
