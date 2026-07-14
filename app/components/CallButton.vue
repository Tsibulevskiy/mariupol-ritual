<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { createPhoneLink } from '@/utils/contact-links'

withDefaults(
  defineProps<{
    label?: string
    phone?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    fullWidth?: boolean
  }>(),
  {
    label: 'Позвонить',
    phone: contacts.phone,
    variant: 'primary',
    fullWidth: false,
  },
)
</script>

<template>
  <BaseButton
    :href="createPhoneLink(phone)"
    :variant="variant"
    :full-width="fullWidth"
    external
  >
    {{ label }}
  </BaseButton>
</template>
