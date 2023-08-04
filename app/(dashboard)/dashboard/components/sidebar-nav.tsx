"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarBottomNavItem, SidebarNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { dashboardConfig } from "@/config/dashboard"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipArrow } from "@radix-ui/react-tooltip"


interface DashboardNavProps {
  items: SidebarNavItem[]
  bottomitems: SidebarBottomNavItem[]
}

export function DashboardSidebarNav({ items, bottomitems }: DashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <div className="bg-body h-[100vh] border-scale-500 flex w-14 flex-col justify-between border-r p-2">
      <TooltipProvider>
      <ul className="flex flex-col space-y-2">
        
          <div className="grid items-start gap-4">
            <div className="top-0 z-40 w-full bg-background">
              <div className="group flex h-10 w-10 items-center justify-center text-sm font-medium">
                <Link href="/dashboard">
                  <Icons.logo
                    className="h-7 w-7 text-emerald-400"
                    alt={dashboardConfig.name}
                  />
                </Link>
              </div>
            </div>

            {items.map((item, index) => {
              const Icon = Icons[item.icon || "arrowRight"];
              return (
                item.href && (
                  <Link key={index} href={item.disabled ? "/" : item.href}>
                    <span
                      className={cn(
                        "group flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        path === item.href ? "bg-accent" : "transparent",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger>
                          <Icon className="h-5 w-5" />
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={15}>
                          <TooltipArrow />
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </span>
                  </Link>
                )
              );
            })}

            <div className="flex-1" /> {/* This div will push the following content to the bottom */}
          </div>
      </ul>
      <ul>
        <div className="mt-auto grid gap-4"> {/* This grid will display the bottomitems at the bottom */}
          {bottomitems.map((item, index) => {
            const Icon = Icons[item.icon || "arrowRight"];
            return (
              item.href && (
                <Link key={index} href={item.disabled ? "/" : item.href}>
                  <span
                    className={cn(
                      "group flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      path === item.href ? "bg-accent" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <Icon className="h-5 w-5" />
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={15}>
                        <TooltipArrow />
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  </span>
                </Link>
              )
            );
          })}
        </div>
      </ul>
      </TooltipProvider>
    
    </div >
  );
}