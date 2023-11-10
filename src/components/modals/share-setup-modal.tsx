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
import { Icon } from '@iconify/react';

function ShareSetupModalHelper({
  showShareSetupModal,
  setShowShareSetupModal,
}: {
  showShareSetupModal: boolean;
  setShowShareSetupModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <Modal
      showModal={showShareSetupModal}
      setShowModal={setShowShareSetupModal}
    >
      <div className="px-4 py-8">
        <div className="flex items-center gap-x-2 font-bold text-xl mb-4">
          Share this setup
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-row  items-center space-x-6 justify-start border rounded-lg p-4">
            <Icon icon="lucide:copy" width={28} height={28} />
            <span className="font-semibold">Copy Link</span>
          </button>
          <button className="flex flex-row  items-center space-x-6 justify-start border rounded-lg p-4">
            <Icon icon="lucide:mail" width={28} height={28} />
            <span className="font-semibold">Email</span>
          </button>
          <button className="flex flex-row  items-center space-x-6 justify-start border rounded-lg p-4">
            <Icon icon="simple-icons:x" width={24} height={24} />
            <span className="font-semibold">X</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function useShareSetupModal() {
  const [showShareSetupModal, setShowShareSetupModal] = useState(false);

  const ShareSetupModal = useCallback(() => {
    return (
      <ShareSetupModalHelper
        showShareSetupModal={showShareSetupModal}
        setShowShareSetupModal={setShowShareSetupModal}
      />
    );
  }, [showShareSetupModal, setShowShareSetupModal]);

  return useMemo(
    () => ({
      setShowShareSetupModal,
      ShareSetupModal,
    }),
    [setShowShareSetupModal, ShareSetupModal],
  );
}
