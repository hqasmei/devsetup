'use client';

import React, { useEffect, useState } from 'react';

import { useAddProductModal } from '@/components/modals/add-product-modal';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ProductDNDType } from '@/lib/types';
import { createClient } from '@/utils/supabase/client';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
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
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import axios from 'axios';

export default function ProductsSection({ input }: any) {
  const supabase = createClient();

  const [containers, setContainers] = useState<ProductDNDType[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const { setShowAddProductModal, AddProductModal } = useAddProductModal();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
        productId: container.product.product_id,
        position: index,
      }));

      // Call an API endpoint to update the positions in the database
      await axios.post('/api/product/update/position', {
        newPositionOrder: newPositionOrder,
      });
    }

    setActiveId(null);
  };

  useEffect(() => {
    setContainers(
      input
        .map((product: any) => ({
          id: 'container-' + product.product_id,
          product: product,
        }))
        .sort((a: any, b: any) => a.product.position - b.product.position),
    );

    const productChanges = supabase
      .channel('products channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newProduct = payload.new;
            const transformedProduct = {
              id: 'container-' + newProduct.product_id,
              product: newProduct,
            };

            setContainers((prevContainers) =>
              [...prevContainers, transformedProduct].sort(
                (a: any, b: any) => a.product.position - b.product.position,
              ),
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old.product_id; // Use the correct column name
            setContainers(
              (prevContainers) =>
                prevContainers.filter(
                  (item) => item.product.product_id !== deletedId,
                ) as ProductDNDType[], // Add the type assertion here
            );
          } else if (payload.eventType === 'UPDATE') {
            // Handle update event here
            const updatedProduct = payload.new;

            setContainers((prevContainers) => [
              ...prevContainers.map((item) =>
                item.product.product_id === updatedProduct.product_id
                  ? { ...item, product: updatedProduct }
                  : item,
              ),
            ]);
          }
        },
      )
      .subscribe();

    setLoading(false);
    setIsMounted(true);

    return () => {
      supabase.removeChannel(productChanges);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddProductModal />
      <div className="w-full md:w-1/2 h-screen border-r border-zinc-800 p-6 items-center justify-start flex flex-col">
        <div className="flex w-full items-center justify-center md:max-w-xl">
          <Button
            onClick={() => setShowAddProductModal(true)}
            className="w-full"
          >
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
            <span className="font-bold"> Add Product</span>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 w-full md:max-w-xl">
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
                      <ProductCard
                        id={container.id}
                        key={container.id}
                        product={container.product}
                      />
                    );
                  })}
                </>
              )}
            </SortableContext>
          </DndContext>
        </div>
        {!loading && containers.length == 0 && (
          <div className="py-24 font-bold text-2xl">Add your first item!</div>
        )}
      </div>
    </>
  );
}
