import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  Leaf,
  MapPin,
  Phone,
  Sparkles,
  QrCode,
  ShieldCheck,
  Mail,
} from 'lucide-react';
import {metadataFor, pageSeo} from '@/lib/seo';
import {business} from '@/lib/business';
import {content} from '@/lib/content';
import {catalogue} from '@/sanity/data';
import {WhatsAppEnquiryButton} from '@/components/whatsapp-button';
import {ProductGrid} from '@/components/products';
import {Reveal, FloatBox} from '@/components/animations';
import {
  AboutPreview,
  ContactCTA,
  EmptyProducts,
  SectionHeading,
  ServicesPreview,
  Values,
} from '@/components/shared';

export const dynamic = 'force-dynamic';
export const metadata = metadataFor(
  pageSeo.home.title,
  pageSeo.home.description,
  '/',
);

const marqueeItems = [
  '★ MY STAR FOOD PRODUCTS',
  '✦ MYLAKUZHY, VENJARAMOODU, KERALA',
  '★ TRADITIONAL KERALA SNACKS',
  '✦ PURE SPICES & MASALAS',
  '★ EVERYDAY KITCHEN ESSENTIALS',
  '✦ DIRECT WHATSAPP ENQUIRIES: 9207779771 / 9207779770',
  '★ LED BY DIRECTOR SUKU PEETHAMBARAN',
];

export default async function Home() {
  const {products, failed} = await catalogue(true);
  return (
    <div className="home-tricolor-canvas">
      {/* Ambient Animated Orbs for Top Blue, Middle Orange, Bottom Green */}
      <div className="tricolor-orb orb-blue" aria-hidden="true" />
      <div className="tricolor-orb orb-orange" aria-hidden="true" />
      <div className="tricolor-orb orb-green" aria-hidden="true" />

      <section className="hero hero-tricolor">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-secondary" aria-hidden="true" />
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <div className="hero-badge-pill">
              <Sparkles size={14} />
              <span>MYLAKUZHY · VENJARAMOODU · KERALA</span>
            </div>
            <h1>
              Food products
              <br />
              made with <em>care,</em>
              <br />
              from Kerala.
            </h1>
            <p className="hero-description">{content.heroDescription}</p>
            <div className="button-row">
              <Link href="/products" className="button button-gold">
                Explore Products
                <ArrowUpRight size={18} />
              </Link>
              <WhatsAppEnquiryButton>Contact on WhatsApp</WhatsAppEnquiryButton>
            </div>

            <div className="hero-quick-meta">
              <div>
                <ShieldCheck size={16} />
                <span>Director: {business.director}</span>
              </div>
              <div>
                <Phone size={16} />
                <a href="tel:+919207779771">9207779771</a>
                <span>/</span>
                <a href="tel:+919207779770">9207779770</a>
              </div>
              <div>
                <Mail size={16} />
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </div>
            </div>

            <a href="#products" className="discover-link">
              <span>
                <ArrowDown size={17} />
              </span>
              Discover MY STAR
            </a>
          </Reveal>

          <Reveal className="hero-art" delay={0.15}>
            <FloatBox>
              <div className="arch-frame">
                {business.heroImage ? (
                  <Image
                    src={business.heroImage}
                    alt="Illustrated sample food product collection"
                    fill
                    priority
                    sizes="(max-width: 760px) 90vw, 45vw"
                  />
                ) : (
                  <>
                    <img
                      src="/images/botanical.svg"
                      alt=""
                      className="botanical"
                    />
                    <div className="visual-placeholder">
                      <Leaf size={32} strokeWidth={1} />
                      <span>MY STAR</span>
                      <small>FOOD PRODUCTS</small>
                      <p>
                        Traditional favourites.
                        <br />
                        Everyday essentials.
                      </p>
                    </div>
                  </>
                )}
                <span className="arch-corner" aria-hidden="true">
                  ✦
                </span>
              </div>
            </FloatBox>
            <div className="hero-caption">
              <span>ROOTED IN KERALA</span>
              <span>
                A conversation away <ArrowUpRight size={14} />
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Animated Marquee Ticker */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Middle Orange Zone — Products & Brand Story */}
      <section className="section tricolor-section" id="products">
        <div className="container">
          <SectionHeading
            eyebrow="EXPLORE THE COLLECTION"
            title="Our Products"
            href="/products"
            label="View All Products"
          />
          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <EmptyProducts failed={failed} />
          )}
        </div>
      </section>

      <AboutPreview />

      {/* Client Business Card Highlight Strip */}
      <section className="section tricolor-section">
        <div className="container">
          <Reveal>
            <div className="visiting-card-showcase">
              <div className="vc-brand">
                <img
                  src="/images/logo-crest.svg"
                  alt="MY STAR Crest"
                  width={84}
                  height={84}
                />
                <div>
                  <p className="eyebrow light">OFFICIAL BUSINESS CONNECT</p>
                  <h2>{business.name}</h2>
                  <p className="vc-director">
                    Director: <strong>{business.director}</strong> ·{' '}
                    <MapPin size={14} style={{display: 'inline'}} />{' '}
                    {business.shortAddress}
                  </p>
                  <p className="vc-director" style={{marginTop: '4px'}}>
                    Email: <a href={`mailto:${business.email}`} style={{textDecoration: 'underline'}}>{business.email}</a> · Instagram: @{business.instagramHandle}
                  </p>
                </div>
              </div>
              <div className="vc-actions">
                <div className="vc-buttons">
                  <a
                    href="https://wa.me/919207779771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-green"
                  >
                    WhatsApp: 9207779771 <ArrowUpRight size={15} />
                  </a>
                  <a
                    href="https://wa.me/919207779770"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-gold"
                  >
                    <QrCode size={16} /> WhatsApp: 9207779770
                  </a>
                </div>
                {business.qrCodeImage && (
                  <a
                    href="https://wa.me/919207779770"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vc-qr-box"
                    title="Scan or click to chat on WhatsApp (9207779770)"
                  >
                    <img
                      src={business.qrCodeImage}
                      alt="WhatsApp QR Code for MY STAR FOOD PRODUCTS"
                      width={88}
                      height={88}
                    />
                    <span>SCAN TO CHAT</span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bottom Green Zone — Values, Services & Enquiry CTA */}
      <Values />
      <ServicesPreview />
      <ContactCTA />
    </div>
  );
}
