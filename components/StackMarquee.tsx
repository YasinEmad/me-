export default function StackMarquee() {
  const stack = [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Node.js",
    "nest.js",
    "Prisma",
    "docker",
    "Figma",
    "PostgreSQL",
    "mongodb",
    "Framer Motion",
    "GSAP",
    "Redis",
    "web sockets",
  ];

  const chipStyle = {
    padding: "12px 24px",
    borderRadius: 999,
    border: "1px solid rgba(15, 23, 42, 0.08)",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.05em",
    color: "#0f172a",
    background: "rgba(255,255,255,0.92)",
    whiteSpace: "nowrap",
  } as const;

  return (
    <section
      id="skills"
      style={{
        borderTop: "1px solid rgba(0,0,0,0.08)",
        padding: "clamp(2rem,4vw,3rem) 0",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
        scrollMarginTop: 96,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: "#8b94a6", letterSpacing: "0.15em" }}>
              03
            </span>
            <span style={{ width: 36, height: 1, background: "rgba(15,23,42,0.12)" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#475569" }}>
              My stack
            </span>
          </div>
          <div style={{ textAlign: "center", maxWidth: 660 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(2.2rem,4vw,3rem)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#0f172a" }}>
              The tools I trust to bring ideas to life.
            </h2>
         
          </div>
        </div>

        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 14, width: "max-content", animation: "stack-scroll-left 26s linear infinite" }}>
            {[...stack, ...stack].map((tech, i) => (
              <div key={`top-${i}`} style={chipStyle}>
                {tech}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, width: "max-content", animation: "stack-scroll-right 28s linear infinite", marginTop: 16 }}>
            {[...stack, ...stack].map((tech, i) => (
              <div key={`bottom-${i}`} style={{ ...chipStyle, background: "rgba(248,250,252,0.95)", color: "#334155" }}>
                {tech}
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage: "linear-gradient(90deg, rgba(249,250,251,1) 0%, rgba(249,250,251,0) 10%), linear-gradient(270deg, rgba(249,250,251,1) 0%, rgba(249,250,251,0) 10%)",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes stack-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes stack-scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
