<script setup lang="ts">
import { servicePages } from '@/data/service-pages'

const page = servicePages['perevozka-umershih-mariupol']
</script>

<template>
  <ServicePageContent :page="page" />
</template>
