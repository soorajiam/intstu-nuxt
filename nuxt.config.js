// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@unlok-co/nuxt-stripe',
  ],

  stripe: {
    // Server
    server: {
      key: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
      options: {
        // your api options override for stripe server side
        apiVersion: '2022-11-15', // optional, default is '2022-11-15'
      }
    // CLIENT
    },
    client: {
      key: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
      // your api options override for stripe client side
      options: {

      }
    }
  },
  
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
