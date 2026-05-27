"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Search,
  Calendar,
  HelpCircle,
  GraduationCap,
  LogOut,
  User,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme/theme-toggle"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Buscar Monitor", href: "/find-tutor", icon: Search },
  { name: "Agendar Sessão", href: "/schedule", icon: Calendar },
  { name: "Meu Perfil", href: "/profile", icon: User },
  { name: "Suporte", href: "/support", icon: HelpCircle },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight">StudyBuddy</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Main navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-3 px-3 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="" />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                  MS
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium">Maria Silva</span>
                <span className="text-xs text-sidebar-foreground/60">
                  Estudante
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <Link href="/profile" passHref>
              <DropdownMenuItem asChild>
                <button>
                  <User className="mr-2 h-4 w-4" />
                  Meu Perfil
                </button>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notificações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border-t border-sidebar-border p-3">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">
          Tema
        </p>
        <ThemeToggle />
      </div>
    </aside>
  )
}
