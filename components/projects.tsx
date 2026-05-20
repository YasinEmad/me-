"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectRow from "./ProjectRow";

function SectionAnimation({ src }: { src: string }) {
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

const projects = [
  {
    id: "01",
    title: "Bode",
    subtitle: "CRM Real Estate Dashboard",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "web push", "zod"],
    description:
      "Bode CRM is a complete real estate sales system built with Next.js to help companies organize their daily work easily. It smoothly manages the whole sales process, tracking everything from finding a new customer to officially closing the deal. The platform includes a smart commission tool that automatically calculates payments for multiple people and sends them to managers for approval. To make sure employees are working where they should be, it uses highly accurate GPS tracking to check their location when they log in for work. Built with a strong Node.js and MongoDB backend, it keeps data secure, controls what different users can see, and sends instant system updates. Overall, Bode CRM gives real estate agencies the clear team oversight and performance goals they need to successfully grow their sales.",
    accent: "#4667f8",
    github: "https://github.com/YasinEmad/Bode_CRM",
    website: "https://bode-crm.vercel.app",
    animation: "/realstate.json",
    images: [
      "/bodeadmin.png",
      "/bodeLogin.png",
      "/lightbode.png",
      "/bodesales.png",
      "/leaderbode.png",
      "/mediabuyer.png",
    ],
  },
  {
    id: "02",
    title: "Cyber Mind",
    subtitle: "Educational Platform for cybersecurity",
    tags: ["React", "Node.js", "firebase", "postgreSQL", "gemnai", "redis"],
    description:
      "Cyber-Mind is a comprehensive, full-stack cybersecurity learning platform structured as a modern JavaScript monorepo that connects a robust backend to an interactive user experience. The server-side ecosystem uses Node.js and Express to drive specialized execution engines for puzzles, coding challenges, and dynamic Capture The Flag (CTF) gameplay. It relies on a PostgreSQL database managed by Sequelize ORM featuring automated, recoverable schema migrations, alongside a Gemini API integration designed for AI-driven code evaluation. Secure authentication is handled through Firebase, utilizing a Google Sign-In flow, cookie-based sessions, and granular role-based access controls for users and administrators. On the frontend, a responsive user interface is built with React, TypeScript, and Vite, using Redux Toolkit for seamless state management and Framer Motion for smooth, animated route transitions. Finally, the application ties everything together with a dedicated admin dashboard for user permissions, challenge management, and template configuration.",
    outcome: "↑ 41% conversion rate uplift",
    accent: "#bd5343",
    github: "https://github.com/YasinEmad/Cyber-Mind",
    website: "https://cyber-mind-three.vercel.app/",
    animation: "/security.json",
    images: [
      "/puzzles.png",
      "/profile.png",
      "/cyberlogin.png",
      "/cyberhome.png",
      "/ctf.png",
      "/admin.png",
    ],
  },
  {
    id: "03",
    title: "Bedaya",
    subtitle: "Healthcare Management System",
    tags: ["React 18", "PostgreSQL & Sequelize ORM", "Socket.io"," React Query", "Zod",],
    description:
      "FullStack-Bedaya is a modern, production-ready enterprise healthcare management system designed to streamline clinical workflows and administrative tasks. Built using a robust TypeScript ecosystem, it unifies a comprehensive suite of modules including multi-clinic patient records, pharmacy inventory tracking, and laboratory test management. The backend is powered by Node.js and Express (compatible with the Bun runtime) alongside a PostgreSQL database managed via Sequelize ORM, featuring real-time data sync via    Socket.io, robust JWT security, and detailed compliance auditing. On the frontend, a highly responsive, accessible user interface is delivered using React 18, Vite, and Tailwind CSS, backed by a sophisticated state-management architecture utilizing Redux Toolkit, React Query for server states, and Zod schema validation. The repository follows an organized monorepo structure complete with shared data validation schemas, interactive OpenAPI/Swagger documentation, comprehensive automated test suites using Vitest, and advanced database seeding scripts for performance evaluation.",
    outcome: "#1 Product of the Day",
    accent: "#8dda55",
    github: "https://github.com/YasinEmad/Bedaya-v2/tree/main",
    website: "https://bedaya2.ggpanel.site/",
    animation: "/Doctor holding medical instrument.json",
    images: [
      "/bedayareport.png",
      "/homebedaya.png",
      "/logs.png",
      "/clincs.png",
    ],
  },
];

function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#18181b" }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#71717a" }}>Selected work</span>
      </motion.div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
        <motion.h2
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, lineHeight: 1.06, letterSpacing: "-0.03em", margin: 0 }}
        >
          Things I've<br />
          <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>built & shipped.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.9rem,1.2vw,1rem)", lineHeight: 1.8, fontWeight: 300, color: "#71717a", maxWidth: 340, margin: 0, paddingBottom: 8 }}
        >
          Each project is a different problem, a different stack, the same obsessive attention to craft.
        </motion.p>
      </div>

      <div style={{ marginTop: "2.5rem", height: 1, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%", background: "linear-gradient(90deg, #18181b 0%, rgba(0,0,0,0.12) 100%)", transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  @media (max-width: 768px) {
    .ps-proj-row { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .ps-proj-row > div:nth-child(1) { order: 2; }
    .ps-proj-row > div:nth-child(2) { order: 1; }

    .project-animation {
      top: -60px !important;
    }

    .project-animation--doctor {
      width: 420px !important;
      height: 260px !important;
    }

    .project-animation--security {
      width: 360px !important;
      height: 220px !important;
    }
  }

  @media (max-width: 640px) {
    .project-animation {
      top: -50px !important;
    }

    .project-animation--doctor {
      width: 320px !important;
      height: 220px !important;
    }

    .project-animation--security {
      width: 280px !important;
      height: 190px !important;
    }
  }
`;

export default function ProjectsSection() {
  useEffect(() => {
    if (!document.getElementById("ps-styles-v4")) {
      const el = document.createElement("style");
      el.id = "ps-styles-v4";
      el.textContent = CSS;
      document.head.appendChild(el);
    }
  }, []);

  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-10%" });

  return (
    <section id="projects" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto", color: "#18181b", overflow: "hidden" }}>
      <SectionHeader />
      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>
      <motion.div
        ref={footerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={footerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ marginTop: "4rem", width: "100%", display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 2000,
            height: 60,
            transform: "scaleY(0.5)",
            transformOrigin: "center",
          }}
        >
          <SectionAnimation src="/line.json" />
        </div>
      </motion.div>
    </section>
  );
}
