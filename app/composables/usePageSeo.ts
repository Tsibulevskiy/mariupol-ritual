import { siteConfig } from '@/config/site'

interface PageSeoOptions {
  title?: string
  description?: string
  path?: string
}

export const usePageSeo = (options: PageSeoOptions = {}) => {
  const runtimeConfig = useRuntimeConfig()
  const title = options.title ?? siteConfig.defaultTitle
  const description = options.description ?? siteConfig.defaultDescription
  const canonical = new URL(
    options.path ?? '/',
    runtimeConfig.public.siteUrl,
  ).toString()

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogLocale: siteConfig.locale,
    ogSiteName: siteConfig.name,
    ogUrl: canonical,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  })
}
