"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { portfolioItems, whatsappUrl, type PortfolioItem } from "@/lib/site";
import { ArrowIcon } from "@/components/Primitives";

export default function PortfolioGallery({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const categories = ["All", ...Array.from(new Set(portfolioItems.map((item) => item.category)))];
  const items = useMemo(() => {
    const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === filter);
    return compact ? filtered.slice(0, 6) : filtered;
  }, [filter, compact]);

  useEffect(() => {
    document.body.classList.toggle("lightbox-open", Boolean(selected));
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  const openItem = (item: PortfolioItem) => {
    setSelected(item);
    const dataLayer = (window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
    dataLayer?.push({ event: "portfolio_view", portfolio_category: item.category, portfolio_title: item.title });
  };

  const moveSelected = (direction: number) => {
    if (!selected) return;
    const current = portfolioItems.findIndex((item) => item.title === selected.title);
    setSelected(portfolioItems[(current + direction + portfolioItems.length) % portfolioItems.length]);
  };

  return (
    <>
      {!compact && <div className="portfolio-filters" role="group" aria-label="Filter portfolio items">{categories.map((category) => <button type="button" className={filter === category ? "active" : ""} onClick={() => setFilter(category)} key={category}>{category}</button>)}</div>}
      <div className={`portfolio-grid ${compact ? "compact" : ""}`}>
        {items.map((item, index) => (
          <button type="button" className="portfolio-card mask-card" data-cursor="VIEW" onClick={() => openItem(item)} key={item.title} style={{ "--card-index": index } as React.CSSProperties}>
            <Image src={item.image} alt={item.alt} width={900} height={1100} sizes={compact ? "(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" : "(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"} />
            <span className="portfolio-overlay"><small>{item.category}</small><strong>{item.title}</strong><i>View study <ArrowIcon /></i></span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${selected.title} portfolio details`}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close portfolio detail">×</button>
          <div className="lightbox-panel">
            <div className="lightbox-image"><Image src={selected.image} alt={selected.alt} fill sizes="(max-width: 900px) 100vw, 50vw" priority /></div>
            <div className="lightbox-copy">
              <span className="eyebrow">{selected.category}</span>
              <h2>{selected.title}</h2>
              <dl><div><dt>Technique</dt><dd>{selected.technique}</dd></div><div><dt>Application</dt><dd>{selected.application}</dd></div><div><dt>Fabric</dt><dd>{selected.fabric}</dd></div><div><dt>Customisation</dt><dd>Available for discussion</dd></div></dl>
              <a className="button button-dark" data-event="whatsapp_click" data-location="portfolio_lightbox" href={whatsappUrl("portfolio", selected.title)} target="_blank" rel="noreferrer"><span>Send This Reference</span><ArrowIcon /></a>
              <div className="lightbox-navigation">
                <button type="button" onClick={() => moveSelected(-1)}>Previous study</button>
                <span>{String(portfolioItems.findIndex((item) => item.title === selected.title) + 1).padStart(2, "0")} / {String(portfolioItems.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => moveSelected(1)}>Next study</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
