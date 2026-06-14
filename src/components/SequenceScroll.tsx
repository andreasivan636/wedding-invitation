"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 384;

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index (0 to 191/383)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Transform values for storytelling sequence
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.25], [40, 0, -20]);

  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.45, 0.6], [40, 0, -20]);

  const opacity3 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.75, 0.85, 1], [40, 0, 0]);

  useEffect(() => {
    // Preload images
    const loadImages = () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;
        img.onload = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
        };
        loadedImages.push(img);
      }
      imagesRef.current = loadedImages;
    };

    loadImages();
  }, []);

  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    // Ensure canvas dimensions match window
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Object-cover logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (imagesRef.current.length > 0) {
      drawImage(Math.floor(latest));
    }
  });

  // Redraw on resize
  useEffect(() => {
    const handleResize = () => {
      if (imagesRef.current.length > 0) {
        drawImage(Math.floor(frameIndex.get()));
      }
    };

    window.addEventListener("resize", handleResize);
    // Initial draw in case resize fires before scroll
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [frameIndex]);

  // Draw the first frame once loaded
  useEffect(() => {
    if (imagesLoaded > 0 && Math.floor(frameIndex.get()) === 0) {
      drawImage(0);
    }
  }, [imagesLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="h-[800vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Storytelling Sequence: Block 1 */}
        <motion.div 
          className="absolute bottom-32 left-8 md:left-24 max-w-sm text-left pointer-events-none mix-blend-screen z-10 p-6"
          style={{ opacity: opacity1, y: y1 }}
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg" 
            style={{ fontFamily: "var(--font-playfair)", color: "#fff9f0" }}
          >
            A Love Forged in Time
          </h2>
        </motion.div>

        {/* Storytelling Sequence: Block 2 */}
        <motion.div 
          className="absolute top-40 right-8 md:right-24 max-w-sm text-right pointer-events-none mix-blend-screen z-10 p-6"
          style={{ opacity: opacity2, y: y2 }}
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg" 
            style={{ fontFamily: "var(--font-playfair)", color: "#fff9f0" }}
          >
            Two Souls,<br />One Beautiful Journey
          </h2>
        </motion.div>

        {/* Storytelling Sequence: Block 3 */}
        <motion.div 
          className="absolute inset-x-0 bottom-24 flex flex-col items-center pointer-events-none z-10 p-6 text-center"
          style={{ opacity: opacity3, y: y3 }}
        >
          <p 
            className="text-xs md:text-sm tracking-[0.4em] font-medium uppercase mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}
          >
            Are Getting Married
          </p>
          <h1 
            className="text-5xl md:text-8xl lg:text-[9rem] leading-none select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "var(--font-playfair)", color: "#fefcf6" }}
          >
            Annisa
            <span 
              className="block italic my-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
              style={{ color: "var(--gold)", fontSize: "0.5em", letterSpacing: "0.12em" }}
            >
              &amp;
            </span>
            Alexander
          </h1>
        </motion.div>

      </div>
    </div>
  );
}
