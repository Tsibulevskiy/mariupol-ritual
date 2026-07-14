<script setup lang="ts">
const isVisible = ref(false)

const updateVisibility = () => {
  isVisible.value = window.scrollY > 320
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisibility)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-2 opacity-0"
  >
    <button
      v-if="isVisible"
      type="button"
      class="fixed right-4 bottom-24 z-40 inline-flex size-14 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white text-primary shadow-[0_10px_24px_rgba(12,30,50,0.14)] hover:bg-[var(--color-primary-soft)] lg:right-8 lg:bottom-8"
      aria-label="Вернуться наверх"
      @click="scrollToTop"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="shrink-0"
      >
        <path
          d="M10 14V6"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
        />
        <path
          d="M6.75 9.25L10 6L13.25 9.25"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </Transition>
</template>
