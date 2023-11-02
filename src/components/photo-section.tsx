'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ImageDNDType } from '@/lib/types';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loader2 } from 'lucide-react';

import ImageCard from './image-card';

export default function PhotoSection() {
  const router = useRouter();
  const params = useParams();
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();
  const [uploading, setUploading] = useState(false);
  const [containers, setContainers] = useState<ImageDNDType[]>([]);
  const [userId, setUserId] = useState<any>('');
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const getImages = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id);

      const { data } = await supabase
        .from('images')
        .select('*')
        .eq('user_id', user?.id);

      if (data) {
        setContainers(
          data
            .map((image) => ({
              id: 'container-' + image.image_id,
              image: image,
            }))
            .sort((a: any, b: any) => a.image.position - b.image.position),
        );
      }
    };

    const imageChanges = supabase
      .channel('images channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'images',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newImage = payload.new;
            const transformedImage = {
              id: 'container-' + newImage.image_id,
              image: newImage,
            };

            setContainers((prevContainers) => [
              ...prevContainers,
              transformedImage,
            ]);
          } else if (payload.eventType === 'DELETE') {
            // Handle delete event here
            const deletedId = payload.old.image_id; // Use the correct column name
            setContainers(
              (prevContainers) =>
                prevContainers.filter(
                  (item) => item.image.image_id !== deletedId,
                ) as ImageDNDType[], // Add the type assertion here
            );
          } else if (payload.eventType === 'UPDATE') {
            // Handle update event here
            const updatedImage = payload.new;

            setContainers(
              (prevContainers) =>
                prevContainers.map((item) =>
                  item.image.image_id === updatedImage.image_id
                    ? { id: item.image.image_id, image: updatedImage }
                    : item,
                ) as ImageDNDType[], // Add the type assertion here
            );
          }
        },
      )
      .subscribe();

    getImages();
    return () => {
      supabase.removeChannel(imageChanges);
    };
  }, [supabase, containers, setContainers]);

  const handleFileUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', async (e) => {
      const selectedFile = (e.target as HTMLInputElement).files?.[0];

      if (selectedFile) {
        const path = userId + '/' + selectedFile.name;
        const { data: image, error: imageError } = await supabase.storage
          .from('images')
          .upload(path, selectedFile);
        let imagePath = image?.path;
        if (imagePath) {
          let imageMetadata = await supabase.storage
            .from('images')
            .getPublicUrl(imagePath);

          await supabase
            .from('images')
            .insert([
              {
                user_id: userId,
                image_url: imageMetadata.data.publicUrl,
                position: 0,
              },
            ])
            .select();

          const { data: userImagesData, error: userImagesError } =
            await supabase.from('images').select().eq('user_id', userId);

          if (userImagesData) {
            // Now you can use the `data` property as TypeScript knows it exists.
            const updatedImages = userImagesData.map((image, index) => ({
              ...image,
              position: index + 1, // Update the position based on the order
            }));

            await Promise.all(
              updatedImages.map((image) =>
                supabase
                  .from('images')
                  .update({
                    position: image.position,
                  })
                  .eq('image_id', image.image_id),
              ),
            );
          }
        }
      }
    });

    fileInput.click();
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes('container') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id,
      );

      // Update the state to reflect the new order
      const newContainers = arrayMove(
        containers,
        activeContainerIndex,
        overContainerIndex,
      );
      setContainers(newContainers);

      // Update the database positions based on the client-side order
      const newPositionOrder = newContainers.map((container, index) => ({
        imageId: container.image.image_id,
        position: index,
      }));

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
    }

    setActiveId(null);
  };

  return (
    <>
      <div className="w-full md:w-1/2 h-screen border-r border-zinc-800 p-6 items-center justify-start flex flex-col">
        <div className="flex w-full items-center justify-center md:max-w-xl">
          {uploading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading
            </Button>
          ) : (
            <Button onClick={handleFileUpload} className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7-7v14"
                />
              </svg>
              <span className="font-bold"> Add Images</span>
            </Button>
          )}
        </div>
        <div className="w-full mt-10 grid  grid-cols-2 justify-center gap-4 md:max-w-xl">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={containers.map((i) => i.id)}>
              {containers.length != 0 && (
                <>
                  {containers.map((container, idx) => {
                    return (
                      <ImageCard
                        key={idx}
                        id={container.id}
                        image={container.image}
                      />
                    );
                  })}
                </>
              )}
            </SortableContext>
          </DndContext>
        </div>
        {containers.length == 0 && (
          <div className="py-24 font-bold text-2xl">Add your first image!</div>
        )}
      </div>
    </>
  );
}
