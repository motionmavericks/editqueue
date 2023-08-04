import { Icons } from "@/components/icons"
import type { Icon } from "lucide-react"


export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      
    }
)

export type SidebarBottomNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      
    }
)

export type DashboardConfig = {
  sidebarNavItems: { href: string; title: string }[]
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  sidebarBottomNav: SidebarBottomNavItem[]
  name: string
  description: string
  
}
