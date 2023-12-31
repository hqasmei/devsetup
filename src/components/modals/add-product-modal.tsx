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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryItems } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  productCategory: z.string().min(1, {
    message: 'Category is required.',
  }),
  productName: z.string().min(1, {
    message: 'Name is required.',
  }),
  productLink: z
    .string()
    .url('This is not a url.')
    .optional()
    .or(z.literal('')),
});

function AddProductModalHelper({
  showAddProductModal,
  setShowAddProductModal,
}: {
  showAddProductModal: boolean;
  setShowAddProductModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productCategory: '',
      productName: '',
      productLink: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/product/create', values);
      router.refresh();
      setShowAddProductModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showAddProductModal}
      setShowModal={setShowAddProductModal}
    >
      <div className="px-4 py-8">
        <div className="flex items-center gap-x-2 font-bold text-xl mb-4">
          Add Product
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="productCategory"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>
                    Category <span className="text-red-600">*</span>
                  </FormLabel>

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
              name="productName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>
                    Name <span className="text-red-600">*</span>
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

            <FormField
              name="productLink"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="https://"
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
                onClick={() => setShowAddProductModal(false)}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                type="submit"
                disabled={isLoading || !form.formState.isValid} // Disable if not valid
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

export function useAddProductModal() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const AddProductModal = useCallback(() => {
    return (
      <AddProductModalHelper
        showAddProductModal={showAddProductModal}
        setShowAddProductModal={setShowAddProductModal}
      />
    );
  }, [showAddProductModal, setShowAddProductModal]);

  return useMemo(
    () => ({
      setShowAddProductModal,
      AddProductModal,
    }),
    [setShowAddProductModal, AddProductModal],
  );
}
