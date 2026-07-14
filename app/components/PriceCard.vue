<script setup lang="ts">
import type { Price } from '@/types/content'

defineProps<{
  price: Price
}>()
</script>

<template>
  <BaseCard class="h-full">
    <h3>{{ price.name }}</h3>
    <p class="mt-4 text-2xl font-semibold text-primary">{{ price.value }}</p>
    <p v-if="price.note" class="mt-3 text-text-muted">{{ price.note }}</p>
  </BaseCard>
</template>
