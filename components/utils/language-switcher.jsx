import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import css from '../../styles/utils/language-switcher.module.scss'

const LanguageSwitcher = () => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleLanguageChange = (locale) => {
    router.push(router.pathname, router.asPath, { locale })
  }

  return (
    <div className={css.languageSwitcher}>
      <button
        className={`${css.langButton} ${router.locale === 'es' ? css.active : ''}`}
        onClick={() => handleLanguageChange('es')}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <span className={css.separator}>|</span>
      <button
        className={`${css.langButton} ${router.locale === 'en' ? css.active : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher 