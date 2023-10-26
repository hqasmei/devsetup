import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const body = await req.json();

    const { productId, productName } = body;
    console.log(productId, productName);

    const { data, error } = await supabase
      .from('products')
      .update({
        product_name: productName,
      })
      .eq('product_id', productId)
      .select();

    return NextResponse.json(data);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
