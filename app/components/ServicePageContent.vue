<script setup lang="ts">
import {
  Ambulance,
  BadgeCheck,
  Building2,
  Car,
  CarFront,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Cross,
  FileText,
  Flower,
  Flower2,
  Handshake,
  HeartHandshake,
  House,
  Layers,
  MapPin,
  MapPinned,
  Navigation,
  Package,
  PackageOpen,
  PackageCheck,
  Phone,
  Route,
  Ruler,
  ShoppingBag,
  Shirt,
  Tag,
  Timer,
} from 'lucide-vue-next'
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'
import { monumentProducts } from '@/data/monuments'
import { servicePages } from '@/data/service-pages'
import type { ServicePage } from '@/types/content'
import { createPhoneLink } from '@/utils/contact-links'

const props = defineProps<{
  page: ServicePage
}>()

const isRitualProductsPage = props.page.id === 'ritualnye-tovary'

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

const serviceItemIcons = {
  ambulance: Ambulance,
  clock: Clock3,
  fileText: FileText,
  package: Package,
  car: Car,
  carFront: CarFront,
  badgeCheck: BadgeCheck,
  heartHandshake: HeartHandshake,
  handshake: Handshake,
  flower2: Flower2,
  phone: Phone,
  mapPin: MapPin,
  mapPinned: MapPinned,
  timer: Timer,
  clipboardCheck: ClipboardCheck,
  clipboardList: ClipboardList,
  packageCheck: PackageCheck,
  building2: Building2,
  route: Route,
  shoppingBag: ShoppingBag,
} as const

const productCategoryIcons = {
  box: Package,
  flower2: Flower2,
  cross: Cross,
  layers: Layers,
  shirt: Shirt,
  tag: Tag,
  flower: Flower,
  packageOpen: PackageOpen,
} as const

const activeTimelineStep = ref('')

watchEffect(() => {
  if (!activeTimelineStep.value) {
    activeTimelineStep.value = props.page.timelineSteps?.[0]?.title ?? ''
  }
})

const currentTimelineStep = computed(
  () =>
    props.page.timelineSteps?.find(step => step.title === activeTimelineStep.value)
    ?? props.page.timelineSteps?.[0],
)

const whereToBuyLocations = computed(() =>
  isRitualProductsPage
    ? contacts.address
      .split(';')
      .map(address => address.trim())
      .filter(Boolean)
      .map(address => ({
        title: 'Наш адрес в Мариуполе',
        address,
        phone: contacts.phone,
        routeQuery: address,
      }))
    : [],
)

const relatedServiceIcons = {
  ambulance: Ambulance,
  car: Car,
  clipboardCheck: ClipboardCheck,
  landmark: Building2,
} as const

