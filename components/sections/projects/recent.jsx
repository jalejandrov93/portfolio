import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconArrowUpRight, IconStar, IconGitFork, IconBrandGithub } from '@tabler/icons-react'

import css from '../../../styles/sections/projects/recent.module.scss'
import Container from '../../structure/container'
import Section from '../../structure/section'
import { Stagger, StaggerItem } from '../../utils/reveal.util'

export default function GitProjects({ repos, user }) {
	const { t } = useTranslation('common')

	// Build the language chip set off the repos array. Sorted alphabetically
	// for stable ordering across renders. "All" sentinel sits first.
	const languages = useMemo(() => {
		const set = new Set(
			repos
				.map((r) => r.language)
				.filter(Boolean)
		)
		return ['__all__', ...Array.from(set).sort()]
	}, [repos])

	const [activeLang, setActiveLang] = useState('__all__')
	const filteredRepos = useMemo(
		() => (activeLang === '__all__' ? repos : repos.filter((r) => r.language === activeLang)),
		[repos, activeLang]
	)

	const profile = Array.isArray(user) && user.length ? user[0] : null

	return (
		<Section classProp={css.section}>
			<Container classProp={css.container} spacing={'verticalXXXLrg'}>
				<header className={css.head}>
					<span
						className="eyebrow"
						style={{ color: 'var(--secondary)' }}
					>
						GitHub
					</span>
					<h2 className={css.heading}>{t('projects.recent.title')}</h2>
					<p className={css.subtitle}>{t('projects.recent.subtitle')}</p>
				</header>

				{profile && (
					<section className={css.profile}>
						<Image
							className={css.profilePhoto}
							src={profile.avatar_url}
							alt={profile.name || profile.login}
							height={56}
							width={56}
						/>
						<span className={css.details}>
							<p className={css.profileName}>{profile.name || profile.login}</p>
							<Link href={profile.html_url} rel="noreferrer" target="_blank" className={css.profileLink}>
								<IconBrandGithub size={14} stroke={1.6} />
								<span>{profile.html_url.replace(/^https?:\/\//, '')}</span>
								<IconArrowUpRight size={12} stroke={1.8} />
							</Link>
						</span>
					</section>
				)}

				{languages.length > 1 && (
					<div className={css.filterRow} role="tablist" aria-label="Filter by language">
						{languages.map((lang) => {
							const isActive = activeLang === lang
							return (
								<button
									key={lang}
									type="button"
									role="tab"
									aria-selected={isActive}
									className={`${css.filterChip} ${isActive ? css.filterChipActive : ''}`}
									onClick={() => setActiveLang(lang)}
								>
									{lang === '__all__' ? t('projects.recent.filterAll') : lang}
								</button>
							)
						})}
					</div>
				)}

				{filteredRepos.length === 0 ? (
					<p className={css.empty}>{t('projects.recent.filterEmpty')}</p>
				) : (
					<Stagger amount={0.1} className={css.projects}>
						{filteredRepos.map((repo) => {
							const {
								name,
								description,
								topics,
								forks_count,
								html_url,
								language,
								watchers,
								homepage,
								pushed_at,
							} = repo
							const date = new Date(pushed_at).toDateString()
							return (
								<StaggerItem key={html_url || name}>
									<article className={css.project}>
										<span className={css.header}>
											<Link href={html_url} rel="noreferrer" target="_blank" className={css.projectName}>
												<span>{name}</span>
												<IconArrowUpRight size={14} stroke={1.8} />
											</Link>
											{homepage && <p className={css.homepage}>{homepage}</p>}
										</span>

										{description && (
											<span className={css.descriptionContainer}>
												<p className={css.description}>{description}</p>
											</span>
										)}

										<span className={css.details}>
											{language && (
												<p>
													<i className={`devicon-${language.toLowerCase()}-plain colored`} aria-hidden="true" /> {language}
												</p>
											)}
											<p>
												<IconStar size={14} stroke={1.8} /> {watchers}
											</p>
											<p>
												<IconGitFork size={14} stroke={1.8} /> {forks_count}
											</p>
											<p className={css.pushedAt}>{date}</p>
										</span>

										{Array.isArray(topics) && topics.length > 0 && (
											<span className={css.topicsContainer}>
												{topics.map((topic) => (
													<span key={topic} className={css.topics}>
														<IconBrandGithub size={10} stroke={1.8} /> {topic}
													</span>
												))}
											</span>
										)}
									</article>
								</StaggerItem>
							)
						})}
					</Stagger>
				)}
			</Container>
		</Section>
	)
}
