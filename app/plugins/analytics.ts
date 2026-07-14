export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const yandexMetrikaId = config.public.yandexMetrikaId?.trim()
  const yandexVerification = config.public.yandexVerification?.trim()
  const googleSiteVerification = config.public.googleSiteVerification?.trim()
  const gaMeasurementId = config.public.gaMeasurementId?.trim()

  const trackEvent = (eventName: string) => {
    const analyticsWindow = window as Window & {
      ym?: (...args: unknown[]) => void
      gtag?: (...args: unknown[]) => void
    }

    if (yandexMetrikaId && analyticsWindow.ym) {
      analyticsWindow.ym(Number(yandexMetrikaId), 'reachGoal', eventName)
    }

    if (analyticsWindow.gtag) {
      analyticsWindow.gtag('event', eventName)
    }
  }

  if (import.meta.client) {
    document.addEventListener('click', (event) => {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const link = target.closest('a')

      if (!(link instanceof HTMLAnchorElement)) {
        return
      }

      if (link.href.startsWith('tel:')) {
        trackEvent('phone_click')
      }

      if (link.dataset.analytics === 'route_click') {
        trackEvent('route_click')
      }
    })
  }

  useHead({
    meta: [
      ...(yandexVerification
        ? [{ name: 'yandex-verification', content: yandexVerification }]
        : []),
      ...(googleSiteVerification
        ? [
            {
              name: 'google-site-verification',
              content: googleSiteVerification,
            },
          ]
        : []),
    ],
    script: [
      ...(yandexMetrikaId
        ? [
            {
              key: 'yandex-metrika',
              innerHTML: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(${JSON.stringify(yandexMetrikaId)}, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `,
            },
          ]
        : []),
      ...(gaMeasurementId
        ? [
            {
              key: 'ga4-src',
              async: true,
              src: `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`,
            },
            {
              key: 'ga4-init',
              innerHTML: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `,
            },
          ]
        : []),
    ],
    noscript: yandexMetrikaId
      ? [
          {
            key: 'yandex-metrika-noscript',
            innerHTML: `<div><img src="https://mc.yandex.ru/watch/${yandexMetrikaId}" style="position:absolute; left:-9999px;" alt="" /></div>`,
          },
        ]
      : [],
    __dangerouslyDisableSanitizersByTagID: {
      'yandex-metrika': ['innerHTML'],
      'ga4-init': ['innerHTML'],
      'yandex-metrika-noscript': ['innerHTML'],
    },
  })
})
