/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  /**
   * Security headers.
   *
   * These are ALSO declared in netlify.toml, but netlify.toml headers only
   * reach statically-served files — responses rendered by the Next.js server
   * handler bypass them. Declaring them here makes Next set them on every
   * rendered page too, so both paths are covered.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
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
