import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';



import { deleteUploadThingImage } from '@/actions/delete-uploadthing-image';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';





export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const body = await req.json();

    const { setupId } = body;

    const { data: setupImagesData, error: setupImagesError } = await supabase
      .from('setup_images')
      .select()
      .eq('setup_id', setupId);

    if (setupImagesData) {
      for (const image of setupImagesData) {
        const url = image.image_url;
        const delimiter = 'https://utfs.io/f/';
        const result: string | null = url.includes(delimiter)
          ? url.substr(url.indexOf(delimiter) + delimiter.length)
          : null;
        if (result) {
          await deleteUploadThingImage(result);
        }
      }
    }

    const { data, error } = await supabase
      .from('setups')
      .delete()
      .eq('setup_id', setupId);

    console.log(data, error);

    return NextResponse.json(data);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}