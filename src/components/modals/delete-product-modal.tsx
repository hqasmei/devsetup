'use client';

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DeleteProductModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  productId: z.string(),
});

function DeleteProductModalHelper({
  showDeleteProductModal,
  setShowDeleteProductModal,
  props,
}: {
  showDeleteProductModal: boolean;
  setShowDeleteProductModal: Dispatch<SetStateAction<boolean>>;
  props?: DeleteProductModalProps;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: props?.productId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/product/delete', values);
      router.refresh();
      setShowDeleteProductModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showDeleteProductModal}
      setShowModal={setShowDeleteProductModal}
    >
      <div className="p-4">
        <div className="flex items-center gap-x-2 font-bold text-xl mb-4">
          Delete Product
        </div>
        <div className="pb-4 text-sm text-foreground/80">
          This item will immediately be deleted. Once deleted, you&#39;ll no
          longer be able to view or modify this item.
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="w-full flex justify-center space-x-6">
              <Button
                size="lg"
                variant="outline"
                type="button"
                disabled={isLoading}
                className="w-full"
                onClick={() => setShowDeleteProductModal(false)}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                type="submit"
                variant="destructive"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}

export function useDeleteProductModal({
  props,
}: { props?: DeleteProductModalProps } = {}) {
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);

  const DeleteProductModal = useCallback(() => {
    return (
      <DeleteProductModalHelper
        showDeleteProductModal={showDeleteProductModal}
        setShowDeleteProductModal={setShowDeleteProductModal}
        props={props}
      />
    );
  }, [showDeleteProductModal, setShowDeleteProductModal]);

  return useMemo(
    () => ({
      setShowDeleteProductModal,
      DeleteProductModal,
    }),
    [setShowDeleteProductModal, DeleteProductModal],
  );
}
