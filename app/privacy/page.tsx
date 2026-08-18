import { makeMetadata } from "@/lib/site";

export const metadata = makeMetadata("Privacy Policy", "Privacy information for visitors to the Bandoliya Textiles website.", "/privacy");

export default function PrivacyPage() {
  return <main id="main-content" className="legal-page"><span className="eyebrow">Legal</span><h1>Privacy Policy</h1><p className="legal-updated">Last updated: 19 August 2026</p><section><h2>Information you share</h2><p>When you contact Bandoliya Textiles through WhatsApp, phone or email, you may choose to share your name, business details, contact information, artwork, references and project requirements.</p><h2>How information may be used</h2><p>Information is used to respond to enquiries, understand requirements, prepare discussions and coordinate potential work.</p><h2>Contact</h2><p>For privacy-related questions, contact Bandoliya Textiles at <a href="mailto:bandoliyatextiles@gmail.com">bandoliyatextiles@gmail.com</a>.</p></section></main>;
}
