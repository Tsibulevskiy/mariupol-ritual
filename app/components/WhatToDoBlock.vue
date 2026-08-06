<script setup lang="ts">
import {
  Building2,
  ChevronDown,
  Check,
  House,
  MoonStar,
  Phone,
} from 'lucide-vue-next'
import { contacts } from '@/config/contacts'
import { createPhoneLink } from '@/utils/contact-links'

const scenarios = [
  {
    id: 'home',
    title: 'Дома',
    heading: 'Если человек умер дома',
    description:
      'Если смерть произошла дома, как правило, сначала обращаются к медицинскому работнику для подтверждения факта смерти. После этого могут потребоваться дальнейшие действия в соответствии с действующим порядком. Если вы не знаете, что делать дальше, позвоните нам. Мы спокойно объясним последовательность действий, ответим на вопросы и подскажем, как организовать дальнейшие этапы.',
    actions: [
      'Подготовить паспорт умершего.',
      'Подготовить документы человека, который будет заниматься организацией.',
      'Позвонить нам для консультации.',
    ],
    buttonLabel: 'Позвонить',
    icon: House,
  },
  {
    id: 'hospital',
    title: 'В больнице',
    heading: 'Если человек умер в больнице',
    description:
      'Если смерть произошла в медицинском учреждении, сотрудники больницы, как правило, сообщают дальнейший порядок действий. После этого вы можете обратиться к нам. Мы проконсультируем по вопросам организации похорон, поможем подобрать необходимые услуги и подготовиться к проведению церемонии.',
    actions: [],
    buttonLabel: 'Получить консультацию',
    icon: Building2,
  },
  {
    id: 'night',
    title: 'Ночью',
    heading: 'Если смерть произошла ночью',
    description:
      'Мы принимаем обращения круглосуточно. Независимо от времени суток вы можете позвонить нам и получить консультацию. Специалист спокойно выслушает ситуацию, объяснит дальнейшие действия и поможет организовать необходимые услуги.',
    actions: [],
    buttonLabel: 'Позвонить сейчас',
    icon: MoonStar,
  },
] as const

const helpItems = [
  'Консультация 24/7',
  'Организация похорон',
  'Ритуальный транспорт',
  'Подбор принадлежностей',
  'Помощь с документами',
  'Памятники',
  'Поддержка семьи',
]

const activeScenarioId = ref<(typeof scenarios)[number]['id']>('home')
const expandedScenarioId = ref<(typeof scenarios)[number]['id'] | null>('home')

const activeScenario = computed(
  () => scenarios.find(item => item.id === activeScenarioId.value) ?? scenarios[0],
)

const toggleScenario = (id: (typeof scenarios)[number]['id']) => {
  expandedScenarioId.value = expandedScenarioId.value === id ? null : id
}
</script>

