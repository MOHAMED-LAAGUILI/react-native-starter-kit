import { router } from 'expo-router';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { useOnboardingStore } from '@/store';

const steps = [
  {
    image: require('@assets/svg/code-thinking.svg'),
    title: 'Hassle free\nshopping experience',
    description:
      'Everything is set up to help you build faster, scale smarter, and deliver high-quality applications from day one.',
  },
  {
    image: require('@assets/svg/join-us.svg'),
    title: 'Earn margins\nlike never before',
    description:
      'Access the latest updates, features, and best practices. Stay aligned with modern development standards.',
  },
  {
    image: require('@assets/svg/meet-the-team.svg'),
    title: 'Quick & free\ndelivery to the store',
    description:
      'You\'re ready to go. Explore the project structure, customize your setup, and start building with confidence.',
  },
];

function Screen() {
  const complete = useOnboardingStore(s => s.complete);

  function completeOnboarding() {
    complete();
    router.replace('/(auth)/login');
  }

  return <OnboardingScreen steps={steps} onComplete={completeOnboarding} />;
}

export { Screen as OnboardingScreen };
