import { cn } from '@/lib/utils';
import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@/components/ui/Text';

function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background">
      <ActivityIndicator size="large" className="text-primary" />
      <Text variant="body">{message}</Text>
    </View>
  );
}

export { LoadingScreen };
