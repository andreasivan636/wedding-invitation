"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

interface EventCardProps {
  type: string;
  time: string;
  venue: string;
  address: string;
  details: string;
  index: number;
  isInView: boolean;
}

function EventCard({ type, time, venue, address, details, index, isInView }: EventCardProps) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative group rounded-3xl p-8 md:p-10 overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--card-border)",
      }}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-8 right-8 h-px origin-left"
        style={{
          background: "linear-gradient(90deg, var(--gold), transparent)",
        }}
      />

      {/* Corner glow */}
      <div
        className="absolute top-0 left-0 w-32 h-32 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top left, var(--gold), transparent 70%)",
        }}
      />

      {/* Event type label */}
      <p
        className="text-xs tracking-[0.4em] uppercase mb-6"
        style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}
      >
        {type}
      </p>

      {/* Large time display */}
      <div className="mb-6">
        <p
          className="leading-none"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "var(--ivory)",
          }}
        >
          {time}
        </p>
      </div>

      {/* Ornamental divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px" style={{ background: "rgba(201,169,110,0.2)" }} />
        <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>✦</span>
        <div className="flex-1 h-px" style={{ background: "rgba(201,169,110,0.2)" }} />
      </div>

      {/* Venue info */}
      <div className="space-y-1 mb-4">
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.3rem",
            color: "var(--ivory)",
          }}
        >
          {venue}
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1rem",
            color: "rgba(245,240,232,0.55)",
            lineHeight: 1.6,
          }}
        >
          {address}
        </p>
      </div>

      {/* Additional detail */}
      <p
        className="text-sm"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "0.95rem",
          color: "rgba(245,240,232,0.45)",
          fontStyle: "italic",
        }}
      >
        {details}
      </p>

      {/* Hover effect underline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500 group-hover:opacity-100 opacity-0"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }}
      />
    </motion.div>
  );
}

export default function EventDetails() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="event-details"
      className="relative py-28 px-6"
      style={{
        background: "linear-gradient(180deg, var(--deep) 0%, #0d0c15 100%)",
      }}
    >
      {/* Radial background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
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
            Mark Your Calendar
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
            Event Details
          </motion.h2>

          {/* Full date display */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 mb-2"
          >
            <span
              className="ornament-divider max-w-xs mx-auto text-sm"
              style={{ color: "var(--gold)" }}
            >
              ✦
            </span>
          </motion.div>
          <motion.p
            custom={2.5}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              color: "rgba(232,213,163,0.7)",
              letterSpacing: "0.2em",
            }}
          >
            Saturday, the Fourteenth of September, Two Thousand and Twenty-Five
          </motion.p>
        </div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard
            type="The Ceremony"
            time="4:00 PM"
            venue="St. Catherine's Cathedral"
            address="12 Rosewood Avenue, San Francisco, CA 94105"
            details="Guests are kindly requested to be seated by 3:45 PM"
            index={3}
            isInView={isInView}
          />
          <EventCard
            type="The Reception"
            time="7:00 PM"
            venue="The Grand Ballroom"
            address="One Market Plaza, San Francisco, CA 94105"
            details="Cocktail hour begins at 6:30 PM · Black tie optional"
            index={4}
            isInView={isInView}
          />
        </div>

        {/* Bottom note */}
        <motion.p
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-10"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1rem",
            color: "rgba(245,240,232,0.35)",
            fontStyle: "italic",
          }}
        >
          A shuttle service will be provided between venues every 30 minutes.
        </motion.p>
      </div>
    </section>
  );
}
