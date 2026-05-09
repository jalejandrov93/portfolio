import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ThemeMode from '../utils/theme.util'
import LanguageSwitcher from '../utils/language-switcher'

import settings from '../../content/_settings.json'
import css from '../../styles/structure/navbar.module.scss'

const SECTION_IDS = ['about', 'featured-projects', 'technical', 'career']

export default function Navbar() {
  const router = useRouter()
  const [menuState, menuToggle] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    menuToggle(false)
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      menuToggle(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
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
        if (visible) {
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [router.pathname])

  const toggleMenu = () => {
    menuToggle(!menuState)
  }

  const handleNavigation = (e, url) => {
    e.preventDefault()

    if (url.startsWith('/#')) {
      const targetId = url.substring(2)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
        menuToggle(false)
      }
    } else {
      router.push(url)
    }
  }

  const navLink = (id, labelEn, labelEs) => {
    const isActive = activeSection === id
    return (
      <li>
        <Link
          href={`/#${id}`}
          onClick={(e) => handleNavigation(e, `/#${id}`)}
          data-active={isActive ? 'true' : undefined}
          aria-current={isActive ? 'true' : undefined}
        >
          {router.locale === 'en' ? labelEn : labelEs}
        </Link>
      </li>
    )
  }

  return (
    <nav id="Navbar" className={css.container}>
      <ul className={css.menu}>
        <li className={css.menuHeader}>
          <Link className={css.logo} href="/">
            {settings.name}
          </Link>
          <button onClick={toggleMenu} className={css.mobileToggle} data-open={menuState}>
            <div>
              <span></span>
              <span></span>
            </div>
          </button>
        </li>
        <li data-open={menuState} className={css.menuContent}>
          <ul>
            {navLink('about', 'About', 'Sobre mí')}
            {navLink('featured-projects', 'Projects', 'Proyectos')}
            {navLink('technical', 'Skills', 'Habilidades')}
            {navLink('career', 'Experience', 'Experiencia')}
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
  )
}
