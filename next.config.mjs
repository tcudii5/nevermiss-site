/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/book', destination: '/contact', permanent: true },
      { source: '/demo', destination: '/contact', permanent: true },
      { source: '/solutions', destination: '/ai-receptionist', permanent: false },
    ];
  },
};

export default nextConfig;
