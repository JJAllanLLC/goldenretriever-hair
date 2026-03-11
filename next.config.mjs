import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  async redirects() {
    return [
      {
        source: '/best-grooming-tools-for-golden-retrievers',
        destination: '/guides/best-brushes-for-golden-retrievers',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
