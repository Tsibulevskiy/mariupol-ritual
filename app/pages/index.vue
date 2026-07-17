<script setup lang="ts">
import { ClipboardList, HeartHandshake, Phone } from 'lucide-vue-next'
import type { Faq, Price, PricePackage, Service } from '@/types/content'
import { contacts } from '@/config/contacts'
import { createPhoneLink } from '@/utils/contact-links'

usePageSeo({
  title: 'Ритуальные услуги в Мариуполе',
  description:
    'Информация о ритуальных услугах и порядке обращения в Мариуполе.',
  path: '/',
})

const runtimeConfig = useRuntimeConfig()
const canonical = new URL('/', runtimeConfig.public.siteUrl).toString()

const services: Array<Service & { href: string }> = [
  {
    id: 'funeral-organization',
    slug: 'organizaciya-pohoron-mariupol',
    name: 'Организация похорон',
    description: 'Полностью сопровождаем все этапы проведения церемонии.',
    icon: 'heartHandshake',
    href: '/organizaciya-pohoron-mariupol',
  },
  {
    id: 'funeral-transport',
    slug: 'ritualny-transport-mariupol',
    name: 'Ритуальный транспорт',
    description:
      'Перевозка умершего и транспорт для участников церемонии.',
    icon: 'carFront',
    href: '/ritualny-transport-mariupol',
  },
  {
    id: 'ritual-goods',
    slug: 'ritualnye-tovary-mariupol',
    name: 'Ритуальные товары',
    description:
      'Гробы, венки, кресты, текстиль и необходимые принадлежности.',
    icon: 'box',
    href: '/ritualnye-tovary-mariupol',
  },
  {
    id: 'documents-help',
    slug: 'chto-delat-esli-umer-chelovek',
    name: 'Помощь с документами',
    description:
      'Консультируем по перечню документов и порядку их оформления.',
    icon: 'fileText',
    href: '/chto-delat-esli-umer-chelovek',
  },
  {
    id: 'turnkey-funeral',
    slug: 'pohorony-pod-klyuch-mariupol',
    name: 'Похороны под ключ',
    description:
      'Берем на себя организацию церемонии от обращения до завершения.',
    icon: 'shieldCheck',
    href: '/pohorony-pod-klyuch-mariupol',
  },
  {
    id: 'consultation-247',
    slug: 'kontakty',
    name: 'Консультация 24/7',
    description:
      'Отвечаем на вопросы и помогаем определить дальнейшие действия.',
    icon: 'phone',
    href: '/kontakty',
  },
]

const prices: Price[] = [
  {
    id: 'price-organization',
    serviceId: 'funeral-organization',
    name: 'Организация похорон',
    value:
      'Стоимость рассчитывается после консультации с учетом выбранного комплекса услуг и пожеланий семьи.',
  },
  {
    id: 'price-transport',
    serviceId: 'funeral-transport',
    name: 'Ритуальный транспорт',
    value:
      'Цена зависит от маршрута, расстояния и необходимого транспортного сопровождения.',
  },
  {
    id: 'price-goods',
    serviceId: 'ritual-goods',
    name: 'Ритуальные товары',
    value:
      'Стоимость определяется выбранными ритуальными принадлежностями и их комплектацией.',
  },
  {
    id: 'price-turnkey',
    serviceId: 'funeral-organization',
    name: 'Комплексная организация',
    value:
      'Индивидуальный расчет полного сопровождения церемонии с учетом всех необходимых услуг.',
  },
]

