import { useLocation, useNavigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { categories } from '@/registry/categories'
import { getToolsByCategory } from '@/registry/toolRegistry'
import { Wrench } from 'lucide-react'

export default function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => navigate('/')}
              className="cursor-pointer"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">QuickDevTools</span>
                <span className="text-xs text-muted-foreground">Developer Utilities</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          {categories.map((cat) => {
            const catTools = getToolsByCategory(cat.id)
            return (
              <SidebarGroup key={cat.id}>
                <SidebarGroupLabel>
                  <cat.icon className="mr-2 h-4 w-4" />
                  {cat.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {catTools.map((tool) => (
                      <SidebarMenuItem key={tool.slug}>
                        <SidebarMenuButton
                          isActive={location.pathname === `/${tool.slug}`}
                          onClick={() => navigate(`/${tool.slug}`)}
                          className="cursor-pointer"
                        >
                          {tool.name}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          })}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}
