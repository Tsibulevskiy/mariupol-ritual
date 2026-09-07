export default defineEventHandler((event) => {
  requireAdmin(event)
  setHeader(event, 'cache-control', 'no-store')

  return getBannerConfig()
})
