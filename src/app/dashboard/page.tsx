import { PersonalizedRecommendations } from './components/personalized-recommendations';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Welcome back! Here&apos;s your personalized learning hub.
        </p>
      </div>

      <PersonalizedRecommendations />

      {/* Other dashboard widgets can be added here */}
    </div>
  );
}
