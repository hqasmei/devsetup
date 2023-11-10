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

    const { newPositionOrder } = body;

    console.log(newPositionOrder)
    // Update project positions in the database
    await Promise.all(
      newPositionOrder.map(async (item: any) => {
        const { imageId, position } = item;
        try {
          await supabase
            .from('images')
            .update({
              position: position,
            })
            .eq('image_id', imageId)
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
