<script setup lang="ts">
import { contacts, getPhoneByPath } from '@/config/contacts'
import { createPhoneLink } from '@/utils/contact-links'

const props = withDefaults(
  defineProps<{
    label?: string
    phone?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    fullWidth?: boolean
  }>(),
  {
    label: 'Позвонить',
    phone: undefined,
    variant: 'primary',
    fullWidth: false,
  },
)

const route = useRoute()
const resolvedPhone = computed(() => props.phone ?? getPhoneByPath(route.path))
</script>

<template>
  <BaseButton
    :href="createPhoneLink(resolvedPhone)"
    :variant="props.variant"
    :full-width="props.fullWidth"
    external
  >
    {{ props.label }}
  </BaseButton>
</template>
