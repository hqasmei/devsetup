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

    const { test } = body;
    console.log(test);
    // console.log(selectedFile);
    // const path = user?.id + '/' + selectedFile.name;
    // const { data: image, error: imageError } = await supabase.storage
    //   .from('images')
    //   .upload(path, selectedFile);

    // let imagePath = image?.path;
    // if (imagePath) {
    //   let imageMetadata = await supabase.storage
    //     .from('images')
    //     .getPublicUrl(imagePath);

    //   await supabase
    //     .from('images')
    //     .insert([
    //       { user_id: user?.id, image_url: imageMetadata.data.publicUrl },
    //     ])
    //     .select();
    // }

    return NextResponse.json('Success!', { status: 200 });
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
