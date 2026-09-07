import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { z } from 'zod'

export interface BannerConfig {
  enabled: boolean
  title: string
  text: string
  linkText: string
  linkUrl: string
  startsAt: string
  endsAt: string
  updatedAt: string
}

export interface PublicBanner {
  title: string
  text: string
  linkText: string
  linkUrl: string
}

const defaultBanner: BannerConfig = {
  enabled: false,
  title: 'Важная информация',
  text: '',
  linkText: '',
  linkUrl: '',
  startsAt: '',
  endsAt: '',
  updatedAt: '',
}

const bannerSchema = z
  .object({
    enabled: z.boolean(),
    title: z.string().trim().min(1).max(60),
    text: z.string().trim().min(1).max(220),
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
      'select enabled, title, text, link_text as linkText, link_url as linkUrl, starts_at as startsAt, ends_at as endsAt, updated_at as updatedAt from site_banner where id = 1',
    )
    .get() as BannerConfig | undefined

  return row
    ? {
        ...row,
        enabled: Boolean(row.enabled),
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
        (id, enabled, title, text, link_text, link_url, starts_at, ends_at, updated_at)
      values
        (1, @enabled, @title, @text, @linkText, @linkUrl, @startsAt, @endsAt, @updatedAt)
      on conflict(id) do update set
        enabled = excluded.enabled,
        title = excluded.title,
        text = excluded.text,
        link_text = excluded.link_text,
        link_url = excluded.link_url,
        starts_at = excluded.starts_at,
        ends_at = excluded.ends_at,
        updated_at = excluded.updated_at`,
    )
    .run({
      ...input,
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
      link_text text not null default '',
      link_url text not null default '',
      starts_at text not null default '',
      ends_at text not null default '',
      updated_at text not null
    )
  `)

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
