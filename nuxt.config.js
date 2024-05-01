// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  devtools: { enabled: true },

  // runtimeConfig: {
  //   turnstile: {
  //     // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
  //     // environment variable.
  //     secretKey: import.meta.env.VITE_TURNSTILE_SECRET_KEY,
  //     addValidateEndpoint: true

  //   },
  // },

  // nitro: {
  //   // prerender: {
  //   //   crawlLinks: true,
  //   //   routes: ['/', 'sitemap.xml'],
  //   //   ignore: ['/tak', '/konfiguration', '/checkout'],
  //   // },
  // },

  site: {
    url: 'http://intstu.com',
  },
  sitemap: {
    sources: [
      '/api/sitemap/blogs',
      '/api/sitemap/institutes',
  
  ],
    cacheMaxAgeSeconds: 36000,
    sitemaps: true,
    defaultSitemapsChunkSize: 2000

  },

  head: {
    meta: [
      { hid: 'google-adsense-account', name: 'google-adsense-account', content: 'ca-pub-9324362451727622' }
    ]
    // other head elements
  },

  css: ['~/assets/css/main.css'],

  
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@unlok-co/nuxt-stripe',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxtjs/turnstile',
    'nuxt-og-image'
  ],

  turnstile: {
    siteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
    secretKey: import.meta.env.VITE_TURNSTILE_SECRET_KEY,
      addValidateEndpoint: true
  },

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

  gtag: {
    id: import.meta.env.VITE_GA_ID,
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
