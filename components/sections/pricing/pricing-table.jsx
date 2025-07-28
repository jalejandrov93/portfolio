"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import TrmApi from "trm-api";
import Container from "../../structure/container";
import css from "../../../styles/sections/pricing/pricing-table.module.scss";

// Iconos SVG
const DollarSign = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

const TrendingUp = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const Code = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const Globe = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 919-9"
    />
  </svg>
);

const Smartphone = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
    />
  </svg>
);

const CheckCircle = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Package = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

export default function PricingTable() {
  const { t } = useTranslation("common");
  const [currency, setCurrency] = useState("USD");
  const [trm, setTrm] = useState(null);
  const [trmDate, setTrmDate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Datos de precios en USD con iconos y propiedad activa
  const pricingData = [
    {
      type: "landingPage",
      minPrice: 300,
      maxPrice: 700,
      icon: Globe,
      color: "blue",
      activa: true, // ✅ Agregada propiedad activa
    },
    {
      type: "cms",
      minPrice: 500,
      maxPrice: 1200,
      icon: Code,
      color: "green",
      activa: true, // ✅ Agregada propiedad activa
    },
    {
      type: "framework",
      minPrice: 1000,
      maxPrice: 2500,
      icon: TrendingUp,
      color: "purple",
      activa: true, // ✅ Agregada propiedad activa
    },
    {
      type: "fullApp",
      minPrice: 5000,
      maxPrice: 15000,
      icon: Smartphone,
      color: "orange",
      activa: false, // ✅ Esta tarjeta no se mostrará
    },
  ];

  // ✅ Filtrar solo las tarjetas activas
  const activePricingData = pricingData.filter((item) => item.activa);

  // ✅ Obtener TRM usando trm-api oficial
  useEffect(() => {
    const fetchTrm = async () => {
      try {
        const trmApi = new TrmApi();
        const data = await trmApi.latest();

        console.log("TRM API data:", data);

        if (data?.valor) {
          setTrm(Number(data.valor));
          // Formatear fecha desde vigenciadesde
          if (data.vigenciadesde) {
            const date = new Date(data.vigenciadesde);
            setTrmDate(date.toISOString().slice(0, 10));
          } else {
            setTrmDate(new Date().toISOString().slice(0, 10));
          }
        } else {
          console.warn("TRM API returned unexpected structure:", data);
          // Fallback: usar un valor por defecto
          setTrm(4000);
          setTrmDate(new Date().toISOString().slice(0, 10));
        }
      } catch (err) {
        console.error("Error fetching TRM:", err);
        // Fallback: usar un valor por defecto en caso de error
        setTrm(4000);
        setTrmDate(new Date().toISOString().slice(0, 10));
      } finally {
        setLoading(false);
      }
    };

    fetchTrm();
  }, []);

  const formatPrice = (priceUsd) => {
    if (!trm) return loading ? "…" : "–";
    const price =
      currency === "USD"
        ? `$${priceUsd.toLocaleString("en-US")}`
        : (() => {
            const cop = Math.round(priceUsd * trm);
            if (cop >= 1_000_000) return `$${(cop / 1e6).toFixed(1)} M`;
            if (cop >= 1_000) return `$${(cop / 1e3).toFixed(0)} K`;
            return `$${cop.toLocaleString("es-CO")}`;
          })();
    return price;
  };

  const handleCurrencyToggle = () => {
    setCurrency((prevCurrency) => (prevCurrency === "USD" ? "COP" : "USD"));
  };

  const isChecked = currency === "COP";

  return (
    <div className={css.section}>
      <Container spacing={["verticalXXXLrg"]}>
        {/* Header Section */}
        <div className={css.headerSection}>
          <span className={`${css.badge} ${css.secondary}`}>
            {t("pricing.badge")}
          </span>
          <h1 className={css.mainTitle}>{t("pricing.title")}</h1>
          <p className={css.subtitle}>{t("pricing.subtitle")}</p>
        </div>

        {/* Currency Toggle */}
        <div className={css.currencySection}>
          <div className={css.currencyToggleContainer}>
            <span
              className={`${css.currencyLabel} ${
                currency === "USD" ? css.active : ""
              } ${currency === "USD" ? css.usd : ""}`}
            >
              {t("pricing.currency.usd")}
            </span>
            <button
              type="button"
              className={`${css.switch} ${isChecked ? css.checked : ""}`}
              onClick={handleCurrencyToggle}
              disabled={loading}
              aria-label={t("pricing.currency.toggle")}
            >
              <span
                className={`${css.switchSlider} ${
                  isChecked ? css.checked : ""
                }`}
              />
            </button>
            <span
              className={`${css.currencyLabel} ${
                currency === "COP" ? css.active : ""
              } ${currency === "COP" ? css.cop : ""}`}
            >
              {t("pricing.currency.cop")}
            </span>
          </div>

          {currency === "COP" && (
            <div className={css.trmInfo}>
              <DollarSign />
              <span>
                {t("pricing.currency.trm")}:{" "}
                {loading ? (
                  <span className={`${css.skeleton} ${css.inline}`}></span>
                ) : (
                  `$${trm && trm.toLocaleString("es-CO")}`
                )}
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards - Solo mostrar las activas */}
        <div className={css.cardsContainer}>
          {activePricingData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className={css.pricingCard}>
                {/* Card Header with Icon */}
                <div className={css.cardHeader}>
                  <div className={`${css.iconContainer} ${css[item.color]}`}>
                    <IconComponent />
                  </div>
                  <h3 className={css.cardTitle}>
                    {t(`pricing.projects.${item.type}.title`)}
                  </h3>
                  <p className={css.cardDescription}>
                    {t(`pricing.projects.${item.type}.description`)}
                  </p>
                </div>

                {/* Price Range */}
                <div className={css.cardContent}>
                  <div className={css.priceSection}>
                    <div className={css.priceRange}>
                      <span
                        className={`${css.price} ${
                          currency === "COP" ? css.medium : css.large
                        }`}
                      >
                        {loading ? (
                          <span
                            className={`${css.skeleton} ${css.inline}`}
                          ></span>
                        ) : (
                          formatPrice(item.minPrice)
                        )}
                      </span>
                      <span className={css.priceSeparator}>–</span>
                      <span
                        className={`${css.price} ${
                          currency === "COP" ? css.medium : css.large
                        }`}
                      >
                        {loading ? (
                          <span
                            className={`${css.skeleton} ${css.inline}`}
                          ></span>
                        ) : (
                          formatPrice(item.maxPrice)
                        )}
                      </span>
                    </div>
                    <span
                      className={`${css.badge} ${css.outline} ${css.currencyBadge}`}
                    >
                      {currency}
                    </span>
                    {currency === "COP" && (
                      <p className={css.formatNote}>
                        {t("pricing.formatNote")}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className={css.featuresList}>
                    <h4 className={css.sectionTitle}>
                      <CheckCircle className={css.sectionIcon} />
                      {t("pricing.sections.features")}
                    </h4>
                    {t(`pricing.projects.${item.type}.features`, {
                      returnObjects: true,
                    }).map((feature, featureIndex) => (
                      <div key={featureIndex} className={css.featureItem}>
                        <div className={css.featureDot}></div>
                        <span className={css.featureText}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <div className={css.deliverablesList}>
                    <h4 className={css.sectionTitle}>
                      <Package className={css.sectionIcon} />
                      {t("pricing.sections.deliverables")}
                    </h4>
                    {t(`pricing.projects.${item.type}.deliverables`, {
                      returnObjects: true,
                    }).map((deliverable, deliverableIndex) => (
                      <div
                        key={deliverableIndex}
                        className={css.deliverableItem}
                      >
                        <div className={css.deliverableDot}></div>
                        <span className={css.deliverableText}>
                          {deliverable}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gradient Border Effect */}
                <div className={css.gradientOverlay}></div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className={css.disclaimerSection}>
          <div className={css.disclaimerBox}>
            <p className={css.disclaimerText}>
              <strong>{t("pricing.disclaimer.title")}</strong>{" "}
              {t("pricing.disclaimer.text")}
              {currency === "COP" && t("pricing.disclaimer.trmNote")}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
