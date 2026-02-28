import { useNavigate } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { categories } from '@/registry/categories'
import { getToolsByCategory } from '@/registry/toolRegistry'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
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
