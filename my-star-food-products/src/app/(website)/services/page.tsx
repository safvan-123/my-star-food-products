import {metadataFor,pageSeo} from '@/lib/seo';
import {PageBanner,ServicesPreview,ContactCTA} from '@/components/shared';
export const metadata=metadataFor(pageSeo.services.title,pageSeo.services.description,'/services');
export default function Services(){return <><PageBanner eyebrow="SERVICES & ENQUIRIES" title="Let’s find the right connection." description="Discover everyday food essentials, explore retail and bulk options, and get friendly product assistance from our Kerala team."/><ServicesPreview full/><ContactCTA/></>;}
