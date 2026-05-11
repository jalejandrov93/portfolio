import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import {
	IconBrandLinkedin,
	IconBrandGithub,
	IconArticle,
	IconArrowUpRight,
	IconExternalLink,
} from '@tabler/icons-react'

import Container from '../structure/container'
import { Magnetic } from '../utils/reveal.util'

import content from '../../content/footer.json'
import settings from '../../content/_settings.json'
import css from '../../styles/structure/footer.module.scss'

// Tabler equivalents for the FA brand keys present in content/footer.json.
// IconArticle stands in for dev.to since Tabler 3.x has no dedicated dev.to
// brand icon — adequate for a 16px footer glyph.
const SOCIAL_ICONS = {
	linkedin: IconBrandLinkedin,
	github: IconBrandGithub,
	dev: IconArticle,
}

export default function Footer() {
	const { t } = useTranslation('common')
	const year = new Date().getFullYear()

	const ctaUrl = t('footer.cta.primaryUrl')

	return (
		<footer className={css.container}>
			<Container spacing={['verticalXLrg', 'bottomLrg']}>
				{/* CTA strip — recruiter / freelance funnel reinforcement. Same
				    LinkedIn URL as the hero primary; consistent contact channel
				    across the page. */}
				<section className={css.ctaStrip}>
					<div className={css.ctaText}>
						<span className={`eyebrow ${css.ctaEyebrow}`}>
							{t('footer.cta.eyebrow')}
						</span>
						<h2 className={css.ctaTitle}>{t('footer.cta.title')}</h2>
						<p className={css.ctaDescription}>{t('footer.cta.description')}</p>
					</div>
					<Magnetic strength={0.25}>
						<Link
							href={ctaUrl}
							rel="noreferrer"
							target="_blank"
							className={css.ctaButton}
						>
							<IconBrandLinkedin size={18} stroke={1.6} />
							<span>{t('footer.cta.primary')}</span>
							<IconArrowUpRight size={14} stroke={1.8} />
						</Link>
					</Magnetic>
				</section>

				<section className={css.columns}>
					<div className={css.brandColumn}>
						<Link href="/" className={css.brandName}>
							{settings.name}
						</Link>
						<p className={css.brandTagline}>{t('hero.tagline')}</p>
					</div>

					<div className={css.linksColumn}>
						<h4 className={css.columnTitle}>{t('footer.sections.resources')}</h4>
						<ul className={css.linksList}>
							<li>
								<Link href="/projects">
									{t('footer.links.projects')}
									<IconArrowUpRight size={12} stroke={1.8} />
								</Link>
							</li>
							<li>
								<Link href="/articles">
									{t('footer.links.articles')}
									<IconArrowUpRight size={12} stroke={1.8} />
								</Link>
							</li>
							<li>
								<Link href="/pricing">
									{t('footer.links.pricing')}
									<IconArrowUpRight size={12} stroke={1.8} />
								</Link>
							</li>
						</ul>
					</div>

					<div className={css.socialColumn}>
						<h4 className={css.columnTitle}>{t('footer.sections.social')}</h4>
						<ul className={css.socialRow}>
							{Array.isArray(content.social) &&
								content.social.map(({ url, icon }, idx) => {
									const SocialIcon = SOCIAL_ICONS[icon] || IconExternalLink
									return (
										<li key={url || idx}>
											<Link
												href={url}
												rel="noreferrer"
												target="_blank"
												aria-label={icon}
												className={css.socialLink}
											>
												<SocialIcon size={20} stroke={1.6} />
											</Link>
										</li>
									)
								})}
						</ul>
					</div>
				</section>

				<section className={css.bottomBar}>
					<p className={css.copyright}>
						{t('footer.copyright', { year })}
					</p>
				</section>
			</Container>

			<canvas id="gradient-canvas" className={''} data-transition-in></canvas>
		</footer>
	)
}
