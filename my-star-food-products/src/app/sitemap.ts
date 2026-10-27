import type {MetadataRoute} from 'next';
import {getProducts} from '@/sanity/data';
import {siteUrl} from '@/lib/seo';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const origin=siteUrl();const products=(await getProducts()).filter(product=>!product.demo);return [...['/','/about','/products','/services','/contact'].map(path=>({url:origin+path})),...products.map(product=>({url:origin+'/products/'+product.slug,lastModified:new Date(product._updatedAt)}))];}
