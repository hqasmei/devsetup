import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-14 relative">
      <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 items-center">
        <div className="relative mx-auto max-w-3xl text-center ">
          <h1 className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-4xl/[1.07] font-bold tracking-tight text-transparent md:text-6xl/[1.07]">
            Share your setup in minutes
          </h1>
          <p className="mt-6 text-md font-medium text-zinc-400 md:text-lg">
            Make it super easy to add, arrange, and show off everything in your
            workspace, from your computer setup to all your cool gear!
          </p>
          <div className="mt-6 flex flex-col items-center justify-center   gap-y-8">
            <Button asChild className="font-semibold">
              <Link href="/login">Get started</Link>
            </Button>
          </div>
        </div>
        {/* <div>
          <img
            alt="Hero"
            className="w-full object-cover rounded-2xl mt-8 md:mt-0 md:ml-6 border p-2"
            height="400"
            src="https://res.cloudinary.com/duud9d8dv/image/upload/v1697264679/Screenshot_2023-10-13_at_11.23.48_PM_woojoc.png"
            style={{
              aspectRatio: '1130/818',
              objectFit: 'cover',
            }}
            width="600"
          />
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
