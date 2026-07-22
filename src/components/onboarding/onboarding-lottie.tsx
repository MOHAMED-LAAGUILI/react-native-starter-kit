import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

type Step = {
  image: any;
  title: string;
  description: string;
};

type OnboardingLottieProps = {
  currentStep: number;
  direction: 'forward' | 'backward';
  steps: Step[];
};

export function OnboardingLottie({ currentStep, direction, steps }: OnboardingLottieProps) {
  const animation = direction === 'forward' ? FadeInRight.duration(350) : FadeInLeft.duration(350);

  return (
    <View className="h-[55%] items-center justify-center">
      <Animated.View entering={animation} key={`image-${currentStep}`} className="size-full">
        <LottieView
          source={steps[currentStep].image}
          autoPlay
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>
    </View>
  );
}
