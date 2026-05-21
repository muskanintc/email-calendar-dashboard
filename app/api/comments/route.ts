import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Comments not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const clientSlug = searchParams.get('client');

  let query = supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: true });

  if (clientSlug) {
    query = query.eq('client_slug', clientSlug);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Comments not configured' }, { status: 503 });
  }

  const body = await request.json();
  const { client_slug, email_id, author_name, comment } = body;

  if (!client_slug || !email_id || !author_name || !comment) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({ client_slug, email_id, author_name, comment })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
