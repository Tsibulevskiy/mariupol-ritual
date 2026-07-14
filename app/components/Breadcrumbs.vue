<script setup lang="ts">
defineOptions({ name: 'AppBreadcrumbs' })

interface BreadcrumbItem {
  label: string
  href?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav aria-label="Хлебные крошки">
    <ol class="flex flex-wrap items-center gap-2 text-sm text-text-muted">
      <li
        v-for="(item, index) in items"
        :key="`${item.label}-${index}`"
        class="flex items-center gap-2"
      >
        <NuxtLink
          v-if="item.href"
          :to="item.href"
          class="inline-flex min-h-11 items-center hover:text-primary"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          aria-current="page"
          class="inline-flex min-h-11 items-center"
        >
          {{ item.label }}
        </span>
        <span
          v-if="index < items.length - 1"
          aria-hidden="true"
          class="inline-flex min-h-11 items-center"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>
