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
/
├── /ritualnye-uslugi-mariupol
├── /organizaciya-pohoron-mariupol
├── /pohorony-pod-klyuch-mariupol
├── /ceny-na-pohorony-mariupol
├── /ritualny-transport-mariupol
├── /perevozka-umershih-mariupol
├── /ritualnye-tovary-mariupol
├── /chto-delat-esli-umer-chelovek
├── /o-kompanii
├── /kontakty
├── /politika-konfidencialnosti
└── /soglasie-na-obrabotku-dannyh
Главная страница / не должна полностью дублировать /ritualnye-uslugi-mariupol.
