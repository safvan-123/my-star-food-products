import type {Metadata} from 'next';
import {business} from './business';
import {useDemoProducts} from './product-source';
export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000';
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('NEXT_PUBLIC_SITE_URL must use http or https.');
  return url.origin;
}
export const indexable = !useDemoProducts() && process.env.SITE_INDEXABLE === 'true' &&
  !!process.env.NEXT_PUBLIC_SITE_URL && !/localhost|127\.0\.0\.1/.test(siteUrl());
export const pageSeo = {
  home: {title: 'MY STAR FOOD PRODUCTS | Spices, Masalas & Retail Shop Supply', description: 'Explore spices, masala powders, rice flour and everyday kitchen essentials from MY STAR FOOD PRODUCTS in Venjaramoodu, Kerala. Retail shop supply enquiries welcome.'},
  about: {title: 'About MY STAR | Retail Food Product Supply in Kerala', description: 'Meet MY STAR FOOD PRODUCTS, a retail shop supply business in Mylakuzhy, Nellanad, Venjaramoodu, Thiruvananthapuram.'},
  products: {title: 'Spice Powders, Masalas & Rice Flour | Product Range', description: 'Browse the MY STAR FOOD PRODUCTS range of spice powders, masalas and flour essentials. Enquire about pack sizes and shop supply.'},
  services: {title: 'Retail Shop Supply & Wholesale Enquiries', description: 'Stock your store with spices, masalas and flour products. Ask MY STAR FOOD PRODUCTS about retailer supply, availability, pack sizes and prices.'},
  contact: {title: 'Contact MY STAR | Mylakuzhy, Venjaramoodu', description: 'Contact MY STAR FOOD PRODUCTS at Mylakuzhy, Nellanad, Venjaramoodu, Thiruvananthapuram, Kerala 695607. Call +91 9207779771 or WhatsApp for retail supply.'},
};
export function metadataFor(title: string, description: string, path: string, image?: string): Metadata {
  const url = new URL(path, siteUrl()).href;
  return {title: title.includes(business.name) ? {absolute: title} : title, description, alternates: {canonical: url},
    openGraph: {title, description, url, siteName: business.name, locale: 'en_IN', type: 'website', images: image ? [{url: image}] : [{url: '/opengraph-image'}]},
    twitter: {card: 'summary_large_image', title, description, images: image ? [image] : ['/opengraph-image']},
  };
}
export function jsonLd(value: unknown) {return JSON.stringify(value).replace(/</g, '\\u003c');}
