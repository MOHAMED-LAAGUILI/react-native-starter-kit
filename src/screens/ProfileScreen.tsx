import { useAuthStore } from '@/store';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';

function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 items-center gap-2">
        <View className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-2">
          <Text variant="h2" className="text-primary-foreground">
            {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
          </Text>
        </View>

        <Text variant="h2" className="mt-1">
          {user?.name ?? 'User'}
        </Text>
        <Text variant="body" className="text-muted-foreground">
          {user?.email ?? 'No email'}
        </Text>

        <View className="w-full p-4 rounded-xl border border-border bg-card mt-4">
          <Text variant="body">
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </Text>
        </View>

        <Button
          title="Sign Out"
          variant="destructive"
          onPress={logout}
          className="w-full mt-8"
        />
      </View>
    </ScrollView>
  );
}

export { ProfileScreen };
