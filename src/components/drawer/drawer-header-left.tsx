import { router, usePathname } from 'expo-router';
import { DrawerToggleButton } from 'expo-router/drawer';
import { ArrowLeft } from 'lucide-react-native';
import { View } from 'react-native';
import { Button } from '@/components/ui';
import { useThemeColors } from '@/hooks/use-theme-color';

export function DrawerHeaderLeft() {
  const pathname = usePathname();
  const { icon } = useThemeColors();

  if (pathname.includes('/post/')) {
    return (
      <View className="ml-3">
        <Button
          variant="ghost"
          title=""
          leftIcon={(
            <ArrowLeft
              size={24}
              color={icon}
            />
          )}
          onPress={() => router.back()}
          className="h-auto px-0"
        />
      </View>
    );
  }

  return (
    <View className="ml-3">
      <DrawerToggleButton tintColor={icon} />
    </View>
  );
}
