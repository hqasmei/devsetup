import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';



import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';





export const dynamic = 'force-dynamic';

 

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createServerComponentClient({ cookies });

  await supabase.auth.signOut();

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}