import "react-native-url-polyfill/auto";
import "../global.css";
import "react-native-gesture-handler";

import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HeaderButtonsProvider } from "react-navigation-header-buttons/HeaderButtonsProvider";
import { ToastConfig } from "@/components/ui/Toast";
import { setupI18n } from "@/i18n";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useThemeStore } from "@/store";
import { isWeb } from "@/utils/platform";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
});

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

function RootLayoutInner({ onReady }: { onReady: () => void }) {
  const themeMode = useThemeStore(s => s.mode);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!readyRef.current) {
      readyRef.current = true;
      onReady();
    }
  }, [onReady]);

  useEffect(() => {
    const bg = themeMode === "dark" ? "#000000" : "#ffffff";
    SystemUI.setBackgroundColorAsync(bg);
  }, [themeMode]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  const onReady = useCallback(() => {
    setAppReady(true);
  }, []);

  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    setupI18n().then(() => setI18nReady(true));
  }, []);

  useEffect(() => {
    if (i18nReady && appReady) {
      SplashScreen.hideAsync();
    }
  }, [i18nReady, appReady]);

  if (!i18nReady) {
    return (
      <ThemeProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <HeaderButtonsProvider stackType={isWeb ? "js" : "native"}>
          <QueryProvider>
            <ThemeProvider>
              <StatusBar style="auto" />
              <RootLayoutInner onReady={onReady} />
              <PortalHost />
              <ToastConfig />
            </ThemeProvider>
          </QueryProvider>
        </HeaderButtonsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
