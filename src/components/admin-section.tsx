'use client';

import React, { useEffect, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useAddSetupModal } from './modals/add-setup-modal';
import SetupCard from './setup-card';

const AdminSection = ({ serverSetups }: { serverSetups: any }) => {
  const { setShowAddSetupModal, AddSetupModal } = useAddSetupModal();
  const supabase = createClientComponentClient();

  const [setups, setSetups] = useState(serverSetups);

  useEffect(() => {
    const setupItems = supabase
      .channel('admin items')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'setups',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = [payload.new];
            setSetups((prevItems: any) => [...prevItems, ...newItem]);
          }
          // else if ( payload.eventType === 'DELETE' )
          // {
          //   // Handle delete event here
          //   const deletedId = payload.old.setup_item_id; // Use the correct column name
          //   setItems((prevItems) =>
          //     prevItems.filter((item) => item.setup_item_id !== deletedId),
          //   );
          // } else if (payload.eventType === 'UPDATE') {
          //   // Handle update event here
          //   const updatedItem = payload.new;
          //   setItems((prevItems) =>
          //     prevItems.map((item) =>
          //       item.setup_item_id === updatedItem.setup_item_id
          //         ? updatedItem
          //         : item,
          //     ),
          // );
          // }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(setupItems);
    };
  }, [supabase, setups, setSetups]);

  return (
    <div className="text-white flex flex-col items-center w-full pt-4 px-4 md:px-0  flex-1">
      <AddSetupModal />

      <div className="max-w-4xl flex  w-full justify-end  items-start">
        <button
          onClick={() => setShowAddSetupModal(true)}
          className="py-2 px-4 rounded text-foreground bg-secondary/50 hover:bg-secondary/80 flex items-center group text-sm duration-300"
        >
          + Add setup
        </button>
      </div>

      {setups.length == 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center">
          <span className="text-3xl">Create your first setup!</span>
        </div>
      ) : (
        <div className="max-w-4xl flex  w-full justify-start  items-start mt-4">
          <div className="grid grid-cols-2 gap-6 w-full">
            {setups.map((setup: any, idx: any) => {
              return <SetupCard key={idx} setup={setup} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSection;
