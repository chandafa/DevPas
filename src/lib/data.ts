import type { Course, Event, ForumThread } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((p) => p.id === id);
  return {
    url: image?.imageUrl || '',
    hint: image?.imageHint || '',
  };
};

export const courses: Course[] = [
  {
    id: '1',
    title: 'React for Beginners',
    description:
      'Master the fundamentals of React and build modern, interactive web applications.',
    category: 'Frontend',
    modules: 12,
    duration: '8 hours',
    imageUrl: findImage('course-react').url,
    imageHint: findImage('course-react').hint,
  },
  {
    id: '2',
    title: 'Advanced Next.js',
    description:
      'Dive deep into Next.js features like server components, advanced routing, and optimization.',
    category: 'Fullstack',
    modules: 10,
    duration: '12 hours',
    imageUrl: findImage('course-nextjs').url,
    imageHint: findImage('course-nextjs').hint,
  },
  {
    id: '3',
    title: 'Database Design with MySQL',
    description:
      'Learn how to design, create, and manage relational databases effectively with MySQL.',
    category: 'Backend',
    modules: 15,
    duration: '10 hours',
    imageUrl: findImage('course-database').url,
    imageHint: findImage('course-database').hint,
  },
  {
    id: '4',
    title: 'Introduction to DevOps',
    description:
      'Understand the culture and practices of DevOps to improve development and deployment cycles.',
    category: 'DevOps',
    modules: 8,
    duration: '6 hours',
    imageUrl: findImage('course-devops').url,
    imageHint: findImage('course-devops').hint,
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Frontend Frameworks Workshop',
    description:
      'A hands-on workshop exploring the latest trends in frontend development.',
    type: 'Workshop',
    date: '2024-08-15',
    location: 'Online',
    imageUrl: findImage('event-workshop').url,
    imageHint: findImage('event-workshop').hint,
  },
  {
    id: '2',
    title: 'Monthly Developer Meetup',
    description:
      'Connect with fellow developers, share your projects, and network.',
    type: 'Meetup',
    date: '2024-08-25',
    location: 'Bandung',
    imageUrl: findImage('event-meetup').url,
    imageHint: findImage('event-meetup').hint,
  },
  {
    id: '3',
    title: 'Langkah Pemula Hackathon 2024',
    description: 'Build innovative solutions and compete for exciting prizes.',
    type: 'Hackathon',
    date: '2024-09-10',
    location: 'Jakarta',
    imageUrl: findImage('event-hackathon').url,
    imageHint: findImage('event-hackathon').hint,
  },
];

export const forumDiscussions: ForumThread[] = [
  {
    id: '1',
    title: 'Best practices for state management in React?',
    author: 'Sarah Lee',
    authorAvatar: findImage('user-avatar-1').url,
    authorAvatarHint: findImage('user-avatar-1').hint,
    comments: 12,
    likes: 34,
    tags: ['react', 'state-management', 'frontend'],
    createdAt: '2 days ago',
  },
  {
    id: '2',
    title: 'How to deploy a Next.js app to Firebase?',
    author: 'David Kim',
    authorAvatar: findImage('user-avatar-2').url,
    authorAvatarHint: findImage('user-avatar-2').hint,
    comments: 8,
    likes: 22,
    tags: ['nextjs', 'firebase', 'deployment'],
    createdAt: '5 days ago',
  },
  {
    id: '3',
    title: 'Show off your latest project!',
    author: 'Maria Garcia',
    authorAvatar: findImage('user-avatar-3').url,
    authorAvatarHint: findImage('user-avatar-3').hint,
    comments: 25,
    likes: 51,
    tags: ['showcase', 'projects', 'community'],
    createdAt: '1 week ago',
  },
];
