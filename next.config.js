/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },

      {
        protocol: 'https',
        hostname: 'piwhuvwtovtegrqdwnfh.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
