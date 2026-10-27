import 'server-only';
import {cache} from 'react';
import type {QueryParams} from 'next-sanity';
import {client} from './client';
import {demoProducts} from '@/lib/demo-products';
import {useDemoProducts} from '@/lib/product-source';
import {productsQuery, featuredQuery, productQuery, relatedQuery} from './queries';
import type {Product} from '@/types/product';
async function query<T>(groq: string, params: QueryParams, fallback: T): Promise<T> {
  if (!client) return fallback;
  // Fresh SSR: no ISR stale window, no webhook secret, no build-time slug restriction.
  return client.fetch<T>(groq, params, {cache: 'no-store', perspective: 'published'});
}
export const getProducts = cache(() => useDemoProducts() ? Promise.resolve(demoProducts) : query<Product[]>(productsQuery, {}, []));
export const getFeatured = cache(() => useDemoProducts() ? Promise.resolve(demoProducts.filter(p=>p.featured).slice(0,6)) : query<Product[]>(featuredQuery, {}, []));
export const getProduct = cache((slug:string) => useDemoProducts() ? Promise.resolve(demoProducts.find(p=>p.slug===slug) || null) : query<Product|null>(productQuery, {slug}, null));
export const getRelated = cache((id:string, category:string) => useDemoProducts() ? Promise.resolve(demoProducts.filter(p=>p._id!==id && p.category===category).slice(0,3)) : query<Product[]>(relatedQuery, {id, category}, []));
export async function catalogue(featured=false) {
  try {return {products: await (featured ? getFeatured() : getProducts()), failed: false};}
  catch (error) {console.error('Unable to load published catalogue:', error instanceof Error ? error.message : 'Unknown error'); return {products: [], failed: true};}
}
