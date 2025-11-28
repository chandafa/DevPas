'use client';

import { useState, useEffect } from 'react';
import { CourseCard } from '@/components/course-card';
import { courses } from '@/lib/data';
import type { Course } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const courseCategories = [
  'All',
  ...Array.from(new Set(courses.map((c) => c.category))),
];

export default function CoursesPage() {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('title-asc');

  useEffect(() => {
    let newCourses =
      selectedCategory === 'All'
        ? courses
        : courses.filter((c) => c.category === selectedCategory);

    switch (sortOrder) {
      case 'title-asc':
        newCourses.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        newCourses.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'duration-asc':
        newCourses.sort(
          (a, b) =>
            parseInt(a.duration.split(' ')[0]) -
            parseInt(b.duration.split(' ')[0])
        );
        break;
      case 'duration-desc':
        newCourses.sort(
          (a, b) =>
            parseInt(b.duration.split(' ')[0]) -
            parseInt(a.duration.split(' ')[0])
        );
        break;
    }

    setFilteredCourses([...newCourses]);
  }, [selectedCategory, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Our Courses
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          From fundamentals to advanced topics, our courses are designed to
          equip you with the skills needed in the modern tech landscape.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {courseCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
            <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            <SelectItem value="duration-asc">Duration (Shortest)</SelectItem>
            <SelectItem value="duration-desc">Duration (Longest)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
