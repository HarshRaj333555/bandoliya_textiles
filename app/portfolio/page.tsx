import { BigCTA, PageHero, SectionHead } from "@/components/Primitives";
import PortfolioGallery from "@/components/PortfolioGallery";
import PortfolioScrollExperience from "@/components/PortfolioScrollExperience";
import { makeMetadata } from "@/lib/site";

export const metadata = makeMetadata(
  "Textile & Embroidery Portfolio",
  "Explore selected floral, ethnic, fashion and contemporary textile and embroidery directions from Bandoliya Textiles.",
  "/portfolio",
  ["custom textile embroidery", "floral embroidery manufacturer", "fashion embroidery India", "decorative textiles India"],
);

export default function PortfolioPage() {
  return (
    <main id="main-content">
      <PageHero label="04 — Portfolio" title={<>Every surface<br />can tell a story.</>} copy="Explore handkerchiefs, table linen, kurtis and custom embroidery directions—each presented as a considered textile chapter." image="/images/kurti-navy-scallop.webp" path="/portfolio" imagePosition="center 46%" />
      <PortfolioScrollExperience />
      <section className="portfolio-page section-space" id="portfolio-library">
        <SectionHead label="06 — Complete reference library" title={<>Open every study.<br />See every detail.</>} copy="Choose a category, then open any image for its technique, application, fabric direction and direct WhatsApp enquiry." />
        <PortfolioGallery />
      </section>
      <BigCTA title="Interested in something similar?" copy="Send the reference you like and tell us how you would like to apply or adapt it." campaign="portfolio" label="Send This Reference on WhatsApp" location="portfolio_final_cta" />
    </main>
  );
}
