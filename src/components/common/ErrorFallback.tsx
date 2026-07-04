import * as React from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <View className="flex-1 items-center justify-center p-6 gap-4 bg-background">
      <Text variant="h3">Something went wrong</Text>
      <Text
        variant="body"
        className="text-center text-muted-foreground"
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
