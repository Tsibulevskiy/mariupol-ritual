export default defineEventHandler(async (event) => {
  requireAdmin(event)

  try {
    const input = validateBannerInput(await readBody(event))
    setHeader(event, 'cache-control', 'no-store')

    return saveBannerConfig(input)
  } catch (error) {
    if (error && typeof error === 'object' && 'issues' in error) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation failed',
        data: error,
      })
    }

    throw error
  }
})
