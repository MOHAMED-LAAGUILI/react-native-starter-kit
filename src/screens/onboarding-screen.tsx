import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import { router } from 'expo-router';
import * as React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingActions, OnboardingSlideItem } from '@/components/onboarding';
import { OnboardingPagination } from '@/components/onboarding/onboarding-pagination';
import { ONBOARDING_SLIDES } from '@/data/onboarding-slides';
import { useOnboardingStore } from '@/store';

function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const progress = useSharedValue(0);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLast = activeIndex === ONBOARDING_SLIDES.length - 1;
  const complete = useOnboardingStore(s => s.complete);
  const carouselRef = React.useRef<ICarouselInstance>(null);

  const handleProgressChange = (_: number, absoluteProgress: number) => {
    progress.set(absoluteProgress);
  };

  const handleSnapToItem = (index: number) => {
    progress.set(index);
    setActiveIndex(index);
  };

  function completeOnboarding() {
    complete();
    router.replace('/(auth)/login');
  }

  function onNext() {
    if (isLast) {
      completeOnboarding();
    }
    else {
      carouselRef.current?.next();
    }
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center">
        <Carousel
          ref={carouselRef}
          data={ONBOARDING_SLIDES}
          width={width}
          height={380}
          pagingEnabled
          loop={false}
          onProgressChange={handleProgressChange}
          onSnapToItem={handleSnapToItem}
          renderItem={({ item }) => <OnboardingSlideItem item={item} />}
        />
      </View>

      <View
        className="flex-row items-end justify-between px-6"
        style={{ paddingBottom: insets.bottom + 24 }}
      >
        <OnboardingPagination data={ONBOARDING_SLIDES} progress={progress} />
        <OnboardingActions isLast={isLast} onNext={onNext} />
      </View>
    </View>
  );
}

export { OnboardingScreen };
