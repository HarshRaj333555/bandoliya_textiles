"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { portfolioItems } from "@/lib/site";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const horizontalItems = portfolioItems.filter((item) =>
  ["Handkerchief", "Table Linen", "Kurti"].includes(item.category),
).slice(0, 9);

const layeredItems = [
  portfolioItems.find((item) => item.title === "Garden Heirloom")!,
  portfolioItems.find((item) => item.title === "Soft Botanical Linen")!,
  portfolioItems.find((item) => item.title === "Paisley Statement")!,
  portfolioItems.find((item) => item.title === "Midnight Vine Set")!,
];

function LiquidThreadCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest<HTMLElement>(".liquid-story");
    if (!canvas || !section) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fragmentSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform sampler2D u_image;
      uniform vec2 u_canvasSize;
      uniform vec2 u_imageSize;
      uniform float u_time;
      uniform float u_progress;
      uniform float u_intensity;

      void main() {
        float canvasAspect = u_canvasSize.x / u_canvasSize.y;
        float imageAspect = u_imageSize.x / u_imageSize.y;
        vec2 cover = canvasAspect < imageAspect
          ? vec2(canvasAspect / imageAspect, 1.0)
          : vec2(1.0, imageAspect / canvasAspect);
        vec2 uv = (v_uv - 0.5) * cover + 0.5;
        float waveA = sin(uv.y * 20.0 + u_time * 0.85 + u_progress * 10.0);
        float waveB = cos(uv.x * 16.0 - u_time * 0.62 + u_progress * 7.0);
        float envelope = sin(v_uv.y * 3.1415926);
        uv.x += waveA * (0.006 + u_intensity * 0.022) * envelope;
        uv.y += waveB * (0.004 + u_intensity * 0.016) * envelope;
        vec4 color = texture2D(u_image, uv);
        color.rgb *= 0.88 + 0.12 * sin((uv.x + uv.y + u_progress) * 3.1415926);
        gl_FragColor = color;
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to create WebGL shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Unable to compile WebGL shader");
      }
      return shader;
    };

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    } catch {
      return;
    }

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const canvasSize = gl.getUniformLocation(program, "u_canvasSize");
    const imageSize = gl.getUniformLocation(program, "u_imageSize");
    const time = gl.getUniformLocation(program, "u_time");
    const progress = gl.getUniformLocation(program, "u_progress");
    const intensity = gl.getUniformLocation(program, "u_intensity");
    let imageReady = false;
    let animationFrame = 0;
    let scrollProgress = 0;
    let scrollIntensity = 0;
    let previousY = window.scrollY;

    const image = new window.Image();
    image.src = "/images/home-linen-floral.webp";
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.uniform2f(imageSize, image.naturalWidth, image.naturalHeight);
      imageReady = true;
      canvas.classList.add("is-ready");
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      scrollProgress = clamp(-rect.top / Math.max(1, section.offsetHeight - window.innerHeight));
      scrollIntensity = Math.min(1, Math.abs(window.scrollY - previousY) / 65);
      previousY = window.scrollY;
    };

    const draw = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      scrollIntensity *= 0.94;
      if (imageReady) {
        gl.uniform2f(canvasSize, width, height);
        gl.uniform1f(time, now * 0.001);
        gl.uniform1f(progress, scrollProgress);
        gl.uniform1f(intensity, 0.16 + scrollIntensity * 0.84);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationFrame = requestAnimationFrame(draw);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    animationFrame = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrame);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas className="liquid-canvas" ref={canvasRef} aria-hidden="true" />;
}

