import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { sprint_id, keep, problem, try: tryT, mood_score } = await req.json()
    if (!sprint_id || !keep || !problem || !tryT) {
      return NextResponse.json({ error: 'sprint_id, keep, problem, try are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('retrospectives')
      .insert({ sprint_id, keep, problem, try: tryT, mood_score: mood_score ?? null })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // スプリントを completed に更新
    await supabase.from('sprints').update({ status: 'completed' }).eq('id', sprint_id)

    return NextResponse.json({ data }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
