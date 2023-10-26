import '@uploadthing/react/styles.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/globals.css';

import { Manrope } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';

const manrope = Manrope({
  subsets: ['latin'],
});

export const metadata = {
  title: 'DevSetup | Share your setup in seconds',
  description: '',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
        <Toaster />
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
