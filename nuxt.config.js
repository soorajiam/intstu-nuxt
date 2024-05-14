// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  // runtimeConfig: {
  //   turnstile: {
  //     // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
  //     // environment variable.
  //     secretKey: import.meta.env.VITE_TURNSTILE_SECRET_KEY,
  //     addValidateEndpoint: true

  //   },
  // },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@unlok-co/nuxt-stripe',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxtjs/turnstile',
    'nuxt-og-image',
    '@nuxtjs/supabase',
    '@stefanobartoletti/nuxt-social-share',
    'nuxt-tiptap-editor'
  ],

  i18n: {
    lazy: false,
    langDir: 'locales/',
    strategy: 'no_prefix',
    defaultLocale: 'en-US',
    paths:{
      en: '/',
      ml: '/ml/'
    },
    

    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en-US.json',
      },
      {
        code: 'ml',
        iso: 'ml-IN',
        name: 'Malayalam',
        file: 'ml-IN.json',
      },
    ],


  },

  supabase: {
    redirect: false
    // redirectOptions: {
    //   login: '/en/login',
    //   callback: '/en/confirm',
    //   include: undefined,
    //   exclude: ['/en/auth/signup'],
    //   cookieRedirect: false,
    // }
  },

  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     routes: ['blog/*', 'sitemap.xml', '/institutes/*','/en'],
  //     ignore: ['/auth', ''],
  //   },
  // },

  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
    lowlight: {
      theme: "github-dark",
    },
  },

  

  site: {
    // url: 'http://intstu.com',
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

  


  turnstile: {
    siteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
    secretKey: import.meta.env.VITE_TURNSTILE_SECRET_KEY,
      addValidateEndpoint: true
  },

  // supabase: {
  //   url: import.meta.env.VITE_SUPABASE_URL,
  //   key: import.meta.env.VITE_SUPABASE_KEY,
  // },
  

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


  
})
