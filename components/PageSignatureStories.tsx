"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { WhatsappButton } from "@/components/Primitives";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function useSignatureStory(update: (root: HTMLElement, progress: number, velocity: number) => void) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    let previousY = window.scrollY;
    let previousTime = performance.now();
    let velocity = 0;
    let settleTimer = 0;

    const render = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const rawVelocity = (currentY - previousY) / Math.max(8, now - previousTime);
      velocity += (clamp(rawVelocity, -2.5, 2.5) - velocity) * 0.38;
      previousY = currentY;
      previousTime = now;
      const rect = root.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(1, root.offsetHeight - window.innerHeight));
      update(root, progress, velocity);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        velocity = 0;
        render();
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    render();
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return rootRef;
}

function setActivePhase(root: HTMLElement, progress: number) {
  const phases = Array.from(root.querySelectorAll<HTMLElement>("[data-story-phase]"));
  const active = Math.min(phases.length - 1, Math.floor(progress * phases.length));
  phases.forEach((phase, index) => phase.classList.toggle("is-active", index === active));
}

export function AboutSignatureStory() {
  const rootRef = useSignatureStory((root, progress, velocity) => {
    root.style.setProperty("--signature-progress", `${progress}`);
    root.style.setProperty("--signature-velocity", `${velocity}`);
    root.querySelectorAll<HTMLElement>(".about-composition-frame").forEach((frame, index) => {
      const x = (index - 1) * 26 * progress;
      const y = (index % 2 ? -5 : 7) * progress;
      const rotate = (index - 1) * 9 * progress + velocity * 0.6;
      const scale = 0.62 + progress * 0.28 + (index === 1 ? 0.08 : 0);
      frame.style.transform = `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}vh), ${index * 55}px) rotate(${rotate}deg) scale(${scale})`;
    });
    const ring = root.querySelector<HTMLElement>(".about-composition-ring");
    if (ring) ring.style.transform = `translate(-50%,-50%) rotate(${progress * 110}deg) scale(${0.72 + progress * 0.42})`;
    setActivePhase(root, progress);
  });

  const phases = [
    ["Material understanding", "Begin with how the fabric should feel, fall and perform."],
    ["Stitch intention", "Shape the motif, thread character and placement around the product."],
    ["Production clarity", "Carry the approved direction forward with practical coordination."],
  ];

  return (
    <section className="about-composition-story" ref={rootRef}>
      <div className="about-composition-sticky">
        <div className="about-composition-heading">
          <span className="eyebrow">The Bandoliya approach</span>
          <h2>One textile.<br />Many considered decisions.</h2>
        </div>
        <div className="about-composition-ring" aria-hidden="true"><i /><i /><i /></div>
        {[
          ["/images/floral-thread-work-detail.webp", "Close floral embroidery detail"],
          ["/images/artisan-floral-embroidery.webp", "Artisan floral embroidery composition"],
          ["/images/navy-floral-embroidery.webp", "Floral embroidery on deep navy textile"],
        ].map(([src, alt], index) => (
          <figure className="about-composition-frame" key={src}>
            <Image src={src} alt={alt} fill sizes="(max-width: 900px) 78vw, 30vw" />
            <span>0{index + 1}</span>
          </figure>
        ))}
        <div className="signature-phases about-composition-phases">
          {phases.map(([title, copy], index) => (
            <div data-story-phase className={index === 0 ? "is-active" : ""} key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TextileSignatureStory() {
  const rootRef = useSignatureStory((root, progress, velocity) => {
    root.style.setProperty("--signature-progress", `${progress}`);
    root.style.setProperty("--signature-velocity", `${velocity}`);
    const starts = [66, -62, 58];
    const travel = [-138, 134, -126];
    root.querySelectorAll<HTMLElement>(".weave-band").forEach((band, index) => {
      const x = starts[index] + travel[index] * progress;
      const rotate = (index % 2 ? -1 : 1) * (4.5 - progress * 2) + velocity * 0.55;
      band.style.transform = `translate3d(${x}vw,0,0) rotate(${rotate}deg)`;
    });
    setActivePhase(root, progress);
  });

  const phases = [
    ["Base", "Start with fibre, construction and the required hand-feel."],
    ["Surface", "Consider colour, texture, embroidery and visual character."],
    ["Purpose", "Choose the textile around its garment, collection or interior use."],
  ];

  return (
    <section className="weave-story" ref={rootRef}>
      <div className="weave-sticky">
        <div className="weave-heading"><span className="eyebrow">Fabric directions</span><h2>Material.<br />Surface.<br />Purpose.</h2></div>
        {[
          ["/images/premium-floral-embroidery-india.webp", "Dimensional floral textile surface"],
          ["/images/home-linen-floral.webp", "Soft embroidered home linen"],
          ["/images/kurti-sleeve-blue.webp", "Blue embroidered garment sleeve"],
        ].map(([src, alt], index) => (
          <figure className={`weave-band weave-band-${index + 1}`} key={src}>
            <Image src={src} alt={alt} fill sizes="80vw" />
            <figcaption>0{index + 1} · {phases[index][0]}</figcaption>
          </figure>
        ))}
        <div className="signature-phases weave-phases">
          {phases.map(([title, copy], index) => (
            <div data-story-phase className={index === 0 ? "is-active" : ""} key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </div>
          ))}
        </div>
        <div className="weave-rule" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}

export function EmbroiderySignatureStory() {
  const rootRef = useSignatureStory((root, progress, velocity) => {
    root.style.setProperty("--signature-progress", `${progress}`);
    root.style.setProperty("--signature-velocity", `${velocity}`);
    const frame = root.querySelector<HTMLElement>(".stitch-artwork");
    if (frame) {
      const side = Math.max(0, 48 - progress * 48);
      frame.style.clipPath = `inset(0 ${side}% round ${Math.max(0, 26 - progress * 26)}px)`;
    }
    root.querySelectorAll<HTMLElement>("[data-stitch-letter]").forEach((letter, index) => {
      const wave = Math.sin(progress * Math.PI * 3 + index * 0.72);
      letter.style.transform = `translateY(${wave * 24}px) rotate(${wave * 4 + velocity * 0.6}deg) scaleY(${1 + Math.abs(wave) * 0.16})`;
    });
    setActivePhase(root, progress);
  });

  const phases = [
    ["Artwork", "Define the motif, scale and placement."],
    ["Thread", "Build colour, density and stitch character."],
    ["Sample", "Review the embroidery on its intended base."],
    ["Finish", "Refine the direction before production."],
  ];

  return (
    <section className="stitch-story" ref={rootRef}>
      <div className="stitch-sticky">
        <div className="stitch-word" aria-label="Stitch by stitch">
          {"STITCH".split("").map((letter, index) => <i data-stitch-letter key={`${letter}-${index}`}>{letter}</i>)}
        </div>
        <figure className="stitch-artwork">
          <Image src="/images/kurti-black-floral.webp" alt="Pink and gold floral embroidery on black garment panels" fill sizes="100vw" />
        </figure>
        <div className="stitch-shade" />
        <div className="stitch-heading"><span className="eyebrow">Embroidery development</span><h2>Built<br />stitch by stitch.</h2></div>
        <div className="signature-phases stitch-phases">
          {phases.map(([title, copy], index) => (
            <div data-story-phase className={index === 0 ? "is-active" : ""} key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </div>
          ))}
        </div>
        <div className="stitch-line" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}

export function B2BSignatureStory() {
  const rootRef = useSignatureStory((root, progress, velocity) => {
    root.style.setProperty("--signature-progress", `${progress}`);
    root.style.setProperty("--signature-velocity", `${velocity}`);
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".production-card"));
    cards.forEach((card, index) => {
      const reveal = clamp(progress * 1.55 - index * 0.11);
      const x = (index - 2) * 18 * reveal;
      const y = (1 - reveal) * (index * 8 - 12);
      const rotate = (1 - reveal) * (index - 2) * 5 + velocity * 0.45;
      card.style.opacity = String(0.2 + reveal * 0.8);
      card.style.transform = `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}vh), ${reveal * 90}px) rotate(${rotate}deg) scale(${0.72 + reveal * 0.28})`;
    });
    const active = Math.min(cards.length - 1, Math.floor(progress * cards.length));
    cards.forEach((card, index) => card.classList.toggle("is-current", index === active));
  });

  const stages = [
    ["Brief", "Share the requirement"],
    ["Artwork", "Shape the direction"],
    ["Sample", "Review the textile"],
    ["Approval", "Confirm the details"],
    ["Production", "Coordinate the run"],
  ];

  return (
    <section className="production-story" ref={rootRef}>
      <div className="production-sticky">
        <div className="production-heading"><span className="eyebrow">A connected working path</span><h2>From reference<br />to production.</h2><p>Every stage keeps the textile direction and the business requirement aligned.</p></div>
        <div className="production-stage">
          {stages.map(([title, copy], index) => (
            <article className="production-card" key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><i />
            </article>
          ))}
        </div>
        <div className="production-progress"><i /></div>
      </div>
    </section>
  );
}

export function ContactSignatureStory() {
  const rootRef = useSignatureStory((root, progress, velocity) => {
    root.style.setProperty("--signature-progress", `${progress}`);
    root.style.setProperty("--signature-velocity", `${velocity}`);
    root.querySelectorAll<HTMLElement>(".brief-chip").forEach((chip, index) => {
      const angle = (index / 6) * Math.PI * 2 - Math.PI * 0.75;
      const radiusX = 30 - progress * 18;
      const radiusY = 31 - progress * 19;
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY;
      chip.style.transform = `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}vh),0) rotate(${velocity * 0.8}deg)`;
    });
    const center = root.querySelector<HTMLElement>(".brief-center");
    if (center) {
      center.style.opacity = String(clamp((progress - 0.32) / 0.24));
      center.style.transform = `translate(-50%,-50%) scale(${0.78 + clamp((progress - 0.32) / 0.24) * 0.22})`;
    }
    const image = root.querySelector<HTMLElement>(".brief-backdrop");
    if (image) image.style.clipPath = `circle(${18 + progress * 60}% at 50% 50%)`;
  });

  return (
    <section className="brief-story" ref={rootRef}>
      <div className="brief-sticky">
        <figure className="brief-backdrop"><Image src="/images/blossom-hanky.webp" alt="Delicate peach botanical embroidery on cream cloth" fill sizes="100vw" /></figure>
        <div className="brief-shade" />
        <div className="brief-heading"><span className="eyebrow">A useful starting brief</span><h2>Bring what<br />you already have.</h2></div>
        {[
          "Artwork", "Fabric", "Application", "Quantity", "Timeline", "Delivery",
        ].map((item, index) => <span className="brief-chip" key={item}>0{index + 1} · {item}</span>)}
        <div className="brief-center">
          <span className="eyebrow">Bandoliya Textiles</span>
          <h3>Let&apos;s shape the requirement together.</h3>
          <WhatsappButton campaign="contact" label="Start on WhatsApp" location="contact_signature_story" className="button button-light" />
        </div>
      </div>
    </section>
  );
}
