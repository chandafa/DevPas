'use server';

import { personalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { courses, events, forumDiscussions } from '@/lib/data';

// Helper to find full image URL from mock data
const findImageDetails = (id: string, type: 'course' | 'event' | 'user') => {
  let item;
  if (type === 'course') {
    item = courses.find(c => c.id === id);
  } else if (type === 'event') {
    item = events.find(e => e.id === id);
  } else {
     item = forumDiscussions.find(f => f.author.toLowerCase().includes(id.toLowerCase()));
     return item ? { url: item.authorAvatar, hint: item.authorAvatarHint } : { url: '', hint: '' };
  }
  return item ? { url: item.imageUrl, hint: item.imageHint } : { url: '', hint: '' };
};


export async function getPersonalizedRecommendations() {
  try {
    // In a real app, you would fetch the current user's profile and activity from your database.
    const mockInput = {
      userProfile:
        'A beginner software developer interested in web development, especially Next.js and React. Wants to improve their skills and connect with other developers.',
      userActivity:
        'Viewed the "React for Beginners" course page. Liked a forum post about "state management". RSVP\'d to the "Monthly Developer Meetup".',
      // We stringify only the relevant data for the AI model to process.
      availableCourses: JSON.stringify(
        courses.map(({ id, title, description, category }) => ({
          id,
          title,
          description,
          category,
        }))
      ),
      availableEvents: JSON.stringify(
        events.map(({ id, title, description, type }) => ({
          id,
          title,
          description,
          type,
        }))
      ),
      availableForumDiscussions: JSON.stringify(
        forumDiscussions.map(({ id, title, tags }) => ({
          id,
          title,
          tags,
        }))
      ),
    };

    const recommendations = await personalizedRecommendations(mockInput);
    
    // The AI returns stringified JSON, so we need to parse it.
    // It's good practice to wrap this in a try-catch block
    // in case the AI returns malformed JSON or an unexpected format.
    try {
      // The AI might only return IDs, so we enrich the data with details from our mock data source.
      const recommendedCourses = JSON.parse(recommendations.recommendedCourses).map((rec: {id: string}) => {
        const course = courses.find(c => c.id === rec.id);
        return course;
      }).filter(Boolean);
      
      const recommendedEvents = JSON.parse(recommendations.recommendedEvents).map((rec: {id: string}) => {
        const event = events.find(e => e.id === rec.id);
        return event;
      }).filter(Boolean);

      const recommendedDiscussions = JSON.parse(recommendations.recommendedForumDiscussions).map((rec: {id: string}) => {
        const discussion = forumDiscussions.find(d => d.id === rec.id);
        return discussion;
      }).filter(Boolean);

      return {
        courses: recommendedCourses,
        events: recommendedEvents,
        discussions: recommendedDiscussions,
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('AI raw output:', recommendations);
      throw new Error('Could not understand the recommendations from the AI.');
    }
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Failed to generate recommendations. Please try again.',
    };
  }
}
