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
        destination: 'https://goldenretriever.hair/guides/best-brushes-golden-retrievers',
        permanent: true,
      },
      {
        source: '/best-grooming-tools-for-golden-retrievers/',
        destination: 'https://goldenretriever.hair/guides/best-brushes-golden-retrievers',
        permanent: true,
      },
      {
        source: '/history-of-the-golden-retriever',
        destination: 'https://goldenretriever.hair/guides/history-of-the-golden-retriever',
        permanent: true,
      },
      {
        source: '/history-of-the-golden-retriever/',
        destination: 'https://goldenretriever.hair/guides/history-of-the-golden-retriever',
        permanent: true,
      },
      {
        source: '/golden-retriever-history',
        destination: 'https://goldenretriever.hair/guides/history-of-the-golden-retriever',
        permanent: true,
      },
      {
        source: '/history-golden-retriever',
        destination: 'https://goldenretriever.hair/guides/history-of-the-golden-retriever',
        permanent: true,
      },
      {
        source: '/guides/nutrition',
        destination: 'https://goldenretriever.hair/guides/best-dog-food-golden-retrievers-2026',
        permanent: true,
      },
      {
        source: '/guides/nutrition/',
        destination: 'https://goldenretriever.hair/guides/best-dog-food-golden-retrievers-2026',
        permanent: true,
      },
      {
        source: '/recommended-products-for-your-golden-retriever',
        destination: 'https://goldenretriever.hair/products',
        permanent: true,
      },
      {
        source: '/recommended-products-for-your-golden-retriever/',
        destination: 'https://goldenretriever.hair/products',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: 'https://goldenretriever.hair/blog',
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
      {
        source: '/guides/golden-retriever-ear-cleaning-guide',
        destination: '/guides/golden-retriever-ear-infections',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-ear-cleaning-guide/',
        destination: '/guides/golden-retriever-ear-infections',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-scratching-ears-constantly',
        destination: '/guides/golden-retriever-ear-infections',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-scratching-ears-constantly/',
        destination: '/guides/golden-retriever-ear-infections',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-feeding-schedule-guide',
        destination: '/guides/golden-retriever-feeding-chart',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-feeding-schedule-guide/',
        destination: '/guides/golden-retriever-feeding-chart',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-skin-allergies',
        destination: '/guides/golden-retriever-allergies-guide',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-skin-allergies/',
        destination: '/guides/golden-retriever-allergies-guide',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-itching-at-night',
        destination: '/guides/golden-retriever-allergies-guide',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-itching-at-night/',
        destination: '/guides/golden-retriever-allergies-guide',
        permanent: true,
      },
      {
        source: '/blog/why-do-golden-retrievers-itch-so-much',
        destination: '/guides/golden-retriever-allergies-guide',
        permanent: true,
      },
      {
        source: '/blog/why-do-golden-retrievers-itch-so-much/',
        destination: '/guides/golden-retriever-allergies-guide',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-socialization-timeline-chart',
        destination: '/guides/golden-retriever-socialization-guide',
        permanent: true,
      },
      {
        source: '/guides/golden-retriever-socialization-timeline-chart/',
        destination: '/guides/golden-retriever-socialization-guide',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
