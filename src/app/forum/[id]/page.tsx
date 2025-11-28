import { forumDiscussions } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageSquare } from 'lucide-react';

const mockComments = [
    {
      id: 1,
      author: 'David Kim',
      authorAvatar: 'https://picsum.photos/seed/user-david/100/100',
      authorAvatarHint: 'man portrait',
      text: "Great question! For smaller apps, `useState` and `useContext` are often enough. For larger, more complex apps, I'd recommend looking into libraries like Redux or Zustand. Zustand is great for its simplicity.",
      createdAt: '2 days ago',
    },
    {
      id: 2,
      author: 'Alex',
      authorAvatar: 'https://picsum.photos/seed/user-alex/100/100',
      authorAvatarHint: 'man portrait',
      text: "I agree with David. I've been using Zustand on my latest project and it's been a fantastic experience. Much less boilerplate than Redux.",
      createdAt: '1 day ago',
    },
];

export default function ForumThreadPage({ params }: { params: { id: string } }) {
  const thread = forumDiscussions.find((t) => t.id === params.id);

  if (!thread) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Main Thread Post */}
        <Card className='mb-8'>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={thread.authorAvatar} data-ai-hint={thread.authorAvatarHint}/>
                            <AvatarFallback>{thread.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{thread.author}</p>
                            <p className="text-sm text-muted-foreground">{thread.createdAt}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{thread.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{thread.comments}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <h1 className="font-headline text-3xl font-bold mb-4">{thread.title}</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                    {thread.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                </div>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>
                        Hey everyone, I've been working with React for a few months now and I'm starting to get to the point where managing state is becoming a bit tricky. I've heard about so many different solutions like Context API, Redux, MobX, Zustand, etc.
                    </p>
                    <p>
                        What are you all using in your projects? What are the pros and cons you've found? Looking for some advice on what to learn next. Thanks!
                    </p>
                </div>
            </CardContent>
        </Card>

        {/* Comments Section */}
        <h2 className="font-headline text-2xl font-bold mb-6">{mockComments.length} Replies</h2>
        <div className="space-y-6">
            {mockComments.map(comment => (
                <Card key={comment.id}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.authorAvatar} data-ai-hint={comment.authorAvatarHint}/>
                                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{comment.author}</p>
                                    <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <ThumbsUp className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{comment.text}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

         {/* Reply Form */}
        <Card className="mt-8">
            <CardHeader>
                <h3 className="text-lg font-semibold">Your Reply</h3>
            </CardHeader>
            <CardContent>
                <Textarea placeholder="Write your comment here..."/>
            </CardContent>
            <CardFooter>
                <Button>Post Reply</Button>
            </CardFooter>
        </Card>
    </div>
  );
}
