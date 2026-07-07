import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.va) {
      window.va('pageview', { page: location.pathname + location.search })
    }
  }, [location])

  return <Analytics />
}