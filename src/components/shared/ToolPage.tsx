import { type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, SITE_NAME, SITE_DEFAULT_OG_IMAGE } from '@/config/seo'
import { buildToolPageSchema, buildBreadcrumbSchema } from '@/config/structuredData'
import { toolsBySlug } from '@/registry/toolRegistry'

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

  return (
    <div className="space-y-4">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        {slug && <link rel="canonical" href={pageUrl} />}
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        {slug && <meta property="og:url" content={pageUrl} />}
        <meta property="og:image" content={SITE_DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={SITE_DEFAULT_OG_IMAGE} />
      </Helmet>
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
