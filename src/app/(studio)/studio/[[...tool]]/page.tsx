import {sanityConfigured} from '@/sanity/env';
import StudioClient from '../StudioClient';
// Sanity Studio must initialize inside a request handler; prerendering it runs
// browser-oriented async work in the Worker global scope and fails on Cloudflare.
export const dynamic='force-dynamic';
export {metadata,viewport} from 'next-sanity/studio';
export default function StudioPage(){if(!sanityConfigured)return <div style={{padding:'3rem',fontFamily:'system-ui',maxWidth:720,margin:'auto'}}><h1>Connect your Sanity project</h1><p>The Products admin is ready to configure.</p><ol><li>Follow the Sanity account guide in README.md.</li><li>Add your project ID and dataset to .env.local.</li><li>Restart the development server, or rebuild and redeploy.</li><li>Add your website origin to Sanity CORS with credentials enabled.</li></ol><a href="/">Return to website</a></div>;return <StudioClient/>;}
