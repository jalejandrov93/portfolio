// Core packages
import { Analytics } from '@vercel/analytics/react';
import { LazyMotion, domAnimation } from "framer-motion"
import { appWithTranslation } from 'next-i18next'

// Utils
import SetGridGap from '../components/utils/set.grid.util'

// Structure
import Layout from '../components/layout/layout'

// CSS reset (https://github.com/elad2412/the-new-css-reset.git)
import "../node_modules/the-new-css-reset/css/reset.css"

// Fontsource local font import (https://github.com/fontsource/fontsource)
// Variable fonts ship every weight/axis in one file — single network request, smaller
// total payload than discrete 400/700/800 weights, and unlocks editorial features
// (font-feature-settings ss01/cv11/cv03) without extra requests.
import "@fontsource-variable/inter"
import "@fontsource-variable/jetbrains-mono"

// Devicon import (https://github.com/devicons/devicon)
import '../node_modules/devicon/devicon.min.css'

// Global css
import '../styles/css/variables.css'
import '../styles/css/global.css'
import '../styles/globals.css'

/**
 * _app.jsx
 *
 * @param {?} Component
 * @param {?} pageProps
 * @returns
 */
function MyApp({ Component, pageProps }) {
	return (
		<>
		<LazyMotion features={domAnimation}>
			<Layout>
				<Component {...pageProps} />
				<SetGridGap />
				<Analytics />
			</Layout>
		</LazyMotion>
		</>
	)
}

export default appWithTranslation(MyApp)