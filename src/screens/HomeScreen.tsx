import { cn } from '@/lib/utils';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/Text';

function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 gap-4">
        <Text variant="h1">Home</Text>
        <Text variant="body" className="text-muted-foreground">
          Welcome to the React Native Starter Kit. This is a production-ready template
          with navigation, state management, API integration, and more.
        </Text>

        <View className="p-4 rounded-xl border border-border bg-card gap-2 mt-4">
          <Text variant="h4">Getting Started</Text>
          <Text variant="bodySmall" className="text-muted-foreground">
            Edit screens in src/screens/ to customize your app.
            Navigate using the drawer and bottom tabs.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export { HomeScreen };
