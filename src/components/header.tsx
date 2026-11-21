'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import {Menu,X,ArrowUpRight,MapPin} from 'lucide-react';
import {business,navigation} from '@/lib/business';
import {whatsappUrl} from '@/lib/whatsapp';
export function Brand() {
  return <Link href="/" className="brand" aria-label={`${business.name} home`}>
    <span className="brand-mark" style={{overflow:'hidden',background:'#342d7a'}}><Image src={business.logo} alt="" width={48} height={48} style={{width:'70%',height:'70%',objectFit:'contain'}}/></span>
    <span className="brand-wordmark">MY STAR<span className="brand-small">FOOD PRODUCTS</span></span>
  </Link>;
}
export function Header() {
  const path=usePathname();const [open,setOpen]=useState(false);const toggle=useRef<HTMLButtonElement>(null);const panel=useRef<HTMLDivElement>(null);
  useEffect(()=>{setOpen(false);},[path]);
  useEffect(()=>{
    if(!open)return;
    function keys(e:KeyboardEvent){
      if(e.key==='Escape'){setOpen(false);toggle.current?.focus();}
      if(e.key==='Tab'){
        const items=[toggle.current,...Array.from(panel.current?.querySelectorAll<HTMLElement>('a,button')||[])].filter(Boolean) as HTMLElement[];
        const first=items[0],last=items[items.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
      }
    }
    document.addEventListener('keydown',keys);
    return ()=>document.removeEventListener('keydown',keys);
  },[open]);
  return <>
    <div className="announcement"><div className="container announcement-inner"><span><MapPin size={13}/> Mylakuzhy, Venjaramoodu, Kerala</span><span>Spices • Masalas • Rice flour <i> / </i> Retail shop enquiries welcome</span></div></div>
    <header className="header"><div className="container nav-inner"><Brand/>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(n=><Link href={n.href} key={n.href} aria-current={(n.href==='/'?path==='/':path.startsWith(n.href))?'page':undefined}>{n.label}</Link>)}</nav>
      <a className="button button-green nav-cta" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Enquire for Supply <ArrowUpRight size={16}/></a>
      <button className="menu-toggle" ref={toggle} onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button>
    </div><div id="mobile-navigation" ref={panel} className={`mobile-panel ${open?'is-open':''}`} inert={!open}>
      <nav aria-label="Mobile navigation">{navigation.map(n=><Link key={n.href} href={n.href} aria-current={path===n.href?'page':undefined} onClick={()=>setOpen(false)}>{n.label}<ArrowUpRight size={16}/></Link>)}<a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Retail Supply Enquiry<ArrowUpRight size={16}/></a></nav>
    </div></header>
  </>;
}
