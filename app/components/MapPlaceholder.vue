<script setup lang="ts">
defineProps<{
  routeUrl?: string
}>()
</script>

<template>
  <div
    class="flex min-h-80 flex-col items-center justify-center rounded-xl border border-border bg-surface-alt p-8 text-center"
  >
    <p class="font-serif text-2xl font-semibold">Карта</p>
    <p class="mt-3 text-text-muted">Здесь будет размещена карта проезда.</p>
    <BaseButton
      v-if="routeUrl"
      :href="routeUrl"
      data-analytics="route_click"
      external
      variant="secondary"
      class="mt-6"
    >
      Открыть маршрут
    </BaseButton>
  </div>
</template>
