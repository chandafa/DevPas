import Image from 'next/image';
import Link from 'next/link';
import { Book, Clock, Layers } from 'lucide-react';
import type { Course } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
          data-ai-hint={course.imageHint}
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-xl leading-tight hover:text-primary">
              <Link href={`/courses/${course.id}`}>{course.title}</Link>
            </CardTitle>
            <Badge variant="secondary">{course.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <div className="flex w-full justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>{course.modules} Modules</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>
        <Button asChild className="w-full">
          <Link href={`/courses/${course.id}`}>Start Learning</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
