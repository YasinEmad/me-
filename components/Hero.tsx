"use client";
import { useEffect, useRef } from "react";
import { socials } from "../data/socials";
import { projects } from "../data/projects";
import { skills } from "../data/skills";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("lottie-player-script")) {
      const s = document.createElement("script");
      s.src =
        "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      s.id = "lottie-player-script";
      s.async = true;
      document.body.appendChild(s);
    }

    if (!document.getElementById("hero-styles")) {
      const style = document.createElement("style");
      style.id = "hero-styles";
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(10px) rotate(-3deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(1.06); }
        }
        @keyframes slideRight {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0,0); }
          10%  { transform: translate(-2%,-3%); }
          20%  { transform: translate(2%,2%); }
          30%  { transform: translate(-1%,4%); }
          40%  { transform: translate(3%,-1%); }
          50%  { transform: translate(-2%,1%); }
          60%  { transform: translate(1%,-2%); }
          70%  { transform: translate(-3%,3%); }
          80%  { transform: translate(2%,-2%); }
          90%  { transform: translate(-1%,2%); }
        }

        .hero-font-display { font-family: 'Playfair Display', Georgia, serif; }
        .hero-font-body    { font-family: 'DM Sans', sans-serif; }

        .hero-animate-1  { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.1s both; }
        .hero-animate-2  { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.25s both; }
        .hero-animate-3  { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.4s both; }
        .hero-animate-4  { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.55s both; }
        .hero-animate-5  { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.7s both; }
        .hero-animate-6  { animation: fadeIn 1s ease 0.9s both; }

        .hero-float-a { animation: floatA 6s ease-in-out infinite; }
        .hero-float-b { animation: floatB 8s ease-in-out infinite; }
        .hero-spin    { animation: spinSlow 18s linear infinite; }
        .hero-pulse   { animation: pulseRing 3.5s ease-in-out infinite; }

        .hero-line-reveal::after {
          content: '';
          display: block;
          height: 2px;
          background: currentColor;
          animation: slideRight 0.8s cubic-bezier(.22,1,.36,1) 0.9s both;
        }

        .hero-grain::before {
          content: '';
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
          opacity: 0.04;
          animation: grain 0.8s steps(1) infinite;
          pointer-events: none;
          z-index: 0;
        }

        .hero-tag:hover {
          background: rgba(0,0,0,0.07);
          border-color: rgba(0,0,0,0.25);
          transform: translateY(-1px);
        }
        .hero-tag {
          transition: all 0.2s ease;
        }

        .hero-lottie-ring {
          position: absolute;
          inset: -18px;
          border-radius: 50%;
          border: 1.5px dashed rgba(0,0,0,0.12);
          animation: spinSlow 30s linear infinite;
        }

        .hero-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #18181b;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
          flex-shrink: 0;
        }

        .hero-number {
          font-family: 'Playfair Display', serif;
          font-size: 11px;
          color: #a1a1aa;
          letter-spacing: 0.15em;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          user-select: none;
        }

        .hero-fuel {
          display: inline-block;
          padding: 0 0.25em;
          border-radius: 4px;
          white-space: normal;
        }
        .hero-font-display {
          overflow-wrap: break-word;
          word-break: break-word;
        }

        /* ── Stat badges: always visible but repositioned on mobile ── */
        .hero-badge-projects {
          position: absolute;
          background: #18181b;
          color: #fafafa;
          border-radius: 10px;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 500;
          z-index: 10;
          line-height: 1.4;
          display: flex;
          flex-direction: column;
          /* mobile: bottom-right inside the circle */
          bottom: 4%;
          right: 4%;
        }

        .hero-badge-skills {
          position: absolute;
          background: white;
          color: #18181b;
          border-radius: 10px;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 500;
          z-index: 10;
          border: 1px solid rgba(0,0,0,0.08);
          line-height: 1.4;
          display: flex;
          flex-direction: column;
          /* mobile: top-left inside the circle */
          top: 4%;
          left: 4%;
        }

        /* On sm+ screens restore the original bleed-out positions */
        @media (min-width: 640px) {
          .hero-badge-projects {
            bottom: 10%;
            right: -18px;
          }
          .hero-badge-skills {
            top: 8%;
            left: -18px;
          }
        }

        /* Lottie circle wrapper: clamp size tightly on mobile */
        .hero-lottie-wrap {
          position: relative;
          margin: 0 auto;
          /* full-width on xs, capped at 320 on sm, 420 on lg */
          width: min(72vw, 320px);
          height: min(72vw, 320px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .hero-lottie-wrap {
            width: min(360px, 90vw);
            height: min(360px, 90vw);
          }
        }
        @media (min-width: 1024px) {
          .hero-lottie-wrap {
            width: 420px;
            height: 420px;
          }
        }

        /* Bottom line lottie */
        .hero-line-lottie {
          width: 100%;
          max-width: 2000px;
          height: 60px;
          transform: scaleY(0.5);
          transform-origin: center;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const defaultSocials = [
    { label: "GitHub", url: "https://github.com/YasinEmad" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/yasin-emad-b4326529b/?skipRedirect=true" },
    { label: "Email", url: "mailto:yemad7676@gmail.com" },
  ];

  return (
    <section
      ref={containerRef}
      className="hero-font-body relative"
      style={{
        overflowX: "hidden",
        overflowY: "visible",
        /* tighter on mobile, generous on desktop */
        paddingTop: "clamp(1rem, 4vw, 3rem)",
        paddingBottom: "clamp(1rem, 4vw, 3rem)",
        /* ensure section doesn't overflow viewport */
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Decorative floating blobs — hidden on mobile to avoid overflow */}
      <div
        className="hero-float-a pointer-events-none absolute -top-20 -right-20 opacity-[0.07] hero-animate-6 hidden sm:block"
        style={{
          width: 340,
          height: 340,
          borderRadius: "40% 60% 55% 45% / 50% 40% 60% 50%",
          background: "radial-gradient(circle, #18181b 0%, transparent 70%)",
        }}
      />
      <div
        className="hero-float-b pointer-events-none absolute bottom-0 left-1/3 opacity-[0.05] hero-animate-6 hidden sm:block"
        style={{
          width: 220,
          height: 220,
          borderRadius: "60% 40% 45% 55% / 40% 55% 45% 60%",
          background: "radial-gradient(circle, #18181b 0%, transparent 70%)",
        }}
      />

      {/* Thin vertical rule on far left */}
      <div
        className="hero-animate-6 pointer-events-none absolute left-0 top-0 hidden lg:block"
        style={{ width: 1, height: "100%", background: "rgba(0,0,0,0.07)" }}
      />

      {/*
        Layout:
        - mobile  : single column, lottie on top (reversed order via flex-col-reverse)
        - lg+     : two-column grid
      */}
      <div className="relative z-10 flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_380px] lg:items-center lg:gap-16">

        {/* ── LOTTIE (top on mobile, right on desktop) ── */}
        <div className="hero-animate-6 hero-lottie-wrap lg:order-2">
          {/* Outer pulse ring */}
          <div
            className="hero-pulse pointer-events-none absolute inset-0 rounded-full hidden sm:block"
            style={{ border: "1.5px solid rgba(0,0,0,0.18)" }}
          />
          {/* Spinning dashed ring */}
          <div className="hero-lottie-ring pointer-events-none absolute hidden sm:block" />

          {/* Background circle */}
          <div
            style={{
              position: "absolute",
              inset: 16,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%, rgba(0,0,0,0.04) 0%, transparent 70%)",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          />

          {/* Corner accents — hidden on mobile so they don't bleed */}
          {[
            { top: -10, left: "50%", transform: "translateX(-50%)" },
            { bottom: -10, left: "50%", transform: "translateX(-50%)" },
            { left: -10, top: "50%", transform: "translateY(-50%)" },
            { right: -10, top: "50%", transform: "translateY(-50%)" },
          ].map((pos, i) => (
            <div
              key={i}
              className="hero-spin pointer-events-none absolute hidden sm:block"
              style={{
                ...pos,
                width: 20,
                height: 20,
                borderRadius: 2,
                border: "2px solid rgba(0,0,0,0.18)",
                background: "white",
                animationDuration: `${8 + i * 3}s`,
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            />
          ))}

          {/* Lottie animation */}
          <div
            className="relative z-20 flex items-center justify-center"
            style={{ width: "80%", height: "80%" }}
            dangerouslySetInnerHTML={{
              __html:
                '<lottie-player src="/12345.json" background="transparent" speed="1" loop autoplay style="display:block;width:100%;height:100%;"></lottie-player>',
            }}
          />

          {/* Stat badges — responsive via CSS classes */}
          <div className="hero-font-body hero-badge-projects hero-float-a">
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "Playfair Display, serif" }}>
              18+
            </div>
            <div style={{ opacity: 0.6, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Projects
            </div>
          </div>

          <div className="hero-font-body hero-badge-skills hero-float-b">
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "Playfair Display, serif" }}>
              20+
            </div>
            <div style={{ opacity: 0.5, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Skills
            </div>
          </div>
        </div>

        {/* ── LEFT COLUMN (content) ── */}
        <div className="flex gap-5 lg:order-1">
          {/* Side number rail — desktop only */}
          <div className="hidden flex-col items-center gap-4 pt-1 lg:flex">
            <span className="hero-number hero-animate-6">01 — PORTFOLIO</span>
            <div style={{ flex: 1, width: 1, background: "rgba(0,0,0,0.1)", minHeight: 60 }} />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div className="hero-animate-1 flex items-center gap-3">
              <span className="hero-dot" />
              <p className="hero-font-body text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">
                Hello, I'm Yasin
              </p>
            </div>

            {/* Headline */}
            <div className="hero-animate-2">
              <h1
                className="hero-font-display"
                style={{
                  /* starts at 2rem on tiny phones, grows to 4.2rem on desktop */
                  fontSize: "clamp(2rem, 7vw, 4.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "#0f0f0f",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                I build{" "}
                <span style={{ fontStyle: "italic", color: "#3f3f46" }}>powerful</span>
                <br />
                web software
                <br />
                <span
                  className="hero-fuel"
                  style={{
                    display: "inline-block",
                    background: "#18181b",
                    color: "#fafafa",
                  }}
                >
                  &nbsp;fueled by caffeine
                </span>
              </h1>
            </div>

            {/* Divider */}
            <div
              className="hero-animate-3 hero-line-reveal"
              style={{ color: "rgba(0,0,0,0.1)", maxWidth: 440 }}
            />

            {/* Body text */}
            <p
              className="hero-animate-3 max-w-full sm:max-w-lg text-sm sm:text-base leading-7 text-zinc-500"
              style={{ fontWeight: 300, letterSpacing: "0.01em" }}
            >

This portfolio is where my ideas turn into digital magic Expect smooth animations, clean code, and a little developer chaos. Scroll around and watch the wizardry happen            </p>

            {/* Social pills */}
            <div className="hero-animate-4 flex flex-wrap gap-2">
              {(socials || defaultSocials).map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-tag hero-font-body"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.12)",
                    /* slightly smaller padding on mobile */
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#18181b",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#18181b",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div
        className="hero-animate-6 hero-font-body mt-10 sm:mt-16 flex items-center gap-3"
        style={{
          color: "#a1a1aa",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        <div style={{ width: 32, height: 1, background: "rgba(0,0,0,0.18)" }} />
        Scroll to explore
      </div>

      {/* End hero line animation */}
      <div className="hero-animate-6 mt-10 flex justify-center">
        <div
          style={{
            width: "min(1000vw, 3000px)",
            height: "60px",
            maxWidth: 2000,
            transform: "scaleY(0.5)", // يقلل السمك فقط
            transformOrigin: "center",
          }}
          dangerouslySetInnerHTML={{
            __html:
              '<lottie-player src="/line.json" background="transparent" speed="1" loop autoplay style="width:100%;height:100%;"></lottie-player>',
          }}
        />
      </div>
    </section>
  );
}