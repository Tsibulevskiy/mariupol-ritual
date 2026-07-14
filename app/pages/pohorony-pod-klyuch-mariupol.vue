<script setup lang="ts">
import { servicePages } from '@/data/service-pages'

const page = servicePages['pohorony-pod-klyuch-mariupol']
</script>

<template>
  <ServicePageContent :page="page" />
</template>
