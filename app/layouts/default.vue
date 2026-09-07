<script setup lang="ts">
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'

const route = useRoute()
const { data: banner } = await useFetch('/api/banner', {
  key: 'public-banner',
  server: true,
  default: () => null,
})
</script>

<template>
  <div>
    <div class="min-h-screen pb-20 lg:pb-0">
      <AppHeader />
      <InformationNotice
        v-if="route.path === '/' && banner"
        :notice="banner"
      />
      <main>
        <slot />
      </main>
      <AppFooter />
    </div>
    <ScrollToTopButton />
    <MobileContactBar />
  </div>
</template>
