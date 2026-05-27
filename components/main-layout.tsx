"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { Toaster } from "@/components/ui/toaster"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="min-h-screen">
          {children}
          <Toaster />
        </div>
      </main>
    </div>
  )
}
