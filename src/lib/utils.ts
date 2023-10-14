import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';

  // Make sure to include https:// when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing /.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const getInitials = (name: string) => {
  // Split the name into words
  const words = name.split(' ');

  // Initialize an empty string to store the initials
  let initials = '';

  // Iterate through the words and extract the first character of each word
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      // Check if the word is not empty
      initials += words[i][0].toUpperCase(); // Append the uppercase initial
    }
  }

  return initials;
};

export const getFileKey = (url: string) => {
  const delimiter = 'https://utfs.io/f/';
  const result = url.includes(delimiter)
    ? url.substr(url.indexOf(delimiter) + delimiter.length)
    : null;
  return result;
};
