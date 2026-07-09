import type { BottomSheetOption } from '@/components/ui/bottom-sheet';
import type { ColorPaletteKey } from '@/config/color-palettes';
import type { ThemeMode } from '@/store';
import { useNetInfo } from '@react-native-community/netinfo';
import { setAppIcon } from 'expo-dynamic-icons';
import { Brush, ExternalLink, Globe, Heart, Info, Monitor, Moon, Share2, Sun, Wifi } from 'lucide-react-native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, ScrollView, Share, TouchableOpacity, View } from 'react-native';
import { SettingRow } from '@/components/common/setting-row';
import { Text } from '@/components/ui';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Image } from '@/components/ui/image';
import { showToast } from '@/components/ui/toast';
import { COLOR_PALETTES } from '@/config/color-palettes';
import { changeLanguage } from '@/i18n';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store';

const LANGUAGE_OPTIONS: BottomSheetOption<string>[] = [
  { label: 'English', value: 'en' },
  { label: 'Français', value: 'fr' },
];

function AppearanceSection({
  currentColorLabel,
  currentPalette,
  currentLangLabel,
  themeLabels,
  mode,
  onThemePress,
  onColorPress,
  onLangPress,
}: {
  currentColorLabel: string;
  currentPalette?: { color: string };
  currentLangLabel: string;
  themeLabels: Record<string, string>;
  mode: ThemeMode;
  onThemePress: () => void;
  onColorPress: () => void;
  onLangPress: () => void;
}) {
  return (
    <View>
      <Text variant="label" className="mb-3 tracking-wider text-muted-foreground uppercase">Appearance</Text>
      <View className="overflow-hidden rounded-xl border border-border bg-card">
        <SettingRow
          icon={mode === 'dark' ? Moon : mode === 'system' ? Monitor : Sun}
          label="Theme"
          subtitle={themeLabels[mode]}
          onPress={onThemePress}
        />
        <View className="mx-4 h-px bg-border" />
        <SettingRow
          icon={Brush}
          label="Accent Color"
          subtitle={currentColorLabel}
          rightElement={<View className="mr-2 size-5 rounded-full" style={{ backgroundColor: currentPalette?.color }} />}
          onPress={onColorPress}
        />
        <View className="mx-4 h-px bg-border" />
        <SettingRow
          icon={Globe}
          label="Language"
          subtitle={currentLangLabel}
          onPress={onLangPress}
        />
      </View>
    </View>
  );
}

