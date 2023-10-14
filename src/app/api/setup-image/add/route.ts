import { cache } from 'react';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createServerComponentClient as _createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const createServerComponentClient = cache(() => {
  const cookieStore = cookies();
  return _createServerComponentClient({ cookies: () => cookieStore });
});
export async function POST(req: Request) {
  const supabase = createServerComponentClient();

  try {
    const body = await req.json();

    const { setupId, imageUrl } = body;

    const { data, error } = await supabase
      .from('setup_images')
      .insert([
        {
          setup_id: setupId,
          image_url: imageUrl,
        },
      ])
      .select();

    return NextResponse.json(data);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
