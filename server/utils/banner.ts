import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { z } from 'zod'

export interface BannerConfig {
  enabled: boolean
  title: string
  text: string
  contentJson: string
  linkText: string
  linkUrl: string
  startsAt: string
  endsAt: string
  updatedAt: string
}

export interface PublicBanner {
  title: string
  text: string
  contentJson: string
  linkText: string
  linkUrl: string
}

type RichTextColor = 'default' | 'midnight' | 'danger'

type RichTextNode =
  | {
      type: 'paragraph'
      content?: RichTextNode[]
    }
  | {
      type: 'text'
      text: string
      marks?: Array<
        | {
            type: 'bold'
          }
        | {
            type: 'textColor'
            attrs: {
              color: RichTextColor
            }
          }
      >
    }
  | {
      type: 'hardBreak'
    }

type RichTextDocument = {
  type: 'doc'
  content: Array<{
    type: 'paragraph'
    content: Array<
      | {
          type: 'text'
          text: string
          marks?: Array<
            | {
                type: 'bold'
              }
            | {
                type: 'textColor'
                attrs: {
                  color: RichTextColor
                }
              }
          >
        }
      | {
          type: 'hardBreak'
        }
    >
  }>
}

const defaultBanner: BannerConfig = {
  enabled: false,
  title: 'Важная информация',
  text: '',
  contentJson: '',
  linkText: '',
  linkUrl: '',
  startsAt: '',
  endsAt: '',
  updatedAt: '',
}

const bannerSchema = z
  .object({
    enabled: z.boolean(),
    title: z.string().trim().max(60).optional().default(''),
    text: z.string().min(1).max(220),
    contentJson: z.string().optional().default(''),
    linkText: z.string().trim().max(40).optional().default(''),
    linkUrl: z.string().trim().max(300).optional().default(''),
    startsAt: z.string().trim().optional().default(''),
    endsAt: z.string().trim().optional().default(''),
  })
  .superRefine((value, context) => {
    if (value.linkText && !value.linkUrl) {
      context.addIssue({
        code: 'custom',
        path: ['linkUrl'],
        message: 'Укажите ссылку или очистите текст ссылки.',
      })
    }

    if (value.linkUrl && !isAllowedUrl(value.linkUrl)) {
      context.addIssue({
        code: 'custom',
        path: ['linkUrl'],
        message: 'Поддерживаются внутренние ссылки, https:// и tel:.',
      })
    }

    if (value.contentJson) {
      const parsed = parseRichTextDocument(value.contentJson)
      if (!parsed.ok) {
        context.addIssue({
          code: 'custom',
          path: ['contentJson'],
          message: parsed.error,
        })
      } else {
        const plainText = serializePlainText(parsed.value)

        if (!plainText.trim()) {
          context.addIssue({
            code: 'custom',
            path: ['text'],
            message: 'Укажите текст информационного сообщения.',
          })
        }

        if (plainText.length > 220) {
          context.addIssue({
            code: 'custom',
            path: ['text'],
            message: 'Текст информационного сообщения слишком длинный.',
          })
        }
      }
    }

    const startsAt = parseOptionalDate(value.startsAt)
    const endsAt = parseOptionalDate(value.endsAt)

    if (value.startsAt && !startsAt) {
      context.addIssue({
        code: 'custom',
        path: ['startsAt'],
        message: 'Укажите корректную дату начала показа.',
      })
    }

    if (value.endsAt && !endsAt) {
      context.addIssue({
        code: 'custom',
        path: ['endsAt'],
        message: 'Укажите корректную дату окончания показа.',
      })
    }

    if (startsAt && endsAt && endsAt <= startsAt) {
      context.addIssue({
        code: 'custom',
        path: ['endsAt'],
        message: 'Дата окончания должна быть позже даты начала.',
      })
    }
  })

let db: Database.Database | undefined

export const validateBannerInput = (input: unknown) => bannerSchema.parse(input)

export const getBannerConfig = (): BannerConfig => {
  const row = getDb()
    .prepare(
      'select enabled, title, text, content_json as contentJson, link_text as linkText, link_url as linkUrl, starts_at as startsAt, ends_at as endsAt, updated_at as updatedAt from site_banner where id = 1',
    )
    .get() as BannerConfig | undefined

  return row
    ? {
        ...row,
        enabled: Boolean(row.enabled),
        contentJson: row.contentJson || JSON.stringify(textToDocument(row.text || '')),
        linkText: row.linkText || '',
        linkUrl: row.linkUrl || '',
        startsAt: row.startsAt || '',
        endsAt: row.endsAt || '',
        updatedAt: row.updatedAt || '',
      }
    : defaultBanner
}

export const getPublicBanner = (): PublicBanner | null => {
  const banner = getBannerConfig()

  if (!banner.enabled || !banner.text) return null

  const now = Date.now()
  const startsAt = parseOptionalDate(banner.startsAt)
  const endsAt = parseOptionalDate(banner.endsAt)

  if (startsAt && startsAt.getTime() > now) return null
  if (endsAt && endsAt.getTime() <= now) return null

  return {
    title: banner.title,
    text: banner.text,
    contentJson: banner.contentJson || JSON.stringify(textToDocument(banner.text)),
    linkText: banner.linkText,
    linkUrl: banner.linkUrl,
  }
}

