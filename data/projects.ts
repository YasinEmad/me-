import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A modern responsive portfolio built with Next.js and Tailwind CSS.",
    role: "Full-stack Developer",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "/images/project-portfolio.png",
    url: "/",
  },
  {
    title: "Creative Agency Landing Page",
    description: "A compelling landing page to showcase branding services and products.",
    role: "UI/UX Designer",
    technologies: ["React", "CSS", "Figma"],
    image: "/images/project-agency.png",
    url: "/",
  },
];
