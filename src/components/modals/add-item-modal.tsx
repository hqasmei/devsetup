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
import { AddItemModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { data } from 'autoprefixer';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  category: z.string().min(1, {
    message: 'Categroy is required.',
  }),
  type: z.string().min(1, {
    message: 'Type is required.',
  }),
  brand: z.string().min(1, {
    message: 'Brand is required.',
  }),
  model: z.string().min(1, {
    message: 'Model is required.',
  }),
  setupId: z.string(),
});

function AddItemModalHelper({
  showAddItemModal,
  setShowAddItemModal,
  props,
}: {
  showAddItemModal: boolean;
  setShowAddItemModal: Dispatch<SetStateAction<boolean>>;
  props?: AddItemModalProps;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      type: '',
      brand: '',
      model: '',
      setupId: props?.setupId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/setup-item/add', values);
      router.refresh();
      setShowAddItemModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
      <div className="px-4 py-8">
        <div className="flex items-center gap-x-2 font-bold text-xl mb-4">
          Add Item
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Category</FormLabel>

                  <Select disabled={isLoading} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.keys(categoryItems).map((category) => (
                          <SelectItem key={category} value={category}>
                            <div className="flex flex-row items-center space-x-2">
                              <span>{category}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Type</FormLabel>
                  <Select
                    disabled={isLoading} // Disable if a category has not been selected
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {categoryItems[
                          form.getValues()
                            .category as keyof typeof categoryItems
                        ]?.map((item) => (
                          <SelectItem key={item} value={item}>
                            <div className="flex flex-row items-center space-x-2">
                              <span>{item}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="brand"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Brand name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="model"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Model name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="w-full flex justify-center space-x-6">
              <Button
                size="lg"
                variant="outline"
                type="button"
                disabled={isLoading}
                className="w-full"
                onClick={() => setShowAddItemModal(false)}
              >
                Cancel
              </Button>
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
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}

export function useAddItemModal({ props }: { props?: AddItemModalProps } = {}) {
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const AddItemModal = useCallback(() => {
    return (
      <AddItemModalHelper
        showAddItemModal={showAddItemModal}
        setShowAddItemModal={setShowAddItemModal}
        props={props}
      />
    );
  }, [showAddItemModal, setShowAddItemModal]);

  return useMemo(
    () => ({
      setShowAddItemModal,
      AddItemModal,
    }),
    [setShowAddItemModal, AddItemModal],
  );
}
