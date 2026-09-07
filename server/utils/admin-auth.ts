import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

const cookieName = 'mariupol_admin_session'
const sessionMaxAge = 60 * 60 * 8

export const requireAdmin = (event: H3Event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
}

export const isAdminAuthenticated = (event: H3Event) => {
  const token = getCookie(event, cookieName)
  if (!token) return false

  const config = useRuntimeConfig()
  if (!config.adminSessionSecret) return false

  const [username, expiresAt, signature] = token.split('.')
  if (!username || !expiresAt || !signature) return false
  if (Number(expiresAt) <= Date.now()) return false

  const expected = signSession(username, expiresAt, config.adminSessionSecret)
  return safeEqual(signature, expected)
}

export const createAdminSession = (event: H3Event, username: string) => {
  const config = useRuntimeConfig()
  if (!config.adminSessionSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Admin session secret is not configured',
    })
  }

  const expiresAt = String(Date.now() + sessionMaxAge * 1000)
  const signature = signSession(username, expiresAt, config.adminSessionSecret)

  setCookie(event, cookieName, `${username}.${expiresAt}.${signature}`, {
    httpOnly: true,
    maxAge: sessionMaxAge,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

export const clearAdminSession = (event: H3Event) => {
  deleteCookie(event, cookieName, {
    path: '/',
  })
}

export const validateAdminCredentials = (
  username: string,
  password: string,
) => {
  const config = useRuntimeConfig()

  return (
    Boolean(config.adminUsername) &&
    Boolean(config.adminPassword) &&
    safeEqual(username, config.adminUsername) &&
    safeEqual(password, config.adminPassword)
  )
}

const signSession = (username: string, expiresAt: string, secret: string) =>
  createHmac('sha256', secret).update(`${username}.${expiresAt}`).digest('hex')

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  )
}
