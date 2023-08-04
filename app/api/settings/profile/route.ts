import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import type { Database } from '@/config/database.types'

export const dynamic = 'force-dynamic'

export async function PUT(request: Request) {
  {
    const { title } = await request.json()
    const supabase = createRouteHandlerClient({ cookies })
    const { data } = await supabase.from('todos').insert({ title }).select()
    return NextResponse.json(data)
  }
}

export async function GET(request: NextRequest) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user_id = session?.user.id
    const { data } = await supabase.from('userProfiles').select().eq('user_id', user_id)
    return NextResponse.json(data)
  
}

export async function DELETE(request: Request) {
 {
    const { id } = await request.json()
    const supabase = createRouteHandlerClient({ cookies })
    const { data } = await supabase.from('todos').delete().eq('id', id).select()
    return NextResponse.json(data)
  }
}
