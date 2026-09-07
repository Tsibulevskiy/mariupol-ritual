export default defineEventHandler((event) => ({
  authenticated: isAdminAuthenticated(event),
}))
