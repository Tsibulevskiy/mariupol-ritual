<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { createTelegramLink, createWhatsappLink } from '@/utils/contact-links'

const props = withDefaults(
  defineProps<{
    messenger: 'telegram' | 'whatsapp'
    label?: string
    value?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    fullWidth?: boolean
  }>(),
  {
    label: undefined,
    value: undefined,
    variant: 'secondary',
    fullWidth: false,
  },
)

const link = computed(() =>
  props.messenger === 'telegram'
    ? createTelegramLink(props.value ?? contacts.telegram)
    : createWhatsappLink(props.value ?? contacts.whatsapp),
)

const text = computed(
  () =>
    props.label ??
    (props.messenger === 'telegram'
      ? 'Написать в Telegram'
      : 'Написать в WhatsApp'),
)
</script>

<template>
  <BaseButton :href="link" :variant="variant" :full-width="fullWidth" external>
    {{ text }}
  </BaseButton>
</template>
