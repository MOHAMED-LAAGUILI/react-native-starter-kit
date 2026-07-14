import type { ReactNode } from 'react';
import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type AnimatedSectionProps = {
  children: ReactNode;
  animateOn?: any;
};

function AnimatedSection({ children, animateOn }: AnimatedSectionProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  useEffect(() => {
    opacity.set(0);
    translateY.set(12);
    opacity.set(withTiming(1, { duration: 400 }));
    translateY.set(withTiming(0, { duration: 400 }));
  }, [animateOn, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}

export { AnimatedSection };
