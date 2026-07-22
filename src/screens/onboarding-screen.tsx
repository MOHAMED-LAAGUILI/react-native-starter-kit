import { router } from 'expo-router';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { useOnboardingStore } from '@/store';

const steps = [
  {
    image: require('@assets/lottie/welcome.json'),
    title: 'Welcome',
    description:
      'Welcome to your starter kit. Everything is set up to help you build faster, scale smarter, and deliver high-quality applications from day one.',
  },
  {
    image: require('@assets/lottie/people_reading_news_on_phone.json'),
    title: 'Stay Informed',
    description:
      'Access the latest updates, features, and best practices. Stay aligned with modern development standards and continuously improve your workflow.',
  },
  {
    image: require('@assets/lottie/hello.json'),
    title: 'Get Started',
    description:
      'You’re ready to go. Explore the project structure, customize your setup, and start building your next great product with confidence.',
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