const packages: PricePackage[] = [
  {
    id: 'package-social',
    name: 'Социальные похороны',
    price: 'от 28 500 ₽',
    note:
      'Подходит для семей, которым требуется организация похорон с минимально необходимым набором услуг и соблюдением всех обязательных процедур.',
    included: [
      'Консультация',
      'Организация похорон',
      'Помощь с оформлением документов',
      'Координация основных этапов',
    ],
    separatePayment: [],
  },
  {
    id: 'package-standard',
    name: 'Стандарт',
    price: 'от 38 000 ₽',
    note:
      'Оптимальный пакет для большинства семей. Включает организацию церемонии и расширенный перечень ритуальных услуг.',
    included: [
      'Всё из пакета «Социальные похороны»',
      'Ритуальный транспорт',
      'Помощь в выборе принадлежностей',
      'Полное сопровождение церемонии',
    ],
    separatePayment: [],
  },
  {
    id: 'package-premium',
    name: 'Премиум',
    price: 'от 50 000 ₽',
    note:
      'Комплексное сопровождение с расширенным набором услуг и индивидуальной организацией церемонии.',
    included: [
      'Всё из пакета «Стандарт»',
      'Расширенный выбор ритуальных товаров',
      'Дополнительная организационная помощь',
      'Индивидуальное сопровождение семьи',
    ],
    separatePayment: [],
  },
  {
    id: 'package-vip',
    name: 'VIP',
    price: 'от 70 000 ₽',
    note:
      'Максимальный уровень сопровождения. Все организационные вопросы берём на себя, уделяя особое внимание пожеланиям семьи.',
    included: [
      'Всё из пакета «Премиум»',
      'Индивидуальный план организации',
      'Приоритетное сопровождение',
      'Максимально полный комплекс услуг',
    ],
    separatePayment: [],
  },
]

const organizationSteps = [
  {
    id: 'first-call',
    number: '01',
    title: 'Первый звонок',
    description:
      'Вы связываетесь с нами удобным способом. Мы спокойно выслушаем ситуацию, ответим на вопросы и объясним, какие действия необходимо выполнить в первую очередь.',
    icon: Phone,
  },
  {
    id: 'coordination',
    number: '02',
    title: 'Согласование',
    description:
      'Обсуждаем необходимые услуги, подбираем подходящий вариант организации, согласовываем стоимость и порядок дальнейших действий.',
    icon: ClipboardList,
  },
  {
    id: 'organization',
    number: '03',
    title: 'Организация похорон',
    description:
      'Берем на себя организационные вопросы, координируем выполнение согласованных услуг и остаемся с вами на связи до завершения церемонии.',
    icon: HeartHandshake,
  },
]

const specialists = [
  {
    id: 'victoria-second',
    name: 'Виктория',
    role: 'Менеджер по работе с клиентами',
    initials: 'В',
    phone: '+7 949 708 23 55',
    image: '/victoria1.png',
  },
  {
    id: 'viktoriya',
    name: 'Ирина',
    role: 'Менеджер по работе с клиентами',
    initials: 'И',
    phone: '+7 949 088 70 20',
    image: '/Irina.png',
  },
  {
    id: 'anna',
    name: 'Виктория',
    role: 'Менеджер по работе с клиентами',
    initials: 'В',
    phone: '+7 949 730 35 49',
    image: '/victoria.png',
  },
  {
    id: 'aleksandr',
    name: 'Екатерина',
    role: 'Менеджер по работе с клиентами',
    initials: 'Е',
    phone: '+7 949 551 37 12',
    image: '/Ekaterina.png',
  },
]

