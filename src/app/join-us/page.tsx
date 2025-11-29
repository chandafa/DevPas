
'use client';

import { Icons } from '@/components/icons';
import { UserAuthForm } from '@/components/user-auth-form';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function JoinUsPage() {
  const { isLoggedIn, isUserLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Ketika status loading selesai dan user sudah login, arahkan ke dashboard
    if (!isUserLoading && isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, isUserLoading, router]);

  // Selama status loading atau jika user sudah login, tampilkan loader
  // untuk mencegah tampilan singkat halaman login sebelum redirect.
  if (isUserLoading || isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Jika tidak loading dan belum login, tampilkan halaman join-us
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center py-12 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="mr-2 h-6 w-6" />
          DevPas
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;The journey of a thousand miles begins with a single
              step.&rdquo;
            </p>
            <footer className="text-sm">Lao Tzu</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account or sign in.
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
