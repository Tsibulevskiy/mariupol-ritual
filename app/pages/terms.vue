<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'

const title = 'Пользовательское соглашение'
const description =
  'Условия использования сайта «Мариупольский ритуальный дом».'
const path = '/terms'
const breadcrumbs = [
  { label: 'Главная', href: '/' },
  { label: 'Пользовательское соглашение' },
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
      description="Определяем общие условия использования сайта и размещенной на нем информации."
      eyebrow="Юридическая информация"
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="breadcrumbs" />

        <div class="mt-8 space-y-6">
          <BaseCard>
            <p class="text-text-muted">Дата вступления в силу: 13.07.2026</p>
            <p class="mt-4 text-text-muted">
              Настоящее Пользовательское соглашение регулирует отношения между
              владельцем сайта «{{ siteConfig.name }}» и пользователями сайта.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>1. Общие положения</h2>
            <p class="mt-4 text-text-muted">
              Используя сайт, пользователь подтверждает согласие с условиями
              настоящего соглашения. Если пользователь не согласен с условиями,
              он должен прекратить использование сайта.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>2. Назначение сайта</h2>
            <p class="mt-4 text-text-muted">
              Сайт предназначен для предоставления информации об услугах,
              порядке обращения, способах связи и иных сведениях, связанных с
              деятельностью компании.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>3. Обязанности пользователя</h2>
            <ul class="mt-4 space-y-2 text-text-muted">
              <li>предоставлять корректные данные при отправке форм;</li>
              <li>не использовать сайт в противоправных целях;</li>
              <li>не предпринимать действий, нарушающих работу сайта;</li>
              <li>не размещать через формы сайта недостоверную информацию.</li>
            </ul>
          </BaseCard>

          <BaseCard>
            <h2>4. Информация на сайте</h2>
            <p class="mt-4 text-text-muted">
              Мы стремимся поддерживать информацию на сайте в актуальном
              состоянии, однако отдельные сведения могут уточняться при личном
              обращении или по телефону.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>5. Ограничение ответственности</h2>
            <p class="mt-4 text-text-muted">
              Владелец сайта не несет ответственности за невозможность
              использования сайта по причинам, не зависящим от него, а также за
              возможные перебои в работе интернет-сервисов и каналов связи.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>6. Персональные данные</h2>
            <p class="mt-4 text-text-muted">
              Обработка персональных данных осуществляется в соответствии с
              Политикой конфиденциальности и Согласием на обработку
              персональных данных, размещенными на сайте.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>7. Интеллектуальные права</h2>
            <p class="mt-4 text-text-muted">
              Тексты, изображения, элементы дизайна и иные материалы сайта
              используются в рамках работы сайта и не подлежат
              несанкционированному копированию или распространению без согласия
              правообладателя, если иное не следует из их назначения.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>8. Изменение условий</h2>
            <p class="mt-4 text-text-muted">
              Мы вправе изменять настоящее соглашение. Актуальная версия всегда
              публикуется на данной странице.
            </p>
          </BaseCard>

          <BaseCard>
            <h2>9. Контактная информация</h2>
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
