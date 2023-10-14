import React from 'react';

import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="animate-in flex flex-col gap-14 opacity-0 w-full max-w-4xl px-3 py-16 lg:py-24 text-foreground ">
      <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8 justify-center  items-center">
        <div className="flex flex-col space-y-4  md:items-start md:text-left md:w-1/2 w-full text-center items-center">
          <p className="text-3xl lg:text-5xl !leading-tight">
            Easily discover and share your setup
          </p>
          <span className="text-stone-300">
            Make it super easy for friends to use your computer stuff!
          </span>
          <div className="flex">
            <Link
              href="/login"
              className="bg-foreground py-3 px-6 rounded text-sm text-background hover:bg-foreground/80 duration-300"
            >
              Get started
            </Link>
          </div>
        </div>

        <img
          alt="Hero"
          className="w-full md:w-1/2 object-cover rounded mt-8 md:mt-0 md:ml-6"
          height="400"
          src="https://res.cloudinary.com/duud9d8dv/image/upload/v1694494048/Screenshot_2023-09-11_at_9.46.53_PM_ygdzlk.png"
          style={{
            aspectRatio: '600/400',
            objectFit: 'cover',
          }}
          width="600"
        />
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </section>
  );
};

export default HeroSection;
