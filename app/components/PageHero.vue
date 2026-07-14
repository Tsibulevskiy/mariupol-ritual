<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { createPhoneLink } from '@/utils/contact-links'

withDefaults(
  defineProps<{
    title: string
    description: string
    eyebrow?: string
    showActions?: boolean
    showPhone?: boolean
    imageSrc?: string
    imageAlt?: string
  }>(),
  {
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
            :href="createPhoneLink(contacts.phone)"
            class="mt-6 inline-flex min-h-12 items-center font-serif text-2xl font-semibold text-primary sm:text-3xl"
            aria-label="Позвонить по телефону"
          >
            {{ contacts.phone }}
          </a>
          <div v-if="showActions" class="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton label="Позвонить сейчас" />
            <BaseButton href="#contact-form" variant="secondary">
              Узнать стоимость
            </BaseButton>
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
