/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config) => config,  // Dummy webpack to force webpack mode (disables Turbopack)
};

import withMDX from '@next/mdx';

export default withMDX()(nextConfig);
