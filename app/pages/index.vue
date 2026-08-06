<script setup lang="ts">
import { ClipboardList, HeartHandshake, Phone } from 'lucide-vue-next'
import type { Faq, PricePackage, Service } from '@/types/content'
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

const services: Service[] = [
  {
    id: 'funeral-organization',
    slug: 'organizaciya-pohoron-mariupol',
    name: 'Организация похорон',
    description:
      'Помогаем организовать похороны в Мариуполе с учётом пожеланий семьи и выбранного бюджета. Согласовываем порядок действий, подбираем ритуальные принадлежности, транспорт и необходимые услуги, координируем проведение церемонии и остаёмся на связи до завершения захоронения.',
    icon: 'heartHandshake',
  },
  {
    id: 'funeral-transport',
    slug: 'ritualny-transport-mariupol',
    name: 'Ритуальный транспорт',
    description:
      'Предоставляем специализированный транспорт для перевозки умершего, катафалк и транспорт сопровождения для родственников. Маршрут, время подачи и состав транспорта согласовываются заранее. Стоимость зависит от расстояния, количества автомобилей и особенностей церемонии.',
    icon: 'carFront',
  },
  {
    id: 'ritual-goods',
    slug: 'ritualnye-tovary-mariupol',
    name: 'Ритуальные товары',
    description:
      'В наших магазинах можно подобрать необходимые ритуальные принадлежности: гробы, кресты, венки, текстиль, одежду для усопшего и другие товары. Специалист поможет выбрать подходящий вариант с учётом бюджета, пожеланий семьи и состава церемонии.',
    icon: 'box',
  },
  {
    id: 'documents-help',
    slug: 'chto-delat-esli-umer-chelovek',
    name: 'Помощь с документами',
    description:
      'Объясняем, какие документы могут потребоваться для организации похорон и в каком порядке необходимо действовать. Помогаем разобраться в последовательности оформления и подсказываем, куда обращаться в конкретной ситуации. Перечень документов уточняется индивидуально.',
    icon: 'fileText',
  },
  {
    id: 'turnkey-funeral',
    slug: 'pohorony-pod-klyuch-mariupol',
    name: 'Похороны под ключ',
    description:
      'Берём на себя комплексную организацию похорон: от первичной консультации и согласования стоимости до подбора принадлежностей, транспорта, похоронной бригады и проведения церемонии. Состав услуг можно изменить в зависимости от ситуации, бюджета и пожеланий семьи.',
    icon: 'shieldCheck',
  },
  {
    id: 'consultation-247',
    slug: 'kontakty',
    name: 'Консультация 24/7',
    description:
      'Принимаем обращения круглосуточно. Специалист спокойно выслушает ситуацию, объяснит первоочередные действия и подскажет, какие услуги могут потребоваться. Позвонить можно в любое время суток по телефону +7 949 430 30 30.',
    icon: 'phone',
  },
]

const priceSectionDetails = [
  {
    id: 'price-detail-1',
    title: 'Стоимость организации похорон',
    description:
      'Стоимость организации похорон зависит от выбранного комплекса услуг, ритуальных принадлежностей, транспорта и пожеланий семьи. Мы понимаем, что каждая ситуация индивидуальна, поэтому заранее обсуждаем состав услуг и согласовываем стоимость до начала организации похорон.',
  },
  {
    id: 'price-detail-2',
    title: 'Доступные варианты',
    description:
      'В нашем ритуальном доме доступны как социальные варианты похорон, так и расширенные комплексы с дополнительными услугами. При необходимости вы можете заказать полный комплекс организации похорон или выбрать только отдельные услуги — например, транспортировку тела, ритуальный транспорт, ритуальные принадлежности, помощь с документами или изготовление памятника.',
  },
  {
    id: 'price-detail-3',
    title: 'Прозрачное ценообразование',
    description:
      'Мы придерживаемся принципа прозрачного ценообразования. Перед оформлением заказа специалист подробно объяснит, что входит в выбранный пакет, какие услуги являются обязательными, а какие можно добавить по желанию. Это позволяет подобрать подходящий вариант с учётом бюджета семьи и избежать непредвиденных расходов.',
  },
  {
    id: 'price-detail-4',
    title: 'Ориентировочные цены',
    description:
      'Ниже представлены ориентировочные цены на основные ритуальные услуги и готовые комплексы организации похорон. Для получения точного расчёта свяжитесь с нами по телефону — мы бесплатно проконсультируем, ответим на вопросы и поможем подобрать наиболее подходящий вариант.',
  },
]

