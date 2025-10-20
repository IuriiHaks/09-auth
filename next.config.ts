// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   /* config options here */
// }

// export default nextConfig

// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://notehub-api.goit.study/:path*',
//       },
//     ]
//   },
// }

// module.exports = nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },
}

export default nextConfig
