// Core packages
import Image from 'next/image'

// Section scss
import about from '../../../styles/sections/index/about.module.scss'
// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block'
import CopyBlock from '../../blocks/about.copy.block'
import SectionGridBg from '../../blocks/section.grid.block'
// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import Container from '../../structure/container';
// Section structure
import Section from '../../structure/section';

/**
 * Section: Technical
 * Highlight your technical skills with a short blurb about you,
 * Then display the programs you are proficient with and the technologies you use if applicable.
 * 
 * @returns {jsx} <Technical />
 */
export default function Technical() {
	return (
		<Section classProp={`${about.section} borderBottom`}>	
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="Habilidades Técnicas"
					preTitle="Competencias"
					subTitle="Experiencia en desarrollo full-stack y gestión de infraestructura tecnológica, con enfoque en soluciones web modernas y automatización de procesos."
				/>
				<section className={`${about.content} ${about.container}`}>
					<div className={about.copy}>
						<BadgesBlock 
							title="Languages" 
							copy="Lenguajes de programación con los que desarrollo soluciones eficientes y escalables."
							list={languages}
							block="languages" 
							fullContainer="fullContainer"
							icon="code"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>
						<BadgesBlock 
							title="Frameworks & Libraries" 
							copy="Frameworks y librerías para desarrollo de aplicaciones web modernas y APIs robustas."
							list={frameworks} 
							block="frameworks"
							fullContainer="fullContainer" 
							icon="cubes"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>
						<BadgesBlock 
							title="Databases" 
							copy="Sistemas de gestión de bases de datos para almacenamiento y manipulación eficiente de datos."
							list={databases} 
							block="databases"
							fullContainer="fullContainer" 
							icon="database"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>
						<BadgesBlock 
							title="Styling & UI" 
							copy="Herramientas para crear interfaces de usuario atractivas y responsivas."
							list={styling} 
							block="styling"
							fullContainer="fullContainer" 
							icon="palette"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>
						<BadgesBlock 
							title="Automation & DevOps" 
							copy="Herramientas para automatización, control de versiones y mejores prácticas de desarrollo."
							list={devops} 
							block="devops"
							fullContainer="fullContainer" 
							icon="rocket"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>
					</div>
					<div className={`${about.image} ${about.technicalSvg}`}>
						<Image src="/img/dataism-24.svg" width={477} height={1111} alt="Data Strings 01 por Colorpong: https://ywft.us/2177b695b" />
					</div>
				</section>	
			</Container>
		</Section>
	)
}

// Languages - ordenados por competencia
const languages = [
	{ key: 'javascript', 	name: 'JavaScript (ES6+)', 	type: 'devicon' },
	{ key: 'typescript', 	name: 'TypeScript', 		type: 'devicon' },
	{ key: 'python', 		name: 'Python', 			type: 'devicon' },
]

// Frameworks & Libraries - ordenados por competencia
const frameworks = [
	{ key: 'nextjs', 		name: 'Next.js', 			type: 'devicon' },
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'fastapi', 		name: 'FastAPI', 			type: 'devicon' },
]

// Databases
const databases = [
	{ key: 'postgresql', 	name: 'PostgreSQL', 		type: 'devicon' },
]

// Styling & UI
const styling = [
	{ key: 'tailwindcss', 	name: 'Tailwind CSS', 		type: 'devicon' },
]

// Automation & DevOps
const devops = [
	{ key: 'git', 			name: 'Husky', 			type: 'devicon' },
	{ key: 'github', 		name: 'GitHub Actions', 	type: 'devicon' },
]