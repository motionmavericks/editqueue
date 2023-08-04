import Link from "next/link"

import { dashboardConfig } from "@/config/dashboard"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/app/(dashboard)/dashboard/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserNav } from "@/app/(dashboard)/dashboard/components/header/user-nav"
import { Separator } from "@/components/ui/separator"
import { NotificationsButton } from "./header/notifications"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-12 items-center space-x-4 px-5 sm:justify-between sm:space-x-0">
        <MainNav items={dashboardConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            
            <NotificationsButton />

            <UserNav />

          </nav>
        </div>
      </div>
    </header>
  )
}
