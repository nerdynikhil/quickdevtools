import { type ReactNode } from 'react'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, SITE_NAME, SITE_DEFAULT_OG_IMAGE } from '@/config/seo'
import { buildToolPageSchema, buildBreadcrumbSchema } from '@/config/structuredData'
import { toolsBySlug } from '@/registry/toolRegistry'
import { useSeoMeta } from '@/hooks/useSeoMeta'

interface ToolPageProps {
  title: string
  description: string
  children: ReactNode
}

function findToolByTitle(title: string) {
  for (const [, tool] of toolsBySlug) {
    if (tool.name === title) return tool
  }
  return undefined
}

export default function ToolPage({ title, description, children }: ToolPageProps) {
  const tool = findToolByTitle(title)
  const slug = tool?.slug ?? ''
  const keywords = tool?.keywords ?? []
  const pageTitle = `${title} - ${SITE_NAME}`
  const pageUrl = `${SITE_URL}/${slug}`

  useSeoMeta({
    title: pageTitle,
    description,
    ...(slug ? { canonical: pageUrl } : {}),
    ...(keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
    ogType: 'website',
    ogSiteName: SITE_NAME,
    ogTitle: pageTitle,
    ogDescription: description,
    ...(slug ? { ogUrl: pageUrl } : {}),
    ogImage: SITE_DEFAULT_OG_IMAGE,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: description,
    twitterImage: SITE_DEFAULT_OG_IMAGE,
  })

  return (
    <div className="space-y-4">
      {tool && (
        <JsonLd
          data={[
            buildToolPageSchema({ name: title, description, slug, keywords }),
            buildBreadcrumbSchema({ name: title, slug }),
          ]}
        />
      )}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </div>
  )
}
