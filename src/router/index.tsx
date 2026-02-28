import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { tools } from '@/registry/toolRegistry'
import RootLayout from '@/components/layout/RootLayout'
import HomePage from '@/pages/HomePage'

function ToolLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      ...tools.map((tool) => ({
        path: tool.slug,
        element: (
          <Suspense fallback={<ToolLoader />}>
            <tool.component />
          </Suspense>
        ),
      })),
    ],
  },
])
