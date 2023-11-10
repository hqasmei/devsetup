import React from 'react';

export const metadata = {
  title: 'Products | DevSetup',
  description: '',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
