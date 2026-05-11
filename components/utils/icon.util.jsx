// Core packages
import { useEffect, useState } from 'react'

// Font Awesome packages (kept for backwards compat with existing JSON content
// that still references fas/far/fab/fat/fal/fad keys; dropped in Phase 4).
const { library } = require('@fortawesome/fontawesome-svg-core')
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Tabler icons — preferred system for new callers; consistent stroke weight,
// tree-shaken on import (only the icons referenced in render paths ship).
import * as TablerIcons from '@tabler/icons-react'

// Load FA icons into library
library.add(fas, far, fab)

const FA_FAMILIES = new Set(['fas', 'far', 'fab', 'fat', 'fal', 'fad'])

// Map pro icon types to free alternatives (existing behavior — JSON content
// authored against FA pro keys keeps rendering).
const mapFaFamily = (family) => {
	switch (family) {
		case 'fat': // pro-thin → regular
		case 'fal': // pro-light → regular
			return 'far'
		case 'fad': // pro-duotone → solid
			return 'fas'
		default:
			return family
	}
}

// kebab-case → `IconPascalCase` so Tabler exports resolve by string name.
// "user" → "IconUser", "brand-github" → "IconBrandGithub".
const tablerComponentName = (name) =>
	'Icon' +
	name
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('')

const resolveTabler = (name) =>
	TablerIcons[tablerComponentName(name)] || TablerIcons.IconQuestionMark

/**
 * Icon factory utility — dual-accepts FA tuples and Tabler names.
 *
 * Accepts either:
 *   - Tuple [family, key] for Font Awesome:    <Icon icon={['fas', 'user']} />
 *   - Tuple ['tabler', name] for Tabler:        <Icon icon={['tabler', 'user']} />
 *   - Bare string (defaults to Tabler):         <Icon icon="brand-github" />
 *
 * Pro FA families (fat/fal/fad) silently fall back to free equivalents.
 *
 * @returns {jsx} <Icon />
 */
export default function Icon({ icon, size = 18, stroke = 1.6, className, ...rest }) {
	// Bare string → Tabler
	if (typeof icon === 'string') {
		const Cmp = resolveTabler(icon)
		return <Cmp size={size} stroke={stroke} className={className} {...rest} />
	}

	if (Array.isArray(icon)) {
		const [family, name] = icon

		// Tabler tuple
		if (family === 'tabler') {
			const Cmp = resolveTabler(name)
			return <Cmp size={size} stroke={stroke} className={className} {...rest} />
		}

		// Font Awesome tuple (preserve hydration-safe deferred set for SSR mismatch)
		if (FA_FAMILIES.has(family)) {
			return <FaIcon family={family} name={name} className={className} {...rest} />
		}
	}

	return null
}

// FA subcomponent — keeps the original deferred-set hydration pattern so
// existing FA renders behave identically.
function FaIcon({ family, name, className, ...rest }) {
	const [stateKey, setStateKey] = useState('fa-circle-o-notch')
	useEffect(() => setStateKey(name), [name])
	return (
		<FontAwesomeIcon
			icon={[mapFaFamily(family), stateKey]}
			className={className}
			{...rest}
		/>
	)
}
