// Core packages
import Image from 'next/image'
import { useTranslation } from 'next-i18next';

// Section scss
import about from '../../../styles/sections/index/about.module.scss';
// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block'
import CopyBlock from '../../blocks/about.copy.block'
//import SectionGridBg from '../../blocks/section.grid.block'
// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import Container from '../../structure/container';
// Section structure
import Section from '../../structure/section';
import Reveal, { Stagger, StaggerItem } from '../../utils/reveal.util';

/**
 * Section: About
 * An overview of yourself.
 * Highlight your top level attributes and disciplines.
 * 
 * @returns {jsx} <About />
 */
export default function About() {
	const { t } = useTranslation('common');

	return (
		<Section classProp={about.section}>
			<Container spacing={['verticalXXXLrg']}>
				<Reveal>
					<SectionTitle
						title={t('about.title')}
						preTitle={t('about.preTitle')}
						subTitle={t('about.description')}
					/>
				</Reveal>
				<Stagger className={about.content}>
					<StaggerItem className={about.image}>
						<Image src="/img/me.jpg" alt="Foto Saludando" width={600} height={800}/>
					</StaggerItem>
					<StaggerItem className={about.copy}>
						<CopyBlock
							title={t('about.softSkills.title')}
							containerClass={about.container}
							iconClass={about.icon}
							icon={[ 'fat', 'ear-listen' ]}
							copy={t('about.softSkills.description')}
						/>
						<BadgesBlock
							title={t('about.methods.title')}
							containerClass={about.container}
							list={methods}
							fullContainer="fullContainer"
							block="methods"
							icon="fingerprint"
							copy={t('about.methods.description')}
							invertedColor="invertedColor"
							headerIcon={`${about.icon}`}
						/>
					</StaggerItem>
				</Stagger>
			</Container>
		</Section>
	)
}

const methods = [
	{ key: 'planet-moon', name: 'Investigación', type: 'fad' },
	{ key: 'qrcode', name: 'Estrategia Digital', type: 'fad' },
	{ key: 'window', name: 'Sistemas de Diseño', type: 'fad' },
	{ key: 'cubes', name: 'Estrategia de Producto', type: 'far' },
	{ key: 'layer-plus', name: 'Estrategia de Marca', type: 'fad' },
	{ key: 'solar-system', name: 'Operaciones', type: 'fad' },
];