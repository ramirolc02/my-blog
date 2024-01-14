/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};
module.exports = {
  images: {
    unoptimized: true,
  },
  ...nextConfig, // Add the nextConfig object to the exports
};
