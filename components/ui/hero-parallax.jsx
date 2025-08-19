import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      style={{ backgroundColor: "var(--background)" }}
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const { t } = useTranslation("common");

  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1
        className="text-2xl md:text-7xl font-bold"
        style={{ color: "var(--primary-bright)" }}
      >
        {t("projects.featured.title")}
      </h1>
      <p
        className="max-w-2xl text-base md:text-xl mt-8"
        style={{ color: "var(--primary)" }}
      >
        {t("projects.featured.subtitle")}
      </p>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  // Verificar si el proyecto tiene URL y si es externa
  const hasUrl = product.link && product.link !== "#" && product.link !== null;
  const isExternalUrl = hasUrl && (product.link.startsWith("http://") || product.link.startsWith("https://"));

  const cardContent = (
    <Image
      src={product.thumbnail}
      height="600"
      width="600"
      className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
      alt={product.title}
    />
  );

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className={`group/product h-96 w-[30rem] relative flex-shrink-0 hero-parallax-card ${
        hasUrl ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {hasUrl ? (
        <Link
          href={product.link}
          target={isExternalUrl ? "_blank" : "_self"}
          rel={isExternalUrl ? "noopener noreferrer" : undefined}
          className="block group-hover/product:shadow-2xl"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="block group-hover/product:shadow-2xl">
          {cardContent}
        </div>
      )}

      {/* Overlay con gradiente del tema */}
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 pointer-events-none rounded-lg hero-parallax-overlay"
        style={{
          background: `linear-gradient(135deg, var(--background-dim) 0%, var(--background-dim2) 100%)`,
        }}
      ></div>

      {/* Contenido del card */}
      <div className={`absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 ${hasUrl ? "pointer-events-none" : ""}`}>
        <div>
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: "var(--primary-bright)" }}
          >
            {product.title}
          </h2>

          {/* Descripción */}
          {product.description && (
            <p
              className="text-sm mb-4 line-clamp-3"
              style={{ color: "var(--primary)" }}
            >
              {product.description}
            </p>
          )}

          {/* Indicador de enlace si tiene URL */}
          {hasUrl && (
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-medium flex items-center gap-1"
                style={{ color: "var(--secondary)" }}
              >
                {isExternalUrl ? (
                  <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-3.5a.75.75 0 011.5 0v3.5A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h3.5a.75.75 0 010 1.5h-3.5z" />
                      <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" />
                    </svg>
                    Ver proyecto
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
                    </svg>
                    Ver detalles
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Badges de tecnologías */}
        {product.stack && product.stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.stack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full font-medium"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--background)",
                }}
              >
                {tech.name}
              </span>
            ))}
            {product.stack.length > 4 && (
              <span
                className="px-2 py-1 text-xs rounded-full font-medium"
                style={{
                  backgroundColor: "var(--primary-dim2)",
                  color: "var(--primary)",
                }}
              >
                +{product.stack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
