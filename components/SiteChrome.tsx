"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, navigation, whatsappUrl, type Campaign } from "@/lib/site";
import { WhatsAppMark } from "@/components/Primitives";

function TrackedWhatsapp({ location, className, campaign = "home", children }: { location: string; className?: string; campaign?: Campaign; children: React.ReactNode }) {
  return (
    <a
      className={className}
      data-cursor="OPEN"
      data-event="whatsapp_click"
      data-location={location}
      href={whatsappUrl(campaign)}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [intentVisible, setIntentVisible] = useState(false);
  const campaign: Campaign = pathname.startsWith("/textiles") ? "textiles" : pathname.startsWith("/embroidery") ? "embroidery" : pathname.startsWith("/portfolio") ? "portfolio" : pathname.startsWith("/b2b") ? "b2b" : pathname.startsWith("/contact") ? "contact" : "home";
  const solidHeader = pathname === "/privacy" || pathname === "/terms";

  useEffect(() => {
    const html = document.documentElement;
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    const cursorText = cursor?.querySelector<HTMLElement>("span");
    let frame = 0;

    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, window.scrollY / max);
        html.style.setProperty("--page-progress", String(progress));
        setScrolled(window.scrollY > 40);
        if (pathname.startsWith("/portfolio")) setIntentVisible(false);
        else if (progress > .68) setIntentVisible(true);

        const hero = document.querySelector<HTMLElement>(".home-hero");
        if (hero) {
          const heroRect = hero.getBoundingClientRect();
          const heroProgress = Math.max(0, Math.min(1, -heroRect.top / Math.max(1, hero.offsetHeight)));
          const heroImage = hero.querySelector<HTMLElement>(".hero-backdrop");
          const heroCopy = hero.querySelector<HTMLElement>(".hero-content");
          const heroBrand = hero.querySelector<HTMLElement>(".hero-brand-lockup");
          if (heroImage) heroImage.style.transform = `scale(${1.02 + heroProgress * .15}) translateY(${heroProgress * 3}%)`;
          if (heroCopy) {
            heroCopy.style.transform = `translateY(${-heroProgress * 70}px)`;
            heroCopy.style.opacity = String(1 - heroProgress * .85);
          }
          if (heroBrand) heroBrand.style.transform = `translateY(${heroProgress * 110}px) scale(${1 + heroProgress * .05})`;
        }

        document.querySelectorAll<HTMLElement>(".page-hero").forEach((pageHero) => {
          const rect = pageHero.getBoundingClientRect();
          const local = Math.max(0, Math.min(1, -rect.top / Math.max(1, pageHero.offsetHeight)));
          const image = pageHero.querySelector<HTMLElement>(".page-hero-image");
          const content = pageHero.querySelector<HTMLElement>(".page-hero-content");
          if (image) image.style.transform = `scale(${1.03 + local * .14}) translateY(${local * 4}%)`;
          if (content) {
            content.style.transform = `translateY(${-local * 55}px)`;
            content.style.opacity = String(1 - local * .82);
          }
        });

        document.querySelectorAll<HTMLElement>("[data-zoom-story]").forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.max(1, section.offsetHeight - window.innerHeight);
          const local = Math.max(0, Math.min(1, -rect.top / distance));
          const word = section.querySelector<HTMLElement>(".zoom-word");
          const image = section.querySelector<HTMLElement>(".zoom-story-image");
          const caption = section.querySelector<HTMLElement>(".zoom-caption");
          if (word) {
            word.style.transform = `scale(${1 + local * 10.5})`;
            word.style.opacity = String(1 - Math.max(0, local - .55) / .25);
          }
          if (image) {
            image.style.opacity = String(Math.max(0, Math.min(1, (local - .34) / .28)));
            image.style.transform = `scale(${1.18 - local * .18})`;
          }
          if (caption) {
            caption.style.opacity = String(Math.max(0, Math.min(1, (local - .68) / .18)));
            caption.style.transform = `translateY(${(1 - Math.max(0, Math.min(1, (local - .68) / .18))) * 35}px)`;
          }
        });

        document.querySelectorAll<HTMLElement>("[data-depth-story]").forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.max(1, section.offsetHeight - window.innerHeight);
          const local = Math.max(0, Math.min(1, -rect.top / distance));
          section.style.setProperty("--depth-progress", String(local));
          section.querySelectorAll<HTMLElement>("[data-depth-card]").forEach((card, index) => {
            const reveal = Math.max(0, Math.min(1, local * 1.55 - index * .12));
            const x = (index - 1.5) * 20 * reveal;
            const y = (1 - reveal) * (index * 34 + 55) + (index % 2 ? 2.5 : -2.5) * reveal;
            const z = (1 - reveal) * (-190 * index) + reveal * (150 - Math.abs(index - 1.5) * 45);
            const rotateY = reveal * (index - 1.5) * -10;
            const rotateX = (1 - reveal) * 8;
            const scale = .72 + reveal * .28;
            card.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
            card.style.opacity = String(.18 + reveal * .82);
          });
        });

        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
          const rect = element.getBoundingClientRect();
          const amount = Number(element.dataset.parallax || 8);
          const relative = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
          element.style.setProperty("--parallax-y", `${relative * amount * -1}%`);
        });

        document.querySelectorAll<HTMLElement>("[data-horizontal-section]").forEach((section) => {
          const sticky = section.querySelector<HTMLElement>("[data-horizontal-track]");
          if (!sticky || window.innerWidth < 900) return;
          const rect = section.getBoundingClientRect();
          const distance = section.offsetHeight - window.innerHeight;
          const local = Math.max(0, Math.min(1, -rect.top / Math.max(1, distance)));
          const overflow = Math.max(0, sticky.scrollWidth - window.innerWidth + 56);
          sticky.style.transform = `translate3d(${-local * overflow}px,0,0)`;
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: .14 },
    );
    document.querySelectorAll(".reveal, .image-reveal, .word-reveal").forEach((element) => observer.observe(element));

    const moveCursor = (event: PointerEvent) => {
      if (!cursor || event.pointerType === "touch") return;
      cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      cursor.classList.add("cursor-visible");
    };
    const overCursor = (event: Event) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!cursor || !cursorText || !target) return;
      cursorText.textContent = target.dataset.cursor || "";
      cursor.classList.add("cursor-active");
    };
    const outCursor = (event: Event) => {
      if (!cursor || !(event.target as HTMLElement).closest("[data-cursor]")) return;
      cursor.classList.remove("cursor-active");
    };

    const magnets = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const magneticMoves = magnets.map((button) => {
      const move = (event: PointerEvent) => {
        const rect = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px, ${(event.clientY - rect.top - rect.height / 2) * .12}px)`;
      };
      const reset = () => { button.style.transform = ""; };
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", reset);
      return { button, move, reset };
    });

    const track = (event: Event) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[data-event]");
      if (!anchor) return;
      const name = anchor.dataset.event || "interaction";
      const dataLayer = (window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
      dataLayer?.push({ event: name, cta_location: anchor.dataset.location, page_path: pathname });
    };

    const transitionLinks = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a");
      if (!anchor || anchor.target === "_blank" || event.metaKey || event.ctrlKey || anchor.href.includes("#")) return;
      const next = new URL(anchor.href, window.location.href);
      if (next.origin !== window.location.origin || next.pathname === window.location.pathname) return;
      event.preventDefault();
      document.body.classList.add("page-leaving");
      window.setTimeout(() => window.location.assign(next.href), 260);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerover", overCursor);
    document.addEventListener("pointerout", outCursor);
    document.addEventListener("click", track);
    document.addEventListener("click", transitionLinks);
    updateScroll();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", overCursor);
      document.removeEventListener("pointerout", outCursor);
      document.removeEventListener("click", track);
      document.removeEventListener("click", transitionLinks);
      magneticMoves.forEach(({ button, move, reset }) => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", reset);
      });
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <>
      <div className="page-transition" aria-hidden="true" />
      <svg className="signature-thread" viewBox="0 0 100 1200" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M60 0 C10 90 92 180 38 270 C-4 340 95 430 51 520 C4 620 92 700 36 790 C0 855 98 950 48 1035 C20 1080 45 1145 62 1200" />
      </svg>
      <header className={`site-header ${scrolled || solidHeader ? "is-scrolled" : ""}`}>
        <Link className="wordmark" href="/" aria-label="Bandoliya Textiles home" onClick={() => setMenuOpen(false)}>
          <span className="wordmark-mark">BT</span>
          <span>BANDOLIYA TEXTILES</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.slice(1).map((item) => <Link className={pathname === item.href ? "active" : ""} href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <TrackedWhatsapp className="nav-cta magnetic" location="header" campaign={campaign}><WhatsAppMark /> WhatsApp Us</TrackedWhatsapp>
          <button className={`menu-toggle ${menuOpen ? "active" : ""}`} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><i /><i /></button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <span className="eyebrow">Navigate</span>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{item.label}</Link>)}
        </nav>
        <TrackedWhatsapp className="button button-copper" location="mobile_menu" campaign={campaign}><span>Start a Requirement</span><WhatsAppMark /></TrackedWhatsapp>
      </div>

      {children}

      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <div className="wordmark footer-wordmark"><span className="wordmark-mark">BT</span><span>BANDOLIYA TEXTILES</span></div>
            <h2>Textiles crafted for brands, designers &amp; businesses.</h2>
          </div>
          <TrackedWhatsapp className="footer-conversation magnetic" location="footer" campaign={campaign}><WhatsAppMark />Start a conversation</TrackedWhatsapp>
        </div>
        <div className="footer-grid">
          <div><span className="footer-label">Company</span>{navigation.slice(1, 4).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
          <div><span className="footer-label">Explore</span>{navigation.slice(4).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
          <div><span className="footer-label">Contact</span><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><span>{contact.address}</span></div>
          <div><span className="footer-label">Enquiries</span><p>Share your artwork, fabric reference, quantity or production requirement directly with our team.</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Bandoliya Textiles. All rights reserved.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/sitemap.xml">Sitemap</Link></div></div>
      </footer>

      <div className={`intent-cta ${intentVisible ? "is-visible" : ""}`} role="region" aria-label="Textile enquiry">
        <button aria-label="Dismiss enquiry prompt" onClick={() => setIntentVisible(false)}>×</button>
        <span>Have a textile requirement?</span>
        <p>Tell us what you&apos;re looking for.</p>
        <TrackedWhatsapp location="intent_cta" campaign={campaign}>Chat on WhatsApp <WhatsAppMark /></TrackedWhatsapp>
      </div>

      <TrackedWhatsapp className="floating-whatsapp magnetic" location="floating_button" campaign={campaign}><WhatsAppMark />Discuss Your Requirement</TrackedWhatsapp>
      <TrackedWhatsapp className="mobile-whatsapp" location="mobile_sticky" campaign={campaign}><WhatsAppMark />Discuss Your Requirement</TrackedWhatsapp>
      <div className="custom-cursor" aria-hidden="true"><span /></div>
    </>
  );
}
