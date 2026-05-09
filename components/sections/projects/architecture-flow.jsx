"use client";
import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  IconArrowDown,
  IconBolt,
  IconCloudDataConnection,
  IconDatabase,
  IconFolder,
  IconServer,
  IconUsersGroup,
} from "@tabler/icons-react";

const NODE_ICONS = {
  source: IconCloudDataConnection,
  db: IconDatabase,
  cache: IconBolt,
  api: IconServer,
  storage: IconFolder,
  consumer: IconUsersGroup,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 6 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const horizontalConnectorVariants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const verticalConnectorVariants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ArchitectureFlow({ nodes }) {
  if (!Array.isArray(nodes) || nodes.length === 0) return null;
  const ariaLabel = `Data flow: ${nodes.map((n) => n.label).join(" to ")}`;

  return (
    <motion.div
      className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-2"
      role="img"
      aria-label={ariaLabel}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {nodes.map((node, i) => {
        const Icon = NODE_ICONS[node.type] || IconServer;
        const isLast = i === nodes.length - 1;
        return (
          <Fragment key={`${node.label}-${i}`}>
            <motion.div
              className="flex items-center gap-2 px-3 py-2 border rounded-lg flex-1 min-w-0"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--primary-dim2)",
              }}
              variants={nodeVariants}
            >
              <Icon
                className="flex-shrink-0 w-4 h-4"
                stroke={1.6}
                style={{ color: "var(--secondary)" }}
              />
              <span
                className="text-[11px] leading-tight font-medium tracking-tight truncate"
                style={{
                  fontFamily: "var(--font-accent)",
                  color: "var(--primary-bright)",
                }}
              >
                {node.label}
              </span>
            </motion.div>
            {!isLast && (
              <div
                className="flex items-center justify-center self-center"
                aria-hidden="true"
              >
                {/* Horizontal connector — md+ */}
                <motion.span
                  className="hidden md:block h-px w-5 origin-left rounded-full"
                  style={{
                    background:
                      "linear-gradient(to right, var(--neon-1-1), var(--neon-1-2))",
                    boxShadow: "0 0 6px var(--neon-1-2)",
                  }}
                  variants={horizontalConnectorVariants}
                />
                {/* Vertical connector — mobile */}
                <motion.span
                  className="md:hidden flex items-center justify-center origin-top"
                  variants={verticalConnectorVariants}
                >
                  <IconArrowDown
                    className="w-4 h-4 opacity-60"
                    stroke={1.6}
                    style={{ color: "var(--secondary)" }}
                  />
                </motion.span>
              </div>
            )}
          </Fragment>
        );
      })}
    </motion.div>
  );
}
