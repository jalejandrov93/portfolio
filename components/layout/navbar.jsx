import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import ThemeMode from '../utils/theme.util'
import LanguageSwitcher from '../utils/language-switcher'

import settings from '../../content/_settings.json'
import css from '../../styles/structure/navbar.module.scss'

export default function Navbar() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [menuState, menuToggle] = useState(false)

  // Navigation items with translations
  const navItems = [
    { url: "/#about", titleKey: "nav.about" },
    { url: "/#featured-projects", titleKey: "nav.projects" },
    { url: "/#technical", titleKey: "nav.about" }, // This should be technical skills
    { url: "/#career", titleKey: "nav.about" }, // This should be career/experience  
    { url: "/#pricing", titleKey: "nav.pricing" },
  ]

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

  const toggleMenu = () => {
    menuToggle(!menuState)
  }

  const handleNavigation = (e, url) => {
    e.preventDefault()
    
    if (url.startsWith('/#')) {
      // Navegación interna
      const targetId = url.substring(2)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
        menuToggle(false)
      }
    } else {
      // Navegación externa
      router.push(url)
    }
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
            {/* Usar directamente los textos por ahora hasta actualizar las traducciones */}
            <li>
              <Link href="/#about" onClick={(e) => handleNavigation(e, "/#about")}>
                {router.locale === 'en' ? 'About' : 'Sobre mí'}
              </Link>
            </li>
            <li>
              <Link href="/#featured-projects" onClick={(e) => handleNavigation(e, "/#featured-projects")}>
                {router.locale === 'en' ? 'Projects' : 'Proyectos'}
              </Link>
            </li>
            <li>
              <Link href="/#technical" onClick={(e) => handleNavigation(e, "/#technical")}>
                {router.locale === 'en' ? 'Skills' : 'Habilidades'}
              </Link>
            </li>
            <li>
              <Link href="/#career" onClick={(e) => handleNavigation(e, "/#career")}>
                {router.locale === 'en' ? 'Experience' : 'Experiencia'}
              </Link>
            </li>
            <li>
              <Link href="/#pricing" onClick={(e) => handleNavigation(e, "/#pricing")}>
                {router.locale === 'en' ? 'Pricing' : 'Precios'}
              </Link>
            </li>
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