/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localePath: './public/locales',
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
  react: {
    useSuspense: false,
  },
} 