import type {ReactNode} from 'react';
import {MessageCircle,ArrowUpRight} from 'lucide-react';
import {whatsappUrl,productEnquiry} from '@/lib/whatsapp';
import type {Product} from '@/types/product';
export function WhatsAppEnquiryButton({product,origin,weight,children='Enquire on WhatsApp',className=''}:{product?:Pick<Product,'name'|'slug'|'category'>;origin?:string;weight?:string;children?:ReactNode;className?:string}) {
  const href=product&&origin?productEnquiry(product,origin,weight):whatsappUrl();
  return <a className={`button button-green ${className}`} href={href} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true"/>{children}<ArrowUpRight size={16} aria-hidden="true"/></a>;
}
