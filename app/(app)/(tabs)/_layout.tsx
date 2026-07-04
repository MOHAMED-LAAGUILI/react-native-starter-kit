import { Tabs } from "expo-router";
import { DrawerToggleButton } from "expo-router/drawer";
import { Home, Search, Settings, User } from "lucide-react-native";
import { useColorScheme, View } from "react-native";
import { useThemeStore } from "@/store";

function TabsHeaderLeft({ tintColor }: { tintColor: string }) {
  return (
    <View className="ml-3">
      <DrawerToggleButton tintColor={tintColor} />
    </View>
  );
}

export default function TabLayout() {
  const themeMode = useThemeStore(s => s.mode);
  const colorScheme = useColorScheme();
  const isDark = themeMode === "system" ? colorScheme === "dark" : themeMode === "dark";
  const headerTintColor = isDark ? "#ffffff" : "#111827";

  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <TabsHeaderLeft tintColor={headerTintColor} />,
        headerTintColor,
        //   headerRight: () => <TabsHeaderLeft tintColor={headerTintColor} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home
              color={color}
              size={size}
            />
          ),
          tabBarLabel: "Home",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Search
              color={color}
              size={size}
            />
          ),
          tabBarLabel: "Search",
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <User
              color={color}
              size={size}
            />
          ),
          tabBarLabel: "Profile",
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Settings
              color={color}
              size={size}
            />
          ),
          tabBarLabel: "Settings",
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
