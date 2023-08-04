"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  
  return (
    <div className="border-scale-500 flex h-[100vh] w-60 flex-col border-r">
    <div className="flex h-12 items-center border-b p-6">
    <h2>Settings</h2>
    </div>
    <h2 className="px-7 pt-5 font-light">Manage</h2>
    <nav
      className={cn(
        "bg-body flex flex-col space-x-0 space-y-1 border-b p-5",
        className
      )}
      {...props}
    >
    
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "xs" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}

    </nav>
    </div>
  )
}
