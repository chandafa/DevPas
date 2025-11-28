'use client';

import { events } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);
  const [isRsvp, setIsRsvp] = useState(false);
  const { toast } = useToast();

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleRsvp = () => {
    setIsRsvp(true);
    toast({
      title: 'RSVP Confirmed!',
      description: `You have successfully RSVP'd for ${event.title}.`,
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <div className="relative h-64 w-full md:h-96 rounded-lg overflow-hidden mb-8">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          data-ai-hint={event.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className='relative'>
        <div className="mb-8 space-y-4">
            <Badge variant="secondary" className="text-sm">{event.type}</Badge>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{eventDate}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location}</span>
                </div>
            </div>
        </div>

        <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className='text-lg'>{event.description}</p>
            <p>
                Join us for an exciting event where you can learn from industry experts, network with fellow developers, and get hands-on experience with the latest technologies. This event is perfect for both beginners and experienced professionals looking to expand their knowledge and connect with the community. Don't miss out on this opportunity to grow your skills and your network!
            </p>
        </div>

        <div className="mt-12 text-center">
            <Button size="lg" onClick={handleRsvp} disabled={isRsvp}>
                {isRsvp ? (
                    <>
                        <Check className="mr-2 h-5 w-5" />
                        You are going!
                    </>
                ) : (
                    <>
                        <Ticket className="mr-2 h-5 w-5" /> RSVP Now
                    </>
                )}
            </Button>
        </div>
      </div>
    </div>
  );
}
