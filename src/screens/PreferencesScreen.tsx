import { useFocusEffect } from "expo-router";
import { Trash2 } from "lucide-react-native";
import * as React from "react";
import { Alert, ScrollView, View } from "react-native";
import { Button } from "@/components/ui";
import { Text } from "@/components/ui/Text";
import { STORAGE_KEYS } from "@/config/constants";
import { StorageService } from "@/storage";

const KEY_LABELS: Record<string, string> = {
  [STORAGE_KEYS.AUTH_TOKEN]: "Auth Token",
  [STORAGE_KEYS.AUTH_REFRESH_TOKEN]: "Auth Refresh Token",
  [STORAGE_KEYS.AUTH_USER]: "Auth User",
  [STORAGE_KEYS.LANGUAGE]: "Language",
  [STORAGE_KEYS.ONBOARDING_COMPLETE]: "Onboarding Complete",
  [STORAGE_KEYS.PRIMARY_COLOR]: "Primary Color",
  [STORAGE_KEYS.THEME_MODE]: "Theme Mode",
};

interface Entry {
  key: string;
  label: string;
  value: string;
}

function readAllKeys(): Entry[] {
  const keys = StorageService.getAllKeys();
  return keys
    .filter(k => k in KEY_LABELS)
    .map(k => {
      const label = KEY_LABELS[k] ?? k;
      const raw = StorageService.getItem<unknown>(k);
      const value = raw == null ? "<empty>" : typeof raw === "object" ? JSON.stringify(raw, null, 2) : String(raw);
      return { key: k, label, value };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function PreferencesScreen() {
  const [entries, setEntries] = React.useState<Entry[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      setEntries(readAllKeys());
    }, [])
  );

  const handleClear = React.useCallback(() => {
    Alert.alert(
      "Clear All Storage",
      "This will remove all stored preferences including auth tokens, theme, language, and onboarding state. App will need to restart.",
      [
        { style: "cancel", text: "Cancel" },
        {
          onPress: () => {
            StorageService.clearAll();
            setEntries([]);
          },
          style: "destructive",
          text: "Clear",
        },
      ]
    );
  }, []);

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 gap-6">
        <View className="flex-row items-center justify-between">
          <Text variant="h4">Stored Preferences</Text>
        </View>

        {entries.length === 0 && (
          <Text
            variant="body"
            className="text-muted-foreground text-center mt-4"
          >
            No stored preferences found.
          </Text>
        )}

        <View className="gap-3">
          {entries.length > 0 && (
            <Text
              variant="label"
              className="text-muted-foreground uppercase tracking-wider text-xs"
            >
              Raw Storage
            </Text>
          )}
          {entries.map(entry => (
            <View
              key={entry.key}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <View className="flex-row items-center justify-between mb-1">
                <Text
                  variant="caption"
                  className="text-muted-foreground"
                >
                  {entry.label}
                </Text>
                <Text
                  variant="caption"
                  className="text-muted-foreground/50 text-[10px] font-mono"
                >
                  {entry.key}
                </Text>
              </View>
              <Text
                variant="body"
                className="font-mono text-sm leading-5"
                selectable
              >
                {entry.value}
              </Text>
            </View>
          ))}
        </View>

        <Button
          variant="destructive"
          onPress={handleClear}
          title="Clear All Storage"
          leftIcon={
            <Trash2
              size={16}
              color="#fff"
            />
          }
          size="sm"
          className="mt-4"
        />
      </View>
    </ScrollView>
  );
}
