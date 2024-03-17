// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
  ],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  i18n: {
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en-US',
    strategy: 'prefix_except_default',
    vuei18n: {
      fallbackLocale: 'en-US',
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en-US.json',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr-FR.json',
      },
      {
        code: 'ml',
        iso: 'ml-IN',
        name: 'Malayalam',
        file: 'ml-IN.json',
      },
    ],


  }
  
})
