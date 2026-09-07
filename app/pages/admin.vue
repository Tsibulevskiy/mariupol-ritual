<script setup lang="ts">
interface BannerForm {
  enabled: boolean
  title: string
  text: string
  linkText: string
  linkUrl: string
  startsAt: string
  endsAt: string
}

definePageMeta({
  layout: false,
})

useHead({
  title: 'Администрирование баннера',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const credentials = reactive({
  username: '',
  password: '',
})

const form = reactive<BannerForm>({
  enabled: false,
  title: 'Важная информация',
  text: '',
  linkText: '',
  linkUrl: '',
  startsAt: '',
  endsAt: '',
})

const authenticated = ref(false)
const loading = ref(true)
const saving = ref(false)
const message = ref('')
const error = ref('')

const previewNotice = computed(() => ({
  title: form.title || 'Важная информация',
  text: form.text || 'Текст информационного сообщения',
  linkText: form.linkText,
  linkUrl: form.linkUrl,
}))

const loadBanner = async () => {
  const data = await $fetch<BannerForm>('/api/admin/banner')
  Object.assign(form, toDatetimeLocalForm(data))
}

onMounted(async () => {
  try {
    const session = await $fetch<{ authenticated: boolean }>(
      '/api/admin/session',
    )
    authenticated.value = session.authenticated

    if (authenticated.value) await loadBanner()
  } finally {
    loading.value = false
  }
})

const login = async () => {
  error.value = ''
  message.value = ''

  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: credentials,
    })
    authenticated.value = true
    credentials.password = ''
    await loadBanner()
  } catch {
    error.value = 'Не удалось авторизоваться. Проверьте логин и пароль.'
  }
}

const logout = async () => {
  await $fetch('/api/admin/logout', { method: 'POST' })
  authenticated.value = false
}

const save = async () => {
  saving.value = true
  error.value = ''
  message.value = ''

  try {
    const data = await $fetch<BannerForm>('/api/admin/banner', {
      method: 'PUT',
      body: toApiPayload(form),
    })
    Object.assign(form, toDatetimeLocalForm(data))
    message.value = 'Изменения сохранены'
  } catch {
    error.value = 'Не удалось сохранить изменения. Проверьте заполненные поля.'
  } finally {
    saving.value = false
  }
}

const toApiPayload = (value: BannerForm) => ({
  ...value,
  startsAt: fromDatetimeLocal(value.startsAt),
  endsAt: fromDatetimeLocal(value.endsAt),
})

const toDatetimeLocalForm = (value: BannerForm) => ({
  ...value,
  startsAt: toDatetimeLocal(value.startsAt),
  endsAt: toDatetimeLocal(value.endsAt),
})

const toDatetimeLocal = (value: string) => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

const fromDatetimeLocal = (value: string) => {
  if (!value) return ''

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}
</script>

<template>
  <main class="min-h-screen bg-background-soft px-4 py-8 sm:px-6">
    <div class="mx-auto max-w-[760px]">
      <div class="mb-6 flex items-center justify-between gap-4">
        <NuxtLink to="/" class="font-semibold text-primary no-underline">
          На сайт
        </NuxtLink>
        <button
          v-if="authenticated"
          type="button"
          class="text-sm font-semibold text-primary hover:text-primary-hover"
          @click="logout"
        >
          Выйти
        </button>
      </div>

      <BaseCard>
        <p v-if="loading" class="text-text-muted">Загрузка...</p>

        <form v-else-if="!authenticated" class="space-y-5" @submit.prevent="login">
          <div>
            <h1 class="text-3xl">Администрирование</h1>
            <p class="mt-3 text-text-muted">
              Войдите, чтобы изменить информационный баннер.
            </p>
          </div>

          <div>
            <label for="admin-username" class="mb-2 block font-semibold">
              Логин
            </label>
            <input
              id="admin-username"
              v-model="credentials.username"
              name="username"
              autocomplete="username"
              class="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3"
              required
            />
          </div>

          <div>
            <label for="admin-password" class="mb-2 block font-semibold">
              Пароль
            </label>
            <input
              id="admin-password"
              v-model="credentials.password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3"
              required
            />
          </div>

          <p v-if="error" class="text-sm text-error" role="alert">
            {{ error }}
          </p>

          <BaseButton type="submit">Войти</BaseButton>
        </form>

        <form v-else class="space-y-6" @submit.prevent="save">
          <div>
            <h1 class="text-3xl">Информационный баннер</h1>
            <p class="mt-3 text-text-muted">
              Управление сообщением, которое отображается под шапкой на главной.
            </p>
          </div>

          <label class="flex items-start gap-3">
            <input
              v-model="form.enabled"
              type="checkbox"
              class="mt-1 size-5 accent-primary"
            />
            <span class="font-semibold">Показывать информационный баннер</span>
          </label>

          <div>
            <label for="banner-title" class="mb-2 block font-semibold">
              Заголовок
            </label>
            <input
              id="banner-title"
              v-model="form.title"
              maxlength="60"
              class="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3"
              required
            />
          </div>

          <div>
            <label for="banner-text" class="mb-2 block font-semibold">
              Текст
            </label>
            <textarea
              id="banner-text"
              v-model="form.text"
              maxlength="220"
              rows="4"
              class="w-full rounded-xl border border-border bg-surface px-4 py-3"
              required
            />
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="banner-link-text" class="mb-2 block font-semibold">
                Текст ссылки
              </label>
              <input
                id="banner-link-text"
                v-model="form.linkText"
                maxlength="40"
                class="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3"
              />
            </div>

            <div>
              <label for="banner-link-url" class="mb-2 block font-semibold">
                Ссылка
              </label>
              <input
                id="banner-link-url"
                v-model="form.linkUrl"
                maxlength="300"
                placeholder="/kontakty"
                class="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3"
              />
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="banner-starts-at" class="mb-2 block font-semibold">
                Показывать с
              </label>
              <input
                id="banner-starts-at"
                v-model="form.startsAt"
                type="datetime-local"
                class="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3"
              />
            </div>

            <div>
              <label for="banner-ends-at" class="mb-2 block font-semibold">
                Показывать до
              </label>
              <input
                id="banner-ends-at"
                v-model="form.endsAt"
                type="datetime-local"
                class="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3"
              />
            </div>
          </div>

          <p v-if="message" class="text-sm font-semibold text-success" role="status">
            {{ message }}
          </p>
          <p v-if="error" class="text-sm text-error" role="alert">
            {{ error }}
          </p>

          <BaseButton type="submit" :disabled="saving">
            {{ saving ? 'Сохранение...' : 'Сохранить' }}
          </BaseButton>

          <section class="border-t border-border pt-6">
            <h2 class="text-2xl">Предпросмотр</h2>
            <div class="mt-4 overflow-hidden rounded-xl border border-border">
              <InformationNotice :notice="previewNotice" />
            </div>
          </section>
        </form>
      </BaseCard>
    </div>
  </main>
</template>
