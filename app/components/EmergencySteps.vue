<script setup lang="ts">
withDefaults(
  defineProps<{
    steps?: string[]
  }>(),
  {
    steps: () => [
      'Свяжитесь с экстренными службами при необходимости.',
      'Подготовьте доступные документы.',
      'Позвоните, чтобы уточнить дальнейшие действия.',
    ],
  },
)
</script>

<template>
  <section class="section bg-surface-alt">
    <BaseContainer>
      <SectionHeading
        eyebrow="Порядок действий"
        title="Что делать в первую очередь"
        description="Порядок зависит от обстоятельств. Уточните действия у соответствующих служб."
      />
      <ol class="mt-10 grid gap-6 md:grid-cols-3">
        <li v-for="(step, index) in steps" :key="step">
          <BaseCard class="h-full">
            <span class="text-sm font-semibold text-primary"
              >Шаг {{ index + 1 }}</span
            >
            <p class="mt-3">{{ step }}</p>
          </BaseCard>
        </li>
      </ol>
      <CallButton class="mt-8" label="Уточнить по телефону" />
    </BaseContainer>
  </section>
</template>
