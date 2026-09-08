<script setup lang="ts">
import { computed } from 'vue'
import { Info } from 'lucide-vue-next'
import BannerRichTextRenderer from '@/components/BannerRichTextRenderer.vue'
import { bannerTextToDocument, type BannerRichTextDocument } from '@/utils/banner-rich-text'

interface Notice {
  title: string
  text: string
  contentJson?: string
  linkText?: string
  linkUrl?: string
}

const props = defineProps<{
  notice: Notice
}>()

const documentValue = computed<BannerRichTextDocument>(() => {
  if (props.notice.contentJson) {
    try {
      return JSON.parse(props.notice.contentJson) as BannerRichTextDocument
    } catch {
      return bannerTextToDocument(props.notice.text || '')
    }
  }

  return bannerTextToDocument(props.notice.text || '')
})
</script>

<template>
  <aside
    class="border-y border-border bg-surface-blue"
    aria-label="Важная информация"
  >
    <div class="mx-auto max-w-[1200px] px-4 py-3 sm:px-6 lg:px-8 lg:py-2">
      <div
        class="flex items-start gap-3 text-sm leading-5 text-text lg:min-h-8 lg:items-center"
      >
        <Info
          :size="18"
          class="mt-0.5 shrink-0 text-primary lg:mt-0"
          aria-hidden="true"
        />
        <div class="min-w-0 flex-1 lg:flex lg:items-center lg:gap-2">
          <p class="text-sm leading-5 font-semibold text-text-heading">
            {{ notice.title }}
          </p>
          <div class="text-sm leading-5 text-text">
            <BannerRichTextRenderer :document="documentValue" />
          </div>
        </div>
        <NuxtLink
          v-if="notice.linkText && notice.linkUrl && notice.linkUrl.startsWith('/')"
          :to="notice.linkUrl"
          class="shrink-0 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
        >
          {{ notice.linkText }}
        </NuxtLink>
        <a
          v-else-if="notice.linkText && notice.linkUrl"
          :href="notice.linkUrl"
          class="shrink-0 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
        >
          {{ notice.linkText }}
        </a>
      </div>
    </div>
  </aside>
</template>
