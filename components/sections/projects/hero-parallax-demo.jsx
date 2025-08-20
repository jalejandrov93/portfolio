import React, { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconExternalLink } from "@tabler/icons-react";

/**
 * Nuevo layout "Bento Grid" inspirado en Aceternity UI para mostrar proyectos destacados.
 * Mantiene el nombre del export para no romper imports existentes.
 */
export function HeroParallaxDemo() {
  const { t } = useTranslation("common");
  const raw = t("projects.featured.items", { returnObjects: true });

  // Normalizamos datos
  const projects = useMemo(
    () =>
      (raw || []).map((p, i) => ({
        id: `${i}-${p.project}`,
        title: p.project,
        description: p.descriptionTitle || p.description,
        longDescription: p.description,
        url: p.url && p.url !== "#" ? p.url : null,
        image:
          p.images && p.images[0] && p.images[0].url
            ? p.images[0].url
            : "/img/project-placeholder.svg",
        stack: p.stack || [],
        features: p.keyFeatures || [],
      })),
    [raw]
  );

  if (!projects.length) return null;

  // Definimos un esquema de spans para los primeros 4 (hero row) y luego repetimos patrón más simple
  const layoutSpans = [
    "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800", // grande principal
    "col-span-1 lg:col-span-2 border-b dark:border-neutral-800", // pequeño collage / stack
    "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800", // medio
    "col-span-1 lg:col-span-3 border-b lg:border-none", // medio
  ];

  const cards = projects.map((p, idx) => ({
    project: p,
    span:
      idx < layoutSpans.length
        ? layoutSpans[idx]
        : // filas posteriores: 3 cards por fila cada una span-2
          "col-span-1 lg:col-span-2 border-t lg:border-r last:lg:border-r-0 dark:border-neutral-800",
    variant: idx,
  }));

  return (
    <section
      className="relative z-20 py-16 mx-auto lg:py-32 max-w-7xl"
      id="featured-projects"
    >
      <header className="px-6 md:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-center text-black md:text-5xl dark:text-white">
          {t("projects.featured.title")}
        </h2>
        <p className="max-w-2xl mx-auto mt-4 text-center text-neutral-600 dark:text-neutral-300">
          {t("projects.featured.subtitle")}
        </p>
      </header>
      <div className="relative mt-12">
        <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-6 xl:border rounded-xl dark:border-neutral-800">
          {cards.map(({ project, span, variant }) => (
            <FeatureCard
              key={project.id}
              className={span}
              project={project}
              variant={variant}
            />
          ))}
        </div>
        <GradientOrbs />
      </div>
    </section>
  );
}

// Componente de tarjeta con variantes visuales ligeras para diversidad
function FeatureCard({ project, className, variant }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col p-6 md:p-8 overflow-hidden bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm border-neutral-200/60 dark:border-neutral-800 transition-colors",
        "hover:bg-white/70 dark:hover:bg-neutral-900/70",
        className
      )}
    >
      <div className="flex flex-wrap items-start gap-3">
        <h3 className="text-xl font-semibold leading-snug md:text-2xl text-neutral-900 dark:text-neutral-50">
          {project.title}
        </h3>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            <IconExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      {project.description && (
        <p className="mt-2 text-sm md:text-base text-neutral-600 dark:text-neutral-300 line-clamp-3">
          {project.description}
        </p>
      )}
      <div className="relative flex-1 w-full mt-4">
        <ProjectVisual project={project} variant={variant} />
      </div>
      {project.stack?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((t) => (
            <li
              key={t.key}
              className="text-[10px] uppercase tracking-wide bg-neutral-900/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 px-2 py-1 rounded-md border border-neutral-200/50 dark:border-neutral-800"
            >
              {t.name}
            </li>
          ))}
        </ul>
      )}
      {project.features?.length > 0 && (
        <HoverFeatureList features={project.features.slice(0, 3)} />
      )}
      <BackgroundShine />
    </div>
  );
}

function ProjectVisual({ project, variant }) {
  const img = project.image;
  // Variantes simples de animación / layout
  if (variant === 1) {
    // Collage pequeño de la misma imagen con rotaciones para simular varias
    return (
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: 0 }}
            initial={{ rotate: -6 + i * 6 }}
            className="relative w-1/3 overflow-hidden border rounded-lg shadow-md border-neutral-200/60 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40"
          >
            <img
              src={img}
              alt={project.title}
              className="aspect-[3/4] w-full h-full object-cover object-center select-none pointer-events-none"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative overflow-hidden border shadow-sm rounded-xl border-neutral-200/60 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40"
    >
      <img
        src={img}
        alt={project.title}
        className="w-full h-full object-cover object-top aspect-video md:aspect-[5/3]"
        loading="lazy"
      />
      <div className="absolute inset-0 transition-opacity opacity-0 pointer-events-none group-hover:opacity-100 bg-gradient-to-tr from-primary-500/10 via-transparent to-transparent" />
    </motion.div>
  );
}

function HoverFeatureList({ features }) {
  return (
    <ul className="mt-4 space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 transition-colors">
      {features.map((f, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.08 }}
          className="flex items-start gap-2"
        >
          <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary-500 to-indigo-500" />
          <span className="line-clamp-1" title={f}>
            {f}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

// Fondo brillante sutil
function BackgroundShine() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_70%)]" />
    </div>
  );
}

// Orbes decorativos globales
function GradientOrbs() {
  return (
    <>
      <div className="absolute w-64 h-64 rounded-full pointer-events-none -top-10 -left-10 bg-primary-500/20 dark:bg-primary-400/10 blur-3xl" />
      <div className="absolute rounded-full pointer-events-none -bottom-10 -right-10 h-72 w-72 bg-indigo-500/20 dark:bg-indigo-400/10 blur-3xl" />
    </>
  );
}