export const saveBannerConfig = (
  input: ReturnType<typeof validateBannerInput>,
): BannerConfig => {
  const updatedAt = new Date().toISOString()

  getDb()
    .prepare(
      `insert into site_banner
        (id, enabled, title, text, content_json, link_text, link_url, starts_at, ends_at, updated_at)
      values
        (1, @enabled, @title, @text, @contentJson, @linkText, @linkUrl, @startsAt, @endsAt, @updatedAt)
      on conflict(id) do update set
        enabled = excluded.enabled,
        title = excluded.title,
        text = excluded.text,
        content_json = excluded.content_json,
        link_text = excluded.link_text,
        link_url = excluded.link_url,
        starts_at = excluded.starts_at,
        ends_at = excluded.ends_at,
        updated_at = excluded.updated_at`,
    )
    .run({
      ...input,
      contentJson: input.contentJson || JSON.stringify(textToDocument(input.text)),
      enabled: input.enabled ? 1 : 0,
      updatedAt,
    })

  return getBannerConfig()
}

const getDb = () => {
  if (db) return db

  const config = useRuntimeConfig()
  const dbPath =
    config.bannerDbPath || join(process.cwd(), '.data', 'banner.sqlite')

  mkdirSync(dirname(dbPath), { recursive: true })
  db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.exec(`
    create table if not exists site_banner (
      id integer primary key check (id = 1),
      enabled integer not null default 0,
      title text not null,
      text text not null,
      content_json text not null default '',
      link_text text not null default '',
      link_url text not null default '',
      starts_at text not null default '',
      ends_at text not null default '',
      updated_at text not null
    )
  `)
  ensureBannerColumns(db)

  return db
}

const parseOptionalDate = (value: string) => {
  if (!value) return null

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const isAllowedUrl = (value: string) => {
  if (value.startsWith('/')) return !value.startsWith('//')
  if (value.startsWith('tel:')) return value.length > 4

  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

const ensureBannerColumns = (database: Database.Database) => {
  const columns = database
    .prepare('pragma table_info(site_banner)')
    .all() as Array<{ name: string }>

  if (!columns.some(column => column.name === 'content_json')) {
    database.exec("alter table site_banner add column content_json text not null default ''")
  }
}

const parseRichTextDocument = (input: string):
  | { ok: true; value: RichTextDocument }
  | { ok: false; error: string } => {
  try {
    const value = JSON.parse(input) as RichTextDocument

    if (!value || value.type !== 'doc' || !Array.isArray(value.content)) {
      return { ok: false, error: 'Некорректная структура rich-text.' }
    }

    if (value.content.length === 0 || value.content.length > 12) {
      return { ok: false, error: 'Некорректное количество абзацев.' }
    }

    let plainLength = 0

    for (const paragraph of value.content) {
      if (!paragraph || paragraph.type !== 'paragraph' || !Array.isArray(paragraph.content)) {
        return { ok: false, error: 'Разрешены только абзацы и переносы строк.' }
      }

      if (paragraph.content.length === 0 || paragraph.content.length > 64) {
        return { ok: false, error: 'Некорректная структура абзаца.' }
      }

      for (const node of paragraph.content) {
        if (!node || (node.type !== 'text' && node.type !== 'hardBreak')) {
          return { ok: false, error: 'Разрешены только текст и переносы строк.' }
        }

        if (node.type === 'hardBreak') continue

        if (typeof node.text !== 'string' || !node.text) {
          return { ok: false, error: 'Некорректный текст.' }
        }

        plainLength += node.text.length
        if (plainLength > 220) {
          return { ok: false, error: 'Текст информационного сообщения слишком длинный.' }
        }

        if (!node.marks) continue
        if (!Array.isArray(node.marks) || node.marks.length > 2) {
          return { ok: false, error: 'Некорректное форматирование.' }
        }

        for (const mark of node.marks) {
          if (!mark || (mark.type !== 'bold' && mark.type !== 'textColor')) {
            return { ok: false, error: 'Поддерживаются только bold и цвет текста.' }
          }

          if (mark.type === 'textColor') {
            const color = mark.attrs?.color
            if (!['default', 'midnight', 'danger'].includes(color)) {
              return { ok: false, error: 'Некорректный цвет текста.' }
            }
          }
        }
      }
    }

    return { ok: true, value }
  } catch {
    return { ok: false, error: 'Некорректный JSON rich-text.' }
  }
}

const serializePlainText = (doc: RichTextDocument) =>
  doc.content
    .map(paragraph =>
      paragraph.content
        .map(node => (node.type === 'text' ? node.text : '\n'))
        .join(''),
    )
    .join('\n\n')

const textToDocument = (text: string): RichTextDocument => ({
  type: 'doc',
  content: (text || '').split(/\n{2,}/).map(paragraphText => ({
    type: 'paragraph',
    content: paragraphText.split('\n').flatMap((line, index, lines) => {
      const content: RichTextNode[] = []
      if (line) content.push({ type: 'text', text: line })
      if (index < lines.length - 1) content.push({ type: 'hardBreak' })
      return content
    }),
  })),
})
