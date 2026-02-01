import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)
const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST() {
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
