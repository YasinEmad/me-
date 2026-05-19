import Image from "next/image";
import type { Project } from "../types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-3xl border border-black/5 bg-white p-6 transition dark:border-white/10 dark:bg-zinc-950">
      <div className="mb-4 h-44 overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
        {project.image && (
          <Image src={project.image} alt={project.title} width={720} height={360} className="h-full w-full object-cover" />
        )}
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">{project.role}</p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">{project.title}</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{project.description}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        {project.technologies.map((tech: string) => (
          <span key={tech} className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-700">
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
