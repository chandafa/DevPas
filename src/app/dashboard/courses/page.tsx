import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";

export default function DashboardCoursesPage() {
    return (
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                My Courses
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Continue your learning journey.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {courses.slice(0, 2).map((course) => ( // Show a subset for "My Courses"
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    )
}
