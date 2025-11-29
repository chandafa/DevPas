import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Calendar, MessageSquare } from "lucide-react";
import Link from "next/link";

const adminSections = [
    { title: "User Management", icon: Users, description: "View and manage all users.", href: "/dashboard/admin/users" },
    { title: "Course Management", icon: BookOpen, description: "Create and edit courses.", href: "/dashboard/admin/courses" },
    { title: "Event Management", icon: Calendar, description: "Organize community events.", href: "/dashboard/admin/events" },
    { title: "Forum Moderation", icon: MessageSquare, description: "Moderate discussions.", href: "/dashboard/admin/forum" },
];

export default function DashboardAdminPage() {
    return (
        <div>
            <h1 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
                Admin Panel
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
                Manage all aspects of the DevPas platform.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {adminSections.map(section => (
                    <Link key={section.href} href={section.href}>
                        <Card className="rounded-lg hover:border-primary hover:bg-secondary/50 transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4 p-4">
                                <section.icon className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                                <div>
                                    <CardTitle className="font-headline text-base sm:text-lg">{section.title}</CardTitle>
                                    <CardDescription className="text-sm">{section.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
