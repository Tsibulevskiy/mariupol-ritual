<script setup lang="ts">
import { Clock, Gift, HeartHandshake, Phone, ShieldCheck, Zap } from 'lucide-vue-next'
import { contacts } from '@/config/contacts'
import { createPhoneLink } from '@/utils/contact-links'

const benefits = [
  {
    title: 'Круглосуточная помощь 24/7',
    icon: Clock,
  },
  {
    title: 'Быстрая организация',
    icon: Zap,
  },
  {
    title: 'Честные цены',
    icon: ShieldCheck,
  },
  {
    title: 'Полное сопровождение',
    icon: HeartHandshake,
  },
]
</script>

<template>
  <section class="hero-section relative px-4 pt-6 pb-12 lg:px-6 lg:pt-10 lg:pb-24">
    <div class="mx-auto max-w-[1200px] lg:px-6">
      <div class="flex min-h-[520px] items-center">
        <div class="w-full lg:max-w-[60%]">
          <div
            class="hero-offer mb-8 w-full max-w-[560px] rounded-[18px] border px-5 py-5 lg:hidden"
          >
            <p class="flex items-center gap-2 text-sm font-semibold text-white">
              <Gift :size="16" aria-hidden="true" class="text-[var(--color-rating)]" />
              <span>Специальное предложение</span>
            </p>
            <p class="mt-5 text-[22px] leading-[1.1] font-bold text-white uppercase">
              Бесплатная
              <br />
              <span class="normal-case">транспортировка тела в морг</span>
            </p>
            <a
              :href="createPhoneLink(contacts.phone)"
              class="mt-4 inline-flex font-serif text-[2.2rem] leading-tight font-bold text-white no-underline sm:text-[35px]"
              aria-label="Позвонить по номеру + 7 949 430 30 30"
            >
              + 7 949 430 30 30
            </a>
          </div>

          <h1
            class="max-w-[520px] font-serif text-[2.5rem] leading-[1.08] font-bold text-white sm:text-[3rem] lg:max-w-[680px] lg:text-[56px]"
          >
            Ритуальные услуги
            <br />
            в Мариуполе
          </h1>

          <p
            class="mt-6 max-w-[520px] text-[1rem] leading-[1.7] text-white/82 sm:text-[18px] lg:max-w-[640px]"
          >
            Организация похорон под ключ, ритуальный транспорт,
            перевозка умерших, принадлежности и помощь
            с документами. Круглосуточно.
          </p>

          <div class="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              :href="createPhoneLink(contacts.phone)"
              class="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] bg-primary px-7 py-4 text-base font-semibold text-white no-underline hover:bg-primary-hover"
              aria-label="Позвонить сейчас"
            >
              <Phone :size="18" aria-hidden="true" />
              <span>Позвонить сейчас</span>
            </a>
            <a
              href="#service-packages"
              class="inline-flex min-h-[52px] items-center justify-center rounded-[10px] border border-border bg-surface px-7 py-4 text-base font-semibold text-text no-underline hover:bg-surface-alt"
            >
              Узнать стоимость
            </a>
          </div>

        </div>
      </div>
    </div>
    <div
      class="mt-10 lg:absolute lg:top-14 lg:right-0 lg:left-0 lg:mt-0 lg:mx-auto lg:max-w-[1200px] lg:px-6"
    >
      <div
        class="mb-6 hidden justify-end lg:flex"
      >
        <div
          class="hero-offer w-full max-w-[380px] rounded-[18px] border px-6 py-5"
        >
          <p class="flex items-center gap-2 text-sm font-semibold text-white">
            <Gift :size="16" aria-hidden="true" class="text-[var(--color-rating)]" />
            <span>Специальное предложение</span>
          </p>
          <p class="mt-5 text-[22px] leading-[1.1] font-bold text-white uppercase">
            Бесплатная
            <br />
            <span class="normal-case">транспортировка тела в морг</span>
          </p>
          <a
            :href="createPhoneLink(contacts.phone)"
            class="mt-4 inline-flex font-serif text-[2.2rem] leading-tight font-bold text-white no-underline"
            aria-label="Позвонить по номеру + 7 949 430 30 30"
          >
            + 7 949 430 30 30
          </a>
        </div>
      </div>
    </div>
    <div
      class="mt-5 lg:absolute lg:right-0 lg:bottom-8 lg:left-0 lg:mt-0 lg:mx-auto lg:max-w-[1200px] lg:px-6"
    >
      <div
        class="grid grid-cols-2 gap-x-5 gap-y-5 rounded-[18px] border border-border/80 bg-surface/95 px-4 py-5 shadow-sm backdrop-blur-[2px] sm:px-5 lg:grid-cols-4 lg:gap-0 lg:px-6"
      >
        <div
          v-for="item in benefits"
          :key="item.title"
          class="flex items-center gap-3 lg:px-6 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-border"
        >
          <component
            :is="item.icon"
            :size="20"
            class="shrink-0 text-primary"
            aria-hidden="true"
          />
          <p class="text-sm leading-5 font-medium text-text">
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-offer {
  animation: hero-offer-enter 560ms ease-out both;
  border-color: rgb(255 255 255 / 10%);
  background: rgb(16 34 51 / 88%);
  color: white;
  box-shadow: 0 16px 36px rgb(16 34 51 / 22%);
}

.hero-section {
  background-color: var(--color-background);
  background-image:
    linear-gradient(
      90deg,
      rgb(10 22 36 / 92%) 0%,
      rgb(18 36 58 / 80%) 42%,
      rgb(18 36 58 / 20%) 100%
    ),
    url('/hero1.png');
  background-position: center center, right center;
  background-repeat: no-repeat;
  background-size: cover, cover;
}

@keyframes hero-offer-enter {
  from {
    opacity: 0;
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }

  to {
    opacity: 1;
    transform: scale(1.03);
    box-shadow: 0 16px 36px rgb(29 39 50 / 14%);
  }
}

@media (max-width: 63.9375rem) {
  .hero-section {
    background-image:
      linear-gradient(
        180deg,
        rgb(10 22 36 / 93%) 0%,
        rgb(18 36 58 / 82%) 42%,
        rgb(18 36 58 / 34%) 74%,
        rgb(18 36 58 / 18%) 100%
      ),
      url('/hero1.png');
    background-position: center top, center bottom;
  }
}
</style>
