<script setup lang="ts">
import { monumentProductsBySlug } from '@/data/monuments'

const productPhone = '+ 7 949 090 40 40'
const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const product = computed(() => monumentProductsBySlug[slug.value])

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Страница не найдена',
  })
}

usePageSeo({
  title: `${product.value.name} в Мариуполе`,
  description: `${product.value.name}: размер ${product.value.size}, стоимость ${product.value.price}.`,
  path: `/pamyatniki-mariupol/${product.value.slug}`,
})
</script>

<template>
  <div>
    <PageHero
      :title="product.name"
      :description="product.summary"
      eyebrow="Каталог памятников"
      :phone="productPhone"
      primary-action-label="Получить консультацию"
      secondary-action-label="Вернуться в каталог"
      secondary-action-href="/pamyatniki-mariupol#catalog"
      show-phone
    />

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
            <NuxtImg
              :src="product.image"
              :alt="product.name"
              width="960"
              height="960"
              class="aspect-square w-full object-cover"
              loading="eager"
            />
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
                  Размер
                </p>
                <p class="mt-2 text-lg text-foreground">
                  {{ product.size }}
                </p>
              </div>

              <div>
                <p class="text-sm font-semibold tracking-wider text-primary uppercase">
                  Стоимость
                </p>
                <p class="mt-2 text-3xl font-semibold text-primary">
                  {{ product.price }}
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
