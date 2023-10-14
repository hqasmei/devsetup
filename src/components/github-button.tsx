'use client';

import React, { useState } from 'react';

import { getURL } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const GithubButton = () => {
  const supabase = createClientComponentClient();

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={signIn}
      className="w-full flex flex-row space-x-2 items-center justify-center bg-secondary/50 hover:bg-secondary/80 py-1 px-4 rounded duration-300"
    >
      <Icon icon="mdi:github" width="32" height="32" />
      <span>Github</span>
    </button>
  );
};

export default GithubButton;
