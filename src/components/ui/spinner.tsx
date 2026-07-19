import type { ActivityIndicatorProps } from 'react-native';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { usePrimaryHex } from '@/hooks/use-primary-hex';

type SpinnerSize = 'sm' | 'md' | 'lg';

type SpinnerProps = {
  size?: SpinnerSize;
} & Omit<ActivityIndicatorProps, 'size'>;

const sizeMap: Record<SpinnerSize, 'small' | 'large'> = {
  lg: 'large',
  md: 'small',
  sm: 'small',
};

function Spinner({ size = 'md', color, ...props }: SpinnerProps) {
  const primaryHex = usePrimaryHex();

  return (
    <ActivityIndicator
      size={sizeMap[size]}
      color={color ?? primaryHex}
      {...props}
    />
  );
}

export type { SpinnerProps, SpinnerSize };
export { Spinner };
