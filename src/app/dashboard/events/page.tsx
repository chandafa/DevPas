import { EventCard } from "@/components/event-card";
import { events } from "@/lib/data";

export default function DashboardEventsPage() {
    return (
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Upcoming Events
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Your schedule of upcoming community events.
            </p>
             <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    )
}
