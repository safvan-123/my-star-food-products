'use client';
import Image from 'next/image';
import {useState} from 'react';
import {PackageOpen} from 'lucide-react';
export function ProductPhoto({src,alt,sizes='50vw',priority=false}:{src?:string;alt:string;sizes?:string;priority?:boolean}){const [failed,setFailed]=useState(false);return src&&!failed?<Image src={src} alt={alt} fill sizes={sizes} priority={priority} onError={()=>setFailed(true)}/>:<div className="photo-fallback" role="img" aria-label={`${alt}: image unavailable`}><PackageOpen size={45} strokeWidth={1}/><span>Product image unavailable</span></div>;}
