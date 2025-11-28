import { courses } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Layers, BookOpen } from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <div className="relative h-64 w-full md:h-96 rounded-lg overflow-hidden mb-8">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
          data-ai-hint={course.imageHint}
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className='relative'>
        <div className="mb-8 space-y-4">
            <Badge variant="secondary" className="text-sm">{course.category}</Badge>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                {course.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    <span>{course.modules} Modules</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                </div>
            </div>
        </div>

        <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className='text-lg'>{course.description}</p>
            {/* In a real app, course content like modules and lessons would be rendered here */}
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
            </p>
        </div>

        <div className="mt-12 text-center">
            <Button size="lg">
                <BookOpen className="mr-2 h-5 w-5" /> Start Learning
            </Button>
        </div>
      </div>
    </div>
  );
}
