import React from 'react';

const LogoutButton = () => {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="py-2 px-4 rounded no-underline  bg-secondary/50 hover:bg-secondary/80 duration-300">
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
