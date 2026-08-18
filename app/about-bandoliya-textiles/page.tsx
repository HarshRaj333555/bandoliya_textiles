import { BigCTA, PageHero, SectionHead } from "@/components/Primitives";
import Image from "next/image";
import { makeMetadata } from "@/lib/site";
import { AboutSignatureStory } from "@/components/PageSignatureStories";

export const metadata = makeMetadata(
  "About Our Textile & Embroidery Approach",
  "Discover Bandoliya Textiles' quality-led, collaborative approach to textile and embroidery development for fashion and garment businesses.",
  "/about-bandoliya-textiles",
  ["textile company India", "textile expertise India", "embroidery business India"],
);

const values = [["Quality", "Careful attention to material, stitchwork and finish."], ["Commitment", "Responsible coordination from discussion to dispatch."], ["Precision", "Design details interpreted with purpose and consistency."], ["Innovation", "An open approach to new artwork, applications and techniques."], ["Partnership", "Work developed around long-term business relationships."]];

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero label="01 — About" title={<>Built around fabric.<br />Driven by craftsmanship.</>} copy="A textile and embroidery partner shaped by thoughtful development, practical communication and respect for the details." image="/images/artisan-floral-embroidery.webp" path="/about-bandoliya-textiles" imagePosition="center 48%" />
      <AboutSignatureStory />

      <section className="story-section section-space">
        <SectionHead label="Our story" title={<>Craftsmanship is not<br />a finishing touch.</>} />
        <div className="story-grid">
          <div className="story-copy reveal"><p>At Bandoliya Textiles, craftsmanship begins with understanding the requirement. Fabric, application, artwork, stitch character and production realities all shape the final outcome. Our role is to bring those considerations together with clarity.</p><p>Each discussion starts with the intended product and works backward through material, motif, stitch language, scale and production fit.</p></div>
          <figure className="image-reveal"><Image src="/images/floral-thread-work-detail.webp" alt="Close view of detailed floral thread embroidery" width={950} height={1000} sizes="(max-width: 900px) 100vw, 55vw" data-parallax="10" /><figcaption>Detail, considered.</figcaption></figure>
        </div>
      </section>

      <section className="philosophy-section section-space dark-section">
        <SectionHead label="Our philosophy" title={<>Precision from sample<br />to production.</>} copy="Our philosophy rests on six ideas that matter in every textile business relationship." light />
        <div className="philosophy-list">{["Quality in the details", "Long-term relationships", "Respect for craftsmanship", "Reliable coordination", "Product consistency", "Continuous development"].map((item, index) => <div className="reveal" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div>
      </section>

      <section className="split-story section-space">
        <div className="split-image image-reveal"><div className="split-image-media"><Image src="/images/folk-peacock-embroidery.webp" alt="Traditional folk-inspired peacock embroidery" fill sizes="(max-width: 900px) 100vw, 50vw" /></div></div>
        <div className="split-copy">
          <span className="eyebrow">Craft meets technology</span>
          <article className="reveal"><small>01</small><h2>Textile knowledge</h2><p>Understanding fabric behaviour, visual balance, thread, texture and how decoration changes a textile surface.</p></article>
          <article className="reveal"><small>02</small><h2>Production thinking</h2><p>Interpreting artwork for sampling, repeatability and considered machine embroidery execution.</p></article>
          <article className="reveal"><small>03</small><h2>One connected process</h2><p>Combining creative direction with the practical decisions required for approved production.</p></article>
        </div>
      </section>

      <section className="about-panorama">
        <figure><Image src="/images/navy-floral-embroidery.webp" alt="Floral embroidery on deep navy textile" fill sizes="40vw" /></figure>
        <figure><Image src="/images/botanical-fruit-embroidery.webp" alt="Dimensional botanical fruit embroidery" fill sizes="35vw" /></figure>
        <figure><Image src="/images/folk-peacock-embroidery.webp" alt="Colourful folk peacock threadwork" fill sizes="35vw" /></figure>
        <div className="about-panorama-copy"><span className="eyebrow">One connected language</span><h2>Indian craft.<br />Contemporary expression.</h2></div>
      </section>

      <section className="values-section section-space">
        <SectionHead label="Our values" title={<>How we choose<br />to work.</>} />
        <div className="value-cards">{values.map(([title, copy], index) => <article className="reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="partner-band"><span className="eyebrow">Who we work with</span><div>{["Fashion designers", "Clothing brands", "Manufacturers", "Exporters", "Wholesalers", "Buying houses", "Boutiques"].map((item) => <span key={item}>{item}</span>)}</div></section>
      <BigCTA title="Looking for a dependable textile partner?" copy="Tell Bandoliya Textiles what you are developing, sourcing or planning to produce." campaign="home" label="Talk to Bandoliya Textiles" location="about_final_cta" />
    </main>
  );
}
