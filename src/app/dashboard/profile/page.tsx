'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardProfilePage() {
    const { user, isUserLoading } = useAuth();

    if (isUserLoading || !user) {
        return (
             <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                    My Profile
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Manage your profile information.
                </p>
                <Card className="mt-8 max-w-2xl">
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-20 w-20 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-5 w-64" />
                            </div>
                        </div>
                         <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                            <Skeleton className="h-12 w-full mt-2" />
                        </div>
                        <Skeleton className="h-10 w-32" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                My Profile
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Manage your profile information.
            </p>

            <Card className="mt-8 max-w-2xl">
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.image || user.photoURL || ''} />
                            <AvatarFallback>{user.name ? user.name[0] : user.email[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-semibold">{user.name || "User"}</h2>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                        <p>{(user as any).bio || 'No bio available.'}</p>
                    </div>
                    <Button>Edit Profile</Button>
                </CardContent>
            </Card>
        </div>
    )
}
