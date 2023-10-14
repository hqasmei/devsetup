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
import { UpdateItemModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  itemId: z.string(),
  itemCategory: z.string().min(1, {
    message: 'Categroy is required.',
  }),
  itemType: z.string().min(1, {
    message: 'Type is required.',
  }),
  itemBrand: z.string().min(1, {
    message: 'Brand is required.',
  }),
  itemModel: z.string().min(1, {
    message: 'Model is required.',
  }),
});

function UpdateItemModalHelper({
  showUpdateItemModal,
  setShowUpdateItemModal,
  props,
}: {
  showUpdateItemModal: boolean;
  setShowUpdateItemModal: Dispatch<SetStateAction<boolean>>;
  props?: UpdateItemModalProps;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemId: props?.itemId,
      itemCategory: props?.itemCategory,
      itemType: props?.itemType,
      itemBrand: props?.itemBrand,
      itemModel: props?.itemModel,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/setup-item/update', values);

      setShowUpdateItemModal(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showUpdateItemModal}
      setShowModal={setShowUpdateItemModal}
    >
      <div className="px-4 py-8">
        <div className="flex items-center gap-x-2 font-bold text-xl mb-4">
          Update Item
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="itemCategory"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Category</FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
              name="itemType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Type</FormLabel>
                  <Select
                    disabled={isLoading} // Disable if a category has not been selected
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                            .itemCategory as keyof typeof categoryItems
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
              name="itemBrand"
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
              name="itemModel"
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
                onClick={() => setShowUpdateItemModal(false)}
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

export function useUpdateItemModal({
  props,
}: { props?: UpdateItemModalProps } = {}) {
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);

  const UpdateItemModal = useCallback(() => {
    return (
      <UpdateItemModalHelper
        showUpdateItemModal={showUpdateItemModal}
        setShowUpdateItemModal={setShowUpdateItemModal}
        props={props}
      />
    );
  }, [showUpdateItemModal, setShowUpdateItemModal]);

  return useMemo(
    () => ({
      setShowUpdateItemModal,
      UpdateItemModal,
    }),
    [setShowUpdateItemModal, UpdateItemModal],
  );
}
