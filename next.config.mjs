import pkg from '@next/mdx';
const { withMDX } = pkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config) => config,  // Dummy to force webpack (disables Turbopack for MDX)
};

export default withMDX()(nextConfig);
