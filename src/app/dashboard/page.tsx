import { PersonalizedRecommendations } from './components/personalized-recommendations';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome back! Here&apos;s your personalized learning hub.
        </p>
      </div>

      <PersonalizedRecommendations />

      {/* Other dashboard widgets can be added here */}
    </div>
  );
}
