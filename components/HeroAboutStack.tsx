"use client";

import { useRef } from "react";
// ضفنا useMotionValueEvent عشان نراقب الحركة لحظة بلحظة
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import AboutPage from "./aboutme";
import Hero from "./Hero";

export default function HeroAboutStack() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // عملنا Ref مخصوص للـ Container الداخلي المسؤول عن سكرول الـ About
  const aboutScrollRef = useRef<HTMLDivElement | null>(null);

  // 1. حساب الـ Scroll Progress الخام
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 🔥 الحل السحري: تصفير السكرول الداخلي أوتوماتيكياً أثناء الحركة
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // طول ما الـ progress في مرحلة الصعود أو النزول ولم يستقر تماماً (تحت الـ 0.48)
    // بنجبر الـ div الداخلي إنه يرجع لـ فوق خالص (top: 0)
    if (latest < 0.48 && aboutScrollRef.current) {
      aboutScrollRef.current.scrollTop = 0;
    }
  });

  // 2. أنميشن الـ Hero
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-15%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 0.3, 0]);
  const heroVisibility = useTransform(scrollYProgress, (value) => value >= 0.48 ? "hidden" : "visible");

  // 3. أنميشن الـ About
  const aboutY = useTransform(scrollYProgress, [0, 0.5], ["100vh", "0vh"]);
  const aboutScale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1]);

  // قفل وتفعيل الـ Overflow ديناميكياً لمنع الـ Skip
  const aboutOverflow = useTransform(scrollYProgress, (value) => 
    value >= 0.5 ? "auto" : "hidden"
  );

  // تأمين الـ Pointer Events مع الـ Overflow
  const aboutPointerEvents = useTransform(scrollYProgress, (value) => 
    value >= 0.5 ? "auto" : "none"
  );

  return (
    <section id="hero" ref={containerRef} className="relative h-[300vh] z-10" style={{ scrollMarginTop: 96 }}>
      <div id="about" className="absolute left-0 top-[110vh] h-px w-full pointer-events-none" style={{ scrollMarginTop: 96 }} />

      {/* الـ Sticky Wrapper الثابت جوة الشاشة */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        
        {/* طبقة الـ Hero (الكارت السفلي) */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-center w-full h-full"
          style={{
            y: heroY,
            scale: heroScale,
            opacity: heroOpacity,
            visibility: heroVisibility,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-full rounded-[2rem] bg-gradient-to-b from-white/90 via-white/40 to-transparent"
            style={{ zIndex: -1 }}
          />
          <Hero />
        </motion.div>

        {/* طبقة الـ About (الكارت العلوي) */}
        <motion.div
          className="absolute inset-0 z-20 w-full h-full"
          style={{
            y: aboutY,
            scale: aboutScale,
            pointerEvents: aboutPointerEvents,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/100 via-white/80 to-transparent"
            style={{ zIndex: -1 }}
          />
          
          {/* الـ Scrolling container الداخلي - تم ربطه بـ aboutScrollRef */}
          <motion.div 
            ref={aboutScrollRef}
            className="w-full h-full"
            style={{ overflowY: aboutOverflow }}
          >
            <AboutPage />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}