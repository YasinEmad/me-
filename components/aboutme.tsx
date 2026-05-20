"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ─── DATA ───────────────────────────────────────────────── */
const stats = [
  { value: "2+", label: "Years building" },
  { value: "18+", label: "Projects" },
  { value: "10+", label: "Technologies" },
  { value: "∞", label: "Coffee cups" },
];

const stack = [
  "Next.js", "TypeScript", "React", "Tailwind CSS", "Node.js","nest.js", "Prisma", "docker",
  "Figma", "PostgreSQL","mongodb", "Framer Motion", "GSAP", "Redis", "web sockets",
];

const facts = [
  { num: "001", text: "Started coding at 19 by trying to learn how text changes on the screen — broke everything at first, then slowly figured out how it actually works, and kept going from there" },
  { num: "002", text: "I like chess because strategy matters, historical books because context matters" },
  { num: "003", text: "I enjoy solving problems created by me or others " },
];

/* ─── HOOK: scroll-triggered visibility ─────────────────── */
function useReveal(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function RevealBlock({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: "#a1a1aa", letterSpacing: "0.15em" }}>
        {number}
      </span>
      <div style={{ height: 1, width: 32, background: "rgba(0,0,0,0.15)" }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
        letterSpacing: "0.25em", textTransform: "uppercase", color: "#71717a",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────── */
export default function AboutPage() {

  useEffect(() => {
    if (!document.getElementById("about-page-styles")) {
      const style = document.createElement("style");
      style.id = "about-page-styles";
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes ap-fadeUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ap-fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes ap-slideIn { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes ap-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ap-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ap-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .ap-font-display { font-family:'Playfair Display',Georgia,serif; }
        .ap-font-body    { font-family:'DM Sans',sans-serif; }

        .ap-hero-1 { animation:ap-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .ap-hero-2 { animation:ap-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.2s  both; }
        .ap-hero-3 { animation:ap-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.35s both; }
        .ap-hero-5 { animation:ap-fadeIn 1s   ease                      0.5s  both; }

        .ap-line-reveal {
          display:block; height:1px; background:rgba(0,0,0,0.12);
          transform-origin:left;
          animation:ap-slideIn 1s cubic-bezier(.22,1,.36,1) 0.6s both;
        }

        .ap-spin    { animation:ap-spin    22s linear     infinite; }
        .ap-marquee-track { animation:ap-marquee 22s linear infinite; }
        .ap-marquee-track:hover { animation-play-state:paused; }

        .ap-move-section {
          animation:ap-moveSection 10s ease-in-out infinite alternate;
        }

        @keyframes ap-moveSection {
          0% { transform: translateY(10px); opacity: 0.96; }
          50% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0.97; }
        }

        .ap-stack-chip {
          transition:background 0.2s ease,color 0.2s ease,transform 0.15s ease;
          cursor:default;
        }
        .ap-stack-chip:hover {
          background:#18181b !important;
          color:#fafafa !important;
          transform:translateY(-2px);
        }

        .ap-custom-cursor {
          position:fixed;
          width:36px; height:36px;
          border-radius:50%;
          border:1.5px solid rgba(0,0,0,0.3);
          pointer-events:none;
          z-index:9999;
          mix-blend-mode:multiply;
        }

        .ap-fact-row {
          display:flex;
          gap:2rem;
          align-items:flex-start;
          padding:1.5rem 0;
          border-bottom:1px solid rgba(0,0,0,0.07);
          transition:padding-left 0.25s ease;
        }
        .ap-fact-row:last-child { border-bottom:none; }
        .ap-fact-row:hover { padding-left:8px; }

        .ap-highlight {
          font-style:italic;
          font-family:'Playfair Display',serif;
          background:rgba(0,0,0,0.05);
          border-radius:3px;
          padding:0 4px;
        }

        @media (max-width:768px) {
          .ap-who-grid   { grid-template-columns:1fr !important; }
          .ap-stats-grid { grid-template-columns:repeat(2,1fr) !important; }
          .ap-hero-2     { grid-template-columns:1fr !important; gap:1.5rem !important; }
          .ap-hero-3     { max-width:100% !important; }
          .ap-fact-row   { flex-direction:column; gap:1rem; align-items:flex-start; }
          .ap-fact-row span { min-width:auto !important; }
        }
      `;
      document.head.appendChild(style);
    }

    if (!document.getElementById("lottie-player-script")) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      script.id = "lottie-player-script";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="ap-font-body ap-move-section" style={{ color: "#18181b", overflowX: "hidden", scrollMarginTop: 96 }}>

      {/* ══════════════════════════════════════════════
          HERO — full-width, no image, no buttons
      ══════════════════════════════════════════════ */}
      <section
        style={{
        padding: "clamp(2rem,6vw,4rem) clamp(1.5rem,5vw,4rem) clamp(2rem,6vw,4rem)",
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Eyebrow */}
        <div className="ap-hero-1" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2.5rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#18181b" }} />
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#71717a" }}>
            About me
          </span>
        </div>

        {/* Full-width headline + animation */}
        <div className="ap-hero-2 grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center" style={{ marginBottom: "2.5rem" }}>
          <h1
            className="ap-font-display"
            style={{
              fontSize: "clamp(3.2rem,7.5vw,6rem)",
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: 820,
            }}
          >
            Where
            <br />
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "#71717a",
              }}
            >
              engineering meets,
            </span>
            <br />
            design precision
            <br />
            
          </h1>
          <div className="w-full max-w-[420px] min-h-[260px] sm:min-h-[320px]">
            <div
              className="w-full h-full min-h-[260px] sm:min-h-[320px]"
              dangerouslySetInnerHTML={{
                __html:
                  '<lottie-player src="/about.json" background="transparent" speed="1" loop autoplay style="width:100%;height:100%;"></lottie-player>',
              }}
            />
          </div>
        </div>

        {/* Intro text */}
        <div className="ap-hero-3" style={{ maxWidth: 560 }}>
          <p style={{ fontSize: "clamp(1rem,1.5vw,1.15rem)", lineHeight: 1.9, fontWeight: 300, color: "#52525b", margin: 0 }}>
            I'm a full-stack developer with a designer's eye and an engineer's rigour. I live in the space where{" "}
            <span className="ap-highlight">beautiful things work well</span>
            {" "}— and boring things are made beautiful.
          </p>
        </div>

        {/* Divider */}
        <div style={{ marginTop: "4rem" }}>
          <span className="ap-line-reveal" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════ */}
      <section style={{ borderTop: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem,5vw,4rem)" }}>
          <div className="ap-stats-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <RevealBlock key={s.label} delay={i * 80}>
                <div style={{
                  padding: "clamp(2rem,4vw,3rem) 0",
                  borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
                  paddingRight: i < stats.length - 1 ? "clamp(1rem,3vw,2.5rem)" : 0,
                  paddingLeft: i > 0 ? "clamp(1rem,3vw,2.5rem)" : 0,
                }}>
                  <div className="ap-font-display" style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div className="ap-font-body" style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a1a1aa", marginTop: 8 }}>
                    {s.label}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHO IS YASIN ANYWAY
      ══════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(2rem,6vw,4rem) clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <RevealBlock>
          <SectionLabel number="02" label="Who is Yasin anyway" />
        </RevealBlock>

        <div className="ap-who-grid grid gap-[clamp(3rem,6vw,6rem)] md:grid-cols-2" style={{ alignItems: "start" }}>

          {/* Left: editorial pull-quote + body copy */}
          <RevealBlock delay={60}>
            <div>
              <blockquote className="ap-font-display" style={{
                fontSize: "clamp(1.5rem,2.8vw,2.2rem)",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 1.28,
                letterSpacing: "-0.02em",
                color: "#18181b",
                margin: "0 0 2.5rem",
                paddingLeft: "1.5rem",
                borderLeft: "3px solid #18181b",
              }}>
                "I don't just write code — I craft the experience people have while using it."
              </blockquote>

              <p className="ap-font-body" style={{ fontSize: "clamp(0.95rem,1.3vw,1.05rem)", lineHeight: 1.9, fontWeight: 300, color: "#52525b", margin: "0 0 1.25rem" }}>

Software Engineer. Cyber Security graduate from HITU.
        Curious enough to debug problems for hours and still call it “learning”.                <span className="ap-highlight">look</span> and how they <span className="ap-highlight">work</span>
                {" "}
              </p>
              <p className="ap-font-body" style={{ fontSize: "clamp(0.95rem,1.3vw,1.05rem)", lineHeight: 1.9, fontWeight: 300, color: "#52525b", margin: "0 0 1.25rem" }}>
Today, I build full-stack web applications with a focus on both design and engineering decisions — choosing the right architecture, understanding business logic, and translating requirements into scalable systems. I pay attention to every detail, from component structure and state management to loading behavior, error handling, and micro-interactions. Ultimately, I aim to craft products where the invisible details are as considered as the visible ones, separating something that simply works from something that feels intentional and well-built.              </p>
            </div>
          </RevealBlock>

          {/* Right: numbered facts + sign-off */}
          <RevealBlock delay={160}>
            <div>
              {facts.map((f) => (
                <div key={f.num} className="ap-fact-row">
                  <span className="ap-font-display" style={{
                    fontSize: 11,
                    color: "#d4d4d8",
                    letterSpacing: "0.12em",
                    fontStyle: "italic",
                    flexShrink: 0,
                    paddingTop: 2,
                    minWidth: 34,
                  }}>
                    {f.num}
                  </span>
                  <p className="ap-font-body" style={{ fontSize: 14, lineHeight: 1.8, fontWeight: 300, color: "#52525b", margin: 0 }}>
                    {f.text}
                  </p>
                </div>
              ))}

              {/* Signature sign-off */}
              <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ height: 1, width: 32, background: "rgba(0,0,0,0.15)" }} />
                <span className="ap-font-display" style={{ fontSize: 24, fontStyle: "italic", color: "#b4b4b8", letterSpacing: "0.02em" }}>
                  Yasin
                </span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STACK MARQUEE
      ══════════════════════════════════════════════ */}

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