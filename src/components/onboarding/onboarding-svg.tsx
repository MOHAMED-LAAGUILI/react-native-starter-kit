import { View } from 'react-native';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { Image } from '@/components/ui';

type Step = {
  image: any;
  title: string;
  description: string;
};

type OnboardingSVGProps = {
  currentStep: number;
  direction: 'forward' | 'backward';
  steps: Step[];
};

export function OnboardingSVG({ currentStep, direction, steps }: OnboardingSVGProps) {
  const step = steps[currentStep];
  const animation = direction === 'forward' ? FadeInRight.duration(350) : FadeInLeft.duration(350);

  return (
    <View className="h-[50%] w-full items-center justify-center pt-4">
      <Animated.View entering={animation} key={`image-${currentStep}`}>
        <Image source={step.image} className="size-[260px]" style={{ width: 260, height: 260 }} contentFit="contain" />
      </Animated.View>
    </View>
  );
}
