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

export interface RelatedServiceItem {
  pageKey: string
  title: string
  description: string
  icon: 'clipboardCheck' | 'car' | 'landmark' | 'ambulance'
}

export interface RelatedServicesBlock {
  title: string
  description: string
  items: RelatedServiceItem[]
}

export interface FinalCtaBlock {
  title: string
  description: string
  note?: string
  primaryLabel: string
  secondaryLabel?: string
  secondaryHref?: string
}

export interface HeroBenefit {
  icon: string
  label: string
  description?: string
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
  note?: string
}

export interface ServiceItem {
  title: string
  description: string
  icon: string
}

export interface ProductCategoryItem {
  title: string
  description: string
  icon: string
  imageSrc?: string
  imageAlt: string
  ctaLabel: string
  ctaType?: 'link' | 'phone' | 'disabled'
  href?: string
  futureHref?: string
}

export interface ProductSectionItem {
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  imageFit?: 'cover' | 'contain'
  imagePadding?: 'default' | 'none'
  price?: string
  ctaLabel: string
  placeholderIcon?: 'box' | 'flower2' | 'cross' | 'bed' | 'layers' | 'square' | 'package'
}

export interface ProductSection {
  id: string
  title: string
  paragraphs: string[]
  ctaLabel: string
  ctaNote?: string
  productsFootnote?: string
  products: ProductSectionItem[]
}

export interface FuneralKitItem {
  title: string
  description: string
  icon: 'box' | 'bed' | 'layers' | 'cross' | 'flower2' | 'package'
}

export interface FuneralKitBlock {
  id: string
  title: string
  paragraphs: string[]
  items: FuneralKitItem[]
  note: string
  ctaLabel: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  ctaDescription: string
}

export interface PurchaseStepItem {
  number: '01' | '02' | '03'
  title: string
  description: string
  icon: 'phone' | 'package' | 'badgeCheck'
}

export interface PurchaseStepsBlock {
  id: string
  title: string
  description: string
  items: PurchaseStepItem[]
  ctaLabel: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  ctaDescription?: string
}

export interface ServiceBenefitItem {
  title: string
  description: string
  icon: string
}

export interface ServiceTimelineStep {
  title: string
  description: string
  icon: string
}

export interface ServiceOrderStep {
  number: string
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
  heroDescription?: string
  primaryActionLabel?: string
  primaryActionHref?: string
  secondaryActionLabel?: string
  secondaryActionHref?: string
  secondaryActionIsPhone?: boolean
  benefits?: HeroBenefit[]
  benefitsInline?: boolean
  highlightText?: string
  descriptionSecondary?: string
  promo?: HeroPromo
  promoPhone?: string
  eyebrow?: string
  imageSrc?: string
  imageAlt?: string
  showImagePlaceholder?: boolean
  productCategoriesTitle?: string
  productCategoriesDescription?: string
  productCategories?: ProductCategoryItem[]
  productSections?: ProductSection[]
  funeralKit?: FuneralKitBlock
  purchaseSteps?: PurchaseStepsBlock
  serviceItemsTitle?: string
  serviceItemsDescription?: string
  highlightSectionTitle?: string
  highlightSectionText?: string[]
  geographyTitle?: string
  geographyDescription?: string
  geographyDirections?: string[]
  reasonsTitle?: string
  reasonsDescription?: string
  reasonsItems?: ServiceBenefitItem[]
  orderStepsTitle?: string
  orderSteps?: ServiceOrderStep[]
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
  relatedServices?: RelatedServicesBlock
  finalCta?: FinalCtaBlock
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
