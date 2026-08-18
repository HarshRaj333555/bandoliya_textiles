import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, ArrowLink, BigCTA, SectionHead, WhatsappButton } from "@/components/Primitives";
import PortfolioGallery from "@/components/PortfolioGallery";
import { makeMetadata, SITE_URL, whatsappUrl } from "@/lib/site";

export const metadata = makeMetadata(
  "Textile & Embroidery Solutions in India",
  "Bandoliya Textiles develops textile, fabric and custom embroidery solutions for fashion brands, designers, garment manufacturers and B2B buyers in India.",
  "/",
  ["textile manufacturer India", "embroidery manufacturer India", "custom embroidery manufacturer", "textile supplier for clothing brands"],
);

const services = [
  { no: "01", title: "Textile & Fabric Solutions", copy: "Support for fashion, manufacturing and creative textile requirements, discussed around your application.", image: "/images/premium-floral-embroidery-india.webp", href: "/textiles" },
  { no: "02", title: "Machine Embroidery", copy: "Embroidery development for fabric, garments and design-led applications, from artwork to production.", image: "/images/machine-embroidery-process-india.webp", href: "/embroidery" },
  { no: "03", title: "Custom Development", copy: "A collaborative route from inspiration and stitch interpretation to sampling, approval and production.", image: "/images/textured-fashion-embroidery-detail.webp", href: "/b2b-textile-solutions" },
  { no: "04", title: "B2B & Bulk Production", copy: "Straightforward coordination for brands, manufacturers, exporters, boutiques and buying houses.", image: "/images/green-floral-embroidery.webp", href: "/b2b-textile-solutions" },
];

const process = ["Understand requirement", "Design & artwork discussion", "Material & technique selection", "Sampling", "Approval", "Production", "Quality inspection", "Dispatch"];
const strengths = [
  ["Customization", "Solutions developed around design, fabric and production requirements."],
  ["Quality Control", "Attention to stitching consistency, finishing and textile quality."],
  ["Production Capability", "A practical path for sampling and larger B2B requirements."],
  ["Industry Understanding", "Developed for the working realities of apparel and textile businesses."],
  ["Reliable Communication", "Clear coordination throughout development, sampling and production."],
  ["Made in India", "Textile craftsmanship backed by Indian manufacturing knowledge."],
];

