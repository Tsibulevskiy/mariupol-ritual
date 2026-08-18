<script setup lang="ts">
import { Bed, Box, Cross, Flower2, Layers, Package, Square } from 'lucide-vue-next'
import type { ProductSectionItem } from '@/types/content'

defineProps<{
  item: ProductSectionItem
}>()

const placeholderIcons = {
  bed: Bed,
  box: Box,
  cross: Cross,
  flower2: Flower2,
  layers: Layers,
  package: Package,
  square: Square,
} as const
</script>

<template>
  <article>
    <BaseCard class="flex h-full flex-col overflow-hidden !p-0">
      <div class="aspect-[16/10] border-b border-border bg-surface-alt">
        <img
          v-if="item.imageSrc"
          :src="item.imageSrc"
          :alt="item.imageAlt ?? ''"
          :class="item.imageFit === 'contain'
            ? 'h-full w-full bg-surface-alt p-4 object-contain'
            : 'h-full w-full object-cover'"
          loading="lazy"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center"
          aria-hidden="true"
        >
          <div class="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-primary/15 bg-white text-primary shadow-sm">
            <component
              :is="placeholderIcons[item.placeholderIcon ?? 'box']"
              :size="32"
              stroke-width="1.8"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-1 flex-col p-5 sm:p-6">
        <h3 class="text-xl leading-tight font-semibold text-foreground">
          {{ item.title }}
        </h3>

        <p class="mt-4 flex-1 text-text-muted">
          {{ item.description }}
        </p>

      </div>
    </BaseCard>
  </article>
</template>
