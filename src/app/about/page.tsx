'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n/provider';
import { Eye, Rocket, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Rocket className="mb-4 h-8 w-8 text-primary" />,
      title: t('about_page.value_empowerment_title'),
      description: t('about_page.value_empowerment_description'),
    },
    {
      icon: <Users className="mb-4 h-8 w-8 text-primary" />,
      title: t('about_page.value_community_title'),
      description: t('about_page.value_community_description'),
    },
    {
      icon: <Eye className="mb-4 h-8 w-8 text-primary" />,
      title: t('about_page.value_accessibility_title'),
      description: t('about_page.value_accessibility_description'),
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t('about_page.title')}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {t('about_page.subtitle')}
        </p>
      </div>

      <div className="mt-16">
        <h2 className="mb-10 text-center font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
          {t('about_page.mission_title')}
        </h2>
        <div className="mx-auto max-w-3xl border bg-card p-6 text-center text-base shadow-lg md:p-8 md:text-lg">
          <p className="text-muted-foreground">
            {t('about_page.mission_description')}
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-10 text-center font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
          {t('about_page.values_title')}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="text-center">
              <CardHeader>
                {value.icon}
                <CardTitle className="font-headline">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

       <div className="mt-20 text-center">
        <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
          {t('about_page.join_journey_title')}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
          {t('about_page.join_journey_subtitle')}
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/join-us">{t('about_page.get_started_button')}</Link>
        </Button>
      </div>
    </div>
  );
}
