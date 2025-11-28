'use client';

import { useState, useEffect } from 'react';
import { EventCard } from '@/components/event-card';
import { events } from '@/lib/data';
import type { Event } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EventsPage() {
  const [sortedEvents, setSortedEvents] = useState<Event[]>(events);
  const [sortOrder, setSortOrder] = useState('date-asc');

  useEffect(() => {
    const newEvents = [...events];
    switch (sortOrder) {
      case 'date-asc':
        newEvents.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case 'date-desc':
        newEvents.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case 'title-asc':
        newEvents.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        newEvents.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    setSortedEvents(newEvents);
  }, [sortOrder]);

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Community Events
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Join our workshops, meetups, and hackathons. Connect with peers, learn
          from experts, and grow your network.
        </p>
      </div>

      <div className="mb-8 flex justify-end">
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-asc">Date (Soonest)</SelectItem>
            <SelectItem value="date-desc">Date (Latest)</SelectItem>
            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
            <SelectItem value="title-desc">Title (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
