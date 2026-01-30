import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  turbopack: {},  // Silence Turbopack warning
  webpack: (config) => {
    // Dummy webpack function to force webpack mode (disables Turbopack for MDX compatibility)
    return config;
  },
};

export default withMDX(nextConfig);
