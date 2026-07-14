<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'

definePageMeta({
  alias: ['/soglasie-na-obrabotku-dannyh'],
})

const title = 'Согласие на обработку персональных данных'
const description =
  'Согласие пользователя на обработку персональных данных при использовании сайта «Мариупольский ритуальный дом».'
const path = '/personal-data-consent'
const breadcrumbs = [
  { label: 'Главная', href: '/' },
  { label: 'Согласие на обработку персональных данных' },
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
      description="Подтверждаем согласие пользователя на обработку персональных данных при отправке форм и использовании сайта."
      eyebrow="Юридическая информация"
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="breadcrumbs" />

        <div class="mt-8 space-y-6">
          <BaseCard>
            <p class="text-text-muted">Дата вступления в силу: 13.07.2026</p>
            <p class="mt-4 text-text-muted">
              Настоящим пользователь, оставляя данные на сайте
              «{{ siteConfig.name }}», свободно, своей волей и в своем интересе
              выражает согласие на обработку персональных данных.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>1. Какие данные могут обрабатываться</h2>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>имя;</li>
              <li>номер телефона;</li>
              <li>адрес электронной почты, если он указан пользователем;</li>
              <li>текст обращения или комментария;</li>
              <li>IP-адрес;</li>
              <li>технические данные о посещении сайта.</li>
            </ul>
          </BaseCard>

          <BaseCard>
            <h2>2. Цели обработки персональных данных</h2>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>обработка обращений пользователя;</li>
              <li>предоставление консультаций;</li>
              <li>обратная связь с пользователем;</li>
              <li>организация оказания ритуальных услуг;</li>
              <li>улучшение работы сайта;</li>
              <li>обеспечение безопасности сайта.</li>
            </ul>
          </BaseCard>

          <BaseCard>
            <h2>3. Действия с персональными данными</h2>
            <p class="mt-4 text-text-muted">
              В рамках настоящего согласия могут осуществляться сбор, запись,
              систематизация, накопление, хранение, уточнение, использование,
              обезличивание, блокирование и удаление персональных данных.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>4. Способы обработки</h2>
            <p class="mt-4 text-text-muted">
              Обработка персональных данных может осуществляться как с
              использованием средств автоматизации, так и без их использования.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>5. Срок действия согласия</h2>
            <p class="mt-4 text-text-muted">
              Согласие действует до достижения целей обработки персональных
              данных либо до момента его отзыва пользователем, если иное не
              предусмотрено законодательством.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>6. Отзыв согласия</h2>
            <p class="mt-4 text-text-muted">
              Пользователь вправе в любой момент отозвать согласие на обработку
              персональных данных, обратившись по контактным данным,
              указанным на сайте.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>7. Подтверждение согласия</h2>
            <p class="mt-4 text-text-muted">
              Отправляя форму на сайте, пользователь подтверждает, что
              ознакомился с настоящим согласием, понимает его содержание и
              принимает изложенные условия.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>8. Контактная информация</h2>
            <div class="mt-4 space-y-3 text-text-muted">
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
