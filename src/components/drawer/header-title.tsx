import { usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui';

const TITLE_MAP: Record<string, string> = {
  'home': 'navigation.home',
  'search': 'navigation.search',
  'profile': 'navigation.profile',
  'settings': 'navigation.settings',
  'report': 'navigation.reportGraphs',
  'preferences': 'navigation.preferences',
  'page-one': 'navigation.pageOne',
  'page-two': 'navigation.pageTwo',
};

export function HeaderTitle() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const segments = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const currentSegment = segments.at(-1);

  const titleKey = pathname.includes('/post/')
    ? 'navigation.post'
    : TITLE_MAP[currentSegment ?? 'home'] ?? 'navigation.home';

  return (
    <Text variant="h3" style={{ color: '#fff' }}>
      {t(titleKey)}
    </Text>
  );
}
