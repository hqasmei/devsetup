'use client';

import React from 'react';

import { getURL } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const GoogleButton = () => {
  const supabase = createClientComponentClient();

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}api/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={signIn}
      type="button"
      className="w-full flex flex-row space-x-2 items-center justify-center bg-secondary/50 hover:bg-secondary/80 py-1 px-4 rounded duration-300"
    >
      <Icon icon="flat-color-icons:google" width="28" height="28" />
      <span>Google</span>
    </button>
  );
};

export default GoogleButton;
