const digitsOnly = (value: string) => value.replace(/\D/g, '')

export const createPhoneLink = (phone: string) => `tel:+${digitsOnly(phone)}`

export const createTelegramLink = (username: string) =>
  `https://t.me/${username.replace(/^@/, '')}`

export const createWhatsappLink = (phone: string) =>
  `https://wa.me/${digitsOnly(phone)}`
