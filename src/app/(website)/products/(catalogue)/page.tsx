import Link from 'next/link';
import {metadataFor, pageSeo} from '@/lib/seo';
import {catalogue, getCategories} from '@/sanity/data';
import {productCategoryKey, uniqueProductCategories} from '@/lib/product-categories';
import {PageBanner, ContactCTA, EmptyProducts} from '@/components/shared';
import {ProductGrid} from '@/components/products';
import {Search} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const metadata = metadataFor(pageSeo.products.title, pageSeo.products.description, '/products');

export default async function Products({searchParams}: {searchParams: Promise<{q?: string; category?: string}>}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q.trim() : '';
  const selectedSlug = typeof params.category === 'string' ? params.category : '';
  const [{products, failed}, categoryDocuments] = await Promise.all([catalogue(), getCategories()]);
  const categories = uniqueProductCategories(categoryDocuments);
  const selectedCategory = categories.find(category => category.slug === selectedSlug);
  const duplicateCategories = selectedCategory
    ? categoryDocuments.filter(category => productCategoryKey(category.name) === productCategoryKey(selectedCategory.name))
    : [];
  const filtered = products.filter(product => {
    const matchesSearch = !q || [product.name, product.category, product.shortDescription]
      .some(value => value?.toLocaleLowerCase().includes(q.toLocaleLowerCase()));
    const matchesCategory = !selectedCategory || duplicateCategories.some(category => category._id === product.categoryId)
      || productCategoryKey(product.category || '') === productCategoryKey(selectedCategory.name);
    return matchesSearch && matchesCategory;
  });
  const clearSearchHref = selectedCategory ? '/products?category=' + encodeURIComponent(selectedCategory.slug) : '/products';

  return <>
    <PageBanner eyebrow="PRODUCT CATALOGUE" title="Everyday products for your shop." description="Browse our spice powders, blended masalas and flour essentials. Ask us directly about retailer pricing, pack sizes and product availability."/>
    <section className="section"><div className="container">
      <form method="get" action="/products" className="catalogue-filters">
        <div className="search-field"><Search size={20} aria-hidden="true"/><label className="sr-only" htmlFor="product-search">Search products</label><input id="product-search" name="q" type="search" placeholder="Search spices, masalas, flour…" defaultValue={q}/></div>
        <label className="sr-only" htmlFor="category">Category</label>
        <select name="category" id="category" defaultValue={selectedCategory?.slug || ''}>
          <option value="">All categories</option>
          {categories.map(item => <option key={item._id} value={item.slug}>{item.name.trim().replace(/\s+/g, ' ')}</option>)}
        </select>
        <button className="button button-indigo" type="submit">Find Products</button>
        {q && <Link className="text-link" href={clearSearchHref}>Clear search</Link>}
        {(q || selectedCategory) && <Link className="text-link" href="/products">Reset filters</Link>}
      </form>
      <p className="results-count" role="status">Showing {filtered.length} {filtered.length === 1 ? 'product' : 'products'}{q ? ' matching “' + q + '”' : ''}</p>
      {products.some(product => product.demo) && <div className="catalogue-notice">Illustrative preview catalogue — replace these example entries with confirmed MY STAR products in Sanity CMS before launching publicly. Pack sizes and packaging shown are not verified inventory.</div>}
      {!products.length ? <EmptyProducts failed={failed}/> : filtered.length ? <ProductGrid products={filtered}/> : <div className="empty-products">
        <h2>{selectedCategory ? 'No products in ' + selectedCategory.name + ' match this search.' : 'No matching products.'}</h2>
        <p>{selectedCategory?.description || 'Try a different search or category, or clear the search to see more products.'}</p>
        <Link className="button button-outline" href={q && selectedCategory ? clearSearchHref : '/products'}>{q && selectedCategory ? 'Show all products in this category' : 'Clear search and filters'}</Link>
      </div>}
    </div></section>
    <ContactCTA/>
  </>;
}
