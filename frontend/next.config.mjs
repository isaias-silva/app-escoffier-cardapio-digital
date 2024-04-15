/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.architect.io',
          },
        ],
      },
      experimental: {
        missingSuspenseWithCSRBailout: false,
      }
};

export default nextConfig;
