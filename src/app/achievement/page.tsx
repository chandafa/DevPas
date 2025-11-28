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
        <Award className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-8 font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          My Achievements
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Track your progress and celebrate your accomplishments within the community.
        </p>
      </div>

       <Card className="mt-16">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <p className="text-muted-foreground">You've earned {earnedCount} of {totalCount} achievements.</p>
            <p className="font-bold text-primary">{Math.round(progressPercentage)}%</p>
          </div>
          <Progress value={progressPercentage} />
        </CardContent>
       </Card>

      <div className="mt-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((ach) => (
            <Card key={ach.title} className={`transition-opacity ${!ach.earned ? 'opacity-40' : ''}`}>
              <CardHeader className="flex flex-row items-center gap-4">
                {ach.icon}
                <div>
                  <CardTitle className="font-headline text-xl">{ach.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{ach.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Card className="mt-16">
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-2xl">My Portfolio</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            {portfolioProjects.length > 0 ? (
                portfolioProjects.map(project => (
                    <div key={project.title} className="rounded-lg border p-4">
                        <h4 className="font-semibold">{project.title}</h4>
                        <p className="text-sm text-muted-foreground my-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-muted-foreground py-8">
                    <p>You haven't added any projects yet.</p>
                    <p>An admin can add projects via the dashboard.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
