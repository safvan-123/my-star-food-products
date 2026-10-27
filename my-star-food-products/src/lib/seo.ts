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
  home: {title: 'MY STAR FOOD PRODUCTS | Venjaramoodu, Kerala', description: 'Explore MY STAR FOOD PRODUCTS in Venjaramoodu, Thiruvananthapuram, Kerala. Browse product information and enquire directly on WhatsApp.'},
  about: {title: 'About Us', description: 'Learn about MY STAR FOOD PRODUCTS, based in Mylakuzhy, Venjaramoodu, Thiruvananthapuram, Kerala, led by director Suku Peethambaran.'},
  products: {title: 'Food Products Catalogue', description: 'Browse the published MY STAR FOOD PRODUCTS catalogue. View product details, available package sizes and enquire with our Kerala team on WhatsApp.'},
  services: {title: 'Services & Business Enquiries', description: 'Contact MY STAR FOOD PRODUCTS in Venjaramoodu, Kerala to discuss your requirements and confirm available services.'},
  contact: {title: 'Contact Us | Venjaramoodu, Kerala', description: 'Contact MY STAR FOOD PRODUCTS in Mylakuzhy, Venjaramoodu, Thiruvananthapuram. Call +91 9207779771 or send a product enquiry on WhatsApp.'},
};
export function metadataFor(title: string, description: string, path: string, image?: string): Metadata {
  const url = new URL(path, siteUrl()).href;
  return {title: title.includes(business.name) ? {absolute: title} : title, description, alternates: {canonical: url},
    openGraph: {title, description, url, siteName: business.name, locale: 'en_IN', type: 'website', images: image ? [{url: image}] : [{url: '/opengraph-image'}]},
    twitter: {card: 'summary_large_image', title, description, images: image ? [image] : ['/opengraph-image']},
  };
}
export function jsonLd(value: unknown) {return JSON.stringify(value).replace(/</g, '\\u003c');}
