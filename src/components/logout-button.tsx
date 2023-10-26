import React from 'react';

import { Button } from '@/components/ui/button';

const LogoutButton = () => {
  return (
    <form action="/api/auth/sign-out" method="post">
      <Button type="submit" variant="outline" className="bg-transparent/40">
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;
