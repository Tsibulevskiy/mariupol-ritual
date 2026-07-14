<script setup lang="ts">
interface Props {
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  type?: 'button' | 'submit'
  disabled?: boolean
  fullWidth?: boolean
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  href: undefined,
  variant: 'primary',
  type: 'button',
  disabled: false,
  fullWidth: false,
  external: false,
})

const classes = computed(() => [
  'inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-base font-semibold no-underline transition-colors',
  props.fullWidth ? 'w-full' : '',
  props.variant === 'primary'
    ? 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active'
    : '',
  props.variant === 'secondary'
    ? 'border border-primary bg-transparent text-primary hover:bg-surface-alt'
    : '',
  props.variant === 'ghost'
    ? 'bg-transparent text-primary hover:bg-surface-alt'
    : '',
])
</script>

<template>
  <NuxtLink
    v-if="href && !external"
    :to="href"
    :class="classes"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
    @click="disabled && $event.preventDefault()"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
    @click="disabled && $event.preventDefault()"
  >
    <slot />
  </a>
  <button v-else :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
