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

    const { productCategory, productName, productLink } = body;

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          user_id: user?.id,
          product_category: productCategory,
          product_name: productName,
          product_link: productLink,
          position: 0,
        },
      ])
      .select();

    const { data: userProjectsData, error: userProjectsError } = await supabase
      .from('products')
      .select()
      .eq('user_id', user?.id);

    if (userProjectsData) {
      // Now you can use the `data` property as TypeScript knows it exists.
      const updatedProjects = userProjectsData.map((project, index) => ({
        ...project,
        position: index + 1, // Update the position based on the order
      }));

      await Promise.all(
        updatedProjects.map((project) =>
          supabase
            .from('products')
            .update({
              position: project.position,
            })
            .eq('product_id', project.product_id),
        ),
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
