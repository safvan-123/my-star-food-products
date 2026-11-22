import { cloudflareProduction as config } from '../cloudflare.production.mjs';

const errors = [];
if (config.workerName !== 'my-star-food-products') errors.push('Worker target must remain my-star-food-products.');
if (!/^[a-z0-9-]{8,}$/.test(config.projectId)) errors.push('Sanity project ID is missing or invalid.');
if (config.projectId !== 'tmnhiibx') errors.push('Sanity project ID must match the existing client project.');
if (!/^[a-z0-9_-]+$/.test(config.dataset)) errors.push('Sanity dataset is missing or invalid.');
if (config.dataset !== 'production') errors.push('Sanity dataset must remain production.');
if (!/^https:\/\//.test(config.siteUrl) || new URL(config.siteUrl).hostname !== 'my-star-food-products.allprotechlabs.workers.dev') {
  errors.push('Production site URL must match the existing Cloudflare Worker URL.');
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(config.apiVersion)) errors.push('Sanity API version is missing or invalid.');
if (config.productSource !== 'sanity') errors.push('Production PRODUCT_SOURCE must be sanity.');
if (config.siteIndexable !== 'true') errors.push('Production SITE_INDEXABLE must be true.');

if (errors.length) {
  console.error('Cloudflare production preflight failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Cloudflare production preflight passed.');
console.log(`Worker: ${config.workerName}`);
console.log(`Sanity: project ${config.projectId}, dataset ${config.dataset}, API ${config.apiVersion}`);
console.log(`Site: ${config.siteUrl} (indexing enabled)`);
console.log('No API tokens or private credentials are required or printed.');
