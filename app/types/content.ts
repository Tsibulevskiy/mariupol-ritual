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

export interface MonumentSizeOption {
  label: string
  price: string
  pedestal: string
  gravePlate: string
}

export type MonumentCategory = 'vertical' | 'horizontal' | 'complex'

export interface MonumentProduct {
  slug: string
  name: string
  category: MonumentCategory
  topSeller?: boolean
  material: string
  image: string
  summary: string
  sizes: MonumentSizeOption[]
}

export interface HeroPromo {
  title: string
  note: string
}

export interface ServiceItem {
  title: string
  description: string
  icon: string
}

export interface ServiceTimelineStep {
  title: string
  description: string
  icon: string
}

export interface ServiceLocation {
  title: string
  address: string
  phone: string
  workingHours: string
  photoSrc: string
  photoAlt: string
  mapQuery: string
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
  promo?: HeroPromo
  eyebrow?: string
  imageSrc?: string
  imageAlt?: string
  serviceItems?: ServiceItem[]
  serviceItemsNote?: string
  timelineTitle?: string
  timelineDescription?: string
  timelineSteps?: ServiceTimelineStep[]
  timelineCtaText?: string
  locationsTitle?: string
  locationsDescription?: string
  locations?: ServiceLocation[]
  faqTitle?: string
  faqDescription?: string
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
