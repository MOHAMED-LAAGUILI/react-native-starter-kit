import { ChevronRight, Globe, Info, Palette } from "lucide-react-native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import { BottomSheet, type BottomSheetOption } from "@/components/ui/BottomSheet";
import { Text } from "@/components/ui/Text";
import { changeLanguage } from "@/i18n";
import { type ThemeMode, useThemeStore } from "@/store";

const THEME_OPTIONS: BottomSheetOption<ThemeMode>[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const LANGUAGE_OPTIONS: BottomSheetOption<string>[] = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
  { label: "العربية", value: "ar" },
];

function SettingsScreen() {
  const { mode, setMode } = useThemeStore();
  const { t, i18n } = useTranslation();
  const [themeSheetOpen, setThemeSheetOpen] = React.useState(false);
  const [langSheetOpen, setLangSheetOpen] = React.useState(false);

  const currentThemeLabel = THEME_OPTIONS.find(o => o.value === mode)?.label ?? "System";
  const currentLangLabel = LANGUAGE_OPTIONS.find(o => o.value === i18n.language)?.label ?? "English";

  return (
    <>
      <ScrollView className="flex-1 bg-background">
        <View className="p-6 gap-8">
          <View>
            <Text
              variant="label"
              className="text-muted-foreground uppercase tracking-wider mb-3"
            >
              {t("settings.appearance")}
            </Text>
            <View className="rounded-xl border border-border bg-card overflow-hidden">
              <Pressable
                className="flex-row items-center p-4 active:bg-accent"
                onPress={() => setThemeSheetOpen(true)}
              >
                <Palette
                  size={22}
                  className="text-foreground mr-3"
                />
                <View className="flex-1">
                  <Text variant="body">{t("theme.title")}</Text>
                  <Text
                    variant="caption"
                    className="text-muted-foreground mt-0.5"
                  >
                    {currentThemeLabel}
                  </Text>
                </View>
                <ChevronRight
                  size={18}
                  className="text-muted-foreground"
                />
              </Pressable>
              <View className="h-px bg-border mx-4" />
              <Pressable
                className="flex-row items-center p-4 active:bg-accent"
                onPress={() => setLangSheetOpen(true)}
              >
                <Globe
                  size={22}
                  className="text-foreground mr-3"
                />
                <View className="flex-1">
                  <Text variant="body">{t("language.title")}</Text>
                  <Text
                    variant="caption"
                    className="text-muted-foreground mt-0.5"
                  >
                    {currentLangLabel}
                  </Text>
                </View>
                <ChevronRight
                  size={18}
                  className="text-muted-foreground"
                />
              </Pressable>
            </View>
          </View>

          <View>
            <Text
              variant="label"
              className="text-muted-foreground uppercase tracking-wider mb-3"
            >
              {t("settings.info")}
            </Text>
            <View className="rounded-xl border border-border bg-card overflow-hidden">
              <View className="flex-row items-center p-4">
                <Info
                  size={22}
                  className="text-foreground mr-3"
                />
                <View className="flex-1">
                  <Text variant="body">{t("app.name")}</Text>
                  <Text
                    variant="caption"
                    className="text-muted-foreground mt-0.5"
                  >
                    {t("app.version", { version: "1.0.0" })}
                  </Text>
                </View>
              </View>
              <View className="h-px bg-border mx-4" />
              <View className="flex-row items-center p-4">
                <View className="w-[22px] mr-3" />
                <View className="flex-1">
                  <Text
                    variant="caption"
                    className="text-muted-foreground"
                  >
                    {t("app.description")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomSheet
        open={themeSheetOpen}
        onOpenChange={setThemeSheetOpen}
        title={t("theme.title")}
        options={THEME_OPTIONS}
        selectedValue={mode}
        onSelect={value => setMode(value)}
      />

      <BottomSheet
        open={langSheetOpen}
        onOpenChange={setLangSheetOpen}
        title={t("language.title")}
        options={LANGUAGE_OPTIONS}
        selectedValue={i18n.language}
        onSelect={value => changeLanguage(value)}
      />
    </>
  );
}

export { SettingsScreen };
