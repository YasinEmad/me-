"use client";

import { useEffect, useState, useRef } from "react";

const navItems = [
  { href: "#hero", label: "Hero" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("header-styles")) {
      const style = document.createElement("style");
      style.id = "header-styles";
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes hdr-fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hdr-menuSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hdr-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.5; }
        }

        .hdr-root {
          font-family: 'DM Sans', sans-serif;
          animation: hdr-fadeDown 0.6s cubic-bezier(.22,1,.36,1) both;
        }
        .hdr-logo-serif { font-family: 'Playfair Display', serif; }

        .hdr-nav-link {
          position: relative;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #71717a;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s ease;
        }
        .hdr-nav-link:hover { color: #18181b; }
        .hdr-nav-link.active { color: #18181b; }

        .hdr-nav-link .underline-track {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1.5px;
          background: #18181b;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(.22,1,.36,1);
        }
        .hdr-nav-link:hover .underline-track,
        .hdr-nav-link.active .underline-track {
          transform: scaleX(1);
        }

        .hdr-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fafafa;
          background: #18181b;
          border-radius: 999px;
          padding: 7px 18px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .hdr-pill:hover {
          background: #3f3f46;
          transform: translateY(-1px);
        }

        .hdr-divider {
          width: 1px;
          height: 18px;
          background: rgba(0,0,0,0.1);
          flex-shrink: 0;
        }

        .hdr-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: hdr-dot-pulse 2.5s ease-in-out infinite;
          display: inline-block;
          flex-shrink: 0;
        }

        /* Mobile menu */
        .hdr-mobile-menu {
          animation: hdr-menuSlide 0.25s cubic-bezier(.22,1,.36,1) both;
        }

        .hdr-burger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #18181b;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .hdr-burger.open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
        .hdr-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hdr-burger.open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }
      `;
      document.head.appendChild(style);
    }

    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ["hero", "about", "projects", "skills", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <header
      className="hdr-root sticky top-0 z-50 w-full"
      style={{
        background: scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "none",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "none",
      }}
    >
      <div
        className="relative mx-auto flex max-w-6xl items-center justify-between"
        style={{ padding: "0 24px", height: 64 }}
      >
        <a href="/" aria-label="Home" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: 44, width: "auto", display: "block" }}
          />
        </a>

        {/* ── CENTER NAV (desktop) ── */}
        <nav
          ref={navRef}
          className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
          style={{ gap: 36, alignItems: "center" }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hdr-nav-link${active === item.href ? " active" : ""}`}
              onMouseEnter={() => setHovered(item.href)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.label}
              <span className="underline-track" />
            </a>
          ))}
        </nav>

        {/* ── RIGHT SIDE ── */}
        <div className="flex items-center gap-4">
          <div className="hdr-divider hidden md:block" />

          {/* CTA pill */}
          <a
            href="/Yasin_Emad_CV(2).pdf"
            download
            className="hdr-pill hidden md:inline-flex"
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.5)",
                display: "inline-block",
              }}
            />
            resume 
          </a>

          {/* Mobile burger */}
          {isMobile && (
            <button
              className={`hdr-burger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 2px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          )}
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {isMobile && menuOpen && (
        <div
          className="hdr-mobile-menu"
          style={{
            background: "rgba(255,255,255,0.97)",
            padding: "16px 24px 24px",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: i < navItems.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: active === item.href ? "#18181b" : "#71717a",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                <span>{item.label}</span>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#d4d4d8",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div style={{ marginTop: 20, display: "flex", gap: 10, alignItems: "center" }}>
            <a href="#contact" className="hdr-pill" style={{ flex: 1, justifyContent: "center" }}>
              <span className="hdr-live-dot" style={{ background: "#22c55e" }} />
              Let's work together
            </a>
          </div>
        </div>
      )}

    </header>
  );
}