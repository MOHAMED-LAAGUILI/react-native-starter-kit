import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { EditProfileForm, ProfileHeader } from '@/components/profile';
import { usePrimaryHex } from '@/hooks/use-primary-hex';
import { useAuthStore } from '@/store';

function ProfileScreen() {
  const user = useAuthStore(s => s.user);
  const primaryHex = usePrimaryHex();
  const name = user?.name ?? 'James Martin';

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <ProfileHeader gradientColor={primaryHex} name={name} />

      <View className="mt-6 px-6">
        <EditProfileForm />
      </View>
    </ScrollView>
  );
}

export { ProfileScreen };
