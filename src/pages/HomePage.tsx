import { useNavigate } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { categories } from '@/registry/categories'
import { getToolsByCategory } from '@/registry/toolRegistry'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_DEFAULT_OG_IMAGE } from '@/config/seo'
import { buildHomePageSchema } from '@/config/structuredData'
import { useSeoMeta } from '@/hooks/useSeoMeta'

export default function HomePage() {
  const navigate = useNavigate()
  const fullTitle = `${SITE_NAME} - ${SITE_TAGLINE}`

  useSeoMeta({
    title: fullTitle,
    description: SITE_DESCRIPTION,
    canonical: SITE_URL,
    ogType: 'website',
    ogSiteName: SITE_NAME,
    ogTitle: fullTitle,
    ogDescription: SITE_DESCRIPTION,
    ogUrl: SITE_URL,
    ogImage: SITE_DEFAULT_OG_IMAGE,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: SITE_DESCRIPTION,
    twitterImage: SITE_DEFAULT_OG_IMAGE,
  })

  return (
    <div className="space-y-8">
      <JsonLd data={buildHomePageSchema()} />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">QuickDevTools</h1>
        <p className="text-muted-foreground mt-2">
          47 developer tools, all client-side. Fast, private, no data leaves your browser.
        </p>
      </div>

      {categories.map((cat) => {
        const catTools = getToolsByCategory(cat.id)
        return (
          <section key={cat.id}>
            <div className="flex items-center gap-2 mb-4">
              <cat.icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">{cat.label}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {catTools.map((tool) => (
                <Card
                  key={tool.slug}
                  className="cursor-pointer transition-colors hover:bg-accent"
                  onClick={() => navigate(`/${tool.slug}`)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">{tool.name}</CardTitle>
                    <CardDescription className="text-xs">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
