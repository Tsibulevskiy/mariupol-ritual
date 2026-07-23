<script setup lang="ts">
import type { MonumentProduct } from '@/types/content'

defineProps<{
  items: MonumentProduct[]
}>()
</script>

<template>
  <section id="catalog" class="section scroll-mt-24 bg-surface-alt">
    <BaseContainer>
      <SectionHeading
        title="Каталог памятников"
        description="Демо-карточки каталога. Реальные фотографии и позиции можно заменить без изменения структуры блока."
      />

      <div class="mt-10 grid gap-6 lg:grid-cols-4">
        <NuxtLink
          v-for="item in items"
          :key="item.slug"
          :to="`/pamyatniki-mariupol/${item.slug}`"
          class="block h-full"
        >
          <BaseCard class="h-full overflow-hidden p-0 transition-transform duration-200 hover:-translate-y-1">
            <NuxtImg
              :src="item.image"
              :alt="item.name"
              width="640"
              height="640"
              class="aspect-square w-full object-cover"
              loading="lazy"
            />

            <div class="p-6">
              <h3 class="text-xl font-semibold text-foreground">
                {{ item.name }}
              </h3>
              <p class="mt-3 text-sm text-text-muted">
                Размер: {{ item.size }}
              </p>
              <p class="mt-4 text-2xl font-semibold text-primary">
                {{ item.price }}
              </p>
            </div>
          </BaseCard>
        </NuxtLink>
      </div>
    </BaseContainer>
  </section>
</template>