const resolvedRelatedServices = computed(() =>
  props.page.relatedServices
    ? {
      ...props.page.relatedServices,
      items: props.page.relatedServices.items
        .map((item) => {
          const targetPage = servicePages[item.pageKey]

          if (!targetPage || targetPage.path === props.page.path) {
            return null
          }

          return {
            ...item,
            href: targetPage.path,
          }
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    }
    : null,
)

const routeUrl = 'https://maps.google.com/?q='
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
      :description="page.heroDescription ?? page.summary"
      :phone="page.phone"
      :primary-action-label="page.primaryActionLabel"
      :primary-action-href="page.primaryActionHref"
      :secondary-action-label="page.secondaryActionLabel"
      :secondary-action-href="page.secondaryActionHref"
      :secondary-action-is-phone="page.secondaryActionIsPhone"
      :benefits="page.benefits"
      :benefits-inline="page.benefitsInline"
      :highlight-text="page.highlightText"
      :description-secondary="page.descriptionSecondary"
      :promo="page.promo"
      :promo-phone="page.promoPhone"
      :eyebrow="page.eyebrow"
      :image-src="page.imageSrc"
      :image-alt="page.imageAlt"
      :show-image-placeholder="page.showImagePlaceholder"
      :show-phone="!isRitualProductsPage"
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="page.breadcrumbs" />

        <section
          v-if="page.productCategories?.length"
          id="ritual-products"
          class="mt-8 scroll-mt-24"
        >
          <SectionHeading
            :title="page.productCategoriesTitle ?? ''"
            :description="page.productCategoriesDescription"
          />

          <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <BaseCard
              v-for="category in page.productCategories"
              :key="category.title"
              class="flex h-full flex-col overflow-hidden !p-0"
            >
              <div class="aspect-[16/10] border-b border-border bg-surface-alt">
                <img
                  v-if="category.imageSrc"
                  :src="category.imageSrc"
                  :alt="category.imageAlt"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center"
                  aria-hidden="true"
                >
                  <div class="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-primary/15 bg-white text-primary shadow-sm">
                    <component
                      :is="productCategoryIcons[category.icon as keyof typeof productCategoryIcons]"
                      :size="32"
                      stroke-width="1.8"
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-1 flex-col p-5 sm:p-6">
                <div class="flex items-start gap-3">
                  <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <component
                      :is="productCategoryIcons[category.icon as keyof typeof productCategoryIcons]"
                      :size="20"
                      stroke-width="1.8"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 class="text-xl leading-tight font-semibold text-foreground">
                    {{ category.title }}
                  </h3>
                </div>

                <p class="mt-4 flex-1 text-text-muted">
                  {{ category.description }}
                </p>

                <BaseButton
                  v-if="category.ctaType === 'link' && category.href"
                  :href="category.href"
                  variant="secondary"
                  class="mt-6"
                >
                  {{ category.ctaLabel }}
                </BaseButton>
                <CallButton
                  v-else-if="category.ctaType === 'phone'"
                  :label="category.ctaLabel"
                  variant="secondary"
                  class="mt-6"
                  full-width
                />
                <BaseButton
                  v-else
                  variant="secondary"
                  disabled
                  class="mt-6"
                >
                  {{ category.ctaLabel }}
                </BaseButton>
              </div>
            </BaseCard>
          </div>
        </section>

        <section
          v-for="section in page.productSections"
          :id="section.id"
          :key="section.id"
          class="mt-12 scroll-mt-24"
        >
          <div class="max-w-4xl">
            <h2 class="max-w-3xl text-[2.2rem] leading-[1.12] sm:text-[2.5rem]">
              {{ section.title }}
            </h2>

            <div class="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-text-muted">
              <p
                v-for="paragraph in section.paragraphs"
                :key="paragraph"
              >
                {{ paragraph }}
              </p>
            </div>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CallButton
                :label="section.ctaLabel"
                variant="secondary"
              />
              <p
                v-if="section.ctaNote"
                class="text-sm text-text-muted"
              >
                {{ section.ctaNote }}
              </p>
            </div>
          </div>

          <div
            v-if="section.products.length"
            class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            <ProductCard
              v-for="item in section.products"
              :key="`${section.id}-${item.title}-${item.description}`"
              :item="item"
            />
          </div>
        </section>

        <FuneralKitSection
          v-if="page.funeralKit"
          :block="page.funeralKit"
          class="mt-12"
        />

        <section
          v-if="isRitualProductsPage && page.reasonsTitle && page.reasonsItems?.length"
          id="why-us"
          class="mt-12 scroll-mt-24"
        >
          <SectionHeading
            :title="page.reasonsTitle"
            :description="page.reasonsDescription"
          />

          <div class="mt-8 grid gap-6 md:grid-cols-2">
            <BaseCard
              v-for="item in page.reasonsItems"
              :key="item.title"
              class="h-full"
            >
              <div class="flex items-start gap-4">
                <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <component
                    :is="serviceItemIcons[item.icon as keyof typeof serviceItemIcons]"
                    :size="22"
                    aria-hidden="true"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <h3 class="text-lg font-semibold text-foreground">
                    {{ item.title }}
                  </h3>
                  <p class="mt-3 text-text-muted">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </BaseCard>
          </div>
        </section>

        <PurchaseStepsSection
          v-if="isRitualProductsPage && page.purchaseSteps"
          :block="page.purchaseSteps"
          class="mt-12"
        />

        <section
          v-if="isRitualProductsPage"
          id="faq"
          class="mt-12 scroll-mt-24"
        >
          <SectionHeading
            :title="page.faqTitle ?? 'Частые вопросы'"
            :description="page.faqDescription ?? 'Ответы будут уточняться по мере наполнения сайта.'"
          />
          <div class="mt-10">
            <FaqAccordion :items="page.faq" :default-open-index="-1" />
          </div>
        </section>

        <section
          v-if="isRitualProductsPage && whereToBuyLocations.length"
          id="where-to-buy"
          class="mt-12 scroll-mt-24"
        >
          <SectionHeading
            title="Где приобрести ритуальные товары в Мариуполе"
            description="Ритуальные товары можно подобрать непосредственно у нас в Мариуполе. Перед посещением рекомендуем позвонить и уточнить наличие необходимых товаров."
          />

          <div class="mt-10 grid gap-6 md:grid-cols-2">
            <BaseCard
              v-for="location in whereToBuyLocations"
              :key="location.address"
              class="h-full"
            >
              <article>
                <div class="flex items-start gap-4">
                  <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin :size="22" aria-hidden="true" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-lg font-semibold text-foreground">
                      {{ location.title }}
                    </p>

                    <address class="mt-4 not-italic text-text-muted">
                      {{ location.address }}
                    </address>

                    <div class="mt-4 flex items-start gap-3">
                      <Phone :size="18" class="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                      <a
                        :href="createPhoneLink(location.phone)"
                        class="font-semibold text-foreground no-underline"
                      >
                        {{ location.phone }}
                      </a>
                    </div>

                    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                      <CallButton
                        :phone="location.phone"
                        label="Позвонить"
                        variant="primary"
                      />
                      <BaseButton
                        :href="`${routeUrl}${encodeURIComponent(location.routeQuery)}`"
                        variant="secondary"
                        external
                      >
                        <span class="inline-flex items-center gap-2">
                          <Navigation :size="18" aria-hidden="true" />
                          <span>Построить маршрут</span>
                        </span>
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </article>
            </BaseCard>
          </div>
        </section>

        <section
          v-if="resolvedRelatedServices?.items.length"
          id="related-services"
          class="mt-12 scroll-mt-24"
        >
          <SectionHeading
            :title="resolvedRelatedServices.title"
            :description="resolvedRelatedServices.description"
          />

          <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <NuxtLink
              v-for="item in resolvedRelatedServices.items"
              :key="item.href"
              :to="item.href"
              class="group block h-full no-underline"
              :aria-label="item.title"
            >
              <BaseCard class="flex h-full flex-col transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:shadow-md">
                <div class="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <component
                    :is="relatedServiceIcons[item.icon]"
                    :size="22"
                    aria-hidden="true"
                  />
                </div>

                <h3 class="mt-5 text-xl leading-tight font-semibold text-foreground">
                  {{ item.title }}
                </h3>

                <p class="mt-4 flex-1 text-text-muted">
                  {{ item.description }}
                </p>

                <div class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <span>Подробнее</span>
                  <span aria-hidden="true">→</span>
                </div>
              </BaseCard>
            </NuxtLink>
          </div>
        </section>

        <section
          v-if="page.finalCta"
          id="final-cta"
          class="mt-12 scroll-mt-24"
        >
          <BaseCard class="overflow-hidden border-primary/20 bg-primary/5">
            <div class="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-center">
              <div class="max-w-3xl">
                <h2 class="max-w-3xl text-[2rem] leading-[1.12] sm:text-[2.35rem]">
                  {{ page.finalCta.title }}
                </h2>
                <p class="mt-5 text-[1.0625rem] leading-8 text-text-muted">
                  {{ page.finalCta.description }}
                </p>
                <p
                  v-if="page.finalCta.note"
                  class="mt-4 text-text-muted"
                >
                  {{ page.finalCta.note }}
                </p>
              </div>

              <div class="flex flex-col gap-3 lg:items-start lg:justify-center">
                <CallButton
                  :label="page.finalCta.primaryLabel"
                  class="w-full lg:w-auto"
                  full-width
                />
                <BaseButton
                  v-if="page.finalCta.secondaryLabel && page.finalCta.secondaryHref"
                  :href="page.finalCta.secondaryHref"
                  variant="ghost"
                  class="w-full justify-center lg:w-auto lg:justify-start"
                >
                  {{ page.finalCta.secondaryLabel }}
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </section>

        <div
          v-if="!isRitualProductsPage && page.serviceItems?.length"
          class="mt-8"
        >
          <template v-if="page.id === 'ritualny-transport'">
            <div class="max-w-4xl">
              <h2 class="max-w-3xl text-[2.2rem] leading-[1.12] sm:text-[2.5rem]">
                {{ page.serviceItemsTitle }}
              </h2>
              <div class="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-text-muted">
                <p>
                  Мариупольский ритуальный дом предоставляет транспорт для перевозки умерших и организации похорон в Мариуполе. Поможем организовать перевозку тела в морг, подачу катафалка к месту прощания, доставку гроба с телом к месту захоронения и транспортное сопровождение похоронной процессии.
                </p>
                <p>
                  Маршрут и время подачи автомобиля согласовываются заранее. Ритуальный транспорт можно заказать как отдельно, так и вместе с комплексной организацией похорон.
                </p>
              </div>
            </div>
          </template>
          <SectionHeading
            v-else
            :title="page.serviceItemsTitle ?? 'Что входит в организацию похорон'"
            :description="page.serviceItemsDescription ?? 'Организация похорон включает множество вопросов, которые необходимо решить за короткое время. Мариупольский ритуальный дом поможет пройти все основные этапы — от первого обращения и перевозки тела до прощания и захоронения.'"
          />

          <div
            class="mt-8 grid gap-6 md:grid-cols-2"
            :class="page.id === 'ritualny-transport' ? 'xl:grid-cols-2' : 'xl:grid-cols-3'"
          >
            <BaseCard
              v-for="item in page.serviceItems"
              :key="item.title"
              class="h-full"
            >
              <div class="flex items-start gap-4">
                <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <component
                    :is="serviceItemIcons[item.icon as keyof typeof serviceItemIcons]"
                    :size="22"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p class="text-lg font-semibold text-foreground">
                    {{ item.title }}
                  </p>
                  <p class="mt-3 text-text-muted">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </BaseCard>
          </div>

          <div class="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p
              v-if="page.serviceItemsNote"
              class="text-base text-text-muted"
            >
              {{ page.serviceItemsNote }}
            </p>
            <BaseButton :href="createPhoneLink(page.phone ?? contacts.phone)" variant="secondary" external>
              Получить консультацию
            </BaseButton>
          </div>
        </div>

        <div
          v-if="!isRitualProductsPage && page.timelineSteps?.length"
          class="mt-12"
        >
          <SectionHeading
            :title="page.timelineTitle ?? ''"
            :description="page.timelineDescription ?? ''"
          />

          <ol class="relative mt-8 hidden items-start md:grid md:grid-cols-5 md:gap-4">
            <div
              class="absolute top-3.5 right-[8%] left-[8%] h-px bg-primary/25"
              aria-hidden="true"
            />
            <li
              v-for="(step, index) in page.timelineSteps"
              :key="`${step.title}-desktop`"
              class="relative z-10 flex flex-col items-center text-center"
            >
              <button
                type="button"
                class="group flex w-full flex-col items-center px-2"
                @mouseenter="activeTimelineStep = step.title"
                @focus="activeTimelineStep = step.title"
                @click="activeTimelineStep = step.title"
              >
                <span
                  :class="[
                    'flex size-7 items-center justify-center rounded-full border text-xs font-semibold leading-none transition-colors',
                    activeTimelineStep === step.title
                      ? 'border-primary bg-primary text-white'
                      : 'border-primary bg-background text-primary',
                  ]"
                >
                  {{ index + 1 }}
                </span>
                <span
                  :class="[
                    'mt-6 flex size-[4.5rem] items-center justify-center rounded-full border bg-background transition-colors',
                    activeTimelineStep === step.title
                      ? 'border-primary text-primary'
                      : 'border-primary/55 text-primary group-hover:border-primary/75',
                  ]"
                >
                  <component
                    :is="serviceItemIcons[step.icon as keyof typeof serviceItemIcons]"
                    :size="28"
                    stroke-width="1.75"
                  />
                </span>
                <h3 class="mt-4 max-w-[11rem] text-[15px] leading-tight font-semibold text-text">
                  {{ step.title }}
                </h3>
              </button>
            </li>
          </ol>

          <ol class="mt-8 space-y-3 md:hidden">
            <li
              v-for="(step, index) in page.timelineSteps"
              :key="`${step.title}-mobile`"
              class="overflow-hidden rounded-xl border transition-colors"
              :class="activeTimelineStep === step.title ? 'border-primary/35 bg-white shadow-sm' : 'border-border bg-surface'"
            >
              <button
                type="button"
                class="flex w-full items-center gap-4 px-4 py-4 text-left"
                @click="activeTimelineStep = step.title"
              >
                <span
                  :class="[
                    'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold leading-none transition-colors',
                    activeTimelineStep === step.title
                      ? 'bg-primary text-white'
                      : 'border border-primary/25 bg-primary/5 text-primary',
                  ]"
                >
                  {{ index + 1 }}
                </span>
                <span class="min-w-0 flex-1 text-base leading-snug font-semibold text-text">
                  {{ step.title }}
                </span>
              </button>
              <div
                v-if="activeTimelineStep === step.title"
                class="border-t border-primary/10 px-4 pt-4 pb-4"
              >
                <div class="flex items-start gap-4">
                  <span
                    class="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary"
                    aria-hidden="true"
                  >
                    <component
                      :is="serviceItemIcons[step.icon as keyof typeof serviceItemIcons]"
                      :size="22"
                      stroke-width="1.75"
                    />
                  </span>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                      Шаг {{ index + 1 }}
                    </p>
                    <p class="mt-2 text-[1.4rem] leading-[1.12] font-semibold text-foreground">
                      {{ step.title }}
                    </p>
                    <p class="mt-4 text-text-muted">
                      {{ step.description }}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ol>

          <BaseCard
            v-if="currentTimelineStep"
            class="mt-10 hidden overflow-hidden !p-0 md:block"
          >
            <div class="flex flex-col p-6 sm:p-8 lg:p-10">
              <div class="flex items-center gap-4">
                <span
                  class="flex size-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-3xl leading-none"
                  aria-hidden="true"
                >
                  <component
                    :is="serviceItemIcons[currentTimelineStep.icon as keyof typeof serviceItemIcons]"
                    :size="30"
                    class="text-primary"
                    stroke-width="1.75"
                  />
                </span>
                <div>
                  <p class="text-sm font-semibold tracking-[0.18em] text-primary">
                    Шаг {{ (page.timelineSteps?.findIndex(step => step.title === currentTimelineStep.title) ?? 0) + 1 }}
                  </p>
                  <h3 class="mt-2 text-[1.9rem] leading-[1.08]">
                    {{ currentTimelineStep.title }}
                  </h3>
                </div>
              </div>
              <p class="mt-8 max-w-3xl text-text-muted">
                {{ currentTimelineStep.description }}
              </p>
            </div>
          </BaseCard>

          <div class="mt-6 hidden flex-col gap-4 sm:flex-row md:flex">
            <div
              class="flex min-h-16 flex-1 items-center gap-4 rounded-xl border border-border bg-surface-alt px-5 py-4"
            >
              <span
                class="flex size-11 items-center justify-center rounded-full bg-white text-primary shadow-sm"
                aria-hidden="true"
              >
                <Phone :size="20" />
              </span>
              <div>
                <p class="text-sm text-text-muted">
                  Нужна помощь сейчас?
                </p>
                <a
                  :href="createPhoneLink(page.phone ?? contacts.phone)"
                  class="mt-1 block font-semibold text-text no-underline"
                >
                  +7 949 430-30-30
                </a>
              </div>
            </div>
            <BaseButton
              :href="createPhoneLink(page.phone ?? contacts.phone)"
              variant="primary"
              external
              class="sm:self-stretch"
            >
              Позвонить сейчас
            </BaseButton>
          </div>

          <BaseCard class="mt-6 border-primary/15 bg-primary/5 md:hidden">
            <a
              :href="createPhoneLink(page.phone ?? contacts.phone)"
              class="text-lg font-semibold text-primary"
            >
              {{ page.timelineCtaText }}
            </a>
          </BaseCard>
        </div>

        <BaseCard
          v-if="page.id === 'ritualny-transport' && page.highlightSectionTitle && page.highlightSectionText?.length"
          class="mt-12 overflow-hidden border-primary/20 bg-primary/5"
        >
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
            <div>
              <h2 class="max-w-3xl text-[1.85rem] leading-[1.12] sm:text-[2.15rem]">
                {{ page.highlightSectionTitle }}
              </h2>
              <div class="mt-5 max-w-3xl space-y-4 text-[1.0625rem] leading-8 text-text-muted">
                <p
                  v-for="paragraph in page.highlightSectionText"
                  :key="paragraph"
                >
                  {{ paragraph }}
                </p>
              </div>

              <BaseButton
                :href="createPhoneLink(page.phone ?? contacts.phone)"
                variant="primary"
                external
                class="mt-6"
              >
                Позвонить сейчас
              </BaseButton>
            </div>

            <div class="rounded-2xl border border-primary/15 bg-white p-5 shadow-sm sm:p-6">
              <div class="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-2 text-center sm:gap-3">
                <div class="flex flex-col items-center gap-3 self-start">
                  <span class="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-16">
                    <House :size="28" stroke-width="1.75" />
                  </span>
                  <span class="min-h-[3.5rem] text-sm font-semibold text-foreground">Дом</span>
                </div>

                <span class="mt-5 text-xl font-semibold text-primary sm:text-2xl" aria-hidden="true">→</span>

                <div class="flex flex-col items-center gap-3 self-start">
                  <span class="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-16">
                    <CarFront :size="28" stroke-width="1.75" />
                  </span>
                  <span class="min-h-[3.5rem] max-w-[8rem] text-sm font-semibold text-foreground">Ритуальный транспорт</span>
                </div>

                <span class="mt-5 text-xl font-semibold text-primary sm:text-2xl" aria-hidden="true">→</span>

                <div class="flex flex-col items-center gap-3 self-start">
                  <span class="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-16">
                    <Building2 :size="28" stroke-width="1.75" />
                  </span>
                  <span class="min-h-[3.5rem] text-sm font-semibold text-foreground">Морг</span>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>

        <div
          v-if="!isRitualProductsPage && page.id !== 'organizaciya-pohoron' && page.id !== 'ritualny-transport'"
          class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]"
        >
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

    <section
      v-if="!isRitualProductsPage && page.locations?.length"
      class="section bg-surface-alt"
    >
      <BaseContainer>
        <SectionHeading
          :title="page.locationsTitle ?? ''"
          :description="page.locationsDescription ?? ''"
        />

        <div class="mt-10 grid gap-6 lg:grid-cols-2">
          <BaseCard
            v-for="location in page.locations"
            :key="location.title"
            class="overflow-hidden !p-0"
          >
            <img
              :src="location.photoSrc"
              :alt="location.photoAlt"
              width="1200"
              height="900"
              class="h-64 w-full object-cover"
              loading="lazy"
            />
            <div class="p-6">
              <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                {{ location.title }}
              </p>
              <ul class="mt-5 space-y-4">
                <li class="flex items-start gap-3">
                  <MapPin :size="20" class="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p class="font-semibold text-foreground">
                      {{ location.address }}
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <Phone :size="20" class="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <a
                      :href="createPhoneLink(location.phone)"
                      class="font-semibold text-foreground no-underline"
                    >
                      {{ location.phone }}
                    </a>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <Clock3 :size="20" class="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p class="text-text-muted">
                      {{ location.workingHours }}
                    </p>
                  </div>
                </li>
              </ul>

              <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                <BaseButton
                  :href="createPhoneLink(location.phone)"
                  variant="primary"
                  external
                >
                  Позвонить
                </BaseButton>
                <BaseButton
                  :href="`${routeUrl}${encodeURIComponent(location.mapQuery)}`"
                  variant="secondary"
                  external
                >
                  <span class="inline-flex items-center gap-2">
                    <Navigation :size="18" aria-hidden="true" />
                    <span>Построить маршрут</span>
                  </span>
                </BaseButton>
              </div>
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

    <section v-if="!isRitualProductsPage && page.id !== 'pamyatniki' && page.id !== 'organizaciya-pohoron'" class="section">
      <BaseContainer>
        <template v-if="page.id === 'ritualny-transport' && page.orderSteps?.length">
          <SectionHeading
            :title="page.orderStepsTitle ?? 'Как заказать ритуальный транспорт в Мариуполе'"
            description="Порядок обращения простой: уточняем маршрут, согласовываем условия и подаём автомобиль к назначенному времени."
          />

          <ol class="relative mt-8 hidden items-start md:grid md:grid-cols-4 md:gap-4">
            <div
              class="absolute top-3.5 right-[8%] left-[8%] h-px bg-primary/25"
              aria-hidden="true"
            />
            <li
              v-for="step in page.orderSteps"
              :key="`${step.number}-${step.title}-desktop`"
              class="relative z-10 flex flex-col items-center text-center"
            >
              <button
                type="button"
                class="group flex w-full flex-col items-center px-2"
                @mouseenter="activeTimelineStep = step.title"
                @focus="activeTimelineStep = step.title"
                @click="activeTimelineStep = step.title"
              >
                <span
                  :class="[
                    'flex size-7 items-center justify-center rounded-full border text-xs font-semibold leading-none transition-colors',
                    activeTimelineStep === step.title
                      ? 'border-primary bg-primary text-white'
                      : 'border-primary bg-background text-primary',
                  ]"
                >
                  {{ step.number }}
                </span>
                <span
                  :class="[
                    'mt-6 flex size-[4.5rem] items-center justify-center rounded-full border bg-background transition-colors',
                    activeTimelineStep === step.title
                      ? 'border-primary text-primary'
                      : 'border-primary/55 text-primary group-hover:border-primary/75',
                  ]"
                >
                  <component
                    :is="serviceItemIcons[step.icon as keyof typeof serviceItemIcons]"
                    :size="28"
                    stroke-width="1.75"
                  />
                </span>
                <h3 class="mt-4 max-w-[12rem] text-[15px] leading-tight font-semibold text-text">
                  {{ step.title }}
                </h3>
              </button>
            </li>
          </ol>

          <ol class="mt-8 space-y-3 md:hidden">
            <li
              v-for="step in page.orderSteps"
              :key="`${step.number}-${step.title}-mobile`"
              class="overflow-hidden rounded-xl border transition-colors"
              :class="activeTimelineStep === step.title ? 'border-primary/35 bg-white shadow-sm' : 'border-border bg-surface'"
            >
              <button
                type="button"
                class="flex w-full items-center gap-4 px-4 py-4 text-left"
                @click="activeTimelineStep = step.title"
              >
                <span
                  :class="[
                    'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold leading-none transition-colors',
                    activeTimelineStep === step.title
                      ? 'bg-primary text-white'
                      : 'border border-primary/25 bg-primary/5 text-primary',
                  ]"
                >
                  {{ step.number }}
                </span>
                <span class="min-w-0 flex-1 text-base leading-snug font-semibold text-text">
                  {{ step.title }}
                </span>
              </button>
              <div
                v-if="activeTimelineStep === step.title"
                class="border-t border-primary/10 px-4 pt-4 pb-4"
              >
                <div class="flex items-start gap-4">
                  <span
                    class="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary"
                    aria-hidden="true"
                  >
                    <component
                      :is="serviceItemIcons[step.icon as keyof typeof serviceItemIcons]"
                      :size="22"
                      stroke-width="1.75"
                    />
                  </span>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                      Шаг {{ step.number }}
                    </p>
                    <p class="mt-2 text-[1.4rem] leading-[1.12] font-semibold text-foreground">
                      {{ step.title }}
                    </p>
                    <p class="mt-4 text-text-muted">
                      {{ step.description }}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ol>

          <BaseCard
            v-if="page.orderSteps.find(step => step.title === activeTimelineStep) ?? page.orderSteps[0]"
            class="mt-10 hidden overflow-hidden !p-0 md:block"
          >
            <div
              v-for="step in [page.orderSteps.find(currentStep => currentStep.title === activeTimelineStep) ?? page.orderSteps[0]]"
              :key="`${step?.number}-${step?.title}-panel`"
              class="flex flex-col p-6 sm:p-8 lg:p-10"
            >
              <div class="flex items-center gap-4">
                <span
                  class="flex size-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-3xl leading-none"
                  aria-hidden="true"
                >
                  <component
                    :is="serviceItemIcons[step.icon as keyof typeof serviceItemIcons]"
                    :size="30"
                    class="text-primary"
                    stroke-width="1.75"
                  />
                </span>
                <div>
                  <p class="text-sm font-semibold tracking-[0.18em] text-primary">
                    Шаг {{ step.number }}
                  </p>
                  <h3 class="mt-2 text-[1.9rem] leading-[1.08]">
                    {{ step.title }}
                  </h3>
                </div>
              </div>
              <p class="mt-8 max-w-3xl text-text-muted">
                {{ step.description }}
              </p>
            </div>
          </BaseCard>
        </template>

        <template v-else>
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
        </template>

        <div
          v-if="page.id === 'ritualny-transport' && page.geographyTitle && page.geographyDirections?.length"
          class="mt-12"
        >
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-start">
            <div>
              <SectionHeading
                :title="page.geographyTitle"
                :description="page.geographyDescription"
              />

              <div class="mt-6 flex flex-wrap gap-3">
                <span
                  v-for="direction in page.geographyDirections"
                  :key="direction"
                  class="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                >
                  {{ direction }}
                </span>
              </div>
            </div>

            <div class="grid gap-4">
              <BaseCard
                v-for="location in [
                  {
                    title: 'Офис на Аэродромном',
                    address: 'Пер. Аэродромный, 48',
                    mapQuery: 'пер. Аэродромный, 48, Мариуполь',
                  },
                  {
                    title: 'Офис на Кальмиусской',
                    address: 'Ул. Кальмиусская, 143',
                    mapQuery: 'ул. Кальмиусская, 143, Мариуполь',
                  },
                ]"
                :key="location.title"
                class="overflow-hidden border-primary/15 bg-surface-alt"
              >
                <div class="rounded-2xl border border-primary/10 bg-white/90 p-5">
                  <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                    {{ location.title }}
                  </p>
                  <div class="mt-4 flex items-start gap-3">
                    <MapPin :size="18" class="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    <p class="font-semibold text-foreground">
                      {{ location.address }}
                    </p>
                  </div>

                  <BaseButton
                    :href="`${routeUrl}${encodeURIComponent(location.mapQuery)}`"
                    variant="secondary"
                    external
                    class="mt-5 w-full"
                  >
                    <span class="inline-flex items-center gap-2">
                      <Navigation :size="18" aria-hidden="true" />
                      <span>Построить маршрут</span>
                    </span>
                  </BaseButton>
                </div>
              </BaseCard>
            </div>
          </div>
        </div>
      </BaseContainer>
    </section>

    <MonumentsPhotoSlider v-if="page.id === 'pamyatniki'" />

    <section
      v-if="page.id === 'ritualny-transport' && page.reasonsTitle && page.reasonsItems?.length"
      class="section"
    >
      <BaseContainer>
        <SectionHeading :title="page.reasonsTitle" />

        <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <BaseCard
            v-for="item in page.reasonsItems"
            :key="item.title"
            class="h-full"
          >
            <div class="flex items-start gap-4">
              <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <component
                  :is="serviceItemIcons[item.icon as keyof typeof serviceItemIcons]"
                  :size="22"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p class="text-lg font-semibold text-foreground">
                  {{ item.title }}
                </p>
                <p class="mt-3 text-text-muted">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section
      v-if="!isRitualProductsPage"
      class="section bg-surface-alt"
    >
      <BaseContainer>
        <SectionHeading
          :title="page.faqTitle ?? 'Частые вопросы'"
          :description="page.faqDescription ?? 'Ответы будут уточняться по мере наполнения сайта.'"
        />
        <FaqAccordion :items="page.faq" class="mt-10" />
      </BaseContainer>
    </section>

    <section
      v-if="page.id === 'ritualny-transport'"
      class="section"
    >
      <BaseContainer>
        <BaseCard class="overflow-hidden border-primary/20 bg-primary/5">
          <div class="max-w-4xl">
            <h2 class="max-w-3xl text-[2rem] leading-[1.12] sm:text-[2.35rem]">
              Нужно заказать ритуальный транспорт?
            </h2>
            <p class="mt-5 max-w-3xl text-[1.0625rem] leading-8 text-text-muted">
              Позвоните в Мариупольский ритуальный дом. Консультант уточнит маршрут, подберет транспорт и рассчитает стоимость перевозки.
            </p>

            <a
              :href="createPhoneLink(page.phone ?? contacts.phone)"
              class="mt-6 inline-flex min-h-12 items-center font-serif text-[2.2rem] leading-tight font-semibold text-primary no-underline sm:text-[2.6rem]"
            >
              +7 949 430-30-30
            </a>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <BaseButton
                :href="createPhoneLink(page.phone ?? contacts.phone)"
                variant="primary"
                external
              >
                Позвонить 24/7
              </BaseButton>
            </div>

            <p class="mt-5 text-sm font-medium text-text-muted">
              Консультанты на связи круглосуточно.
            </p>
          </div>
        </BaseCard>

      </BaseContainer>
    </section>

    <section v-if="!isRitualProductsPage && page.id !== 'pamyatniki' && page.id !== 'organizaciya-pohoron' && page.id !== 'ritualny-transport'" class="section">
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
      v-if="page.id !== 'organizaciya-pohoron' && page.id !== 'ritualny-transport' && !isRitualProductsPage"
      :phone="page.phone"
      :show-telegram="page.id !== 'pamyatniki'"
    />
  </div>
</template>
