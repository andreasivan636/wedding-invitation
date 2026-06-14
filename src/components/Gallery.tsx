"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Masonry-style gallery items using Unsplash
const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&q=80&auto=format&fit=crop",
    alt: "Couple in a golden field",
    span: "row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=300&q=80&auto=format&fit=crop",
    alt: "Engagement ring detail",
    span: "row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=300&q=80&auto=format&fit=crop",
    alt: "Couple romantic moment",
    span: "row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1511285560929-80b456503681?w=800&h=600&q=80&auto=format&fit=crop",
    alt: "Romantic garden moment",
    span: "row-span-2",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=300&q=80&auto=format&fit=crop",
    alt: "Floral decoration detail",
    span: "row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&h=300&q=80&auto=format&fit=crop",
    alt: "Couple walking together",
    span: "row-span-1",
  },
];

interface GalleryItemProps {
  item: (typeof galleryItems)[0];
  index: number;
  isInView: boolean;
  onClick: () => void;
}

function GalleryItem({ item, index, isInView, onClick }: GalleryItemProps) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl ${item.span}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ minHeight: "200px" }}
        loading="lazy"
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,15,0.8) 0%, rgba(10,10,15,0.2) 60%, transparent 100%)",
        }}
      >
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}
        >
          View ✦
        </p>
      </div>

      {/* Gold border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: "1px solid rgba(201,169,110,0.4)" }}
      />
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative py-28 px-6"
      style={{ background: "var(--deep)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(201,169,110,0.04) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              color: "var(--gold)",
              textTransform: "uppercase",
            }}
          >
            Captured Moments
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-3"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--ivory)",
            }}
          >
            Our Gallery
          </motion.h2>
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="ornament-divider mt-4 max-w-xs mx-auto text-xs"
            style={{ color: "var(--gold)" }}
          >
            ✦
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          style={{ gridAutoRows: "200px" }}
        >
          {galleryItems.map((item, i) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={i + 3}
              isInView={isInView}
              onClick={() => setLightboxSrc(item.src)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer"
            style={{ background: "rgba(5,4,8,0.95)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightboxSrc(null)}
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={lightboxSrc}
              alt="Gallery full view"
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
              style={{ border: "1px solid rgba(201,169,110,0.3)" }}
            />
            <button
              className="absolute top-6 right-6 text-2xl"
              style={{ color: "var(--gold)" }}
              onClick={() => setLightboxSrc(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
