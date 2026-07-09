import { useRouter } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { useEffect } from 'react';
import { AppDrawerContent } from '@/components/drawer/app-drawer-content';
import { DrawerHeaderLeft } from '@/components/drawer/drawer-header-left';
import { DrawerHeaderRight } from '@/components/drawer/drawer-header-right';
import { HeaderTitle } from '@/components/drawer/header-title';
import { useAuthStore } from '@/store';

export default function AppLayout() {
  const isAuthenticated = useAuthStore((state: { isAuthenticated: any }) => state.isAuthenticated);
  const navigation = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('/(auth)/login');
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Drawer
      drawerContent={props => <AppDrawerContent {...props} />}
      screenOptions={{
        headerLeft: DrawerHeaderLeft,
        headerRight: DrawerHeaderRight,
        headerTitle: HeaderTitle,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: 'none' },
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="post/[id]"
        options={{
          drawerItemStyle: { display: 'none' },
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="features"
        options={{
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="blank"
        options={{
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="preferences"
        options={{
          headerShown: true,
        }}
      />
    </Drawer>
  );
}
