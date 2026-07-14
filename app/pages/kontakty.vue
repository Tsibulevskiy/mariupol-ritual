<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'
import type { Faq } from '@/types/content'

const title = 'Контакты'
const description =
  'Контактная информация, адрес, часы работы, мессенджеры, форма обратного звонка и ориентиры по обращению.'
const path = '/kontakty'
const breadcrumbs = [{ label: 'Главная', href: '/' }, { label: 'Контакты' }]
const routeUrl = 'https://maps.google.com/?q='

const entranceNote =
  'Фотография входа будет добавлена после получения реального изображения.'
const landmark =
  'Ориентир для посещения будет уточнен после подтверждения точного адреса и деталей входа.'
const serviceAreas = [
  'Мариуполь.',
  'Ближайшие районы обслуживания будут указаны после подтверждения фактической географии выезда.',
]

const faq: Faq[] = [
  {
    question: 'Как быстрее всего связаться?',
    answer:
      'Самый быстрый способ — звонок по телефону. Также можно написать в Telegram или WhatsApp, если это удобнее.',
  },
  {
    question: 'Можно ли сразу уточнить стоимость?',
    answer:
      'Да, по телефону можно быстро описать ситуацию и перейти к предварительному расчету или подбору нужной услуги.',
  },
]

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
  defineOrganization({
    name: siteConfig.name,
    telephone: contacts.phone,
    address: contacts.address,
    url: canonical,
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
      description="На странице собраны основные способы связи, адрес, часы работы и форма обратного звонка."
      eyebrow="Связаться и приехать"
      show-phone
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="breadcrumbs" />

        <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <BaseCard>
            <SectionHeading
              title="Основные контакты"
              description="Все ключевые способы связи вынесены в один блок."
            />
            <dl class="mt-8 space-y-5">
              <div>
                <dt class="font-semibold">Телефон</dt>
                <dd>
                  <a
                    :href="createPhoneLink(contacts.phone)"
                    class="inline-flex min-h-12 items-center font-serif text-2xl font-semibold text-primary"
                    aria-label="Позвонить по телефону"
                  >
                    {{ contacts.phone }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="font-semibold">Telegram</dt>
                <dd>
                  <a
                    :href="createTelegramLink(contacts.telegram)"
                    class="inline-flex min-h-11 items-center text-primary"
                    aria-label="Написать в Telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{{ contacts.telegram.replace(/^@/, '') }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="font-semibold">WhatsApp</dt>
                <dd>
                  <a
                    :href="createWhatsappLink(contacts.whatsapp)"
                    class="inline-flex min-h-11 items-center text-primary"
                    aria-label="Написать в WhatsApp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ contacts.whatsapp }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="font-semibold">Адрес</dt>
                <dd class="text-text-muted">{{ contacts.address }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Часы работы</dt>
                <dd class="text-text-muted">{{ contacts.workingHours }}</dd>
              </div>
            </dl>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton />
              <MessengerButton messenger="telegram" />
              <MessengerButton messenger="whatsapp" />
            </div>
          </BaseCard>

          <MapPlaceholder :route-url="routeUrl" />
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <div class="grid gap-6 lg:grid-cols-2">
          <BaseCard class="h-full">
            <SectionHeading
              title="Фотография входа"
              description="Этот блок подготовлен под реальное изображение входа."
            />
            <div class="mt-6 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border bg-surface p-6 text-center text-text-muted">
              {{ entranceNote }}
            </div>
          </BaseCard>

          <BaseCard class="h-full">
            <SectionHeading
              title="Ориентир"
              description="Краткая подсказка для поиска входа или подъезда."
            />
            <p class="mt-6 text-text-muted">
              {{ landmark }}
            </p>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <SectionHeading
          title="Районы обслуживания"
          description="Публикуем только подтвержденную географию работы."
        />
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <BaseCard v-for="item in serviceAreas" :key="item" class="h-full">
            <p>{{ item }}</p>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <SectionHeading
          title="Обратный звонок"
          description="Если удобнее, оставьте номер и комментарий — свяжемся с вами."
        />
        <div class="mt-10 mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <SectionHeading
          title="FAQ"
          description="Короткие ответы по связи и обращению."
        />
        <FaqAccordion :items="faq" class="mt-10" />
      </BaseContainer>
    </section>
  </div>
</template>
