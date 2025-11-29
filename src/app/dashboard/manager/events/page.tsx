import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { events } from "@/lib/data";
import { MoreHorizontal, PlusCircle } from "lucide-react";

export default function ManagerEventsPage() {
    return (
        <div>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
                        Manage Events
                    </h1>
                    <p className="mt-2 text-base text-muted-foreground">
                        Create, update, and monitor all community events.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Event
                </Button>
            </div>

            <Card className="mt-8 rounded-lg">
                <CardHeader>
                    <CardTitle>All Events</CardTitle>
                    <CardDescription>A list of all upcoming and past events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden sm:table-cell">Date</TableHead>
                                <TableHead className="hidden md:table-cell">Location</TableHead>
                                <TableHead className="hidden sm:table-cell">Type</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map(event => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{new Date(event.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="hidden md:table-cell">{event.location}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{event.type}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
