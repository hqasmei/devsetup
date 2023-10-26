import React from 'react';

import { Manrope } from 'next/font/google';

import Footer from '@/components/footer';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';

const manrope = Manrope({
  subsets: ['latin'],
});

export const metadata = {
  title: 'DevSetup | Share your setup in seconds',
  description: '',
};

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={manrope.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className="relative">
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
        <Toaster position="top-center" richColors />
        <MaxWidthWrapper>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
          <Footer />
        </MaxWidthWrapper>
        <Analytics />
      </body>
    </html>
  );
};

export default LandingLayout;
