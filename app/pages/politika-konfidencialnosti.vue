<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'

const title = 'Политика конфиденциальности'
const description =
  'Порядок обработки персональных данных пользователей сайта «Мариупольский ритуальный дом».'
const path = '/politika-konfidencialnosti'
const breadcrumbs = [
  { label: 'Главная', href: '/' },
  { label: 'Политика конфиденциальности' },
]
const addresses = contacts.address.split(';').map((item) => item.trim())

usePageSeo({
  title,
  description,
  path,
})

const runtimeConfig = useRuntimeConfig()
const canonical = new URL(path, runtimeConfig.public.siteUrl).toString()

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.href ?? path, runtimeConfig.public.siteUrl).toString(),
    })),
  }),
  defineWebPage({
    name: title,
    description,
    url: canonical,
  }),
])
</script>

<template>
  <div>
    <PageHero
      :title="title"
      description="Разъясняем, какие данные могут обрабатываться на сайте, для чего они используются и как защищаются."
      eyebrow="Юридическая информация"
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="breadcrumbs" />

        <div class="mt-8 space-y-6">
          <BaseCard>
            <p class="text-text-muted">
              Дата вступления в силу: 13.07.2026
            </p>
            <p class="mt-4 text-text-muted">
              Настоящая Политика конфиденциальности определяет порядок
              обработки персональных данных пользователей сайта
              «{{ siteConfig.name }}» (далее — «Сайт»).
            </p>
            <p class="mt-4 text-text-muted">
              Используя Сайт, вы соглашаетесь с условиями настоящей Политики.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>1. Какие данные мы собираем</h2>
            <p class="mt-4 text-text-muted">
              При использовании сайта мы можем получать следующую информацию:
            </p>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>имя;</li>
              <li>номер телефона;</li>
              <li>адрес электронной почты (если указан);</li>
              <li>текст обращения;</li>
              <li>IP-адрес;</li>
              <li>сведения о браузере и устройстве;</li>
              <li>данные файлов cookie;</li>
              <li>техническую информацию о посещении сайта.</li>
            </ul>
          </BaseCard>

          <BaseCard>
            <h2>2. Для чего используются данные</h2>
            <p class="mt-4 text-text-muted">
              Персональные данные используются исключительно для:
            </p>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>обработки обращений пользователей;</li>
              <li>предоставления консультаций;</li>
              <li>обратной связи;</li>
              <li>организации оказания ритуальных услуг;</li>
              <li>улучшения качества работы сайта;</li>
              <li>обеспечения безопасности сайта;</li>
              <li>анализа посещаемости.</li>
            </ul>
            <p class="mt-4 text-text-muted">
              Мы не используем персональные данные для автоматического принятия
              решений или рассылки рекламных сообщений без согласия пользователя.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>3. Обработка персональных данных</h2>
            <p class="mt-4 text-text-muted">
              Мы принимаем необходимые организационные и технические меры для
              защиты персональных данных от:
            </p>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>несанкционированного доступа;</li>
              <li>изменения;</li>
              <li>уничтожения;</li>
              <li>распространения;</li>
              <li>иных неправомерных действий.</li>
            </ul>
            <p class="mt-4 text-text-muted">
              Доступ к персональным данным имеют только сотрудники, которым
              такая информация необходима для выполнения своих обязанностей.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>4. Передача данных третьим лицам</h2>
            <p class="mt-4 text-text-muted">
              Мы не продаем и не передаем персональные данные третьим лицам, за
              исключением случаев:
            </p>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>когда это необходимо для оказания услуг;</li>
              <li>если этого требует законодательство;</li>
              <li>при наличии согласия пользователя.</li>
            </ul>
          </BaseCard>

          <BaseCard>
            <h2>5. Использование файлов Cookie</h2>
            <p class="mt-4 text-text-muted">
              Сайт может использовать файлы Cookie для:
            </p>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>корректной работы сайта;</li>
              <li>сохранения пользовательских настроек;</li>
              <li>анализа посещаемости;</li>
              <li>повышения удобства использования.</li>
            </ul>
            <p class="mt-4 text-text-muted">
              Пользователь может отключить использование Cookie в настройках
              своего браузера.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>6. Аналитика</h2>
            <p class="mt-4 text-text-muted">
              Для анализа посещаемости сайта могут использоваться сервисы
              веб-аналитики, которые собирают обезличенную статистическую
              информацию.
            </p>
            <p class="mt-4 text-text-muted">
              Такие сервисы могут использовать Cookie и аналогичные технологии.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>7. Хранение данных</h2>
            <p class="mt-4 text-text-muted">
              Персональные данные хранятся только в течение срока,
              необходимого для достижения целей обработки либо в течение срока,
              установленного законодательством.
            </p>
            <p class="mt-4 text-text-muted">
              После достижения целей обработки данные удаляются либо
              обезличиваются.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>8. Права пользователя</h2>
            <p class="mt-4 text-text-muted">Пользователь вправе:</p>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>узнать, какие данные о нем обрабатываются;</li>
              <li>запросить исправление неточных данных;</li>
              <li>потребовать удаление персональных данных;</li>
              <li>отозвать ранее данное согласие на обработку данных;</li>
              <li>
                обратиться с вопросами относительно обработки персональных
                данных.
              </li>
            </ul>
          </BaseCard>

          <BaseCard>
            <h2>9. Безопасность</h2>
            <p class="mt-4 text-text-muted">
              Мы принимаем разумные меры для защиты персональной информации
              пользователей, однако ни один способ передачи данных через
              Интернет не может гарантировать абсолютную безопасность.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>10. Изменения политики</h2>
            <p class="mt-4 text-text-muted">
              Мы вправе вносить изменения в настоящую Политику
              конфиденциальности.
            </p>
            <p class="mt-4 text-text-muted">
              Актуальная версия всегда размещается на данной странице.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>11. Контактная информация</h2>
            <p class="mt-4 text-text-muted">
              По вопросам обработки персональных данных вы можете обратиться:
            </p>
            <div class="mt-6 space-y-3 text-text-muted">
              <p>{{ siteConfig.name }}</p>
              <div class="space-y-1">
                <p>Адрес:</p>
                <p v-for="address in addresses" :key="address">{{ address }}</p>
              </div>
              <p>Телефон: {{ contacts.phone }}</p>
            </div>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>
  </div>
</template>
