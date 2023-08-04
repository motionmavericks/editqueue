import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Login from "./@intercepts/(.)login/page"
import { SiteHeader } from "./components/site-header"
import Footer from "./components/Footer"

export default function IndexPage() {
  return (
    <div className="flex h-[100vh] w-full flex-col">
    <SiteHeader />
    <section className="container grid h-full items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dashboard
        </h1>
      
      </div>

    </section>
    < Footer />
    </div>
  )
}
