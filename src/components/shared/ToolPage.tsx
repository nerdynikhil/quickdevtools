import { useEffect, type ReactNode } from 'react'

interface ToolPageProps {
  title: string
  description: string
  children: ReactNode
}

export default function ToolPage({ title, description, children }: ToolPageProps) {
  useEffect(() => {
    document.title = `${title} - QuickDevTools`
    return () => { document.title = 'QuickDevTools' }
  }, [title])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </div>
  )
}
