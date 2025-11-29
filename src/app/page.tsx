
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  HeartHandshake,
  MessageSquare,
  Users,
  Vote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { courses, events } from '@/lib/data';
import { CourseCard } from '@/components/course-card';
import { EventCard } from '@/components/event-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/provider';

const stats = [
  { value: '500+', label: 'Anggota Aktif' },
  { value: '30+', label: 'Event Terselenggara' },
  { value: '1000+', label: 'Sertifikat Terbit' },
];

const testimonials = [
  {
    name: 'Alex',
    image: 'https://picsum.photos/seed/user-alex/100/100',
    imageHint: 'man portrait',
    quote:
      'Workshop di sini benar-benar membuka wawasan saya tentang pengembangan web modern. Materinya relevan dan mentornya sangat membantu!',
  },
  {
    name: 'Sarah',
    image: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageHint || '',
    quote:
      'Saya menemukan banyak teman baru di komunitas ini. Lingkungannya sangat suportif untuk pemula seperti saya.',
  },
  {
    name: 'David',
    image: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageHint || '',
    quote:
      'Kursus Next.js-nya luar biasa! Penjelasannya mudah diikuti dan proyek akhirnya sangat menantang. Sangat direkomendasikan.',
  },
];

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

const OrgChartNode = ({ name, role, children }: { name: string; role: string; children?: React.ReactNode }) => (
    <div className="relative flex flex-col items-center">
        {/* Connector line from parent */}
        <div className="absolute top-0 h-8 w-0.5 bg-border -z-10"></div>
        
        {/* Node Content */}
        <div className="flex flex-col items-center text-center bg-background z-10 px-2">
            <Avatar>
                <AvatarImage src={`https://picsum.photos/seed/${name.toLowerCase().replace(/ /g, '-')}/100/100`} />
                <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <h4 className="mt-2 font-semibold text-sm">{name}</h4>
            <p className="text-xs text-muted-foreground">{role}</p>
        </div>

        {/* Children container */}
        {children && (
            <div className="mt-8 flex justify-center gap-4 md:gap-8 relative">
                 {/* Horizontal line connecting children */}
                <div className="absolute top-0 h-0.5 w-full bg-border -z-10"></div>
                {children}
            </div>
        )}
    </div>
);


