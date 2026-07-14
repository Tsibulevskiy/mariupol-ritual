import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const hiddenDraftRoutes = [
  '/ceny-na-pohorony-mariupol',
  '/chto-delat-esli-umer-chelovek',
  '/kontakty',
  '/o-kompanii',
  '/organizaciya-pohoron-mariupol',
  '/perevozka-umershih-mariupol',
  '/pohorony-pod-klyuch-mariupol',
  '/ritualny-transport-mariupol',
  '/ritualnye-tovary-mariupol',
  '/ritualnye-uslugi-mariupol',
] as const

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url)),
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
          type: 'image/x-icon',
        },
        {
          rel: 'preload',
          href: '/fonts/inter-cyrillic.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/fonts/lora-cyrillic.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      yandexMetrikaId: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID || '',
      yandexVerification: process.env.NUXT_PUBLIC_YANDEX_VERIFICATION || '',
      googleSiteVerification:
        process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID || '',
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
  ],
  robots: {
    disallow: [...hiddenDraftRoutes],
  },
  sitemap: {
    exclude: [...hiddenDraftRoutes],
  },
  vite: {
    server: {
      allowedHosts: true,
    },
    plugins: [tailwindcss()],
  },
})
