import Link from "next/link";
import { ArrowIcon } from "@/components/Primitives";

export default function NotFound() {
  return <main id="main-content" className="not-found"><span className="eyebrow">404 — Thread lost</span><h1>This path has<br />come undone.</h1><p>Let&apos;s take you back to the Bandoliya Textiles collection.</p><Link className="button button-light" href="/">Return home <ArrowIcon /></Link></main>;
}
