"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 text-center overflow-hidden"
      style={{ background: "var(--deep)", borderTop: "1px solid rgba(201,169,110,0.1)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,169,110,0.04) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: "var(--ivory)",
          }}
        >
          Sophia <span style={{ color: "var(--gold)", fontStyle: "italic" }}>&amp;</span> Alexander
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-3"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1rem",
            color: "rgba(245,240,232,0.4)",
            letterSpacing: "0.2em",
          }}
        >
          14 · September · 2025 · San Francisco
        </motion.p>

        <div
          className="ornament-divider mt-8 max-w-xs mx-auto"
          style={{ color: "rgba(201,169,110,0.4)" }}
        >
          ✦
        </div>

        <p
          className="mt-6 text-xs"
          style={{
            fontFamily: "var(--font-inter)",
            color: "rgba(245,240,232,0.2)",
            letterSpacing: "0.15em",
          }}
        >
          Made with love · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
