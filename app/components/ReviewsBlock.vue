<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Review {
  author: string
  city: string
  text: string
}

const props = withDefaults(
  defineProps<{
    reviews?: Review[]
  }>(),
  {
    reviews: () => [],
  },
)

const fallbackReviews: Review[] = [
  {
    author: 'Анна',
    city: 'Мариуполь',
    text: 'Обращались в июне в «Мариупольский ритуальный дом». Нас сопровождала менеджер Виктория — огромное ей спасибо. Всё подробно объяснила, помогала на каждом этапе и всегда была на связи. Стоимость услуг оказалась понятной и без неожиданных доплат. Бригада сработала профессионально и организованно.',
  },
  {
    author: 'Александр',
    city: 'Мариуполь',
    text: 'Еще до 2022 года мы хоронили через «Мариупольский ритуальный дом» отца. Теперь пришлось обращаться снова. Очень рады, что компания продолжила работать. Всё было организовано чётко и вовремя. Машины приехали точно к назначенному времени, даже самый простой гроб выглядел достойно. Особенно приятно, что никто не навязывал лишние услуги.',
  },
  {
    author: 'Сергей',
    city: 'Мариуполь',
    text: 'По рекомендации соседей обратился в «Мариупольский ритуальный дом». До этого столкнулся с другой ритуальной службой, где сразу потребовали предоплату и не смогли подробно объяснить, какие услуги будут оказаны. В МРД всё оказалось иначе: спокойно проконсультировали, показали варианты ритуальных принадлежностей и помогли принять решение без какого-либо давления.',
  },
  {
    author: 'Наталья',
    city: 'Мариуполь',
    text: 'Спасибо за душевное отношение и поддержку в очень тяжелый момент. Девушки из офиса на улице Кальмиусской, 143 помогли разобраться с документами, спокойно объяснили порядок действий и организовали похороны достойно. В такие моменты особенно важно человеческое отношение.',
  },
  {
    author: 'Ирина',
    city: 'Мариуполь',
    text: 'Благодарим сотрудников за внимательность и уважительное отношение. Все организационные вопросы были решены быстро, спокойно и без лишних переживаний для семьи.',
  },
]

const items = computed(() =>
  props.reviews.length ? props.reviews : fallbackReviews,
)

const currentPage = ref(0)
const cardsPerView = ref(1)
const touchStartX = ref<number | null>(null)
const touchDeltaX = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null
let autoplayResumeTimer: ReturnType<typeof setTimeout> | null = null

const updateCardsPerView = () => {
  if (typeof window === 'undefined') {
    return
  }

  cardsPerView.value = window.innerWidth >= 1024 ? 2 : 1
  currentPage.value = Math.min(currentPage.value, totalPages.value - 1)
}

const totalPages = computed(() =>
  Math.max(1, Math.ceil(items.value.length / cardsPerView.value)),
)

const pagedItems = computed(() => {
  const pages: Array<Array<Review | null>> = []

  for (let index = 0; index < items.value.length; index += cardsPerView.value) {
    const page = items.value.slice(index, index + cardsPerView.value)

    while (page.length < cardsPerView.value) {
      page.push(null)
    }

    pages.push(page)
  }

  return pages
})

const scrollToPage = (page: number) => {
  if (!totalPages.value) {
    currentPage.value = 0
    return
  }

  if (page < 0) {
    currentPage.value = totalPages.value - 1
    return
  }

  if (page >= totalPages.value) {
    currentPage.value = 0
    return
  }

  currentPage.value = page
}

const goPrev = () => scrollToPage(currentPage.value - 1)
const goNext = () => scrollToPage(currentPage.value + 1)

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const startAutoplay = () => {
  stopAutoplay()

  autoplayTimer = setInterval(() => {
    goNext()
  }, 5000)
}

const scheduleAutoplayResume = () => {
  if (autoplayResumeTimer) {
    clearTimeout(autoplayResumeTimer)
  }

  stopAutoplay()
  autoplayResumeTimer = setTimeout(() => {
    startAutoplay()
  }, 7000)
}

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0]?.clientX ?? null
  touchDeltaX.value = 0
  scheduleAutoplayResume()
}

