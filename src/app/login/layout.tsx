import React from 'react';

export const metadata = {
  title: 'Login | DevSetup',
  description: '',
};

const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full">
      {children}
    </div>
  );
};

export default LoginLayout;
