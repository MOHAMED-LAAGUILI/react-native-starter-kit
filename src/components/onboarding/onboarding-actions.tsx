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

  const arrowStyle = useAnimatedStyle(() => ({
    opacity: 1 - filled.value,
    transform: [{ scale: 1 - filled.value * 0.2 }],
  }));

  const playStyle = useAnimatedStyle(() => ({
    opacity: filled.value,
    transform: [{ scale: 0.2 + filled.value * 0.8 }],
  }));

  return (
    <Pressable onPress={onNext}>
      <Animated.View
        className="size-14 items-center justify-center rounded-full"
        style={containerStyle}
      >
        <Animated.View className="absolute" style={arrowStyle}>
          <ArrowRight size={22} color={primaryHex} />
        </Animated.View>
        <Animated.View className="absolute" style={playStyle}>
          <Play size={22} color="#ffffff" fill="#ffffff" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

export { OnboardingActions };
export type { OnboardingActionsProps };
