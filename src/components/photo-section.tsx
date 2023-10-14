'use client';

// TODO: Duplicate or move this file outside the `_examples` folder to make it a route
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import Dropzone from '@/components/dropzone';
import ChevronLeft from '@/components/icons/chevron-left';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function PhotoSection() {
  const [images, setImages] = useState<any[]>([]);
  const router = useRouter();
  const params = useParams();
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getImages = async () => {
      // This assumes you have a `todos` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      const { data } = await supabase
        .from('setup_images')
        .select()
        .eq('setup_id', params.setupId);
      if (data) {
        setImages(data);
      }
    };

    getImages();
  }, [supabase, setImages]);

  return (
    <div className="text-white flex flex-col items-center w-full">
      <div className="max-w-4xl flex  flex-col w-full justify-start  items-start pt-4">
        <button
          onClick={() => router.back()}
          className=" no-underline text-foreground   flex items-center group text-sm "
        >
          <ChevronLeft />
          <span>Back</span>
        </button>
        <span className="text-4xl my-10">Add your setup photos</span>
        <div className="w-full grid grid-cols-3 gap-4">
          <Dropzone setupId={params.setupId} />
          {/* <div className="text-white flex flex-col items-center w-full px-4 md:px-0">
            <div className="max-w-4xl flex flex-1 w-full flex-col items-start h-48">
              <Dropzone setupId={params.setupId} />
            </div>
          </div> */}
          {images.map((image, idx) => {
            return (
              <div
                key={idx}
                className="text-white flex flex-col items-center w-full  px-4 md:px-0"
              >
                <div className="max-w-4xl flex flex-1 w-full flex-col items-start h-48">
                  <Image
                    priority
                    src={image.image_url}
                    alt=""
                    width={1000}
                    height={1000}
                    className="rounded"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
