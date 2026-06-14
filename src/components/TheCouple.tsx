"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

interface PersonCardProps {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  index: number;
  isInView: boolean;
  className?: string;
}

function PersonCard({ name, role, description, imageSrc, index, isInView, className = "" }: PersonCardProps) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative overflow-hidden rounded-3xl group ${className}`}
      style={{
        background: "var(--card)",
        border: "1px solid var(--card-border)",
      }}
    >
      {/* Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--card) 0%, rgba(18,17,26,0.3) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 -mt-4 relative z-10">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-1"
          style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}
        >
          {role}
        </p>
        <h3
          className="text-2xl mb-3"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--ivory)" }}
        >
          {name}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)", color: "rgba(245,240,232,0.65)", fontSize: "1rem" }}
        >
          {description}
        </p>
      </div>

      {/* Gold corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-30"
        style={{
          background:
            "radial-gradient(circle at top right, var(--gold), transparent 70%)",
        }}
      />
    </motion.div>
  );
}

export default function TheCouple() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="the-couple"
      className="relative py-28 px-6"
      style={{ background: "var(--deep)" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
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
            Our Story
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
              lineHeight: 1.2,
            }}
          >
            The Couple
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Bride card — large */}
          <PersonCard
            name="Sophia Chen"
            role="The Bride"
            description="A passionate architect whose love for beauty shaped every corner of this celebration. She believes that love, like a well-designed space, should be both breathtaking and enduring."
            imageSrc="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80&auto=format&fit=crop"
            index={3}
            isInView={isInView}
            className="md:col-span-5"
          />

          {/* Center quote card */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-2 rounded-3xl flex flex-col items-center justify-center p-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(201,169,110,0.1), rgba(139,105,20,0.05))",
              border: "1px solid var(--card-border)",
              minHeight: "200px",
            }}
          >
            <span
              className="text-5xl mb-3 block"
              style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}
            >
              &amp;
            </span>
            <p
              className="italic text-sm leading-relaxed"
              style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}
            >
              Two souls,
              <br />
              one journey
            </p>
          </motion.div>

          {/* Groom card — large */}
          <PersonCard
            name="Alexander Voss"
            role="The Groom"
            description="A musician with a poet's heart, Alexander composes symphonies of ordinary moments into something extraordinary. He fell in love with Sophia the way dawn falls — slowly, then all at once."
            imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop"
            index={5}
            isInView={isInView}
            className="md:col-span-5"
          />

          {/* Full-width quote strip */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-12 rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(90deg, rgba(201,169,110,0.05), rgba(201,169,110,0.12), rgba(201,169,110,0.05))",
              border: "1px solid rgba(201,169,110,0.15)",
            }}
          >
            <blockquote
              className="italic"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                color: "var(--gold-light)",
                lineHeight: 1.7,
              }}
            >
              &ldquo;I have found the one whom my soul loves.&rdquo;
            </blockquote>
            <p
              className="mt-2 text-xs tracking-widest"
              style={{ color: "rgba(201,169,110,0.5)", fontFamily: "var(--font-inter)" }}
            >
              — Song of Solomon 3:4
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
