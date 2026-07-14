<script setup lang="ts">
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
</script>

<template>
  <div>
    <div class="min-h-screen pb-20 lg:pb-0">
      <AppHeader />
      <main>
        <slot />
      </main>
      <AppFooter />
    </div>
    <ScrollToTopButton />
    <MobileContactBar />
  </div>
</template>