export default function PortfolioScrollExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    let previousY = window.scrollY;
    let previousTime = performance.now();
    let velocity = 0;
    let settleTimer = 0;

    const update = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const rawVelocity = (currentY - previousY) / Math.max(8, now - previousTime);
      velocity += (clamp(rawVelocity, -2.8, 2.8) - velocity) * 0.42;
      previousY = currentY;
      previousTime = now;
      root.style.setProperty("--portfolio-velocity", `${velocity}`);

      const horizontal = root.querySelector<HTMLElement>("[data-portfolio-horizontal]");
      const rail = horizontal?.querySelector<HTMLElement>(".portfolio-horizontal-rail");
      if (horizontal && rail && window.innerWidth > 900) {
        const rect = horizontal.getBoundingClientRect();
        const local = clamp(-rect.top / Math.max(1, horizontal.offsetHeight - window.innerHeight));
        const overflow = Math.max(0, rail.scrollWidth - window.innerWidth + window.innerWidth * 0.06);
        rail.style.transform = `translate3d(${-local * overflow}px,0,0) skewY(${velocity * -1.2}deg)`;
        horizontal.style.setProperty("--horizontal-progress", `${local}`);
        horizontal.querySelectorAll<HTMLElement>(".portfolio-horizontal-card").forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const distance = clamp((cardRect.left + cardRect.width / 2 - window.innerWidth / 2) / window.innerWidth, -1, 1);
          card.style.transform = `perspective(1200px) translateZ(${(1 - Math.abs(distance)) * 80}px) rotateY(${distance * -12}deg) scale(${1 - Math.abs(distance) * 0.08})`;
        });
        horizontal.querySelectorAll<HTMLElement>("[data-kinetic-letter]").forEach((letter, index) => {
          const wave = Math.sin(local * Math.PI * 3 + index * 0.42);
          letter.style.transform = `translateY(${wave * 17}px) rotate(${wave * 5}deg) scaleY(${1 + Math.abs(wave) * 0.2})`;
        });
      }

      const mask = root.querySelector<HTMLElement>("[data-mask-story]");
      if (mask) {
        const rect = mask.getBoundingClientRect();
        const local = clamp(-rect.top / Math.max(1, mask.offsetHeight - window.innerHeight));
        const frameElement = mask.querySelector<HTMLElement>(".mask-story-frame");
        const imageElement = mask.querySelector<HTMLElement>(".mask-story-frame img");
        const prelude = mask.querySelector<HTMLElement>(".mask-prelude");
        const finale = mask.querySelector<HTMLElement>(".mask-finale");
        if (frameElement) frameElement.style.clipPath = `circle(${7 + local * 145}% at 50% 50%)`;
        if (imageElement) imageElement.style.transform = `scale(${1.24 - local * 0.24}) translateY(${(0.5 - local) * 2.5}%)`;
        if (prelude) prelude.style.opacity = String(1 - clamp((local - 0.12) / 0.22));
        if (finale) {
          const reveal = clamp((local - 0.62) / 0.18);
          finale.style.opacity = String(reveal);
          finale.style.transform = `translateY(${(1 - reveal) * 36}px)`;
        }
        mask.style.setProperty("--mask-progress", `${local}`);
      }

      const layered = root.querySelector<HTMLElement>("[data-layered-story]");
      if (layered) {
        const rect = layered.getBoundingClientRect();
        const local = clamp(-rect.top / Math.max(1, layered.offsetHeight - window.innerHeight));
        const layers = Array.from(layered.querySelectorAll<HTMLElement>(".layered-image"));
        const activeIndex = Math.min(layers.length - 1, Math.floor(local * layers.length));
        layers.forEach((layer, index) => {
          const reveal = index === 0 ? 1 : clamp((local - (index - 1) / (layers.length - 1)) * (layers.length - 1) * 1.35);
          layer.style.clipPath = index === 0 ? "inset(0)" : `inset(${(1 - reveal) * 100}% 0 0 0)`;
          const image = layer.querySelector<HTMLElement>("img");
          if (image) image.style.transform = `scale(${1.08 - reveal * 0.08}) translateY(${(1 - reveal) * 3}%)`;
        });
        layered.querySelectorAll<HTMLElement>(".layered-caption").forEach((caption, index) => {
          caption.classList.toggle("is-active", index === activeIndex);
        });
        layered.style.setProperty("--layer-progress", `${local}`);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        velocity = 0;
        root.style.setProperty("--portfolio-velocity", "0");
        update();
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const kineticWords = ["MATERIAL", "NARRATIVES"];
  const seamlessItems = portfolioItems.filter((item) => ["Handkerchief", "Table Linen", "Kurti"].includes(item.category)).slice(2, 10);

  return (
    <div className="portfolio-experience" ref={rootRef}>
      <section className="portfolio-horizontal" data-portfolio-horizontal>
        <div className="portfolio-horizontal-sticky">
          <div className="portfolio-horizontal-heading">
            <span className="eyebrow">01 — Handkerchief, linen &amp; kurti</span>
            <h2 aria-label="Material narratives">
              {kineticWords.map((word, wordIndex) => (
                <span key={word}>
                  {word.split("").map((letter, letterIndex) => (
                    <i data-kinetic-letter key={`${letter}-${wordIndex}-${letterIndex}`}>{letter}</i>
                  ))}
                </span>
              ))}
            </h2>
            <p>A considered sequence of handkerchief, table-linen and kurti embroidery directions.</p>
          </div>
          <div className="portfolio-horizontal-rail">
            {horizontalItems.map((item, index) => (
              <article className="portfolio-horizontal-card" key={item.title}>
                <div className="portfolio-horizontal-media">
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 40vw" />
                </div>
                <div className="portfolio-horizontal-copy">
                  <span>{String(index + 1).padStart(2, "0")} · {item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.technique}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="portfolio-horizontal-progress"><i /></div>
        </div>
      </section>

      <section className="mask-story" data-mask-story>
        <div className="mask-story-sticky">
          <div className="mask-story-frame">
            <Image src="/images/table-runner-floral.webp" alt="Floral embroidered table runner becoming a full textile composition" fill sizes="100vw" />
          </div>
          <div className="mask-prelude">
            <span className="eyebrow">02 — Detail into composition</span>
            <h2>Begin with<br />one stitch.</h2>
          </div>
          <div className="mask-finale">
            <span className="eyebrow">Table linen · continuous border</span>
            <h2>Build the<br />whole setting.</h2>
            <p>A single embroidered detail grows into the complete table-linen setting.</p>
          </div>
          <div className="mask-meter"><i /></div>
        </div>
      </section>

      <section className="layered-story" data-layered-story>
        <div className="layered-sticky">
          <div className="layered-images">
            {layeredItems.map((item, index) => (
              <figure className="layered-image" key={item.title} style={{ zIndex: index + 1 }}>
                <Image src={item.image} alt={item.alt} fill sizes="100vw" />
              </figure>
            ))}
          </div>
          <div className="layered-shade" />
          <span className="layered-index eyebrow">03 — Embroidery across forms</span>
          <div className="layered-captions">
            {layeredItems.map((item, index) => (
              <div className={`layered-caption ${index === 0 ? "is-active" : ""}`} key={item.title}>
                <span>{String(index + 1).padStart(2, "0")} / {String(layeredItems.length).padStart(2, "0")} · {item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.application}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="liquid-story">
        <div className="liquid-sticky">
          <Image className="liquid-fallback" src="/images/home-linen-floral.webp" alt="Soft dimensional floral embroidery on home linen" fill sizes="100vw" />
          <LiquidThreadCanvas />
          <div className="liquid-overlay" />
          <div className="liquid-copy">
            <span className="eyebrow">04 — Dimensional threadwork</span>
            <h2>Thread creates<br />depth.</h2>
            <p>Soft botanical stitches give the linen movement, character and dimension.</p>
          </div>
        </div>
      </section>

      <section className="seamless-gallery" aria-label="Seamless embroidery collection">
        <div className="seamless-heading">
          <span className="eyebrow">05 — Continuing collection</span>
          <h2>No hard ending.<br />Just more possibility.</h2>
        </div>
        {[0, 1].map((lane) => (
          <div className={`seamless-lane lane-${lane + 1}`} key={lane}>
            <div className="seamless-track">
              {[...seamlessItems, ...seamlessItems].map((item, index) => (
                <figure key={`${lane}-${item.title}-${index}`} aria-hidden={index >= seamlessItems.length}>
                  <Image src={item.image} alt={index < seamlessItems.length ? item.alt : ""} width={520} height={680} sizes="320px" />
                  <figcaption>{item.category} · {item.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
