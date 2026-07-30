<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { MonumentCategory, MonumentProduct } from '@/types/content'

const props = defineProps<{
  items: MonumentProduct[]
}>()

const pageSize = 12
const filter = ref<'all' | MonumentCategory>('all')
const visibleCount = ref(pageSize)

const filterOptions: Array<{ value: 'all' | MonumentCategory, label: string }> = [
  { value: 'all', label: 'Все' },
  { value: 'vertical', label: 'Вертикальные' },
  { value: 'horizontal', label: 'Горизонтальные' },
  { value: 'complex', label: 'Комплексные' },
]

const openProduct = (slug: string) => navigateTo(`/pamyatniki-mariupol/${slug}`)

const orderedItems = computed(() =>
  [...props.items].sort((left, right) => Number(Boolean(right.topSeller)) - Number(Boolean(left.topSeller))),
)

const filteredItems = computed(() => {
  if (filter.value === 'all') {
    return orderedItems.value
  }

  return orderedItems.value.filter((item) => item.category === filter.value)
})

const visibleItems = computed(() => filteredItems.value.slice(0, visibleCount.value))

const canLoadMore = computed(() => filteredItems.value.length > visibleCount.value)

const loadMore = () => {
  visibleCount.value += pageSize
}

watch(filter, () => {
  visibleCount.value = pageSize
})
</script>

<template>
  <section id="catalog" class="section scroll-mt-24 bg-surface-alt">
    <BaseContainer>
      <SectionHeading
        title="Каталог памятников"
      />

      <div class="mt-8 flex flex-wrap gap-3">
        <button
          v-for="option in filterOptions"
          :key="option.value"
          type="button"
          class="rounded-full border px-4 py-2 text-sm transition-colors"
          :class="filter === option.value
            ? 'border-primary bg-primary text-white'
            : 'border-border bg-white text-primary hover:bg-white/80'"
          @click="filter = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-4">
        <BaseCard
          v-for="item in visibleItems"
          :key="item.slug"
          class="h-full cursor-pointer overflow-hidden p-0 transition-transform duration-200 hover:-translate-y-1"
          @click="openProduct(item.slug)"
        >
          <div>
            <div
              class="relative bg-white"
              :class="item.category === 'horizontal' ? 'aspect-[5/4]' : 'aspect-[4/5]'"
            >
              <span
                v-if="item.topSeller"
                class="absolute right-3 bottom-3 z-10 inline-flex rounded-full bg-[#C8A24D] px-3 py-1 text-xs font-semibold text-slate-950 shadow-md shadow-black/20 ring-1 ring-white/40"
              >
                Топ продаж
              </span>
              <NuxtImg
                :src="item.image"
                :alt="item.name"
                class="h-full w-full object-contain"
                loading="lazy"
                sizes="(max-width: 1023px) 100vw, 25vw"
              />
            </div>

            <div class="p-3">
              <h3 class="text-xl font-semibold text-foreground">
                {{ item.name }}
              </h3>
              <p class="mt-3 text-sm text-text-muted">
                Материал: {{ item.material }}
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <div v-if="canLoadMore" class="mt-8 flex justify-center">
        <BaseButton
          variant="secondary"
          @click="loadMore"
        >
          Загрузить ещё
        </BaseButton>
      </div>
    </BaseContainer>
  </section>
</template>
