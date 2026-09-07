import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().trim().min(1).max(120),
  password: z.string().min(1).max(200),
})

export default defineEventHandler(async (event) => {
  const body = loginSchema.parse(await readBody(event))

  if (!validateAdminCredentials(body.username, body.password)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  createAdminSession(event, body.username)

  return { ok: true }
})
