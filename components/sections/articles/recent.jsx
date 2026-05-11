import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconArrowUpRight, IconBrandMedium, IconCalendar } from '@tabler/icons-react'

import Section from '../../structure/section'
import Container from '../../structure/container'
import SectionTitle from '../../blocks/section.title.block'
import { Stagger, StaggerItem } from '../../utils/reveal.util'

import css from '../../../styles/sections/articles/recent.module.scss'

export default function Recent({ mediumArticles }) {
	const { t } = useTranslation('common')

	const articles = Array.isArray(mediumArticles?.items) ? mediumArticles.items : []

	return (
		<Section classProp="borderBottom">
			<Container spacing={'verticalXXXXLrg'}>
				<SectionTitle
					title={t('articles.recent.title')}
					preTitle={t('articles.recent.preTitle')}
					subTitle={t('articles.recent.subTitle')}
				/>

				{articles.length === 0 ? (
					<p className={css.empty}>{t('articles.recent.empty') || 'No articles to show.'}</p>
				) : (
					<Stagger amount={0.1} className={css.projects}>
						{articles.map((article) => {
							const { title, pubDate, link, author, thumbnail, categories } = article
							const date = new Date(pubDate).toDateString()
							return (
								<StaggerItem key={link || title}>
									<article className={css.project}>
										{thumbnail && (
											<span className={css.featuredImage}>
												<Image src={thumbnail} alt={title} width={100} height={100} />
											</span>
										)}
										<span className={css.header}>
											<Link href={link} rel="noreferrer" target="_blank" className={css.articleLink}>
												<span>{title}</span>
												<IconArrowUpRight size={14} stroke={1.8} />
											</Link>
										</span>
										<span className={css.details}>
											{author && <p className={css.author}>By {author}</p>}
											<p className={css.pushedAt}>
												<IconCalendar size={12} stroke={1.8} /> {date}
											</p>
										</span>
										{Array.isArray(categories) && categories.length > 0 && (
											<span className={css.topicsContainer}>
												{categories.map((category) => (
													<span key={category} className={css.topics}>
														<IconBrandMedium size={10} stroke={1.8} /> {category}
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
