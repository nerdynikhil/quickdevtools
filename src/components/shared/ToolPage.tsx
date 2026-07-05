import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, SITE_NAME, SITE_DEFAULT_OG_IMAGE } from '@/config/seo'
import { buildToolPageSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/config/structuredData'
import { toolsBySlug } from '@/registry/toolRegistry'
import { useSeoMeta } from '@/hooks/useSeoMeta'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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
  const navigate = useNavigate()
  const tool = findToolByTitle(title)
  const slug = tool?.slug ?? ''
  const keywords = tool?.keywords ?? []
  const seo = tool?.seoContent
  const pageTitle = seo?.titleTag ?? `${title} - ${SITE_NAME}`
  const pageDescription = seo?.metaDescription ?? description
  const pageUrl = `${SITE_URL}/${slug}`

  useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ...(slug ? { canonical: pageUrl } : {}),
    ...(keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
    ogType: 'website',
    ogSiteName: SITE_NAME,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ...(slug ? { ogUrl: pageUrl } : {}),
    ogImage: SITE_DEFAULT_OG_IMAGE,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: SITE_DEFAULT_OG_IMAGE,
  })

  // Build structured data array
  const structuredData: Record<string, unknown>[] = []
  if (tool) {
    structuredData.push(
      buildToolPageSchema({ name: title, description, slug, keywords }),
      buildBreadcrumbSchema({ name: title, slug })
    )
    if (seo?.faq && seo.faq.length > 0) {
      structuredData.push(buildFAQSchema(seo.faq))
    }
  }

  // Get related tools
  const relatedTools = (seo?.relatedSlugs ?? [])
    .map((s) => toolsBySlug.get(s))
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {structuredData.length > 0 && <JsonLd data={structuredData} />}

      {/* Tool Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {/* Tool Widget */}
      {children}

      {/* SEO Content Section */}
      {seo && (
        <div className="border-t pt-8 mt-8 space-y-8">
          {/* What Is */}
          {seo.whatIs && (
            <section>
              <h2 className="text-lg font-semibold mb-2">What is {title}?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {seo.whatIs}
              </p>
            </section>
          )}

          {/* How to Use */}
          {seo.howToUse && seo.howToUse.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2">How to Use</h2>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1.5 max-w-3xl">
                {seo.howToUse.map((step, i) => (
                  <li key={i} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </section>
          )}

          {/* Common Use Cases */}
          {seo.useCases && seo.useCases.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Common Use Cases</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 max-w-3xl">
                {seo.useCases.map((uc, i) => (
                  <li key={i} className="leading-relaxed">{uc}</li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQ */}
          {seo.faq && seo.faq.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Frequently Asked Questions</h2>
              <Accordion type="multiple" className="max-w-3xl">
                {seo.faq.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Related Tools</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-3xl">
                {relatedTools.map((rt) => rt && (
                  <Card
                    key={rt.slug}
                    className="cursor-pointer transition-colors hover:bg-accent"
                    onClick={() => navigate(`/${rt.slug}`)}
                  >
                    <CardHeader className="p-3">
                      <CardTitle className="text-xs font-medium">{rt.name}</CardTitle>
                      <CardDescription className="text-[11px]">{rt.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
