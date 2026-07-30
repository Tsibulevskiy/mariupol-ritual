<script setup lang="ts">
import { servicePages } from '@/data/service-pages'

const page = servicePages['pamyatniki-mariupol']
const route = useRoute()
const hasChildRoute = computed(() => Boolean(route.params.slug))
</script>

<template>
  <NuxtPage v-if="hasChildRoute" />
  <ServicePageContent v-else :page="page" />
</template>
