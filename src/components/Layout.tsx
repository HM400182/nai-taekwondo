import { Navbar } from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      <main className="w-full">
        {children}
      </main>
      <Toaster />
    </div>
  )
}