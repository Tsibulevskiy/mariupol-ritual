<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'
import type { Faq } from '@/types/content'

const title = 'О компании'
const description =
  'Информация о компании, подходе к работе, территории обслуживания и способах связи.'
const path = '/o-kompanii'
const breadcrumbs = [{ label: 'Главная', href: '/' }, { label: 'О компании' }]

const history = [
  'Здесь будет размещена краткая история компании после подтверждения фактических данных.',
  'Пока страница использует безопасную структуру без выдуманных дат, регалий и неподтвержденных заявлений.',
]

const team = [
  'Информация о сотрудниках будет добавлена после согласования имен, ролей и формата публикации.',
  'До этого момента раздел остается нейтральным и не содержит вымышленных биографий.',
]

const serviceArea = [
  'Мариуполь.',
  'Ближайшие районы обслуживания будут уточнены после подтверждения рабочих данных.',
]

const principles = [
  'Спокойная и уважительная коммуникация без давления.',
  'Понятный порядок действий и предварительное согласование услуг.',
  'Внимание к организационным деталям и бережный тон общения.',
]

const legalInfo = [
  'Юридические реквизиты будут добавлены после получения подтвержденных данных.',
  'До публикации нельзя использовать вымышленные ИНН, адреса регистрации или иные сведения.',
]

const faq: Faq[] = [
  {
    question: 'Почему на странице нет громких заявлений о лидерстве?',
    answer:
      'Страница сознательно избегает формулировок вроде “№1” или “лучшие”, если они не подтверждены и не помогают пользователю принять решение.',
  },
  {
    question: 'Когда появятся реальные данные о компании?',
    answer:
      'После подтверждения названия, реквизитов, фотографий и информации о сотрудниках страницу можно будет заменить с временного контента на фактический.',
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
  defineOrganization({
    name: siteConfig.name,
    telephone: contacts.phone,
    address: contacts.address,
    url: canonical,
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
      description="Рассказываем о подходе к работе, территории обслуживания и способах связи без недоказуемых рекламных формулировок."
      eyebrow="Информация о компании"
      show-phone
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="breadcrumbs" />

        <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <BaseCard>
            <SectionHeading
              title="Название компании"
              :description="siteConfig.name"
            />
            <p class="mt-4 text-text-muted">
              Реальное название должно быть подтверждено перед публикацией. Сейчас используется текущее значение из конфигурации сайта.
            </p>
          </BaseCard>
          <BaseCard>
            <p class="text-sm font-semibold tracking-wider text-primary uppercase">
              Быстрый переход
            </p>
            <div class="mt-6 flex flex-col gap-3">
              <BaseButton href="/kontakty" variant="secondary">
                Перейти к контактам
              </BaseButton>
              <BaseButton href="/ceny-na-pohorony-mariupol" variant="secondary">
                Посмотреть цены
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <SectionHeading
          title="Краткая история"
          description="Раздел подготовлен под фактическую информацию о компании."
        />
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <BaseCard v-for="item in history" :key="item" class="h-full">
            <p>{{ item }}</p>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <div class="grid gap-6 lg:grid-cols-2">
          <BaseCard class="h-full">
            <SectionHeading
              title="Фотографии"
              description="Реальные фотографии команды, офиса или транспорта нужно добавить после подтверждения материалов."
            />
            <div class="mt-6 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt p-6 text-center text-text-muted">
              Место для реальных фотографий компании.
            </div>
          </BaseCard>

          <BaseCard class="h-full">
            <SectionHeading
              title="Сотрудники"
              description="Раздел подготовлен для реальной информации о людях, которые работают с обращениями."
            />
            <ul class="mt-6 space-y-3 text-text-muted">
              <li v-for="item in team" :key="item">
                {{ item }}
              </li>
            </ul>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <div class="grid gap-6 lg:grid-cols-2">
          <BaseCard class="h-full">
            <SectionHeading
              title="Территория обслуживания"
              description="Указываем только те территории, которые действительно подтверждены."
            />
            <ul class="mt-6 space-y-3 text-text-muted">
              <li v-for="item in serviceArea" :key="item">
                {{ item }}
              </li>
            </ul>
          </BaseCard>

          <BaseCard class="h-full">
            <SectionHeading
              title="Принципы работы"
              description="Здесь перечислены нейтральные и проверяемые принципы без рекламных преувеличений."
            />
            <ul class="mt-6 space-y-3 text-text-muted">
              <li v-for="item in principles" :key="item">
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
          title="Юридические реквизиты"
          description="Публикуем только подтвержденные сведения."
        />
        <div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <BaseCard>
            <ul class="space-y-3 text-text-muted">
              <li v-for="item in legalInfo" :key="item">
                {{ item }}
              </li>
            </ul>
          </BaseCard>
          <BaseCard>
            <p class="font-semibold">Контактные данные</p>
            <p class="mt-4 text-text-muted">{{ contacts.address }}</p>
            <p class="mt-3 text-text-muted">{{ contacts.workingHours }}</p>
            <a
              :href="createPhoneLink(contacts.phone)"
              class="mt-6 inline-flex min-h-12 items-center font-serif text-2xl font-semibold text-primary"
              aria-label="Позвонить в компанию"
            >
              {{ contacts.phone }}
            </a>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <SectionHeading
          title="FAQ"
          description="Короткие пояснения по текущему содержимому страницы."
        />
        <FaqAccordion :items="faq" class="mt-10" />
      </BaseContainer>
    </section>

    <ContactBlock />
  </div>
</template>
