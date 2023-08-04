
import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/app/(dashboard)/dashboard/settings/components/sidebar-nav"
import { SiteHeader } from "../components/site-header"
import LoadingFullFrame from "../components/LoadingFullFrame"
import { Suspense } from "react"
import Footer from "../components/Footer"


export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Display",
    href: "/dashboard/settings/display",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <><div className="flex">
      <Suspense fallback={<LoadingFullFrame />}>
      <SidebarNav items={sidebarNavItems} /> 
      <div className="flex h-[100vh] w-full flex-col">
      <SiteHeader />
        <div className="h-full space-y-6 overflow-y-auto p-10 pb-16">
        <div className="space-y-0.5">
        </div>
        
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
        </div>
        <Footer />
      </div>
      </Suspense>
    </div>
    </>
  )
}
