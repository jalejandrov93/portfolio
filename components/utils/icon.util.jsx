// Tabler-only icon wrapper. Phase 4B dropped the FontAwesome path entirely;
// the @fortawesome/* deps are removed from package.json. Callers either pass
// a bare string ('code') or a ['tabler', name] tuple — both resolve to a
// Tabler component via PascalCase lookup. Devicon CSS continues to be used
// directly via class names in badge.list.util.jsx for brand logos.

import * as TablerIcons from '@tabler/icons-react'

// kebab-case → `IconPascalCase`. Example: "brand-github" → "IconBrandGithub".
const tablerComponentName = (name) =>
	'Icon' +
	name
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('')

const resolveTabler = (name) =>
	TablerIcons[tablerComponentName(name)] || TablerIcons.IconQuestionMark

/**
 * Icon — Tabler-backed factory.
 *
 * Accepts:
 *   - Bare string:                  <Icon icon="code" />
 *   - Tuple ['tabler', name]:       <Icon icon={['tabler', 'code']} />
 *
 * Legacy FA tuples (['fas','...'] etc.) silently fall through to null.
 * The badge.list.util.jsx switch warns + skips render for any unmigrated
 * data; the caller's label text still shows.
 */
export default function Icon({ icon, size = 18, stroke = 1.6, className, ...rest }) {
	if (typeof icon === 'string') {
		const Cmp = resolveTabler(icon)
		return <Cmp size={size} stroke={stroke} className={className} {...rest} />
	}

	if (Array.isArray(icon)) {
		const [family, name] = icon
		if (family === 'tabler') {
			const Cmp = resolveTabler(name)
			return <Cmp size={size} stroke={stroke} className={className} {...rest} />
		}
	}

	return null
}
