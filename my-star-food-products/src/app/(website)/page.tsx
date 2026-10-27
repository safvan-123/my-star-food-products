import Link from 'next/link';
import Image from 'next/image';
import {ArrowDown,ArrowUpRight,Leaf} from 'lucide-react';
import {metadataFor,pageSeo} from '@/lib/seo';
import {business} from '@/lib/business';
import {content} from '@/lib/content';
import {catalogue} from '@/sanity/data';
import {WhatsAppEnquiryButton} from '@/components/whatsapp-button';
import {ProductGrid} from '@/components/products';
import {Reveal} from '@/components/animations';
import {AboutPreview,ContactCTA,EmptyProducts,SectionHeading,ServicesPreview,Values} from '@/components/shared';
export const dynamic='force-dynamic';
export const metadata=metadataFor(pageSeo.home.title,pageSeo.home.description,'/');
export default async function Home(){const {products,failed}=await catalogue(true);return <>
<section className="hero"><div className="hero-orbit" aria-hidden="true"/><div className="container hero-grid"><Reveal className="hero-copy"><p className="eyebrow light">VENJARAMOODU, KERALA <span className="label-rule"/></p><h1>Food products<br/>made with <em>care,</em><br/>from Kerala.</h1><p className="hero-description">{content.heroDescription}</p><div className="button-row"><Link href="/products" className="button button-gold">Explore Products<ArrowUpRight size={18}/></Link><WhatsAppEnquiryButton>Contact on WhatsApp</WhatsAppEnquiryButton></div><a href="#products" className="discover-link"><span><ArrowDown size={17}/></span>Discover MY STAR</a></Reveal><Reveal className="hero-art" delay={.15}><div className="arch-frame">{business.heroImage?<Image src={business.heroImage} alt="Illustrated sample food product collection" fill priority sizes="(max-width: 760px) 90vw, 45vw"/>:<><img src="/images/botanical.svg" alt="" className="botanical"/><div className="visual-placeholder"><Leaf size={32} strokeWidth={1}/><span>MY STAR</span><small>FOOD PRODUCTS</small><p>Traditional favourites.<br/>Everyday essentials.</p></div></>}<span className="arch-corner" aria-hidden="true">✦</span></div><div className="hero-caption"><span>ROOTED IN KERALA</span><span>A conversation away <ArrowUpRight size={14}/></span></div></Reveal></div></section>
<section className="section" id="products"><div className="container"><SectionHeading eyebrow="EXPLORE THE COLLECTION" title="Our Products" href="/products" label="View All Products"/>{products.length?<ProductGrid products={products}/>:<EmptyProducts failed={failed}/>}</div></section>
<AboutPreview/><Values/><ServicesPreview/><ContactCTA/>
</>;}
