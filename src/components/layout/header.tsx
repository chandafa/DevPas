'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import type { MainNavItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { UserNav } from '../user-nav';
import { ThemeToggle } from '../theme-toggle';
import { LanguageToggle } from '../language-toggle';
import { useTranslation } from '@/lib/i18n/provider';
import { Icons } from '../icons';

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const mainNav: MainNavItem[] = [
    { title: t('nav.courses'), href: '/courses' },
    { title: t('nav.events'), href: '/events' },
    { title: t('nav.forum'), href: '/forum' },
    { title: t('nav.about'), href: '/about' },
    { title: t('nav.blog'), href: '/blog' },
    { title: t('nav.achievement'), href: '/achievement' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-start">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-7 w-7" />
              <span className="font-bold sm:inline-block">{t('header.brand')}</span>
            </Link>
        </div>

        {/* Desktop Nav - Centered */}
        <nav className="hidden flex-1 items-center justify-center space-x-6 text-sm font-medium md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageToggle />
          <ThemeToggle />
          <UserNav />

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                   <Icons.logo className="h-7 w-7" />
                  <span className="font-bold">{t('header.brand')}</span>
                </Link>
              </SheetHeader>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border">
                  <nav className="space-y-2 py-6">
                    {mainNav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-secondary"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                  <div className="py-6">
                    {/* In mobile, UserNav is often better inside the sheet */}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
