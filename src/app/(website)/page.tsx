import Link from 'next/link';
import Image from 'next/image';
import {ArrowDown,ArrowUpRight,Check,MapPin,Store,Truck,MessageCircle,PackageCheck,Phone} from 'lucide-react';
import {metadataFor,pageSeo} from '@/lib/seo';
import {business,mapsUrl} from '@/lib/business';
import {content,categoryHighlights} from '@/lib/content';
import {catalogue} from '@/sanity/data';
import {WhatsAppEnquiryButton} from '@/components/whatsapp-button';
import {ProductGrid} from '@/components/products';
import {Reveal} from '@/components/animations';
import {AboutPreview,ContactCTA,EmptyProducts,SectionHeading,ServicesPreview,Values} from '@/components/shared';
import {RetailerEnquiry} from '@/components/retailer-enquiry';

export const dynamic='force-dynamic';
export const metadata=metadataFor(pageSeo.home.title,pageSeo.home.description,'/');
const process=[
 {num:'01',title:'Explore the range',description:'Browse spices, blended masalas and flour essentials to see what may suit your customers.'},
 {num:'02',title:'Share your shop’s needs',description:'Tell us your location, product interests and approximate requirements by WhatsApp or phone.'},
 {num:'03',title:'Confirm with our team',description:'Discuss current stock, pack sizes, prices and supply arrangements before ordering.'},
];
export default async function Home(){
 const {products,failed}=await catalogue();
 return <>
 <section className="hero home-hero-tricolor" aria-labelledby="home-heading"><div className="hero-texture" aria-hidden="true"/><div className="container hero-grid">
  <Reveal className="hero-copy"><span className="hero-kicker"><span className="kicker-dot"/>{content.heroEyebrow}</span>
   <h1 id="home-heading">Spices for every kitchen.<br/><em>Supply for every shelf.</em></h1>
   <p className="hero-description">{content.heroDescription}</p>
   <div className="button-row hero-actions"><Link href="/products" className="button button-gold">Explore Product Range <ArrowUpRight size={18}/></Link><WhatsAppEnquiryButton className="button-outline-light">Enquire for Shop Supply</WhatsAppEnquiryButton></div>
   <div className="hero-trust"><span><Check size={17}/> Spices & masalas</span><span><Check size={17}/> Rice flour essentials</span><span><Check size={17}/> Direct shop enquiries</span></div>
   <a href="#categories" className="discover-link"><ArrowDown size={16}/> Discover our range</a>
  </Reveal>
  <Reveal className="hero-art" delay={.1}><div className="hero-showcase"><div className="showcase-ring ring-1"/><div className="showcase-ring ring-2"/><div className="hero-floating-label label-top"><span>✳</span><strong>Everyday<br/>essentials</strong></div><div className="hero-product-display"><Image src="/images/demo/rice-flour.svg" alt="Illustrative rice flour product packaging" width={280} height={320} priority sizes="(max-width: 640px) 42vw, 260px" className="hero-pouch pouch-rice"/><Image src="/images/demo/chilli-powder.svg" alt="Illustrative chilli powder product packaging" width={270} height={310} priority sizes="(max-width: 640px) 40vw, 260px" className="hero-pouch pouch-chilli"/><Image src="/images/demo/turmeric-powder.svg" alt="Illustrative turmeric powder product packaging" width={250} height={300} priority sizes="(max-width: 640px) 38vw, 250px" className="hero-pouch pouch-turmeric"/></div><div className="hero-floating-label label-bottom"><Store size={22}/><strong>For your<br/>store shelves</strong></div></div><p className="hero-art-note">Product pack visuals are illustrative • Actual products and packaging to be confirmed</p></Reveal>
 </div><span className="hero-side-label" aria-hidden="true">MY STAR FOOD PRODUCTS / KERALA</span></section>
 <div className="promise-strip"><div className="container promise-inner"><span><Store size={19}/> Retail shop enquiries</span><span><PackageCheck size={19}/> Everyday food essentials</span><span><MapPin size={19}/> Venjaramoodu, Kerala</span><span><MessageCircle size={19}/> Direct WhatsApp assistance</span></div></div>
 <section id="categories" className="section category-section"><div className="container"><SectionHeading eyebrow="WHAT WE FOCUS ON" title="A range built around daily demand." href="/products" label="Browse all products"/><p className="section-intro">From the spices that make a curry to the flour behind a traditional breakfast — explore the categories at the heart of MY STAR.</p><div className="category-grid">{categoryHighlights.map((category,i)=><Reveal key={category.title} delay={i*.1}><Link className={`category-tile ${category.tint}`} href={category.href}><div className="category-top"><span className="eyebrow">0{i+1} / CORE CATEGORY</span><ArrowUpRight size={22}/></div><div className="category-image"><Image src={category.image} alt={`${category.title} product packaging illustration`} width={210} height={230} sizes="(max-width: 700px) 45vw, 210px"/></div><div className="category-bottom"><span>{category.subtitle}</span><h3>{category.title}</h3><p>{category.description}</p><span className="category-link">Explore category <ArrowUpRight size={15}/></span></div></Link></Reveal>)}</div></div></section>
 <section className="section featured-section" id="products"><div className="container"><SectionHeading eyebrow="EXPLORE OUR PRODUCTS" title="The everyday line-up." href="/products" label="Full product range"/><p className="section-intro">Explore individual products and reach out for shop supply details, current availability and packaging options.</p>{products.length?<><ProductGrid products={products}/>{products.some(p=>p.demo)&&<p className="catalogue-disclaimer">Preview catalogue: product images, listed varieties and pack sizes are illustrative until the business confirms the final inventory.</p>}</>:<EmptyProducts failed={failed}/>}</div></section>
 <section className="section supply-section"><div className="container supply-layout"><Reveal><div className="supply-intro"><p className="eyebrow light">BUILT FOR THE RETAIL COUNTER</p><h2>Your shop. Your customers.<br/><em>Our conversation starts here.</em></h2><p>We focus on making it easy for a shop owner to explore the range and ask the right questions. No complicated checkout — enquire directly with the MY STAR team.</p><div className="supply-badges"><span><Store size={16}/> Grocery & provision shops</span><span><PackageCheck size={16}/> Product enquiries</span><span><Truck size={16}/> Supply terms on request</span></div><Link href="/services" className="button button-outline-light">How retail supply works <ArrowUpRight size={17}/></Link></div></Reveal><Reveal delay={.12}><div className="process-panel"><p className="eyebrow">3 SIMPLE STEPS</p>{process.map(item=><div key={item.num} className="process-row"><span>{item.num}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div></Reveal></div></section>
 <AboutPreview/>
 <ServicesPreview/>
 <Values/>
 <section className="section enquiry-section" id="enquiry"><div className="container enquiry-layout"><Reveal><p className="eyebrow">START A RETAIL PARTNERSHIP</p><h2>Let’s put the right products <em>on your shelves.</em></h2><p>Looking to stock spices, masalas or rice flour? Tell us a little about your shop and continue directly on WhatsApp. Our team can confirm which products and supply options are available.</p><div className="enquiry-contact"><Phone size={19}/><a href={`tel:${business.phone.replace(/\s+/g,'')}`}>{business.phone}</a></div><div className="enquiry-contact"><MapPin size={19}/><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{business.shortAddress}, Kerala <ArrowUpRight size={16}/></a></div></Reveal><Reveal delay={.1}><RetailerEnquiry/></Reveal></div></section>
 <ContactCTA/>
 </>;
}
