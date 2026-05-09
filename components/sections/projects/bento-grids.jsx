"use client";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconAlertTriangle,
  IconArrowUpRight,
  IconBolt,
  IconCheck,
  IconLock,
} from "@tabler/icons-react";

import ArchitectureFlow from "./architecture-flow";

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
        <div className="grid max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:auto-rows-[18rem]">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.project + i}
              project={p}
              index={i}
              mounted={mounted}
              featured={i === 0}
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

const ProjectCard = ({ project, index, mounted, featured }) => {
  const isInternal = project.visibility === "internal";
  const delay = index * 0.07;

  const Wrapper = isInternal ? motion.div : motion.a;
  const linkProps = isInternal
    ? {}
    : {
        href: project.url || "#",
        target: project.url?.startsWith("http") ? "_blank" : undefined,
        rel: project.url?.startsWith("http") ? "noopener noreferrer" : undefined,
      };

  return (
    <Wrapper
      {...linkProps}
      className={cn(
        "project-card group relative flex flex-col gap-3 overflow-hidden rounded-xl border backdrop-blur-sm p-4 md:p-5",
        "transition-all hover:-translate-y-1 hover:shadow-lg",
        !isInternal &&
          "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
        featured && "lg:col-span-2 lg:row-span-2"
      )}
      style={{
        backgroundColor: "var(--background-dim2)",
        borderColor: "var(--primary-dim2)",
      }}
      initial="initial"
      animate={mounted ? "animate" : "initial"}
      variants={fadeInUp}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3
          className="text-sm font-semibold leading-snug tracking-tight md:text-base"
          style={{ color: "var(--primary-bright)" }}
        >
          <span className="relative inline-block">
            {project.project}
            <span
              className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 transition duration-300 origin-left group-hover:scale-x-100"
              style={{
                background: `linear-gradient(to right, var(--neon-1-1), var(--neon-1-2))`,
              }}
            />
          </span>
        </h3>
        <VisibilityPill isInternal={isInternal} />
      </div>

      {/* Architecture flow — featured only */}
      {featured && Array.isArray(project.architecture) && project.architecture.length > 0 && (
        <ArchitectureFlow nodes={project.architecture} />
      )}

      {/* Story block (Problem / Solution / Outcome) */}
      <StoryBlock
        problem={project.problem}
        solution={project.solution}
        outcome={project.outcome}
        compact={!featured}
      />

      {/* Stack badges */}
      {Array.isArray(project.stack) && project.stack.length > 0 && (
        <ul className="flex flex-wrap mt-auto pt-2 gap-1.5">
          {project.stack.slice(0, featured ? 6 : 3).map((s, i) => (
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
          {project.stack.length > (featured ? 6 : 3) && (
            <li
              className="rounded-full px-2 py-0.5 text-[10px] font-medium border"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--secondary)",
                borderColor: "var(--primary-dim)",
              }}
            >
              +{project.stack.length - (featured ? 6 : 3)}
            </li>
          )}
        </ul>
      )}

      <style jsx>{`
        .project-card:hover {
          box-shadow: 0 0 0 1.5px var(--secondary);
        }
      `}</style>
    </Wrapper>
  );
};

const VisibilityPill = ({ isInternal }) => (
  <div
    className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium tracking-wide backdrop-blur shrink-0"
    style={{
      backgroundColor: "var(--background-dim)",
      color: "var(--primary)",
    }}
  >
    {isInternal ? (
      <>
        <IconLock className="w-3 h-3" stroke={1.8} />
        <span>Internal</span>
      </>
    ) : (
      <>
        <IconArrowUpRight className="w-3 h-3" stroke={1.8} />
        <span>Live</span>
      </>
    )}
  </div>
);

const storyContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const storyRowVariants = {
  hidden: { opacity: 0, x: -6 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const StoryBlock = ({ problem, solution, outcome, compact }) => {
  if (!problem && !solution && !outcome) return null;

  const labelClass = cn(
    "tracking-[0.12em] font-semibold uppercase shrink-0",
    compact ? "text-[9px]" : "text-[10px]"
  );
  const textClass = cn(
    "leading-snug",
    compact ? "text-[11px]" : "text-[12px] md:text-[13px]"
  );

  const rows = [
    {
      key: "p",
      label: "Problem",
      text: problem,
      Icon: IconAlertTriangle,
      iconColor: "var(--secondary)",
    },
    {
      key: "s",
      label: "Solution",
      text: solution,
      Icon: IconBolt,
      iconColor: "var(--neon-1-1)",
    },
    {
      key: "o",
      label: "Outcome",
      text: outcome,
      Icon: IconCheck,
      iconColor: "var(--neon-1-2)",
    },
  ].filter((r) => Boolean(r.text));

  return (
    <motion.dl
      className={cn("flex flex-col", compact ? "gap-1.5" : "gap-2")}
      variants={storyContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {rows.map(({ key, label, text, Icon, iconColor }) => (
        <motion.div
          key={key}
          className="flex items-start gap-2.5"
          variants={storyRowVariants}
        >
          <Icon
            className={cn("flex-shrink-0 mt-0.5", compact ? "w-3.5 h-3.5" : "w-4 h-4")}
            stroke={1.8}
            style={{ color: iconColor }}
          />
          <div className="flex flex-col gap-0.5 min-w-0">
            <dt
              className={labelClass}
              style={{
                fontFamily: "var(--font-accent)",
                color: iconColor,
              }}
            >
              {label}
            </dt>
            <dd className={textClass} style={{ color: "var(--primary)" }}>
              {text}
            </dd>
          </div>
        </motion.div>
      ))}
    </motion.dl>
  );
};

export default BentoGrids;