export default function Home() {
  const pageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", name: "Bandoliya Textiles", url: SITE_URL, description: metadata.description, about: { "@id": `${SITE_URL}/#organization` } }, { "@type": "Service", name: "Textile and embroidery development", serviceType: "Custom textile, fabric and embroidery development", provider: { "@id": `${SITE_URL}/#organization` }, areaServed: { "@type": "Country", name: "India" } }] };
  return (
    <main id="main-content">
      <section className="hero home-hero">
        <Image className="hero-backdrop" src="/images/premium-floral-embroidery-india.webp" alt="Detailed floral embroidery by Bandoliya Textiles" fill loading="eager" fetchPriority="high" sizes="100vw" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-brand-lockup" aria-hidden="true"><span>BANDOLIYA</span><span>TEXTILES</span></div>
        <div className="hero-kicker">Textiles · Embroidery · India</div>
        <div className="hero-content">
          <h1><span>Crafting Textiles.</span><span>Creating Impressions.</span></h1>
          <p>Bandoliya Textiles combines textile expertise, embroidery craftsmanship and production capability for fashion brands, designers and garment businesses.</p>
          <div className="hero-actions">
            <Link className="button button-light magnetic" data-cursor="OPEN" href="/portfolio">Explore Our Work <ArrowIcon /></Link>
            <a className="text-link" data-event="whatsapp_click" data-location="home_hero" href={whatsappUrl("home")} target="_blank" rel="noreferrer">Discuss Your Requirement <ArrowIcon /></a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>Explore the collection</span><i /></div>
      </section>

      <section className="intro section-space">
        <div className="intro-index reveal"><span>01</span><i /><span>Introduction</span></div>
        <div className="intro-copy">
          <SectionHead label="01 — About" title={<>Where textile expertise<br />meets craftsmanship.</>} />
          <div className="intro-body reveal">
            <p>Bandoliya Textiles is an Indian textile and embroidery business focused on thoughtful development, quality-conscious production and dependable business relationships. We help translate fabric requirements, artwork and design references into solutions shaped for real-world fashion and manufacturing applications.</p>
            <ArrowLink href="/about-bandoliya-textiles">Discover our approach</ArrowLink>
          </div>
        </div>
        <div className="value-strip">
          {["Quality-focused production", "Custom embroidery solutions", "Textile expertise", "B2B & bulk requirements"].map((item, index) => <div className="reveal" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
        </div>
      </section>

      <section className="zoom-story" data-zoom-story>
        <div className="zoom-sticky">
          <div className="zoom-media"><Image className="zoom-story-image" src="/images/textured-fashion-embroidery-detail.webp" alt="Dimensional embroidery becoming visible through the word thread" fill sizes="100vw" /></div>
          <div className="zoom-story-shade" aria-hidden="true" />
          <div className="zoom-word" aria-hidden="true">THREAD</div>
          <div className="zoom-caption">
            <span className="eyebrow">Thread becomes surface</span>
            <h2>Look closer.<br />The detail becomes the design.</h2>
            <p>Every stitch changes how fabric catches light, holds form and carries identity.</p>
          </div>
          <div className="zoom-progress" aria-hidden="true"><span>01</span><i /><span>Detail</span></div>
        </div>
      </section>

      <section className="services-section section-space">
        <SectionHead label="02 — Capabilities" title={<>Built for fashion,<br />made for business.</>} copy="Focused textile and embroidery support from early exploration to approved production." />
        <div className="service-grid">
          {services.map((service) => (
            <Link className="service-card image-reveal" data-cursor="VIEW" href={service.href} key={service.title}>
              <Image src={service.image} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" />
              <div className="service-card-scrim" />
              <span>{service.no}</span><div><h3>{service.title}</h3><p>{service.copy}</p><i>Explore capability <ArrowIcon /></i></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="depth-story" data-depth-story>
        <div className="depth-sticky">
          <div className="depth-heading">
            <span className="eyebrow">03 — Textile studies</span>
            <h2>Craft you can<br />move through.</h2>
            <p>Each textile study comes forward in a considered sequence.</p>
          </div>
          <div className="depth-stage">
            {[
              ["/images/artisan-floral-embroidery.webp", "Botanical volume", "Layered floral threadwork"],
              ["/images/indian-peacock-embroidery.webp", "Indian expression", "Motif, colour and movement"],
              ["/images/custom-monogram-embroidery.webp", "Custom identity", "Artwork translated into stitch"],
              ["/images/contemporary-ocean-embroidery.webp", "Modern surface", "Dimensional textile storytelling"],
            ].map(([image, title, copy], index) => (
              <article className="depth-card" data-depth-card key={title}>
                <div className="depth-card-media"><Image src={image} alt={title} fill sizes="(max-width: 900px) 75vw, 34vw" /></div>
                <div><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
          <div className="depth-meter" aria-hidden="true"><i /></div>
        </div>
      </section>

      <section className="horizontal-section" data-horizontal-section>
        <div className="horizontal-sticky">
          <div className="horizontal-title"><span className="eyebrow">04 — Craftsmanship</span><h2>Every thread<br />has a purpose.</h2><p>Follow the details from artwork to finish.</p></div>
          <div className="horizontal-track" data-horizontal-track>
            {[
              ["/images/textured-fashion-embroidery-detail.webp", "Texture", "Depth built one stitch at a time."],
              ["/images/artisan-floral-embroidery.webp", "Colour", "Thread palettes shaped around the design."],
              ["/images/machine-embroidery-process-india.webp", "Precision", "Artwork translated into controlled stitchwork."],
              ["/images/indian-peacock-embroidery.webp", "Identity", "Motifs developed to give fabric a distinct voice."],
            ].map(([image, title, copy]) => <article className="craft-panel" key={title}><Image src={image} alt={`${title} in embroidery craftsmanship`} width={900} height={1150} sizes="(max-width: 900px) 70vw, 36vw" /><div><span>{title}</span><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="process-section section-space">
        <div className="process-visual image-reveal"><div className="process-image-media" data-parallax="10"><Image src="/images/machine-embroidery-process-india.webp" alt="Embroidery machine developing a colourful stitched motif" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><div><span>From reference</span><i /><span>to production</span></div></div>
        <div className="process-copy">
          <SectionHead label="05 — Process" title={<>A clear path from<br />idea to textile.</>} copy="Each project is discussed around its material, technique, application and production needs." />
          <ol className="process-list">{process.map((step, index) => <li className="reveal" key={step}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3><i /></li>)}</ol>
          <WhatsappButton campaign="b2b" label="Discuss Your Project" location="home_process" />
        </div>
      </section>

      <section className="strength-section section-space">
        <SectionHead label="06 — Why Bandoliya" title={<>The detail behind<br />dependable work.</>} />
        <div className="strength-grid">{strengths.map(([title, copy], index) => <article className="strength-card reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="partner-principles section-space">
        <SectionHead label="07 — Partnership principles" title={<>What good collaboration<br />should feel like.</>} copy="A trust-led working relationship is built through the process, not added at the end." />
        <div className="principle-quotes">
          {[
            ["01", "A clear brief should lead to a clear sample.", "Development clarity"],
            ["02", "Consistency matters as much as the first impression.", "Production thinking"],
            ["03", "Good work moves faster when communication stays direct.", "Business partnership"],
          ].map(([no, quote, label]) => <blockquote className="reveal" key={no}><span>{no}</span><p>“{quote}”</p><cite>{label}</cite></blockquote>)}
        </div>
      </section>

      <section className="industries-section">
        <span className="eyebrow">08 — Industries we serve</span>
        <div className="marquee" aria-label="Industries served"><div>{["Fashion Brands", "Ethnic Wear", "Bridal Wear", "Designer Labels", "Garment Manufacturers", "Export Houses", "Boutiques", "Textile Wholesalers"].concat(["Fashion Brands", "Ethnic Wear", "Bridal Wear", "Designer Labels"]).map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div></div>
      </section>

      <section className="portfolio-section section-space">
        <div className="portfolio-heading"><SectionHead label="09 — Selected work" title={<>A study in thread,<br />surface &amp; form.</>} /><ArrowLink href="/portfolio">View our portfolio</ArrowLink></div>
        <PortfolioGallery compact />
        <div className="portfolio-enquiry reveal"><div><span className="eyebrow">See a direction you like?</span><h3>Want something similar?</h3></div><WhatsappButton campaign="portfolio" label="Send a Reference" location="home_portfolio" /></div>
      </section>

      <BigCTA title="Have a textile or embroidery requirement?" copy="Share your fabric, artwork, design reference, required quantity or application with our team." campaign="home" location="home_final_cta" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
    </main>
  );
}
