"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

/* ══════════════════════════════════════════════════════════
   CONFIG
══════════════════════════════════════════════════════════ */
const CONTACT = {
  whatsapp: "https://wa.me/1017844312",
  linkedin: "https://www.linkedin.com/in/yasin-emad-b4326529b/",
  gmail: "mailto:yemad7676@gmail.com",
};

/* ══════════════════════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════════════════════ */
const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GmailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.25 5.25A2.25 2.25 0 0 1 4.5 3h15a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 19.5 21H4.5A2.25 2.25 0 0 1 2.25 18.75V5.25Zm1.5.336v13.164l6.75-5.157L3.75 5.586Zm7.5 6.135 7.5 5.736V5.586l-7.5 6.135Zm8.25-1.009L12 12.928l-6-4.456V5.25h12v1.462Z" />
  </svg>
);

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowUpRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

function LottieContainer({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderPlayer = () => {
      if (!ref.current) return;
      const source = encodeURI(src);
      ref.current.innerHTML = `<lottie-player src="${source}" background="transparent" speed="1" loop autoplay style="width:100%;height:100%;display:block;"></lottie-player>`;
    };

    if (!document.querySelector('script[data-lottie]')) {
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      s.setAttribute('data-lottie', 'true');
      s.onload = () => renderPlayer();
      document.head.appendChild(s);
    } else {
      renderPlayer();
    }

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, [src]);

  return <div ref={ref} style={{ width: '100%', minHeight: 520, height: '100%', transform: 'translateY(-30px) scale(0.7)', transformOrigin: 'center top' }} />;
}

/* ══════════════════════════════════════════════════════════════════
   CREATIVE SOCIAL LINKS — editorial hover-reveal style
══════════════════════════════════════════════════════════ */
type ContactField = 'name' | 'email' | 'subject' | 'message';
type ContactFields = Record<ContactField, string>;
type ContactErrors = Partial<Record<ContactField, string>>;

type SocialItem = {
  label: string;
  handle: string;
  href: string;
  accent: string;
  icon: ({ size }: { size?: number }) => ReactNode;
  index: string;
  verb: string;
};

const socials: SocialItem[] = [
  {
    label: "WhatsApp",
    handle: "+20 1017844312",
    href: CONTACT.whatsapp,
    accent: "#25d366",
    icon: WhatsAppIcon,
    index: "01",
    verb: "Message me",
  },
  {
    label: "LinkedIn",
    handle: "/in/yasin",
    href: CONTACT.linkedin,
    accent: "#0a66c2",
    icon: LinkedInIcon,
    index: "02",
    verb: "Connect",
  },
  {
    label: "Gmail",
    handle: "yemad7676@gmail.com",
    href: CONTACT.gmail,
    accent: "#d14836",
    icon: GmailIcon,
    index: "03",
    verb: "Email me",
  },
];

