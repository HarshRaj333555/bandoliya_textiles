import { ArrowIcon, BigCTA, PageHero, SectionHead, WhatsappButton } from "@/components/Primitives";
import Image from "next/image";
import { makeMetadata } from "@/lib/site";
import { B2BSignatureStory } from "@/components/PageSignatureStories";

export const metadata = makeMetadata(
  "Custom B2B Textile & Embroidery Solutions",
  "From artwork and fabric references to sampling and bulk production discussions for fashion brands, manufacturers, exporters and private labels.",
  "/b2b-textile-solutions",
  ["custom textile manufacturer", "embroidery for fashion brands", "bulk embroidery services", "textile supplier for clothing brands"],
);

const sendItems = ["Artwork", "Inspiration image", "Fabric reference", "Existing embroidery sample", "Garment reference", "Pattern", "Technical specification"];
const workflow = ["Requirement", "Discussion", "Sampling", "Modification", "Approval", "Production", "Quality check", "Dispatch"];

export default function B2BPage() {
  return (
    <main id="main-content">
      <PageHero label="05 — B2B Solutions" title={<>From your idea<br />to textile production.</>} copy="A collaborative development path for fashion brands, designers, manufacturers, export houses, boutiques and private labels." image="/images/fashion-unicorn-embroidery.webp" path="/b2b-textile-solutions" imagePosition="center 44%" />
      <B2BSignatureStory />

      <section className="idea-section section-space">
        <SectionHead label="Start with what you have" title={<>You bring the idea.<br />We help develop it.</>} copy="A project can begin with a detailed specification or a single visual reference." />
        <div className="idea-grid">{sendItems.map((item, index) => <article className="reveal" key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><ArrowIcon /></article>)}</div>
      </section>

      <section className="reference-wall section-space">
        <SectionHead label="Reference to direction" title={<>Bring the visual.<br />Build the textile.</>} copy="Artwork, photographs and existing samples create a shared starting point for development." />
        <div className="reference-grid">
          {[
            ["/images/blue-botanical-embroidery.webp", "Blue botanical embroidery reference"],
            ["/images/custom-monogram-embroidery.webp", "Custom monogram embroidery reference"],
            ["/images/burgundy-floral-embroidery.webp", "Burgundy floral fashion embroidery"],
            ["/images/contemporary-ocean-embroidery.webp", "Contemporary dimensional textile reference"],
          ].map(([image, alt], index) => <figure className="image-reveal" key={image}><Image src={image} alt={alt} fill sizes="(max-width: 640px) 100vw, 25vw" /><span>0{index + 1}</span></figure>)}
        </div>
      </section>

      <section className="workflow-section section-space dark-section">
        <SectionHead label="Development workflow" title={<>One connected path.<br />Eight clear stages.</>} light />
        <ol>{workflow.map((item, index) => <li className="reveal" key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><i /></li>)}</ol>
      </section>

      <section className="sampling-section section-space">
        <figure className="image-reveal"><Image src="/images/machine-embroidery-process-india.webp" alt="Machine embroidery sample being developed" fill sizes="(max-width: 900px) 100vw, 50vw" /></figure>
        <div><span className="eyebrow">Sampling</span><h2 className="reveal">Make the decisions<br />before the run.</h2><p className="reveal">Sampling can be discussed according to artwork, technique, fabric, size and project requirements. It creates a practical point for review, modification and approval.</p><WhatsappButton campaign="b2b" label="Request a Sampling Discussion" location="b2b_sampling" /></div>
      </section>

      <section className="bulk-section section-space">
        <SectionHead label="Bulk orders" title={<>Serious production begins<br />with clear information.</>} />
        <div className="bulk-grid"><div className="reveal"><h3>What to share</h3><p>Artwork, application, fabric direction, dimensions, colour references, expected quantity and target timeline.</p></div><div className="reveal"><h3>What we discuss</h3><p>MOQ, pricing, sampling route, production suitability, quality checks and achievable production timelines.</p></div><div className="placeholder-card reveal"><span>Capacity &amp; lead time</span><p>Production fit, capacity and achievable lead time are confirmed against the final specification and quantity.</p></div></div>
      </section>

      <BigCTA title="Planning a collection or production run?" copy="Tell us what you are building and where you are in the development process." campaign="b2b" label="Talk to Our Textile Team" location="b2b_final_cta" />
    </main>
  );
}
