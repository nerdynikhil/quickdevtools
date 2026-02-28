import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { router } from '@/router'
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_DEFAULT_OG_IMAGE,
} from '@/config/seo'
import { useSeoMeta } from '@/hooks/useSeoMeta'

function AppHead() {
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
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <AppHead />
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  )
}
