import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bandoliya Textiles | Textile & Embroidery Solutions India",
    template: "%s | Bandoliya Textiles",
  },
  description: "Textile, fabric and custom embroidery solutions for fashion brands, designers, manufacturers and B2B buyers in India.",
  applicationName: "Bandoliya Textiles",
  category: "Textiles and Embroidery",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#161616",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Bandoliya Textiles", url: SITE_URL, logo: `${SITE_URL}/favicon.png`, address: { "@type": "PostalAddress", addressCountry: "IN" } },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Bandoliya Textiles", publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en-IN" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={manrope.variable}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteChrome>{children}</SiteChrome>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
