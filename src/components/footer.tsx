import Link from 'next/link';
import {MapPin,Phone,Mail,ArrowUpRight} from 'lucide-react';
import {InstagramIcon} from './icons/instagram-icon';
import {business,navigation,mapsUrl} from '@/lib/business';
import {Brand} from './header';
export function Footer(){return <footer className="footer"><div className="container footer-grid">
  <div><Brand/><p className="footer-description">Spices, masalas and flour essentials for the shops that keep everyday cooking going. Based in Venjaramoodu, Kerala.</p><a className="footer-social" href={business.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit MY STAR on Instagram"><InstagramIcon size={18}/> Follow MY STAR</a></div>
  <div><h2>Explore</h2>{navigation.map(n=><Link key={n.href} href={n.href}>{n.label}</Link>)}</div>
  <div><h2>Talk to our team</h2><a href={`tel:${business.phone.replace(/\s+/g,'')}`}><Phone size={15}/>{business.phone}</a><a href={`tel:${business.secondaryPhone.replace(/\s+/g,'')}`}><Phone size={15}/>{business.secondaryPhone}</a><a href={`mailto:${business.email}`}><Mail size={15}/>{business.email}</a><a href={mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={15}/>Get directions<ArrowUpRight size={15}/></a><p>{business.address}</p></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span><span>Retail supply enquiries · Venjaramoodu, Kerala</span></div></footer>}
