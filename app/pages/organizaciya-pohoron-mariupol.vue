<script setup lang="ts">
import { servicePages } from '@/data/service-pages'

const page = servicePages['organizaciya-pohoron-mariupol']
</script>

<template>
  <ServicePageContent :page="page" />
</template>
