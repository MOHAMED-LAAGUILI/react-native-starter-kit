import { Asset } from 'expo-asset';
import { View } from 'react-native';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';

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
  const svgUri = Asset.fromModule(step.image).uri;

  return (
    <View className="h-[50%] w-full items-center justify-center pt-4">
      <Animated.View entering={animation} key={`image-${currentStep}`}>
        <SvgUri uri={svgUri} width={260} height={260} />
      </Animated.View>
    </View>
  );
}
