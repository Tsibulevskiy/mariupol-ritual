<template>
  <div
    class="fixed right-4 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-50 flex flex-col items-center gap-3 lg:right-8 lg:bottom-[calc(2rem+env(safe-area-inset-bottom))]"
  >
    <MessengerButton
      messenger="telegram"
      label="Telegram"
      variant="secondary"
      icon-only
    />
    <MessengerButton messenger="max" label="MAX" variant="secondary" icon-only />
    <ScrollToTopButton grouped />
  </div>
</template>
