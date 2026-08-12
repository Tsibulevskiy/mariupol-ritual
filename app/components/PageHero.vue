<script setup lang="ts">
import { Box, Clock3, Gift, HandHelping, Truck } from 'lucide-vue-next'
import { contacts } from '@/config/contacts'
import type { HeroBenefit, HeroPromo } from '@/types/content'
import { createPhoneLink } from '@/utils/contact-links'

const benefitIcons = {
  clock: Clock3,
  truck: Truck,
  box: Box,
  handHelping: HandHelping,
} as const

withDefaults(
  defineProps<{
    title: string
    description: string
    phone?: string
    primaryActionLabel?: string
    secondaryActionLabel?: string
    secondaryActionHref?: string
    benefits?: HeroBenefit[]
    promo?: HeroPromo
    eyebrow?: string
    showActions?: boolean
    showPhone?: boolean
    imageSrc?: string
    imageAlt?: string
  }>(),
  {
    phone: contacts.phone,
    primaryActionLabel: 'Позвонить сейчас',
    secondaryActionLabel: 'Узнать стоимость',
    secondaryActionHref: '#contact-form',
    benefits: () => [],
    promo: undefined,
    eyebrow: undefined,
    showActions: true,
    showPhone: false,
    imageSrc: undefined,
    imageAlt: '',
  },
)
</script>

<template>
  <section
    :class="[
      'section',
      imageSrc ? 'bg-background' : 'bg-surface-alt',
    ]"
  >
    <BaseContainer>
      <div
        :class="[
          'grid gap-10',
          promo ? 'lg:items-start' : 'items-center',
          promo
            ? 'lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]'
            : '',
          imageSrc ? 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]' : '',
        ]"
      >
        <div class="max-w-4xl">
          <div
            v-if="promo"
            class="hero-offer mb-8 w-full max-w-[560px] rounded-[18px] border px-5 py-5 lg:hidden"
          >
            <p class="flex items-center gap-2 text-sm font-semibold text-white">
              <Gift :size="16" aria-hidden="true" class="text-[var(--color-rating)]" />
              <span>Специальное предложение</span>
            </p>
            <p class="mt-5 text-[22px] leading-[1.15] font-bold text-white">
              {{ promo.title }}
            </p>
            <p class="mt-4 text-base font-medium text-white/82">
              {{ promo.note }}
            </p>
          </div>
          <p
            v-if="eyebrow"
            class="mb-4 text-sm font-semibold tracking-wider text-primary uppercase"
          >
            {{ eyebrow }}
          </p>
          <h1>{{ title }}</h1>
          <p class="mt-6 max-w-2xl text-lg text-text-muted sm:text-xl">
            {{ description }}
          </p>
          <div
            v-if="showPhone"
            class="mt-6 inline-flex w-full max-w-[360px] flex-col rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 shadow-md ring-1 ring-primary/10"
          >
            <span class="text-sm font-semibold tracking-wider text-primary uppercase">
              Телефон 24/7
            </span>
            <a
              :href="createPhoneLink(phone)"
              class="mt-2 inline-flex min-h-12 items-center font-serif text-3xl font-semibold text-primary sm:text-4xl"
              aria-label="Позвонить по телефону"
            >
              {{ phone }}
            </a>
          </div>
          <div v-if="showActions" class="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton :phone="phone" :label="primaryActionLabel" />
            <BaseButton
              v-if="secondaryActionLabel"
              :href="secondaryActionHref"
              variant="secondary"
            >
              {{ secondaryActionLabel }}
            </BaseButton>
          </div>
        </div>

        <div
          v-if="promo"
          class="hidden lg:flex lg:justify-end"
        >
          <div
            class="hero-offer w-full max-w-[380px] rounded-[18px] border px-6 py-5"
          >
            <p class="flex items-center gap-2 text-sm font-semibold text-white">
              <Gift :size="16" aria-hidden="true" class="text-[var(--color-rating)]" />
              <span>Специальное предложение</span>
            </p>
            <p class="mt-5 text-[22px] leading-[1.15] font-bold text-white">
              {{ promo.title }}
            </p>
            <p class="mt-4 text-base font-medium text-white/82">
              {{ promo.note }}
            </p>
          </div>
        </div>

        <div
          v-if="imageSrc"
          class="w-[70%] justify-self-end overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
        >
          <img
            :src="imageSrc"
            :alt="imageAlt"
            class="h-full w-full object-cover"
            width="1536"
            height="1024"
            loading="eager"
          />
        </div>
      </div>

      <div
        v-if="benefits.length"
        class="mt-10 rounded-2xl border border-border bg-surface-alt p-4 shadow-sm sm:p-5"
      >
        <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="benefit in benefits" :key="benefit.label">
            <div class="flex h-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
              <component
                :is="benefitIcons[benefit.icon as keyof typeof benefitIcons]"
                :size="20"
                class="shrink-0 text-primary"
                aria-hidden="true"
              />
              <span class="font-medium text-foreground">{{ benefit.label }}</span>
            </div>
          </li>
        </ul>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
.hero-offer {
  border-color: rgb(255 255 255 / 10%);
  background: rgb(16 34 51 / 88%);
  color: white;
  box-shadow: 0 16px 36px rgb(16 34 51 / 22%);
}
</style>
