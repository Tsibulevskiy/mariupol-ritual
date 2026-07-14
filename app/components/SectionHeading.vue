<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    eyebrow?: string
    align?: 'left' | 'center'
  }>(),
  {
    description: undefined,
    eyebrow: undefined,
    align: 'left',
  },
)
</script>

<template>
  <div :class="['max-w-3xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p
      v-if="eyebrow"
      class="mb-3 text-sm font-semibold tracking-wider text-primary uppercase"
    >
      {{ eyebrow }}
    </p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="mt-4 text-text-muted">
      {{ description }}
    </p>
  </div>
</template>
