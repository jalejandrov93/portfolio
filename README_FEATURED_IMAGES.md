# Featured / Bento Grids Project Images

Recommended sizes and aspect ratios to keep visual consistency across the Featured Projects (Bento Grids / Hero Parallax) and classic Featured list.

## Single (Tall) Preview

- Use when showing a single mobile-like or tall dashboard frame.
- Preferred exported size: 1200 x 556 (h x w in current config) -> Actually code expects `h: "1200", w: "556"` (portrait).
- Aspect ratio: ~2.16:1 (height:width) inverted because we pass h > w for portrait. Keep consistent.
- Format: PNG (transparent background if possible) or optimized WEBP.

## Multiple / Grid Thumbnails (If implemented later)

- Use square or 4:3 ratio images.
- Suggested base: 800 x 600 (landscape) or 1000 x 1000 (square).

## Placeholder Images

- English placeholder: `/public/img/project-placeholder-en.svg`
- Spanish placeholder: `/public/img/project-placeholder.svg`
- Keep any new placeholder variants as optimized SVG under 25KB.

## Naming Convention

- `kebab-case` descriptive.
- Examples: `artemisa.png`, `esptribunas.png`, `bellanova.png`

## Optimization Checklist

- Run through an optimizer (e.g. ImageOptim, Squoosh) to reduce size < 300KB where possible.
- Prefer modern formats (WEBP/AVIF) for large photographic content; keep a PNG fallback if transparency needed.
- Avoid embedding text; translate text via locale files instead of rasterizing.

## Adding a New Featured Project

1. Place image under `public/img/` following naming rules.
2. Add an entry in `public/locales/en/common.json` and `public/locales/es/common.json` inside `projects.featured.items`.
3. For in‑progress projects without final UI, use placeholder key `placeholder` so component styling applies properly.
4. Maintain keys: `project`, `url`, `repo`, `descriptionTitle`, `description`, `keyFeatures[]`, `techStack`, `images[]`, `stack[]`.
5. For stack badges use existing keys (check other entries) to avoid missing icons.

## Color / Contrast Tips

- Ensure sufficient contrast against theme overlays.
- Add subtle inner padding inside captured screenshots to prevent important UI touching rounded corners.

---
This guide keeps consistency after renaming Hero Parallax Demo to Bento Grids and expanding the project catalog.
