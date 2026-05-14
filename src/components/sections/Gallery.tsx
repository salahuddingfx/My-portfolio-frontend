"use client";

import { motion } from "framer-motion";
import { Maximize2, Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1000"
];

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-shell relative bg-black overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="section-kicker">Atmosphere</span>
          <h2 className="section-title mx-auto">Visual <span className="text-accent">Archive.</span></h2>
          <p className="section-copy">A collection of cinematic moments stored in your digital archive.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              onClick={() => setSelectedImg(img)}
              className="group relative cursor-pointer"
            >
              {/* Photo Folder Tab */}
              <div className="flex items-end mb-[-1px]">
                <div className="px-4 py-1.5 bg-[#111] border-t border-l border-r border-white/5 rounded-t-lg relative z-10 flex items-center gap-2">
                  <Camera size={12} className="text-accent" />
                  <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-white/30">IMG_{String(i + 1).padStart(3, "0")}</span>
                </div>
                <div className="h-3 w-8 bg-black border-b border-white/5 skew-x-[30deg] translate-x-[-10px]"></div>
              </div>

              {/* Photo Card Body */}
              <div className="relative aspect-[4/5] rounded-xl rounded-tl-none overflow-hidden border border-white/5 group-hover:border-accent/30 bg-neutral-900 transition-all duration-500 shadow-2xl">
                <Image
                  src={img}
                  alt={`Gallery ${i}`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 size={20} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-mono text-[10px] text-white/60 tracking-[0.2em] uppercase">Open Archive</p>
                </div>
              </div>

              {/* Decorative Stack Layer */}
              <div className="absolute top-4 left-4 right-[-4px] bottom-[-4px] border border-white/5 rounded-xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-black/98 backdrop-blur-3xl"
          >
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute top-8 right-8 z-[210] w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-2xl"
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <Image 
                src={selectedImg} 
                alt="Gallery Preview" 
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