function AppInfoSection() {
  const { t } = useTranslation();
  const { type, isConnected } = useNetInfo();

  return (
    <View>
      <Text variant="label" className="mb-3 tracking-wider text-muted-foreground uppercase">{t('settings.info')}</Text>
      <View className="overflow-hidden rounded-xl border border-border bg-card">
        <View className="flex-row items-center p-4">
          <Info size={22} style={{ marginRight: 12 }} />
          <View className="flex-1">
            <Text variant="body">{t('app.name')}</Text>
            <Text variant="caption" className="mt-0.5 text-muted-foreground">{t('app.version', { version: '1.0.0' })}</Text>
            <Text variant="caption" className="text-muted-foreground">{t('app.description')}</Text>
          </View>
        </View>
        <View className="mx-4 h-px bg-border" />
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

function SupportSection() {
  return (
    <View>
      <Text variant="label" className="mb-3 tracking-wider text-muted-foreground uppercase">Support</Text>
      <View className="overflow-hidden rounded-xl border border-border bg-card">
        <SettingRow
          icon={Share2}
          label="Share App"
          subtitle="Tell others about this app"
          onPress={() => Share.share({ message: 'Check out this app!', url: 'https://github.com/MOHAMED-LAAGUILI/react-native-starter-kit' })}
        />
        <View className="mx-4 h-px bg-border" />
        <SettingRow
          icon={Heart}
          label="Support & Feedback"
          subtitle="Open a GitHub issue"
          onPress={() => Linking.openURL('https://github.com/MOHAMED-LAAGUILI/react-native-starter-kit/issues')}
        />
        <View className="mx-4 h-px bg-border" />
        <SettingRow
          icon={ExternalLink}
          label="Developer"
          subtitle="View portfolio"
          onPress={() => Linking.openURL('https://github.com/MOHAMED-LAAGUILI')}
        />
      </View>
    </View>
  );
}

function AppIconSection() {
  const handleAppIcon = React.useCallback((iconName: string) => {
    try {
      setAppIcon(iconName);
    }
    catch {
      showToast({ message: 'App icon change is only supported on Android.', title: 'Unavailable', variant: 'error' });
    }
  }, []);

  return (
    <View>
      <Text variant="label" className="mb-3 tracking-wider text-muted-foreground uppercase">App Icon</Text>
      <View className="overflow-hidden rounded-xl border border-border bg-card">
        <TouchableOpacity onPress={() => handleAppIcon('expoDark')} className="flex-row items-center p-4">
          <Image source={require('@assets/images/expo-icon-dark.png')} className="mr-3 size-6 rounded-sm" />
          <Text variant="body">Change to expo Icon</Text>
        </TouchableOpacity>
        <View className="mx-4 h-px bg-border" />
        <TouchableOpacity onPress={() => handleAppIcon('originalDark')} className="flex-row items-center p-4">
          <Image source={require('@assets/images/react-native-reusables-dark.png')} className="mr-3 size-6 rounded-sm" />
          <Text variant="body">Change to dark Icon</Text>
        </TouchableOpacity>
        <View className="mx-4 h-px bg-border" />
        <TouchableOpacity onPress={() => handleAppIcon('default')} className="flex-row items-center p-4">
          <Text variant="body">Reset to Default Icon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

type SheeterProps = { mode: ThemeMode; setMode: (m: ThemeMode) => void; primaryColor: ColorPaletteKey; setPrimaryColor: (c: ColorPaletteKey) => void; colorSheetOpen: boolean; setColorSheetOpen: (v: boolean) => void; themeSheetOpen: boolean; setThemeSheetOpen: (v: boolean) => void; langSheetOpen: boolean; setLangSheetOpen: (v: boolean) => void };

function SettingsBottomSheets({ mode, setMode, primaryColor, setPrimaryColor, colorSheetOpen, setColorSheetOpen, themeSheetOpen, setThemeSheetOpen, langSheetOpen, setLangSheetOpen }: SheeterProps) {
  const { t, i18n } = useTranslation();
  const pendingColorRef = React.useRef<ColorPaletteKey | null>(null);
  const pendingLangRef = React.useRef<string | null>(null);
  const pendingThemeRef = React.useRef<ThemeMode | null>(null);

  const themeOptions = React.useMemo<BottomSheetOption<ThemeMode>[]>(
    () => [
      { label: t('theme.light'), leftElement: <Sun size={22} />, value: 'light' },
      { label: t('theme.dark'), leftElement: <Moon size={22} />, value: 'dark' },
      { label: t('theme.system'), leftElement: <Monitor size={22} />, value: 'system' },
    ],
    [t],
  );

  const colorOptions = React.useMemo<BottomSheetOption<ColorPaletteKey>[]>(
    () => COLOR_PALETTES.map(p => ({
      label: p.label,
      leftElement: <View className={cn('size-6 rounded-full', primaryColor === p.key && 'ring-2 ring-primary ring-offset-2')} style={{ backgroundColor: p.color }} />,
      value: p.key,
    })),
    [primaryColor],
  );

  return (
    <>
      <BottomSheet
        open={colorSheetOpen}
        onOpenChange={(open) => {
          if (!open && pendingColorRef.current) {
            setTimeout(() => {
              setPrimaryColor(pendingColorRef.current!);
              pendingColorRef.current = null;
            }, 50);
          }
          else {
            setColorSheetOpen(open);
          }
        }}
        title="Accent Color"
        options={colorOptions}
        selectedValue={primaryColor}
        onSelect={(value) => {
          pendingColorRef.current = value;
          setColorSheetOpen(false);
        }}
      />

      <BottomSheet
        open={themeSheetOpen}
        onOpenChange={(open) => {
          if (!open && pendingThemeRef.current) {
            setTimeout(() => {
              setMode(pendingThemeRef.current!);
              pendingThemeRef.current = null;
            }, 50);
          }
          else {
            setThemeSheetOpen(open);
          }
        }}
        title={t('theme.title')}
        options={themeOptions}
        selectedValue={mode}
        onSelect={(value) => {
          pendingThemeRef.current = value;
          setThemeSheetOpen(false);
        }}
      />

      <BottomSheet
        open={langSheetOpen}
        onOpenChange={(open) => {
          if (!open && pendingLangRef.current) {
            setTimeout(() => {
              changeLanguage(pendingLangRef.current!);
              pendingLangRef.current = null;
            }, 50);
          }
          else {
            setLangSheetOpen(open);
          }
        }}
        title={t('language.title')}
        options={LANGUAGE_OPTIONS}
        selectedValue={i18n.language}
        onSelect={(value) => {
          pendingLangRef.current = value;
          setLangSheetOpen(false);
        }}
      />
    </>
  );
}

function SettingsScreen() {
  const { mode, setMode, primaryColor, setPrimaryColor } = useThemeStore();
  const { t, i18n } = useTranslation();
  const [langSheetOpen, setLangSheetOpen] = React.useState(false);
  const [colorSheetOpen, setColorSheetOpen] = React.useState(false);
  const [themeSheetOpen, setThemeSheetOpen] = React.useState(false);

  const currentLangLabel = LANGUAGE_OPTIONS.find(o => o.value === i18n.language)?.label ?? 'English';
  const currentPalette = COLOR_PALETTES.find(p => p.key === primaryColor);
  const currentColorLabel = currentPalette?.label ?? 'Blue';
  const themeLabels: Record<ThemeMode, string> = { dark: t('theme.dark'), light: t('theme.light'), system: t('theme.system') };

  return (
    <>
      <ScrollView className="flex-1 bg-background">
        <View className="gap-8 p-6">
          <AppearanceSection
            currentColorLabel={currentColorLabel}
            currentPalette={currentPalette}
            currentLangLabel={currentLangLabel}
            themeLabels={themeLabels}
            mode={mode}
            onThemePress={() => setThemeSheetOpen(true)}
            onColorPress={() => setColorSheetOpen(true)}
            onLangPress={() => setLangSheetOpen(true)}
          />
          <AppInfoSection />
          <SupportSection />
          <AppIconSection />
        </View>
      </ScrollView>

      <SettingsBottomSheets
        mode={mode}
        setMode={setMode}
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        colorSheetOpen={colorSheetOpen}
        setColorSheetOpen={setColorSheetOpen}
        themeSheetOpen={themeSheetOpen}
        setThemeSheetOpen={setThemeSheetOpen}
        langSheetOpen={langSheetOpen}
        setLangSheetOpen={setLangSheetOpen}
      />
    </>
  );
}

export { SettingsScreen };
