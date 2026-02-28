import { RouterProvider } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
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

export default function App() {
  const fullTitle = `${SITE_NAME} - ${SITE_TAGLINE}`

  return (
    <HelmetProvider>
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
      <ThemeProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
