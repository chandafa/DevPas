import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import SiteHeader from '@/components/layout/header';
import SiteFooter from '@/components/layout/footer';
import { AuthProvider } from '@/lib/auth';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/lib/i18n/provider';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'DevPas Hub',
  description:
    'A community hub for aspiring developers to learn, connect, and grow.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <AuthProvider>
              <LanguageProvider>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <main className="flex-1 px-4 sm:px-6 lg:px-8">{children}</main>
                  <SiteFooter />
                </div>
                <Toaster />
              </LanguageProvider>
            </AuthProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
