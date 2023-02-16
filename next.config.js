/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image-uploader.nkululekomaseko.com", "ca.slack-edge.com"],
  },
};

module.exports = nextConfig;
