<template>
  <section class="section">
    <BaseContainer>
      <SectionHeading
        title="Отзывы клиентов"
        description="Благодарим семьи, которые доверили нам организацию похорон и нашли силы поделиться своим опытом."
      />

      <div class="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <p class="mb-4 text-lg font-semibold text-text">Офис на пер. Аэродромном, 48</p>
          <div class="reviews-widget relative w-full rounded-xl">
            <iframe
              title="Отзывы клиентов офиса на переулке Аэродромном"
              class="h-full w-full rounded-xl border border-border"
              src="https://yandex.ru/maps-reviews-widget/98987920401?comments"
              loading="lazy"
              scrolling="yes"
            />
            <a
              href="https://yandex.com/maps/org/mariupolskiy_ritualny_dom/98987920401/"
              target="_blank"
              rel="noopener noreferrer"
              class="absolute right-0 bottom-2 left-0 overflow-hidden px-4 text-center text-[10px] whitespace-nowrap text-[#b3b3b3] text-ellipsis"
            >
              Мариупольский ритуальный дом на карте Мариуполя — Яндекс Карты
            </a>
          </div>
        </div>

        <div class="hidden md:block">
          <p class="mb-4 text-lg font-semibold text-text">Офис на ул. Кальмиусской, 143</p>
          <div class="reviews-widget relative w-full rounded-xl">
            <iframe
              title="Отзывы клиентов офиса на улице Кальмиусской"
              class="h-full w-full rounded-xl border border-border"
              src="https://yandex.ru/maps-reviews-widget/123368163615?comments"
              loading="lazy"
              scrolling="yes"
            />
            <a
              href="https://yandex.com/maps/org/mariupolskiy_ritualny_dom/123368163615/"
              target="_blank"
              rel="noopener noreferrer"
              class="absolute right-0 bottom-2 left-0 overflow-hidden px-4 text-center text-[10px] whitespace-nowrap text-[#b3b3b3] text-ellipsis"
            >
              Мариупольский ритуальный дом на карте Мариуполя — Яндекс Карты
            </a>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
.reviews-widget {
  min-height: 500px;
  height: min(800px, 75vh);
}

@media (max-width: 640px) {
  .reviews-widget {
    height: 70vh;
  }
}
</style>
