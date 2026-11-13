import {business} from './business';
import type {Product} from '@/types/product';
export function whatsappUrl(message = `Hello MY STAR FOOD PRODUCTS,\n\nPlease share more information about your products. Thank you.`) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function productEnquiry(product: Pick<Product, 'name'|'slug'|'category'>, origin: string, weight?: string) {
  const url = new URL(`/products/${encodeURIComponent(product.slug)}`, origin).href;
  return whatsappUrl([
    `Hello ${business.name},`, '', 'I would like to enquire about supplying this product to my shop:', '',
    `Product: ${product.name}`, product.category && `Category: ${product.category}`,
    weight && `Preferred pack size: ${weight}`, `Product Link: ${url}`, '',
    'Please confirm the current availability, retailer pricing, pack sizes and supply options. Thank you.',
  ].filter(line => line !== undefined).join('\n'));
}
export function retailerEnquiry(fields: {shop: string; name: string; area: string; interests: string[]; notes: string}) {
  const {shop, name, area, interests, notes} = fields;
  return whatsappUrl([
    `Hello ${business.name},`, '', 'I would like to enquire about retail shop supply.', '',
    shop.trim() && `Shop name: ${shop.trim()}`,
    name.trim() && `Contact person: ${name.trim()}`,
    area.trim() && `Shop location: ${area.trim()}`,
    interests.length && `Interested in: ${interests.join(', ')}`,
    notes.trim() && `Requirements: ${notes.trim()}`,
    '', 'Please share the latest product range, pack sizes, retailer prices and availability. Thank you.',
  ].filter(Boolean).join('\n'));
}
