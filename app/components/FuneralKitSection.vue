<script setup lang="ts">
import { ArrowRight, Bed, Box, Cross, Flower2, Layers, Package } from 'lucide-vue-next'
import type { FuneralKitBlock } from '@/types/content'

defineProps<{
  block: FuneralKitBlock
}>()

const itemIcons = {
  bed: Bed,
  box: Box,
  cross: Cross,
  flower2: Flower2,
  layers: Layers,
  package: Package,
} as const
</script>

<template>
  <section :id="block.id" class="scroll-mt-24">
    <BaseCard class="overflow-hidden border-primary/15 bg-surface-alt">
      <div class="max-w-4xl">
        <h2 class="max-w-3xl text-[2.2rem] leading-[1.12] sm:text-[2.5rem]">
          {{ block.title }}
        </h2>

        <div class="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-text-muted">
          <p
            v-for="paragraph in block.paragraphs"
            :key="paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <li
          v-for="(item, index) in block.items"
          :key="item.title"
          class="relative"
        >
          <div class="flex h-full flex-col rounded-2xl border border-border bg-white px-4 py-5 shadow-sm">
            <div class="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <component
                :is="itemIcons[item.icon]"
                :size="22"
                stroke-width="1.8"
                aria-hidden="true"
              />
            </div>
            <p class="mt-4 text-lg font-semibold text-foreground">
              {{ item.title }}
            </p>
            <p class="mt-2 text-sm leading-6 text-text-muted">
              {{ item.description }}
            </p>
          </div>

          <div
            v-if="index < block.items.length - 1"
            class="absolute top-1/2 -right-4 hidden -translate-y-1/2 xl:flex xl:size-8 xl:items-center xl:justify-center xl:rounded-full xl:bg-white xl:text-primary xl:shadow-sm"
            aria-hidden="true"
          >
            <ArrowRight :size="18" stroke-width="1.8" />
          </div>
        </li>
      </ul>

      <p class="mt-6 text-sm font-medium text-text-muted">
        {{ block.note }}
      </p>

      <div class="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CallButton
            :label="block.ctaLabel"
            variant="primary"
          />
          <BaseButton
            v-if="block.ctaSecondaryLabel && block.ctaSecondaryHref"
            :href="block.ctaSecondaryHref"
            variant="ghost"
          >
            {{ block.ctaSecondaryLabel }}
          </BaseButton>
        </div>

        <p class="max-w-2xl text-sm leading-6 text-text-muted lg:text-right">
          {{ block.ctaDescription }}
        </p>
      </div>
    </BaseCard>
  </section>
</template>
