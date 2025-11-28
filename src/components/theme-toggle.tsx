"use client"

import * as React from "react"
import { Moon, Sun, Flame, Building2, SunDim, Snowflake, Leaf, Orbit, Sparkles, Check } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const themes = [
    { name: "Terminus", theme: "dark", icon: Flame },
    { name: "Tokyo Night", theme: "theme-tokyo-night", icon: Building2 },
    { name: "Solarized", theme: "theme-solarized", icon: SunDim },
    { name: "Nord", theme: "theme-nord", icon: Snowflake },
    { name: "One Dark", theme: "theme-one-dark", icon: Moon },
    { name: "Gruvbox", theme: "theme-gruvbox", icon: Leaf },
    { name: "OLED Abyss", theme: "theme-oled-abyss", icon: Orbit },
    { name: "Solar Flare", theme: "theme-solar-flare", icon: Sparkles },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false);
  const [savedTheme, setSavedTheme] = React.useState(theme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const CurrentThemeIcon = themes.find(t => t.theme === theme)?.icon || Sun

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setSavedTheme(theme);
    } else {
        // If menu is closed without a selection, revert to the saved theme
        if (savedTheme) {
          setTheme(savedTheme);
        }
    }
  };
  
  const handleThemeSelect = (newTheme: string) => {
    setTheme(newTheme);
    setSavedTheme(newTheme); // Persist the new theme
  };

  const handleMouseEnter = (newTheme: string) => {
    setTheme(newTheme); // Preview theme
  };

  const handleMouseLeave = () => {
    if (savedTheme) {
      setTheme(savedTheme); // Revert to saved theme
    }
  };

  // Prevent hydration mismatch by rendering a placeholder until mounted on client
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-5 w-5" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <TooltipProvider>
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onMouseEnter={() => setIsOpen(true)}
                className="relative"
              >
                <CurrentThemeIcon className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ganti Tema</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent 
          align="end"
          className="min-w-0"
          onMouseLeave={() => setIsOpen(false)}
        >
          {themes.map((t) => (
            <Tooltip key={t.theme}>
              <TooltipTrigger asChild>
                <DropdownMenuItem 
                  onClick={() => handleThemeSelect(t.theme)}
                  onMouseEnter={() => handleMouseEnter(t.theme)}
                  onMouseLeave={handleMouseLeave}
                  className="justify-center !p-2"
                 >
                  <t.icon className="h-5 w-5" />
                  {theme === t.theme && <Check className="absolute right-2 h-4 w-4" />}
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{t.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}
