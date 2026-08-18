import { makeMetadata } from "@/lib/site";

export const metadata = makeMetadata("Website Terms", "Website terms for Bandoliya Textiles.", "/terms");

export default function TermsPage() {
  return <main id="main-content" className="legal-page"><span className="eyebrow">Legal</span><h1>Website Terms</h1><p className="legal-updated">Last updated: 19 August 2026</p><section><h2>Website information</h2><p>This website presents general information about Bandoliya Textiles and areas available for enquiry. Product availability, suitability, specifications, pricing, quantities and timelines are confirmed separately for each requirement.</p><h2>Visual references</h2><p>Portfolio images communicate design directions and do not guarantee identical availability or production results. Final details are established through project discussion and approval.</p><h2>Contact</h2><p>For questions about these terms, contact Bandoliya Textiles at <a href="mailto:bandoliyatextiles@gmail.com">bandoliyatextiles@gmail.com</a>.</p></section></main>;
}
