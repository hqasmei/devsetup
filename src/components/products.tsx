'use client';

import React, { useEffect, useState } from 'react';

import { useAddProductModal } from '@/components/modals/add-product-modal';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ProductDNDType } from '@/lib/types';
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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';

const Products = () => {
  const supabase = createClientComponentClient();
  const [products, setProducts] = useState<any[]>([]);
  const [containers, setContainers] = useState<ProductDNDType[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const { setShowAddProductModal, AddProductModal } = useAddProductModal();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
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
      await axios.post('/api/product/update-position', {
        newPositionOrder: newPositionOrder,
      });
    }

    setActiveId(null);
  };

  useEffect(() => {
    const getProducts = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from('products')
        .select()
        .eq('user_id', user?.id);

      if (data) {
        setProducts(data);
        setContainers(
          data
            .map((product) => ({
              id: 'container-' + product.product_id,
              product: product,
            }))
            .sort((a: any, b: any) => a.product.position - b.product.position),
        );
      }
    };

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
            const newProduct = [payload.new];
            setProducts((prevProducts) => [...prevProducts, ...newProduct]);
          } else if (payload.eventType === 'DELETE') {
            // Handle delete event here
            const deletedId = payload.old.product_id; // Use the correct column name
            setProducts((prevProducts) =>
              prevProducts.filter((item) => item.product_id !== deletedId),
            );
          } else if (payload.eventType === 'UPDATE') {
            // Handle update event here
            const updatedProduct = payload.new;
            setProducts((prevProducts) =>
              prevProducts.map((item) =>
                item.product_id === updatedProduct.product_id
                  ? updatedProduct
                  : item,
              ),
            );
          }
        },
      )
      .subscribe();

    getProducts();

    return () => {
      supabase.removeChannel(productChanges);
    };
  }, [supabase, products, setProducts]);

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
                        key={idx}
                        id={container.id}
                        product={container.product}
                      />
                    );
                  })}
                </>
              )}
            </SortableContext>
          </DndContext>
        </div>
        {containers.length == 0 && (
          <div className="py-24 font-bold text-2xl">Add your first item!</div>
        )}
      </div>
    </>
  );
};

export default Products;
