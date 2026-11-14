/** Public production configuration shared by the build and the Worker. */
export const cloudflareProduction = {
  workerName: 'my-star-food-products',
  projectId: 'tmnhiibx',
  dataset: 'production',
  apiVersion: '2026-10-01',
  siteUrl: 'https://my-star-food-products.allprotechlabs.workers.dev',
  productSource: 'sanity',
  siteIndexable: 'true',
};