const faq: Faq[] = [
  {
    question: 'Как вызвать ритуального агента?',
    answer:
      'Свяжитесь с нами по телефону. Мы выслушаем ситуацию, объясним порядок дальнейших действий и при необходимости организуем выезд специалиста.',
  },
  {
    question: 'Что делать, если человек умер дома?',
    answer:
      'Главное правило — не спешить и действовать последовательно. В первую очередь рекомендуется: 1. как можно скорее обратиться в сертифицированную похоронную службу; 2. получить квалифицированную консультацию; 3. не открывать дверь людям, которые представляются агентами без предварительного вызова. Если на пороге появился неизвестный похоронный агент, необходимо вежливо, но твёрдо отказать и сообщить, что вы уже обратились в официальную службу. Если человек умер дома. Это один из самых распространённых случаев. Алгоритм действий следующий: Необходимо вызвать: сотрудников полиции; Врачи и полиция должны зафиксировать факт смерти и убедиться, что она наступила по естественным причинам. Подготовьте: документы умершего; паспорта людей, находящихся рядом. После вызова экстренных служб необходимо связаться с официальным похоронным агентством по телефону +7 949 430 30 30. Это важный шаг, позволяющий избежать контакта с так называемыми «чёрными агентами».',
  },
  {
    question: 'Можно ли обратиться в любое время суток?',
    answer:
      'Да. Мы принимаем обращения круглосуточно и готовы проконсультировать по вопросам организации похорон.',
  },
  {
    question: 'Сколько стоят похороны?',
    answer:
      'Стоимость зависит от выбранных услуг, ритуальных принадлежностей, транспорта и других организационных вопросов. Перед началом работ мы согласовываем состав услуг и итоговую стоимость.',
  },
  {
    question: 'Какие услуги предоставляет компания?',
    answer:
      'Мы оказываем помощь в организации похорон, предоставляем ритуальный транспорт, помогаем с подбором ритуальных принадлежностей и консультируем по организационным вопросам.',
  },
  {
    question: 'Помогаете ли вы с документами?',
    answer:
      'Да. Мы подскажем, какие документы необходимы в конкретной ситуации, и объясним порядок их оформления.',
  },
  {
    question: 'Можно ли заказать только ритуальный транспорт?',
    answer:
      'Да. При необходимости можно воспользоваться отдельными услугами, включая ритуальный транспорт, без заказа полного комплекса сопровождения.',
  },
  {
    question: 'Работаете ли вы только в Мариуполе?',
    answer:
      'Мы работаем как в Мариуполе, так и за его пределами.',
  },
  {
    question: 'Как быстро начинается организация похорон?',
    answer:
      'После обращения мы сразу обсуждаем ситуацию, определяем порядок дальнейших действий и приступаем к организации согласованных услуг.',
  },
  {
    question: 'Можно ли выбрать только необходимые услуги?',
    answer:
      'Да. Вы можете заказать как полный комплекс сопровождения, так и отдельные услуги в зависимости от вашей ситуации.',
  },
]

useSchemaOrg([
  defineWebPage({
    name: 'Ритуальные услуги в Мариуполе',
    description:
      'Информация о ритуальных услугах и порядке обращения в Мариуполе.',
    url: canonical,
  }),
  defineQuestion({
    name: faq[0]?.question,
    acceptedAnswer: faq[0]?.answer,
  }),
  defineQuestion({
    name: faq[1]?.question,
    acceptedAnswer: faq[1]?.answer,
  }),
  defineQuestion({
    name: faq[2]?.question,
    acceptedAnswer: faq[2]?.answer,
  }),
  defineQuestion({
    name: faq[3]?.question,
    acceptedAnswer: faq[3]?.answer,
  }),
  defineQuestion({
    name: faq[4]?.question,
    acceptedAnswer: faq[4]?.answer,
  }),
  defineQuestion({
    name: faq[5]?.question,
    acceptedAnswer: faq[5]?.answer,
  }),
  defineQuestion({
    name: faq[6]?.question,
    acceptedAnswer: faq[6]?.answer,
  }),
  defineQuestion({
    name: faq[7]?.question,
    acceptedAnswer: faq[7]?.answer,
  }),
  defineQuestion({
    name: faq[8]?.question,
    acceptedAnswer: faq[8]?.answer,
  }),
  defineQuestion({
    name: faq[9]?.question,
    acceptedAnswer: faq[9]?.answer,
  }),
])

</script>

