import type { ComponentType, LazyExoticComponent } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface ToolDefinition {
  slug: string
  name: string
  description: string
  category: CategoryId
  keywords: string[]
  component: LazyExoticComponent<ComponentType>
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
