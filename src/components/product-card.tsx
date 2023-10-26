'use client';

import React from 'react';

import { useDeleteProductModal } from '@/components/modals/delete-product-modal';
import { useUpdateProductModal } from '@/components/modals/update-product-modal';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ContainerProps } from '@/lib/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

const ProductCard = ({ id, product }: ContainerProps) => {
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

  const { setShowDeleteProductModal, DeleteProductModal } =
    useDeleteProductModal({
      props: { productId: product.product_id },
    });

  const { setShowUpdateProductModal, UpdateProductModal } =
    useUpdateProductModal({
      props: {
        productId: product.product_id,
        productName: product.product_name,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <>
      <DeleteProductModal />
      <UpdateProductModal />
      <Card
        ref={setNodeRef}
        style={style}
        className={clsx(
          'relative  flex flex-row ',
          // isDragging && 'opacity-50',
        )}
      >
        <button
          className={`p-0.5 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          {...listeners}
        >
          <Icon
            icon="clarity:drag-handle-line"
            width="36"
            height="36"
            color="#FFFFFF"
          />
        </button>
        <div className="w-full">
          <CardHeader className="flex flex-row justify-between items-center ">
            <CardTitle>{product.product_name}</CardTitle>
            <div className="flex flex-row space-x-1 items-center">
              <button
                onClick={() => setShowUpdateProductModal(true)}
                className="duration-300  hover:bg-zinc-700 p-1 rounded"
              >
                <Icon icon="lucide:pen-square" width="20" height="20" />
              </button>
              <button
                onClick={() => setShowDeleteProductModal(true)}
                className="duration-300  hover:bg-red-700 p-1 rounded"
              >
                <Icon icon="lucide:trash-2" width="20" height="20" />
              </button>
            </div>

            {/* <CardDescription>category</CardDescription> */}
          </CardHeader>
          {/* <CardContent className='flex flex-row justify-between'>
            <p>Card Content</p>
            <button
              onClick={() => setShowDeleteProductModal(true)}
              className="duration-300  hover:bg-red-700 p-1 rounded"
            >
              <Icon icon="lucide:trash-2" width="20" height="20" />
            </button>
          </CardContent> */}
        </div>
      </Card>
    </>
  );
};

export default ProductCard;

{
  /* <div className="flex flex-row w-full justify-between p-2 bg-foreground/5 rounded">
        <span>{product.product_name}</span>
        <div className="flex flex-row space-x-2">
          <button onClick={() => setShowUpdateProductModal(true)}>
            <Icon
              icon="lucide:pen-square"
              className="text-stone-400 hover:text-stone-300"
              width="24"
              height="24"
            />
          </button>
          <button onClick={() => setShowDeleteProductModal(true)}>
            <Icon
              icon="lucide:trash-2"
              className="text-red-800 hover:text-red-600"
              width="24"
              height="24"
            />
          </button>
        </div>
      </div> */
}
