"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ══════════════════════════════════════════════════════════
   CONFIG
══════════════════════════════════════════════════════════ */
const NAV = [
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills"   },
  { label: "Contact",  href: "#contact"  },
];

const YEAR = new Date().getFullYear();

/* ══════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════ */
const ArrowUp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ArrowUpRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

/* ══════════════════════════════════════════════════════════
   BACK TO TOP BUTTON
══════════════════════════════════════════════════════════ */
function BackToTop() {
  const [hovered, setHovered] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        background: "none", border: "none", cursor: "pointer", padding: 0,
      }}
    >
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 44, height: 44, borderRadius: "50%",
          border: `1.5px solid ${hovered ? "#18181b" : "rgba(0,0,0,0.15)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hovered ? "#18181b" : "#a1a1aa",
          background: hovered ? "rgba(0,0,0,0.04)" : "transparent",
          transition: "border-color 0.25s ease, color 0.25s ease, background 0.25s ease",
        }}
      >
        <ArrowUp />
      </motion.div>
      <span style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 9, fontWeight: 600,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: hovered ? "#52525b" : "#c4c4c8",
        transition: "color 0.25s ease",
      }}>
        Top
      </span>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   NAV LINK ROW
══════════════════════════════════════════════════════════ */
function FooterNavLink({ item, i }: { item: { label: string; href: string }; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={item.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 13, fontWeight: 500,
          letterSpacing: "0.06em",
          color: hovered ? "#18181b" : "#71717a",
          textDecoration: "none",
          transition: "color 0.2s ease",
        }}
      >
        <motion.span
          animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "#18181b" }}
        >
          →
        </motion.span>
        {item.label}
      </Link>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   SOCIAL LINK
══════════════════════════════════════════════════════════ */



/* ══════════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  @media (max-width: 640px) {
    .footer-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .footer-bottom { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
  }
`;

/* ══════════════════════════════════════════════════════════
   MAIN FOOTER
══════════════════════════════════════════════════════════ */
export default function Footer() {
  useEffect(() => {
    if (!document.getElementById("footer-styles")) {
      const el = document.createElement("style");
      el.id = "footer-styles";
      el.textContent = CSS;
      document.head.appendChild(el);
    }
  }, []);

  return (
    <footer style={{
      borderTop: "1px solid rgba(0,0,0,0.07)",
      background: "#fafafa",
      overflowX: "hidden",
    }}>

      {/* ── Main body ── */}
      <div style={{ padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto" }}>

        {/* Grid: tagline | nav | back-to-top */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr auto",
            gap: "clamp(2rem,4vw,4rem)",
            alignItems: "start",
            marginBottom: "clamp(3rem,5vw,4rem)",
          }}
        >
          {/* Col 1 — tagline + brief */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.1rem,2vw,1.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#18181b",
              lineHeight: 1.3,
              marginBottom: 14,
            }}>
              Designer who codes.
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>
                Developer who designs.
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13, fontWeight: 300, lineHeight: 1.75,
              color: "#a1a1aa", margin: 0, maxWidth: 320,
            }}>
              Building web products that feel considered from every angle. Based in Cairo, working globally.
            </p>

            {/* Email link */}
            <a
              href="mailto:yemad7676@gmail.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                marginTop: 20,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 12, fontWeight: 500,
                letterSpacing: "0.06em",
                color: "#52525b",
                textDecoration: "none",
                borderBottom: "1px solid rgba(0,0,0,0.15)",
                paddingBottom: 2,
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#18181b"; e.currentTarget.style.borderColor = "#18181b"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#52525b"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"; }}
            >
              yemad7676@gmail.com
            </a>
          </motion.div>

          {/* Col 2 — Navigation */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 9, fontWeight: 600,
                letterSpacing: "0.24em", textTransform: "uppercase",
                color: "#323235", marginBottom: 18,
              }}
            >
              Navigate
            </motion.div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV.map((item, i) => <FooterNavLink key={item.label} item={item} i={i} />)}
            </div>
          </div>

          {/* Col 3 — Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ paddingTop: 24 }}
          >
            <BackToTop />
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid rgba(0,0,0,0.07)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* Copyright */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11, fontWeight: 400,
              letterSpacing: "0.06em",
              color: "#363639",
            }}
          >
            © {YEAR} Yasin. All rights reserved.
          </motion.span>

          {/* Center — small crafted by note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11, fontWeight: 300,
              color: "#242425",
            }}
          >
            <span>Designed & built by</span>
            <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#2e2e34" }}>Yasin</span>
          </motion.div>

        </div>
      </div>

    </footer>
  );
}