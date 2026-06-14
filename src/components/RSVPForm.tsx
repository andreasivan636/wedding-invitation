"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

type AttendanceValue = "yes" | "no" | "";
type MealValue = "chicken" | "fish" | "vegetarian" | "";

interface FormState {
  name: string;
  email: string;
  guests: string;
  attendance: AttendanceValue;
  meal: MealValue;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function RSVPForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    guests: "1",
    attendance: "",
    meal: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: "12px",
    padding: "14px 18px",
    color: "var(--ivory)",
    fontFamily: "var(--font-cormorant)",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "6px",
    fontSize: "0.65rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "var(--gold)",
    fontFamily: "var(--font-inter)",
  };

  return (
    <section
      ref={ref}
      id="rsvp"
      className="relative py-28 px-6"
      style={{
        background: "linear-gradient(180deg, #0d0c15 0%, var(--deep) 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,169,110,0.06) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
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
            Kindly Reply By August 1st
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
            RSVP
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
          <motion.p
            custom={2.5}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.1rem",
              color: "rgba(245,240,232,0.55)",
              lineHeight: 1.7,
            }}
          >
            We hope you will join us on our special day.<br />
            Please let us know if you can make it.
          </motion.p>
        </div>

        {/* Form card */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
          style={{
            background: "var(--card)",
            border: "1px solid var(--card-border)",
          }}
        >
          {/* Card glow corners */}
          <div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(201,169,110,0.08), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
            style={{
              background: "radial-gradient(circle at bottom left, rgba(201,169,110,0.05), transparent 70%)",
            }}
          />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="text-5xl mb-6"
                >
                  💌
                </motion.div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "2rem",
                    color: "var(--ivory)",
                  }}
                >
                  Thank You!
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.1rem",
                    color: "rgba(245,240,232,0.6)",
                    lineHeight: 1.7,
                  }}
                >
                  Your RSVP has been received. We cannot wait to celebrate with you.
                </p>
                <div
                  className="ornament-divider mt-6 max-w-xs mx-auto"
                  style={{ color: "var(--gold)" }}
                >
                  ✦
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="rsvp-name" style={labelStyle}>Full Name</label>
                    <input
                      id="rsvp-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.2)")}
                    />
                  </div>
                  <div>
                    <label htmlFor="rsvp-email" style={labelStyle}>Email Address</label>
                    <input
                      id="rsvp-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.2)")}
                    />
                  </div>
                </div>

                {/* Attendance */}
                <div>
                  <label style={labelStyle}>Will you attend?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["yes", "no"] as const).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, attendance: val }))}
                        className="py-3 rounded-xl transition-all duration-200"
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontSize: "1rem",
                          border:
                            form.attendance === val
                              ? "1px solid var(--gold)"
                              : "1px solid rgba(201,169,110,0.2)",
                          background:
                            form.attendance === val
                              ? "rgba(201,169,110,0.12)"
                              : "rgba(255,255,255,0.03)",
                          color: form.attendance === val ? "var(--gold)" : "rgba(245,240,232,0.5)",
                        }}
                      >
                        {val === "yes" ? "✦ Joyfully Accept" : "✦ Regretfully Decline"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests + Meal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="rsvp-guests" style={labelStyle}>Number of Guests</label>
                    <select
                      id="rsvp-guests"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.2)")}
                    >
                      {["1", "2", "3", "4"].map((n) => (
                        <option key={n} value={n} style={{ background: "#12111a" }}>
                          {n} {n === "1" ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="rsvp-meal" style={labelStyle}>Meal Preference</label>
                    <select
                      id="rsvp-meal"
                      name="meal"
                      value={form.meal}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.2)")}
                    >
                      <option value="" style={{ background: "#12111a" }}>Select preference</option>
                      <option value="chicken" style={{ background: "#12111a" }}>Roasted Chicken</option>
                      <option value="fish" style={{ background: "#12111a" }}>Pan-Seared Salmon</option>
                      <option value="vegetarian" style={{ background: "#12111a" }}>Vegetarian</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="rsvp-message" style={labelStyle}>A Note for the Couple (Optional)</label>
                  <textarea
                    id="rsvp-message"
                    name="message"
                    rows={3}
                    placeholder="Share your wishes..."
                    value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.2)")}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "submitting" || !form.attendance}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl transition-all duration-300 relative overflow-hidden"
                  style={{
                    background:
                      status === "submitting" || !form.attendance
                        ? "rgba(201,169,110,0.3)"
                        : "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark))",
                    border: "1px solid rgba(201,169,110,0.4)",
                    color: "var(--deep)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    cursor:
                      status === "submitting" || !form.attendance ? "not-allowed" : "pointer",
                  }}
                >
                  {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send RSVP ✦"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
