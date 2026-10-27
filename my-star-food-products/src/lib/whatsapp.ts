import {business} from './business';
import type {Product} from '@/types/product';
export function whatsappUrl(message = `Hello ${business.name},\n\nPlease share more information about your products. Thank you.`) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function productEnquiry(product: Pick<Product, 'name'|'slug'|'category'>, origin: string, weight?: string) {
  const url = new URL(`/products/${encodeURIComponent(product.slug)}`, origin).href;
  return whatsappUrl([
    `Hello ${business.name},`, '', 'I am interested in your product:', '',
    `Product: ${product.name}`, product.category && `Category: ${product.category}`,
    weight && `Weight: ${weight}`, `Product Link: ${url}`, '',
    'Please share the price, availability and ordering details.', '', 'Thank you.',
  ].filter(line => line !== undefined).join('\n'));
}
