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
import { UpdateSetupModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  setupId: z.string(),
  setupName: z.string().min(1, {
    message: 'Name is required.',
  }),
});

function UpdateSetupModalHelper({
  showUpdateSetupModal,
  setShowUpdateSetupModal,
  props,
}: {
  showUpdateSetupModal: boolean;
  setShowUpdateSetupModal: Dispatch<SetStateAction<boolean>>;
  props?: UpdateSetupModalProps;
}) {
  const supabase = createClientComponentClient();
  const [isNameChanged, setIsNameChanged] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      setupId: props?.setupId,
      setupName: props?.setupName,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/setup/update', values);
      // router.refresh();
      setShowUpdateSetupModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Compare the current value with the original value
    if (form.getValues().setupName !== props?.setupName) {
      setIsNameChanged(true);
    } else {
      setIsNameChanged(false);
    }
  }, [form.getValues().setupName]);

  return (
    <Modal
      showModal={showUpdateSetupModal}
      setShowModal={setShowUpdateSetupModal}
    >
      <div className="text-lg font-semibold  items-center justify-center flex border-b pb-4">
        Update your setup!
      </div>

      <div className="p-4">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex gap-1 flex-col">
              <FormField
                name="setupName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 pt-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <Button
                size="lg"
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => {
                  setShowUpdateSetupModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                variant="default"
                type="submit"
                className="w-full"
                disabled={isLoading || !isNameChanged}
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

export function useUpdateSetupModal({
  props,
}: { props?: UpdateSetupModalProps } = {}) {
  const [showUpdateSetupModal, setShowUpdateSetupModal] = useState(false);

  const UpdateSetupModal = useCallback(() => {
    return (
      <UpdateSetupModalHelper
        showUpdateSetupModal={showUpdateSetupModal}
        setShowUpdateSetupModal={setShowUpdateSetupModal}
        props={props}
      />
    );
  }, [showUpdateSetupModal, setShowUpdateSetupModal]);

  return useMemo(
    () => ({
      setShowUpdateSetupModal,
      UpdateSetupModal,
    }),
    [setShowUpdateSetupModal, UpdateSetupModal],
  );
}
