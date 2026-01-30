import { withMDX } from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config) => {
    // Dummy webpack function to force webpack mode (disables Turbopack)
    return config;
  },
};

export default withMDX()(nextConfig);
