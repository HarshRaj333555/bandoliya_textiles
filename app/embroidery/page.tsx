import { BigCTA, PageHero, SectionHead, WhatsappButton } from "@/components/Primitives";
import PortfolioGallery from "@/components/PortfolioGallery";
import { makeMetadata } from "@/lib/site";
import { EmbroiderySignatureStory } from "@/components/PageSignatureStories";

export const metadata = makeMetadata(
  "Custom Machine Embroidery Services India",
  "Custom machine, garment and fabric embroidery development for fashion brands, manufacturers and B2B requirements in India.",
  "/embroidery",
  ["embroidery manufacturer India", "machine embroidery manufacturer", "garment embroidery India", "bulk embroidery services", "fabric embroidery manufacturer"],
);

const capabilities = ["Machine embroidery", "Computerized embroidery", "Garment embroidery", "Fabric embroidery", "Custom pattern embroidery", "Logo embroidery", "Floral embroidery", "Geometric embroidery", "Decorative embroidery", "Fashion embroidery"];
const development = ["Artwork / inspiration", "Design interpretation", "Stitch development", "Sampling", "Approval", "Bulk production"];

export default function EmbroideryPage() {
  return (
    <main id="main-content">
      <PageHero label="03 — Embroidery" title={<>Embroidery that turns<br />fabric into identity.</>} copy="Custom embroidery development where artwork, thread, stitch and application are considered as one complete textile surface." image="/images/burgundy-floral-embroidery.webp" path="/embroidery" imagePosition="center 42%" />
      <EmbroiderySignatureStory />

      <section className="capability-section section-space">
        <SectionHead label="Embroidery capabilities" title={<>A vocabulary<br />written in thread.</>} copy="Capability and suitability are confirmed against your artwork, fabric, application and production requirement." />
        <div className="capability-grid">{capabilities.map((item, index) => <article className="reveal" key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><p>Discuss design, base material, size, placement and intended use.</p></article>)}</div>
      </section>

      <section className="development-section section-space dark-section">
        <div className="development-sticky"><span className="eyebrow">Custom embroidery development</span><h2>From visual direction<br />to approved stitch.</h2><p>A disciplined sequence keeps creative intent and production requirements connected.</p><WhatsappButton campaign="embroidery" label="Discuss Your Design" location="embroidery_development" className="button button-light" /></div>
        <ol>{development.map((item, index) => <li className="reveal" key={item}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item}</h3><p>{["Send artwork, a garment image, fabric reference or visual mood.", "We discuss how the idea can translate into embroidery.", "Stitch, density, colour and size are developed around the application.", "A sample can be discussed according to project requirements.", "Feedback is incorporated before production is considered.", "Quantity, timeline, quality checks and dispatch are coordinated."][index]}</p></div><i /></li>)}</ol>
      </section>

      <section className="embroidery-applications section-space">
        <SectionHead label="Applications" title={<>Designed to belong<br />on the product.</>} />
        <div className="application-chips">{["Fashion garments", "Kurtis", "Sarees", "Blouses", "Dresses", "Jackets", "Bridal collections", "Designer collections", "Accessories", "Decorative textiles"].map((item) => <span className="reveal" key={item}>{item}</span>)}</div>
      </section>

      <section className="embroidery-gallery section-space">
        <SectionHead label="Embroidery gallery" title={<>Macro detail.<br />Full expression.</>} copy="Explore visual directions from botanical and ethnic motifs to contemporary custom work." />
        <PortfolioGallery />
      </section>

      <BigCTA title="Have an embroidery design in mind?" copy="Send your artwork, inspiration or garment reference directly through WhatsApp." campaign="embroidery" label="Send Your Design Reference" location="embroidery_final_cta" />
    </main>
  );
}
