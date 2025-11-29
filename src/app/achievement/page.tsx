import { Award, CheckCircle2, Star, Shield, Trophy, Briefcase, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const achievements = [
  { icon: <Star className="h-8 w-8 text-yellow-400" />, title: 'Course Starter', description: 'Finish your first module', earned: true },
  { icon: <CheckCircle2 className="h-8 w-8 text-green-500" />, title: 'React Beginner', description: 'Complete the React for Beginners course', earned: true },
  { icon: <Trophy className="h-8 w-8 text-amber-500" />, title: 'Frontend Pro', description: 'Complete 3 frontend courses', earned: false },
  { icon: <Shield className="h-8 w-8 text-blue-500" />, title: 'Community Helper', description: 'Get 10 likes on your forum posts', earned: true },
  { icon: <Award className="h-8 w-8 text-primary" />, title: 'Event Enthusiast', description: 'Attend 3 community events', earned: false },
  { icon: <Star className="h-8 w-8 text-yellow-400" />, title: 'Knowledge Sharer', description: 'Start your first forum discussion', earned: true },
]

const portfolioProjects = [
    { title: 'Personal Website', description: 'My personal portfolio built with Next.js and Tailwind CSS.', tags: ['Next.js', 'React', 'Tailwind CSS'] },
    { title: 'Community Forum App', description: 'A small forum application developed during the React course.', tags: ['React', 'Firebase'] },
]

export default function AchievementPage() {
  const earnedCount = achievements.filter(a => a.earned).length;
  const totalCount = achievements.length;
  const progressPercentage = (earnedCount / totalCount) * 100;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <Award className="mx-auto h-12 w-12 text-primary sm:h-16 sm:w-16" />
        <h1 className="mt-6 font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          My Achievements
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Track your progress and celebrate your accomplishments within the community.
        </p>
      </div>

       <Card className="mt-12 rounded-lg sm:mt-16">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground sm:text-base">You've earned {earnedCount} of {totalCount} achievements.</p>
            <p className="font-bold text-primary">{Math.round(progressPercentage)}%</p>
          </div>
          <Progress value={progressPercentage} />
        </CardContent>
       </Card>

      <div className="mt-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((ach) => (
            <Card key={ach.title} className={`rounded-lg transition-opacity ${!ach.earned ? 'opacity-40' : ''}`}>
              <CardHeader className="flex flex-row items-center gap-4">
                {ach.icon}
                <div>
                  <CardTitle className="font-headline text-lg sm:text-xl">{ach.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{ach.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Card className="mt-16 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
                <Briefcase className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                <CardTitle className="font-headline text-xl sm:text-2xl">My Portfolio</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            {portfolioProjects.length > 0 ? (
                portfolioProjects.map(project => (
                    <div key={project.title} className="rounded-lg border p-4">
                        <h4 className="font-semibold">{project.title}</h4>
                        <p className="my-2 text-sm text-muted-foreground">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="py-8 text-center text-muted-foreground">
                    <p>You haven't added any projects yet.</p>
                    <p>An admin can add projects via the dashboard.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
