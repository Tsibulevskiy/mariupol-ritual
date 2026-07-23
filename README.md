1. Стек для разработки
Nuxt 4
Vue 3
TypeScript
Tailwind CSS
Nuxt Content
Zod
Nitro server



   Модули Nuxt
@nuxtjs/tailwindcss
@nuxt/content
@nuxt/image
@nuxtjs/sitemap
@nuxtjs/robots
nuxt-schema-org
@vueuse/nuxt
zod
lucide-vue-next

Контент
content/
├── services/
├── articles/
├── faq/
└── pages/

Аналитика и SEO-сервисы

Для Мариуполя основной упор я бы делал на:

Яндекс Метрику;
Яндекс Вебмастер;
Google Search Console;
Google Analytics 4 — дополнительно.
    Основные события:
phone_click
telegram_click
whatsapp_click
callback_submit
price_view
service_click
address_click

2. Структура страниц

Не стоит делать только один лендинг. Правильнее создать локальный многостраничный сайт, где каждая важная услуга получает отдельную SEO-страницу.

Открыты для sitemap
/
/cookie-policy
/personal-data-consent
/politika-konfidencialnosti
/terms

Закрыты для sitemap
/ceny-na-pohorony-mariupol
/chto-delat-esli-umer-chelovek
/kontakty
/o-kompanii
/organizaciya-pohoron-mariupol
/pamyatniki-mariupol
/perevozka-umershih-mariupol
/pohorony-pod-klyuch-mariupol
/ritualny-transport-mariupol
/ritualnye-tovary-mariupol
/ritualnye-uslugi-mariupol

Главная страница / не должна полностью дублировать /ritualnye-uslugi-mariupol.
