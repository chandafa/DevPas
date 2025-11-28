import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { events } from "@/lib/data";
import { MoreHorizontal, PlusCircle } from "lucide-react";

export default function ManagerEventsPage() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                        Manage Events
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Create, update, and monitor all community events.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2" />
                    Create New Event
                </Button>
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>All Events</CardTitle>
                    <CardDescription>A list of all upcoming and past events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map(event => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{event.type}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal />
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
