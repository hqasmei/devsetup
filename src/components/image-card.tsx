'use client';

import React from 'react';

import Image from 'next/image';

import { ImageDNDType } from '@/lib/types';
import { createClient } from '@/utils/supabase/client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react';

const ImageCard = ({ id, image }: ImageDNDType) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  });

  const supabase = createClient();

  const handleDelete = async () => {
    const desiredPart = image.image_url.split('/').slice(-2).join('/');

    await supabase.storage.from('images').remove([desiredPart]);
    await supabase.from('images').delete().eq('image_id', image.image_id);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="text-white  flex flex-col items-center w-full md:px-0  relative h-[200px]"
    >
      <div className="max-w-6xl  flex flex-1 w-full flex-col items-start">
        <Image
          priority
          alt={image.image_url}
          src={image.image_url}
          fill
          sizes="100vh"
          className="rounded object-cover"
        />
        <button
          className={`${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }  absolute top-1 left-1 bg-zinc-900 hover:bg-zinc-700 rounded-full duration-200`}
          {...listeners}
        >
          <Icon
            width="24"
            height="24"
            icon="lucide:equal"
            className="duration-300 p-1"
          />
        </button>
        <button
          onClick={handleDelete}
          className="absolute top-1 right-1 bg-zinc-900 hover:bg-zinc-700 rounded-full duration-200"
        >
          <Icon
            width="24"
            height="24"
            icon="lucide:x"
            className="duration-300  p-1"
          />
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
