import { useNavigate } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { categories } from '@/registry/categories'
import { getToolsByCategory, tools } from '@/registry/toolRegistry'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_DEFAULT_OG_IMAGE } from '@/config/seo'
import { buildHomePageSchema } from '@/config/structuredData'
import { useSeoMeta } from '@/hooks/useSeoMeta'
import { Shield, Zap, Globe } from 'lucide-react'

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
    <div className="space-y-10">
      <JsonLd data={buildHomePageSchema()} />

      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Free Online Developer Tools
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {tools.length} developer tools, all running 100% client-side in your browser.
          Fast, free, and private — your data never leaves your machine. No signup required.
        </p>

        {/* Trust Signals */}
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            <span>100% Client-Side — Your Data Stays Private</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>Instant Results — No Server Round-Trips</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4 text-blue-500" />
            <span>Free Forever — No Signup Needed</span>
          </div>
        </div>
      </div>

      {/* Tool Categories */}
      {categories.map((cat) => {
        const catTools = getToolsByCategory(cat.id)
        return (
          <section key={cat.id} id={cat.id}>
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

      {/* Bottom SEO copy */}
      <section className="border-t pt-8 space-y-4">
        <h2 className="text-lg font-semibold">Why Use QuickDevTools?</h2>
        <div className="text-sm text-muted-foreground space-y-3 max-w-3xl">
          <p>
            QuickDevTools is a free collection of {tools.length} essential developer utilities designed
            for everyday coding tasks. Every tool runs entirely in your browser — nothing is sent
            to a server. This means your API keys, tokens, JSON payloads, and private data stay
            completely on your machine.
          </p>
          <p>
            Whether you need to format JSON, encode Base64 strings, generate UUIDs, test regular
            expressions, convert between data formats, or hash passwords, QuickDevTools has you
            covered. All tools load instantly with no signup, no ads, and no tracking.
          </p>
          <p>
            Built with modern web technologies, QuickDevTools works on any device with a browser —
            desktop, tablet, or mobile. Bookmark your favorite tools and access them anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
