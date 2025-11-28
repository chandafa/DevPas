import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, Users, BarChart } from "lucide-react";
import Link from "next/link";

const managerSections = [
    { title: "Event Management", icon: Calendar, description: "Create, edit, and manage community events.", href: "/dashboard/manager/events" },
    { title: "Member Engagement", icon: Users, description: "View member statistics and engagement.", href: "/dashboard/manager/members" },
    { title: "Content Analytics", icon: BarChart, description: "Analyze course and forum performance.", href: "/dashboard/manager/analytics" },
];

export default function DashboardManagerPage() {
    return (
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Manager Panel
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Oversee community operations and engagement.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {managerSections.map(section => (
                    <Link key={section.href} href={section.href}>
                        <Card className="hover:border-primary hover:bg-secondary/50 transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <section.icon className="h-8 w-8 text-primary" />
                                <div>
                                    <CardTitle className="font-headline">{section.title}</CardTitle>
                                    <CardDescription>{section.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
