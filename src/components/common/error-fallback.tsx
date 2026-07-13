import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '../ui';

type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
};

function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background p-6">
      <Text variant="h3">Something went wrong</Text>
      <Text
        variant="body"
        className="text-muted-foreground text-center"
      >
        {error.message}
      </Text>
      <Button
        title="Try Again"
        onPress={resetError}
      />
    </View>
  );
}

export { ErrorFallback };
