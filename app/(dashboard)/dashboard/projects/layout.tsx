

import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"
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
    title: "All Projects",
    href: "/dashboard/projects",
  },
  {
    title: "Create Project",
    href: "/dashboard/settings/projects/new",
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
          <div className="flex-1">{children}</div>
        </div>
        </div>
        <Footer />
      </div>
      </Suspense>
    </div>
    </>
  )
}
