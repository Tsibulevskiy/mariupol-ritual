<script setup lang="ts">
import { CircleHelp } from 'lucide-vue-next'
import type { Faq } from '@/types/content'

const props = withDefaults(
  defineProps<{
    defaultOpenIndex?: number
    items: Faq[]
  }>(),
  {
    defaultOpenIndex: 0,
  },
)

const openIndex = ref(props.defaultOpenIndex)

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<template>
  <div
    class="divide-y divide-border rounded-xl border border-border bg-surface"
  >
    <div
      v-for="(item, index) in items"
      :key="item.question"
      class="group p-5 transition-colors duration-200 hover:bg-[var(--color-primary-soft)] sm:p-6"
    >
      <button
        type="button"
        class="flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 rounded-lg text-left font-serif text-lg font-semibold"
        :aria-expanded="openIndex === index"
        @click="toggleItem(index)"
      >
        <span class="flex items-center gap-3">
          <CircleHelp :size="20" class="shrink-0 text-primary" aria-hidden="true" />
          <span>{{ item.question }}</span>
        </span>
        <span class="shrink-0 text-2xl leading-none text-primary">
          <span v-if="openIndex !== index">+</span>
          <span v-else>—</span>
        </span>
      </button>
      <div
        class="grid transition-all duration-200 ease-out"
        :class="openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      >
        <div class="overflow-hidden">
          <p class="mt-4 pl-8 text-text-muted">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
