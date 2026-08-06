<script setup lang="ts">
import {
  BadgeRussianRuble,
  Clock3,
  FileText,
  HeartHandshake,
  PackageCheck,
  Truck,
} from 'lucide-vue-next'

const items = [
  {
    title: 'Круглосуточная помощь',
    description:
      'Принимаем обращения 24 часа в сутки, без выходных и праздников. Специалист объяснит порядок действий и поможет с организацией похорон.',
    icon: Clock3,
  },
  {
    title: 'Прозрачная стоимость',
    description:
      'До начала организации подробно обсуждаем услуги и заранее согласовываем стоимость, чтобы вы понимали состав выбранного комплекса.',
    icon: BadgeRussianRuble,
  },
  {
    title: 'Полный комплекс услуг',
    description:
      'Можно заказать организацию похорон, ритуальный транспорт, принадлежности, памятники и другие ритуальные услуги в одном месте.',
    icon: PackageCheck,
  },
  {
    title: 'Собственный транспорт',
    description:
      'Используем специализированный ритуальный транспорт и заранее согласовываем детали церемонии, чтобы семья могла сосредоточиться на прощании.',
    icon: Truck,
  },
  {
    title: 'Помощь с документами',
    description:
      'Консультируем по оформлению необходимых документов и объясняем, какие шаги могут потребоваться именно в вашей ситуации.',
    icon: FileText,
  },
  {
    title: 'Индивидуальный подход',
    description:
      'Внимательно выслушиваем пожелания семьи, предлагаем подходящий вариант организации похорон и учитываем бюджет и необходимые услуги.',
    icon: HeartHandshake,
  },
]
</script>

<template>
  <section class="section bg-[var(--color-background-soft)]">
    <BaseContainer>
      <SectionHeading
        title="Почему семьи в Мариуполе выбирают Мариупольский ритуальный дом"
        description="Более 10 лет мы помогаем семьям в сложный момент жизни. Наша задача — взять на себя организационные вопросы, предоставить понятную консультацию и обеспечить достойное проведение церемонии с уважением к памяти близкого человека."
        align="center"
      />
      <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <BaseCard
          v-for="item in items"
          :key="item.title"
          class="group relative flex min-h-[228px] flex-col overflow-hidden border border-border bg-surface !p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg md:min-h-[236px]"
        >
          <div
            class="absolute inset-x-0 top-0 h-1 bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
          <div
            class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <component :is="item.icon" :size="28" aria-hidden="true" />
          </div>
          <h3 class="mt-6 text-[1.35rem] leading-[1.2]">{{ item.title }}</h3>
          <p class="mt-4 text-sm leading-6 text-text-muted">
            {{ item.description }}
          </p>
        </BaseCard>
      </div>

      <div
        class="mt-8 rounded-xl border border-border bg-surface px-6 py-8 text-center shadow-sm md:px-8"
      >
        <h3 class="text-[1.6rem] leading-[1.2]">
          Нужна помощь прямо сейчас?
        </h3>
        <p class="mx-auto mt-3 max-w-3xl text-sm leading-6 text-text-muted md:text-base">
          Позвоните нам — мы спокойно объясним порядок действий, ответим на вопросы и поможем организовать похороны.
        </p>
        <CallButton label="Позвонить сейчас" class="mt-6" />
      </div>
    </BaseContainer>
  </section>
</template>
