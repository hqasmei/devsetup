'use client';

import React from 'react';

import { useDeleteItemModal } from '@/components/modals/delete-item-modal';
import { useUpdateItemModal } from '@/components/modals/update-item-modal';
import { Icon } from '@iconify/react';

const ItemCard = ({ item }: { item: any }) => {
  const { setShowDeleteItemModal, DeleteItemModal } = useDeleteItemModal({
    props: { itemId: item.setup_item_id },
  });

  const { setShowUpdateItemModal, UpdateItemModal } = useUpdateItemModal({
    props: {
      itemId: item.setup_item_id,
      itemCategory: item.category,
      itemType: item.type,
      itemBrand: item.brand,
      itemModel: item.model,
    },
  });

  return (
    <>
      <DeleteItemModal />
      <UpdateItemModal />
      <div className="grid grid-cols-5 gap-4 w-full p-2 bg-foreground/5 rounded">
        <span>{item.category}</span>
        <span>{item.type}</span>
        <span>{item.brand}</span>
        <span>{item.model}</span>
        <div className="flex flex-row space-x-2 justify-end">
          <button onClick={() => setShowUpdateItemModal(true)}>
            <Icon
              icon="lucide:pen-square"
              className="text-stone-400 hover:text-stone-300"
              width="24"
              height="24"
            />
          </button>
          <button onClick={() => setShowDeleteItemModal(true)}>
            <Icon
              icon="lucide:trash-2"
              className="text-red-800 hover:text-red-600"
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
