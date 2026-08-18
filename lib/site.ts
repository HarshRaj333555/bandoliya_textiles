import type { Metadata } from "next";

export const SITE_URL = "https://www.bandoliyatextiles.com";
export const WHATSAPP_NUMBER = "917665655222";

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about-bandoliya-textiles", label: "About" },
  { href: "/textiles", label: "Textiles" },
  { href: "/embroidery", label: "Embroidery" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/b2b-textile-solutions", label: "B2B Solutions" },
  { href: "/contact", label: "Contact" },
];

export const contact = {
  phone: "+91 76656 55222",
  phoneHref: "+917665655222",
  email: "bandoliyatextiles@gmail.com",
  address: "India",
  hours: "Please contact us for current business hours",
};

const messages = {
  home: "Hello Bandoliya Textiles, I would like to discuss a textile or embroidery requirement.",
  textiles: "Hello Bandoliya Textiles, I am looking for fabric/textile options for my requirement.",
  embroidery: "Hello Bandoliya Textiles, I would like to discuss a custom embroidery requirement.",
  portfolio: "Hello Bandoliya Textiles, I saw a design on your website and would like to discuss something similar.",
  b2b: "Hello Bandoliya Textiles, I would like to discuss sampling/bulk production for our business.",
  contact: "Hello Bandoliya Textiles, I would like to share a textile or embroidery requirement.",
};

export type Campaign = keyof typeof messages;

export function whatsappUrl(campaign: Campaign, detail?: string) {
  const message = detail ? `${messages[campaign]} Reference: ${detail}.` : messages[campaign];
  const hasDirectNumber = /^\d{7,15}$/.test(WHATSAPP_NUMBER);
  const destination = hasDirectNumber ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://api.whatsapp.com/send";
  return `${destination}?text=${encodeURIComponent(message)}&utm_source=website&utm_medium=whatsapp&utm_campaign=${campaign}`;
}

