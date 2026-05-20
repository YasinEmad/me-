"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ContactSection from "./contact";

export default function ProjectsContactStack() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // حساب السكرول بالنسبة لسيكشن الـ Contact فقط وهو قادم من الأسفل
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // تأثير صعود كارت الـ Contact من أسفل الشاشة وتكبير حجمه بنعومة أثناء السكرول الطبيعي لصفحة الموقع
  const contactY = useTransform(scrollYProgress, [0, 0.8], ["100px", "0px"]);
  const contactOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const contactScale = useTransform(scrollYProgress, [0, 0.8], [0.95, 1]);

  return (
    // h-auto عادي جداً يخليه يتدفق طبيعي مع الصفحة بدون تعقيد أو حبس للسكرول
    <section ref={containerRef} className="relative w-full h-auto py-20 z-20">
      <motion.div
        style={{
          y: contactY,
          opacity: contactOpacity,
          scale: contactScale,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
        className="w-full h-full"
      >
        <ContactSection />
      </motion.div>
    </section>
  );
}