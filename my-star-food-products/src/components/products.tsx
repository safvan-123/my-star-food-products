import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import type {Product} from '@/types/product';
import {siteUrl} from '@/lib/seo';
import {productImage} from '@/sanity/image';
import {ProductPhoto} from './product-photo';
import {WhatsAppEnquiryButton} from './whatsapp-button';
import {Reveal} from './animations';
export function ProductCard({product,index=0}:{product:Product;index?:number}){return <Reveal delay={(index%3)*.08}><article className="product-card"><Link href={`/products/${product.slug}`} className="card-image" aria-label={`View ${product.name}`}><ProductPhoto src={productImage(product.mainImage,800)} alt={product.mainImage?.alt||product.name} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"/></Link><div className="card-content">{product.category&&<p className="eyebrow category">{product.category}</p>}<h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>{product.shortDescription&&<p className="card-description">{product.shortDescription}</p>}{product.weights?.length?<p className="card-weight">{product.weights.join(' · ')}</p>:null}<div className="card-actions"><Link className="button button-outline" href={`/products/${product.slug}`}>View Details<ArrowUpRight size={15}/></Link><WhatsAppEnquiryButton product={product} origin={siteUrl()}>Enquire</WhatsAppEnquiryButton></div></div></article></Reveal>;}
export function ProductGrid({products}:{products:Product[]}){return <div className="product-grid">{products.map((p,i)=><ProductCard product={p} index={i} key={p._id}/>)}</div>;}
