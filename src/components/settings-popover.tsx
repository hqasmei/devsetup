'use client';

import React, { useState } from 'react';

import IconMenu from '@/components/icon-menu';
import { useDeleteSetupModal } from '@/components/modals/delete-setup-modal';
import Popover from '@/components/popover';
import { Icon } from '@iconify/react';

import { useUpdateSetupModal } from './modals/update-setup-modal';

const SettingsPopover = ({
  setupId,
  setupName,
}: {
  setupId: any;
  setupName: any;
}) => {
  const [openPopover, setOpenPopover] = useState(false);
  const { setShowDeleteSetupModal, DeleteSetupModal } = useDeleteSetupModal({
    props: { setupId: setupId },
  });

  const { setShowUpdateSetupModal, UpdateSetupModal } = useUpdateSetupModal({
    props: { setupId: setupId, setupName: setupName },
  });

  return (
    <>
      <UpdateSetupModal />
      <DeleteSetupModal />
      <Popover
        content={
          <div className="grid w-full gap-4 p-2 sm:w-48">
            <button
              onClick={() => {
                setOpenPopover(false);
                setShowUpdateSetupModal(true);
              }}
              className="group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium text-stone-300 transition-all duration-75 hover:bg-secondary hover:text-white"
            >
              <IconMenu
                text="Edit"
                icon={<Icon icon="lucide:pencil-line" width="24" height="24" />}
              />
              <kbd className="hidden rounded bg-stone-100 px-2 py-0.5 text-xs font-light text-stone-500 transition-all duration-75 group-hover:bg-stone-200 sm:inline-block">
                E
              </kbd>
            </button>

            <button
              onClick={() => {
                setOpenPopover(false);
                setShowDeleteSetupModal(true);
              }}
              className="group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium text-red-600 transition-all duration-75 hover:bg-red-600 hover:text-white"
            >
              <IconMenu
                text="Delete"
                icon={
                  <Icon
                    icon="lucide:trash-2"
                    className="text-red-800 hover:text-red-600"
                    width="24"
                    height="24"
                  />
                }
              />
              <kbd className="hidden rounded bg-red-100 px-2 py-0.5 text-xs font-light text-red-600 transition-all duration-75 group-hover:bg-red-500 group-hover:text-white sm:inline-block">
                X
              </kbd>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpenPopover(!openPopover);
          }}
          className="rounded  bg-secondary/50 hover:bg-secondary/80 duration-300 p-2"
        >
          <span className="sr-only">Edit</span>
          <Icon icon="lucide:settings" width="24" height="24" />
        </button>
      </Popover>
    </>
  );
};

export default SettingsPopover;
