<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Фотографии памятников',
})

const monumentSlideFiles = [
  '1.webp',
  '2.webp',
  '3.webp',
  '4.webp',
  '5.webp',
  '6.webp',
  '7.webp',
  '8.webp',
  '9.webp',
  '10.webp',
  '11.webp',
  '14.webp',
  '15.webp',
  '21.webp',
  '23.webp',
  '26.webp',
  '27.webp',
  '28.webp',
  '29.webp',
  '30.webp',
  '31.webp',
  '32.webp',
  '32.1.webp',
  '33.webp',
  '33.1.webp',
  '34.1.webp',
  '35.webp',
  '37.webp',
  '39.webp',
  '40.webp',
  '41.webp',
  '42.webp',
  '42.1.webp',
  '43.webp',
  '44.webp',
]

const monumentSlides = monumentSlideFiles.map((fileName, index) => ({
  src: `/monuments-slider/${fileName}`,
  alt: `Фотография памятника ${index + 1}`,
}))

const monumentSlidesTrack = [...monumentSlides, ...monumentSlides]
</script>

<template>
  <section class="section bg-[#F7F9FB]">
    <BaseContainer>
      <SectionHeading :title="title" />
    </BaseContainer>
    <div class="monuments-slider-shell mt-4">
      <div class="monuments-slider-track">
        <div
          v-for="(slide, index) in monumentSlidesTrack"
          :key="`${slide.src}-${index}`"
          class="monuments-slide"
        >
          <div class="monuments-slide-media">
            <NuxtImg
              :src="slide.src"
              :alt="slide.alt"
              width="720"
              height="960"
              class="h-full w-full object-cover"
              loading="lazy"
            />
            <div class="monuments-slide-gradient" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.monuments-slider-shell {
  position: relative;
  overflow: hidden;
  padding-inline: 1rem;
}

.monuments-slider-shell::before,
.monuments-slider-shell::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: 3rem;
  pointer-events: none;
}

.monuments-slider-shell::before {
  left: 0;
  background: linear-gradient(to right, #f7f9fb 0%, rgba(247, 249, 251, 0) 100%);
}

.monuments-slider-shell::after {
  right: 0;
  background: linear-gradient(to left, #f7f9fb 0%, rgba(247, 249, 251, 0) 100%);
}

.monuments-slider-shell:hover .monuments-slider-track {
  animation-play-state: paused;
}

.monuments-slider-track {
  display: flex;
  width: max-content;
  gap: 0.75rem;
  animation: monuments-slider-scroll 48s linear infinite;
}

.monuments-slide {
  height: 170px;
  width: 128px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 1rem;
}

.monuments-slide-media {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: inherit;
  background: #22384d;
  transition: filter 180ms ease, transform 180ms ease;
}

.monuments-slide-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(12, 18, 24, 0.5) 0%, rgba(12, 18, 24, 0.14) 38%, rgba(12, 18, 24, 0) 72%);
}

.monuments-slide:hover .monuments-slide-media {
  filter: brightness(1.04) contrast(1.03);
}

@media (min-width: 640px) {
  .monuments-slider-shell {
    padding-inline: 1.5rem;
  }

  .monuments-slider-shell::before,
  .monuments-slider-shell::after {
    width: 4.5rem;
  }

  .monuments-slide {
    width: 128px;
  }
}

@keyframes monuments-slider-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 0.375rem));
  }
}
</style>
