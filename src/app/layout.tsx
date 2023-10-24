import '@uploadthing/react/styles.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/globals.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <body>
        <Toaster position="top-center" richColors />
        <MaxWidthWrapper>
          <main className="min-h-screen bg-background flex flex-col items-center">
            {children}
          </main>
          <Footer />
        </MaxWidthWrapper>
        <Analytics />
      </body>
    </html>
  );
}