export default function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: t('nav.forum'),
      description:
        'Tanya jawab, berbagi ilmu, dan terhubung dengan sesama anggota.',
      href: '/forum',
    },
    {
      icon: <CalendarDays className="h-10 w-10 text-primary" />,
      title: t('nav.events'),
      description:
        'Ikuti workshop, webinar, dan meetup untuk menambah wawasan dan jaringan.',
      href: '/events',
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: t('nav.courses'),
      description:
        'Belajar mandiri dengan kurikulum terstruktur dan dapatkan sertifikat.',
      href: '/courses',
    },
    {
      icon: <Vote className="h-10 w-10 text-primary" />,
      title: 'Voting Digital',
      description:
        'Ikut serta dalam pengambilan keputusan dan arah komunitas secara transparan.',
      href: '#',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center justify-center min-h-screen">
           {heroImage && <Image
                src={heroImage.imageUrl}
                alt="Hero background"
                fill
                className="object-cover object-center z-[-1] opacity-10"
                data-ai-hint={heroImage.imageHint}
            />}
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/join-us">{t('hero.join_button')}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/events">{t('hero.events_button')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-secondary/30 py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                  {t('about_section.title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('about_section.description')}
                </p>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link href="/about">
                    {t('about_section.learn_more')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-lg bg-card p-6 text-center shadow-lg">
                  <BookOpen className="mx-auto h-10 w-10 text-primary mb-2" />
                  <h3 className="text-lg font-semibold">{t('about_section.learn')}</h3>
                </div>
                <div className="rounded-lg bg-card p-6 text-center shadow-lg">
                  <HeartHandshake className="mx-auto h-10 w-10 text-primary mb-2" />
                  <h3 className="text-lg font-semibold">{t('about_section.collaborate')}</h3>
                </div>
                <div className="rounded-lg bg-card p-6 text-center shadow-lg col-span-2">
                  <Users className="mx-auto h-10 w-10 text-primary mb-2" />
                  <h3 className="text-lg font-semibold">{t('about_section.contribute')}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Org Structure Section */}
        <section className="py-20 md:py-28">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                 <div className="mx-auto max-w-2xl text-center mb-20">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                        {t('org_structure_section.title')}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {t('org_structure_section.description')}
                    </p>
                </div>
                
                <div className="flex justify-center">
                    <div className="relative flex flex-col items-center">
                        {/* Root Node */}
                        <div className="flex flex-col items-center text-center bg-background z-10 px-2">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="https://picsum.photos/seed/andi/100/100" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <h4 className="mt-2 font-semibold text-lg">{t('org_structure_section.chairman')}</h4>
                            <p className="text-sm text-muted-foreground">Candra Kirana</p>
                        </div>

                        {/* Connecting line to second level */}
                        <div className="absolute top-28 h-8 w-0.5 bg-border -z-10"></div>
                        <div className="absolute top-36 h-0.5 w-full bg-border -z-10"></div>
                        
                        {/* Second Level: Secretary & Treasurer */}
                        <div className="mt-16 flex w-full justify-center gap-16 md:gap-32">
                             <OrgChartNode name="Desi Hafita" role="Sekretaris" />
                             <OrgChartNode name="Dwi " role="Bendahara" />
                        </div>

                        {/* Connecting line to divisions */}
                        <div className="absolute top-36 h-[14rem] w-0.5 bg-border -z-10"></div>
                        <div className="absolute top-[18rem] h-0.5 w-full max-w-4xl bg-border -z-10"></div>

                        {/* Third Level: Divisions */}
                        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 w-full max-w-4xl">
                           <OrgChartNode name="Dzaky" role={t('org_structure_section.education_head')}>
                                <div className="flex gap-8">
                                    <OrgChartNode name="Citra" role={t('org_structure_section.ecourse_coord')} />
                                    <OrgChartNode name="Dewi" role={t('org_structure_section.workshop_coord')} />
                                </div>
                            </OrgChartNode>
                            <OrgChartNode name="Eka" role={t('org_structure_section.event_head')}>
                                 <div className="flex gap-8">
                                    <OrgChartNode name="Fajar" role={t('org_structure_section.meetup_coord')} />
                                    <OrgChartNode name="Gita" role={t('org_structure_section.competition_coord')} />
                                </div>
                            </OrgChartNode>
                             <OrgChartNode name="Hadi" role="Kepala Humas">
                                 <div className="flex gap-8">
                                    <OrgChartNode name="Indah" role="Koordinator Media" />
                                    <OrgChartNode name="Joko" role="Koordinator Partner" />
                                </div>
                            </OrgChartNode>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* Feature Highlights */}
        <section className="bg-secondary/30 py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                {t('features_section.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href}>
                    <div className="h-full rounded-lg border bg-card p-6 shadow-sm hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
                    {feature.icon}
                    <h3 className="mt-4 text-xl font-bold font-headline">
                        {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {feature.description}
                    </p>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                {t('upcoming_events_section.title')}
              </h2>
              <Button asChild variant="outline" className="rounded-lg">
                <Link href="/events">{t('upcoming_events_section.view_all')}</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Courses */}
        <section className="bg-secondary/30 py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                {t('popular_courses_section.title')}
              </h2>
              <Button asChild variant="outline" className="rounded-lg">
                <Link href="/courses">{t('popular_courses_section.view_all')}</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Community Statistics */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-extrabold">
                    {stat.value}
                  </p>
                  <p className="text-lg text-primary-foreground/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
              {t('testimonials_section.title')}
            </h2>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1 h-full">
                      <Card className="h-full flex flex-col rounded-lg">
                        <CardContent className="flex-1 p-6 text-center">
                          <Avatar className="mx-auto h-20 w-20 mb-4">
                            <AvatarImage
                              src={testimonial.image}
                              alt={testimonial.name}
                              data-ai-hint={testimonial.imageHint}
                            />
                            <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                          </Avatar>
                          <p className="text-muted-foreground italic">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                        </CardContent>
                         <CardFooter className="pt-6 justify-center">
                           <p className="font-semibold">{testimonial.name}</p>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
            </Carousel>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center py-20 md:py-24">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                {t('cta_section.title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('cta_section.description')}
              </p>
              <Button asChild size="lg" className="mt-8 rounded-lg">
                <Link href="/join-us">{t('cta_section.join_button')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

    