<script setup lang="ts">
import { servicePages } from '@/data/service-pages'

const page = servicePages['ritualny-transport-mariupol']
</script>

<template>
  <ServicePageContent :page="page" />
</template>
