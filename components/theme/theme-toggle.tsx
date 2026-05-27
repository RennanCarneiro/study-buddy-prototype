"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppTheme } from "@/components/theme/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useAppTheme()
  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-full gap-2 justify-center"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isDark ? "Modo claro" : "Modo escuro"}
    </Button>
  )
}
