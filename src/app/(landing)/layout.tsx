import React from 'react';

import Footer from '@/components/footer';
import MaxWidthWrapper from '@/components/max-width-wrapper';

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      <MaxWidthWrapper>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </MaxWidthWrapper>
    </>
  );
};

export default LandingLayout;
