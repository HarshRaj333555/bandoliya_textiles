import { ArrowIcon, PageHero, WhatsappButton } from "@/components/Primitives";
import { contact, makeMetadata, whatsappUrl } from "@/lib/site";
import { ContactSignatureStory } from "@/components/PageSignatureStories";

export const metadata = makeMetadata(
  "Contact Bandoliya Textiles",
  "Contact Bandoliya Textiles in India to discuss fabric, custom embroidery, sampling or bulk production requirements.",
  "/contact",
  ["contact textile supplier India", "embroidery enquiry India", "textile business India"],
);

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero label="06 — Contact" title={<>Let&apos;s create<br />something together.</>} copy="Share your textile, embroidery, sampling or bulk production requirement with Bandoliya Textiles." image="/images/green-floral-embroidery.webp" path="/contact" imagePosition="center 44%" />
      <ContactSignatureStory />

      <section className="contact-main section-space">
        <div className="contact-primary">
          <span className="eyebrow">WhatsApp-first enquiries</span>
          <h2 className="reveal">Your requirement can<br />start with a message.</h2>
          <p className="reveal">You can send us your design, reference image, fabric requirement, quantity or project details directly on WhatsApp.</p>
          <WhatsappButton campaign="contact" label="Chat on WhatsApp" location="contact_primary" className="button button-whatsapp" />
        </div>
        <div className="contact-details reveal">
          <div><span>Business</span><p>Bandoliya Textiles<br />India</p></div>
          <div><span>Phone / WhatsApp</span><p><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a></p></div>
          <div><span>Email</span><p><a href={`mailto:${contact.email}`}>{contact.email}</a></p></div>
          <div><span>Address</span><p>{contact.address}</p></div>
          <div><span>Business hours</span><p>{contact.hours}</p></div>
        </div>
      </section>

      <section className="contact-checklist">
        <span className="eyebrow">Helpful details to send</span>
        <div>{["What you need", "Reference / artwork", "Intended application", "Approximate quantity", "Target timeline", "Delivery location"].map((item, index) => <span className="reveal" key={item}><small>0{index + 1}</small>{item}</span>)}</div>
      </section>

      <section className="map-placeholder"><div><span className="eyebrow">Direct enquiries</span><h2>Bandoliya Textiles<br />India</h2><p>For product references, sampling discussions and current service information, contact our team directly.</p></div><a className="arrow-link" href={whatsappUrl("contact")} target="_blank" rel="noreferrer">Start on WhatsApp <ArrowIcon /></a></section>
    </main>
  );
}
