// Core packages
import { useEffect, useState } from 'react'

// Font Awesome packages
const { library, config } = require('@fortawesome/fontawesome-svg-core')
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Load icons into library
// Note: Using only free FontAwesome icons (solid, regular, brands)
// Pro icons (thin, light, duotone) replaced with solid/regular alternatives
library.add(fas, far, fab)

/**
 * Icon factory utility.
 * Generates icon JSX and returns it. Keeps all icon packages isolated in here
 * 
 * ! Using only free FontAwesome icons for distribution
 * ? Available icon types: 'fas' (solid), 'far' (regular), 'fab' (brands)
 * ? Pro icon types (fat, fal, fad) have been replaced with solid/regular alternatives
 * 
 * ! requiring the library will likely create a SSR issue
 * ! According to maintainers of @fortawesome the best solution will be to import the icon directly 
 * ! and avoid the library module all together which is inline with MD loading plans
 * * https://github.com/FortAwesome/Font-Awesome/issues/19348
 *
 * @param 	{array} icon request props [ iconType, iconKey ]
 * @returns {jsx} 	<Icon />
 */
export default function Icon({ icon }) {

	const [ iconType, iconKey ] = icon

	const [ stateIconKey, setIconKey ] = useState('fa-circle-o-notch')

	useEffect( () => setIconKey( iconKey ), [ iconKey ] )

	// Map pro icon types to free alternatives
	const mapIconType = (type) => {
		switch(type) {
			case 'fat': // pro-thin -> solid
			case 'fal': // pro-light -> regular  
				return 'far'
			case 'fad': // pro-duotone -> solid
				return 'fas'
			default:
				return type
		}
	}

	const mappedIconType = mapIconType(iconType)

	return (
		<FontAwesomeIcon icon={[ mappedIconType, stateIconKey ]} />
	)
}
