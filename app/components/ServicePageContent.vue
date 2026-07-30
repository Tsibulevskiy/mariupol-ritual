<script setup lang="ts">
import { Ruler } from 'lucide-vue-next'
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'
import { monumentProducts } from '@/data/monuments'
import type { ServicePage } from '@/types/content'

const props = defineProps<{
  page: ServicePage
}>()

usePageSeo({
  title: props.page.metaTitle,
  description: props.page.metaDescription,
  path: props.page.path,
})

const runtimeConfig = useRuntimeConfig()
const canonical = new URL(
  props.page.path,
  runtimeConfig.public.siteUrl,
).toString()

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: props.page.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.href ?? props.page.path, runtimeConfig.public.siteUrl)
        .toString(),
    })),
  }),
  defineService({
    name: props.page.h1,
    description: props.page.metaDescription,
    serviceType: props.page.h1,
    areaServed: props.page.serviceAreas,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      telephone: contacts.phone,
      address: contacts.address,
    },
    url: canonical,
  }),
])
</script>

<template>
  <div>
    <PageHero
      :title="page.h1"
      :description="page.summary"
      :phone="page.phone"
      :primary-action-label="page.primaryActionLabel"
      :secondary-action-label="page.secondaryActionLabel"
      :secondary-action-href="page.secondaryActionHref"
      :benefits="page.benefits"
      :promo="page.promo"
      :eyebrow="page.eyebrow"
      show-phone
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="page.breadcrumbs" />

        <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <BaseCard>
            <SectionHeading
              title="Кратко об услуге"
              :description="page.summary"
            />
            <div
              v-if="page.id === 'pamyatniki'"
              class="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-5"
            >
              <p class="text-base font-semibold text-foreground">
                При заказе памятника укладка ФЭМ-плитки и бордюр:
              </p>
              <p class="mt-4 text-lg font-semibold text-primary">
                220 × 220 см — 35 000 ₽
              </p>
              <p class="mt-2 text-lg font-semibold text-primary">
                220 × 150 см — 32 000 ₽
              </p>
              <p class="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm">
                Уборка территории бесплатно
              </p>
            </div>
          </BaseCard>

          <BaseCard class="overflow-hidden !p-0">
            <template v-if="page.id === 'pamyatniki'">
              <NuxtImg
                src="/car.png"
                alt="Автомобиль ритуальной службы"
                class="h-[211px] w-full object-contain bg-surface-alt"
                width="1024"
                height="1024"
                loading="lazy"
              />
              <div class="p-6">
                <p class="flex items-start gap-2 text-3xl font-semibold text-primary">
                  <Ruler :size="24" aria-hidden="true" class="mt-1 shrink-0" />
                  <span>Бесплатный выезд замера участка.</span>
                </p>
                <p class="mt-3 text-text-muted">
                  Специалист приедет на место, снимет размеры и подскажет подходящий вариант установки.
                </p>
              </div>
            </template>
            <template v-else>
              <div class="p-6">
                <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                  Стоимость
                </p>
                <p class="mt-4 text-3xl font-semibold text-primary">
                  {{ page.price }}
                </p>
                <p class="mt-3 text-text-muted">
                  {{ page.priceNote }}
                </p>
              </div>
            </template>
            <div class="p-6 pt-0">
              <CallButton
                :phone="page.phone"
                label="Позвонить"
                class="mt-6"
                full-width
              />
            </div>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <MonumentsCatalog
      v-if="page.id === 'pamyatniki'"
      :items="monumentProducts"
    />

    <section v-if="page.id !== 'pamyatniki'" class="section">
      <BaseContainer>
        <SectionHeading
          title="Порядок оказания услуги"
          description="Последовательность шагов зависит от конкретной ситуации."
        />
        <ol class="mt-10 grid gap-6 md:grid-cols-3">
          <li v-for="(step, index) in page.process" :key="step">
            <BaseCard class="h-full">
              <p class="font-semibold text-primary">Этап {{ index + 1 }}</p>
              <p class="mt-3">{{ step }}</p>
            </BaseCard>
          </li>
        </ol>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <SectionHeading
          title="Частые вопросы"
          description="Ответы будут уточняться по мере наполнения сайта."
        />
        <FaqAccordion :items="page.faq" class="mt-10" />
      </BaseContainer>
    </section>

    <section v-if="page.id !== 'pamyatniki'" class="section">
      <BaseContainer>
        <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <BaseCard>
            <SectionHeading
              title="Нужна помощь по телефону"
              description="Быстрее всего уточнить ситуацию звонком. Кнопка ведет сразу на набор номера."
            />
            <CallButton label="Позвонить сейчас" class="mt-6" full-width />
          </BaseCard>
          <ContactForm />
        </div>
      </BaseContainer>
    </section>

    <ContactBlock
      :phone="page.phone"
      :show-telegram="page.id !== 'pamyatniki'"
    />
  </div>
</template>
