/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'utfs.io',
      'lh3.googleusercontent.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
