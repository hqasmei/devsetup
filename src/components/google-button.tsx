'use client';

import React from 'react';

import { getURL } from '@/constants';
import { Icon } from '@iconify/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const GoogleButton = () => {
  const supabase = createClientComponentClient();

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={signIn}
      type="button"
      className="w-full flex flex-row space-x-2 items-center justify-center bg-btn-background duration-300 hover:bg-btn-background-hover py-2 px-4 rounded-lg"
    >
      <Icon icon="flat-color-icons:google" width="28" height="28" />
      <span>Google</span>
    </button>
  );
};

export default GoogleButton;
