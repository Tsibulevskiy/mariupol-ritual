<script setup lang="ts">
import { Ruler } from 'lucide-vue-next'
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'
import { monumentProducts } from '@/data/monuments'
import type { ServicePage } from '@/types/content'
import { createPhoneLink } from '@/utils/contact-links'

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

const monumentPackages = [
  {
    id: 'monument-package-1',
    number: '1',
    price: '54 000 ₽',
    specs: [
      'Стела 80×40×8 см',
      'Тумба 50×15×15 см',
      'Надгробная плита 80×40×3 см',
    ],
  },
  {
    id: 'monument-package-2',
    number: '2',
    price: '65 000 ₽',
    specs: [
      'Стела 100×50×8 см',
      'Тумба 60×20×15 см',
      'Надгробная плита 100×50×5 см',
    ],
  },
  {
    id: 'monument-package-3',
    number: '3',
    price: '95 000 ₽',
    specs: [
      'Стела 120×60×8 см',
      'Тумба 70×20×15 см',
      'Надгробная плита 120×60×5 см',
    ],
  },
]

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

    <section v-if="page.id === 'pamyatniki'" class="section bg-[#F7F9FB]">
      <BaseContainer>
        <SectionHeading
          title="Цены на памятники"
          description="Ниже приведены ориентиры по стоимости популярных комплектов памятников. Точную цену согласуем после выбора размера, оформления и условий установки."
        />

        <div class="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] xl:items-start">
          <BaseCard class="overflow-hidden !p-0">
            <div
              v-for="item in monumentPackages"
              :key="item.id"
              class="grid gap-4 px-4 py-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center md:gap-5 md:px-6 md:py-5"
              :class="item.id !== monumentPackages[monumentPackages.length - 1]?.id
                ? 'border-b border-border'
                : ''"
            >
              <div class="flex gap-4">
                <div
                  class="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white"
                >
                  {{ item.number }}
                </div>
                <div>
                  <p
                    v-for="spec in item.specs"
                    :key="spec"
                    class="text-sm leading-6 text-text md:text-base"
                  >
                    {{ spec }}
                  </p>
                </div>
              </div>

              <div
                class="inline-flex items-center justify-center rounded-[14px] bg-primary px-5 py-3 text-xl leading-none font-semibold text-white md:min-h-[88px] md:px-6 md:py-4 md:text-2xl"
              >
                {{ item.price }}
              </div>
            </div>
          </BaseCard>

          <BaseCard class="overflow-hidden !p-0">
            <NuxtImg
              src="/monuments-price-guide.webp"
              alt="Схема элементов памятника: стела, подставка, тумба, надгробная плита, цветник"
              width="1266"
              height="1242"
              class="h-[320px] w-full bg-white object-contain p-4 sm:h-[420px] sm:p-6 xl:h-full xl:object-cover xl:p-0"
              loading="lazy"
              sizes="(max-width: 1279px) 100vw, 420px"
            />
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <MonumentsCatalog
      v-if="page.id === 'pamyatniki'"
      :items="monumentProducts"
    />

    <section v-if="page.id === 'pamyatniki'" class="section">
      <BaseContainer>
        <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(336px,416px)] lg:items-start">
          <div>
            <SectionHeading
              title="С вами будет работать"
              description="Менеджер ответит на вопросы по памятнику, согласует детали и останется с вами на связи."
            />
          </div>

          <BaseCard>
            <div class="flex flex-col gap-4">
              <NuxtImg
                src="/karina-manager.png"
                alt="Менеджер Карина"
                width="360"
                height="360"
                class="h-auto w-full rounded-2xl object-cover"
                loading="lazy"
                sizes="(max-width: 1023px) 100vw, 416px"
              />

              <div class="flex flex-col gap-4">
                <div>
                  <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                    Менеджер
                  </p>
                  <h3 class="mt-3 text-3xl font-semibold text-foreground">
                    Карина
                  </h3>
                  <a
                    :href="createPhoneLink('+7 949 751 47 86')"
                    class="mt-4 inline-flex min-h-12 items-center font-serif text-2xl font-semibold text-primary"
                    aria-label="Позвонить менеджеру Карине"
                  >
                    +7 949 751 47 86
                  </a>
                </div>

                <BaseButton
                  :href="createPhoneLink('+7 949 751 47 86')"
                  variant="secondary"
                  external
                >
                  Позвонить
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>
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

    <MonumentsPhotoSlider v-if="page.id === 'pamyatniki'" />

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
