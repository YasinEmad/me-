"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  accent: string;
  github: string;
  website: string;
  animation?: string;
  images: string[];
  year?: string;
};

function LottieContainer({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ensureScript = () => {
      if (!document.querySelector('script[data-lottie]')) {
        const s = document.createElement('script');
        s.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
        s.setAttribute('data-lottie', 'true');
        document.head.appendChild(s);
        s.onload = () => renderPlayer();
      } else {
        renderPlayer();
      }
    };

    const renderPlayer = () => {
      if (!ref.current) return;
      const source = encodeURI(src);
      ref.current.innerHTML = `<lottie-player src="${source}" background="transparent" speed="1" loop autoplay style="width:100%;height:100%;display:block;"></lottie-player>`;
    };

    ensureScript();

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, [src]);

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
}

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function ProjectImageCard({ project }: { project: Project }) {
  const { images, accent, github, website } = project;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const total = images.length;

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent(prev => (prev + dir + total) % total);
  }, [total]);

  useEffect(() => {
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [go]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 1.04 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.96 }),
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      borderRadius: 24, overflow: "hidden",
      position: "relative",
      background: "#ffffff",
    }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            style={{ position: "absolute", inset: 0 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => { setIsDragging(true); dragStart.current = Date.now(); }}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              if (Math.abs(info.offset.x) > 40) go(info.offset.x < 0 ? 1 : -1);
            }}
          >
            <img
              src={images[current]}
              alt={`${project.title} screenshot ${current + 1}`}
              draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "contain", userSelect: "none" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {[{ dir: -1, Icon: ChevronLeft, side: "left" }, { dir: 1, Icon: ChevronRight, side: "right" }].map(({ dir, Icon, side }) => (
        <button
          key={side}
          onClick={() => go(dir)}
          style={{
            position: "absolute", top: "50%", [side]: 14,
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(12, 11, 11, 0.32)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0, 0, 0, 0.18)"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
        >
          <Icon />
        </button>
      ))}

      <div style={{
        position: "absolute", bottom: 70, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 6, zIndex: 10,
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            style={{
              width: i === current ? 20 : 6, height: 6,
              borderRadius: 999,
              background: i === current ? "white" : "rgba(255,255,255,0.4)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
            }}
          />
        ))}
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "14px 18px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 13, fontStyle: "italic",
            color: "rgba(255, 255, 255, 0.8)",
          }}>
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "7px 14px", borderRadius: 999,
              background: "rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.14)",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12, fontWeight: 500,
              textDecoration: "none", letterSpacing: "0.04em",
              transition: "background 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <GithubIcon />
            GitHub
          </a>

          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "7px 14px", borderRadius: 999,
              background: accent,
              border: `1px solid ${accent}`,
              color: "#0f0f0f",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12, fontWeight: 600,
              textDecoration: "none", letterSpacing: "0.04em",
              transition: "opacity 0.2s ease, transform 0.15s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <ExternalIcon />
            Website
          </a>
        </div>
      </div>
    </div>
  );
}

function MagneticCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `perspective(900px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) scale(1.015)`;
    el.style.boxShadow = `none`;
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    el.style.boxShadow = "none";
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        width: "100%", height: "100%",
        borderRadius: 24, overflow: "hidden",
        boxShadow: "none",
        transition: "transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease",
        willChange: "transform",
      }}>
      {children}
    </div>
  );
}

