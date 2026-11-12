import {sanityConfigured} from '@/sanity/env';
// auto: show samples only before Sanity is connected. demo: force samples. sanity: never show samples.
export function useDemoProducts() {
  const source = process.env.PRODUCT_SOURCE || 'auto';
  if (!['auto','demo','sanity'].includes(source)) throw new Error('PRODUCT_SOURCE must be auto, demo or sanity.');
  return source === 'demo' || (source === 'auto' && !sanityConfigured);
}