<template>
  <div>
    <HomeHeroSection />

    <section class="section bg-[#DDE7F0]">
      <BaseContainer>
        <SectionHeading
          title="С вами будут работать"
          description="Наши специалисты спокойно ответят на вопросы, объяснят порядок действий и помогут организовать всё необходимое."
        />
        <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <BaseCard
            v-for="specialist in specialists"
            :key="specialist.id"
            class="flex h-full flex-col items-center text-center shadow-[0_10px_30px_rgba(12,30,50,0.08)]"
          >
            <NuxtImg
              v-if="specialist.image"
              :src="specialist.image"
              :alt="specialist.name"
              width="160"
              height="160"
              class="size-40 rounded-full object-cover"
              loading="lazy"
            />
            <div
              v-else
              class="flex size-40 items-center justify-center rounded-full bg-surface-alt font-heading text-5xl text-primary"
              aria-hidden="true"
            >
              {{ specialist.initials }}
            </div>
            <h3 class="mt-6 text-[1.75rem] leading-[1.08]">
              {{ specialist.name }}
            </h3>
            <p class="mt-3 max-w-[16rem] text-sm font-medium text-text-muted">
              {{ specialist.role }}
            </p>
            <p class="mt-6 inline-flex items-center gap-2 text-primary">
              <Phone :size="18" aria-hidden="true" />
              <span>{{ specialist.phone }}</span>
            </p>
            <BaseButton
              :href="createPhoneLink(specialist.phone)"
              variant="secondary"
              external
              class="mt-6"
            >
              Позвонить
            </BaseButton>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section
      id="services"
      class="section bg-[#DDE7F0]"
    >
      <BaseContainer>
        <SectionHeading
          title="Основные услуги"
          description="Мы собрали основные направления нашей работы, чтобы вы могли быстро найти нужную информацию и перейти к интересующей услуге."
        />
        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :service="service"
            :href="service.href"
          />
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-[#F7F9FB]">
      <BaseContainer>
        <SectionHeading
          title="Стоимость услуг"
          description="Стоимость рассчитывается индивидуально с учетом выбранных услуг, ритуальных принадлежностей, транспорта и особенностей организации церемонии в Мариуполе."
        />
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <BaseCard
            v-for="price in prices"
            :key="price.id"
            class="h-full transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 class="max-w-[16rem] text-[2rem] leading-[1.08]">
              {{ price.name }}
            </h3>
            <p class="mt-5 text-text-muted">
              {{ price.value }}
            </p>
          </BaseCard>
        </div>
      </BaseContainer>
    </section>

    <section
      id="service-packages"
      class="section bg-[#E2EAF2]"
    >
      <BaseContainer>
        <SectionHeading
          title="Пакеты услуг"
          description="Выберите подходящий пакет сопровождения. При необходимости мы адаптируем состав услуг под вашу ситуацию и заранее согласуем окончательную стоимость."
        />
        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <BaseCard
            v-for="item in packages"
            :key="item.id"
            class="flex h-full flex-col transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 class="text-[1.75rem] leading-[1.08]">{{ item.name }}</h3>
            <p class="mt-4 text-[2rem] leading-none font-semibold text-primary">
              {{ item.price }}
            </p>
            <div class="mt-4 h-px w-full bg-border" />
            <p class="mt-5 text-text-muted">
              {{ item.note }}
            </p>
            <div class="mt-6 flex-1">
              <p class="font-semibold text-text">Что входит</p>
              <ul class="mt-3 space-y-3 text-text-muted">
                <li v-for="included in item.included" :key="included">
                  ✓ {{ included }}
                </li>
              </ul>
            </div>
          </BaseCard>
        </div>
        <p class="mt-8 max-w-4xl text-text-muted">
          Окончательная стоимость зависит от выбранных ритуальных принадлежностей, транспортных расходов и дополнительных услуг. Перед началом работ мы подробно согласовываем состав услуг и итоговую цену.
        </p>
      </BaseContainer>
    </section>

    <section class="section">
      <BaseContainer>
        <SectionHeading
          title="Как проходит организация"
          description="Мы понимаем, что в такой момент сложно принимать решения. Поэтому сопровождаем вас на каждом этапе — от первого обращения до завершения организации похорон."
        />
        <div class="relative mt-10">
          <div
            class="absolute top-10 right-24 left-24 hidden h-px bg-border md:block"
            aria-hidden="true"
          />
          <ol class="grid gap-6 md:grid-cols-3">
            <li
              v-for="(step, index) in organizationSteps"
              :key="step.id"
              class="relative"
            >
              <div
                v-if="index < organizationSteps.length - 1"
                class="absolute top-[4.5rem] bottom-[-1.5rem] left-5 w-px bg-border md:hidden"
                aria-hidden="true"
              />
              <BaseCard
                class="relative flex h-full min-h-[260px] flex-col !p-10 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
              >
                <component
                  :is="step.icon"
                  :size="34"
                  class="text-primary"
                  aria-hidden="true"
                />
                <span class="mt-6 text-sm font-semibold tracking-[0.18em] text-primary">
                  {{ step.number }}
                </span>
                <h3 class="mt-3 text-[1.75rem] leading-[1.08]">
                  {{ step.title }}
                </h3>
                <p class="mt-5 text-text-muted">
                  {{ step.description }}
                </p>
              </BaseCard>
            </li>
          </ol>
        </div>
        <div
          class="mt-8 flex flex-col gap-5 rounded-xl border border-border bg-surface px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8"
        >
          <p class="max-w-2xl text-text-muted">
            Обычно первый разговор занимает 10–15 минут и помогает определить
            дальнейший порядок действий.
          </p>
          <BaseButton
            :href="createPhoneLink(contacts.phone)"
            variant="primary"
            external
          >
            Получить консультацию
          </BaseButton>
        </div>
      </BaseContainer>
    </section>

    <TrustBlock />

    <section id="about-company" class="section bg-[#22384D]">
      <BaseContainer>
        <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span
              class="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/70"
            >
              О компании
            </span>
            <h2 class="mt-6 max-w-xl text-balance text-h2 font-heading text-white">
              Поддерживаем Вас на каждом этапе организации похорон
            </h2>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-[#DCE7F0]">
              Мы понимаем, насколько сложно принимать решения в такой момент.
              Поэтому спокойно объясняем порядок действий, помогаем с
              организацией и остаемся на связи на протяжении всего процесса.
            </p>
            <ul class="mt-8 grid gap-3 text-[#DCE7F0] sm:grid-cols-2">
              <li class="flex items-center gap-3">
                <span class="text-[var(--color-rating)]">✓</span>
                <span>Помощь с документами</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-[var(--color-rating)]">✓</span>
                <span>Организация похорон</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-[var(--color-rating)]">✓</span>
                <span>Ритуальный транспорт</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-[var(--color-rating)]">✓</span>
                <span>Индивидуальный подход</span>
              </li>
            </ul>
          </div>
          <div class="relative lg:pl-6">
            <figure
              class="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-lg shadow-black/10"
            >
              <div class="relative">
                <NuxtImg
                  src="/whatsapp-image-2026-07-12-12-23-46.jpeg"
                  alt="Фотография компании «Мариупольский ритуальный дом»"
                  width="320"
                  height="290"
                  class="h-full min-h-72 w-full object-cover"
                  loading="lazy"
                />
                <div
                  class="absolute inset-0 bg-text/10"
                  aria-hidden="true"
                />
              </div>
            </figure>
            <p class="mt-3 text-sm text-[#DCE7F0]">
              Офис компании в Мариуполе
            </p>
          </div>
        </div>
      </BaseContainer>
    </section>

    <ReviewsBlock />

    <section
      id="faq"
      class="section bg-[#E6EEF5]"
    >
      <BaseContainer>
        <SectionHeading
          title="Частые вопросы"
          description="Ниже собраны ответы на вопросы, которые чаще всего задают при организации похорон в Мариуполе. Если вы не нашли нужную информацию — свяжитесь с нами, и мы подробно проконсультируем."
        />
        <FaqAccordion :items="faq" :default-open-index="0" class="mt-10" />
        <BaseCard class="mt-8">
          <h3>Остались вопросы?</h3>
          <p class="mt-4 text-text-muted">
            Если вы не нашли нужную информацию, свяжитесь с нами. Мы спокойно
            ответим на вопросы и поможем определить дальнейший порядок действий.
          </p>
          <BaseButton
            :href="createPhoneLink(contacts.phone)"
            variant="primary"
            external
            class="mt-6"
          >
            Получить консультацию
          </BaseButton>
        </BaseCard>
      </BaseContainer>
    </section>
  </div>
</template>
