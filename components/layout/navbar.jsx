import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { motion, useScroll, useSpring } from 'framer-motion'
import Link from 'next/link'

import ThemeMode from '../utils/theme.util'
import LanguageSwitcher from '../utils/language-switcher'

import settings from '../../content/_settings.json'
import css from '../../styles/structure/navbar.module.scss'

const SECTION_LINKS = [
	{ id: 'about',             key: 'about' },
	{ id: 'featured-projects', key: 'featuredProjects' },
	{ id: 'technical',         key: 'technical' },
	{ id: 'career',            key: 'career' },
]

const SECTION_IDS = SECTION_LINKS.map((link) => link.id)

export default function Navbar() {
	const router = useRouter()
	const { t } = useTranslation('common')
	const [menuState, menuToggle] = useState(false)
	const [activeSection, setActiveSection] = useState('')

	// Scroll progress bar — springified so it feels alive rather than mechanical.
	const { scrollYProgress } = useScroll()
	const progressScale = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 22,
		mass: 0.4,
	})

	useEffect(() => {
		menuToggle(false)
	}, [])

	useEffect(() => {
		const handleRouteChange = () => menuToggle(false)
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => router.events.off('routeChangeComplete', handleRouteChange)
	}, [router.events])

	useEffect(() => {
		if (router.pathname !== '/') {
			setActiveSection('')
			return
		}

		const sections = SECTION_IDS
			.map((id) => document.getElementById(id))
			.filter(Boolean)

		if (!sections.length) return

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
				if (visible) setActiveSection(visible.target.id)
			},
			{ rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
		)

		sections.forEach((section) => observer.observe(section))
		return () => observer.disconnect()
	}, [router.pathname])

	const toggleMenu = () => menuToggle((open) => !open)

	// Route-aware smooth scroll: when on /, scroll in place. From any other
	// route, navigate to / first then scroll once the section renders. This
	// fixes the previous behavior where /#about from /projects silently failed
	// to smooth-scroll because the target element didn't exist at click time.
	const handleNavigation = (e, url) => {
		e.preventDefault()

		if (!url.startsWith('/#')) {
			router.push(url)
			return
		}

		const targetId = url.substring(2)
		menuToggle(false)

		if (router.pathname === '/') {
			const el = document.getElementById(targetId)
			if (el) el.scrollIntoView({ behavior: 'smooth' })
			return
		}

		router.push(url).then(() => {
			// Section needs a tick to mount after route change.
			window.requestAnimationFrame(() => {
				const el = document.getElementById(targetId)
				if (el) el.scrollIntoView({ behavior: 'smooth' })
			})
		})
	}

	const navLink = (id, label) => {
		const isActive = activeSection === id
		return (
			<li key={id}>
				<Link
					href={`/#${id}`}
					onClick={(e) => handleNavigation(e, `/#${id}`)}
					data-active={isActive ? 'true' : undefined}
					aria-current={isActive ? 'true' : undefined}
				>
					{label}
				</Link>
			</li>
		)
	}

	return (
		<>
			<motion.div
				className={css.scrollProgress}
				style={{ scaleX: progressScale }}
				aria-hidden="true"
			/>
			<nav id="Navbar" className={css.container}>
				<ul className={css.menu}>
					<li className={css.menuHeader}>
						<Link className={css.logo} href="/">
							{settings.name}
						</Link>
						<button onClick={toggleMenu} className={css.mobileToggle} data-open={menuState} aria-label="Toggle menu">
							<div>
								<span></span>
								<span></span>
							</div>
						</button>
					</li>
					<li data-open={menuState} className={css.menuContent}>
						<ul>
							{SECTION_LINKS.map(({ id, key }) =>
								navLink(id, t(`nav.section.${key}`))
							)}
							<li>
								<LanguageSwitcher />
							</li>
							<li>
								<ThemeMode />
							</li>
						</ul>
					</li>
				</ul>
				<span onClick={toggleMenu} className={css.menuBlackout} data-open={menuState}></span>
			</nav>
		</>
	)
}
