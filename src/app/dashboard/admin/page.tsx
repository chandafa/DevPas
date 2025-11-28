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
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Admin Panel
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Manage all aspects of the DevPas platform.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {adminSections.map(section => (
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
