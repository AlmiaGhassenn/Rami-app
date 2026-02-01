import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

// GET all transactions with player details
export async function GET() {
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Missing Supabase environment variables' },
      { status: 503 }
    )
  }
  try {
    const { data, error } = await supabase
      .from('joker_transactions')
      .select(`
        id,
        count,
        created_at,
        updated_at,
        given_by_id,
        given_to_id,
        given_by:players!given_by_id(name),
        given_to:players!given_to_id(name)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

// POST create a new transaction
export async function POST(request: NextRequest) {
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Missing Supabase environment variables' },
      { status: 503 }
    )
  }
  try {
    const { given_by, given_to, count } = await request.json()

    if (!given_by || !given_to || !count) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get player IDs
    const { data: givenByPlayer, error: error1 } = await supabase
      .from('players')
      .select('id')
      .eq('name', given_by)
      .single()

    const { data: givenToPlayer, error: error2 } = await supabase
      .from('players')
      .select('id')
      .eq('name', given_to)
      .single()

    if (error1 || error2) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      )
    }

    const { data, error } = await supabase
      .from('joker_transactions')
      .insert([
        {
          given_by_id: givenByPlayer.id,
          given_to_id: givenToPlayer.id,
          count: parseInt(count),
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}
