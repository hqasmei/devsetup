import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';



import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';





export const dynamic = 'force-dynamic';
export const revalidate = 0;

 
export async function POST(req: Request) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const body = await req.json();

    const { itemId } = body;

    const { data, error } = await supabase
      .from('setup_items')
      .delete()
      .eq('setup_item_id', itemId);

    return NextResponse.json(data);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}