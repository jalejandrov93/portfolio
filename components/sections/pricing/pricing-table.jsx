import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  IconCurrencyDollar,
  IconTrendingUp,
  IconCode,
  IconWorld,
  IconDeviceMobile,
  IconCircleCheck,
  IconPackage,
} from "@tabler/icons-react";

import Container from "../../structure/container";
import css from "../../../styles/sections/pricing/pricing-table.module.scss";

// TRM (COP per USD) — fetched from trm-colombia.vercel.app per TRM_API_FIX.md.
// The trm-api npm package is intentionally NOT used: it threw "TypeError:
// number 0 is not iterable" in production. Direct fetch + defensive shape
// detection + 4000 fallback is the contracted pattern.
const TRM_ENDPOINT = "https://trm-colombia.vercel.app/";
const TRM_FALLBACK = 4000;

const PRICING_CARDS = [
  { type: "landingPage", minPrice: 300, maxPrice: 700, icon: IconWorld, color: "blue", active: true },
  { type: "cms", minPrice: 500, maxPrice: 1200, icon: IconCode, color: "green", active: true },
  { type: "framework", minPrice: 1000, maxPrice: 2500, icon: IconTrendingUp, color: "purple", active: true },
  { type: "fullApp", minPrice: 5000, maxPrice: 15000, icon: IconDeviceMobile, color: "orange", active: false },
];

