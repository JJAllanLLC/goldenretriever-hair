import createMDX from '@next/mdx';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  // Let middleware handle trailing-slash → final-destination in one hop for
  // legacy URLs. Without this, Next strips `/old/` → `/old` before redirects.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/best-grooming-tools-for-golden-retrievers',
        destination: '/guides/best-brushes-golden-retrievers',
        permanent: true,
      },
      {
        source: '/best-grooming-tools-for-golden-retrievers/',
        destination: '/guides/best-brushes-golden-retrievers',
        permanent: true,
      },
      {
        source: '/history-of-the-golden-retriever',
        destination: '/guides/history-of-the-golden-retriever',
        permanent: true,
      },
      {
        source: '/history-of-the-golden-retriever/',
        destination: '/guides/history-of-the-golden-retriever',
        permanent: true,
      },
      {
        source: '/golden-retriever-history',
        destination: '/guides/history-of-the-golden-retriever',
        permanent: true,
      },
      {
        source: '/history-golden-retriever',
        destination: '/guides/history-of-the-golden-retriever',
        permanent: true,
      },
      {
        source: '/guides/nutrition',
        destination: '/guides/best-dog-food-golden-retrievers-2026',
        permanent: true,
      },
      {
        source: '/guides/nutrition/',
        destination: '/guides/best-dog-food-golden-retrievers-2026',
        permanent: true,
      },
      {
        source: '/recommended-products-for-your-golden-retriever',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/recommended-products-for-your-golden-retriever/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-weight-guide',
        destination: '/guides/golden-retriever-weight-obesity',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-weight-guide/',
        destination: '/guides/golden-retriever-weight-obesity',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-training-guide',
        destination: '/guides/golden-retriever-basic-obedience-training-guide',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-training-guide/',
        destination: '/guides/golden-retriever-basic-obedience-training-guide',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-puppy-development',
        destination: '/guides/puppy-care',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-puppy-development/',
        destination: '/guides/puppy-care',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
