"use client";
import React from "react";
import { cn } from "@/lib/utils";

// Basic Bento Grid container inspired by Aceternity UI implementation
export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[20rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

// Individual grid item. Accepts optional header (ReactNode), icon and description.
export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}) => {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl shadow-sm transition-all hover:shadow md:p-5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
        className
      )}
      style={{
        backgroundColor: "var(--background-dim2)",
        borderColor: "var(--primary-dim2)",
        borderWidth: "1px",
        padding: "1rem",
      }}
    >
      {header && (
        <div className="flex items-center justify-center w-full h-full mb-4 overflow-hidden rounded-md pointer-events-none">
          {header}
        </div>
      )}
      <div className="mt-auto space-y-2">
        <h3
          className="text-base font-semibold leading-snug tracking-tight md:text-lg"
          style={{ color: "var(--primary-bright)" }}
        >
          {title}
        </h3>
        {description && (
          <p
            className="text-sm line-clamp-4"
            style={{ color: "var(--primary)" }}
          >
            {description}
          </p>
        )}
      </div>
      {icon && (
        <div
          className="absolute right-2 top-2 transition-opacity group-hover:opacity-80"
          style={{ color: "var(--primary-dim)" }}
        >
          {icon}
        </div>
      )}
    </Wrapper>
  );
};

export default BentoGrid;
