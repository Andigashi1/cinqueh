"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";
import type { WorkImage } from "@/lib/workImages";
import ArrowIcon from "./ArrowIcon";

export default function WorkGallery({ title, intro, images }: { title: string; intro?: string; images: WorkImage[] }) {
  const t = useTranslations("common");
  const descriptions = useTranslations("images");
  const sectionRef = useReveal<HTMLElement>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const titleId = useId();
  const captionId = useId();
  const current = active === null ? null : images[active];

  function openImage(index: number) {
    if (!dialogRef.current || dialogRef.current.open) return;
    setActive(index);
    dialogRef.current.showModal();
  }
  function closeViewer() {
    dialogRef.current?.close();
    setActive(null);
  }
  function moveImage(direction: number) {
    setActive((index) => index === null ? null : (index + direction + images.length) % images.length);
  }

  return (
    <section ref={sectionRef} className="section-space reveal" aria-labelledby={titleId}>
      <div className="site-container">
        <div className="section-intro">
          <h2 id={titleId} className="section-heading">{title}</h2>
          <p>{intro || t("galleryHint")}</p>
        </div>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <figure key={image.description} className="gallery-item">
              <button type="button" className="gallery-button"
                onClick={() => openImage(index)}
                aria-label={t("openImage", { description: descriptions(image.description) })}
                aria-haspopup="dialog">
                <Image src={image.src} alt={descriptions(image.description)} fill
                  sizes="(max-width: 767px) calc((100vw - 64px) / 2), (max-width: 1328px) calc((100vw - 108px) / 4), 305px" />
                <span className="gallery-open"><ArrowIcon diagonal /></span>
              </button>
              <figcaption>{descriptions(image.description)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <dialog ref={dialogRef} className="image-viewer on-dark" aria-label={t("galleryLabel")}
        aria-describedby={captionId} onClose={closeViewer}
        onCancel={(event) => { event.preventDefault(); closeViewer(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); moveImage(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); moveImage(1); }
        }}>
        <div className="viewer-toolbar">
          <p>{title}</p>
          <button type="button" onClick={closeViewer}>{t("closeViewer")}</button>
        </div>
        {current && <div className="viewer-image">
          <Image src={current.src} alt={descriptions(current.description)} fill
            sizes="(max-width: 1232px) calc(100vw - 64px), 1168px" />
        </div>}
        <p id={captionId} className="viewer-caption" aria-live="polite">{current ? descriptions(current.description) : ""}</p>
        <div className="viewer-controls">
          <button type="button" onClick={() => moveImage(-1)}>{t("previousImage")}</button>
          <p aria-live="polite" aria-atomic="true">{active !== null && t("imageCount", { current: active + 1, total: images.length })}</p>
          <button type="button" onClick={() => moveImage(1)}>{t("nextImage")}</button>
        </div>
      </dialog>
    </section>
  );
}
