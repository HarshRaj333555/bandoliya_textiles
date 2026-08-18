import Link from "next/link";
import Image from "next/image";
import { whatsappUrl, type Campaign } from "@/lib/site";

export function ArrowIcon() {
  return <span className="action-mark" aria-hidden="true"><i /></span>;
}

export function WhatsAppMark({ className = "" }: { className?: string }) {
  return <Image className={`whatsapp-mark ${className}`} src="/whatsapp-logo.png" alt="" width={24} height={24} aria-hidden="true" />;
}

export function SectionHead({ label, title, copy, light = false }: { label: string; title: React.ReactNode; copy?: string; light?: boolean }) {
  return (
    <div className={`section-head reveal ${light ? "light" : ""}`}>
      <span className="eyebrow">{label}</span>
      <h2 className="word-reveal">{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function PageHero({ label, title, copy, image, path, imagePosition = "center" }: { label: string; title: React.ReactNode; copy: string; image: string; path: string; imagePosition?: string }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bandoliyatextiles.com/" },
      { "@type": "ListItem", position: 2, name: label.replace(/^\d+\s+—\s+/, ""), item: `https://www.bandoliyatextiles.com${path}` },
    ],
  };
  return (
    <section className="page-hero">
      <Image className="page-hero-image" src={image} alt="" fill loading="eager" fetchPriority="high" sizes="100vw" style={{ objectPosition: imagePosition }} />
      <div className="page-hero-overlay" />
      <div className="page-hero-brand" aria-hidden="true"><span>BANDOLIYA</span><span>TEXTILES</span></div>
      <div className="page-hero-content">
        <span className="eyebrow">{label}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </section>
  );
}

export function WhatsappButton({ campaign, label, location, className = "button button-dark" }: { campaign: Campaign; label: string; location: string; className?: string }) {
  return <a className={`${className} magnetic`} data-cursor="OPEN" data-event="whatsapp_click" data-location={location} href={whatsappUrl(campaign)} target="_blank" rel="noreferrer"><span>{label}</span><WhatsAppMark /></a>;
}

export function BigCTA({ title, copy, campaign, label = "Discuss It on WhatsApp", location }: { title: string; copy: string; campaign: Campaign; label?: string; location: string }) {
  return (
    <section className="big-cta">
      <div className="cta-orbit" aria-hidden="true" />
      <span className="eyebrow reveal">Start a conversation</span>
      <h2 className="reveal">{title}</h2>
      <p className="reveal">{copy}</p>
      <WhatsappButton campaign={campaign} label={label} location={location} className="button button-light" />
    </section>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="arrow-link" href={href}>{children}<ArrowIcon /></Link>;
}
