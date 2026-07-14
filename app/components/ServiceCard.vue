<script setup lang="ts">
import {
  Box,
  CarFront,
  FileText,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-vue-next'
import type { Service } from '@/types/content'

const props = defineProps<{
  service: Service
  href?: string
}>()

const icons = {
  box: Box,
  carFront: CarFront,
  fileText: FileText,
  heartHandshake: HeartHandshake,
  phone: Phone,
  shieldCheck: ShieldCheck,
  users: Users,
} as const

const icon = computed(() =>
  props.service.icon ? icons[props.service.icon as keyof typeof icons] : null,
)
</script>

<template>
  <NuxtLink
    v-if="href"
    :to="href"
    class="block h-full no-underline"
    :aria-label="service.name"
  >
    <BaseCard class="flex h-full flex-col shadow-[0_10px_30px_rgba(12,30,50,0.08)]">
      <div
        v-if="icon"
        class="flex size-11 items-center justify-center rounded-xl bg-[var(--color-primary-soft)]"
      >
        <component
          :is="icon"
          :size="22"
          class="text-primary"
          aria-hidden="true"
        />
      </div>
      <h3 class="mt-5">{{ service.name }}</h3>
      <p class="mt-3 flex-1 text-text-muted">{{ service.description }}</p>
    </BaseCard>
  </NuxtLink>
  <BaseCard v-else class="flex h-full flex-col shadow-[0_10px_30px_rgba(12,30,50,0.08)]">
    <div
      v-if="icon"
      class="flex size-11 items-center justify-center rounded-xl bg-[var(--color-primary-soft)]"
    >
      <component
        :is="icon"
        :size="22"
        class="text-primary"
        aria-hidden="true"
      />
    </div>
    <h3 class="mt-5">{{ service.name }}</h3>
    <p class="mt-3 flex-1 text-text-muted">{{ service.description }}</p>
  </BaseCard>
</template>
