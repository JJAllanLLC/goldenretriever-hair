import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async redirects() {
    return [
      { source: '/home/services/', destination: '/guides', permanent: true },
      { source: '/history-of-the-golden-retriever/', destination: '/blog', permanent: true },
      { source: '/golden-retriever-games-and-activities/', destination: '/blog', permanent: true },
      { source: '/best-food-for-golden-retrievers/', destination: '/guides/nutrition', permanent: true },
      { source: '/golden-retriever-breeder-selection/', destination: '/breeders', permanent: true },
      { source: '/grooming-golden-retrievers/', destination: '/guides/golden-retriever-grooming-guide', permanent: true },
      { source: '/tips-for-bathing-a-golden-retriever/', destination: '/guides/golden-retriever-grooming-guide', permanent: true },
      { source: '/recommended-products-for-your-golden-retriever/', destination: '/products', permanent: true },
      { source: '/the-golden-retriever-coat-understanding-grooming-needs-for-every-season/', destination: '/guides/golden-retriever-grooming-guide', permanent: true },
      { source: '/halloween-costume-ideas-for-your-golden-retriever/', destination: '/blog', permanent: true },
      { source: '/golden-retriever-rescue-the-process-of-rescuing-a-golden-retriever-and-the-benefits-of-adopting-a-rescue-dog/', destination: '/guides/rescue-adoption', permanent: true },
      { source: '/the-benefits-of-owning-a-golden-retriever-an-exploration-of-the-many-ways-that-owning-a-golden-retriever-can-improve-your-life/', destination: '/blog', permanent: true },
      { source: '/hip-dysplasia-in-golden-retrievers/', destination: '/guides', permanent: true },
      { source: '/adding-a-second-golden-retriever-to-your-household/', destination: '/blog', permanent: true },
      { source: '/effective-techniques-to-calm-down-your-golden-retriever/', destination: '/blog', permanent: true },
      { source: '/golden-retriever-pet-insurance/', destination: '/products', permanent: true },
      { source: '/golden-retriever-allergies/', destination: '/guides', permanent: true },
      { source: '/golden-retriever-heat-cycle-care/', destination: '/guides', permanent: true },
      { source: '/golden-retriever-socialization/', destination: '/guides', permanent: true },
      { source: '/golden-retriever-personality-traits/', destination: '/blog', permanent: true },
      { source: '/tips-for-traveling-and-living-with-your-golden-retriever/', destination: '/blog', permanent: true },
      { source: '/keep-golden-retriever-out-of-garden/', destination: '/blog', permanent: true },
      { source: '/potty-train-your-golden-retriever-to-ring-a-bell/', destination: '/guides', permanent: true },
      { source: '/the-most-popular-golden-retriever-names-of-2023/', destination: '/blog', permanent: true },
      { source: '/crate-training-a-golden-retriever/', destination: '/guides', permanent: true },
      { source: '/', destination: '/', has: [{ type: 'query', key: 'p' }], permanent: true },
      { source: '/category/:path*', destination: '/guides', permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
