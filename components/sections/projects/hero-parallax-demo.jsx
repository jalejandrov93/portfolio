import React from "react";
import { HeroParallax } from "../../ui/hero-parallax";
import { useTranslation } from "next-i18next";

export function HeroParallaxDemo() {
  const { t } = useTranslation("common");
  const allProjects = t("projects.featured.items", { returnObjects: true });

  // Adaptar los datos de proyectos al formato requerido por HeroParallax
  const products = allProjects.map((project) => ({
    title: project.project,
    link: project.url && project.url !== "#" ? project.url : null,
    thumbnail:
      project.images && project.images[0]
        ? project.images[0].url
        : "/img/project-placeholder.svg",
    description: project.description || project.descriptionTitle,
    stack: project.stack || [],
  }));

  // Si tenemos menos de 15 proyectos, duplicamos algunos para llenar las filas
  while (products.length < 15) {
    products.push(
      ...products.slice(0, Math.min(15 - products.length, products.length))
    );
  }

  return <HeroParallax products={products.slice(0, 15)} />;
}
