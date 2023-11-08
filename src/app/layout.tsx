import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font';
import { Toaster } from 'sonner';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'DevSetup | Share your setup in seconds',
  description: 'The fastest way to share your setup.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={GeistSans.className}
      suppressHydrationWarning={true}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
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
      <body className="text-foreground">
        <Toaster />
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
