import { m, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

import css from "../../../styles/sections/projects/featured.module.scss";
import Badges from "../../utils/badge.list.util";
import Icon from "../../utils/icon.util";
import Link from "next/link";

//import content 		from '../../../content/projects/featured.json'

export default function FeaturedProject({ content }, index) {
  const {
    project,
    url,
    repo,
    descriptionTitle,
    description,
    keyFeatures,
    techStack,
    stack,
    imageOptions,
    images,
  } = content;
  const router = useRouter();

  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <m.section
      key={index}
      className={css.project}
      //framer-motion
      ref={ref}
      variants={container}
      initial={["rest", "hidden"]}
      whileHover="hover"
      animate={controls}
    >
      <div className={css.details}>
        <div className={css.projectHeader}>
          <div className={css.header}>
            <h3 className="highlight">
              {project}
              {url && (
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  <Icon icon={["fad", "external-link"]} />
                </Link>
              )}
            </h3>
            <span className={css.privateOr}>
              <i className="devicon-github-plain"></i>
              {repo}
            </span>
          </div>
          <div className={css.description}>
            <p>{description}</p>
            {keyFeatures && (
              <ul className={css.keyFeatures}>
                {keyFeatures.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={css.stackContainer}>
            <Badges
              list={stack}
              block="stack"
              fullContainer={false}
              color={false}
            />
          </div>
          {url && (
            <m.div variants={""} className={css.viewProject}>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                <Icon icon={["fad", "arrow-right-to-bracket"]} />
              </Link>
            </m.div>
          )}
        </div>
      </div>

      <div className={css.imageContainer}>
        <span className={`${css.imageAnimationContainer}`}>
          {images.map(({ key, url, hover, h, w }, index) => {
            hover = hover === "left" ? hoverLeft : hoverRight;
            const isPlaceholder = key === "placeholder";
            // Use language-specific placeholder
            const placeholderUrl = isPlaceholder
              ? router.locale === "en"
                ? "/img/project-placeholder-en.svg"
                : "/img/project-placeholder.svg"
              : url;
            const altText = isPlaceholder
              ? router.locale === "en"
                ? "Project in development"
                : "Proyecto en desarrollo"
              : project;

            return (
              <m.div key={`${index}-${key}`} variants={item} data-key={key}>
                <m.div
                  variants={hover}
                  className={isPlaceholder ? css.placeholderImage : ""}
                >
                  <Image
                    src={placeholderUrl}
                    alt={altText}
                    height={h}
                    width={w}
                    style={isPlaceholder ? { opacity: 0.9 } : {}}
                  />
                </m.div>
              </m.div>
            );
          })}
        </span>
      </div>
    </m.section>
  );
}

const container = {
  hidden: {
    transition: {
      delayChildren: 0.125,
      staggerChildren: 0.0625,
    },
  },
  visible: {
    transition: {
      delayChildren: 0.125,
      staggerChildren: 0.25,
    },
  },
  rest: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0,
    },
  },
  hover: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0,
    },
  },
};

const item = {
  hidden: {
    y: 75,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.35,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const hoverLeft = {
  rest: {
    x: 0,
  },
  hover: {
    x: -20,
  },
};

const hoverRight = {
  rest: {
    x: 0,
  },
  hover: {
    x: 20,
  },
};
