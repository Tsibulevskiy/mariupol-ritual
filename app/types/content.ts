export interface Service {
  id: string
  slug: string
  name: string
  description: string
  icon?: string
}

export interface Price {
  id: string
  serviceId: Service['id']
  name: string
  value: string
  note?: string
}

export interface Faq {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface RelatedLink {
  label: string
  href: string
}

export interface HeroBenefit {
  icon: string
  label: string
}

export interface MonumentProduct {
  slug: string
  name: string
  size: string
  price: string
  image: string
  summary: string
}

export interface ServicePage {
  id: string
  path: string
  h1: string
  metaTitle: string
  metaDescription: string
  phone?: string
  primaryActionLabel?: string
  secondaryActionLabel?: string
  secondaryActionHref?: string
  benefits?: HeroBenefit[]
  eyebrow?: string
  summary: string
  included: string[]
  process: string[]
  price: string
  priceNote: string
  separatePayment: string[]
  serviceAreas: string[]
  faq: Faq[]
  relatedLinks: RelatedLink[]
  breadcrumbs: BreadcrumbItem[]
}

export interface PricePackage {
  id: string
  name: string
  price: string
  note: string
  included: string[]
  separatePayment: string[]
}

export interface PriceServiceItem {
  id: string
  name: string
  price: string
  note: string
}
