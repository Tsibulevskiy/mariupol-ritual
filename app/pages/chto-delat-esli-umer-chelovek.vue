<script setup lang="ts">
import { contacts } from '@/config/contacts'
import type { Faq } from '@/types/content'

const title = 'Что делать, если умер человек'
const description =
  'Памятка о первых действиях при смерти дома или в больнице, списке документов и моментах, когда стоит обращаться в ритуальную службу.'
const path = '/chto-delat-esli-umer-chelovek'
const breadcrumbs = [
  { label: 'Главная', href: '/' },
  { label: 'Что делать, если умер человек' },
]

const homeSteps = [
  'Сохраняйте спокойствие и по возможности зафиксируйте основные обстоятельства произошедшего.',
  'Свяжитесь с профильными службами, которые должны подтвердить дальнейший порядок действий.',
  'Не торопитесь принимать организационные решения до прояснения базовых формальностей.',
]

const hospitalSteps = [
  'Уточните у сотрудников учреждения, какой порядок действий применяется в вашей ситуации.',
  'Попросите объяснить, какие документы и в какие сроки будут нужны.',
  'После получения базовой информации можно переходить к организации дальнейших шагов.',
]

const callList = [
  'В первую очередь звонят в службы, которые должны зафиксировать ситуацию и подсказать официальный порядок действий.',
  'После уточнения обязательных формальностей можно звонить в ритуальную службу для организационной помощи.',
  'Если ситуация нестандартная, порядок звонков и действий может отличаться.',
]

const documents = [
  'Паспорт заявителя или родственника, который занимается организационными вопросами.',
  'Паспорт умершего, которые потребуются по обстоятельствам конкретной ситуации.',
  'СНИЛС умершего (в случае смерти в больнице)',
  'ОМС умершего (в случае смерти в больнице)',
  'список документов необходимых для под захоронения уточнить у менеджера'
]

const faq: Faq[] = [
  {
    question: 'Когда обращаться в ритуальную службу?',
    answer:
      'Обращаться удобно после того, как вы поняли базовый порядок действий по вашей ситуации и готовы переходить к организации последующих этапов.',
  },
  {
    question: 'Почему на странице нет жесткой универсальной инструкции?',
    answer:
      'Порядок действий зависит от обстоятельств, места смерти и требований конкретных служб. Поэтому здесь дана осторожная памятка, а не универсальное обещание.',
  },
  {
    question: 'Нужно ли сверять эту памятку с местным специалистом?',
    answer:
      'Да, перед публикацией и практическим использованием текст должен проверить местный профильный специалист, который знает актуальный порядок действий на месте.',
  },
]

usePageSeo({
  title,
  description,
  path,
})

const runtimeConfig = useRuntimeConfig()
const canonical = new URL(path, runtimeConfig.public.siteUrl).toString()

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.href ?? path, runtimeConfig.public.siteUrl).toString(),
    })),
  }),
  defineWebPage({
    name: title,
    description,
    url: canonical,
  }),
])
</script>

<template>
  <div>
    <PageHero
      :title="title"
      description="Порядок первых действий зависит от обстоятельств. Эта страница помогает сориентироваться и перейти к следующим шагам без лишней спешки."
      eyebrow="Памятка по первым действиям"
      show-phone
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="breadcrumbs" />

        <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <BaseCard>
            <SectionHeading
              title="Важно перед началом действий"
              description="Порядок может отличаться в зависимости от места смерти, медицинских обстоятельств и требований служб. Эту памятку нужно дополнительно сверить у местного специалиста."
            />
          </BaseCard>
          <BaseCard>
            <p class="text-sm font-semibold tracking-wider text-primary uppercase">
              Куда обратиться
            </p>
            <a
              :href="createPhoneLink(contacts.phone)"
              class="mt-4 inline-flex min-h-12 items-center font-serif text-2xl font-semibold text-primary sm:text-3xl"
              aria-label="Позвонить по крупному номеру телефона"
            >
              {{ contacts.phone }}
            </a>
            <p class="mt-3 text-text-muted">
              Когда обязательные формальности понятны, по этому номеру можно быстро перейти к организационной помощи.
            </p>
            <CallButton label="Позвонить сейчас" class="mt-6" full-width />
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <SectionHeading
          title="Если смерть произошла дома"
          description="Ниже приведен осторожный общий порядок. Точные действия нужно уточнять по обстоятельствам."
        />
        <ol class="mt-10 grid gap-6 md:grid-cols-3">
          <li v-for="(step, index) in homeSteps" :key="step">
            <BaseCard class="h-full">
              <p class="font-semibold text-primary">Шаг {{ index + 1 }}</p>
              <p class="mt-3">{{ step }}</p>
            </BaseCard>
          </li>
        </ol>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <SectionHeading
          title="Если смерть произошла в больнице"
          description="В этом случае часть процедур обычно координируется через учреждение, поэтому важно сначала получить разъяснение на месте."
        />
        <ol class="mt-10 grid gap-6 md:grid-cols-3">
          <li v-for="(step, index) in hospitalSteps" :key="step">
            <BaseCard class="h-full">
              <p class="font-semibold text-primary">Шаг {{ index + 1 }}</p>
              <p class="mt-3">{{ step }}</p>
            </BaseCard>
          </li>
        </ol>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <div class="grid gap-6 lg:grid-cols-2">
          <BaseCard class="h-full">
            <SectionHeading
              title="Куда звонить"
              description="Последовательность звонков зависит от обстоятельств, поэтому здесь даны только безопасные общие ориентиры."
            />
            <ul class="mt-6 space-y-3 text-text-muted">
              <li v-for="item in callList" :key="item">
                {{ item }}
              </li>
            </ul>
          </BaseCard>

          <BaseCard class="h-full">
            <SectionHeading
              title="Какие документы могут понадобиться"
              description="Список зависит от конкретной ситуации и места оформления."
            />
            <ul class="mt-6 space-y-3 text-text-muted">
              <li v-for="item in documents" :key="item">
                {{ item }}
              </li>
            </ul>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <SectionHeading
          title="Когда обращаться в ритуальную службу"
          description="Ритуальная служба подключается тогда, когда обязательные первичные действия уже понятны и нужна организационная помощь дальше."
        />
        <div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <BaseCard>
            <p>
              Если нужно перейти к организации похорон, подбору услуг, транспорту
              или координации следующих шагов, удобнее не откладывать звонок.
              Это помогает быстрее собрать понятный план действий под вашу
              ситуацию.
            </p>
          </BaseCard>
          <BaseCard>
            <CallButton label="Связаться с ритуальной службой" full-width />
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <SectionHeading
          title="Полезные разделы"
          description="Если вы уже понимаете следующий шаг, можно перейти в нужный раздел сразу."
        />
        <div class="mt-10 flex flex-wrap gap-3">
          <BaseButton href="/ritualnye-uslugi-mariupol" variant="secondary">
            Ритуальные услуги
          </BaseButton>
          <BaseButton href="/organizaciya-pohoron-mariupol" variant="secondary">
            Организация похорон
          </BaseButton>
          <BaseButton href="/ritualny-transport-mariupol" variant="secondary">
            Ритуальный транспорт
          </BaseButton>
          <BaseButton href="/perevozka-umershih-mariupol" variant="secondary">
            Перевозка умерших
          </BaseButton>
        </div>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <SectionHeading
          title="FAQ"
          description="Короткие ответы на частые вопросы по первым действиям."
        />
        <FaqAccordion :items="faq" class="mt-10" />
      </BaseContainer>
    </section>

    <ContactBlock />
  </div>
</template>
