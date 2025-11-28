'use server';

/**
 * @fileOverview A personalized recommendation AI agent.
 *
 * - personalizedRecommendations - A function that handles the recommendation process.
 * - PersonalizedRecommendationsInput - The input type for the personalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the personalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The profile of the user, including interests and goals.'),
  userActivity: z
    .string()
    .describe('The recent activity of the user on the platform.'),
  availableCourses: z.string().describe('The list of available courses.'),
  availableEvents: z.string().describe('The list of available events.'),
  availableForumDiscussions: z
    .string()
    .describe('The list of available forum discussions.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedCourses: z.string().describe('The recommended courses for the user.'),
  recommendedEvents: z.string().describe('The recommended events for the user.'),
  recommendedForumDiscussions: z
    .string()
    .describe('The recommended forum discussions for the user.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function personalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides personalized recommendations for courses, events, and forum discussions.

  Based on the user's profile and recent activity, you will recommend the most relevant courses, events, and forum discussions.

  User Profile: {{{userProfile}}}
  User Activity: {{{userActivity}}}
  Available Courses: {{{availableCourses}}}
  Available Events: {{{availableEvents}}}
  Available Forum Discussions: {{{availableForumDiscussions}}}

  Consider the user's interests, goals, and past activity to provide the best recommendations. Make sure to reason through the data before generating recommendations.

  Recommended Courses: {{{recommendedCourses}}}
  Recommended Events: {{{recommendedEvents}}}
  Recommended Forum Discussions: {{{recommendedForumDiscussions}}}
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
