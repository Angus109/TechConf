/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL: process.env.URL
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '/dhgggeajh/image/upload/**',
          },
        ],
      },
    
};

export default nextConfig;
