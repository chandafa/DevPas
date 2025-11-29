'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { forumDiscussions } from '@/lib/data';
import { ThumbsUp, MessageSquare, Loader2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/provider';

const discussionFormSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  content: z.string().min(10, {
    message: 'Content must be at least 10 characters.',
  }),
  tags: z.string().optional(),
});

type DiscussionFormData = z.infer<typeof discussionFormSchema>;

export default function ForumPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<DiscussionFormData>({
    resolver: zodResolver(discussionFormSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
    },
  });

  function onSubmit(data: DiscussionFormData) {
    setIsLoading(true);
    console.log(data); // In a real app, this would be sent to the backend

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: 'Discussion Created!',
        description: 'Your new discussion has been successfully posted.',
      });
      // Here you would typically refetch the discussions or add the new one to the state
    }, 1500);
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <div className="mb-12 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            {t('forum_page.title')}
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {t('forum_page.subtitle')}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>{t('forum_page.new_discussion_button')}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Start a New Discussion</DialogTitle>
              <DialogDescription>
                Share your thoughts with the community. Fill out the details
                below.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="How to get started with..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="I'm having trouble with..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="react, nextjs, typescript" {...field} />
                      </FormControl>
                       <p className="text-sm text-muted-foreground">
                        Separate tags with a comma.
                       </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Post Discussion
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {forumDiscussions.map((thread) => (
          <Card key={thread.id}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <div>
                  <Link href={`/forum/${thread.id}`}>
                    <h2 className="font-headline text-lg font-semibold hover:text-primary sm:text-xl">
                      {thread.title}
                    </h2>
                  </Link>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {thread.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
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

              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={thread.authorAvatar}
                      alt={thread.author}
                      data-ai-hint={thread.authorAvatarHint}
                    />
                    <AvatarFallback>{thread.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{thread.author}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {thread.createdAt}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
