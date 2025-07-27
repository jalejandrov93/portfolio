import { useState } 		from 'react';
import { TypeAnimation } 	from 'react-type-animation';
import { useTranslation } 	from 'next-i18next';

import button 		from '../../../styles/blocks/button.module.scss';
import hero 		from '../../../styles/sections/index/hero.module.scss';
import HeroBg		from '../../blocks/hero.bg/bg-color-1';
import Container 	from '../../structure/container';
import Section 		from '../../structure/section';
import Icon 		from '../../utils/icon.util'
import space		from '../../utils/spacing.util';

/**
 * TO DO LIST
 *
 * - Create a typog.modules.scss
 *   Load this module onto every component, and use predefined typography classes to keep typography consistent
 *
 * - space.modules.scss
 *   Load this module onto every component, and use predefined spacial classes to keep geometry consistent
 */

export default function Hero() {
	const { t } = useTranslation('common');
	const [typingStatus, setTypingStatus] = useState('Initializing');

	return (
		<Section classProp={`${hero.section}`}>
			<Container spacing={'VerticalXXXL'}>
				<TypeAnimation className={`${hero.preHeader}`}
					sequence={[
						t('hero.intro.startDelay'),
						() => { setTypingStatus('typing') },
						t('hero.intro.start'),
						() => {	setTypingStatus('typed') },
						t('hero.intro.deleteDelay'),
						() => {	setTypingStatus('deleting') },
						t('hero.intro.end'),
						() => {	setTypingStatus('deleted') },
						t('hero.intro.restartDelay'),
					]}
					speed={t('hero.intro.speed')}
					deletionSpeed={t('hero.intro.deletionSpeed')}
					wrapper={t('hero.intro.wrapper')}
					repeat={Infinity}
				/>
				<section>
					<h1 className={hero.header}>
						{t('hero.name')}
						</h1>
					<h1 className={`${hero.header} ${hero.primaryDim}`}>
						{t('hero.tagline')}
					</h1>
				</section>
				<section>
					<p className={`${hero.primaryBright} subtitle ${space(["verticalLrg"])}`}>
						{t('hero.description')}
					</p>					
				</section>
				<section>
					<button	className={`button ${button.primary}`}
							onClick={ () => window.location = t('hero.buttons.primary.url') } >
						{t('hero.buttons.primary.title')}
					</button>
					<button className={`button ${button.secondary} leaveSite`}
							onClick={ ()=> window.open(t('hero.buttons.secondary.url'), "_blank") } >
						{t('hero.buttons.secondary.title')}
					</button>
				</section>
			</Container>
			<HeroBg theme="bg-color-1" />
		</Section>
	)
}