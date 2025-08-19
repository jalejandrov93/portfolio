/**
 * Calcula el tiempo transcurrido desde una fecha dada hasta hoy
 * y lo devuelve en años y meses
 *
 * @param {string} startDate - Fecha de inicio en formato 'YYYY-MM-DD'
 * @returns {string} - Tiempo transcurrido en formato "X años Y meses"
 */
export function calculateTimeFromDate(startDate) {
  const start = new Date(startDate);
  const today = new Date();

  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();

  // Ajustar si los meses son negativos
  if (months < 0) {
    years--;
    months += 12;
  }

  // Ajustar si el día actual es anterior al día de inicio
  if (today.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  // Formatear la salida
  let result = "";

  if (years > 0) {
    result += `${years} año${years !== 1 ? "s" : ""}`;
  }

  if (months > 0) {
    if (result) result += " ";
    result += `${months} mes${months !== 1 ? "es" : ""}`;
  }

  return result || "0 meses";
}

/**
 * Calcula el tiempo transcurrido desde una fecha dada hasta hoy
 * y lo devuelve en años y meses (versión en inglés)
 *
 * @param {string} startDate - Fecha de inicio en formato 'YYYY-MM-DD'
 * @returns {string} - Tiempo transcurrido en formato "X years Y months"
 */
export function calculateTimeFromDateEN(startDate) {
  const start = new Date(startDate);
  const today = new Date();

  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();

  // Ajustar si los meses son negativos
  if (months < 0) {
    years--;
    months += 12;
  }

  // Ajustar si el día actual es anterior al día de inicio
  if (today.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  // Formatear la salida en inglés
  let result = "";

  if (years > 0) {
    result += `${years} year${years !== 1 ? "s" : ""}`;
  }

  if (months > 0) {
    if (result) result += " ";
    result += `${months} month${months !== 1 ? "s" : ""}`;
  }

  return result || "0 months";
}

/**
 * Hook para usar el tiempo transcurrido con actualización automática
 *
 * @param {string} startDate - Fecha de inicio en formato 'YYYY-MM-DD'
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {string} - Tiempo transcurrido actualizado
 */
import { useState, useEffect } from "react";

export function useTimeFromDate(startDate, locale = "es") {
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const time =
        locale === "en"
          ? calculateTimeFromDateEN(startDate)
          : calculateTimeFromDate(startDate);
      setTimeElapsed(time);
    };

    // Actualizar inmediatamente
    updateTime();

    // Actualizar cada día (86400000 ms = 24 horas)
    const interval = setInterval(updateTime, 86400000);

    return () => clearInterval(interval);
  }, [startDate, locale]);

  return timeElapsed;
}
