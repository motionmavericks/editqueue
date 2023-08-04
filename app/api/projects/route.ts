import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function PUT(request: Request){
  const {project_id, status} = await request.json()
  const supabase = createRouteHandlerClient({cookies})
  await supabase.from('projects').update({status: status}).eq('project_id', project_id)
  return new Response(JSON.stringify({success: true}))
}

export async function GET(request: Request){
    const {project_id} = await request.json()
  const supabase = createRouteHandlerClient({cookies})
  const {data } = await supabase.from('projects').select('*').eq('project_id', project_id)
  return new Response(JSON.stringify(data))
}