const priceInfoBlocks = [
  {
    id: 'price-info-factors',
    title: 'Что влияет на стоимость',
    intro: 'Стоимость организации похорон может зависеть от нескольких факторов:',
    items: [
      'выбранного комплекса услуг;',
      'ритуальных принадлежностей (гроб, крест, венки и другие товары);',
      'необходимости ритуального транспорта;',
      'количества сопровождающих автомобилей;',
      'организации церемонии прощания;',
      'дополнительных пожеланий семьи.',
    ],
    note:
      'Мы заранее согласовываем перечень услуг и итоговую стоимость, чтобы родственники могли спокойно принять решение без спешки и неожиданностей.',
  },
  {
    id: 'price-info-included',
    title: 'Что входит в наши комплексы',
    intro:
      'В зависимости от выбранного пакета организация похорон может включать:',
    items: [
      'консультацию специалиста;',
      'помощь в организации похорон;',
      'подбор ритуальных принадлежностей;',
      'ритуальный транспорт;',
      'сопровождение церемонии;',
      'организацию захоронения;',
      'консультацию по необходимым документам.',
    ],
    note:
      'Если вам необходимы только отдельные услуги, их также можно заказать без оформления полного комплекса.',
  },
]

const expandedPriceCards = ref<string[]>([])

const isPriceCardExpanded = (id: string) =>
  expandedPriceCards.value.includes(id)

const togglePriceCard = (id: string) => {
  expandedPriceCards.value = isPriceCardExpanded(id)
    ? expandedPriceCards.value.filter(cardId => cardId !== id)
    : [...expandedPriceCards.value, id]
}

