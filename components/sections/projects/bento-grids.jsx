import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { motion, useInView, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconAlertTriangle,
  IconArrowUpRight,
  IconBolt,
  IconCheck,
  IconLock,
} from "@tabler/icons-react";

import ArchitectureFlow from "./architecture-flow";
import { Stagger, StaggerItem, Magnetic } from "../../utils/reveal.util";

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export const BentoGrids = () => {
  const { t } = useTranslation("common");
  const projects = t("projects.featured.items", { returnObjects: true });

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
        <header className="mb-12 text-center">
          <span
            className="eyebrow inline-block"
            style={{ color: "var(--secondary)" }}
          >
            {t("projects.featured.preTitle")}
          </span>
          <h2
            className="mt-3"
            style={{
              color: "var(--primary-bright)",
              fontSize: "var(--font-2xl)",
              fontFamily: "var(--font-sans)",
              fontFeatureSettings: "var(--font-features-display)",
              fontWeight: 700,
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-tighter)",
            }}
          >
            {t("projects.featured.title")}
          </h2>
          <p
            className="max-w-2xl mx-auto mt-4"
            style={{
              color: "var(--primary)",
              fontSize: "var(--font-m)",
              lineHeight: "var(--leading-relaxed)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            {t("projects.featured.subtitle")}
          </p>
        </header>

        <Stagger
          amount={0.1}
          className="grid max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:auto-rows-[18rem]"
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.project + i}
              project={p}
              featured={i === 0}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: PREMIUM_EASE },
  },
};

