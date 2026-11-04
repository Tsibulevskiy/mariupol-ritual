<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { createWhatsappLink } from '@/utils/contact-links'

const props = withDefaults(
  defineProps<{
    messenger: 'telegram' | 'max' | 'whatsapp'
    label?: string
    value?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    fullWidth?: boolean
    iconOnly?: boolean
  }>(),
  {
    label: undefined,
    value: undefined,
    variant: 'secondary',
    fullWidth: false,
    iconOnly: false,
  },
)

const runtimeConfig = useRuntimeConfig()

const configuredLink = computed(() => {
  if (props.value) return props.value
  if (props.messenger === 'telegram') return runtimeConfig.public.contactTelegramUrl
  if (props.messenger === 'max') return runtimeConfig.public.contactMaxUrl
  return createWhatsappLink(contacts.whatsapp)
})

const link = computed(() => {
  const value = configuredLink.value
  if (!value) return undefined

  try {
    const url = new URL(value)
    const allowedHost = props.messenger === 'telegram' ? 't.me' : 'max.ru'
    if (props.messenger === 'whatsapp') return value
    return url.protocol === 'https:' && url.hostname === allowedHost ? value : undefined
  } catch {
    return undefined
  }
})

const text = computed(
  () =>
    props.label ??
      (props.messenger === 'telegram'
        ? 'Написать в Telegram'
        : props.messenger === 'max'
          ? 'Написать в MAX'
          : 'Написать в WhatsApp'),
)

const icon = computed(() =>
  props.messenger === 'telegram'
    ? '/icons/telegram.svg'
    : props.messenger === 'max'
      ? '/icons/max.svg'
      : undefined,
)
</script>

<template>
  <BaseButton
    v-if="link"
    :href="link"
    :variant="variant"
    :full-width="fullWidth"
    :aria-label="iconOnly ? text : undefined"
    :class="
      iconOnly
        ? '!size-12 !min-h-0 !rounded-full !border-0 !bg-transparent !p-0 !shadow-none hover:!bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:!size-14'
        : ''
    "
    external
  >
    <span class="inline-flex items-center gap-2">
      <img
        v-if="icon"
        :src="icon"
        :alt="''"
        class="size-[31.2px] shrink-0 object-contain lg:size-[37.44px]"
        aria-hidden="true"
      />
      <span :class="iconOnly ? 'sr-only' : ''">{{ text }}</span>
    </span>
  </BaseButton>
</template>
