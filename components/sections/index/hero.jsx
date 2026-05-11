import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'next-i18next';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

import button from '../../../styles/blocks/button.module.scss';
import hero from '../../../styles/sections/index/hero.module.scss';
import HeroBg from '../../blocks/hero.bg/bg-color-1';
import Container from '../../structure/container';
import Section from '../../structure/section';
import Reveal, { Magnetic, Parallax, SlideIn } from '../../utils/reveal.util';

// Word-by-word reveal for the description. Kept inline because it animates
// each token with a custom delay — a generic preset would obscure the intent.
import { motion } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

const wordReveal = {
	hidden: { opacity: 0, y: 12 },
	show: (i) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: PREMIUM_EASE, delay: 0.6 + i * 0.022 },
	}),
};

export default function Hero() {
	const { t } = useTranslation('common');
	const [, setTypingStatus] = useState('Initializing');

	const description = t('hero.description');
	const words = description.split(' ');

	return (
		<Section classProp={hero.section}>
			{/* Localized animated mesh blobs — pure CSS conic gradients, two layers
			    at different speeds for organic drift. Sits BEHIND content, blends
			    on top of the page-wide #gradient-canvas. */}
			<div className={`${hero.meshLayer} noEvents`} aria-hidden="true">
				<div className={`${hero.meshBlob} ${hero.meshBlobA}`} />
				<div className={`${hero.meshBlob} ${hero.meshBlobB}`} />
			</div>

			<Container spacing={'VerticalXXXL'}>
				<Parallax speed={0.15} className={hero.parallaxLayer}>
					<Reveal>
						<span className={`eyebrow ${hero.eyebrow}`}>
							{t('hero.eyebrow')}
						</span>
					</Reveal>

					<Reveal delay={0.05}>
						<TypeAnimation
							className={hero.preHeader}
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
					</Reveal>

					<Reveal delay={0.1}>
						<h1 className={hero.header}>{t('hero.name')}</h1>
					</Reveal>

					<Reveal delay={0.15}>
						<p className={hero.tagline}>{t('hero.tagline')}</p>
					</Reveal>

					<section className={hero.descriptionWrap}>
						<p className={`${hero.description} subtitle`}>
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

					<SlideIn from="bottom" delay={0.35} distance={20} className={hero.ctaRow}>
						<Magnetic strength={0.25}>
							<button
								className={`button ${button.primary}`}
								onClick={() => window.open(t('hero.buttons.primary.url'), '_blank', 'noopener,noreferrer')}
							>
								<IconBrandLinkedin className={button.icon} stroke={1.6} />
								<span>{t('hero.buttons.primary.title')}</span>
							</button>
						</Magnetic>
						<Magnetic strength={0.25}>
							<button
								className={`button ${button.secondary} leaveSite`}
								onClick={() => window.open(t('hero.buttons.secondary.url'), '_blank', 'noopener,noreferrer')}
							>
								<IconBrandGithub className={button.icon} stroke={1.6} />
								<span>{t('hero.buttons.secondary.title')}</span>
							</button>
						</Magnetic>
					</SlideIn>

					<Reveal delay={0.55}>
						<div className={hero.statusPill} role="status" aria-live="polite">
							<span className={hero.statusDot} aria-hidden="true" />
							<span className={hero.statusLabel}>{t('hero.status.label')}</span>
						</div>
					</Reveal>
				</Parallax>
			</Container>

			<HeroBg theme="bg-color-1" />
		</Section>
	);
}
