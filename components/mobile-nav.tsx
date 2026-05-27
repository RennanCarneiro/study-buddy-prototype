"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Search,
  Calendar,
  HelpCircle,
  GraduationCap,
  Menu,
  X,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Buscar Monitor", href: "/find-tutor", icon: Search },
  { name: "Agendar Sessão", href: "/schedule", icon: Calendar },
  { name: "Meu Perfil", href: "/profile", icon: User },
  { name: "Suporte", href: "/support", icon: HelpCircle },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold">StudyBuddy</span>
      </Link>

      {/* Mobile Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 bg-sidebar p-0 text-sidebar-foreground">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
            <span className="font-semibold">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-1 p-3" aria-label="Mobile navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive
                        ? "text-sidebar-primary"
                        : "text-sidebar-foreground/50"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-sidebar-border p-3">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">
              Tema
            </p>
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
