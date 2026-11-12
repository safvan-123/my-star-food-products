'use client';
import {useState} from 'react';
import {ArrowUpRight,MessageCircle} from 'lucide-react';
import {retailerEnquiry} from '@/lib/whatsapp';
const categories = ['Spice powders','Masala blends','Rice flour & essentials'];
export function RetailerEnquiry({compact=false}:{compact?:boolean}) {
  const [shop,setShop]=useState('');
  const [name,setName]=useState('');
  const [area,setArea]=useState('');
  const [interests,setInterests]=useState<string[]>([]);
  const [notes,setNotes]=useState('');
  const href=retailerEnquiry({shop,name,area,interests,notes});
  return <div className={`retailer-enquiry ${compact?'compact':''}`}>
    <div className="enquiry-form-top"><span className="eyebrow">SHOP OWNER? LET'S CONNECT</span><h3>Tell us what your store needs.</h3><p>Share a few details and open a ready-to-send WhatsApp enquiry. No account needed.</p></div>
    <div className="enquiry-fields">
      <label>Shop name<input value={shop} onChange={e=>setShop(e.target.value)} maxLength={90} placeholder="Your shop / business" autoComplete="organization"/></label>
      <label>Your name<input value={name} onChange={e=>setName(e.target.value)} maxLength={70} placeholder="Contact person" autoComplete="name"/></label>
      <label className="form-full">Shop location<input value={area} onChange={e=>setArea(e.target.value)} maxLength={110} placeholder="Town / area / pincode" autoComplete="address-level2"/></label>
      <fieldset className="form-full interest-options"><legend>Interested in</legend><div>{categories.map(c=><label key={c}><input type="checkbox" checked={interests.includes(c)} onChange={e=>setInterests(v=>e.target.checked?[...v,c]:v.filter(item=>item!==c))}/><span>{c}</span></label>)}</div></fieldset>
      <label className="form-full">Additional details (optional)<textarea value={notes} onChange={e=>setNotes(e.target.value)} maxLength={450} rows={3} placeholder="Products, approximate quantities or delivery questions"/></label>
    </div>
    <a className="button button-green enquiry-submit" href={href} target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/>Continue on WhatsApp<ArrowUpRight size={18}/></a>
    <small>WhatsApp opens with your message filled in. Review it and press Send to contact our team. Availability, prices and delivery must be confirmed.</small>
  </div>;
}
