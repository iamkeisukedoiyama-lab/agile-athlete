import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const limit  = parseInt(searchParams.get('limit')  ?? '20')
    const after  = searchParams.get('after') // cursor (bug id)

    let query = supabase
      .from('bugs')
      .select(`
        id, user_id, bug_tag_id, trigger_tag_id, patch_id,
        is_public, note, occurred_at,
        users:user_id(username, avatar_url)
      `)
      .eq('is_public', true)
      .order('occurred_at', { ascending: false })
      .limit(limit)

    if (after) query = query.lt('occurred_at', after)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
