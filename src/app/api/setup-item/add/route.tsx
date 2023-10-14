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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const body = await req.json();

    const { category, type, brand, model, setupId } = body;

    const { data: setupItemData, error: setupItemError } = await supabase
      .from('setup_items')
      .insert([
        {
          setup_id: setupId,
          category: category,
          type: type,
          brand: brand,
          model: model,
          owner_id: user?.id,
        },
      ])
      .select();

    return NextResponse.json(setupItemData);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
