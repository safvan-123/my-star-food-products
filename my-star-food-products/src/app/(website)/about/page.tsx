import {metadataFor,pageSeo} from '@/lib/seo';
import {content} from '@/lib/content';
import {business} from '@/lib/business';
import {PageBanner,AboutPreview,Values,ContactCTA} from '@/components/shared';
import {Reveal} from '@/components/animations';
export const metadata=metadataFor(pageSeo.about.title,pageSeo.about.description,'/about');
export default function About(){return <><PageBanner eyebrow="OUR STORY" title="A local name, a warm welcome." description={content.introduction}/><AboutPreview/><section className="section"><div className="container three-grid"><Reveal><article className="editorial-card"><p className="eyebrow">OUR DIRECTION</p><h2>Mission</h2><p>{content.mission}</p></article></Reveal><Reveal delay={.08}><article className="editorial-card"><p className="eyebrow">LOOKING AHEAD</p><h2>Vision</h2><p>{content.vision}</p></article></Reveal><Reveal delay={.16}><article className="editorial-card director"><p className="eyebrow">MEET THE DIRECTOR</p><h2>{business.director}</h2><p>Director · {business.name}</p><p>Based in Venjaramoodu, Kerala.</p></article></Reveal></div></section><Values/><ContactCTA/></>;}
