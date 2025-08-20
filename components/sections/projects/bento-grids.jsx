"use client";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";

// Maps locale featured items into the structure expected by HeroParallax
export const BentoGrids = () => {
  const { t } = useTranslation("common");
  const projects = t("projects.featured.items", { returnObjects: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!Array.isArray(projects) || !projects.length) return null;

  return (
    <section className="relative mt-10 overflow-hidden rounded-2xl">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
        <div
          className="absolute w-48 h-48 -translate-x-1/2 rounded-full left-1/3 top-1/4 blur-3xl"
          style={{ backgroundColor: "var(--neon-1-1)", opacity: 0.15 }}
        />
        <div
          className="absolute translate-x-1/2 rounded-full bottom-10 right-1/4 h-72 w-72 blur-3xl"
          style={{ backgroundColor: "var(--neon-1-2)", opacity: 0.1 }}
        />
      </div>
      <div className="relative z-10 px-4 py-12 mx-auto max-w-7xl sm:px-6 md:py-16 lg:px-8">
        <header className="mb-10 text-center">
          <p
            className="text-sm font-medium tracking-wide"
            style={{ color: "var(--secondary)" }}
          >
            {t("projects.featured.preTitle")}
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "var(--primary-bright)" }}
          >
            {t("projects.featured.title")}
          </h2>
          <p
            className="max-w-2xl mx-auto mt-4 text-base"
            style={{ color: "var(--primary)" }}
          >
            {t("projects.featured.subtitle")}
          </p>
        </header>
        <div className="grid max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.project + i}
              project={p}
              index={i}
              mounted={mounted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

const ProjectCard = ({ project, index, mounted }) => {
  const firstImage =
    project.images && project.images.length ? project.images[0] : null;
  const src = firstImage ? firstImage.url : "/img/project-placeholder-en.svg";
  const description = project.descriptionTitle || project.description || "";
  const hasRepo =
    project.repo &&
    typeof project.repo === "string" &&
    project.repo !== "Private";
  const icon = hasRepo ? (
    <IconBrandGithub className="w-4 h-4" />
  ) : (
    <IconExternalLink className="w-4 h-4" />
  );
  const delay = index * 0.07; // stagger

  return (
    <motion.a
      href={project.url || "#"}
      target={project.url?.startsWith("http") ? "_blank" : undefined}
      rel={project.url?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "project-card group relative block overflow-hidden rounded-xl shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      )}
      style={{
        backgroundColor: "var(--background-dim2)",
        borderColor: "var(--primary-dim2)",
        borderWidth: "1px",
      }}
      initial="initial"
      animate={mounted ? "animate" : "initial"}
      variants={fadeInUp}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={src}
          alt={project.project}
          fill
          className="object-cover object-top transition duration-700 brightness-95 group-hover:scale-110 group-hover:brightness-105"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 20vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 transition duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_60%)] opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100" />
        <div
          className="absolute z-10 p-1 rounded-full shadow right-2 top-2 backdrop-blur"
          style={{
            backgroundColor: "var(--background-dim)",
            color: "var(--primary)",
          }}
        >
          {icon}
        </div>
      </div>
      {/* Text */}
      <div className="relative z-10 flex flex-col gap-1 px-3 py-3">
        <h3
          className="flex items-start gap-2 text-sm font-semibold tracking-tight md:text-base"
          style={{ color: "var(--primary-bright)" }}
        >
          <span className="relative inline-block">
            {project.project}
            <span
              className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 transition duration-300 group-hover:scale-x-100"
              style={{
                background: `linear-gradient(to right, var(--neon-1-1), var(--neon-1-2))`,
              }}
            />
          </span>
        </h3>
        <p
          className="line-clamp-3 text-xs md:text-[13px]"
          style={{ color: "var(--primary)" }}
        >
          {description}
        </p>
        {Array.isArray(project.stack) && project.stack.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s, i) => (
              <li
                key={s.key || s.name || i}
                className="rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide border"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--secondary)",
                  borderColor: "var(--primary-dim)",
                }}
              >
                {s.name || s.key || s}
              </li>
            ))}
            {project.stack.length > 4 && (
              <li
                className="rounded-full px-2 py-0.5 text-[10px] font-medium border"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--secondary)",
                  borderColor: "var(--primary-dim)",
                }}
              >
                +{project.stack.length - 4}
              </li>
            )}
          </ul>
        )}
      </div>
      {/* Hover ring - using box-shadow for theme compatibility */}
      <style jsx>{`
        .project-card:hover {
          box-shadow: 0 0 0 2px var(--secondary);
        }
      `}</style>
    </motion.a>
  );
};

export default BentoGrids;
