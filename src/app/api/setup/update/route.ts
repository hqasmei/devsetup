import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const body = await req.json();

    const { setupId, setupName } = body;

    const { data, error } = await supabase
      .from('setups')
      .update({
        name: setupName,
      })
      .eq('setup_id', setupId)
      .select();

    return NextResponse.json(data);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}