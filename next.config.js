const { i18n } = require('./next-i18next.config')

// Bundle analyzer is an OPTIONAL dev dependency — wrap require so a missing
// install doesn't crash `next dev`/`next build`. Only meaningful when
// `ANALYZE=true` is set (see `pnpm analyze` script).
let withBundleAnalyzer = (config) => config
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
} catch (err) {
  if (process.env.ANALYZE === 'true') {
    console.warn(
      '[next.config] @next/bundle-analyzer not installed. Run `pnpm install` (it is already declared in devDependencies).'
    )
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  sassOptions: {
    includePaths: ['./styles'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
