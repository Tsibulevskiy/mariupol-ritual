<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { contacts } from '@/config/contacts'
import { createPhoneLink } from '@/utils/contact-links'

const isMenuOpen = ref(false)
const menuButton = ref<HTMLButtonElement>()
const route = useRoute()

const navigation = [
  { label: 'Услуги', href: '/#services' },
  { label: 'Цены', href: '/#service-packages' },
  { label: 'Что делать', href: '/#faq' },
  { label: 'О компании', href: '/#about-company' },
]

const closeMenu = (restoreFocus = false) => {
  if (!isMenuOpen.value) return

  isMenuOpen.value = false

  if (restoreFocus) {
    nextTick(() => menuButton.value?.focus())
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu(true)
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)
onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <header class="bg-surface">
    <div class="mx-auto max-w-[1200px] px-4 lg:px-6">
      <div class="flex min-h-[88px] items-center justify-between gap-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center no-underline"
        >
          <img
            src="/mariupol-ritual-house-logo.svg"
            alt="Мариупольский ритуальный дом"
            class="h-auto w-[180px] shrink-0 sm:w-[220px]"
            width="220"
            height="40"
          />
        </NuxtLink>

        <nav
          class="hidden items-center gap-7 lg:flex"
          aria-label="Основная навигация"
        >
          <NuxtLink
            v-for="item in navigation"
            :key="item.href"
            :to="item.href"
            class="inline-flex min-h-11 items-center text-sm font-medium text-text no-underline hover:text-primary"
            :aria-current="route.path === item.href ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden items-center gap-4 lg:flex">
          <a
            :href="createPhoneLink(contacts.phone)"
            class="inline-flex min-h-11 items-center text-sm font-medium text-text no-underline hover:text-primary"
            aria-label="Позвонить по телефону"
          >
            {{ contacts.phone }}
          </a>
          <CallButton label="Позвонить" />
        </div>

        <button
          ref="menuButton"
          type="button"
          class="inline-flex size-12 items-center justify-center rounded-xl text-text hover:bg-surface-alt lg:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
          :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <X v-if="isMenuOpen" :size="24" aria-hidden="true" />
          <Menu v-else :size="24" aria-hidden="true" />
        </button>
      </div>

      <nav
        v-if="isMenuOpen"
        id="mobile-navigation"
        class="border-t border-border py-4 lg:hidden"
        aria-label="Мобильная навигация"
      >
        <NuxtLink
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          class="block rounded-lg px-3 py-3 font-medium text-text no-underline hover:bg-surface-alt"
          :aria-current="route.path === item.href ? 'page' : undefined"
          @click="closeMenu()"
        >
          {{ item.label }}
        </NuxtLink>
        <a
          :href="createPhoneLink(contacts.phone)"
          class="mt-2 block rounded-lg px-3 py-3 font-medium text-text no-underline hover:bg-surface-alt"
        >
          {{ contacts.phone }}
        </a>
      </nav>
    </div>
  </header>
</template>
