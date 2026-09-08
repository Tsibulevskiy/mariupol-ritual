<script setup lang="ts">
import {
  bannerColorLabels,
  bannerTextToDocument,
  type BannerRichTextColor,
  type BannerRichTextDocument,
} from '@/utils/banner-rich-text'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = ref<HTMLElement | null>(null)
const isReady = ref(false)
let savedRange: Range | null = null

const colorOptions: BannerRichTextColor[] = ['midnight', 'danger']

const syncFromDom = () => {
  if (!editor.value) return
  emit('update:modelValue', JSON.stringify(domToDocument(editor.value)))
}

const applyMark = (command: 'bold' | 'default' | BannerRichTextColor) => {
  if (!editor.value) return

  editor.value.focus()

  const selection = window.getSelection()
  const range = savedRange || (selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null)
  if (!range) return

  if (!editor.value.contains(range.commonAncestorContainer)) return

  if (command === 'bold') {
    wrapRange(range, 'strong')
  } else if (command === 'default') {
    unwrapRange(range)
  } else {
    wrapRange(range, 'span', colorFor(command))
  }

  syncFromDom()
}

const resetFormatting = () => {
  if (!editor.value) return
  editor.value.focus()

  const selection = window.getSelection()
  const range = savedRange || (selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null)
  if (!range) return
  if (!editor.value.contains(range.commonAncestorContainer)) return

  clearFormatting(range)
  syncFromDom()
}

const onPaste = (event: ClipboardEvent) => {
  if (!editor.value) return
  event.preventDefault()

  const text = event.clipboardData?.getData('text/plain') || ''
  document.execCommand('insertText', false, text)
  syncFromDom()
}

onMounted(() => {
  if (!editor.value) return
  editor.value.innerHTML = documentToHtml(parseDocument(props.modelValue))
  isReady.value = true
})

const rememberSelection = () => {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || !editor.value) {
    savedRange = null
    return
  }

  const range = selection.getRangeAt(0)
  savedRange = editor.value.contains(range.commonAncestorContainer)
    ? range.cloneRange()
    : null
}

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value || !isReady.value) return
    const nextHtml = documentToHtml(parseDocument(value))
    if (editor.value.innerHTML !== nextHtml) {
      editor.value.innerHTML = nextHtml
    }
  },
  { deep: true },
)

const colorFor = (color: BannerRichTextColor) => {
  switch (color) {
    case 'midnight':
      return '#0a1622'
    case 'danger':
      return '#f44336'
    default:
      return '#2c3947'
  }
}

const domToDocument = (root: HTMLElement): BannerRichTextDocument => {
  const paragraphs = Array.from(root.querySelectorAll('p'))

  return {
    type: 'doc',
    content: (paragraphs.length ? paragraphs : [root]).map((paragraph) => ({
      type: 'paragraph',
      content: domNodeToInlineNodes(paragraph),
    })),
  }
}

const wrapRange = (range: Range, tagName: 'strong' | 'span', color?: string) => {
  const wrapper = document.createElement(tagName)
  if (tagName === 'span' && color) {
    wrapper.style.color = color
  }

  const contents = range.extractContents()
  wrapper.appendChild(contents)
  range.insertNode(wrapper)
  range.selectNodeContents(wrapper)
  range.collapse(false)
}

const clearFormatting = (range: Range) => {
  const contents = range.extractContents()
  const fragment = document.createDocumentFragment()

  for (const node of Array.from(contents.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      fragment.appendChild(document.createTextNode(node.textContent || ''))
      continue
    }

    if (node instanceof HTMLElement) {
      if (node.tagName === 'BR') {
        fragment.appendChild(document.createElement('br'))
        continue
      }

      fragment.appendChild(document.createTextNode(node.textContent || ''))
      continue
    }

    fragment.appendChild(node)
  }

  range.insertNode(fragment)
  range.collapse(false)
}

