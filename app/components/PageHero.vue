<script setup lang="ts">
import { Gift } from 'lucide-vue-next'
import { contacts } from '@/config/contacts'
import type { HeroBenefit, HeroPromo } from '@/types/content'
import { createPhoneLink } from '@/utils/contact-links'

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
          <a
            v-if="showPhone"
            :href="createPhoneLink(phone)"
            class="mt-6 inline-flex min-h-12 items-center font-serif text-2xl font-semibold text-primary sm:text-3xl"
            aria-label="Позвонить по телефону"
          >
            {{ phone }}
          </a>
          <div v-if="showActions" class="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton :phone="phone" :label="primaryActionLabel" />
            <BaseButton :href="secondaryActionHref" variant="secondary">
              {{ secondaryActionLabel }}
            </BaseButton>
          </div>
          <ul
            v-if="benefits.length"
            class="mt-8 grid gap-3 sm:grid-cols-2"
          >
            <li v-for="benefit in benefits" :key="benefit.label">
              <div class="flex h-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
                <span class="text-2xl" aria-hidden="true">{{ benefit.icon }}</span>
                <span class="font-medium text-foreground">{{ benefit.label }}</span>
              </div>
            </li>
          </ul>
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

        <div v-if="imageSrc" class="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
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
