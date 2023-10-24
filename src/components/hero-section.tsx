import React from 'react';

import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-14">
      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-5xl/[1.07] font-bold tracking-tight text-transparent md:text-7xl/[1.07]">
          Share your setup in minutes
        </h1>
        <p className="mt-6 text-lg font-medium text-zinc-400 md:text-xl">
          Make it super easy to add, arrange, and show off everything in your
          workspace, from your computer setup to all your cool gear!
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-y-8">
          <Link
            href="/login"
            className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative z-10 rounded-full bg-zinc-950 px-4 py-1.5 ring-1 ring-white/10">
            Get started
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </Link>

          {/* <div className="group">
            <a className="flex flex-col items-center gap-1" href="/#intro">
              <p className="text-sm/6 text-zinc-400 duration-300 group-hover:text-zinc-100">
                Learn more
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="text-zinc-400 duration-300 group-hover:translate-y-1.5 group-hover:text-zinc-100"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </a>
          </div> */}
        </div>
      </div>
      <div className="perspective-[1500px] relative pt-16">
        <div
          className="pointer-events-none absolute -top-36 left-1/2 h-[32rem] w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden lg:w-[60rem]"
          id="tsparticles"
        >
          <canvas
            data-generated="false"
            aria-hidden="true"
            width="986"
            height="1024"
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
