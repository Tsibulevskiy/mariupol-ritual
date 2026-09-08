export type BannerRichTextColor = 'default' | 'midnight' | 'danger'

export type BannerRichTextNode =
  | {
      type: 'paragraph'
      content: BannerRichTextInlineNode[]
    }
  | {
      type: 'text'
      text: string
      marks?: BannerRichTextMark[]
    }
  | {
      type: 'hardBreak'
    }

export type BannerRichTextInlineNode =
  | {
      type: 'text'
      text: string
      marks?: BannerRichTextMark[]
    }
  | {
      type: 'hardBreak'
    }

export type BannerRichTextMark =
  | {
      type: 'bold'
    }
  | {
      type: 'textColor'
      attrs: {
        color: BannerRichTextColor
      }
    }

export interface BannerRichTextDocument {
  type: 'doc'
  content: Array<{
    type: 'paragraph'
    content: BannerRichTextInlineNode[]
  }>
}

export const bannerColorClasses: Record<BannerRichTextColor, string> = {
  default: 'text-text',
  midnight: 'text-[#0a1622]',
  danger: 'text-[#f44336]',
}

export const bannerColorLabels: Record<BannerRichTextColor, string> = {
  default: 'Обычный цвет',
  midnight: 'Тёмно-серый',
  danger: 'Красный',
}

export const bannerRichTextPlainText = (document: BannerRichTextDocument) =>
  document.content
    .map(paragraph =>
      paragraph.content
        .map((node) => (node.type === 'text' ? node.text : '\n'))
        .join(''),
    )
    .join('\n\n')

export const bannerTextToDocument = (text: string): BannerRichTextDocument => {
  const paragraphs = (text || '').split(/\n{2,}/)

  return {
    type: 'doc',
    content: (paragraphs.length ? paragraphs : ['']).map(paragraphText => ({
      type: 'paragraph',
      content: paragraphText.split('\n').flatMap((line, index, lines) => {
        const nodes: BannerRichTextInlineNode[] = []
        if (line) nodes.push({ type: 'text', text: line })
        if (index < lines.length - 1) nodes.push({ type: 'hardBreak' })
        return nodes
      }),
    })),
  }
}
