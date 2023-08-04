
import "@/styles/globals.css"
import { SiteHeader } from "../components/site-header"


export default function DashboardLayout({
  children,

}: {
  children: React.ReactNode

}) {


  return (
    <>
      <div><SiteHeader />{children}</div>
    </>
  )
}
