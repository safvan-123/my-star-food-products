'use client';
import {useState} from 'react';
import {Check,MessageCircle} from 'lucide-react';
import type {Product} from '@/types/product';
import {productImage} from '@/sanity/image';
import {ProductPhoto} from './product-photo';
import {WhatsAppEnquiryButton} from './whatsapp-button';
export function ProductDetails({product,origin}:{product:Product;origin:string}){
  const images=[product.mainImage,...(product.images||[])].filter(Boolean);
  const [selected,setSelected]=useState(0);const [weight,setWeight]=useState(product.weights?.[0]||'');
  const current=images[selected];
  return <div className="detail-grid"><div><div className="detail-main"><ProductPhoto key={selected} src={productImage(current,1400)} alt={current?.alt||product.name} priority sizes="(max-width: 760px) 100vw, 50vw"/></div>{images.length>1&&<div className="thumbnails" aria-label="Product gallery">{images.map((img,i)=><button key={img?._key||i} onClick={()=>setSelected(i)} aria-label={`Show product image ${i+1}`} aria-pressed={selected===i} className={selected===i?'selected':''}><ProductPhoto src={productImage(img,200)} alt={img?.alt||`${product.name}, image ${i+1}`} sizes="80px"/></button>)}</div>}</div>
  <div className="detail-content">{product.category&&<p className="eyebrow category">{product.category}</p>}<h1>{product.name}</h1><div className="gold-line"/>{(product.fullDescription||product.shortDescription)&&<p className="body-copy preserve-lines">{product.fullDescription||product.shortDescription}</p>}
  {!!product.weights?.length&&<fieldset className="weight-picker"><legend>Package size</legend><div className="weight-options">{product.weights.map(w=><button type="button" key={w} className={weight===w?'selected':''} aria-pressed={weight===w} onClick={()=>setWeight(w)}>{w}{weight===w&&<Check size={13}/>}</button>)}</div></fieldset>}
  <dl className="product-specs">{product.ingredients&&<div><dt>Ingredients</dt><dd className="preserve-lines">{product.ingredients}</dd></div>}{product.packagingDetails&&<div><dt>Packaging</dt><dd className="preserve-lines">{product.packagingDetails}</dd></div>}{typeof product.price==='number'&&<div><dt>Price</dt><dd>{new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(product.price)}</dd></div>}</dl>
  <WhatsAppEnquiryButton product={product} origin={origin} weight={weight||undefined}/><p className="whatsapp-note"><MessageCircle size={13}/>Opens WhatsApp with a ready message. Press Send to submit.</p></div></div>;
}
