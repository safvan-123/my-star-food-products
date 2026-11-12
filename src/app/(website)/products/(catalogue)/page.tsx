import Link from 'next/link';
import {metadataFor,pageSeo} from '@/lib/seo';
import {catalogue} from '@/sanity/data';
import {PageBanner,ContactCTA,EmptyProducts} from '@/components/shared';
import {ProductGrid} from '@/components/products';
import {Search} from 'lucide-react';
export const dynamic='force-dynamic';
export const metadata=metadataFor(pageSeo.products.title,pageSeo.products.description,'/products');
export default async function Products({searchParams}:{searchParams:Promise<{q?:string;category?:string}>}){
  const raw=await searchParams;const q=typeof raw.q==='string'?raw.q.trim():'';const category=typeof raw.category==='string'?raw.category:'';
  const {products,failed}=await catalogue();const categories=[...new Set(products.map(p=>p.category).filter((v):v is string=>!!v))].sort();
  const filtered=products.filter(p=>(!q||[p.name,p.category,p.shortDescription].some(s=>s?.toLocaleLowerCase().includes(q.toLocaleLowerCase())))&&(!category||p.category===category));
  return <><PageBanner eyebrow="PRODUCT CATALOGUE" title="Everyday products for your shop." description="Browse our spice powders, blended masalas and flour essentials. Ask us directly about retailer pricing, pack sizes and product availability."/><section className="section"><div className="container"><form method="get" action="/products" className="catalogue-filters"><div className="search-field"><Search size={20} aria-hidden="true"/><label className="sr-only" htmlFor="product-search">Search products</label><input id="product-search" name="q" type="search" placeholder="Search spices, masalas, flour…" defaultValue={q}/></div><label className="sr-only" htmlFor="category">Category</label><select name="category" id="category" defaultValue={category}><option value="">All categories</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select><button className="button button-indigo" type="submit">Find Products</button>{(q||category)&&<Link className="text-link" href="/products">Clear filters</Link>}</form><p className="results-count" role="status">Showing {filtered.length} {filtered.length===1?'product':'products'}{q?` matching “${q}”`:''}</p>{products.some(p=>p.demo)&&<div className="catalogue-notice">Illustrative preview catalogue — replace these example entries with confirmed MY STAR products in Sanity CMS before launching publicly. Pack sizes and packaging shown are not verified inventory.</div>}{!products.length?<EmptyProducts failed={failed}/>:filtered.length?<ProductGrid products={filtered}/>:<div className="empty-products"><h2>No matching products.</h2><p>Try another search or category, or ask our team for the latest range.</p><Link className="button button-outline" href="/products">Reset filters</Link></div>}</div></section><ContactCTA/></>;
}
