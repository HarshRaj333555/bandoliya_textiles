"use client";

import Image from "next/image";
import { useState } from "react";
import { portfolioItems } from "@/lib/site";

export default function EditorialCarousel() {
  const slides = portfolioItems.slice(0, 6);
  const [active, setActive] = useState(0);
  const current = slides[active];
  const move = (direction: number) => setActive((value) => (value + direction + slides.length) % slides.length);

  return (
    <section className="editorial-carousel" aria-label="Featured textile studies">
      <div className="editorial-media" key={current.image}>
        <Image src={current.image} alt={current.alt} fill sizes="100vw" priority={active === 0} />
        <div className="editorial-scrim" />
        <div className="editorial-copy">
          <span className="eyebrow">{current.category} · Featured study</span>
          <h2>{current.title}</h2>
          <p>{current.technique} · {current.application}</p>
        </div>
      </div>
      <div className="editorial-controls">
        <button className="carousel-control previous" type="button" onClick={() => move(-1)} aria-label="Previous textile study"><span>Previous</span></button>
        <div className="carousel-count"><span>{String(active + 1).padStart(2, "0")}</span><i /><span>{String(slides.length).padStart(2, "0")}</span></div>
        <button className="carousel-control next" type="button" onClick={() => move(1)} aria-label="Next textile study"><span>Next</span></button>
      </div>
      <div className="editorial-thumbnails" role="tablist" aria-label="Choose textile study">
        {slides.map((slide, index) => (
          <button type="button" role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)} key={slide.title}>
            <Image src={slide.image} alt="" fill sizes="120px" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
