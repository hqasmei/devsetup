import React from 'react';

import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="animate-in flex flex-col gap-14 opacity-0 w-full max-w-4xl px-3 py-16 lg:py-24 text-foreground ">
      <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8 justify-center  items-center">
        <div className="flex flex-col space-y-4  md:items-left md:text-left md:w-1/2 w-full text-center">
          <p className="text-3xl lg:text-4xl !leading-tight">
            Easily discover and share your setup
          </p>
          <span className="text-stone-300">
            Make it super easy for friends to use your computer stuff!
          </span>
          <div className="flex">
            <Link
              href="/login"
              className="bg-foreground py-3 px-6 rounded-lg text-sm text-background hover:bg-foreground/80 duration-300"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="w-full h-64 md:w-1/2 flex items-center justify-end">
          <div className="h-full w-full bg-stone-100 rounded-lg">
            <span>hi</span>
          </div>
        </div>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </div>
  );
};

export default HeroSection;
