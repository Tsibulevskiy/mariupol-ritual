<script setup lang="ts">
import { MapPin, Phone } from 'lucide-vue-next'
import { contacts } from '@/config/contacts'
import { siteConfig } from '@/config/site'
import { createPhoneLink } from '@/utils/contact-links'

const currentYear = new Date().getFullYear()
const addresses = contacts.address.split(';').map((item) => item.trim())
</script>

<template>
  <footer
    class="border-t border-[color:var(--color-primary-hover)] bg-[var(--color-background-dark)] py-12 text-white"
  >
    <BaseContainer>
      <div class="grid gap-8 md:grid-cols-3">
        <div>
          <div>
            <img
              src="/mariupol-ritual-house-logo-white.svg"
              alt="Мариупольский ритуальный дом"
              class="h-auto w-[220px] max-w-full"
              width="220"
              height="40"
            />
          </div>
        </div>
        <div>
          <p class="font-semibold text-white">Контакты</p>
          <div class="mt-3 space-y-4">
            <div class="flex items-start gap-3">
              <Phone :size="18" class="mt-1 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <a
                  :href="createPhoneLink(contacts.phone)"
                  class="inline-flex min-h-7 items-center text-[var(--color-primary-muted)] hover:text-white"
                  aria-label="Позвонить по телефону"
                >
                  {{ contacts.phone }}
                </a>
                <p class="text-sm text-[var(--color-primary-muted)]">{{ contacts.workingHours }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <MapPin :size="18" class="mt-1 shrink-0 text-primary" aria-hidden="true" />
              <div class="space-y-1">
                <p
                  v-for="address in addresses"
                  :key="address"
                  class="text-[var(--color-primary-muted)]"
                >
                  {{ address }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="Дополнительная навигация">
          <p class="font-semibold text-white">Информация</p>
          <NuxtLink
            to="/politika-konfidencialnosti"
            class="mt-2 flex min-h-11 items-center text-[var(--color-primary-muted)] hover:text-white"
          >
            Политика конфиденциальности
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="flex min-h-11 items-center text-[var(--color-primary-muted)] hover:text-white"
          >
            Пользовательское соглашение
          </NuxtLink>
          <NuxtLink
            to="/personal-data-consent"
            class="flex min-h-11 items-center text-[var(--color-primary-muted)] hover:text-white"
          >
            Согласие на обработку персональных данных
          </NuxtLink>
          <NuxtLink
            to="/cookie-policy"
            class="flex min-h-11 items-center text-[var(--color-primary-muted)] hover:text-white"
          >
            Согласие на использование файлов Cookie
          </NuxtLink>
        </nav>
      </div>
      <div
        class="mt-10 flex flex-col gap-3 border-t border-[color:var(--color-primary-hover)] pt-6 text-sm text-[var(--color-primary-muted)] md:flex-row md:items-center md:justify-between"
      >
        <p>© {{ currentYear }} {{ siteConfig.name }}</p>
        <p class="text-left md:text-right">Creator / Roman Tsybulevskyi</p>
      </div>
    </BaseContainer>
  </footer>
</template>
