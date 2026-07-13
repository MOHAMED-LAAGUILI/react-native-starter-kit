import type { ImageProps as ExpoImageProps } from 'expo-image';
import { Image as ExpoImage } from 'expo-image';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { cn } from '@/lib/utils';

type ImageProps = {
  fallback?: string;
} & ExpoImageProps;

function Image({ className, fallback, style, ...props }: ImageProps) {
  const [errored, setErrored] = React.useState(false);

  if (errored && fallback) {
    return (
      <View className={cn('bg-muted items-center justify-center', className)}>
        <View className="bg-muted-foreground/20 size-12 items-center justify-center rounded-full">
          <View className="bg-muted-foreground/40 size-5 rounded-full" />
        </View>
      </View>
    );
  }

  return (
    <ExpoImage
      className={cn(className)}
      contentFit="cover"
      transition={300}
      onError={() => setErrored(true)}
      style={StyleSheet.flatten(style)}
      {...props}
    />
  );
}

export type { ImageProps };
export { Image };
