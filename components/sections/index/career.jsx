// Core packages
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

// Career scss
import career from "../../../styles/sections/index/career.module.scss";
import SectionGridBg from "../../blocks/section.grid.block";
// Section general blocks
import SectionTitle from "../../blocks/section.title.block";
import Container from "../../structure/container";
// Section structure
import Section from "../../structure/section";
import Badges from "../../utils/badge.list.util";
import CareerArticle from "../articles/careerarticle";
import CareerTimeline from "../articles/careertimeline";
// UI components
import { ScrollArea } from "../../ui/scroll-area";

/**
 * Section: Career
 *
 * @returns {jsx} <Career />
 */
export default function Career() {
  const { t } = useTranslation("common");

  // Obtener los datos de experiencia de las traducciones
  const currentPosition = t("career.current", { returnObjects: true });
  const positions = t("career.positions", { returnObjects: true });
  const previousPositions = t("career.previous", { returnObjects: true });

  return (
    <Section classProp={`${career.section} borderBottom`}>
      <Container spacing={["verticalXXXLrg"]}>
        <SectionTitle
          title={t("career.title")}
          preTitle={t("career.preTitle")}
          subTitle={t("career.description")}
        />
        <section className={`${career.area} ${career.splitLayout}`}>
          {/* Experiencia laboral - Lado izquierdo */}
          <div className={career.leftColumn}>
            {/* Posición actual */}
            <div className={career.currentPosition}>
              <div className={career.positionHeader}>
                <h3 className={career.companyName}>
                  {currentPosition.company}
                </h3>
                <span className={career.location}>
                  {currentPosition.location}
                </span>
              </div>
              <h4 className={career.positionTitle}>
                {currentPosition.position}
              </h4>
              <p className={career.positionDescription}>
                {currentPosition.description}
              </p>

              {/* Badges para posición actual */}
              <div className={career.techStack}>
                <Badges
                  list={organizedTechStack.frontend.slice(0, 4)}
                  block="stack"
                  fullContainer="fullContainer"
                  color={false}
                  background={false}
                />
              </div>
            </div>

            {/* Timeline de posiciones */}
            <div className={career.timeline}>
              {positions.map((position, index) => (
                <div key={index} className={career.timelineItem}>
                  <h4 className={career.positionTitle}>{position.title}</h4>
                  <p className={career.positionDescription}>
                    {position.description}
                  </p>

                  {/* Badges específicos para cada posición */}
                  <div className={career.techStack}>
                    {index === 0 && (
                      <Badges
                        list={organizedTechStack.backend.slice(0, 5)}
                        block="stack"
                        fullContainer="fullContainer"
                        color={false}
                        background={false}
                      />
                    )}
                    {index === 1 && (
                      <Badges
                        list={organizedTechStack.frontend.slice(0, 4)}
                        block="stack"
                        fullContainer="fullContainer"
                        color={false}
                        background={false}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Posiciones anteriores */}
            {previousPositions.map((position, index) => (
              <div key={index} className={career.previousPosition}>
                <div className={career.positionHeader}>
                  <h3 className={career.companyName}>{position.company}</h3>
                  <span className={career.location}>{position.location}</span>
                </div>
                <h4 className={career.positionTitle}>{position.position}</h4>
                <p className={career.positionDescription}>
                  {position.description}
                </p>

                {/* Badges para posiciones anteriores */}
                <div className={career.techStack}>
                  <Badges
                    list={organizedTechStack.operatingSystems}
                    block="stack"
                    fullContainer="fullContainer"
                    color={true}
                    background={false}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Proyectos Freelance - Lado derecho */}
          <div className={career.rightColumn}>
            <div className={career.freelanceSection}>
              <h3 className={career.freelanceTitle}>
                {t("career.freelance.title")}
              </h3>
              <p className={career.freelanceSubtitle}>
                {t("career.freelance.subtitle")}
              </p>

              <ScrollArea className={career.scrollableArea}>
                <div className={career.freelanceProjects}>
                  {t("career.freelance.projects", { returnObjects: true }).map(
                    (project, index) => (
                      <div key={index} className={career.freelanceProject}>
                        <div className={career.projectHeader}>
                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${career.projectTitle} hover:opacity-80 transition-opacity`}
                            >
                              {project.title}
                            </a>
                          ) : (
                            <h4 className={career.projectTitle}>
                              {project.title}
                            </h4>
                          )}
                          <span className={career.projectPeriod}>
                            {project.period}
                          </span>
                        </div>
                        <p className={career.projectDescription}>
                          {project.description}
                        </p>
                        <div className={career.projectTech}>
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className={career.techBadge}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </section>
      </Container>
    </Section>
  );
}

const organizedTechStack = {
  frontend: [
    { key: "html5", name: "HTML5", type: "devicon" },
    { key: "css3", name: "CSS", type: "devicon" },
    { key: "javascript", name: "JavaScript", type: "devicon" },
    { key: "react", name: "React", type: "devicon" },
    { key: "nextjs", name: "Next.js", type: "devicon" },
    { key: "tailwindcss", name: "Tailwind", type: "devicon" },
    { key: "wordpress", name: "WordPress", type: "devicon" },
    { key: "woocommerce", name: "WooCommerce", type: "devicon" },
  ],
  backend: [
    { key: "nodejs", name: "Node.js", type: "devicon" },
    { key: "express", name: "Express", type: "devicon" },
    { key: "python", name: "Python", type: "devicon" },
    { key: "fastapi", name: "FastAPI", type: "devicon" },
    { key: "docker", name: "Docker", type: "devicon" },
  ],
  database: [
    { key: "mysql", name: "MySQL", type: "devicon" },
    { key: "mongodb", name: "MongoDB", type: "devicon" },
    { key: "postgresql", name: "PostgreSQL", type: "devicon" },
  ],
  devops: [
    { key: "git", name: "Git", type: "devicon" },
    { key: "docker", name: "Docker", type: "devicon" },
    { key: "jenkins", name: "Jenkins", type: "devicon" },
    { key: "amazonwebservices", name: "AWS", type: "devicon" },
    { key: "azure", name: "Azure", type: "devicon" },
  ],
  operatingSystems: [
    { key: "linux", name: "Linux", type: "devicon" },
    { key: "ubuntu", name: "Ubuntu", type: "devicon" },
    { key: "windows8", name: "Windows", type: "devicon" },
  ],
  designTools: [
    { key: "figma", name: "Figma", type: "devicon" },
    { key: "adobexd", name: "Adobe XD", type: "devicon" },
    { key: "photoshop", name: "Photoshop", type: "devicon" },
    { key: "illustrator", name: "Illustrator", type: "devicon" },
    { key: "indesign", name: "InDesign", type: "devicon" },
    { key: "premiere", name: "Premiere", type: "devicon" },
    { key: "aftereffects", name: "After Effects", type: "devicon" },
  ],
  projectManagement: [
    { key: "jira", name: "Jira", type: "devicon" },
    { key: "trello", name: "Trello", type: "devicon" },
  ],
  communication: [
    { key: "slack", name: "Slack", type: "devicon" },
    { key: "teams", name: "Teams", type: "devicon" },
    { key: "zoom", name: "Zoom", type: "devicon" },
  ],
  other: [{ key: "cpanel", name: "cPanel", type: "devicon" }],
};
