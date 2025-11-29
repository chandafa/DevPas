"use client"

import * as React from "react"
import { Globe, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/i18n/provider";

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

const languages = [
    { name: "English", code: "en" },
    { name: "Indonesia", code: "id" },
]

export function LanguageToggle() {
  const { toast } = useToast()
  const { locale, setLocale, t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageChange = (langCode: 'id' | 'en', langName: string) => {
    setLocale(langCode);
    toast({
      title: t('language_toggle.changed_title'),
      description: t('language_toggle.changed_description').replace('{langName}', langName),
    })
  }

  if (!mounted) {
    return (
        <Button variant="ghost" size="icon" className="h-5 w-5" disabled>
            <Globe className="h-5 w-5" />
        </Button>
    )
  }

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('language_toggle.tooltip')}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent 
          align="end"
          className="min-w-0"
        >
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as 'id' | 'en', lang.name)}
              className="justify-between"
             >
              <span>{lang.name}</span>
              {locale === lang.code && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}
