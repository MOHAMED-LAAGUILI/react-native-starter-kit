import { router } from "expo-router";
import * as React from "react";
import { useWindowDimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { STORAGE_KEYS } from "@/config/constants";
import { StorageService } from "@/storage";

interface Slide {
  title: string;
  description: string;
  emoji: string;
}

const SLIDES: Slide[] = [
  {
    description: "A production-ready React Native starter with Expo Router, Tailwind v4, Zustand, and more.",
    emoji: "🚀",
    title: "Welcome",
  },
  {
    description: "Navigation, theming, i18n, API client, forms, and reusable UI components out of the box.",
    emoji: "⚡",
    title: "Features",
  },
  {
    description: "Tap below to start building your app. You can revisit settings anytime.",
    emoji: "🎯",
    title: "Get Started",
  },
];

function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const progress = useSharedValue(0);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLast = activeIndex === SLIDES.length - 1;

  function completeOnboarding() {
    StorageService.setBoolean(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
    router.replace("/(auth)/login");
  }

  function onNext() {
    if (isLast) {
      completeOnboarding();
    }
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 pt-20">
        <Carousel
          data={SLIDES}
          width={width}
          height={400}
          pagingEnabled
          loop={false}
          onProgressChange={(_, absoluteProgress) => {
            progress.value = absoluteProgress;
          }}
          onSnapToItem={index => {
            progress.value = index;
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <View className="items-center justify-center px-10 flex-1">
              <View className="w-24 h-24 rounded-2xl bg-primary/10 items-center justify-center mb-8">
                <Text className="text-5xl">{item.emoji}</Text>
              </View>
              <Text
                variant="h2"
                className="text-center mb-3"
              >
                {item.title}
              </Text>
              <Text
                variant="body"
                className="text-muted-foreground text-center leading-6"
              >
                {item.description}
              </Text>
            </View>
          )}
        />
      </View>

      <View
        className="px-6 pb-8 gap-6"
        style={{ paddingBottom: insets.bottom + 24 }}
      >
        <Pagination.Basic
          data={SLIDES}
          progress={progress}
          size={8}
          dotStyle={{
            backgroundColor: "#9CA3AF",
            borderRadius: 4,
            height: 8,
            opacity: 0.3,
            width: 8,
          }}
          activeDotStyle={{
            backgroundColor: "#000000",
            borderRadius: 4,
            height: 8,
            width: 24,
          }}
          containerStyle={{ gap: 6 }}
        />
        <View className="gap-3">
          {isLast && (
            <Button
              title={"Get Started"}
              onPress={onNext}
            />
          )}
          {!isLast && (
            <Button
              title="Skip"
              variant="outline"
              onPress={completeOnboarding}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export { OnboardingScreen };
