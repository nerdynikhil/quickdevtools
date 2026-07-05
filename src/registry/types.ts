import type { ComponentType, LazyExoticComponent } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

export interface SeoContent {
  /** Search-optimized title with modifiers, e.g. "Free Online JSON Formatter & Validator" */
  titleTag: string
  /** 150-160 char meta description targeting primary keyword */
  metaDescription: string
  /** 2-3 sentence explanation: "What is [Tool]?" */
  whatIs: string
  /** Step-by-step usage instructions */
  howToUse: string[]
  /** Common use case bullet points */
  useCases: string[]
  /** 3-5 FAQ items for FAQPage schema */
  faq: FaqItem[]
  /** 3-4 related tool slugs for internal linking */
  relatedSlugs: string[]
}

export interface ToolDefinition {
  slug: string
  name: string
  description: string
  category: CategoryId
  keywords: string[]
  component: LazyExoticComponent<ComponentType>
  seoContent?: SeoContent
}

export type CategoryId =
  | 'formatters'
  | 'encoders'
  | 'string-text'
  | 'hash-crypto'
  | 'converters'
  | 'web-network'
  | 'data-generators'

export interface Category {
  id: CategoryId
  label: string
  icon: LucideIcon
}
