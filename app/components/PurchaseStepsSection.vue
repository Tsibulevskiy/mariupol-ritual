<script setup lang="ts">
import { ArrowRight, BadgeCheck, Package, Phone } from 'lucide-vue-next'
import type { PurchaseStepsBlock } from '@/types/content'

defineProps<{
  block: PurchaseStepsBlock
}>()

const stepIcons = {
  badgeCheck: BadgeCheck,
  package: Package,
  phone: Phone,
} as const
</script>

<template>
  <section :id="block.id" class="scroll-mt-24">
    <BaseCard class="overflow-hidden border-primary/15 bg-surface-alt">
      <div class="max-w-4xl">
        <h2 class="max-w-3xl text-[2.2rem] leading-[1.12] sm:text-[2.5rem]">
          {{ block.title }}
        </h2>
        <p class="mt-6 max-w-3xl text-lg leading-8 text-text-muted">
          {{ block.description }}
        </p>
      </div>

      <ol class="mt-8 grid gap-6 lg:grid-cols-3">
        <li
          v-for="(item, index) in block.items"
          :key="item.number"
          class="relative"
        >
          <BaseCard class="h-full">
            <div class="flex items-start gap-4">
              <div class="flex min-w-[3rem] flex-col items-center gap-3">
                <span class="inline-flex min-h-8 min-w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {{ item.number }}
                </span>
                <span class="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <component
                    :is="stepIcons[item.icon]"
                    :size="20"
                    stroke-width="1.8"
                    aria-hidden="true"
                  />
                </span>
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="text-lg font-semibold text-foreground">
                  {{ item.title }}
                </h3>
                <p class="mt-3 text-text-muted">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </BaseCard>

          <div
            v-if="index < block.items.length - 1"
            class="absolute top-1/2 -right-3 hidden -translate-y-1/2 lg:flex lg:size-7 lg:items-center lg:justify-center lg:rounded-full lg:bg-white lg:text-primary lg:shadow-sm"
            aria-hidden="true"
          >
            <ArrowRight :size="16" stroke-width="1.8" />
          </div>
        </li>
      </ol>

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

        <p
          v-if="block.ctaDescription"
          class="max-w-2xl text-sm leading-6 text-text-muted lg:text-right"
        >
          {{ block.ctaDescription }}
        </p>
      </div>
    </BaseCard>
  </section>
</template>
