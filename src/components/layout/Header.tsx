import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import ThemeToggle from '@/components/shared/ThemeToggle'
import { toolsBySlug } from '@/registry/toolRegistry'
import { categoryMap } from '@/registry/categories'
import SearchPalette, { SearchTrigger } from '@/components/shared/SearchPalette'

export default function Header() {
  const location = useLocation()
  const slug = location.pathname.slice(1)
  const tool = toolsBySlug.get(slug)
  const category = tool ? categoryMap.get(tool.category) : null
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-muted-foreground">{category.label}</span>
              </BreadcrumbItem>
            </>
          )}
          {tool && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{tool.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-2">
        <SearchTrigger onClick={() => setSearchOpen(true)} />
        <ThemeToggle />
      </div>
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
