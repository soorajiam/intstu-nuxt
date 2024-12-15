import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      // Blue shades
      50: '#eff6ff',   // blue-50
      100: '#dbeafe',  // blue-100
      200: '#bfdbfe',  // blue-200
      300: '#93c5fd',  // blue-300
      400: '#60a5fa',  // blue-400
      500: '#3b82f6',  // blue-500
      600: '#2563eb',  // blue-600 (main primary color)
      700: '#1d4ed8',  // blue-700
      800: '#1e40af',  // blue-800
      900: '#1e3a8a'   // blue-900
    },
    colorScheme: {
      light: {
        surface: {
          ground: '#f8fafc',      // slate-100 for main background
          section: '#f1f5f9',     // slate-100 variant
          card: '#ffffff',        // white
          overlay: '#ffffff',     // white
          border: '#e2e8f0',      // slate-200
          hover: '#f1f5f9',       // slate-100
          toast: '#ffffff',       // white
          toastBorder: '#e2e8f0', // slate-200
          toastBackground: '#f1f5f9', // slate-100
          toastText: '#020617', // slate-950 (near black)
          toastIcon: '#020617', // slate-950 (near black)
          toastIconHover: '#020617', // slate-950 (near black)
          toastIconClose: '#020617', // slate-950 (near black)
          toastIconCloseHover: '#020617', // slate-950 (near black)
          text: '#020617', // slate-950 (near black)
        }
      },
      dark: {
        surface: {
          ground: '#020617',      // slate-950 (near black)
          section: '#0f172a',     // slate-900
          card: '#1e293b',        // slate-800
          overlay: '#1e293b',     // slate-800
          border: '#334155',      // slate-700
          hover: '#0f172a',       // slate-900
          toast: '#020617',       // slate-950 (near black)
          toastBorder: '#e2e8f0', // slate-200
          toastBackground: '#f1f5f9', // slate-100
          toastText: '#ffffff', // white
          toastIcon: '#ffffff', // white
          toastIconHover: '#ffffff', // white
          toastIconClose: '#ffffff', // white
          toastIconCloseHover: '#ffffff', // white
          text: '#ffffff', // white
        }
      }
    },
    // Additional accent colors
    accent: {
      indigo: {
        light: '#312e81',         // indigo-900
        dark: '#e0e7ff'          // indigo-100
      },
      grey: {
        light: '#4b5563',        // grey-600
        dark: '#9ca3af'          // grey-400
      }
    }
  }
});

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
    '@unlok-co/nuxt-stripe',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxtjs/turnstile',
    'nuxt-og-image',
    // '@nuxtjs/supabase',
    '@stefanobartoletti/nuxt-social-share',
    // 'nuxt-tiptap-editor',
    '@nuxtjs/color-mode',
    '@primevue/nuxt-module',
  ],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  primevue: {
    components: {
      include: ['Button', 'InputText', 'Dialog', 'Dropdown']
    },
    options: {
      ripple: true,
      inputStyle: 'filled',
      theme: {
        preset: MyCustomPreset,
        options: {
          darkModeSelector: '.dark'
        }
      }
    },
    cssLayerOrder: 'tailwind-base, primevue'
  },

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
      }
    ],


  },

  // supabase: {
  //   redirect: false
  //   // redirectOptions: {
  //   //   login: '/en/login',
  //   //   callback: '/en/confirm',
  //   //   include: undefined,
  //   //   exclude: ['/en/auth/signup'],
  //   //   cookieRedirect: false,
  //   // }
  // },

  nitro: {
    prerender: {
      autoSubfolderIndex: false
    },
    preset: 'cloudflare-pages',
    externals: {
      inline: ['tough-cookie', 'node-fetch']
    },
    routeRules: {
      '/**': { cors: true }
    },
    resolve: {
      alias: {
        'canvas': false,
        'jsdom': false
      }
    }
  },

  // Modify runtimeConfig to avoid environment variable issues
  runtimeConfig: {
    public: {
      stripePubKey: process.env.STRIPE_PUBLIC_KEY || '',
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || '',
      gaId: process.env.GA_ID || ''
    }
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

  css: [
    '~/assets/css/main.css',
    'primeicons/primeicons.css'
  ],

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

  compatibilityDate: '2024-08-02',

  plugins: [
    '~/plugins/auth.js',
    '~/plugins/toast.js',
    '~/plugins/primevue.js',
    '~/plugins/dayjs.js'
  ],

  middleware: [
    '~/middleware/userAuth.js'
  ],

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    treeshakeClientOnly: true
  },

  optimization: {
    minimize: true
  },

})
