import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { randomUUID } from "crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { Database } from '@/app/database.types'

export async function PUT(request: Request, {params}: {params: {id: any}}){
  const {project_id, title, description} = await request.json()
  const supabase = createRouteHandlerClient({cookies})
  await supabase.from('projects').update({title, description}).eq('project_id', project_id)
  return new Response(JSON.stringify({success: true}))
}

export async function GET(request: Request , {params}: {params: {id: any}}){
 const id = params.id
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const {data} = await supabase.from('projects').select('*').eq('project_id', id)
  console.log(data)
  return new Response(JSON.stringify(data))
}

export async function POST(request: Request){
    const {user_id, title, description} = await request.json()
    const supabase = createRouteHandlerClient({cookies})
    const project_id = randomUUID();
    await supabase.from('projects').insert({project_id, user_id, title, description})
    return new NextResponse(JSON.stringify({project_id}))
    
    }

    export async function DELETE(request: Request){
        const payload = await request.json()
        const id = payload.id.params.id;
      const supabase = createRouteHandlerClient({cookies})
      const {data } = await supabase.from('projects').delete().eq('project_id', id)
      return new Response(JSON.stringify(data))
    }   