import { useNetInfo } from '@react-native-community/netinfo';
import { Info, Wifi } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SettingRow } from '@/components/common/setting-row';
import { Text } from '@/components/ui';
import { useThemeColors } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';

function AppInfoSection() {
  const { t } = useTranslation();
  const { type, isConnected } = useNetInfo();
  const { icon } = useThemeColors();

  return (
    <View>
      <Text variant="label" className="text-muted-foreground mb-3 tracking-wider uppercase">{t('settings.info')}</Text>
      <View className="border-border bg-card overflow-hidden rounded-xl border">
        <View className="flex-row items-center p-4">
          <Info size={22} color={icon} style={{ marginRight: 12 }} />
          <View className="flex-1">
            <Text variant="body">{t('app.name')}</Text>
            <Text variant="caption" className="text-muted-foreground mt-0.5">{t('app.version', { version: '1.0.0' })}</Text>
            <Text variant="caption" className="text-muted-foreground">{t('app.description')}</Text>
          </View>
        </View>
        <View className="bg-border mx-4 h-px" />
        <SettingRow
          icon={Wifi}
          label={t('settings.network')}
          subtitle={
            isConnected == null
              ? t('settings.networkChecking')
              : isConnected
                ? t('settings.networkConnected', { type })
                : t('settings.networkDisconnected')
          }
          rightElement={(
            <View
              className={cn(
                'mr-2 size-3 rounded-full',
                isConnected == null && 'bg-muted-foreground',
                isConnected === true && 'bg-green-500',
                isConnected === false && 'bg-red-500',
              )}
            />
          )}
        />
      </View>
    </View>
  );
}

export { AppInfoSection };
