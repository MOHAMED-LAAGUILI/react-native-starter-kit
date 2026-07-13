import { ExternalLink, Heart, Share2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Linking, Share, View } from 'react-native';
import { SettingRow } from '@/components/common/setting-row';
import { Text } from '@/components/ui';

function SupportSection() {
  const { t } = useTranslation();

  return (
    <View>
      <Text variant="label" className="text-muted-foreground mb-3 tracking-wider uppercase">{t('settings.support')}</Text>
      <View className="border-border bg-card overflow-hidden rounded-xl border">
        <SettingRow
          icon={Share2}
          label={t('settings.shareApp')}
          subtitle={t('settings.shareAppDescription')}
          onPress={() => Share.share({ message: t('settings.shareMessage'), url: 'https://github.com/MOHAMED-LAAGUILI/react-native-starter-kit' })}
        />
        <View className="bg-border mx-4 h-px" />
        <SettingRow
          icon={Heart}
          label={t('settings.supportFeedback')}
          subtitle={t('settings.supportFeedbackDescription')}
          onPress={() => Linking.openURL('https://github.com/MOHAMED-LAAGUILI/react-native-starter-kit/issues')}
        />
        <View className="bg-border mx-4 h-px" />
        <SettingRow
          icon={ExternalLink}
          label={t('settings.developer')}
          subtitle={t('settings.developerDescription')}
          onPress={() => Linking.openURL('https://github.com/MOHAMED-LAAGUILI')}
        />
      </View>
    </View>
  );
}

export { SupportSection };
