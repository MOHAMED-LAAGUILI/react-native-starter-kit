import { Tabs } from 'expo-router';
import { Home, Search, Settings, User } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { cn } from '@/lib/utils';

function AnimatedTabIcon({ children, focused }: { children: React.ReactNode; focused: boolean }) {
  const scale = useSharedValue(1);

  scale.value = withSpring(focused ? 1.2 : 1, {
    mass: 0.5,
    damping: 10,
    stiffness: 100,
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      className={cn(
        'rounded-full p-2',
        focused && 'bg-primary/10',
      )}
    >
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Home color={color} size={size} />
            </AnimatedTabIcon>
          ),
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerTitle: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Search color={color} size={size} />
            </AnimatedTabIcon>
          ),
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <User color={color} size={size} />
            </AnimatedTabIcon>
          ),
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Settings color={color} size={size} />
            </AnimatedTabIcon>
          ),
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}
