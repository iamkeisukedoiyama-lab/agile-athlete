import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { sprint_id, bug_tag_id, trigger_tag_id, patch_id, is_public, note, occurred_at } = body

    if (!sprint_id || !bug_tag_id) {
      return NextResponse.json({ error: 'sprint_id and bug_tag_id are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('bugs')
      .insert({
        sprint_id,
        user_id: user.id,
        bug_tag_id,
        trigger_tag_id: trigger_tag_id ?? null,
        patch_id: patch_id ?? null,
        is_public: is_public ?? true,
        note: note ?? null,
        occurred_at: occurred_at ?? new Date().toISOString(),
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const sprintId = searchParams.get('sprint_id')

    let query = supabase
      .from('bugs')
      .select('*')
      .eq('user_id', user.id)
      .order('occurred_at', { ascending: false })

    if (sprintId) query = query.eq('sprint_id', sprintId)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
