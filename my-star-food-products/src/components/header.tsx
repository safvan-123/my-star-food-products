'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import {business,navigation} from '@/lib/business';
import {whatsappUrl} from '@/lib/whatsapp';
export function Brand() {
  return <Link href="/" className="brand" aria-label={`${business.name} home`}>
    {business.logo?<Image src={business.logo} alt={business.name} width={48} height={48}/>:<span className="brand-rule" aria-hidden="true"/>}
    <span>MY STAR<span className="brand-small">FOOD PRODUCTS</span></span>
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
  return <header className="header"><div className="container nav-inner"><Brand/>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(n=><Link href={n.href} key={n.href} aria-current={(n.href==='/'?path==='/':path.startsWith(n.href))?'page':undefined}>{n.label}</Link>)}</nav>
    <a className="button button-green nav-cta" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp Enquiry <ArrowUpRight size={15}/></a>
    <button className="menu-toggle" ref={toggle} onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button>
  </div><div id="mobile-navigation" ref={panel} className={`mobile-panel ${open?'is-open':''}`} inert={!open}>
    <nav aria-label="Mobile navigation">{navigation.map(n=><Link key={n.href} href={n.href} aria-current={path===n.href?'page':undefined} onClick={()=>setOpen(false)}>{n.label}<ArrowUpRight size={16}/></Link>)}<a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp Enquiry<ArrowUpRight size={16}/></a></nav>
  </div></header>;
}
