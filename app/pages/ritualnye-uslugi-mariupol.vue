<script setup lang="ts">
import { servicePages } from '@/data/service-pages'

const page = servicePages['ritualnye-uslugi-mariupol']
</script>

<template>
  <ServicePageContent :page="page" />
</template>
