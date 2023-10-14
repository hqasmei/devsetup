/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'avatars.githubusercontent.com', 'utfs.io'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
