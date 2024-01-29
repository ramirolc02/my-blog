/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/ramirolc02/content/master/images/**",
      },
    ],
  },
}

module.exports = nextConfig
