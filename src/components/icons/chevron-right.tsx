import React from 'react';

const ChevronRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m9 18l6-6l-6-6"
      />
    </svg>
  );
};

export default ChevronRight;
