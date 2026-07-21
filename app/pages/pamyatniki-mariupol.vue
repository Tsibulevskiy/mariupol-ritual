<script setup lang="ts">
import { servicePages } from '@/data/service-pages'

const page = servicePages['pamyatniki-mariupol']
</script>

<template>
  <ServicePageContent :page="page" />
</template>
