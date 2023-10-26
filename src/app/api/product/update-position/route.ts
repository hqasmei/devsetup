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

    const { newPositionOrder } = body;

    // Update project positions in the database
    await Promise.all(
      newPositionOrder.map(async (item: any) => {
        const { productId, position } = item;
        try {
          await supabase
            .from('products')
            .update({
              position: position,
            })
            .eq('product_id', productId)
            .select();
        } catch (error) {
          console.error('Error updating product:', error);
        }
      }),
    );

    return NextResponse.json({
      message: 'Project positions updated successfully',
    });
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
