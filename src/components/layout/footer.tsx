'use client';

import Link from 'next/link';
import { Github, Linkedin, MessageCircle, Youtube } from 'lucide-react';
import { Icons } from '../icons';
import { useTranslation } from '@/lib/i18n/provider';

const socialLinks = [
    { name: 'Discord', href: '#', icon: MessageCircle },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'YouTube', href: '#', icon: Youtube },
]

export default function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-primary/20 bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
            {/* Column 1: Logo & About */}
            <div className="space-y-4">
                <Link href="/" className="flex items-center space-x-2">
                    <Icons.logo className="h-7 w-7" />
                    <span className="text-xl font-bold">{t('header.brand')}</span>
                </Link>
                <p className="text-sm text-muted-foreground max-w-xs">
                    {t('footer.tagline')}
                </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
                <h4 className="font-semibold uppercase text-muted-foreground tracking-wider">{t('footer.about_us_heading')}</h4>
                <nav className="grid grid-cols-2 gap-2 text-sm">
                    <Link href="/about" className="hover:text-primary transition-colors">{t('footer.about_us')}</Link>
                    <Link href="/courses" className="hover:text-primary transition-colors">{t('nav.courses')}</Link>
                    <Link href="/events" className="hover:text-primary transition-colors">{t('nav.events')}</Link>
                    <Link href="/forum" className="hover:text-primary transition-colors">{t('nav.forum')}</Link>
                    <Link href="/join-us" className="hover:text-primary transition-colors">{t('header.join_us')}</Link>
                    <Link href="#" className="hovertext-primary transition-colors">{t('footer.contact')}</Link>
                </nav>
            </div>

            {/* Column 3: Social & Newsletter */}
            <div className="space-y-4">
                <h4 className="font-semibold uppercase text-muted-foreground tracking-wider">{t('footer.connect_with_us')}</h4>
                <div className="flex space-x-4">
                    {socialLinks.map(social => (
                        <Link key={social.name} href={social.href} aria-label={social.name} className="text-muted-foreground hover:text-primary transition-colors">
                            <social.icon className="h-6 w-6" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
                {t('footer.copyright').replace('{year}', year.toString())}
            </p>
        </div>
      </div>
    </footer>
  );
}
