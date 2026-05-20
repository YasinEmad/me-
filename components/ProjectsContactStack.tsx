"use client";

import { useRef } from "react";
// ضفنا useMotionValueEvent لمراقبة التغيير اللحظي
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import ContactSection from "./contact";
import ProjectsSection from "./projects"; 

export default function ProjectsContactStack() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Ref داخلي مخصص للـ container المسؤول عن سكرول الـ Contact
  const contactScrollRef = useRef<HTMLDivElement | null>(null);

  // 1. حساب الـ Scroll Progress الخام لضمان المزامنة المباشرة مع الماوس
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 🔥 تصفير السكرول الداخلي للـ Contact أوتوماتيكياً بمجرد الصعود أو النزول (قبل الـ 0.48)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.48 && contactScrollRef.current) {
      contactScrollRef.current.scrollTop = 0;
    }
  });

  // 2. أنميشن الـ Projects (تعديل الـ Range لـ 0.5)
  const projectsY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-15%"]);
  const projectsScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);
  const projectsOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 0.3, 0]);
  const projectsVisibility = useTransform(scrollYProgress, (value) => value >= 0.48 ? "hidden" : "visible");

  // 3. أنميشن الـ Contact
  const contactY = useTransform(scrollYProgress, [0, 0.5], ["100vh", "0vh"]);
  const contactScale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1]);

  // 🔥 قفل وتفعيل الـ Overflow ديناميكياً لمنع الـ Skip المفاجئ مع السكرول السريع
  const contactOverflow = useTransform(scrollYProgress, (value) => 
    value >= 0.5 ? "auto" : "hidden"
  );

  // تأمين الـ Pointer Events بالتزامن مع الـ Overflow
  const contactPointerEvents = useTransform(scrollYProgress, (value) => 
    value >= 0.5 ? "auto" : "none"
  );

  return (
    <section ref={containerRef} className="relative h-[300vh] z-10">
      
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        
        {/* طبقة الـ Projects */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-center w-full h-full"
          style={{
            y: projectsY,
            scale: projectsScale,
            opacity: projectsOpacity,
            visibility: projectsVisibility,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <ProjectsSection /> 
        </motion.div>

        {/* طبقة الـ Contact */}
        <motion.div
          className="absolute inset-0 z-20 w-full h-full"
          style={{
            y: contactY,
            scale: contactScale,
            pointerEvents: contactPointerEvents,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/100 via-white/80 to-transparent"
            style={{ zIndex: -1 }}
          />
          
          {/* الـ Scrolling container الداخلي - تم ربطه بـ contactScrollRef وتزويده بالـ Overflow الديناميكي */}
          <motion.div 
            ref={contactScrollRef}
            className="w-full h-full"
            style={{ overflowY: contactOverflow }}
          >
            <ContactSection />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}