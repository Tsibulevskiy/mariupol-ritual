<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { priceFaq, pricePackages, priceServices } from '@/data/prices'

const title = 'Цены на похороны в Мариуполе'
const description =
  'Базовая страница цен на похороны в Мариуполе: пакеты, отдельные услуги, примечания по расчету и FAQ по оплате.'
const path = '/ceny-na-pohorony-mariupol'
const breadcrumbs = [{ label: 'Главная', href: '/' }, { label: 'Цены' }]

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
      description="Показываем структуру стоимости без недостоверных обещаний. Точные суммы уточняются после согласования состава услуг."
      eyebrow="Пакеты и отдельные услуги"
      show-phone
    />

    <section class="section">
      <BaseContainer>
        <Breadcrumbs :items="breadcrumbs" />

        <div class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <BaseCard>
            <SectionHeading
              title="Как читать страницу цен"
              description="Здесь нет искусственных “цен от”. Пока прайс не подтвержден, стоимость обозначена осторожно и без маркетинговых искажений."
            />
          </BaseCard>
          <BaseCard>
            <p class="text-sm font-semibold tracking-wider text-primary uppercase">
              Расчет стоимости
            </p>
            <p class="mt-4 text-text-muted">
              Точная сумма зависит от состава услуг, товаров, маршрута и дополнительных организационных задач.
            </p>
            <CallButton label="Уточнить стоимость по телефону" class="mt-6" full-width />
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <SectionHeading
          title="Базовые пакеты"
          description="Ниже показаны основные пакеты с ориентиром по стоимости. Итоговая сумма зависит от состава услуг и дополнительных решений."
        />
        <div class="mt-10 grid gap-6 lg:grid-cols-2">
          <BaseCard v-for="item in pricePackages" :key="item.id" class="h-full">
            <h3>{{ item.name }}</h3>
            <p class="mt-4 text-2xl font-semibold text-primary">
              {{ item.price }}
            </p>
            <p class="mt-3 text-text-muted">
              {{ item.note }}
            </p>

            <div class="mt-6">
              <p class="font-semibold">Что входит</p>
              <ul class="mt-3 space-y-3 text-text-muted">
                <li v-for="included in item.included" :key="included">
                  {{ included }}
                </li>
              </ul>
            </div>

            <div class="mt-6">
              <p class="font-semibold">Что оплачивается отдельно</p>
              <ul class="mt-3 space-y-3 text-text-muted">
                <li v-for="extra in item.separatePayment" :key="extra">
                  {{ extra }}
                </li>
              </ul>
            </div>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <SectionHeading
          title="Отдельные услуги"
          description="По каждой услуге сохраняем осторожную формулировку до подтверждения актуального прайса."
        />
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <BaseCard v-for="item in priceServices" :key="item.id" class="h-full">
            <h3>{{ item.name }}</h3>
            <p class="mt-4 text-2xl font-semibold text-primary">
              {{ item.price }}
            </p>
            <p class="mt-3 text-text-muted">
              {{ item.note }}
            </p>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <SectionHeading
          title="Что влияет на стоимость"
          description="Этот блок нужен, чтобы объяснить изменение цены без недостоверных обещаний."
        />
        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <BaseCard>
            <p class="font-semibold">Состав услуг</p>
            <p class="mt-3 text-text-muted">
              Итоговая сумма зависит от набора выбранных услуг и уровня сопровождения.
            </p>
          </BaseCard>
          <BaseCard>
            <p class="font-semibold">Товары и принадлежности</p>
            <p class="mt-3 text-text-muted">
              Отдельные позиции могут заметно влиять на общий расчет и согласуются заранее.
            </p>
          </BaseCard>
          <BaseCard>
            <p class="font-semibold">Транспорт и доп. задачи</p>
            <p class="mt-3 text-text-muted">
              Маршрут, время и дополнительные поручения также влияют на стоимость.
            </p>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <SectionHeading
          title="FAQ по оплате"
          description="Короткие ответы на частые вопросы о расчете и стоимости."
        />
        <FaqAccordion :items="priceFaq" class="mt-10" />
      </BaseContainer>
    </section>

    <section class="section bg-surface-alt">
      <BaseContainer>
        <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <BaseCard>
            <SectionHeading
              title="Получить точный расчет"
              description="Быстрее всего согласовать стоимость звонком. Номер остается кликабельным на всех устройствах."
            />
            <a
              :href="createPhoneLink(contacts.phone)"
              class="mt-6 inline-flex min-h-12 items-center font-serif text-2xl font-semibold text-primary"
              aria-label="Позвонить для расчета стоимости"
            >
              {{ contacts.phone }}
            </a>
            <CallButton label="Позвонить для расчета" class="mt-6" full-width />
          </BaseCard>
          <ContactForm />
        </div>
      </BaseContainer>
    </section>
  </div>
</template>
