<script setup lang="ts">
import { contacts } from '@/config/contacts'
import { createPhoneLink } from '@/utils/contact-links'
</script>

<template>
  <section class="section">
    <BaseContainer>
      <div>
        <SectionHeading
          title="Свяжитесь с нами"
          description="Ответим на вопросы и поможем уточнить дальнейшие действия."
        />
        <dl class="mt-8 space-y-5">
          <div>
            <dt class="font-semibold">Телефон</dt>
            <dd>
              <a
                :href="createPhoneLink(contacts.phone)"
                class="inline-flex min-h-11 items-center text-primary"
                aria-label="Позвонить по телефону"
              >
                {{ contacts.phone }}
              </a>
            </dd>
          </div>
          <div>
            <dt class="font-semibold">Адрес</dt>
            <dd class="text-text-muted">{{ contacts.address }}</dd>
          </div>
          <div>
            <dt class="font-semibold">Время работы</dt>
            <dd class="text-text-muted">{{ contacts.workingHours }}</dd>
          </div>
        </dl>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <CallButton />
          <MessengerButton messenger="telegram" />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>
