<script setup lang="ts">
import {
  CalendarDays,
  ChevronDown,
  FileText,
  Handshake,
  Landmark,
  Phone,
  Users,
} from 'lucide-vue-next'
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
const routeUrl = 'https://maps.google.com/?q='

const aboutReasons = [
  'Более 10 лет опыта',
  'Два офиса в Мариуполе',
  'Полный комплекс ритуальных услуг',
  'Круглосуточная консультация',
  'Собственный ритуальный транспорт',
  'Индивидуальный подход к каждой семье',
]

const aboutStats = [
  { icon: '🏛️', value: '10+', label: 'лет работы' },
  { icon: '📍', value: '2', label: 'офиса в Мариуполе' },
  { icon: '☎️', value: '24/7', label: 'приём обращений' },
  { icon: '⚱️', value: 'Все', label: 'ритуальные услуги' },
]

const aboutOffices = [
  {
    id: 'office-1',
    title: 'Офис №1',
    address: 'пер. Аэродромный, 48',
    mapSrc: 'https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=98987920401',
    photoSrc: '/Aerodromniy.webp',
    photoAlt: 'Офис Мариупольского ритуального дома на переулке Аэродромном, 48',
  },
  {
    id: 'office-2',
    title: 'Офис №2',
    address: 'ул. Кальмиусская, 143',
    mapSrc: 'https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=123368163615',
    photoSrc: '/kalmiuskaya.webp',
    photoAlt: 'Офис Мариупольского ритуального дома на улице Кальмиусской, 143',
  },
]

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
    number: '①',
    timelineTitle: 'Первый звонок',
    title: 'Первое обращение',
    description:
      'Позвоните нам в любое время суток. Специалист внимательно выслушает вашу ситуацию, ответит на первые вопросы и объяснит, какие действия необходимо выполнить в первую очередь. Консультация предоставляется бесплатно и помогает спокойно разобраться в дальнейших шагах.',
    icon: Phone,
  },
  {
    id: 'consultation',
    number: '②',
    timelineTitle: 'Консультация и согласование',
    title: 'Консультация и согласование',
    description:
      'Вместе с вами мы определяем необходимый перечень услуг, обсуждаем пожелания семьи, подбираем ритуальные принадлежности и заранее согласовываем стоимость. Вы получаете понятный план организации без скрытых платежей и неожиданных расходов.',
    icon: Handshake,
  },
  {
    id: 'documents-and-transport',
    number: '③',
    timelineTitle: 'Подготовка документов и транспорта',
    title: 'Подготовка документов и транспорта',
    description:
      'При необходимости консультируем по порядку оформления документов, организуем транспортировку тела, подготавливаем ритуальный транспорт и координируем дальнейшие организационные вопросы. Все действия выполняются в согласованной последовательности.',
    icon: FileText,
  },
  {
    id: 'ceremony-preparation',
    number: '④',
    timelineTitle: 'Подготовка церемонии',
    title: 'Подготовка церемонии',
    description:
      'Подбираем необходимые ритуальные принадлежности, согласовываем время проведения церемонии, организуем работу транспорта и помогаем подготовить всё необходимое для достойного прощания с близким человеком.',
    icon: CalendarDays,
  },
  {
    id: 'funeral-process',
    number: '⑤',
    timelineTitle: 'Проведение похорон',
    title: 'Проведение похорон',
    description:
      'Координируем проведение церемонии, сопровождаем организационные процессы и остаёмся на связи с семьёй. Наша задача — взять на себя все согласованные вопросы, чтобы родственники могли сосредоточиться на прощании с близким человеком.',
    icon: Users,
  },
  {
    id: 'after-support',
    number: '⑥',
    timelineTitle: 'Поддержка после похорон',
    title: 'Поддержка после похорон',
    description:
      'После проведения похорон мы продолжаем помогать семьям. При необходимости можно заказать изготовление и установку памятника, приобрести дополнительные ритуальные товары или получить консультацию по дальнейшим вопросам благоустройства места захоронения.',
    icon: Landmark,
  },
]

const activeOrganizationStep = ref(organizationSteps[0].id)

