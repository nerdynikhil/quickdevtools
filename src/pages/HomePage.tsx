import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { categories } from '@/registry/categories'
import { getToolsByCategory } from '@/registry/toolRegistry'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_DEFAULT_OG_IMAGE } from '@/config/seo'
import { buildHomePageSchema } from '@/config/structuredData'

export default function HomePage() {
  const navigate = useNavigate()
  const fullTitle = `${SITE_NAME} - ${SITE_TAGLINE}`

  return (
    <div className="space-y-8">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={SITE_DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_DEFAULT_OG_IMAGE} />
      </Helmet>
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
