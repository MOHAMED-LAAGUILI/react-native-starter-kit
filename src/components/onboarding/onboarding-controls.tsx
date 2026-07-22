import type { SharedValue } from 'react-native-reanimated';
import { ArrowLeft, ArrowRight, LogIn, SkipForward } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInLeft, FadeInRight, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Button, Text } from '@/components/ui';
import { usePrimaryHex } from '@/hooks/use-primary-hex';

type Step = {
  image: any;
  title: string;
  description: string;
};

type OnboardingControlsProps = {
  currentStep: number;
  direction: 'forward' | 'backward';
  progressPosition: SharedValue<number>;
  steps: Step[];
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onComplete?: () => void;
};

export function OnboardingControls({
  currentStep,
  direction,
  progressPosition,
  steps,
  onBack,
  onNext,
  onSkip,
  onComplete,
}: OnboardingControlsProps) {
  const primaryHex = usePrimaryHex();
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;
  const animation = direction === 'forward' ? FadeInRight.duration(350) : FadeInLeft.duration(350);

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    left: withSpring(`${progressPosition.value * 70 + 2.5}%`, {
      damping: 15,
      stiffness: 100,
    }),
  }));

  return (
    <View className="h-[45%] items-center rounded-t-[80px]" style={{ backgroundColor: primaryHex }}>
      <Animated.View entering={animation} key={`text-${currentStep}`} className="items-center px-6">
        <Text className="mt-6 text-center text-3xl leading-[48px] font-bold text-white">
          {steps[currentStep].title}
        </Text>
        <Text className="mt-4 text-center text-base text-white">
          {steps[currentStep].description}
        </Text>
      </Animated.View>

      <View className="mt-5 h-3.5 w-20 justify-center rounded-full bg-slate-300">
        <Animated.View
          className="absolute h-2.5 w-5 rounded-full"
          style={[progressAnimatedStyle, { backgroundColor: primaryHex }]}
        />
      </View>

      <View className="mt-11 w-full flex-row items-center justify-between px-2">
        <Button
          variant="outline"
          size="sm"
          title="Back"
          leftIconComponent={ArrowLeft}
          onPress={onBack}
          disabled={isFirst}
          className="mt-3 rounded-md border-white bg-white active:bg-white/90"
        />

        {isLast
          ? (
              <View>
                <Button
                  variant="outline"
                  title="LOGIN"
                  leftIconComponent={LogIn}
                  onPress={onComplete ?? (() => console.log('Login'))}
                  className="mt-3 rounded-md border-white bg-white active:bg-white/90"
                />
              </View>
            )
          : (
              <Button
                variant="outline"
                title="NEXT"
                rightIconComponent={ArrowRight}
                onPress={onNext}
                className="mt-3 rounded-md border-white bg-white active:bg-white/90"
              />
            )}

        <Button
          variant="outline"
          title="Skip"
          size="sm"
          rightIconComponent={SkipForward}
          onPress={onSkip}
          disabled={isLast}
          className="mt-3 rounded-md border-white bg-white active:bg-white/90"
        />
      </View>
    </View>
  );
}
