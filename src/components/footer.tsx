'use client';

import React from 'react';

import Link from 'next/link';

import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className="p-4 bg-background border-t border-zinc-800  flex items-center justify-center">
      <div className="max-w-4xl w-full flex">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-sm leading-5 text-zinc-400">
            © Copyright 2023 DevSetup.
          </p>
          <div className="flex flex-row space-x-4 items-center">
            <Link href="https://twitter.com/hqasmei" target="_blank">
              <Icon
                icon="ri:twitter-x-fill"
                width="20"
                height="20"
                className="text-zinc-400 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-200"
              />
            </Link>
            <Link href="https://www.youtube.com/@hqasmei" target="_blank">
              <Icon
                icon="ri:youtube-fill"
                width="24"
                height="24"
                className="text-zinc-400 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-200"
              />
            </Link>
            <Link href="https://discord.gg/82qy4NM3GE" target="_blank">
              <Icon
                icon="ri:discord-fill"
                width="24"
                height="24"
                className="text-zinc-400 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
