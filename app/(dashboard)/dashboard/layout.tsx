

import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/app/(dashboard)/dashboard/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Icons } from "@/components/icons"
import { dashboardConfig } from "@/config/dashboard"
import Link from "next/link"
import { DashboardSidebarNav } from "./components/sidebar-nav"
import { Suspense } from "react"
import  LoadingFullFrame  from "@/app/(dashboard)/dashboard/components/LoadingFullFrame"
import Footer from "./components/Footer"




export default function DashboardLayout({
  children,
  intercepts,
}: {
  children: React.ReactNode
  intercepts: React.ReactNode
}) {


  return (
    <>
      <html lang="en" suppressHydrationWarning>
        
        <body
          className={cn(
            "min-h-screen overflow-hidden bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
                
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Suspense fallback={<LoadingFullFrame />}>
            <div className="flex h-[100vh] w-full flex-col">
              <div className="flex">

                  <DashboardSidebarNav items={dashboardConfig.sidebarNav} bottomitems={dashboardConfig.sidebarBottomNav}  />
                  
                <main className="flex h-full w-full flex-1 flex-col">
                  


                  {intercepts}{children}
                  
                </main>
              </div>
              
            </div>
            </Suspense>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
