import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

import button from '../../../styles/blocks/button.module.scss';
import hero from '../../../styles/sections/index/hero.module.scss';
import HeroBg from '../../blocks/hero.bg/bg-color-1';
import Container from '../../structure/container';
import Section from '../../structure/section';
import space from '../../utils/spacing.util';

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const wordReveal = {
	hidden: { opacity: 0, y: 12 },
	show: (i) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.025 },
	}),
};

export default function Hero() {
	const { t } = useTranslation('common');
	const [, setTypingStatus] = useState('Initializing');

	const description = t('hero.description');
	const words = description.split(' ');

	return (
		<Section classProp={`${hero.section}`}>
			<Container spacing={'VerticalXXXL'}>
				<TypeAnimation className={`${hero.preHeader}`}
					sequence={[
						t('hero.intro.startDelay'),
						() => { setTypingStatus('typing'); },
						t('hero.intro.start'),
						() => { setTypingStatus('typed'); },
						t('hero.intro.deleteDelay'),
						() => { setTypingStatus('deleting'); },
						t('hero.intro.end'),
						() => { setTypingStatus('deleted'); },
						t('hero.intro.restartDelay'),
					]}
					speed={t('hero.intro.speed')}
					deletionSpeed={t('hero.intro.deletionSpeed')}
					wrapper={t('hero.intro.wrapper')}
					repeat={Infinity}
				/>
				<motion.section initial="hidden" animate="show">
					<motion.h1 className={hero.header} variants={fadeUp}>
						{t('hero.name')}
					</motion.h1>
					<motion.h1
						className={`${hero.header} ${hero.primaryDim}`}
						variants={fadeUp}
						transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
					>
						{t('hero.tagline')}
					</motion.h1>
				</motion.section>
				<section>
					<p className={`${hero.primaryBright} subtitle ${space(["verticalLrg"])}`}>
						{words.map((word, i) => (
							<motion.span
								key={`${word}-${i}`}
								custom={i}
								variants={wordReveal}
								initial="hidden"
								animate="show"
								style={{ display: 'inline-block', marginRight: '0.25em' }}
							>
								{word}
							</motion.span>
						))}
					</p>
				</section>
				<motion.section
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
				>
					<button
						className={`button ${button.primary}`}
						onClick={() => window.open(t('hero.buttons.primary.url'), '_blank', 'noopener,noreferrer')}
					>
						<IconBrandLinkedin className={button.icon} stroke={1.6} />
						<span>{t('hero.buttons.primary.title')}</span>
					</button>
					<button
						className={`button ${button.secondary} leaveSite`}
						onClick={() => window.open(t('hero.buttons.secondary.url'), '_blank', 'noopener,noreferrer')}
					>
						<IconBrandGithub className={button.icon} stroke={1.6} />
						<span>{t('hero.buttons.secondary.title')}</span>
					</button>
				</motion.section>
			</Container>
			<HeroBg theme="bg-color-1" />
		</Section>
	);
}
