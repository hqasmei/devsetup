'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import DevSetupLogo from '@/components/devsetup-logo';
import UserButton from '@/components/user-button';
import useNavigation from '@/hooks/use-navigation';

const MobileNav = ({ user, users }: { user: any; users: any }) => {
  const {
    isSetupActive,
    isProductsActive,
    isAnalyticsActive,
    isSettingsActive,
  } = useNavigation();

  return (
    <div className="w-full flex flex-col justify-center items-center md:hidden fixed top-0 bg-background">
      <div className="w-full max-w-4xl flex justify-between items-center px-4 text-sm text-foreground border-b border-b-foreground/10 h-12">
        <Link
          href="/admin"
          className="flex flex-row space-x-2 items-center justify-center"
        >
          <DevSetupLogo />
        </Link>

        <div className="flex flex-row space-x-2 items-center justify-center">
          {/* <Button variant="link">
            <div className="flex flex-row space-x-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6l-4-4l-4 4m4-4v13"
                />
              </svg>
              <span className='font-bold'>Share</span>
            </div>
          </Button> */}
          {user && (
            <div className="flex flex-row items-center gap-4">
              {users && <UserButton props={users[0]} />}
            </div>
          )}
        </div>
      </div>
      <div className="w-full maxW-4xl flex flex-row space-x-8 items-center px-4 text-sm text-foreground border-b border-b-foreground/10">
        <Link
          href="/admin"
          className="flex flex-col items-center justify-center relative py-2  space-y-1 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`group-hover:text-foreground  duration-200 ${
              isSetupActive ? '' : 'text-muted-foreground'
            }`}
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </g>
          </svg>

          <span
            className={`font-semibold group-hover:text-foreground  duration-200 ${
              isSetupActive ? '' : 'text-muted-foreground'
            }`}
          >
            Setup
          </span>
          <span
            className={`${
              isSetupActive
                ? 'absolute z-10 w-[110%] bottom-0 h-[1px] bg-zinc-100 rounded-full'
                : 'hidden'
            }`}
          ></span>
        </Link>
        <Link
          href="/admin/products"
          className="flex flex-col items-center justify-center relative py-2  space-y-1 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`group-hover:text-foreground  duration-200 ${
              isProductsActive ? '' : 'text-muted-foreground'
            }`}
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </g>
          </svg>

          <span
            className={`font-semibold group-hover:text-foreground  duration-200 ${
              isProductsActive ? '' : 'text-muted-foreground'
            }`}
          >
            Products
          </span>
          <span
            className={`${
              isProductsActive
                ? 'absolute z-10 w-[110%] bottom-0 h-[1px] bg-zinc-100 rounded-full'
                : 'hidden'
            }`}
          ></span>
        </Link>
        <Link
          href="/admin/analytics"
          className="flex flex-col items-center justify-center relative py-2  space-y-1 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`group-hover:text-foreground  duration-200 ${
              isAnalyticsActive ? '' : 'text-muted-foreground'
            }`}
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <path d="M14 2v6h6m-8 10v-4m-4 4v-2m8 2v-6" />
            </g>
          </svg>
          <span
            className={`font-semibold group-hover:text-foreground  duration-200 ${
              isAnalyticsActive ? '' : 'text-muted-foreground'
            }`}
          >
            Analytics
          </span>
          <span
            className={`${
              isAnalyticsActive
                ? 'absolute z-10 w-[110%] bottom-0 h-[1px] bg-zinc-100 rounded-full'
                : 'hidden'
            }`}
          ></span>
        </Link>
        <Link
          href="/admin/settings"
          className="flex flex-col items-center justify-center relative py-2  space-y-1 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`group-hover:text-foreground  duration-200 ${
              isSettingsActive ? '' : 'text-muted-foreground'
            }`}
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </g>
          </svg>
          <span
            className={`font-semibold group-hover:text-foreground  duration-200 ${
              isSettingsActive ? '' : 'text-muted-foreground'
            }`}
          >
            Settings
          </span>
          <span
            className={`${
              isSettingsActive
                ? 'absolute z-10 w-[110%] bottom-0 h-[1px] bg-zinc-100 rounded-full'
                : 'hidden'
            }`}
          ></span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
