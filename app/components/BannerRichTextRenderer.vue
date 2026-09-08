<script setup lang="ts">
import {
  bannerColorClasses,
  type BannerRichTextDocument,
} from '@/utils/banner-rich-text'

defineProps<{
  document: BannerRichTextDocument
}>()

const textClass = (node: BannerRichTextDocument['content'][number]['content'][number]) => {
  const color = node.type === 'text'
    ? node.marks?.find(mark => mark.type === 'textColor')?.attrs.color
    : undefined

  return color ? bannerColorClasses[color] : bannerColorClasses.default
}

const isBold = (node: BannerRichTextDocument['content'][number]['content'][number]) =>
  node.type === 'text' && Boolean(node.marks?.some(mark => mark.type === 'bold'))
</script>

<template>
  <div class="space-y-1">
    <p v-for="(paragraph, paragraphIndex) in document.content" :key="paragraphIndex" class="m-0 whitespace-pre-line">
      <template v-for="(node, nodeIndex) in paragraph.content" :key="nodeIndex">
        <span
          v-if="node.type === 'text'"
          :class="[isBold(node) ? 'font-semibold' : '', textClass(node)]"
        >{{ node.text }}</span>
        <br v-else />
      </template>
    </p>
  </div>
</template>