<template>
  <section class="section bg-[var(--color-background-soft)]">
    <BaseContainer>
      <SectionHeading
        title="Что делать, если умер человек в Мариуполе"
        description="Потеря близкого человека — тяжёлое событие, и в такой ситуации бывает сложно сразу понять, какие действия необходимо выполнить в первую очередь. Мы подготовили краткую памятку, которая поможет спокойно разобраться в последовательности действий. Если вам нужна помощь, наши специалисты готовы проконсультировать вас круглосуточно."
        align="center"
      />

      <div class="mt-10 hidden md:block">
        <div class="grid gap-4 lg:grid-cols-3">
          <button
            v-for="scenario in scenarios"
            :key="`${scenario.id}-tab`"
            type="button"
            class="group rounded-xl border px-6 py-6 text-left transition-all duration-200"
            :class="
              activeScenarioId === scenario.id
                ? 'border-primary bg-white shadow-sm'
                : 'border-border bg-surface hover:-translate-y-0.5 hover:shadow-sm'
            "
            @click="activeScenarioId = scenario.id"
          >
            <span
              class="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary"
              aria-hidden="true"
            >
              <component :is="scenario.icon" :size="26" stroke-width="1.75" />
            </span>
            <h3 class="mt-5 text-[1.45rem] leading-[1.15]">
              {{ scenario.title }}
            </h3>
          </button>
        </div>

        <BaseCard class="mt-6 overflow-hidden !p-0">
          <div class="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div class="p-6 sm:p-8 lg:p-10">
              <div class="flex items-center gap-4">
                <span
                  class="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <component :is="activeScenario.icon" :size="30" stroke-width="1.75" />
                </span>
                <h3 class="text-[1.9rem] leading-[1.08]">
                  {{ activeScenario.heading }}
                </h3>
              </div>

              <p class="mt-6 max-w-3xl text-text-muted">
                {{ activeScenario.description }}
              </p>

              <div
                v-if="activeScenario.actions.length"
                class="mt-6 rounded-xl border border-border bg-surface-alt p-5"
              >
                <p class="font-semibold text-text">Что можно сделать сразу</p>
                <ul class="mt-4 space-y-3 text-text-muted">
                  <li
                    v-for="action in activeScenario.actions"
                    :key="action"
                    class="flex items-start gap-3"
                  >
                    <Check :size="18" class="mt-0.5 shrink-0 text-primary" />
                    <span>{{ action }}</span>
                  </li>
                </ul>
              </div>

              <BaseButton
                :href="createPhoneLink(contacts.phone)"
                variant="primary"
                external
                class="mt-6"
              >
                {{ activeScenario.buttonLabel }}
              </BaseButton>
            </div>

            <div class="border-t border-border bg-surface-alt p-6 lg:border-t-0 lg:border-l lg:p-8">
              <h3 class="text-[1.45rem] leading-[1.15]">
                Чем мы можем помочь
              </h3>
              <ul class="mt-6 space-y-4 text-text-muted">
                <li
                  v-for="item in helpItems"
                  :key="item"
                  class="flex items-start gap-3"
                >
                  <Check :size="18" class="mt-0.5 shrink-0 text-primary" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="mt-10 space-y-3 md:hidden">
        <BaseCard
          v-for="scenario in scenarios"
          :key="`${scenario.id}-accordion`"
          class="overflow-hidden !p-0"
        >
          <button
            type="button"
            class="flex w-full items-center gap-4 px-5 py-5 text-left"
            @click="toggleScenario(scenario.id)"
          >
            <span
              class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
              aria-hidden="true"
            >
              <component :is="scenario.icon" :size="22" stroke-width="1.75" />
            </span>
            <span class="min-w-0 flex-1 text-[1.2rem] leading-tight font-semibold text-text">
              {{ scenario.title }}
            </span>
            <ChevronDown
              :size="18"
              class="shrink-0 text-primary transition-transform"
              :class="expandedScenarioId === scenario.id ? 'rotate-180' : ''"
            />
          </button>

          <div
            v-if="expandedScenarioId === scenario.id"
            class="border-t border-border px-5 pt-5 pb-5"
          >
            <h3 class="text-[1.45rem] leading-[1.12]">
              {{ scenario.heading }}
            </h3>
            <p class="mt-4 text-text-muted">
              {{ scenario.description }}
            </p>

            <div
              v-if="scenario.actions.length"
              class="mt-5 rounded-xl border border-border bg-surface-alt p-4"
            >
              <p class="font-semibold text-text">Что можно сделать сразу</p>
              <ul class="mt-4 space-y-3 text-text-muted">
                <li
                  v-for="action in scenario.actions"
                  :key="action"
                  class="flex items-start gap-3"
                >
                  <Check :size="18" class="mt-0.5 shrink-0 text-primary" />
                  <span>{{ action }}</span>
                </li>
              </ul>
            </div>

            <BaseButton
              :href="createPhoneLink(contacts.phone)"
              variant="primary"
              external
              class="mt-5 w-full justify-center"
            >
              {{ scenario.buttonLabel }}
            </BaseButton>
          </div>
        </BaseCard>

        <BaseCard>
          <h3 class="text-[1.45rem] leading-[1.15]">Чем мы можем помочь</h3>
          <ul class="mt-5 space-y-3 text-text-muted">
            <li
              v-for="item in helpItems"
              :key="`${item}-mobile`"
              class="flex items-start gap-3"
            >
              <Check :size="18" class="mt-0.5 shrink-0 text-primary" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </BaseCard>
      </div>

      <BaseCard class="mt-8 overflow-hidden !p-0">
        <div class="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div>
            <h3 class="text-[1.75rem] leading-[1.1]">
              Не знаете, что делать дальше?
            </h3>
            <p class="mt-4 max-w-2xl text-text-muted">
              Позвоните нам. Мы спокойно объясним порядок действий и бесплатно проконсультируем по вопросам организации похорон.
            </p>
          </div>

          <div
            class="flex flex-col gap-4 rounded-xl border border-border bg-surface-alt px-5 py-5 md:items-start md:justify-center"
          >
            <div class="flex items-center gap-4">
              <span
                class="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-sm"
                aria-hidden="true"
              >
                <Phone :size="20" />
              </span>
              <div>
                <p class="text-sm text-text-muted">Телефон</p>
                <a
                  :href="createPhoneLink(contacts.phone)"
                  class="mt-1 block text-lg font-semibold text-text no-underline"
                >
                  {{ contacts.phone }}
                </a>
              </div>
            </div>
            <CallButton label="Позвонить сейчас" />
          </div>
        </div>
      </BaseCard>
    </BaseContainer>
  </section>
</template>
