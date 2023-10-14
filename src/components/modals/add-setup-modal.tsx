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
import { FormProvider, useFormState } from '@/contexts/form-context';

import { SetupImagesForm } from '../setup-form/setup-images';
import { SetupNameForm } from '../setup-form/setup-name';

function ActiveStepFormComponent({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { step } = useFormState();
  switch (step) {
    case 1:
      return <SetupNameForm />;
    case 2:
      return <SetupImagesForm setShowModal={setShowModal} />;

    default:
      return null;
  }
}

function AddSetupModalHelper({
  showAddSetupModal,
  setShowAddSetupModal,
}: {
  showAddSetupModal: boolean;
  setShowAddSetupModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <Modal showModal={showAddSetupModal} setShowModal={setShowAddSetupModal}>
      <div className="text-lg font-semibold  items-center justify-center flex border-b pb-4">
        Add your setup!
      </div>

      <div className="p-4">
        <FormProvider>
          <ActiveStepFormComponent setShowModal={setShowAddSetupModal} />
        </FormProvider>
      </div>
    </Modal>
  );
}

export function useAddSetupModal() {
  const [showAddSetupModal, setShowAddSetupModal] = useState(false);

  const AddSetupModal = useCallback(() => {
    return (
      <AddSetupModalHelper
        showAddSetupModal={showAddSetupModal}
        setShowAddSetupModal={setShowAddSetupModal}
      />
    );
  }, [showAddSetupModal, setShowAddSetupModal]);

  return useMemo(
    () => ({
      setShowAddSetupModal,
      AddSetupModal,
    }),
    [setShowAddSetupModal, AddSetupModal],
  );
}
