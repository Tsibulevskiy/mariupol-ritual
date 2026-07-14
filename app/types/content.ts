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

export interface ServicePage {
  id: string
  path: string
  h1: string
  metaTitle: string
  metaDescription: string
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