function SocialRow({ social, i }: { social: SocialItem; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.a
      ref={ref}
      href={social.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        padding: "22px 0",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        gap: 0,
      }}
    >
      {/* Sliding accent background fill */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg, ${social.accent}12 0%, transparent 100%)`,
          transformOrigin: "left",
          borderRadius: 8,
          pointerEvents: "none",
        }}
      />

      {/* Left: index */}
      <span style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: 11, fontStyle: "italic",
        color: hovered ? social.accent : "#d4d4d8",
        letterSpacing: "0.1em",
        minWidth: 32,
        transition: "color 0.3s ease",
        flexShrink: 0,
        paddingLeft: 4,
        zIndex: 1,
      }}>
        {social.index}
      </span>

      {/* Icon + label */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, zIndex: 1, paddingLeft: 16 }}>
        <motion.div
          animate={{
            color: hovered ? social.accent : "#a1a1aa",
            scale: hovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.25 }}
        >
          <social.icon size={22} />
        </motion.div>

        <div>
          <div style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(1.3rem,2.5vw,2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: hovered ? "#0f0f0f" : "#18181b",
            lineHeight: 1.1,
            transition: "color 0.2s ease",
          }}>
            {social.label}
          </div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -4 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12, fontWeight: 400,
              color: social.accent,
              letterSpacing: "0.04em",
              marginTop: 2,
            }}
          >
            {social.handle}
          </motion.div>
        </div>
      </div>

      {/* Right: verb + arrow */}
      <motion.div
        animate={{ x: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 11, fontWeight: 600,
          letterSpacing: "0.16em", textTransform: "uppercase",
          color: social.accent,
          zIndex: 1, paddingRight: 4, whiteSpace: "nowrap",
        }}
      >
        {social.verb}
        <ArrowUpRight size={12} />
      </motion.div>

      {/* Accent line at bottom that slides in on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 2, background: social.accent,
          transformOrigin: "left", borderRadius: 1,
        }}
      />
    </motion.a>
  );
}

function CreativeSocials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <div>
      {/* Section label */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}
      >
        <div style={{ height: 1, width: 24, background: "rgba(0,0,0,0.15)" }} />
        <span style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 10, fontWeight: 600,
          letterSpacing: "0.26em", textTransform: "uppercase",
          color: "#a1a1aa",
        }}>
          Or find me on
        </span>
      </motion.div>

      {/* Top border */}
      <div style={{ height: 1, background: "rgba(0,0,0,0.08)", marginBottom: 0 }} />

      {/* Social rows */}
      {socials.map((s, i) => (
        <SocialRow key={s.label} social={s} i={i} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════════ */
function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [fields, setFields] = useState<ContactFields>({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState<ContactField | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});

  const validate = () => {
    const e: ContactErrors = {};
    if (!fields.name.trim()) e.name = "Required";
    if (!fields.email.trim() || !/\S+@\S+\.\S+/.test(fields.email)) e.email = "Valid email required";
    if (!fields.message.trim()) e.message = "Required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 1600));
    setSending(false);
    setSent(true);
  };

  const inputStyle = (name: ContactField) => ({
    width: "100%", boxSizing: "border-box",
    background: focused === name ? "white" : "#fafafa",
    border: `1.5px solid ${errors[name] ? "#ef4444" : focused === name ? "#18181b" : "rgba(0,0,0,0.1)"}`,
    borderRadius: 12,
    padding: "14px 18px",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 14, fontWeight: 400, color: "#18181b",
    outline: "none",
    transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused === name ? "0 0 0 4px rgba(0,0,0,0.04)" : "none",
  });

  const labelStyle = {
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 10, fontWeight: 600,
    letterSpacing: "0.16em", textTransform: "uppercase",
    color: "#71717a", display: "block", marginBottom: 8,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "white", borderRadius: 24,
        border: "1.5px solid rgba(0,0,0,0.08)",
        padding: "clamp(2rem,4vw,3.5rem)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.06)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Decorative rings */}
      <div style={{ position: "absolute", top: -50, right: -50, width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -24, right: -24, width: 130, height: 130, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.04)", pointerEvents: "none" }} />
    </motion.div>
  );
}


/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
function ContactHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <div style={{ position: "relative", marginBottom: "clamp(3rem,6vw,5rem)" }}>
      <div ref={ref} style={{ position: "relative", zIndex: 1 }}>

        <div className="cf-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '1.5rem', alignItems: 'start' }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,7.5vw,6rem)", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0, color: "#0f0f0f" }}
            >
              Let's make
              <br /><span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>something great</span>
              <br />together.
            </motion.h1>
          </div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(1rem,1.5vw,1.1rem)", fontWeight: 300, lineHeight: 1.8, color: "#52525b", margin: 0, maxWidth: 420 }}
            >
              Whether it's a full product build, a design overhaul, a quick collab, or just a conversation — reach out below.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              style={{ marginTop: 10, color: "#27282b", fontSize: 15, fontWeight: 400 }}
            >
              Warning: may accidentally turn your “small idea” into a full product roadmap.
            </motion.div>
          </div>
        </div>

        <div style={{ marginTop: "2.5rem", height: 1, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "100%", background: "linear-gradient(90deg,#18181b 0%,rgba(0,0,0,0.1) 100%)", transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  @media (max-width: 640px) {
    .cf-two-col { grid-template-columns: 1fr !important; }
    .cf-layout   { grid-template-columns: 1fr !important; }
  }
`;

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export default function ContactSection() {
  useEffect(() => {
    if (!document.getElementById("contact-styles-v2")) {
      const el = document.createElement("style");
      el.id = "contact-styles-v2";
      el.textContent = CSS;
      document.head.appendChild(el);
    }
  }, []);

  return (
    <section id="contact" style={{ color: "#18181b", overflowX: "hidden", fontFamily: "'DM Sans',sans-serif", padding: "clamp(2rem,5vw,3rem) clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto" }}>

      <ContactHero />
        {/* Two-column layout */}
        <div
          className="cf-layout"
          style={{ display: "grid", gridTemplateColumns: "1.8fr 0.45fr", gap: "clamp(2.5rem,5vw,5rem)", alignItems: "start" }}
        >
          {/* Left: Contact animation */}
          <div style={{ position: 'relative', minHeight: 540, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <LottieContainer src="/Contactus.json" />
          </div>

          {/* Right: Creative social links */}
          <div style={{ paddingTop: 8, paddingLeft: 28, borderLeft: '1px solid rgba(26, 25, 25, 0.89)' }}>
            <CreativeSocials />
          </div>
        </div>

      </section>
  );
}