<script setup lang="ts">
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
          </BaseCard>

          <BaseCard>
            <p class="text-sm font-semibold tracking-wider text-primary uppercase">
              Стоимость
            </p>
            <p class="mt-4 text-3xl font-semibold text-primary">
              {{ page.price }}
            </p>
            <p class="mt-3 text-text-muted">
              {{ page.priceNote }}
            </p>
            <CallButton
              :phone="page.phone"
              label="Позвонить"
              class="mt-6"
              full-width
            />
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <MonumentsCatalog
      v-if="page.id === 'pamyatniki'"
      :items="monumentProducts"
    />

    <section class="section bg-surface-alt">
      <BaseContainer>
        <SectionHeading
          title="Что входит в услугу"
          description="Состав раздела пока заполнен временным контентом."
        />
        <ul class="mt-10 grid gap-6 md:grid-cols-3">
          <li v-for="item in page.included" :key="item">
            <BaseCard class="h-full">
              <p>{{ item }}</p>
            </BaseCard>
          </li>
        </ul>
      </BaseContainer>
    </section>

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
        <div class="grid gap-6 lg:grid-cols-2">
          <BaseCard class="h-full">
            <SectionHeading
              title="Что оплачивается отдельно"
              description="Этот блок тоже использует временные формулировки."
            />
            <ul class="mt-6 space-y-3 text-text-muted">
              <li v-for="item in page.separatePayment" :key="item">
                {{ item }}
              </li>
            </ul>
          </BaseCard>

          <BaseCard class="h-full">
            <SectionHeading
              title="Районы обслуживания"
              description="Подробный перечень районов будет уточнен."
            />
            <ul class="mt-6 space-y-3 text-text-muted">
              <li v-for="item in page.serviceAreas" :key="item">
                {{ item }}
              </li>
            </ul>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <SectionHeading
          title="Связанные услуги"
          description="Если нужен другой формат помощи, можно перейти в соседние разделы."
        />
        <div class="mt-10 flex flex-wrap gap-3">
          <BaseButton
            v-for="item in page.relatedLinks"
            :key="item.href"
            :href="item.href"
            variant="secondary"
          >
            {{ item.label }}
          </BaseButton>
        </div>
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
