
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n/provider';
import { useFirebase } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { auth, firestore } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const emailFromParams = searchParams.get('email');
  const { t } = useTranslation();

  const registrationSchema = z.object({
    name: z.string().min(2, { message: t('register_page.validation.name_min') }),
    university: z.string().min(3, { message: t('register_page.validation.university_required') }),
    major: z.string().min(2, { message: t('register_page.validation.major_required') }),
    year: z.string().min(4, { message: t('register_page.validation.year_min') }).max(4),
    npm: z.string().min(5, { message: t('register_page.validation.npm_required') }),
    email: z.string().email(),
    password: z.string().min(8, { message: t('register_page.validation.password_min') }),
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    message: t('register_page.validation.password_match'),
    path: ["confirmPassword"],
  });

  type RegistrationFormData = z.infer<typeof registrationSchema>;

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      university: '',
      major: '',
      year: '',
      npm: '',
      email: emailFromParams || '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (emailFromParams) {
      form.setValue('email', emailFromParams);
    }
  }, [emailFromParams, form]);


  async function onSubmit(data: RegistrationFormData) {
    setIsLoading(true);
    if (!auth || !firestore) {
        toast({
            title: "Error",
            description: "Firebase is not initialized.",
            variant: "destructive"
        });
        setIsLoading(false);
        return;
    }

    try {
        // Step 1: Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        // Step 2: Save user profile to Firestore
        const userProfile = {
            name: data.name,
            email: data.email,
            university: data.university,
            major: data.major,
            year: data.year,
            npm: data.npm,
            role: 'member' // Default role
        };

        const userDocRef = doc(firestore, 'userProfiles', user.uid);
        await setDoc(userDocRef, userProfile);

        toast({
            title: t('register_page.toast_success_title'),
            description: t('register_page.toast_success_description'),
        });
        
        router.push('/dashboard');

    } catch (error: any) {
        let errorMessage = 'An unknown error occurred.';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'This email address is already in use by another account.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        toast({
            title: 'Registration Failed',
            description: errorMessage,
            variant: "destructive"
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center py-12">
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{t('register_page.title')}</CardTitle>
                <CardDescription>{t('register_page.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('register_page.form_name_label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('register_page.form_name_placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('register_page.form_email_label')}</FormLabel>
                            <FormControl>
                                <Input placeholder="your.email@example.com" {...field} readOnly={!!emailFromParams} disabled={!!emailFromParams}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                     <FormField
                      control={form.control}
                      name="university"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('register_page.form_university_label')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('register_page.form_university_placeholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                         <FormField
                          control={form.control}
                          name="major"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('register_page.form_major_label')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('register_page.form_major_placeholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('register_page.form_year_label')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('register_page.form_year_placeholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="npm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('register_page.form_npm_label')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('register_page.form_npm_placeholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('register_page.form_password_label')}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('register_page.form_confirm_password_label')}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {t('register_page.create_account_button')}
                    </Button>
                  </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
