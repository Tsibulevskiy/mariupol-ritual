<script setup lang="ts">
interface ContactFormData {
  name: string
  phone: string
  comment: string
}

const emit = defineEmits<{
  submit: [data: ContactFormData]
}>()

const form = reactive({
  name: '',
  phone: '',
  comment: '',
  consent: false,
})

const errors = reactive({
  phone: '',
  consent: '',
})

const phoneInput = ref<HTMLInputElement>()
const consentInput = ref<HTMLInputElement>()

const submitForm = () => {
  errors.phone = form.phone.trim().length >= 5 ? '' : 'Укажите номер телефона.'
  errors.consent = form.consent
    ? ''
    : 'Необходимо согласие на обработку данных.'

  if (errors.phone || errors.consent) {
    nextTick(() => {
      if (errors.phone) {
        phoneInput.value?.focus()
      } else {
        consentInput.value?.focus()
      }
    })
    return
  }

  emit('submit', {
    name: form.name.trim(),
    phone: form.phone.trim(),
    comment: form.comment.trim(),
  })
}
</script>

<template>
  <BaseCard id="contact-form">
    <form novalidate @submit.prevent="submitForm">
      <h2 class="text-3xl">Заказать обратный звонок</h2>
      <p class="mt-3 text-text-muted">
        Оставьте телефон, чтобы мы могли связаться с вами.
      </p>

      <div class="mt-8 space-y-5">
        <div>
          <label for="contact-name" class="mb-2 block font-semibold">Имя</label>
          <input
            id="contact-name"
            v-model="form.name"
            name="name"
            autocomplete="name"
            class="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3"
          />
        </div>

        <div>
          <label for="contact-phone" class="mb-2 block font-semibold"
            >Телефон</label
          >
          <input
            id="contact-phone"
            ref="phoneInput"
            v-model="form.phone"
            name="phone"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            required
            :aria-invalid="Boolean(errors.phone)"
            :aria-describedby="errors.phone ? 'contact-phone-error' : undefined"
            :class="[
              'min-h-12 w-full rounded-xl border bg-surface px-4 py-3',
              errors.phone ? 'border-error' : 'border-border',
            ]"
          />
          <p
            v-if="errors.phone"
            id="contact-phone-error"
            class="mt-2 text-sm text-error"
            role="alert"
          >
            {{ errors.phone }}
          </p>
        </div>

        <div>
          <label for="contact-comment" class="mb-2 block font-semibold"
            >Комментарий</label
          >
          <textarea
            id="contact-comment"
            v-model="form.comment"
            name="comment"
            rows="4"
            class="w-full rounded-xl border border-border bg-surface px-4 py-3"
          />
        </div>

        <div>
          <label class="flex items-start gap-3">
            <input
              ref="consentInput"
              v-model="form.consent"
              type="checkbox"
              name="consent"
              required
              :aria-invalid="Boolean(errors.consent)"
              :aria-describedby="
                errors.consent ? 'contact-consent-error' : undefined
              "
              class="mt-1 size-5 accent-primary"
            />
            <span>
              Согласен на
              <NuxtLink
                to="/soglasie-na-obrabotku-dannyh"
                class="text-primary underline"
              >
                обработку персональных данных
              </NuxtLink>
            </span>
          </label>
          <p
            v-if="errors.consent"
            id="contact-consent-error"
            class="mt-2 text-sm text-error"
            role="alert"
          >
            {{ errors.consent }}
          </p>
        </div>
      </div>

      <BaseButton type="submit" full-width class="mt-6">Отправить</BaseButton>
    </form>
  </BaseCard>
</template>
