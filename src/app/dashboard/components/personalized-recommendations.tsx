'use client';

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';

import { getPersonalizedRecommendations } from '@/app/actions/recommendations';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CourseCard } from '@/components/course-card';
import { EventCard } from '@/components/event-card';
import type { Course, Event, ForumThread } from '@/lib/types';
import Link from 'next/link';

type RecommendationData = {
  courses: Course[];
  events: Event[];
  discussions: ForumThread[];
};

export function PersonalizedRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] =
    useState<RecommendationData | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await getPersonalizedRecommendations();
      if (result.error) {
        throw new Error(result.error);
      }
      setRecommendations(result as RecommendationData);
    } catch (error) {
      toast({
        title: 'Error Generating Recommendations',
        description:
          error instanceof Error
            ? error.message
            : 'An unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Your Personalized Learning Path
        </CardTitle>
        <CardDescription>
          Based on your profile and activity, here are some suggestions to help
          you on your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!recommendations && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
            <Wand2 className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">Ready for your recommendations?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the button to generate AI-powered suggestions.
            </p>
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Generating...' : 'Generate My Path'}
            </Button>
          </div>
        )}

        {recommendations && (
            <div>
                 <Button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="mb-6"
                    variant="outline"
                    >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    {isLoading ? 'Regenerating...' : 'Regenerate Path'}
                </Button>

                <div className="space-y-8">
                    <div>
                        <h3 className="font-headline text-xl font-semibold mb-4">Recommended Courses</h3>
                        {recommendations.courses.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recommendations.courses.map(course => <CourseCard key={course.id} course={course} />)}
                        </div>
                        ) : <p className='text-muted-foreground'>No course recommendations at this time.</p>}
                    </div>
                     <div>
                        <h3 className="font-headline text-xl font-semibold mb-4">Recommended Events</h3>
                         {recommendations.events.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recommendations.events.map(event => <EventCard key={event.id} event={event} />)}
                        </div>
                        ) : <p className='text-muted-foreground'>No event recommendations at this time.</p>}
                    </div>
                     <div>
                        <h3 className="font-headline text-xl font-semibold mb-4">Recommended Discussions</h3>
                        {recommendations.discussions.length > 0 ? (
                        <div className="space-y-4">
                            {recommendations.discussions.map(thread => (
                                <Link href={`/forum/${thread.id}`} key={thread.id} className="block rounded-lg border p-4 hover:bg-secondary/50">
                                    <h4 className="font-semibold">{thread.title}</h4>
                                    <p className="text-sm text-muted-foreground">Started by {thread.author}</p>
                                </Link>
                            ))}
                        </div>
                         ) : <p className='text-muted-foreground'>No discussion recommendations at this time.</p>}
                    </div>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
