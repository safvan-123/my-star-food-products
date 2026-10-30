import type {Metadata,Viewport} from 'next';
import {siteUrl,indexable} from '@/lib/seo';
import './globals.css';
export const metadata:Metadata={
  metadataBase:new URL(siteUrl()),title:{default:'MY STAR FOOD PRODUCTS | Venjaramoodu, Kerala',template:'%s | MY STAR FOOD PRODUCTS'},
  description:'MY STAR FOOD PRODUCTS, Venjaramoodu, Kerala. Browse our product catalogue and enquire on WhatsApp.',
  robots:{index:indexable,follow:indexable}, verification:process.env.GOOGLE_SITE_VERIFICATION?{google:process.env.GOOGLE_SITE_VERIFICATION}:undefined,
  formatDetection:{telephone:false},
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#25008F'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body suppressHydrationWarning={true}>{children}</body></html>;}
