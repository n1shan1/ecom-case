/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["w9yz545733.ufs.sh"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
