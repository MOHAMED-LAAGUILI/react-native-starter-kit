import { ArrowRight, Play } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { usePrimaryHex } from '@/hooks/use-primary-hex';

type OnboardingActionsProps = {
  isLast: boolean;
  onNext: () => void;
};

function OnboardingActions({ isLast, onNext }: OnboardingActionsProps) {
  const primaryHex = usePrimaryHex();
  const filled = useSharedValue(0);

  useEffect(() => {
    filled.set(withTiming(isLast ? 1 : 0, { duration: 350 }));
  }, [filled, isLast]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: filled.value === 1 ? primaryHex : 'transparent',
    borderWidth: 2,
    borderColor: primaryHex,
  }));

  return (
    <Pressable onPress={onNext}>
      <Animated.View
        className="size-14 items-center justify-center rounded-full"
        style={containerStyle}
      >
        {isLast
          ? (
              <Play size={22} color="#ffffff" fill="#ffffff" />
            )
          : (
              <ArrowRight size={22} color={primaryHex} />
            )}
      </Animated.View>
    </Pressable>
  );
}

export { OnboardingActions };
export type { OnboardingActionsProps };