const handleTouchMove = (event: TouchEvent) => {
  if (touchStartX.value === null) {
    return
  }

  touchDeltaX.value = (event.touches[0]?.clientX ?? 0) - touchStartX.value
}

const handleTouchEnd = () => {
  if (touchStartX.value === null) {
    return
  }

  if (touchDeltaX.value <= -50) {
    goNext()
  } else if (touchDeltaX.value >= 50) {
    goPrev()
  }

  touchStartX.value = null
  touchDeltaX.value = 0
}

const handlePrevClick = () => {
  goPrev()
  scheduleAutoplayResume()
}

const handleNextClick = () => {
  goNext()
  scheduleAutoplayResume()
}

const handlePageClick = (page: number) => {
  scrollToPage(page)
  scheduleAutoplayResume()
}

onMounted(() => {
  updateCardsPerView()
  window.addEventListener('resize', updateCardsPerView)
  startAutoplay()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCardsPerView)
  stopAutoplay()

  if (autoplayResumeTimer) {
    clearTimeout(autoplayResumeTimer)
  }
})
</script>

<template>
  <section class="section">
    <BaseContainer>
      <SectionHeading
        title="Отзывы клиентов"
        description="Благодарим семьи, которые доверили нам организацию похорон и нашли силы поделиться своим опытом."
      />
      <div class="mt-10">
        <div class="flex items-center justify-between gap-4">
          <div class="flex gap-3">
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Предыдущие отзывы"
              @click="handlePrevClick"
            >
              <ChevronLeft :size="18" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Следующие отзывы"
              @click="handleNextClick"
            >
              <ChevronRight :size="18" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden items-center gap-2 sm:flex">
            <button
              v-for="page in totalPages"
              :key="page"
              type="button"
              class="h-2.5 rounded-full transition-all"
              :class="
                page - 1 === currentPage
                  ? 'w-8 bg-primary'
                  : 'w-2.5 bg-border hover:bg-primary/40'
              "
              :aria-label="`Перейти к отзыву ${page}`"
              @click="handlePageClick(page - 1)"
            />
          </div>
        </div>

        <div
          class="reviews-slider mt-6 overflow-hidden"
          @mouseenter="stopAutoplay"
          @mouseleave="startAutoplay"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div
            class="flex transition-transform duration-300 ease-out"
            :style="{ transform: `translateX(-${currentPage * 100}%)` }"
          >
            <div
              v-for="(page, pageIndex) in pagedItems"
              :key="pageIndex"
              class="w-full shrink-0"
            >
              <div class="grid gap-6 lg:grid-cols-2">
                <BaseCard
                  v-for="(review, index) in page"
                  :key="review ? `${review.author}-${pageIndex}-${index}` : `placeholder-${pageIndex}-${index}`"
                  class="flex h-full flex-col !p-8"
                  :class="review ? '' : 'hidden lg:flex opacity-0 pointer-events-none'"
                >
                  <template v-if="review">
                    <p class="text-lg tracking-[0.12em] text-[var(--color-rating)]">★★★★★</p>
                    <blockquote class="mt-5 flex-1 text-base leading-8 text-text-muted">
                      {{ review.text }}
                    </blockquote>
                    <p class="mt-6 font-semibold text-text">— {{ review.author }}</p>
                    <p class="mt-1 text-sm text-text-muted">{{ review.city }}</p>
                  </template>
                </BaseCard>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-center gap-2 sm:hidden">
          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            class="h-2.5 rounded-full transition-all"
            :class="
              page - 1 === currentPage
                ? 'w-8 bg-primary'
                : 'w-2.5 bg-border hover:bg-primary/40'
            "
            :aria-label="`Перейти к отзыву ${page}`"
            @click="handlePageClick(page - 1)"
          />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
.reviews-slider {
  scrollbar-width: none;
}

.reviews-slider::-webkit-scrollbar {
  display: none;
}
</style>
