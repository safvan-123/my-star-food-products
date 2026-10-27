import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ChevronRight} from 'lucide-react';
import {getProduct,getRelated} from '@/sanity/data';
import {productImage} from '@/sanity/image';
import {metadataFor,siteUrl,jsonLd} from '@/lib/seo';
import {business} from '@/lib/business';
import {ProductDetails} from '@/components/product-details';
import {ProductGrid} from '@/components/products';
import {SectionHeading,ContactCTA} from '@/components/shared';
export const dynamic='force-dynamic';
export const dynamicParams=true;
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const product=await getProduct(slug);if(!product)return {title:'Product not found',robots:{index:false,follow:false}};return metadataFor(product.seoTitle||product.name,product.seoDescription||product.shortDescription||`Explore ${product.name} from MY STAR FOOD PRODUCTS. Contact our team in Venjaramoodu, Kerala for details and availability.`,`/products/${product.slug}`,productImage(product.mainImage,1200));}
export default async function ProductPage({params}:Props){const {slug}=await params;const product=await getProduct(slug);if(!product)notFound();const related=product.category?await getRelated(product._id,product.category):[];const origin=siteUrl();const image=productImage(product.mainImage,1200);const data={'@context':'https://schema.org','@graph':[
 ...(!product.demo ? [{'@type':'Product',name:product.name,url:`${origin}/products/${product.slug}`,description:product.fullDescription||product.shortDescription,...(image?{image:[image]}:{}),brand:{'@type':'Brand',name:business.name},...(product.category?{category:product.category}:{})}] : []),
 {'@type':'BreadcrumbList',itemListElement:[{name:'Home',item:origin},{name:'Products',item:origin+'/products'},{name:product.name,item:origin+'/products/'+product.slug}].map((item,i)=>({'@type':'ListItem',position:i+1,...item}))}
 ]};return <><section className="section detail-section"><div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={12}/><Link href="/products">Products</Link><ChevronRight size={12}/><span aria-current="page">{product.name}</span></nav><ProductDetails product={product} origin={origin}/><Link href="/products" className="text-link back-link"><ArrowLeft size={16}/>Back to Products</Link></div></section>{related.length>0&&<section className="section white"><div className="container"><SectionHeading eyebrow="KEEP EXPLORING" title="You might also like"/><ProductGrid products={related}/></div></section>}<ContactCTA/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(data)}}/></>;}
