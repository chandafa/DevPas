import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import type { Event } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          data-ai-hint={event.imageHint}
        />
      </div>
      <CardHeader>
        <Badge variant="secondary" className="w-fit">{event.type}</Badge>
        <CardTitle className="font-headline text-xl leading-tight pt-2 hover:text-primary">
          <Link href={`/events/${event.id}`}>{event.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{eventDate}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/events/${event.id}`}>View Details & RSVP</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
