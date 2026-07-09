import { usePathname } from 'expo-router';
import { useMemo } from 'react';
import { Text } from '@/components/ui';
import { useThemeColors } from '@/hooks/use-theme-color';

export function HeaderTitle() {
  const pathname = usePathname();
  const { text } = useThemeColors();

  const title = useMemo(() => {
    if (pathname.includes('/post/'))
      return 'Post';
    const segments = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    const currentSegment = segments.at(-1);

    switch (currentSegment) {
      case 'features':
        return 'Features';
      case 'blank':
        return 'Blank';
      case 'preferences':
        return 'Preferences';
      case 'search':
        return 'Search';
      case 'profile':
        return 'Profile';
      case 'settings':
        return 'Settings';
      default:
        return 'Home';
    }
  }, [pathname]);

  return (
    <Text
      variant="h3"
      style={{ color: text }}
    >
      {title}
    </Text>
  );
}