export function makeMetadata(
  title: string,
  description: string,
  path: string,
  keywords: string[] = [],
): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Bandoliya Textiles",
      type: "website",
      locale: "en_IN",
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "Bandoliya Textiles — Crafting Textiles. Creating Impressions." }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.png`],
    },
  };
}

export type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  alt: string;
  technique: string;
  application: string;
  fabric: string;
};

export const portfolioItems: PortfolioItem[] = [
  { title: "Botanical Rhythm", category: "Floral", image: "/images/premium-floral-embroidery-india.webp", alt: "Macro floral embroidery with dimensional threadwork", technique: "Layered thread embroidery", application: "Fashion fabrics", fabric: "Base fabric to be confirmed" },
  { title: "Peacock Study", category: "Ethnic", image: "/images/indian-peacock-embroidery.webp", alt: "Colourful Indian peacock embroidery motif", technique: "Decorative motif embroidery", application: "Ethnic and statement garments", fabric: "Custom base options" },
  { title: "Midnight Botanics", category: "Fashion", image: "/images/navy-floral-embroidery.webp", alt: "Floral embroidery on deep navy textile", technique: "Textured floral embroidery", application: "Fashion collections", fabric: "Dark woven base" },
  { title: "Threaded Terrain", category: "Contemporary", image: "/images/contemporary-ocean-embroidery.webp", alt: "Contemporary ocean landscape created in thread", technique: "Dimensional thread art", application: "Decorative textile concepts", fabric: "Textured base" },
  { title: "Artisan Bloom", category: "Floral", image: "/images/artisan-floral-embroidery.webp", alt: "Large artisan floral embroidery in warm tones", technique: "Satin and fill stitch", application: "Garments and decorative panels", fabric: "Neutral woven base" },
  { title: "Monogram Form", category: "Custom", image: "/images/custom-monogram-embroidery.webp", alt: "Custom blue and white embroidered monogram", technique: "Custom artwork embroidery", application: "Branding and garment detail", fabric: "Application dependent" },
  { title: "Folk Flight", category: "Ethnic", image: "/images/folk-peacock-embroidery.webp", alt: "Folk-inspired peacock embroidery on yellow cloth", technique: "Folk motif embroidery", application: "Ethnic and creative collections", fabric: "Natural textile base" },
  { title: "Burgundy Garden", category: "Fashion", image: "/images/burgundy-floral-embroidery.webp", alt: "Burgundy floral embroidery on black fabric", technique: "Machine embroidery artwork", application: "Fashion fabric development", fabric: "Dark fabric base" },
  { title: "Botanical Volume", category: "Contemporary", image: "/images/botanical-fruit-embroidery.webp", alt: "Dimensional fruit and leaf embroidery", technique: "Raised and dimensional stitch", application: "Statement textile design", fabric: "Natural woven base" },
  { title: "Garden Heirloom", category: "Handkerchief", image: "/images/hanky-floral-lace.webp", alt: "White handkerchief with dimensional pastel floral embroidery and lace edge", technique: "Dimensional floral threadwork", application: "Keepsake handkerchiefs", fabric: "Fine white linen" },
  { title: "Vintage Corner Bloom", category: "Handkerchief", image: "/images/hanky-vintage-corner.webp", alt: "Vintage-style embroidered handkerchief with corner florals and crochet trim", technique: "Fine multicolour floral embroidery", application: "Heritage and occasion handkerchiefs", fabric: "Soft white linen" },
  { title: "Blossom Arc", category: "Handkerchief", image: "/images/blossom-hanky.webp", alt: "Cream handkerchief with a curved arrangement of delicate peach blossoms", technique: "Fine stem and petal stitching", application: "Bridal and gifting textiles", fabric: "Cream satin-linen" },
  { title: "Blue Vow", category: "Handkerchief", image: "/images/groom-hanky.webp", alt: "White groom handkerchief embroidered with soft blue botanical sprigs", technique: "Custom botanical embroidery", application: "Wedding handkerchiefs and pocket squares", fabric: "White linen" },
  { title: "Storybook Detail", category: "Handkerchief", image: "/images/rabbit-hanky.webp", alt: "Small storybook rabbit embroidered onto white cloth", technique: "Miniature character threadwork", application: "Personalised keepsakes", fabric: "Fine cotton-linen" },
  { title: "Soft Botanical Linen", category: "Table Linen", image: "/images/home-linen-floral.webp", alt: "Cream table linen with soft blush dimensional botanical embroidery", technique: "Dimensional floral embroidery", application: "Tablecloths and decorative home linen", fabric: "Textured cream linen" },
  { title: "Long Table Garden", category: "Table Linen", image: "/images/table-runner-floral.webp", alt: "Long white table runner with colourful winding floral embroidery", technique: "Continuous floral border embroidery", application: "Table runners and hospitality linen", fabric: "White woven linen" },
  { title: "Paisley Statement", category: "Kurti", image: "/images/kurti-paisley-ivory.webp", alt: "Ivory kurti with a colourful embroidered paisley statement motif", technique: "Large-scale paisley embroidery", application: "Statement kurtis and tunics", fabric: "Ivory textured weave" },
  { title: "Rose Paisley Panel", category: "Kurti", image: "/images/kurti-paisley-rose.webp", alt: "Rose kurti with intricate embroidered paisley side panel", technique: "Decorative panel embroidery", application: "Kurti fronts and coordinated sleeves", fabric: "Rose woven fabric" },
  { title: "Powder Blue Neckline", category: "Kurti", image: "/images/kurti-neckline-blue.webp", alt: "Powder blue kurti neckline with coral floral embroidery", technique: "Neckline placement embroidery", application: "Kurti necklines and front panels", fabric: "Blue slub weave" },
  { title: "Midnight Vine Set", category: "Kurti", image: "/images/kurti-black-floral.webp", alt: "Black garment panels with pink and gold embroidered botanical vines", technique: "Coordinated panel and sleeve embroidery", application: "Kurti sets and separates", fabric: "Black woven base" },
  { title: "Navy Scallop Garden", category: "Kurti", image: "/images/kurti-navy-scallop.webp", alt: "Navy kurti with floral embroidery and scalloped hem detail", technique: "Border and placement embroidery", application: "Kurti hems and sleeve cuffs", fabric: "Deep navy textile" },
  { title: "Butterfly Linework", category: "Kurti", image: "/images/kurti-butterfly-detail.webp", alt: "Neutral kurti sleeve with oversized pastel butterfly line embroidery", technique: "Graphic outline embroidery", application: "Contemporary kurti sleeves", fabric: "Neutral fluid weave" },
  { title: "Cerulean Cuff", category: "Kurti", image: "/images/kurti-sleeve-blue.webp", alt: "Blue sleeve with bright floral embroidery and scalloped cuff", technique: "Sleeve placement and scallop embroidery", application: "Kurti sleeves and cuffs", fabric: "Blue woven textile" },
  { title: "Burgundy Garden Hem", category: "Kurti", image: "/images/kurti-burgundy-floral.webp", alt: "Burgundy kurti hem with warm botanical embroidery and scallop edge", technique: "Dense floral border embroidery", application: "Kurti hems and borders", fabric: "Burgundy woven fabric" },
  { title: "Floral Stitch Study", category: "Floral", image: "/images/floral-stitch-study.webp", alt: "Detailed floral hand embroidery study on a white ground", technique: "Satin and long-and-short stitch", application: "Artwork and motif development", fabric: "White embroidery ground" },
  { title: "Border Artwork Study", category: "Custom", image: "/images/embroidery-border-sketch.webp", alt: "Illustrated floral border artwork in pink blue and green", technique: "Artwork-to-stitch development", application: "Borders, runners and placement layouts", fabric: "Application dependent" },
];
