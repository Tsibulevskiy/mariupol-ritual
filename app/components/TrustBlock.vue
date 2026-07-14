<script setup lang="ts">
import { Clock3, FileText, HeartHandshake, Truck } from 'lucide-vue-next'

const items = [
  {
    title: 'Круглосуточная поддержка',
    description:
      'Отвечаем на обращения в любое время суток и готовы помочь в экстренной ситуации.',
    icon: Clock3,
  },
  {
    title: 'Полное сопровождение',
    description:
      'Организуем необходимые этапы похорон и сопровождаем семью на протяжении всего процесса.',
    icon: HeartHandshake,
  },
  {
    title: 'Помощь с документами',
    description:
      'Подскажем, какие документы нужны, и поможем разобраться с порядком оформления.',
    icon: FileText,
  },
  {
    title: 'Оперативный выезд',
    description:
      'При необходимости оперативно выезжаем по Мариуполю и ближайшим районам.',
    icon: Truck,
  },
]
</script>

<template>
  <section class="section bg-[var(--color-background-soft)]">
    <BaseContainer>
      <SectionHeading
        title="Рядом с вами на каждом этапе"
        description="Берем на себя организационные вопросы, чтобы вы могли сосредоточиться на близких."
        align="center"
      />
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BaseCard
          v-for="item in items"
          :key="item.title"
          class="flex min-h-[228px] flex-col text-center !p-8 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
        >
          <component
            :is="item.icon"
            :size="32"
            class="mx-auto text-primary"
            aria-hidden="true"
          />
          <h3 class="mt-5 text-[1.5rem] leading-[1.15]">{{ item.title }}</h3>
          <p class="mt-4 text-sm leading-7 text-text-muted">
            {{ item.description }}
          </p>
          <div class="mt-5 h-px w-full bg-border" />
        </BaseCard>
      </div>
      <div
        class="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-surface px-6 py-4 text-sm text-text-muted md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-6"
      >
        <span>✓ Консультация по телефону</span>
        <span>✓ Индивидуальный подход</span>
        <span>✓ Понятный порядок действий</span>
      </div>
    </BaseContainer>
  </section>
</template>
