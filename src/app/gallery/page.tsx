"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    alt: "Technology circuit board",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    alt: "Retro gaming setup",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
    alt: "Digital matrix",
  },
  {
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000",
    alt: "Laptop on desk",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
    alt: "Open office workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
    alt: "Robot figure",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    alt: "Woman working on laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1000",
    alt: "Technology objects",
  },
  {
    src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1000",
    alt: "Developer workspace",
  },
];

const fadeUp = {
  initial:     { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-40px" },
};

export default function GalleryPage() {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);

  return (
    <main className="min-h-screen bg-[var(--background)]" style={{ paddingTop: 'var(--navbar-height, 120px)', paddingBottom: '5rem' }}>
      <div className="container">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-xl"
          style={{ marginBottom: '3.5rem' }}
        >
          <span className="section-eyebrow">Gallery</span>
          <h1 className="section-heading mt-1" style={{ marginBottom: '1rem' }}>
            Visual archive.
          </h1>
          <p className="section-subtext text-sm">
            A collection of moments and atmospheres from the studio and beyond.
          </p>
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1rem' }}>
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => setSelected(img)}
              className="group relative aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface)] border border-[var(--border)] cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                  <Maximize2 size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
