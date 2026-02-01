import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// DELETE a transaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const { error } = await supabase
      .from('joker_transactions')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    )
  }
}

// PUT update a transaction
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { given_by, given_to, count } = await request.json()

    if (!given_by || !given_to || count == null) {
      return NextResponse.json(
        { error: 'given_by, given_to, and count are required' },
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

    if (givenByPlayer.id === givenToPlayer.id) {
      return NextResponse.json(
        { error: 'Cannot give jokers to yourself' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('joker_transactions')
      .update({
        given_by_id: givenByPlayer.id,
        given_to_id: givenToPlayer.id,
        count: parseInt(String(count)),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    )
  }
}
