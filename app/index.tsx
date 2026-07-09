import { Redirect } from 'expo-router';
import { useAuthStore, useOnboardingStore } from '@/store';

export default function Index() {
  const isAuthenticated = useAuthStore((s: { isAuthenticated: any }) => s.isAuthenticated);
  const isOnboarded = useOnboardingStore((s: { isComplete: any }) => s.isComplete);

  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href={isAuthenticated ? '/(app)/(tabs)' : '/(auth)/login'} />;
}
