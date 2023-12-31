'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

const Messages = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  return (
    <>
      {error && (
        <p className="mt-4 p-4 bg-neutral-900 text-neutral-300 text-center">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 p-4 bg-neutral-900 text-neutral-300 text-center">
          {message}
        </p>
      )}
    </>
  );
};

export default Messages;
