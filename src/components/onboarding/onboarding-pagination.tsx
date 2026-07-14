import type { SharedValue } from 'react-native-reanimated';
import type { OnboardingSlide } from '@/data/onboarding-slides';
import { Pagination } from 'react-native-reanimated-carousel';
import { usePrimaryHex } from '@/hooks/use-primary-hex';
import { useThemeColors } from '@/hooks/use-theme-color';

type OnboardingPaginationProps = {
  data: OnboardingSlide[];
  progress: SharedValue<number>;
};

function OnboardingPagination({ data, progress }: OnboardingPaginationProps) {
  const { muted } = useThemeColors();
  const primaryHex = usePrimaryHex();

  return (
    <Pagination.Basic
      data={data}
      progress={progress}
      size={8}
      dotStyle={{
        backgroundColor: muted,
        borderRadius: 4,
        height: 8,
        opacity: 0.3,
        width: 8,
      }}
      activeDotStyle={{
        backgroundColor: primaryHex,
        borderRadius: 4,
        height: 8,
        width: 24,
      }}
      containerStyle={{ gap: 6 }}
    />
  );
}

export { OnboardingPagination };
export type { OnboardingPaginationProps };