export default function ProjectRow({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [linkHovered, setLinkHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  const cardY       = useTransform(smoothProgress, [0, 0.4, 1], [90,  0, -40]);
  const cardScale   = useTransform(smoothProgress, [0, 0.35, 1], [0.88, 1, 0.97]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [0, 1, 1, 0.6]);
  const cardRotate  = useTransform(smoothProgress, [0, 0.4, 1], [isEven ? 2.5 : -2.5, 0, 0]);

  const descX       = useTransform(smoothProgress, [0, 0.4, 1], [isEven ? -60 : 60, 0, 0]);
  const descOpacity = useTransform(smoothProgress, [0, 0.3, 0.9, 1], [0, 1, 1, 0.5]);

  const numY        = useTransform(smoothProgress, [0, 1], [60, -60]);
  const numOpacity  = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0.045, 0.045, 0]);

  const underlineScaleX = useTransform(smoothProgress, [0.25, 0.55], [0, 1]);
  const tagBlur = useTransform(smoothProgress, [0.1, 0.4], ["blur(6px)", "blur(0px)"]);
  const dotScale = useTransform(smoothProgress, [0.05, 0.35], [0, 1]);

  const descriptionSentences = project.description.match(/[^.?!]+[.?!]*/g) || [project.description];
  const splitIndex = Math.ceil(descriptionSentences.length / 2);
  const descriptionFirstHalf = descriptionSentences.slice(0, splitIndex).join(" ").trim();
  const descriptionSecondHalf = descriptionSentences.slice(splitIndex).join(" ").trim();

  const desc = (
    <motion.div style={{ x: descX, opacity: descOpacity, position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 11, fontStyle: "italic", color: "#c4c4c8", letterSpacing: "0.12em" }}>{project.id}</span>
        <div style={{ height: 1, width: 16, background: "rgba(0,0,0,0.1)" }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c4c4c8" }}>{project.year}</span>
        <div style={{ height: 1, width: 16, background: "rgba(0,0,0,0.1)" }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c4c4c8" }}>{project.subtitle}</span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.4rem,4.8vw,4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 10px", color: "#0f0f0f" }}>
          {project.title}
        </h2>
        <motion.div style={{ height: 3, background: project.accent, borderRadius: 2, scaleX: underlineScaleX, transformOrigin: "left" }} />
      </div>

      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.9rem,1.2vw,1rem)", lineHeight: 1.85, fontWeight: 300, color: "#52525b", margin: "0 0 16px", maxWidth: 460 }}>
        {descriptionFirstHalf}
      </p>
      {descriptionSecondHalf && (
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.9rem,1.2vw,1rem)", lineHeight: 1.85, fontWeight: 300, color: "#52525b", margin: "0 0 24px", maxWidth: 460 }}>
          {descriptionSecondHalf}
        </p>
      )}

      <motion.div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24, filter: tagBlur }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "5px 13px", borderRadius: 999,
            border: `1px solid ${project.accent}55`,
            color: "#52525b", background: `${project.accent}0d`,
          }}>
            {tag}
          </span>
        ))}
      </motion.div>

      <div>
        <a
          href={project.website}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setLinkHovered(true)}
          onMouseLeave={() => setLinkHovered(false)}
          style={{ display: "inline-flex", alignItems: "center", gap: 0, textDecoration: "none" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 36, height: 36, borderRadius: "50%",
            background: linkHovered ? "#18181b" : "transparent",
            border: "1.5px solid #18181b", marginRight: 12,
            transition: "background 0.25s ease",
          }}>
            <span style={{ color: linkHovered ? "white" : "#18181b", fontSize: 14, display: "inline-block", transition: "transform 0.25s ease, color 0.25s ease", transform: linkHovered ? "translateX(2px)" : "none" }}>→</span>
          </span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#18181b" }}>
            View Project
          </span>
        </a>
      </div>
    </motion.div>
  );

  const card = (
    <motion.div style={{ height: "clamp(500px,60vw,700px)", y: cardY, scale: cardScale, opacity: cardOpacity, rotate: cardRotate, zIndex: 1 }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {project.animation && (
          <div style={{
            position: 'absolute',
            top: project.id === "03" ? -80 : -60,
            left: '50%',
            transform: 'translateX(-50%)',
            width: project.id === "02" ? 420 : project.id === "03" ? 520 : 320,
            height: project.id === "02" ? 260 : project.id === "03" ? 320 : 180,
            zIndex: 12,
          }}>
            <LottieContainer src={project.animation} />
          </div>
        )}

        <MagneticCard>
          <ProjectImageCard project={project} />
        </MagneticCard>
      </div>
    </motion.div>
  );

  return (
    <div ref={rowRef} className="ps-proj-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,8rem)", alignItems: "center", padding: "clamp(5rem,9vw,8rem) 0", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.07)" }}>
        <motion.div style={{
          position: "absolute",
          left: isEven ? "33%" : "66%", top: "50%", y: "-50%",
          width: 7, height: 7, borderRadius: "50%",
          background: project.accent,
          boxShadow: `0 0 12px ${project.accent}99`,
          scale: dotScale,
        }} />
      </div>

      <motion.div style={{
        position: "absolute",
        [isEven ? "right" : "left"]: "-0.5rem",
        top: "50%",
        y: numY,
        opacity: numOpacity,
        translateY: "-50%",
        fontFamily: "'Playfair Display',serif",
        fontSize: "clamp(7rem,15vw,13rem)",
        fontWeight: 900, color: "#18181b",
        lineHeight: 1, letterSpacing: "-0.05em",
        userSelect: "none", pointerEvents: "none", zIndex: 0,
      }}>
        {project.id}
      </motion.div>

      {isEven ? <>{desc}{card}</> : <>{card}{desc}</>}
    </div>
  );
}
