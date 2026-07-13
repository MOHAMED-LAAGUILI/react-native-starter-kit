import { router } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

export function DrawerHeaderRight() {
  return (
    <View className="mr-3">
      <HeaderButtons>
        <Item
          IconComponent={Settings}
          title="Settings"
          iconName="cog"
          color="#fff"
          onPress={() => router.push('/(app)/(tabs)/settings')}
        />
      </HeaderButtons>
    </View>
  );
}
