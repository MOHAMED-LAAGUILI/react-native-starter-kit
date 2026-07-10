import { Globe, Mail, Phone, X } from 'lucide-react-native';
import * as React from 'react';
import { Dimensions, Linking, ScrollView, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { InfoRow } from '@/components/common/info-row';
import { Text } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { showToast } from '@/components/ui/toast';
import { COLOR_PALETTES } from '@/config/color-palettes';
import { cn } from '@/lib/utils';
import { useAuthStore, useThemeStore } from '@/store';

type InfoItem = {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  value: string;
  href?: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SVG_HEIGHT = Math.round(SCREEN_WIDTH * 0.5);

const INFO_ITEMS: InfoItem[] = [
  { icon: Mail, label: 'Email', value: 'james011@gmail.com' },
  { icon: Phone, label: 'Mobile', value: '1234567891' },
  { icon: X, label: 'Twitter', value: '@james012' },
  { icon: Globe, label: 'LinkedIn', value: 'www.linkedin.com/in/james012', href: 'https://linkedin.com/in/james012' },
  { icon: Globe, label: 'Facebook', value: 'www.facebook.com/james012', href: 'https://www.facebook.com/james012' },
];

function ProfileHeader({ gradientColor, name, initial }: { gradientColor: string; name: string; initial: string }) {
  return (
    <View className="relative" style={{ height: SVG_HEIGHT }}>
      <Svg
        height={SVG_HEIGHT}
        width="100%"
        viewBox="0 0 400 220"
        preserveAspectRatio="none"
        style={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }}
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={gradientColor} />
            <Stop offset="100%" stopColor={gradientColor} stopOpacity={0.7} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="400" height="220" fill="url(#grad)" />
        <Path d="M0,180 Q100,140 200,170 T400,150 L400,220 L0,220 Z" fill="url(#grad)" opacity={0.6} />
      </Svg>

      <View className="absolute inset-0 z-10 items-center justify-center">
        <View className={cn('overflow-hidden rounded-full border-4 border-background', 'size-25')}>
          <View className="size-full items-center justify-center bg-muted">
            <Text variant="h1" className="text-white">{initial}</Text>
          </View>
        </View>
        <View className="mt-3 items-center">
          <Text variant="h3" className="text-white">{name}</Text>
          <Text variant="body" className="mt-1 text-white/80">Senior Graphic Designer</Text>
        </View>
      </View>
    </View>
  );
}

function InfoCards({ items }: { items: InfoItem[] }) {
  const itemsWithHref = React.useMemo(() => items.map((item) => {
    if (!item.href)
      return item;
    const url = new URL(item.href);
    return { ...item, href: url.href };
  }), [items]);

  return (
    <View className="overflow-hidden rounded-2xl border border-border bg-card">
      {itemsWithHref.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && <View className="mx-4 h-px bg-border" />}
          <InfoRow
            icon={item.icon}
            label={item.label}
            value={item.value}
            href={item.href}
            onPress={item.href ? () => Linking.openURL(item.href!) : undefined}
          />
        </React.Fragment>
      ))}
    </View>
  );
}

function ProfileScreen() {
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  const primaryColor = useThemeStore(s => s.primaryColor);

  const palette = COLOR_PALETTES.find(p => p.key === primaryColor);
  const gradientColor = palette?.color ?? '#2563eb';
  const name = user?.name ?? 'James Martin';
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? 'J';

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <ProfileHeader gradientColor={gradientColor} name={name} initial={initial} />

      <View className="mt-6 px-6">
        <InfoCards items={INFO_ITEMS} />
      </View>

      <View className="mt-6 mb-8 px-6">
        <Button
          title="Logout"
          variant="primary"
          onPress={() => {
            logout();
            showToast({ message: 'You have been logged out.', title: 'Signed out', variant: 'info' });
          }}
        />
      </View>
    </ScrollView>
  );
}

export { ProfileScreen };