const domNodeToInlineNodes = (root: ParentNode) => {
  const content: Array<
    | {
        type: 'text'
        text: string
        marks?: Array<{ type: 'bold' } | { type: 'textColor'; attrs: { color: BannerRichTextColor } }>
      }
    | { type: 'hardBreak' }
  > = []

  const walk = (node: ChildNode, marks: Array<{ type: 'bold' } | { type: 'textColor'; attrs: { color: BannerRichTextColor } }> = []) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent) {
        content.push({
          type: 'text',
          text: node.textContent,
          marks: marks.length ? [...marks] : undefined,
        })
      }
      return
    }

    if (!(node instanceof HTMLElement)) return
    if (node.tagName === 'BR') {
      content.push({ type: 'hardBreak' })
      return
    }

    const nextMarks = [...marks]
    if (node.tagName === 'B' || node.tagName === 'STRONG' || node.style.fontWeight === 'bold' || Number(node.style.fontWeight) >= 600) {
      if (!nextMarks.some(mark => mark.type === 'bold')) nextMarks.push({ type: 'bold' })
    }

    const color = extractColor(node.style.color)
    if (color && !nextMarks.some(mark => mark.type === 'textColor')) {
      nextMarks.push({ type: 'textColor', attrs: { color } })
    }

    for (const child of Array.from(node.childNodes)) {
      walk(child, nextMarks)
    }
  }

  for (const node of Array.from(root.childNodes)) {
    walk(node)
  }

  return content
}

const extractColor = (value: string): BannerRichTextColor | null => {
  if (!value) return null
  const normalized = normalizeColor(value)
  if (normalized === normalizeColor(colorFor('midnight'))) return 'midnight'
  if (normalized === normalizeColor(colorFor('danger'))) return 'danger'
  return null
}

const normalizeColor = (value: string) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return value.trim().toLowerCase()

  context.fillStyle = value
  return context.fillStyle.trim().toLowerCase()
}

const documentToHtml = (value: BannerRichTextDocument) =>
  value.content
    .map((paragraph) => {
      const children = paragraph.content
        .map((node) => {
          if (node.type === 'hardBreak') return '<br>'
          const bold = node.marks?.some(mark => mark.type === 'bold')
          const color = node.marks?.find(mark => mark.type === 'textColor')?.attrs.color
          const text = escapeHtml(node.text)
          const colorStyle = color && color !== 'default' ? ` style="color: ${colorFor(color)}"` : ''

          return `${bold ? '<strong>' : ''}${color ? `<span${colorStyle}>` : ''}${text}${color ? '</span>' : ''}${bold ? '</strong>' : ''}`
        })
        .join('')

      return `<p>${children || '<br>'}</p>`
    })
    .join('')

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const parseDocument = (value: string): BannerRichTextDocument => {
  if (!value) return bannerTextToDocument('')

  try {
    return JSON.parse(value) as BannerRichTextDocument
  } catch {
    return bannerTextToDocument(value)
  }
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="rounded-lg border border-border bg-surface px-3 py-2 font-semibold"
        aria-label="Жирный текст"
        @mousedown.prevent
        @click="applyMark('bold')"
      >
        B
      </button>

      <div class="flex items-center gap-2">
        <span class="text-sm font-semibold text-text-muted">Цвет</span>
        <button
          v-for="color in colorOptions"
          :key="color"
          type="button"
          :aria-label="bannerColorLabels[color]"
          class="size-8 rounded-full border border-border"
          :style="{ backgroundColor: colorFor(color) }"
          @mousedown.prevent
          @click="applyMark(color)"
        />
      </div>

      <button
        type="button"
        class="rounded-lg border border-border bg-surface px-3 py-2 font-semibold"
        aria-label="Сбросить форматирование"
        @mousedown.prevent
        @click="resetFormatting"
      >
        Сбросить
      </button>
    </div>

    <div
      ref="editor"
      contenteditable="true"
      role="textbox"
      aria-multiline="true"
      class="min-h-40 rounded-xl border border-border bg-surface px-4 py-3 whitespace-pre-wrap outline-none"
      @mouseup="rememberSelection"
      @keyup="rememberSelection"
      @input="syncFromDom"
      @paste="onPaste"
    />
  </div>
</template>