const currentOrganizationStep = computed(
  () =>
    organizationSteps.find((step) => step.id === activeOrganizationStep.value)
    ?? organizationSteps[0],
)

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
            :href="['organizaciya-pohoron-mariupol', 'ritualny-transport-mariupol', 'ritualnye-tovary-mariupol'].includes(service.slug) ? `/${service.slug}` : undefined"
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
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div class="max-w-3xl">
            <h2>Как проходит организация похорон в Мариуполе</h2>
            <p class="mt-4 text-text-muted">
              Мы сопровождаем семью на каждом этапе — от первого обращения до завершения церемонии. Специалист подробно объяснит порядок действий, поможет подобрать необходимые услуги и ответит на все возникающие вопросы.
            </p>
          </div>
          <div
            class="self-start rounded-[1.5rem] border border-[#31475D] bg-[#22384D] px-5 py-4 text-white shadow-lg shadow-black/10 md:max-w-[320px]"
          >
            <p class="text-sm font-semibold tracking-[0.08em] text-[#C8A24D] uppercase">
              Наш подход
            </p>
            <p class="mt-3 text-lg leading-tight font-semibold text-balance">
              Мы дорожим своей репутацией!
            </p>
          </div>
        </div>
        <div class="mt-10">
          <ol class="relative hidden items-start md:grid md:grid-cols-6 md:gap-4">
            <div
              class="absolute top-3.5 right-[6%] left-[6%] h-px bg-primary/25"
              aria-hidden="true"
            />
            <li
              v-for="step in organizationSteps"
              :key="`${step.id}-desktop`"
              class="relative z-10 flex flex-col items-center text-center"
            >
              <button
                type="button"
                class="group flex w-full flex-col items-center px-2"
                @mouseenter="activeOrganizationStep = step.id"
                @focus="activeOrganizationStep = step.id"
                @click="activeOrganizationStep = step.id"
              >
                <span
                  :class="[
                    'flex size-7 items-center justify-center rounded-full border text-xs font-semibold leading-none transition-colors',
                    activeOrganizationStep === step.id
                      ? 'border-primary bg-primary text-white'
                      : 'border-primary bg-background text-primary',
                  ]"
                >
                  {{ step.number.replace('①', '1').replace('②', '2').replace('③', '3').replace('④', '4').replace('⑤', '5').replace('⑥', '6') }}
                </span>
                <span
                  :class="[
                    'mt-6 flex size-[4.5rem] items-center justify-center rounded-full border bg-background transition-colors',
                    activeOrganizationStep === step.id
                      ? 'border-primary text-primary'
                      : 'border-primary/55 text-primary group-hover:border-primary/75',
                  ]"
                >
                  <component :is="step.icon" :size="28" stroke-width="1.75" />
                </span>
                <h3
                  :class="[
                    'mt-4 max-w-[11rem] text-[15px] leading-tight font-semibold transition-colors',
                    activeOrganizationStep === step.id ? 'text-text' : 'text-text',
                  ]"
                >
                  {{ step.timelineTitle }}
                </h3>
              </button>
            </li>
          </ol>
          <ol class="space-y-3 md:hidden">
            <li
              v-for="step in organizationSteps"
              :key="`${step.id}-mobile`"
              class="overflow-hidden rounded-xl border transition-colors"
              :class="activeOrganizationStep === step.id ? 'border-primary/35 bg-white shadow-sm' : 'border-border bg-surface'"
            >
              <button
                type="button"
                class="flex w-full items-center gap-4 px-4 py-4 text-left"
                @click="activeOrganizationStep = step.id"
              >
                <span
                  :class="[
                    'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold leading-none transition-colors',
                    activeOrganizationStep === step.id
                      ? 'bg-primary text-white'
                      : 'border border-primary/25 bg-primary/5 text-primary',
                  ]"
                >
                  {{ step.number.replace('①', '1').replace('②', '2').replace('③', '3').replace('④', '4').replace('⑤', '5').replace('⑥', '6') }}
                </span>
                <span class="min-w-0 flex-1 text-base leading-snug font-semibold text-text">
                  {{ step.timelineTitle }}
                </span>
                <ChevronDown
                  :size="18"
                  class="shrink-0 text-primary transition-transform"
                  :class="activeOrganizationStep === step.id ? 'rotate-180' : ''"
                />
              </button>
              <div v-if="activeOrganizationStep === step.id" class="border-t border-primary/10 px-4 pt-4 pb-4">
                <div class="flex items-start gap-4">
                  <span
                    class="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary"
                    aria-hidden="true"
                  >
                    <component :is="step.icon" :size="22" stroke-width="1.75" />
                  </span>
                  <div class="min-w-0">
                    <h3 class="text-[1.4rem] leading-[1.12]">
                      {{ step.title }}
                    </h3>
                    <p class="mt-4 text-text-muted">
                      {{ step.description }}
                    </p>
                  </div>
                </div>
                <div class="mt-5 rounded-xl border border-border bg-surface-alt p-4">
                  <div class="flex items-center gap-3">
                    <span
                      class="flex size-10 items-center justify-center rounded-full bg-white text-primary shadow-sm"
                      aria-hidden="true"
                    >
                      <Phone :size="18" />
                    </span>
                    <div>
                      <p class="text-sm text-text-muted">
                        Мы на связи 24/7
                      </p>
                      <a
                        :href="createPhoneLink(contacts.phone)"
                        class="mt-1 block text-lg font-semibold text-text no-underline"
                      >
                        {{ contacts.phone }}
                      </a>
                    </div>
                  </div>
                  <BaseButton
                    :href="createPhoneLink(contacts.phone)"
                    variant="primary"
                    external
                    class="mt-4 w-full justify-center"
                  >
                    Позвонить сейчас
                  </BaseButton>
                </div>
              </div>
            </li>
          </ol>
          <BaseCard class="mt-10 hidden overflow-hidden !p-0 md:block">
            <div class="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div class="flex flex-col p-6 sm:p-8 lg:p-10">
                <div class="flex items-center gap-4">
                  <span
                    class="flex size-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-3xl leading-none"
                    aria-hidden="true"
                  >
                    <component
                      :is="currentOrganizationStep.icon"
                      :size="30"
                      class="text-primary"
                      stroke-width="1.75"
                    />
                  </span>
                  <div>
                    <p class="text-sm font-semibold tracking-[0.18em] text-primary">
                      {{ currentOrganizationStep.number }}
                    </p>
                    <h3 class="mt-2 text-[1.9rem] leading-[1.08]">
                      {{ currentOrganizationStep.title }}
                    </h3>
                  </div>
                </div>
                <p class="mt-8 max-w-2xl text-text-muted">
                  {{ currentOrganizationStep.description }}
                </p>
                <div class="mt-8 flex flex-col gap-4 sm:flex-row">
                  <div
                    class="flex min-h-16 flex-1 items-center gap-4 rounded-xl border border-border bg-surface-alt px-5 py-4"
                  >
                    <span
                      class="flex size-11 items-center justify-center rounded-full bg-white text-primary shadow-sm"
                      aria-hidden="true"
                    >
                      <Phone :size="20" />
                    </span>
                    <div>
                      <p class="text-sm text-text-muted">
                        Мы на связи 24/7
                      </p>
                      <a
                        :href="createPhoneLink(contacts.phone)"
                        class="mt-1 block font-semibold text-text no-underline"
                      >
                        {{ contacts.phone }}
                      </a>
                    </div>
                  </div>
                  <BaseButton
                    :href="createPhoneLink(contacts.phone)"
                    variant="primary"
                    external
                    class="sm:self-stretch"
                  >
                    Позвонить сейчас
                  </BaseButton>
                </div>
              </div>
              <div class="relative min-h-[280px] border-t border-border lg:min-h-full lg:border-t-0 lg:border-l">
                <img
                  src="/organization-step-photo.webp"
                  alt="Ритуальный телефон и фирменное оформление офиса"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5" />
              </div>
            </div>
          </BaseCard>
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

    <WhatToDoBlock />

    <TrustBlock />

    <section id="about-company" class="section bg-[#22384D]">
      <BaseContainer>
        <div class="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <div class="max-w-4xl">
            <span
              class="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/70"
            >
              О компании
            </span>
            <h2 class="mt-6 max-w-xl text-balance text-h2 font-heading text-white">
              Мариупольский ритуальный дом — более 10 лет рядом с семьями города
            </h2>
            <p class="mt-6 max-w-3xl text-lg leading-8 text-[#DCE7F0]">
              Уже более 10 лет Мариупольский ритуальный дом помогает семьям в организации похорон и решении связанных с этим вопросов. Мы понимаем, насколько важно в такой момент получить спокойную консультацию, понятные ответы и профессиональную поддержку. Поэтому стараемся взять на себя организационные вопросы, чтобы родственники могли уделить больше внимания прощанию с близким человеком.
            </p>
            <p class="mt-5 max-w-3xl text-lg leading-8 text-[#DCE7F0]">
              Сегодня для вашего удобства работают два офиса в Мариуполе, где можно получить консультацию, ознакомиться с ритуальными принадлежностями, выбрать необходимые товары и оформить услуги. Мы также оказываем помощь по вопросам организации похорон, транспортировки, изготовления памятников и других ритуальных услуг.
            </p>
            <ul class="mt-8 grid gap-3 text-[#DCE7F0] sm:grid-cols-2">
              <li class="sm:col-span-2">
                <span class="font-semibold text-white">Почему семьи обращаются к нам</span>
              </li>
              <li
                v-for="reason in aboutReasons"
                :key="reason"
                class="flex items-center gap-3"
              >
                <span class="text-[var(--color-rating)]">✓</span>
                <span>{{ reason }}</span>
              </li>
            </ul>

          </div>

          <div class="space-y-5 xl:pl-4">
            <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
              <article
                v-for="office in aboutOffices"
                :key="office.id"
                class="overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/6 shadow-lg shadow-black/10"
              >
                <iframe
                  :src="office.mapSrc"
                  width="560"
                  height="400"
                  frameborder="0"
                  class="h-[240px] w-full border-b border-white/10"
                  :title="`Карта офиса: ${office.address}`"
                  loading="lazy"
                />
                <div class="grid gap-0 sm:grid-cols-[1fr_220px]">
                  <div class="px-6 py-5">
                    <p class="text-sm font-semibold tracking-[0.12em] text-[#C8A24D] uppercase">
                      {{ office.title }}
                    </p>
                    <p class="mt-4 text-sm text-[#DCE7F0]">Офис</p>
                    <a
                      :href="`${routeUrl}${encodeURIComponent(office.address + ', Мариуполь')}`"
                      class="mt-2 inline-flex text-base font-semibold text-white no-underline hover:text-[#C8A24D]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ office.address }}
                    </a>
                  </div>
                  <div class="min-h-40 border-t border-white/10 bg-[#294158] sm:border-t-0 sm:border-l">
                    <NuxtImg
                      v-if="office.photoSrc"
                      :src="office.photoSrc"
                      :alt="office.photoAlt"
                      width="220"
                      height="160"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div
                      v-else
                      class="flex h-full items-center justify-center px-5 py-5 text-center"
                    >
                      <p class="text-sm leading-6 text-[#DCE7F0]">
                      Фото офиса будет добавлено после получения реального изображения.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>

          </div>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="item in aboutStats"
            :key="item.label"
            class="rounded-[1.25rem] border border-white/12 bg-white/8 px-5 py-5"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl leading-none" aria-hidden="true">
                {{ item.icon }}
              </span>
              <p class="text-[1.9rem] leading-none font-semibold text-white">
                {{ item.value }}
              </p>
            </div>
            <p class="mt-3 text-sm leading-6 text-[#DCE7F0]">
              {{ item.label }}
            </p>
          </div>
        </div>

        <div
          class="mt-8 flex flex-col gap-5 rounded-[1.5rem] border border-white/12 bg-white/8 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8"
        >
          <div>
            <h3 class="text-[1.6rem] leading-[1.15] text-white">
              Нужна консультация?
            </h3>
            <p class="mt-3 max-w-2xl text-[#DCE7F0]">
              Мы готовы ответить на ваши вопросы в любое время суток.
            </p>
          </div>
          <CallButton label="Позвонить" />
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
