import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Rocket, Users } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: <Rocket className="mb-4 h-8 w-8 text-primary" />,
    title: 'Empowerment',
    description: 'We provide the tools and knowledge for anyone to start their journey in technology, fostering growth and confidence.',
  },
  {
    icon: <Users className="mb-4 h-8 w-8 text-primary" />,
    title: 'Community',
    description: 'We believe in the power of collaboration. Our platform is a space for learning, sharing, and growing together.',
  },
  {
    icon: <Eye className="mb-4 h-8 w-8 text-primary" />,
    title: 'Accessibility',
    description: 'High-quality tech education should be accessible to all, regardless of background or experience.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          About DevPas
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          We are a passionate community dedicated to helping aspiring developers take their first, most crucial steps into the world of technology.
        </p>
      </div>

      <div className="mt-20">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Our Mission
        </h2>
        <div className="mx-auto max-w-3xl rounded-xl border bg-card p-8 text-center text-lg shadow-lg">
          <p className="text-muted-foreground">
            To build a supportive and inclusive ecosystem where beginners can learn practical skills, connect with peers and mentors, and confidently launch their careers in the tech industry. We aim to break down barriers and make technology education accessible to everyone, everywhere.
          </p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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

       <div className="mt-24 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Join Our Journey
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Become a part of our growing community and start your tech journey today.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/join-us">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
