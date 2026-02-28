import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from './seo'

export function buildHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function buildToolPageSchema(tool: {
  name: string
  description: string
  slug: string
  keywords: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${tool.name} - ${SITE_NAME}`,
    url: `${SITE_URL}/${tool.slug}`,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    keywords: tool.keywords.join(', '),
  }
}

export function buildBreadcrumbSchema(tool?: {
  name: string
  slug: string
}) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: `${SITE_NAME} - ${SITE_TAGLINE}`,
      item: SITE_URL,
    },
  ]

  if (tool) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: tool.name,
      item: `${SITE_URL}/${tool.slug}`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}
