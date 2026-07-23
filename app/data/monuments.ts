import type { MonumentProduct } from '@/types/content'

export const monumentProducts: MonumentProduct[] = [
  {
    slug: 'granite-classic',
    name: 'Памятник Classic',
    size: '100 × 50 × 8 см',
    price: 'от 39 000 ₽',
    image: '/monuments/placeholder-classic.svg',
    summary:
      'Классическая вертикальная модель из гранита для аккуратного и сдержанного оформления места захоронения.',
  },
  {
    slug: 'granite-double',
    name: 'Памятник Double',
    size: '120 × 60 × 8 см',
    price: 'от 58 000 ₽',
    image: '/monuments/placeholder-double.svg',
    summary:
      'Двойной памятник с увеличенной площадью для совместного мемориального оформления.',
  },
  {
    slug: 'granite-arched',
    name: 'Памятник Arched',
    size: '110 × 55 × 8 см',
    price: 'от 47 000 ₽',
    image: '/monuments/placeholder-arched.svg',
    summary:
      'Модель с мягкой арочной формой для более выразительного и индивидуального внешнего вида.',
  },
  {
    slug: 'granite-premium',
    name: 'Памятник Premium',
    size: '120 × 70 × 10 см',
    price: 'от 72 000 ₽',
    image: '/monuments/placeholder-premium.svg',
    summary:
      'Премиальный памятник с увеличенной толщиной и расширенными возможностями художественного оформления.',
  },
]

export const monumentProductsBySlug = Object.fromEntries(
  monumentProducts.map((product) => [product.slug, product]),
)
