import { cn } from "@/lib/utils";
import {
  IconCode,
  IconDeviceMobile,
  IconPalette,
  IconRocket,
  IconUsers,
  IconShield,
  IconBrandReact,
  IconDatabase,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";

export function FeaturesSectionDemo() {
  const { t } = useTranslation("common");

  const features = [
    {
      title: t("features.items.fullStack.title"),
      description: t("features.items.fullStack.description"),
      icon: <IconCode />,
    },
    {
      title: t("features.items.responsive.title"),
      description: t("features.items.responsive.description"),
      icon: <IconDeviceMobile />,
    },
    {
      title: t("features.items.uiux.title"),
      description: t("features.items.uiux.description"),
      icon: <IconPalette />,
    },
    {
      title: t("features.items.performance.title"),
      description: t("features.items.performance.description"),
      icon: <IconRocket />,
    },
    {
      title: t("features.items.collaboration.title"),
      description: t("features.items.collaboration.description"),
      icon: <IconUsers />,
    },
    {
      title: t("features.items.security.title"),
      description: t("features.items.security.description"),
      icon: <IconShield />,
    },
    {
      title: t("features.items.modernTech.title"),
      description: t("features.items.modernTech.description"),
      icon: <IconBrandReact />,
    },
    {
      title: t("features.items.dataManagement.title"),
      description: t("features.items.dataManagement.description"),
      icon: <IconDatabase />,
    },
  ];

  return (
    <div className="py-20 lg:py-40">
      <div className="px-4 mx-auto mb-20 max-w-7xl">
        <h2
          className="mb-4 text-3xl font-bold text-center md:text-5xl"
          style={{ color: "var(--primary-bright)" }}
        >
          {t("features.title")}
        </h2>
        <p
          className="mx-auto max-w-3xl text-lg text-center"
          style={{ color: "var(--primary)" }}
        >
          {t("features.subtitle")}
        </p>
      </div>
      <div className="grid relative z-10 grid-cols-1 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
      style={{ borderColor: "var(--border-color, #e5e7eb)" }}
    >
      {index < 4 && (
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-t to-transparent opacity-0 transition duration-200 pointer-events-none group-hover/feature:opacity-100 from-neutral-100 dark:from-neutral-800"
          style={{
            background:
              index < 4
                ? "linear-gradient(to top, var(--background-secondary, #f3f4f6), transparent)"
                : "linear-gradient(to bottom, var(--background-secondary, #f3f4f6), transparent)",
          }}
        />
      )}
      {index >= 4 && (
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-b to-transparent opacity-0 transition duration-200 pointer-events-none group-hover/feature:opacity-100 from-neutral-100 dark:from-neutral-800"
          style={{
            background:
              "linear-gradient(to bottom, var(--background-secondary, #f3f4f6), transparent)",
          }}
        />
      )}
      <div
        className="relative z-10 px-10 mb-4"
        style={{ color: "var(--primary)" }}
      >
        {icon}
      </div>
      <div className="relative z-10 px-10 mb-2 text-lg font-bold">
        <div
          className="absolute inset-y-0 left-0 w-1 h-6 rounded-tr-full rounded-br-full transition-all duration-200 origin-center group-hover/feature:h-8 group-hover/feature:bg-blue-500"
          style={{ backgroundColor: "var(--border-color, #d1d5db)" }}
        />
        <span
          className="inline-block transition duration-200 group-hover/feature:translate-x-2"
          style={{ color: "var(--primary-bright)" }}
        >
          {title}
        </span>
      </div>
      <p
        className="relative z-10 px-10 max-w-xs text-sm"
        style={{ color: "var(--primary)" }}
      >
        {description}
      </p>
    </div>
  );
};
