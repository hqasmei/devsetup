'use client';

// TODO: Duplicate or move this file outside the `_examples` folder to make it a route
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

import ChevronLeft from '@/components/icons/chevron-left';
import ImageSlider from '@/components/image-slider';
import ItemCard from '@/components/item-card';
import { useAddItemModal } from '@/components/modals/add-item-modal';
import SettingsPopover from '@/components/settings-popover';
import { Icon } from '@iconify/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SetupSection = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const { setShowAddItemModal, AddItemModal } = useAddItemModal({
    props: { setupId: params.setupId as string },
  });

  const [name, setName] = useState<any>('');
  const [items, setItems] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getName = async () => {
      // This assumes you have a `todos` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      const { data } = await supabase
        .from('setups')
        .select('name')
        .eq('setup_id', params.setupId);
      if (data) {
        setName(data[0].name);
      }
    };

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

    const getItems = async () => {
      // This assumes you have a `todos` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      const { data } = await supabase
        .from('setup_items')
        .select()
        .eq('setup_id', params.setupId);
      if (data) {
        setItems(data);
      }
    };

    const setupItems = supabase
      .channel('setup items')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'setup_items',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = [payload.new];
            setItems((prevItems) => [...prevItems, ...newItem]);
          } else if (payload.eventType === 'DELETE') {
            // Handle delete event here
            const deletedId = payload.old.setup_item_id; // Use the correct column name
            setItems((prevItems) =>
              prevItems.filter((item) => item.setup_item_id !== deletedId),
            );
          } else if (payload.eventType === 'UPDATE') {
            // Handle update event here
            const updatedItem = payload.new;
            setItems((prevItems) =>
              prevItems.map((item) =>
                item.setup_item_id === updatedItem.setup_item_id
                  ? updatedItem
                  : item,
              ),
            );
          }
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'setups',
        },
        (payload) => {
          // Handle update event here
          const updatedItem = payload.new;
          setName(updatedItem.name);
        },
      )
      .subscribe();

    getImages();
    getItems();
    getName();
    return () => {
      supabase.removeChannel(setupItems);
    };
  }, [supabase, setImages, setItems, setName]);

  return (
    <div className="text-white flex flex-col items-center w-full">
      <AddItemModal />
      <div className="max-w-4xl flex  flex-col w-full justify-start  items-start pt-4  px-4 lg:px-0">
        <div className="flex flex-row justify-between items-center w-full">
          <Link
            href="/admin"
            className=" no-underline text-foreground   flex items-center group text-sm "
          >
            <ChevronLeft />
            <span>Back</span>
          </Link>
          <div className="flex  w-full justify-end  items-start">
            <div className="flex flex-row space-x-2">
              <button
                onClick={() => setShowAddItemModal(true)}
                className="py-2 px-4 rounded text-foreground bg-secondary/50 hover:bg-secondary/80 flex items-start group text-sm duration-300 justify-start"
              >
                + Add item
              </button>
              <SettingsPopover setupName={name} setupId={params.setupId} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-3xl">{name}</span>
        </div>
        {images.length != 0 ? (
          <div className="text-white flex flex-col w-full pt-4  sm:px-0 items-start">
            <div className="flex  w-full sm:w-1/2 ">
              <ImageSlider images={images} />
            </div>
          </div>
        ) : (
          <div className="text-white flex flex-col items-center w-full pt-4 px-4 md:px-0 ">
            <div className="flex flex-1 w-full flex-row items-start">
              <Link
                href={`${pathname}/photos`}
                className="border-dashed border-2 border-zinc-500 w-1/2 h-64 rounded-lg flex items-center justify-center hover:border-solid"
              >
                <Icon
                  icon="lucide:image-plus"
                  color="white"
                  width="24"
                  height="24"
                />
              </Link>
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-4">
          {items.length != 0 && (
            <>
              {items.map((item, idx) => {
                return <ItemCard key={idx} item={item} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupSection;
