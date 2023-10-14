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
import { DeleteSetupModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  setupId: z.string(),
});

function DeleteSetupModalHelper({
  showDeleteSetupModal,
  setShowDeleteSetupModal,
  props,
}: {
  showDeleteSetupModal: boolean;
  setShowDeleteSetupModal: Dispatch<SetStateAction<boolean>>;
  props?: DeleteSetupModalProps;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      setupId: props?.setupId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/setup/delete', values);
      router.refresh();
      setShowDeleteSetupModal(false);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showDeleteSetupModal}
      setShowModal={setShowDeleteSetupModal}
    >
      <div className="p-4">
        <div className="flex items-center gap-x-2 font-bold text-xl mb-4">
          Delete Setup
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
                onClick={() => setShowDeleteSetupModal(false)}
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

export function useDeleteSetupModal({
  props,
}: { props?: DeleteSetupModalProps } = {}) {
  const [showDeleteSetupModal, setShowDeleteSetupModal] = useState(false);

  const DeleteSetupModal = useCallback(() => {
    return (
      <DeleteSetupModalHelper
        showDeleteSetupModal={showDeleteSetupModal}
        setShowDeleteSetupModal={setShowDeleteSetupModal}
        props={props}
      />
    );
  }, [showDeleteSetupModal, setShowDeleteSetupModal]);

  return useMemo(
    () => ({
      setShowDeleteSetupModal,
      DeleteSetupModal,
    }),
    [setShowDeleteSetupModal, DeleteSetupModal],
  );
}