export default function PricingTable() {
  const { t } = useTranslation("common");
  const [currency, setCurrency] = useState("USD");
  const [trm, setTrm] = useState(null);
  const [trmDate, setTrmDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchTrm = async () => {
      try {
        const res = await fetch(TRM_ENDPOINT);
        const data = await res.json();
        // Defensive shape detection — endpoint shape varies. Try common keys
        // and fall back to treating the raw response as a number.
        const raw = data?.valor ?? data?.value ?? data?.trm ?? data;
        const value = typeof raw === "number" ? raw : Number(raw);

        if (cancelled) return;

        if (Number.isFinite(value) && value > 0) {
          setTrm(value);
          const dateSource = data?.vigenciadesde || data?.date || data?.updatedAt;
          setTrmDate(
            dateSource
              ? new Date(dateSource).toISOString().slice(0, 10)
              : new Date().toISOString().slice(0, 10)
          );
        } else {
          throw new Error("TRM endpoint returned unexpected shape");
        }
      } catch (err) {
        if (cancelled) return;
        console.warn("[Pricing] TRM fetch failed — using fallback:", err.message);
        setTrm(TRM_FALLBACK);
        setTrmDate(new Date().toISOString().slice(0, 10));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTrm();
    return () => { cancelled = true; };
  }, []);

  const formatPrice = (priceUsd) => {
    if (!trm) return loading ? "…" : "–";
    if (currency === "USD") return `$${priceUsd.toLocaleString("en-US")}`;
    const cop = Math.round(priceUsd * trm);
    if (cop >= 1_000_000) return `$${(cop / 1e6).toFixed(1)} M`;
    if (cop >= 1_000) return `$${(cop / 1e3).toFixed(0)} K`;
    return `$${cop.toLocaleString("es-CO")}`;
  };

  const toggleCurrency = () =>
    setCurrency((prev) => (prev === "USD" ? "COP" : "USD"));

  const isChecked = currency === "COP";
  const activeCards = PRICING_CARDS.filter((c) => c.active);

  return (
    <div className={css.section}>
      <Container spacing={["verticalXXXLrg"]}>
        <div className={css.headerSection}>
          <span className={`${css.badge} ${css.secondary} eyebrow`}>
            {t("pricing.badge")}
          </span>
          <h1 className={css.mainTitle}>{t("pricing.title")}</h1>
          <p className={css.subtitle}>{t("pricing.subtitle")}</p>
        </div>

        <div className={css.currencySection}>
          <div className={css.currencyToggleContainer}>
            <span
              className={`${css.currencyLabel} ${currency === "USD" ? css.active : ""} ${currency === "USD" ? css.usd : ""}`}
            >
              {t("pricing.currency.usd")}
            </span>
            <button
              type="button"
              className={`${css.switch} ${isChecked ? css.checked : ""}`}
              onClick={toggleCurrency}
              disabled={loading}
              aria-label={t("pricing.currency.toggle")}
            >
              <span className={`${css.switchSlider} ${isChecked ? css.checked : ""}`} />
            </button>
            <span
              className={`${css.currencyLabel} ${currency === "COP" ? css.active : ""} ${currency === "COP" ? css.cop : ""}`}
            >
              {t("pricing.currency.cop")}
            </span>
          </div>

          {currency === "COP" && (
            <div className={css.trmInfo}>
              <IconCurrencyDollar size={14} stroke={1.8} />
              <span>
                {t("pricing.currency.trm")}:{" "}
                {loading ? (
                  <span className={`${css.skeleton} ${css.inline}`}></span>
                ) : (
                  `$${trm && trm.toLocaleString("es-CO")}`
                )}
                {trmDate && !loading && (
                  <span className={css.trmDate}> · {trmDate}</span>
                )}
              </span>
            </div>
          )}
        </div>

        <div className={css.cardsContainer}>
          {activeCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={css.pricingCard}>
                <div className={css.cardHeader}>
                  <div className={`${css.iconContainer} ${css[item.color]}`}>
                    <Icon size={24} stroke={1.6} />
                  </div>
                  <h3 className={css.cardTitle}>
                    {t(`pricing.projects.${item.type}.title`)}
                  </h3>
                  <p className={css.cardDescription}>
                    {t(`pricing.projects.${item.type}.description`)}
                  </p>
                </div>

                <div className={css.cardContent}>
                  <div className={css.priceSection}>
                    <div className={css.priceRange}>
                      <span className={`${css.price} ${currency === "COP" ? css.medium : css.large}`}>
                        {loading ? (
                          <span className={`${css.skeleton} ${css.inline}`}></span>
                        ) : (
                          formatPrice(item.minPrice)
                        )}
                      </span>
                      <span className={css.priceSeparator}>–</span>
                      <span className={`${css.price} ${currency === "COP" ? css.medium : css.large}`}>
                        {loading ? (
                          <span className={`${css.skeleton} ${css.inline}`}></span>
                        ) : (
                          formatPrice(item.maxPrice)
                        )}
                      </span>
                    </div>
                    <span className={`${css.badge} ${css.outline} ${css.currencyBadge}`}>
                      {currency}
                    </span>
                    {currency === "COP" && (
                      <p className={css.formatNote}>{t("pricing.formatNote")}</p>
                    )}
                  </div>

                  <div className={css.featuresList}>
                    <h4 className={css.sectionTitle}>
                      <IconCircleCheck className={css.sectionIcon} size={16} stroke={1.8} />
                      {t("pricing.sections.features")}
                    </h4>
                    {t(`pricing.projects.${item.type}.features`, { returnObjects: true }).map(
                      (feature, featureIndex) => (
                        <div key={featureIndex} className={css.featureItem}>
                          <div className={css.featureDot}></div>
                          <span className={css.featureText}>{feature}</span>
                        </div>
                      )
                    )}
                  </div>

                  <div className={css.deliverablesList}>
                    <h4 className={css.sectionTitle}>
                      <IconPackage className={css.sectionIcon} size={16} stroke={1.8} />
                      {t("pricing.sections.deliverables")}
                    </h4>
                    {t(`pricing.projects.${item.type}.deliverables`, { returnObjects: true }).map(
                      (deliverable, deliverableIndex) => (
                        <div key={deliverableIndex} className={css.deliverableItem}>
                          <div className={css.deliverableDot}></div>
                          <span className={css.deliverableText}>{deliverable}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className={css.gradientOverlay}></div>
              </div>
            );
          })}
        </div>

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
