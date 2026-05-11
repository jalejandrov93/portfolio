// Next 16 stripped `swcMinify` (it's the default and only minifier now) and
// strictly validates `i18n` keys, rejecting next-i18next-specific options like
// `localePath` and `reloadOnPrerender`. Pull only the keys Next core understands
// from next-i18next.config.js; next-i18next reads its own file at runtime.
const { i18n: i18nFull } = require('./next-i18next.config')
const i18n = {
  defaultLocale: i18nFull.defaultLocale,
  locales: i18nFull.locales,
  ...(i18nFull.localeDetection !== undefined && { localeDetection: i18nFull.localeDetection }),
}

// Bundle analyzer is OPTIONAL — wrap require so a missing install doesn't
// crash `next dev`/`next build`. Only meaningful when ANALYZE=true.
let withBundleAnalyzer = (config) => config
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
} catch (err) {
  if (process.env.ANALYZE === 'true') {
    console.warn(
      '[next.config] @next/bundle-analyzer not installed. Run `pnpm install`.'
    )
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  sassOptions: {
    includePaths: ['./styles'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
