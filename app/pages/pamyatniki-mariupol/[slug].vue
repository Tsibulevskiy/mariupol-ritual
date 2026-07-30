<script setup lang="ts">
import { monumentProductsBySlug } from '@/data/monuments'

const productPhone = '+ 7 949 090 40 40'
const includedInPrice = [
  'Изготовление макета для стелы и надгробной плиты',
  'Нанесение изображения на гранит',
  'Стабилизационные балки',
  'Установка памятника',
]
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const product = computed(() => monumentProductsBySlug[slug.value])
const selectedSizeIndex = ref(0)
const selectedSize = computed(() => product.value?.sizes[selectedSizeIndex.value] ?? null)

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Страница не найдена',
  })
}

usePageSeo({
  title: `${product.value.name} в Мариуполе`,
  description: `${product.value.name}: размеры от ${product.value.sizes[0].label}, стоимость ${product.value.sizes[0].price}.`,
  path: `/pamyatniki-mariupol/${product.value.slug}`,
})
</script>

<template>
  <div>
    <section class="section">
      <BaseContainer>
        <Breadcrumbs
          :items="[
            { label: 'Главная', href: '/' },
            { label: 'Памятники', href: '/pamyatniki-mariupol' },
            { label: product.name },
          ]"
        />

        <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <BaseCard class="overflow-hidden p-0">
            <div class="relative aspect-[4/5] bg-white p-4">
              <img
                :src="product.image"
                :alt="product.name"
                class="h-full w-full object-contain"
                loading="eager"
              >
            </div>
            <div class="border-t border-border px-5 py-5">
              <p class="text-base font-semibold text-foreground">
                В стоимость входит:
              </p>
              <ul class="mt-3 space-y-2 text-sm text-text-muted">
                <li
                  v-for="item in includedInPrice"
                  :key="item"
                >
                  — {{ item }}
                </li>
              </ul>
            </div>
          </BaseCard>

          <BaseCard>
            <p class="text-sm font-semibold tracking-wider text-primary uppercase">
              Описание
            </p>
            <h2 class="mt-4 text-3xl font-semibold text-foreground">
              {{ product.name }}
            </h2>
            <p class="mt-4 text-text-muted">
              {{ product.summary }}
            </p>

            <div class="mt-8 space-y-4">
              <div>
                <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                  Материал
                </p>
                <p class="mt-2 text-lg text-foreground">
                  {{ product.material }}
                </p>
              </div>

              <div>
                <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                  Размер стелы
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <button
                    v-for="(size, index) in product.sizes"
                    :key="size.label"
                    type="button"
                    class="rounded-full border px-4 py-2 text-sm transition-colors"
                    :class="index === selectedSizeIndex
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-white text-primary hover:bg-surface-alt'"
                    @click="selectedSizeIndex = index"
                  >
                    {{ size.label }}
                  </button>
                </div>
              </div>

              <div>
                <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                  Комплектация
                </p>
                <div v-if="selectedSize" class="mt-2 space-y-2 text-sm text-text-muted">
                  <p>
                    Стела: {{ selectedSize.label }}
                  </p>
                  <p>
                    Тумба: {{ selectedSize.pedestal }}
                  </p>
                  <p>
                    Надгробная плита: {{ selectedSize.gravePlate }}
                  </p>
                </div>
              </div>

              <div>
                <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                  Стоимость
                </p>
                <p class="mt-2 text-3xl font-semibold text-primary">
                  {{ selectedSize?.price }}
                </p>
              </div>
            </div>

            <div class="mt-8 flex flex-col gap-3">
              <CallButton
                :phone="productPhone"
                label="Получить консультацию"
                full-width
              />
              <BaseButton href="/pamyatniki-mariupol#catalog" variant="secondary">
                Смотреть другие модели
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>
  </div>
</template>
