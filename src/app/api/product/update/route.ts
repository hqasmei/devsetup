import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const body = await req.json();

    const { productId, productCategory, productName, productLink } = body;

    const { data, error } = await supabase
      .from('products')
      .update({
        product_category: productCategory,
        product_name: productName,
        product_link: productLink,
      })
      .eq('product_id', productId)
      .select();

    return NextResponse.json(data);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
