import {createImageUrlBuilder} from '@sanity/image-url';
import {projectId, dataset, sanityConfigured} from './env';
import type {ProductImage} from '@/types/product';
const builder = sanityConfigured ? createImageUrlBuilder({projectId, dataset}) : null;
export function productImage(image: ProductImage|undefined, width=1000) {
  if (image?.localSrc?.startsWith('/images/demo/')) return image.localSrc;
  if (!builder || !image?.asset?._ref) return undefined;
  try {return builder.image(image).width(width).fit('max').auto('format').url();} catch {return undefined;}
}
