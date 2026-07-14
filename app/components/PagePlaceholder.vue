<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  href?: string
}

const props = withDefaults(
  defineProps<{
    title: string
    description: string
    path: string
    breadcrumbs?: BreadcrumbItem[]
    relatedHref?: string
    relatedLabel?: string
    showCall?: boolean
  }>(),
  {
    breadcrumbs: () => [],
    relatedHref: '/',
    relatedLabel: 'Вернуться на главную',
    showCall: true,
  },
)

usePageSeo({
  title: props.title,
  description: props.description,
  path: props.path,
})
</script>

<template>
  <PageHero :title="title" :description="description" :show-actions="false" />
  <section class="section">
    <BaseContainer>
      <Breadcrumbs v-if="breadcrumbs.length" :items="breadcrumbs" />
      <BaseCard class="mt-8 max-w-3xl">
        <p class="text-text-muted">
          Содержимое страницы находится в подготовке.
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <CallButton v-if="showCall" label="Позвонить" />
          <BaseButton :href="relatedHref" variant="secondary">
            {{ relatedLabel }}
          </BaseButton>
        </div>
      </BaseCard>
    </BaseContainer>
  </section>
</template>
