import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
