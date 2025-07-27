import { useTranslation } from 'next-i18next';
import css 			from '../../../styles/sections/projects/featured.module.scss'
import FeaturedProject from '../../blocks/projects/featured'
import SectionTitle from '../../blocks/section.title.block'
import Container 	from '../../structure/container';
// Section structure
import Section 		from '../../structure/section';


export default function FeaturedProjects() {
	const { t } = useTranslation('common');

	return (
		<Section classProp={css.hasBg}>	
			<Container spacing={'verticalXXXXLrg'}>
				<SectionTitle
					title={t('projects.featured.title')}
					preTitle={t('projects.featured.preTitle')}
					subTitle={t('projects.featured.subtitle')}
				/> 				
				{
				t('projects.featured.items', { returnObjects: true }).map( (data, index) => {
					return (
						<FeaturedProject content={data} index={index} key={index} />
					)
				})
				}
			</Container>
			<div className={css.bgContainer}>
				<span className={css.orbitalBg}>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroLeft} ${css.heroOrbital}`}></span></span>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroCenter}`}></span></span>
					<span className={`${css.bgSection}`}><span className={`${css.bgInner} ${css.heroRight} ${css.heroOrbital}`}></span></span>
				</span>
				<span className={css.afterGlowBg}></span>
			</div>
		</Section>
	)
}