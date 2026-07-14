<template>
  <div
    class="mobile-contact-bar hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface p-3 shadow-lg lg:hidden"
  >
    <BaseContainer>
      <div class="grid grid-cols-2 gap-3">
        <CallButton label="Позвонить" full-width />
        <MessengerButton messenger="telegram" label="Telegram" full-width />
      </div>
    </BaseContainer>
  </div>
</template>
