import { ArrowIcon, BigCTA, PageHero, SectionHead, WhatsappButton } from "@/components/Primitives";
import Image from "next/image";
import { makeMetadata } from "@/lib/site";
import { TextileSignatureStory } from "@/components/PageSignatureStories";

export const metadata = makeMetadata(
  "Textile & Fabric Supplier for Fashion Businesses India",
  "Explore textile and fabric sourcing, sampling and custom requirement support for fashion brands, manufacturers and B2B buyers in India.",
  "/textiles",
  ["textile supplier India", "fabric supplier India", "fashion fabric supplier India", "textile sourcing India"],
);

const categories = ["Cotton fabrics", "Polyester fabrics", "Blended fabrics", "Fashion fabrics", "Embroidery base fabrics", "Decorative textiles", "Specialty fabrics"];

export default function TextilesPage() {
  return (
    <main id="main-content">
      <PageHero label="02 — Textiles" title={<>Textiles designed for<br />modern applications.</>} copy="Fabric and textile requirements discussed around fashion, manufacturing and creative applications — from sourcing conversations to sampling." image="/images/premium-floral-embroidery-india.webp" path="/textiles" imagePosition="center 45%" />
      <TextileSignatureStory />

      <section className="category-section section-space">
        <SectionHead label="Textile categories" title={<>Start with the<br />requirement.</>} copy="The categories below are discussion areas and can be updated once current availability is confirmed." />
        <div className="category-list">{categories.map((item, index) => <article className="reveal" key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><p>Availability, construction, colour, finish and quantity to be confirmed for each enquiry.</p><ArrowIcon /></article>)}</div>
      </section>

      <section className="application-section section-space dark-section">
        <div className="application-image image-reveal"><Image src="/images/textured-fashion-embroidery-detail.webp" alt="Textured fashion textile with detailed stitching" fill sizes="(max-width: 900px) 100vw, 50vw" data-parallax="12" /></div>
        <div className="application-copy"><SectionHead label="Applications" title={<>Fabric shaped by<br />where it will live.</>} copy="We begin with the intended product, look, handling and production context." light /><div className="tag-cloud">{["Dresses", "Kurtis", "Ethnic wear", "Bridal wear", "Tops", "Fashion garments", "Home décor", "Accessories"].map((item) => <span key={item}>{item}</span>)}</div></div>
      </section>

      <section className="custom-requirement section-space">
        <div><span className="eyebrow">Custom textile requirements</span><h2 className="reveal">Tell us what the fabric<br />needs to become.</h2></div>
        <div className="reveal"><p>Share the application, preferred material direction, visual reference, colour, finish and expected quantity. We can discuss the relevant sourcing, sampling or customization path for your business.</p><WhatsappButton campaign="textiles" label="Tell Us What Fabric You Need" location="textile_custom" /></div>
      </section>

      <section className="gallery-band section-space">
        <SectionHead label="Textile gallery" title={<>Surface, colour<br />and character.</>} />
        <div className="masonry-gallery">{[
          ["/images/premium-floral-embroidery-india.webp", "Floral textile surface"], ["/images/contemporary-ocean-embroidery.webp", "Contemporary dimensional textile"], ["/images/green-floral-embroidery.webp", "Green floral embroidery fabric"], ["/images/art-textile-thread-sculpture.webp", "Sculptural thread textile"], ["/images/navy-floral-embroidery.webp", "Dark floral textile"], ["/images/dimensional-textile-landscape.webp", "Dimensional felt textile landscape"]
        ].map(([src, alt]) => <figure className="image-reveal" data-cursor="VIEW" key={src}><Image src={src} alt={alt} width={900} height={1100} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" /></figure>)}</div>
      </section>

      <BigCTA title="Sourcing fabric for a collection or production run?" copy="Share your fabric direction, reference, application and quantity for a focused discussion." campaign="textiles" label="Request Fabric Details" location="textile_final_cta" />
    </main>
  );
}
