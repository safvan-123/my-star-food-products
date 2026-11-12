import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {FloatingActions} from '@/components/floating-actions';
import {AnimationProvider,PageEntrance} from '@/components/animations';
import {business,mapCoordinates,mapsUrl} from '@/lib/business';
import {jsonLd,siteUrl} from '@/lib/seo';
export default function WebsiteLayout({children}:{children:React.ReactNode}){
 const data={'@context':'https://schema.org','@graph':[
 {'@type':'Organization','@id':siteUrl()+'/#organization',name:business.name,url:siteUrl(),telephone:business.phone,email:business.email,address:{'@type':'PostalAddress',streetAddress:'Mylakuzhy, Nellanad',addressLocality:'Venjaramoodu, Thiruvananthapuram',addressRegion:'Kerala',postalCode:'695607',addressCountry:'IN'},geo:{'@type':'GeoCoordinates',latitude:mapCoordinates.latitude,longitude:mapCoordinates.longitude},hasMap:mapsUrl,...(business.logo?{logo:new URL(business.logo,siteUrl()).href}:{}),sameAs:[business.socials.instagram]},
 {'@type':'WebSite','@id':siteUrl()+'/#website',name:business.name,url:siteUrl(),publisher:{'@id':siteUrl()+'/#organization'}}]};
 return <div className="site"><AnimationProvider><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main" tabIndex={-1}><PageEntrance>{children}</PageEntrance></main><Footer/><FloatingActions/></AnimationProvider><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(data)}}/></div>;
}
