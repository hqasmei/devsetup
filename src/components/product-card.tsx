'use client';

import React from 'react';

import { useDeleteProductModal } from '@/components/modals/delete-product-modal';
import { useUpdateProductModal } from '@/components/modals/update-product-modal';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProductDNDType } from '@/lib/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

const ProductCard = ({ id, product }: ProductDNDType) => {
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
        productCategory: product.product_category,
        productName: product.product_name,
        productLink: product.product_link,
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
          'relative  flex flex-row border border-zinc-800',
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
          <CardHeader className="flex flex-row justify-between items-end">
            <div className="flex flex-col space-y-1">
              <CardDescription>{product.product_category}</CardDescription>
              <CardTitle>{product.product_name}</CardTitle>
            </div>

            <div className="flex flex-row space-x-1">
              <button
                onClick={() => setShowUpdateProductModal(true)}
                className="duration-300  hover:bg-zinc-700 p-1 rounded"
              >
                <Icon icon="lucide:pen-square" width="20" height="20" />
              </button>
              <button
                onClick={() => setShowDeleteProductModal(true)}
                className="duration-300  hover:bg-red-900 p-1 rounded"
              >
                <Icon icon="lucide:trash-2" width="20" height="20" />
              </button>
            </div>
          </CardHeader>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
