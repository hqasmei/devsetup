'use client';

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryItems } from '@/constants';
import { UpdateProductModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  productId: z.string(),
  productName: z.string().min(1, {
    message: 'Name is required.',
  }),
});

function UpdateProductModalHelper({
  showUpdateProductModal,
  setShowUpdateProductModal,
  props,
}: {
  showUpdateProductModal: boolean;
  setShowUpdateProductModal: Dispatch<SetStateAction<boolean>>;
  props?: UpdateProductModalProps;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: props?.productId,
      productName: props?.productName,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/product/update', values);
      router.refresh();
      setShowUpdateProductModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showUpdateProductModal}
      setShowModal={setShowUpdateProductModal}
    >
      <div className="px-4 py-8">
        <div className="flex items-center gap-x-2 font-bold text-xl mb-4">
          Update Product
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="productName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>
                    Name<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="w-full flex justify-center space-x-6">
              <Button
                size="lg"
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  <span>Save</span>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                type="button"
                disabled={isLoading}
                className="w-full"
                onClick={() => setShowUpdateProductModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}

export function useUpdateProductModal({
  props,
}: { props?: UpdateProductModalProps } = {}) {
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

  const UpdateProductModal = useCallback(() => {
    return (
      <UpdateProductModalHelper
        showUpdateProductModal={showUpdateProductModal}
        setShowUpdateProductModal={setShowUpdateProductModal}
        props={props}
      />
    );
  }, [showUpdateProductModal, setShowUpdateProductModal]);

  return useMemo(
    () => ({
      setShowUpdateProductModal,
      UpdateProductModal,
    }),
    [setShowUpdateProductModal, UpdateProductModal],
  );
}
