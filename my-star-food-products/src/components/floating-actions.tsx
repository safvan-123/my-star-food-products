'use client';
import {useEffect,useState} from 'react';
import {ArrowUp,MessageCircle} from 'lucide-react';
import {whatsappUrl} from '@/lib/whatsapp';
export function FloatingActions(){const [scrolled,setScrolled]=useState(false);useEffect(()=>{const update=()=>setScrolled(window.scrollY>500);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);},[]);return <div className="floating-actions">{scrolled&&<button className="to-top" aria-label="Scroll to top" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}><ArrowUp size={20}/></button>}<a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp"><MessageCircle size={25}/></a></div>;}
