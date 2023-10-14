
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { NextResponse } from 'next/server';

 
export const dynamic = 'force-dynamic';
export const revalidate = 0;

 
export async function POST(req: Request) {
    const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const body = await req.json();

    const { itemId, itemCategory, itemType, itemBrand, itemModel } = body;

    const { data, error } = await supabase
      .from('setup_items')
      .update({
        category: itemCategory,
        type: itemType,
        brand: itemBrand,
        model: itemModel,
      })
      .eq('setup_item_id', itemId)
      .select();

    return NextResponse.json(data);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
