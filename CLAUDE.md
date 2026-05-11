# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Next.js 15 (Pages Router) · React 19 · JavaScript (no TypeScript) · pnpm. Styling is SCSS Modules + Tailwind v3 (Tailwind `preflight` is disabled in `tailwind.config.js` so it coexists with `the-new-css-reset` and the SCSS layer). i18n via `next-i18next`. Animations via `framer-motion`. Icons via FontAwesome free packs + `devicon` + `@tabler/icons-react`.

## Commands

```bash
pnpm dev          # next dev
pnpm build        # next build
pnpm start        # next start (serve built output)
pnpm lint         # next lint (extends next/core-web-vitals)
pnpm test         # jest --watch
pnpm jest path/to/file.test.jsx           # run a single test file
pnpm jest -t "name of the test"           # run by test name
```

`pnpm` is the canonical package manager (see `packageManager` in `package.json`). Note: `.github/workflows/nextjs.yml` only detects yarn/npm and falls through to `npm ci` — a pnpm step would need to be added before relying on CI.

## High-level architecture

The app is a static i18n portfolio. Almost everything user-visible is **JSON/translation-driven**, not hardcoded. Pages are thin compositions; logic lives in `components/utils/` and content lives in `content/` and `public/locales/`.

### Layered component model

```
pages/                  Pages Router routes; thin section composers
  _app.jsx              LazyMotion + appWithTranslation + global CSS + Analytics
  _document.jsx         <html lang> wiring
  api/                  Tiny serverless handlers (icon-form, evotunes-signature)
components/
  layout/               Navbar, Footer, Layout shell
  structure/            Section / Container — every section starts with these
  sections/             Page-level section components (index/, articles/, projects/, pricing/)
  blocks/               Reusable block components (hero bg, section grid/title, about copy/badges)
  ui/                   shadcn-style primitives (bento-grid, hero-parallax, scroll-area)
  utils/                Cross-cutting utilities (theme, icon, spacing, grid, page colors, badges, time/date, language switcher)
content/                JSON content + per-section _colors.json (page color theming)
public/locales/{es,en}/common.json   Translations (default locale is `es`)
styles/                 SCSS modules under blocks/, sections/, structure/, utils/ + global css/ and scss/
```

The expected nesting inside a section is `Section → Container → blocks/utils/components`. New sections should reuse `components/structure/section.jsx` and `container.jsx` so spacing tokens and reading-width math stay consistent.

### i18n

- `next-i18next.config.js`: `defaultLocale: 'es'`, locales `['es','en']`, namespaces under `public/locales/{locale}/common.json`.
- Every page that renders translated text needs `getStaticProps` returning `serverSideTranslations(locale, ['common'])` (see `pages/index.jsx` for the pattern).
- `_app.jsx` wraps export with `appWithTranslation`. Locale switching is handled by `components/utils/language-switcher.jsx` via `next/router`.
- Content like the Featured Projects grid reads structured arrays directly from translations: `t("projects.featured.items", { returnObjects: true })`. Adding/renaming projects = editing both `en/common.json` and `es/common.json` keys (`project`, `url`, `repo`, `descriptionTitle`, `description`, `keyFeatures[]`, `techStack`, `images[]`, `stack[]`). See `README_FEATURED_IMAGES.md` for image conventions.

### Theming and color system

Three themes coexist: `light`, `dark`, `unicorn`. `components/utils/theme.util.jsx`:

- Sets `:root[data-theme=...]`, persists to `localStorage`, listens to system `prefers-color-scheme`.
- Cycles light → dark → unicorn → light on toggle.
- On theme/route change, re-initializes a WebGL mesh-gradient (Stripe-style) bound to `#gradient-canvas`, reading colors from CSS vars `--gradient-color-1..4`.

`components/utils/page.colors.util.jsx` injects per-theme CSS variable overrides (`--mesh-color-1..4`) by consuming a section's `_colors.json` (see `content/index/_colors.json`, `content/articles/_colors.json`, etc.). To rethemes a page, edit the matching `_colors.json` — do not hardcode theme overrides in component CSS.

### Spacing and grid utilities

- `components/utils/spacing.util.jsx` returns class names from `styles/utils/spacing.module.scss` keyed by tokens like `VerticalXXXL`, `verticalLrg`. Use these tokens through `<Container spacing={[...]}>` rather than raw margin/padding.
- `components/utils/set.grid.util.jsx` computes a global CSS var `--grid-32` on resize (reading-width / 32). Consumed by SCSS modules for column math; do not duplicate this calculation elsewhere.

### Icons (gotcha)

`components/utils/icon.util.jsx` only registers FontAwesome **free** packs (`fas`, `far`, `fab`). It silently maps pro families to free equivalents:

- `fat` (thin) → `far`
- `fal` (light) → `far`
- `fad` (duotone) → `fas`

Existing JSON content may still reference pro types — that is intentional and handled at render time. Don't introduce a hard dependency on FontAwesome Pro.

### TRM (USD ↔ COP) pricing

The pricing table converts USD/COP. The npm `trm-api` package is **deprecated** in this repo because it threw `TypeError: number 0 is not iterable`. Current implementation fetches `https://trm-colombia.vercel.app/` with a fallback of `4000 COP/USD` on error. Full context in `TRM_API_FIX.md`. Do not reintroduce `trm-api`.

### Path alias caveat

- `jsconfig.json` maps `@/*` → repo root (used by app code, e.g. `import { cn } from "@/lib/utils"`).
- `jest.config.js` maps `@/(.*)$` → `<rootDir>/src/$1`, but there is **no `src/` directory**. New Jest tests using the `@/` alias will fail to resolve until that mapper is corrected to `<rootDir>/$1`. Use relative imports in tests as a workaround.

### Testing

Jest with `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`. Test files live in `tests/unit/sections/`. Default script is `--watch`; for CI runs use `pnpm jest --ci`.

### Deployment

`.github/workflows/nextjs.yml` builds and deploys to GitHub Pages on push to `main`. Vercel Analytics is wired in `_app.jsx` for hosted previews.

## Conventions

- **Component file naming**: `*.block.jsx` for reusable blocks, `*.util.jsx` for cross-cutting helpers, lowercase otherwise. Match the existing pattern in the same directory.
- **JSX, not TSX**: `components.json` has `"tsx": false`. Stay in `.jsx`.
- **Tailwind + SCSS coexist**: utility classes are fine on the newer components (`components/ui/`, `bento-grids.jsx`), but `preflight` is off, so don't assume Tailwind has reset margins/typography — those come from `the-new-css-reset` + `styles/css/global.css`.
- **Content over code**: when a change is "add a project", "add a career entry", "translate a string", the answer is almost always a JSON edit under `content/` or `public/locales/`, not a component change.
