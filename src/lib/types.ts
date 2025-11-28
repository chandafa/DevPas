export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type Course = {
  id: string;
  title: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'Fullstack' | 'DevOps';
  modules: number;
  duration: string;
  imageUrl: string;
  imageHint: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  type: 'Workshop' | 'Meetup' | 'Hackathon';
  date: string;
  location: string;
  imageUrl: string;
  imageHint: string;
};

export type ForumThread = {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  authorAvatarHint: string;
  comments: number;
  likes: number;
  tags: string[];
  createdAt: string;
};
