<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'

const title = 'Согласие на использование файлов Cookie'
const description =
  'Информация об использовании файлов Cookie на сайте «Мариупольский ритуальный дом».'
const path = '/cookie-policy'
const breadcrumbs = [
  { label: 'Главная', href: '/' },
  { label: 'Согласие на использование файлов Cookie' },
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
      description="Разъясняем, какие Cookie могут использоваться на сайте и для каких целей они нужны."
      eyebrow="Юридическая информация"
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="breadcrumbs" />

        <div class="mt-8 space-y-6">
          <BaseCard>
            <p class="text-text-muted">Дата вступления в силу: 13.07.2026</p>
            <p class="mt-4 text-text-muted">
              Настоящая политика описывает порядок использования файлов Cookie
              на сайте «{{ siteConfig.name }}».
            </p>
          </BaseCard>

          <BaseCard>
            <h2>1. Что такое Cookie</h2>
            <p class="mt-4 text-text-muted">
              Cookie — это небольшие текстовые файлы, которые сохраняются на
              устройстве пользователя и помогают сайту корректно работать,
              запоминать настройки и анализировать использование сайта.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>2. Для чего используются Cookie</h2>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>для корректной работы сайта;</li>
              <li>для сохранения пользовательских настроек;</li>
              <li>для анализа посещаемости;</li>
              <li>для повышения удобства использования сайта.</li>
            </ul>
          </BaseCard>

          <BaseCard>
            <h2>3. Какие Cookie могут использоваться</h2>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>технические Cookie, необходимые для работы сайта;</li>
              <li>аналитические Cookie для обезличенной статистики;</li>
              <li>функциональные Cookie для сохранения настроек.</li>
            </ul>
          </BaseCard>

          <BaseCard>
            <h2>4. Управление Cookie</h2>
            <p class="mt-4 text-text-muted">
              Пользователь может ограничить или отключить использование Cookie
              в настройках своего браузера. При этом отдельные функции сайта
              могут работать некорректно.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>5. Аналитические сервисы</h2>
            <p class="mt-4 text-text-muted">
              Для анализа посещаемости могут использоваться сторонние сервисы
              веб-аналитики, которые собирают обезличенную статистическую
              информацию и могут применять Cookie или аналогичные технологии.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>6. Изменение политики</h2>
            <p class="mt-4 text-text-muted">
              Мы вправе вносить изменения в данную политику. Актуальная версия
              всегда размещается на этой странице.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>7. Контактная информация</h2>
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
