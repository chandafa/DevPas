'use client';

import { useTranslation } from '@/lib/i18n/provider';

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Welcome to our blog. Here we will share articles about technology and our community activities.
        </p>
      </div>

      <div className="mt-16 text-center text-muted-foreground">
        <p>Blog posts will be displayed here soon. Stay tuned!</p>
      </div>
    </div>
  );
}
