import {
  Code,
  Lock,
  Type,
  Hash,
  ArrowLeftRight,
  Globe,
  Database,
} from 'lucide-react'
import type { Category } from './types'

export const categories: Category[] = [
  { id: 'formatters', label: 'Formatters & Beautifiers', icon: Code },
  { id: 'encoders', label: 'Encoders & Decoders', icon: Lock },
  { id: 'string-text', label: 'String / Text Tools', icon: Type },
  { id: 'hash-crypto', label: 'Hash & Crypto', icon: Hash },
  { id: 'converters', label: 'Converters', icon: ArrowLeftRight },
  { id: 'web-network', label: 'Web / Network', icon: Globe },
  { id: 'data-generators', label: 'Data Generators', icon: Database },
]

export const categoryMap = new Map(categories.map((c) => [c.id, c]))
