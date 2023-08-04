import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { randomUUID } from "crypto";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async  function POST(request: Request){
  const {user_id, title, description} = await request.json()
  const supabase = createRouteHandlerClient({cookies})
  const project_id = randomUUID();
  const status_id = 1; // Draft
  await supabase.from('projects').insert({project_id, status_id, user_id, title, description})
  return new NextResponse(JSON.stringify({project_id}))

}

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