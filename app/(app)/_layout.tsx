import { type Href, router, usePathname, useRouter } from "expo-router";
import { Drawer, DrawerContentScrollView, DrawerItem, DrawerToggleButton } from "expo-router/drawer";
import { Home, Search, Settings, User } from "lucide-react-native";
import { type ComponentProps, useEffect } from "react";
import { View } from "react-native";
import { useAuthStore } from "@/store";

type AppDrawerContentProps = Parameters<NonNullable<ComponentProps<typeof Drawer>["drawerContent"]>>[0];

function DrawerHeaderLeft() {
  return (
    <View className="ml-3">
      <DrawerToggleButton />
    </View>
  );
}

function AppDrawerContent(props: AppDrawerContentProps) {
  const pathname = usePathname();

  const items: Array<{
    label: string;
    href: Href;
    icon: typeof Home;
    active: boolean;
  }> = [
    {
      active: pathname === "/(app)" || pathname === "/(app)/(tabs)" || pathname === "/(app)/(tabs)/index",
      href: "/(app)/(tabs)",
      icon: Home,
      label: "Home",
    },
    {
      active: pathname === "/(app)/(tabs)/search",
      href: "/(app)/(tabs)/search",
      icon: Search,
      label: "Search",
    },
    {
      active: pathname === "/(app)/(tabs)/profile",
      href: "/(app)/(tabs)/profile",
      icon: User,
      label: "Profile",
    },
    {
      active: pathname === "/(app)/(tabs)/settings",
      href: "/(app)/(tabs)/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      {items.map(({ label, href, icon: Icon, active }) => (
        <DrawerItem
          key={label}
          label={label}
          focused={active}
          icon={({ color, size }) => (
            <Icon
              color={color}
              size={size}
            />
          )}
          onPress={() => router.push(href)}
        />
      ))}
    </DrawerContentScrollView>
  );
}

export default function AppLayout() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <Drawer
      drawerContent={props => <AppDrawerContent {...props} />}
      screenOptions={{
        headerLeft: DrawerHeaderLeft,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: "none" },
          headerShown: false,
        }}
      />
    </Drawer>
  );
}