const packages: PricePackage[] = [
  {
    id: 'package-social',
    name: 'Социальные похороны',
    price: 'от 28 500 ₽',
    note:
      'Подходит для семей, которым требуется организация похорон с минимально необходимым набором услуг и соблюдением всех обязательных процедур.',
    included: [
      'Необходимая атрибутика, включая гроб',
      'Услуги похоронной бригады',
      'Копка могилы',
      'Катафалк',
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
      'Бесплатная доставка тела в морг',
      'Необходимая атрибутика, включая гроб, крест, венок',
      'Копка могилы',
      'Услуги похоронной бригады',
      'Катафалк',
      'Отпевание',
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
      'Бесплатная доставка тела в морг',
      'Ритуальная атрибутика премиум качества',
      'Копка могилы с возможностью выбора сектора захоронения',
      'Услуги похоронной бригады',
      'Катафалк и автотранспорт сопровождения',
      'Отпевание',
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
      'Бесплатная доставка в морг',
      'Эксклюзивная ритуальная атрибутика',
      'Копка могилы с возможностью выбора сектора захоронения',
      'Услуги похоронной бригады',
      'Катафалк и автобус сопровождения',
      'Отпевания',
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

const monumentPackages = [
  {
    id: 'monument-package-1',
    number: '1',
    price: '54 000 ₽',
    specs: [
      'Стела 80×40×8 см',
      'Тумба 50×15×15 см',
      'Надгробная плита 80×40×3 см',
    ],
  },
  {
    id: 'monument-package-2',
    number: '2',
    price: '65 000 ₽',
    specs: [
      'Стела 100×50×8 см',
      'Тумба 60×20×15 см',
      'Надгробная плита 100×50×5 см',
    ],
  },
  {
    id: 'monument-package-3',
    number: '3',
    price: '95 000 ₽',
    specs: [
      'Стела 120×60×8 см',
      'Тумба 70×20×15 см',
      'Надгробная плита 120×60×5 см',
    ],
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
          title="Основные ритуальные услуги в Мариуполе"
          description="Помогаем организовать похороны и решить связанные с ними вопросы в одном месте. Можно заказать полный комплекс сопровождения или выбрать только необходимые услуги: транспортировку умершего, ритуальный транспорт, принадлежности, консультацию по документам и организацию церемонии."
        />
        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :service="service"
            mobile-expandable
          />
        </div>
      </BaseContainer>
    </section>

    <section class="section bg-[#F7F9FB]">
      <BaseContainer>
        <div class="max-w-3xl">
          <h2>Стоимость ритуальных услуг в Мариуполе</h2>
          <p class="mt-4 text-text-muted">
            <span class="block">Гробы — от 6 000 до 55 000 ₽</span>
            <span class="block">Кресты — от 1 300 до 10 000 ₽</span>
            <span class="block">Венки — от 1 000 до 15 000 ₽</span>
            <span class="block">Широкий выбор постели и одежды для усопших</span>
          </p>
        </div>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <BaseCard
            v-for="item in priceSectionDetails"
            :key="item.id"
            class="h-full shadow-[0_10px_30px_rgba(12,30,50,0.08)]"
          >
            <h3 class="max-w-[18rem] text-[2rem] leading-[1.08]">
              {{ item.title }}
            </h3>
            <div
              class="mt-5"
              :class="!isPriceCardExpanded(item.id)
                ? 'max-h-[4.75rem] overflow-hidden md:max-h-none'
                : ''"
            >
              <p class="text-text-muted">
                {{ item.description }}
              </p>
            </div>
            <button
              type="button"
              class="mt-4 self-start text-sm font-medium text-primary md:hidden"
              @click="togglePriceCard(item.id)"
            >
              {{ isPriceCardExpanded(item.id) ? 'Свернуть' : 'Подробнее' }}
            </button>
          </BaseCard>
        </div>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <BaseCard
            v-for="block in priceInfoBlocks"
            :key="block.id"
            class="h-full shadow-[0_10px_30px_rgba(12,30,50,0.08)]"
          >
            <h3 class="max-w-[18rem] text-[2rem] leading-[1.08]">
              {{ block.title }}
            </h3>
            <div
              class="mt-5"
              :class="!isPriceCardExpanded(block.id)
                ? 'max-h-[4.75rem] overflow-hidden md:max-h-none'
                : ''"
            >
              <p class="text-text-muted">
                {{ block.intro }}
              </p>
              <ul class="mt-4 space-y-3 text-text-muted">
                <li v-for="item in block.items" :key="item">
                  — {{ item }}
                </li>
              </ul>
              <p v-if="block.note" class="mt-5 text-text-muted">
                {{ block.note }}
              </p>
            </div>
            <button
              type="button"
              class="mt-4 self-start text-sm font-medium text-primary md:hidden"
              @click="togglePriceCard(block.id)"
            >
              {{ isPriceCardExpanded(block.id) ? 'Свернуть' : 'Подробнее' }}
            </button>
          </BaseCard>
        </div>
        <div
          class="mt-8 flex flex-col gap-5 rounded-xl border border-border bg-surface px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8"
        >
          <p class="max-w-3xl text-text-muted">
            Не знаете, какой пакет выбрать? Позвоните нам по телефону +7 949 430 30 30. Мы бесплатно проконсультируем, расскажем о доступных вариантах и поможем подобрать оптимальное решение с учётом вашей ситуации и бюджета.
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
            <BaseButton
              :href="createPhoneLink(contacts.phone)"
              variant="primary"
              external
              class="mt-6 self-start"
            >
              Получить консультацию
            </BaseButton>
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
          title="Как проходит организация похорон в Мариуполе"
          description="Мы дорожим своей репутацией!"
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
              Более 10 лет на рынке ритуальных услуг
            </h2>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-[#DCE7F0]">
              Мы дорожим своей репутацией!
            </p>
            <ul class="mt-8 grid gap-3 text-[#DCE7F0] sm:grid-cols-2">
              <li class="sm:col-span-2">
                <span>Наши принципы:</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-[var(--color-rating)]">✓</span>
                <span>Честные цены</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-[var(--color-rating)]">✓</span>
                <span>Высокое качество услуги</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-[var(--color-rating)]">✓</span>
                <span>Индивидуальный подход к каждому клиенту</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-[var(--color-rating)]">✓</span>
                <span>Уважение к умершим</span>
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

    <section class="section bg-[#F7F9FB]">
      <BaseContainer>
        <div class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div class="lg:pl-6">
            <span
              class="inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
            >
              Каталог памятников
            </span>
            <h2 class="mt-6 max-w-xl">
              Памятники из гранита с установкой в Мариуполе
            </h2>
            <p class="mt-4 max-w-3xl text-text-muted">
              Помимо организации похорон мы изготавливаем и устанавливаем гранитные памятники в Мариуполе. В каталоге представлены вертикальные, горизонтальные и семейные памятники различных размеров. Выполняем художественное оформление, гравировку и установку.
            </p>
            <BaseButton
              href="/pamyatniki-mariupol#catalog"
              variant="primary"
              class="mt-8"
            >
              Перейти в каталог памятников
            </BaseButton>
          </div>

          <BaseCard class="overflow-hidden !p-0">
            <div
              v-for="item in monumentPackages"
              :key="item.id"
              class="grid gap-5 px-5 py-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-center md:px-6"
              :class="item.id !== monumentPackages[monumentPackages.length - 1]?.id
                ? 'border-b border-border'
                : ''"
            >
              <div class="flex gap-4">
                <div
                  class="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white"
                >
                  {{ item.number }}
                </div>
                <div>
                  <p
                    v-for="spec in item.specs"
                    :key="spec"
                    class="text-sm leading-6 text-text md:text-base"
                  >
                    {{ spec }}
                  </p>
                </div>
              </div>

              <div
                class="inline-flex items-center justify-center rounded-[14px] bg-primary px-6 py-4 text-2xl leading-none font-semibold text-white md:min-h-[88px]"
              >
                {{ item.price }}
              </div>
            </div>
          </BaseCard>
        </div>
        <p class="mt-6 text-sm text-text-muted">
          <span class="font-semibold text-text">Акция!</span>
          При заказе памятников, художественная резка в подарок! Акция
          действует до 01.09.2026.
        </p>
      </BaseContainer>
    </section>

    <MonumentsPhotoSlider />

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
