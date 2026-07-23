<script setup lang="ts">
import { contacts } from '@/config/contacts'
import type { HeroBenefit } from '@/types/content'
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
          'grid items-center gap-10',
          imageSrc ? 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]' : '',
        ]"
      >
        <div class="max-w-4xl">
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
