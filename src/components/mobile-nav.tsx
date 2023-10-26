'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import DevSetupLogo from '@/components/devsetup-logo';
import UserButton from '@/components/user-button';
import useNavigation from '@/hooks/use-navigation';

const MobileNav = ({ user, users }: { user: any; users: any }) => {
  const { isSetupActive, isProductsActive, isAnalyticsActive } =
    useNavigation();

  return (
    <div className="w-full flex flex-col justify-center items-center md:hidden fixed top-0">
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
          className="flex flex-col items-center justify-center relative py-2  space-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`${isSetupActive ? '' : 'text-muted-foreground'}`}
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
            className={`font-semibold ${
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
          className="flex flex-col items-center justify-center relative py-2  space-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`${isProductsActive ? '' : 'text-muted-foreground'}`}
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
            className={`font-semibold ${
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
          className="flex flex-col items-center justify-center relative py-2  space-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`${isAnalyticsActive ? '' : 'text-muted-foreground'}`}
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
            className={`font-semibold ${
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
      </div>
    </div>
  );
};

export default MobileNav;