// Card uses StaggerItem (gets fade-in-y from parent Stagger) wrapped in
// Magnetic ONLY for public/external cards — internal cards stay static
// because they aren't clickable, magnetism would feel arbitrary.
const ProjectCard = ({ project, featured }) => {
  const isInternal = project.visibility === "internal";
  const hasArchitecture = Array.isArray(project.architecture) && project.architecture.length > 0;

  // Build the card body once; we'll wrap it differently based on visibility.
  // NOTE: col-span/row-span live on the StaggerItem (direct grid child).
  // The inner card just fills its slot via h-full.
  const cardClasses = cn(
    "project-card group relative flex flex-col gap-3 overflow-hidden rounded-xl border backdrop-blur-sm p-4 md:p-5 h-full",
    "transition-all hover:-translate-y-1 hover:shadow-lg",
    !isInternal &&
      "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]"
  );
  const cardStyle = {
    backgroundColor: "var(--background-dim2)",
    borderColor: "var(--primary-dim2)",
  };

  const Body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3
          style={{
            color: "var(--primary-bright)",
            fontSize: featured ? "var(--font-m)" : "var(--font-r-s)",
            fontWeight: 600,
            lineHeight: "var(--leading-snug)",
            letterSpacing: "var(--tracking-tight)",
          }}
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

      {/* Architecture flow renders on featured cards always. Non-featured
          cards that HAVE architecture data reveal it on hover for a quiet
          "more under the surface" moment. */}
      {featured && hasArchitecture && (
        <ArchitectureFlow nodes={project.architecture} />
      )}
      {!featured && hasArchitecture && (
        <div className="archHover overflow-hidden max-h-0 group-hover:max-h-40 transition-[max-height] duration-500 ease-out">
          <ArchitectureFlow nodes={project.architecture} />
        </div>
      )}

      <StoryBlock
        problem={project.problem}
        solution={project.solution}
        outcome={project.outcome}
        compact={!featured}
      />

      {Array.isArray(project.stack) && project.stack.length > 0 && (
        <ul className="flex flex-wrap mt-auto pt-2 gap-1.5">
          {project.stack.slice(0, featured ? 6 : 3).map((s, i) => (
            <li
              key={s.key || s.name || i}
              className="rounded-full px-2 py-0.5 border"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--secondary)",
                borderColor: "var(--primary-dim)",
                fontSize: "var(--font-xx)",
                fontFamily: "var(--font-accent)",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              {s.name || s.key || s}
            </li>
          ))}
          {project.stack.length > (featured ? 6 : 3) && (
            <li
              className="rounded-full px-2 py-0.5 border"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--secondary)",
                borderColor: "var(--primary-dim)",
                fontSize: "var(--font-xx)",
                fontFamily: "var(--font-accent)",
                fontWeight: 600,
                letterSpacing: "0.04em",
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
    </>
  );

  const CardInner = isInternal ? (
    <motion.div
      className={cardClasses}
      style={cardStyle}
      variants={cardVariants}
    >
      {Body}
    </motion.div>
  ) : (
    <motion.a
      href={project.url || "#"}
      target={project.url?.startsWith("http") ? "_blank" : undefined}
      rel={project.url?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cardClasses}
      style={cardStyle}
      variants={cardVariants}
    >
      {Body}
    </motion.a>
  );

  // Public cards get magnetic pull. Internal cards stay still — they're not
  // interactive targets, magnetism would lie about affordance.
  if (!isInternal) {
    return (
      <StaggerItem className={cn("h-full", featured && "lg:col-span-2 lg:row-span-2")}>
        <Magnetic
          strength={0.12}
          stiffness={180}
          damping={20}
          display="block"
          style={{ height: "100%" }}
        >
          {CardInner}
        </Magnetic>
      </StaggerItem>
    );
  }

  return (
    <StaggerItem className={cn("h-full", featured && "lg:col-span-2 lg:row-span-2")}>
      {CardInner}
    </StaggerItem>
  );
};

const VisibilityPill = ({ isInternal }) => (
  <div
    className="flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur shrink-0"
    style={{
      backgroundColor: "var(--background-dim)",
      color: "var(--primary)",
      fontSize: "var(--font-xx)",
      fontFamily: "var(--font-accent)",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
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
    transition: { duration: 0.4, ease: PREMIUM_EASE },
  },
};

// Match a leading number with optional decimal + an optional unit/percent
// at the front of the outcome string. "70% faster ..." → { num: 70, suffix: "%" }
const NUMERIC_OUTCOME_RE = /^(\d+(?:\.\d+)?)\s*([%xX]|min|sec|h|hours?|days?|weeks?|months?)?\b(.*)$/;

const StoryBlock = ({ problem, solution, outcome, compact }) => {
  if (!problem && !solution && !outcome) return null;

  const labelStyle = (color) => ({
    color,
    fontFamily: "var(--font-accent)",
    fontSize: compact ? "var(--font-xx)" : "var(--font-xs)",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    flexShrink: 0,
  });
  const textStyle = {
    color: "var(--primary)",
    fontSize: compact ? "var(--font-xs)" : "var(--font-s)",
    lineHeight: "var(--leading-snug)",
    letterSpacing: "var(--tracking-tight)",
  };

  const rows = [
    { key: "p", label: "Problem", text: problem, Icon: IconAlertTriangle, iconColor: "var(--secondary)" },
    { key: "s", label: "Solution", text: solution, Icon: IconBolt, iconColor: "var(--neon-1-1)" },
    { key: "o", label: "Outcome", text: outcome, Icon: IconCheck, iconColor: "var(--neon-1-2)" },
  ].filter((r) => Boolean(r.text));

  return (
    <motion.dl
      className={cn("flex flex-col", compact ? "gap-1.5" : "gap-2")}
      variants={storyContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {rows.map(({ key, label, text, Icon, iconColor }) => {
        // Outcome rows get the count-up treatment when the text leads with a number.
        const isOutcome = key === "o";
        const match = isOutcome ? NUMERIC_OUTCOME_RE.exec(text) : null;

        return (
          <motion.div key={key} className="flex items-start gap-2.5" variants={storyRowVariants}>
            <Icon
              className={cn("flex-shrink-0 mt-0.5", compact ? "w-3.5 h-3.5" : "w-4 h-4")}
              stroke={1.8}
              style={{ color: iconColor }}
            />
            <div className="flex flex-col gap-0.5 min-w-0">
              <dt style={labelStyle(iconColor)}>{label}</dt>
              <dd style={textStyle}>
                {match ? (
                  <>
                    <CountUp
                      to={parseFloat(match[1])}
                      suffix={match[2] || ""}
                      compact={compact}
                      color={iconColor}
                    />
                    {match[3]}
                  </>
                ) : (
                  text
                )}
              </dd>
            </div>
          </motion.div>
        );
      })}
    </motion.dl>
  );
};

// CountUp — animates a numeric value from 0 → `to` once when in view.
// Uses framer-motion's imperative `animate(from, to, opts)` API with an
// onUpdate callback that pushes into local state. Plain <span> renders the
// stringified value — MotionValues CANNOT be rendered as React children
// directly (React sees them as unrecognized objects and throws).
const CountUp = ({ to, suffix = "", duration = 1.4, compact, color }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const isInt = Number.isInteger(to);
  const [display, setDisplay] = useState(isInt ? 0 : "0.0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: PREMIUM_EASE,
      onUpdate: (latest) => {
        setDisplay(isInt ? Math.round(latest) : latest.toFixed(1));
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, isInt]);

  return (
    <span
      ref={ref}
      style={{
        color,
        fontFamily: "var(--font-sans)",
        fontFeatureSettings: '"tnum","cv11"',
        fontWeight: 700,
        fontSize: compact ? "var(--font-s)" : "var(--font-m)",
        marginRight: "0.15em",
      }}
    >
      {display}
      {suffix}
    </span>
  );
};

export default BentoGrids;
