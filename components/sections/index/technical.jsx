// Core packages
import Image from "next/image";
import { useTranslation } from "next-i18next";

// Section scss
import about from "../../../styles/sections/index/about.module.scss";
// Section specific blocks
import BadgesBlock from "../../blocks/about.badges.block";
import CopyBlock from "../../blocks/about.copy.block";
import SectionGridBg from "../../blocks/section.grid.block";
// Section general blocks
import SectionTitle from "../../blocks/section.title.block";
import Container from "../../structure/container";
// Section structure
import Section from "../../structure/section";
import Reveal, { Stagger, StaggerItem } from "../../utils/reveal.util";

/**
 * Section: Technical
 * Highlight your technical skills with a short blurb about you,
 * Then display the programs you are proficient with and the technologies you use if applicable.
 *
 * @returns {jsx} <Technical />
 */
export default function Technical() {
  const { t } = useTranslation("common");

  return (
    <Section classProp={`${about.section} borderBottom`}>
      <Container spacing={["verticalXXXLrg"]}>
        <Reveal>
          <SectionTitle
            title={t("technical.title")}
            preTitle={t("technical.preTitle")}
            subTitle={t("technical.description")}
          />
        </Reveal>
        <section className={`${about.content} ${about.container}`}>
          <Stagger className={about.copy}>
            <StaggerItem>
              <BadgesBlock
                title={t("technical.categories.languages.title")}
                copy={t("technical.categories.languages.description")}
                list={languages}
                block="languages"
                fullContainer="fullContainer"
                icon="code"
                containerClass={about.container}
                headerIcon={about.icon}
              />
            </StaggerItem>
            <StaggerItem>
              <BadgesBlock
                title={t("technical.categories.frameworks.title")}
                copy={t("technical.categories.frameworks.description")}
                list={frameworks}
                block="frameworks"
                fullContainer="fullContainer"
                icon="cubes"
                containerClass={about.container}
                headerIcon={about.icon}
              />
            </StaggerItem>
            <StaggerItem>
              <BadgesBlock
                title={t("technical.categories.databases.title")}
                copy={t("technical.categories.databases.description")}
                list={databases}
                block="databases"
                fullContainer="fullContainer"
                icon="database"
                containerClass={about.container}
                headerIcon={about.icon}
              />
            </StaggerItem>
            <StaggerItem>
              <BadgesBlock
                title={t("technical.categories.styling.title")}
                copy={t("technical.categories.styling.description")}
                list={styling}
                block="styling"
                fullContainer="fullContainer"
                icon="palette"
                containerClass={about.container}
                headerIcon={about.icon}
              />
            </StaggerItem>
            <StaggerItem>
              <BadgesBlock
                title={t("technical.categories.devops.title")}
                copy={t("technical.categories.devops.description")}
                list={devops}
                block="devops"
                fullContainer="fullContainer"
                icon="rocket"
                containerClass={about.container}
                headerIcon={about.icon}
              />
            </StaggerItem>
          </Stagger>
          <div className={`${about.image} ${about.technicalSvg}`}>
            <Image
              src="/img/dataism-24.svg"
              width={477}
              height={1111}
              alt="Data Strings 01 por Colorpong: https://ywft.us/2177b695b"
            />
          </div>
        </section>
      </Container>
    </Section>
  );
}

// Languages (ordenados por dominio principal)
const languages = [
  { key: "javascript", name: "JavaScript (ES6+)", type: "devicon" },
  { key: "typescript", name: "TypeScript", type: "devicon" },
  { key: "python", name: "Python", type: "devicon" },
  { key: "php", name: "PHP", type: "devicon" },
  { key: "csharp", name: "C#", type: "devicon" },
];

// Frameworks & Libraries (frontend / backend / UI / data)
const frameworks = [
  { key: "nextjs", name: "Next.js", type: "devicon" },
  { key: "react", name: "React", type: "devicon" },
  { key: "fastapi", name: "FastAPI", type: "devicon" },
  { key: "nodejs", name: "Node.js", type: "devicon" },
  { key: "express", name: "Express", type: "devicon" },
  { key: "prisma", name: "Prisma", type: "devicon" },
  { key: "chartjs", name: "Chart.js", type: "devicon" },
  // Librerías sin ícono en devicon -> usar FontAwesome
  { key: "layer-group", name: "ShadCN UI", type: "fas" },
  { key: "feather-pointed", name: "TipTap", type: "fas" },
];

// Databases & Storage
const databases = [
  { key: "postgresql", name: "PostgreSQL", type: "devicon" },
  { key: "mysql", name: "MySQL", type: "devicon" },
  { key: "firebase", name: "Firebase", type: "devicon" },
  { key: "redis", name: "Redis", type: "devicon" },
  { key: "box-archive", name: "MinIO", type: "fas" },
];

// Styling, UI & Design
const styling = [
  { key: "tailwindcss", name: "Tailwind CSS", type: "devicon" },
  { key: "css3", name: "CSS3", type: "devicon" },
  { key: "figma", name: "Figma", type: "devicon" },
];

// Automation, DevOps & Tooling
const devops = [
  { key: "git", name: "Git", type: "devicon" },
  { key: "docker", name: "Docker", type: "devicon" },
  { key: "github", name: "GitHub Actions", type: "devicon" },
  { key: "linux", name: "Linux / VPS", type: "devicon" },
  { key: "diagram-project", name: "n8n", type: "fas" },
  { key: "shield-halved", name: "JWT / RBAC", type: "fas" },
];
