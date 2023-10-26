'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

const PreviewButton = () => {
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const togglePreview = () => {
    setIsPreviewActive(!isPreviewActive);
  }; 
  const containerClassName = isPreviewActive ? 'fixed' : 'hidden';

  return (
    <>
      <div className={containerClassName + ' left-0 top-0 z-20 h-full w-full'}>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      <div className="fixed bottom-10 z-20 md:hidden">
        <Button
          onClick={togglePreview}
          variant="outline"
          className="flex flex-row space-x-2 items-center justify-center"
        >
          {isPreviewActive ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M2 12s3-7 10-7s10 7 10 7s-3 7-10 7s-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </g>
              </svg>
              <span>Preview</span>
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default PreviewButton;
