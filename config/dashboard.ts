import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  name: "EditQueue",
  description: "",
  mainNav: [
    {
      title: "Projects",
      href: "/dashboard/Projects",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ],
  sidebarNav: [
    {
      title: "Home",
      href: "/dashboard",
      icon: "home",
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: "projects",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
  sidebarBottomNav: [
    {
      title: "Search",
      href: "#",
      icon: "search",
    },
    {
      title: "Profile",
      href: "#",
      icon: "user",
    },
  ],
  sidebarNavItems: []
}