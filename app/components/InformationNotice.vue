<script setup lang="ts">
import { Info } from 'lucide-vue-next'

interface Notice {
  title: string
  text: string
  linkText?: string
  linkUrl?: string
}

defineProps<{
  notice: Notice
}>()
</script>

<template>
  <aside
    class="border-y border-border bg-surface-blue"
    aria-label="Важная информация"
  >
    <div class="mx-auto max-w-[1200px] px-4 py-3 sm:px-6 lg:px-8 lg:py-2">
      <div
        class="flex items-start gap-3 text-sm leading-5 text-text lg:min-h-8 lg:items-center"
      >
        <Info
          :size="18"
          class="mt-0.5 shrink-0 text-primary lg:mt-0"
          aria-hidden="true"
        />
        <div class="min-w-0 flex-1 lg:flex lg:items-center lg:gap-2">
          <p class="text-sm leading-5 font-semibold text-text-heading">
            {{ notice.title }}
          </p>
          <p class="text-sm leading-5 text-text">
            {{ notice.text }}
          </p>
        </div>
        <NuxtLink
          v-if="notice.linkText && notice.linkUrl && notice.linkUrl.startsWith('/')"
          :to="notice.linkUrl"
          class="shrink-0 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
        >
          {{ notice.linkText }}
        </NuxtLink>
        <a
          v-else-if="notice.linkText && notice.linkUrl"
          :href="notice.linkUrl"
          class="shrink-0 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
        >
          {{ notice.linkText }}
        </a>
      </div>
    </div>
  </aside>
</template>
